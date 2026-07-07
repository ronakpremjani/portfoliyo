import mongoose, { Types } from 'mongoose';

import {
  BAD_REQUEST,
  CONFLICT,
  NOT_FOUND,
  SERVICE_UNAVAILABLE,
} from '../../constants/http-status.js';
import {
  DATABASE_CONNECTION_REQUIRED,
  INVALID_OBJECT_ID,
  PROJECT_NOT_FOUND,
  SLUG_ALREADY_EXISTS,
} from '../../constants/messages.js';
import ApiError from '../../utils/ApiError.js';
import Project, { slugify } from './project.model.js';

const projectFields = [
  'title',
  'slug',
  'shortDescription',
  'description',
  'coverImage',
  'galleryImages',
  'technologies',
  'features',
  'githubUrl',
  'liveUrl',
  'caseStudyUrl',
  'category',
  'status',
  'featured',
  'displayOrder',
  'isPublished',
  'startDate',
  'endDate',
];

const publicProjectQuery = Object.freeze({
  isDeleted: false,
  isPublished: true,
  status: 'Published',
});

const sortOptions = Object.freeze({
  latest: { createdAt: -1 },
  oldest: { createdAt: 1 },
  displayOrder: { displayOrder: 1, createdAt: -1 },
  title: { title: 1 },
  featured: { featured: -1, displayOrder: 1, createdAt: -1 },
});

const assertDatabaseConnected = () => {
  if (mongoose.connection.readyState !== 1) {
    throw new ApiError(SERVICE_UNAVAILABLE, DATABASE_CONNECTION_REQUIRED);
  }
};

const assertValidObjectId = (id) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new ApiError(BAD_REQUEST, INVALID_OBJECT_ID);
  }
};

const pickDefined = (payload, allowedFields) =>
  allowedFields.reduce((result, field) => {
    if (payload[field] !== undefined) {
      result[field] = payload[field];
    }

    return result;
  }, {});

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const normalizeProjectPayload = (payload) => {
  const projectData = pickDefined(payload, projectFields);

  if (projectData.slug) {
    projectData.slug = slugify(projectData.slug);
  }

  if (projectData.status === undefined && projectData.isPublished === true) {
    projectData.status = 'Published';
  }

  if (projectData.status === undefined && projectData.isPublished === false) {
    projectData.status = 'Draft';
  }

  if (projectData.status === 'Published') {
    projectData.isPublished = true;
  }

  if (projectData.status === 'Draft' || projectData.status === 'Archived') {
    projectData.isPublished = false;
  }

  return projectData;
};

const buildPublicQuery = (filters) => {
  const query = { ...publicProjectQuery };

  if (filters.search) {
    const searchRegex = new RegExp(escapeRegex(filters.search), 'i');
    query.$or = [
      { title: searchRegex },
      { shortDescription: searchRegex },
      { description: searchRegex },
      { technologies: searchRegex },
      { features: searchRegex },
    ];
  }

  if (filters.featured !== undefined) {
    query.featured = filters.featured;
  }

  if (filters.category) {
    query.category = filters.category;
  }

  if (filters.isPublished === false) {
    query.isPublished = false;
    query.status = '__none__';
  }

  return query;
};

const getSortOption = (sort) => sortOptions[sort] || sortOptions.displayOrder;

const ensureUniqueSlug = async ({ slug, title, projectId }) => {
  let baseSlug = slug ? slugify(slug) : slugify(title);

  if (!baseSlug) {
    baseSlug = `project-${Date.now()}`;
  }

  let candidateSlug = baseSlug;
  let suffix = 1;

  while (
    await Project.exists({
      slug: candidateSlug,
      ...(projectId ? { _id: { $ne: projectId } } : {}),
    })
  ) {
    candidateSlug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  return candidateSlug;
};

const assertProjectExists = (project) => {
  if (!project) {
    throw new ApiError(NOT_FOUND, PROJECT_NOT_FOUND);
  }
};

const handleDuplicateSlug = (error) => {
  if (error?.code === 11000 && error?.keyPattern?.slug) {
    throw new ApiError(CONFLICT, SLUG_ALREADY_EXISTS);
  }

  throw error;
};

export const getProjects = async (queryParams) => {
  assertDatabaseConnected();

  const page = queryParams.page || 1;
  const limit = queryParams.limit || 10;
  const skip = (page - 1) * limit;
  const query = buildPublicQuery(queryParams);
  const sort = getSortOption(queryParams.sort);

  const [projects, total] = await Promise.all([
    Project.find(query).sort(sort).skip(skip).limit(limit),
    Project.countDocuments(query),
  ]);

  return {
    projects,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPreviousPage: page > 1,
    },
  };
};

export const getProjectBySlug = async (slug) => {
  assertDatabaseConnected();

  const project = await Project.findOne({
    ...publicProjectQuery,
    slug,
  });

  assertProjectExists(project);

  return project;
};

export const createProject = async (payload) => {
  assertDatabaseConnected();

  const projectData = normalizeProjectPayload(payload);
  projectData.slug = await ensureUniqueSlug({
    slug: projectData.slug,
    title: projectData.title,
  });

  try {
    return await Project.create(projectData);
  } catch (error) {
    handleDuplicateSlug(error);
  }
};

export const updateProject = async (projectId, payload) => {
  assertDatabaseConnected();
  assertValidObjectId(projectId);

  const projectData = normalizeProjectPayload(payload);

  if (projectData.slug) {
    projectData.slug = await ensureUniqueSlug({
      slug: projectData.slug,
      title: projectData.title,
      projectId,
    });
  }

  try {
    const project = await Project.findOneAndUpdate(
      { _id: projectId, isDeleted: false },
      { $set: projectData },
      {
        new: true,
        runValidators: true,
      },
    );

    assertProjectExists(project);

    return project;
  } catch (error) {
    handleDuplicateSlug(error);
  }
};

export const deleteProject = async (projectId) => {
  assertDatabaseConnected();
  assertValidObjectId(projectId);

  const project = await Project.findOneAndUpdate(
    { _id: projectId, isDeleted: false },
    {
      $set: {
        isDeleted: true,
        deletedAt: new Date(),
        isPublished: false,
        status: 'Archived',
      },
    },
    { new: true },
  );

  assertProjectExists(project);

  return project;
};

export const updateProjectPublishStatus = async (projectId, isPublished = true) => {
  assertDatabaseConnected();
  assertValidObjectId(projectId);

  const project = await Project.findOneAndUpdate(
    { _id: projectId, isDeleted: false },
    {
      $set: {
        isPublished,
        status: isPublished ? 'Published' : 'Draft',
      },
    },
    {
      new: true,
      runValidators: true,
    },
  );

  assertProjectExists(project);

  return project;
};

export const updateProjectFeaturedStatus = async (projectId, featured) => {
  assertDatabaseConnected();
  assertValidObjectId(projectId);

  const project = await Project.findOne({ _id: projectId, isDeleted: false });

  assertProjectExists(project);

  project.featured = featured ?? !project.featured;

  await project.save({ validateModifiedOnly: true });

  return project;
};
