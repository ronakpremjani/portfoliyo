import { OK } from '../../constants/http-status.js';
import {
  PROFILE_FETCHED,
  PROFILE_IMAGE_UPDATED,
  PROFILE_RESUME_UPDATED,
  PROFILE_UPDATED,
} from '../../constants/messages.js';
import ApiResponse from '../../utils/ApiResponse.js';
import {
  getProfile,
  updateProfile,
  updateProfileImages,
  updateProfileResume,
} from './profile.service.js';

export const getPublicProfile = async (req, res) => {
  const profile = await getProfile();

  return res.status(OK).json(new ApiResponse(OK, PROFILE_FETCHED, { profile }));
};

export const updateProfileDetails = async (req, res) => {
  const profile = await updateProfile(req.body);

  return res.status(OK).json(new ApiResponse(OK, PROFILE_UPDATED, { profile }));
};

export const updateProfileImageAssets = async (req, res) => {
  const profile = await updateProfileImages(req.body);

  return res.status(OK).json(new ApiResponse(OK, PROFILE_IMAGE_UPDATED, { profile }));
};

export const updateProfileResumeAsset = async (req, res) => {
  const profile = await updateProfileResume(req.body.resume);

  return res.status(OK).json(new ApiResponse(OK, PROFILE_RESUME_UPDATED, { profile }));
};
