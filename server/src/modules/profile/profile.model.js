import mongoose from 'mongoose';

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

  if (value.startsWith('/')) {
    return true;
  }

  return urlValidator(value);
};

const socialLinksSchema = new mongoose.Schema(
  {
    website: {
      type: String,
      trim: true,
      validate: { validator: urlValidator },
    },
    github: {
      type: String,
      trim: true,
      validate: { validator: urlValidator },
    },
    linkedin: {
      type: String,
      trim: true,
      validate: { validator: urlValidator },
    },
    twitter: {
      type: String,
      trim: true,
      validate: { validator: urlValidator },
    },
    instagram: {
      type: String,
      trim: true,
      validate: { validator: urlValidator },
    },
    facebook: {
      type: String,
      trim: true,
      validate: { validator: urlValidator },
    },
    youtube: {
      type: String,
      trim: true,
      validate: { validator: urlValidator },
    },
    dribbble: {
      type: String,
      trim: true,
      validate: { validator: urlValidator },
    },
    behance: {
      type: String,
      trim: true,
      validate: { validator: urlValidator },
    },
  },
  { _id: false },
);

const seoSchema = new mongoose.Schema(
  {
    metaTitle: {
      type: String,
      trim: true,
      maxlength: 70,
    },
    metaDescription: {
      type: String,
      trim: true,
      maxlength: 170,
    },
    keywords: {
      type: [String],
      default: [],
    },
    canonicalUrl: {
      type: String,
      trim: true,
      validate: { validator: urlValidator },
    },
    ogImage: {
      type: String,
      trim: true,
      validate: { validator: assetPathValidator },
    },
  },
  { _id: false },
);

const profileSchema = new mongoose.Schema(
  {
    singletonKey: {
      type: String,
      default: 'profile',
      unique: true,
      immutable: true,
      select: false,
    },
    firstName: {
      type: String,
      trim: true,
      maxlength: 80,
    },
    lastName: {
      type: String,
      trim: true,
      maxlength: 80,
    },
    title: {
      type: String,
      trim: true,
      maxlength: 120,
    },
    tagline: {
      type: String,
      trim: true,
      maxlength: 180,
    },
    bio: {
      type: String,
      trim: true,
      maxlength: 5000,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      validate: {
        validator: (value) => !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      },
    },
    phone: {
      type: String,
      trim: true,
      maxlength: 30,
    },
    location: {
      type: String,
      trim: true,
      maxlength: 160,
    },
    availability: {
      type: String,
      trim: true,
      maxlength: 120,
    },
    yearsOfExperience: {
      type: Number,
      min: 0,
      max: 80,
      default: 0,
    },
    profileImage: {
      type: String,
      trim: true,
      validate: { validator: assetPathValidator },
    },
    coverImage: {
      type: String,
      trim: true,
      validate: { validator: assetPathValidator },
    },
    resume: {
      type: String,
      trim: true,
      validate: { validator: assetPathValidator },
    },
    socialLinks: {
      type: socialLinksSchema,
      default: {},
    },
    seo: {
      type: seoSchema,
      default: {},
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

profileSchema.methods.toJSON = function toJSON() {
  const profile = this.toObject();

  delete profile.singletonKey;

  return profile;
};

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
