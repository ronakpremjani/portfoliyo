import { CREATED, OK } from '../../constants/http-status.js';
import {
  SERVICE_CREATED,
  SERVICE_DELETED,
  SERVICE_FETCHED,
  SERVICE_UPDATED,
  SERVICE_VISIBILITY_UPDATED,
  SERVICES_FETCHED,
} from '../../constants/messages.js';
import ApiResponse from '../../utils/ApiResponse.js';
import {
  createService,
  deleteService,
  getServiceById,
  getServices,
  updateService,
  updateServiceVisibility,
} from './service.service.js';

export const getServiceList = async (req, res) => {
  const services = await getServices(req.query);

  return res.status(OK).json(new ApiResponse(OK, SERVICES_FETCHED, { services }));
};

export const getServiceDetails = async (req, res) => {
  const service = await getServiceById(req.params.id);

  return res.status(OK).json(new ApiResponse(OK, SERVICE_FETCHED, { service }));
};

export const createServiceDetails = async (req, res) => {
  const service = await createService(req.body);

  return res.status(CREATED).json(new ApiResponse(CREATED, SERVICE_CREATED, { service }));
};

export const updateServiceDetails = async (req, res) => {
  const service = await updateService(req.params.id, req.body);

  return res.status(OK).json(new ApiResponse(OK, SERVICE_UPDATED, { service }));
};

export const deleteServiceDetails = async (req, res) => {
  const service = await deleteService(req.params.id);

  return res.status(OK).json(new ApiResponse(OK, SERVICE_DELETED, { service }));
};

export const updateServiceVisibilityDetails = async (req, res) => {
  const service = await updateServiceVisibility(req.params.id, req.body.isVisible);

  return res.status(OK).json(new ApiResponse(OK, SERVICE_VISIBILITY_UPDATED, { service }));
};
