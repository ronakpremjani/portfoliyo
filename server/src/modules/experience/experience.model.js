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

const experienceSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 120,
    },
    position: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 120,
    },
    employmentType: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    location: {
      type: String,
      trim: true,
      maxlength: 160,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      default: null,
    },
    currentlyWorking: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 5000,
    },
    technologies: {
      type: [String],
      default: [],
    },
    companyLogo: {
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

experienceSchema.pre('validate', function prepareExperience() {
  if (this.currentlyWorking) {
    this.endDate = null;
  }
});

experienceSchema.path('endDate').validate(function validateEndDate(value) {
  if (!value || this.currentlyWorking || !this.startDate) {
    return true;
  }

  return value >= this.startDate;
});

experienceSchema.index({ displayOrder: 1, startDate: -1 });
experienceSchema.index({ currentlyWorking: 1, displayOrder: 1 });

export default mongoose.model('Experience', experienceSchema);
