import mongoose, { Types } from 'mongoose';

import {
  BAD_REQUEST,
  NOT_FOUND,
  SERVICE_UNAVAILABLE,
} from '../../constants/http-status.js';
import {
  CONTACT_MESSAGE_NOT_FOUND,
  DATABASE_CONNECTION_REQUIRED,
  INVALID_OBJECT_ID,
} from '../../constants/messages.js';
import ApiError from '../../utils/ApiError.js';
import Contact from './contact.model.js';

const contactSubmissionFields = [
  'name',
  'email',
  'subject',
  'message',
];

const sortOptions = Object.freeze({
  latest: { createdAt: -1 },
  oldest: { createdAt: 1 },
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

const assertContactMessageExists = (contactMessage) => {
  if (!contactMessage) {
    throw new ApiError(NOT_FOUND, CONTACT_MESSAGE_NOT_FOUND);
  }
};

const pickDefined = (payload, allowedFields) =>
  allowedFields.reduce((result, field) => {
    if (payload[field] !== undefined) {
      result[field] = payload[field];
    }

    return result;
  }, {});

const buildContactQuery = (filters) => {
  const query = {};

  if (filters.status) {
    query.status = filters.status;
  }

  if (filters.isRead !== undefined) {
    query.isRead = filters.isRead;
  }

  return query;
};

const getSortOption = (sort) => sortOptions[sort] || sortOptions.latest;

export const createContactMessage = async (payload) => {
  assertDatabaseConnected();

  return Contact.create(pickDefined(payload, contactSubmissionFields));
};

export const getContactMessages = async (filters) => {
  assertDatabaseConnected();

  return Contact.find(buildContactQuery(filters)).sort(getSortOption(filters.sort));
};

export const markContactMessageRead = async (contactMessageId, isRead = true) => {
  assertDatabaseConnected();
  assertValidObjectId(contactMessageId);

  const contactMessage = await Contact.findById(contactMessageId);

  assertContactMessageExists(contactMessage);

  contactMessage.isRead = isRead;

  if (isRead && contactMessage.status === 'New') {
    contactMessage.status = 'Read';
  }

  if (!isRead && contactMessage.status === 'Read') {
    contactMessage.status = 'New';
  }

  await contactMessage.save({ validateModifiedOnly: true });

  return contactMessage;
};

export const deleteContactMessage = async (contactMessageId) => {
  assertDatabaseConnected();
  assertValidObjectId(contactMessageId);

  const contactMessage = await Contact.findByIdAndDelete(contactMessageId);

  assertContactMessageExists(contactMessage);

  return contactMessage;
};
