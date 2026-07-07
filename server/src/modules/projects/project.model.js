import mongoose from 'mongoose';

const PROJECT_STATUSES = Object.freeze(['Draft', 'Published', 'Archived']);
const PROJECT_CATEGORIES = Object.freeze([
  'Web Development',
  'Full Stack',
  'Frontend',
  'Backend',
  'Open Source',
  'Hackathon',
  'Personal',
  'Client',
]);

const urlValidator = (value) => {
  if (!value) {
    return true;
  }

  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol);
  } catch {
    return false;
  }
};

const assetPathValidator = (value) => {
  if (!value) {
    return true;
  }

  return value.startsWith('/') || urlValidator(value);
};

const slugify = (value) =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 140,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
      match: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    },
    shortDescription: {
      type: String,
      trim: true,
      maxlength: 240,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 10000,
    },
    coverImage: {
      type: String,
      trim: true,
      validate: { validator: assetPathValidator },
    },
    galleryImages: {
      type: [String],
      default: [],
      validate: {
        validator: (images) => images.every(assetPathValidator),
      },
    },
    technologies: {
      type: [String],
      default: [],
    },
    features: {
      type: [String],
      default: [],
    },
    githubUrl: {
      type: String,
      trim: true,
      validate: { validator: urlValidator },
    },
    liveUrl: {
      type: String,
      trim: true,
      validate: { validator: urlValidator },
    },
    caseStudyUrl: {
      type: String,
      trim: true,
      validate: { validator: urlValidator },
    },
    category: {
      type: String,
      enum: PROJECT_CATEGORIES,
      default: 'Personal',
      required: true,
    },
    status: {
      type: String,
      enum: PROJECT_STATUSES,
      default: 'Draft',
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    displayOrder: {
      type: Number,
      default: 0,
      min: 0,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    startDate: {
      type: Date,
      default: null,
    },
    endDate: {
      type: Date,
      default: null,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      select: false,
    },
    deletedAt: {
      type: Date,
      default: null,
      select: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const syncProjectPublishedState = (project) => {
  if (project.status === 'Published') {
    project.isPublished = true;
    return;
  }

  if (project.status === 'Draft' || project.status === 'Archived') {
    project.isPublished = false;
  }
};

projectSchema.pre('validate', function prepareProject() {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title);
  }

  syncProjectPublishedState(this);
});

projectSchema.pre('save', function syncPublishedState() {
  syncProjectPublishedState(this);
});

projectSchema.index({ title: 'text', shortDescription: 'text', description: 'text', technologies: 'text' });
projectSchema.index({ isPublished: 1, status: 1, featured: 1, category: 1, displayOrder: 1 });
projectSchema.index({ isDeleted: 1, deletedAt: 1 });

projectSchema.methods.toJSON = function toJSON() {
  const project = this.toObject();

  delete project.isDeleted;
  delete project.deletedAt;

  return project;
};

export { PROJECT_CATEGORIES, PROJECT_STATUSES, slugify };
export default mongoose.model('Project', projectSchema);
