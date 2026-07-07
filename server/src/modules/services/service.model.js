import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 120,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },
    icon: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    displayOrder: {
      type: Number,
      min: 0,
      default: 0,
    },
    isVisible: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

serviceSchema.index({ isVisible: 1, displayOrder: 1 });
serviceSchema.index({ title: 1 });

export default mongoose.model('Service', serviceSchema);
