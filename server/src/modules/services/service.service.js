import mongoose, { Types } from 'mongoose';

import {
  BAD_REQUEST,
  NOT_FOUND,
  SERVICE_UNAVAILABLE,
} from '../../constants/http-status.js';
import {
  DATABASE_CONNECTION_REQUIRED,
  INVALID_OBJECT_ID,
  SERVICE_NOT_FOUND,
} from '../../constants/messages.js';
import ApiError from '../../utils/ApiError.js';
import Service from './service.model.js';

const serviceFields = [
  'title',
  'description',
  'icon',
  'displayOrder',
  'isVisible',
];

const sortOptions = Object.freeze({
  displayOrder: { displayOrder: 1, title: 1 },
  title: { title: 1 },
  latest: { createdAt: -1 },
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

const assertServiceExists = (service) => {
  if (!service) {
    throw new ApiError(NOT_FOUND, SERVICE_NOT_FOUND);
  }
};

const pickDefined = (payload, allowedFields) =>
  allowedFields.reduce((result, field) => {
    if (payload[field] !== undefined) {
      result[field] = payload[field];
    }

    return result;
  }, {});

const getSortOption = (sort) => sortOptions[sort] || sortOptions.displayOrder;

export const getServices = async (filters) => {
  assertDatabaseConnected();

  return Service.find({ isVisible: true }).sort(getSortOption(filters.sort));
};

export const getServiceById = async (serviceId) => {
  assertDatabaseConnected();
  assertValidObjectId(serviceId);

  const service = await Service.findOne({ _id: serviceId, isVisible: true });

  assertServiceExists(service);

  return service;
};

export const createService = async (payload) => {
  assertDatabaseConnected();

  return Service.create(pickDefined(payload, serviceFields));
};

export const updateService = async (serviceId, payload) => {
  assertDatabaseConnected();
  assertValidObjectId(serviceId);

  const service = await Service.findByIdAndUpdate(
    serviceId,
    {
      $set: pickDefined(payload, serviceFields),
    },
    {
      new: true,
      runValidators: true,
    },
  );

  assertServiceExists(service);

  return service;
};

export const deleteService = async (serviceId) => {
  assertDatabaseConnected();
  assertValidObjectId(serviceId);

  const service = await Service.findByIdAndDelete(serviceId);

  assertServiceExists(service);

  return service;
};

export const updateServiceVisibility = async (serviceId, isVisible) => {
  assertDatabaseConnected();
  assertValidObjectId(serviceId);

  const service = await Service.findById(serviceId);

  assertServiceExists(service);

  service.isVisible = isVisible ?? !service.isVisible;

  await service.save({ validateModifiedOnly: true });

  return service;
};
