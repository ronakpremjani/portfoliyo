import mongoose from 'mongoose';

const CONTACT_STATUSES = Object.freeze([
  'New',
  'Read',
  'Archived',
]);

const emailValidator = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 254,
      validate: { validator: emailValidator },
    },
    subject: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 180,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 5000,
    },
    status: {
      type: String,
      enum: CONTACT_STATUSES,
      default: 'New',
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

contactSchema.index({ isRead: 1, createdAt: -1 });
contactSchema.index({ status: 1, createdAt: -1 });
contactSchema.index({ email: 1, createdAt: -1 });

export { CONTACT_STATUSES };
export default mongoose.model('Contact', contactSchema);
