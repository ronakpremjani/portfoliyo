import { CREATED, OK } from '../../constants/http-status.js';
import {
  CONTACT_MESSAGE_DELETED,
  CONTACT_MESSAGE_READ_UPDATED,
  CONTACT_MESSAGE_SUBMITTED,
  CONTACT_MESSAGES_FETCHED,
} from '../../constants/messages.js';
import ApiResponse from '../../utils/ApiResponse.js';
import {
  createContactMessage,
  deleteContactMessage,
  getContactMessages,
  markContactMessageRead,
} from './contact.service.js';

export const submitContactMessage = async (req, res) => {
  const contactMessage = await createContactMessage(req.body);

  return res.status(CREATED).json(
    new ApiResponse(CREATED, CONTACT_MESSAGE_SUBMITTED, { contactMessage }),
  );
};

export const getContactMessageList = async (req, res) => {
  const contactMessages = await getContactMessages(req.query);

  return res.status(OK).json(
    new ApiResponse(OK, CONTACT_MESSAGES_FETCHED, { contactMessages }),
  );
};

export const markContactMessageAsRead = async (req, res) => {
  const contactMessage = await markContactMessageRead(req.params.id, req.body.isRead);

  return res.status(OK).json(
    new ApiResponse(OK, CONTACT_MESSAGE_READ_UPDATED, { contactMessage }),
  );
};

export const deleteContactMessageDetails = async (req, res) => {
  const contactMessage = await deleteContactMessage(req.params.id);

  return res.status(OK).json(
    new ApiResponse(OK, CONTACT_MESSAGE_DELETED, { contactMessage }),
  );
};
