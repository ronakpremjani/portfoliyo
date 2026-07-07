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

  return value.startsWith('/') || urlValidator(value);
};

const educationSchema = new mongoose.Schema(
  {
    institution: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 140,
    },
    degree: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 140,
    },
    fieldOfStudy: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 140,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      default: null,
    },
    grade: {
      type: String,
      trim: true,
      maxlength: 80,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 5000,
    },
    logo: {
      type: String,
      trim: true,
      validate: { validator: assetPathValidator },
    },
    displayOrder: {
      type: Number,
      min: 0,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

educationSchema.path('endDate').validate(function validateEndDate(value) {
  if (!value || !this.startDate) {
    return true;
  }

  return value >= this.startDate;
});

educationSchema.index({ displayOrder: 1, startDate: -1 });
educationSchema.index({ institution: 1, degree: 1 });

export default mongoose.model('Education', educationSchema);
