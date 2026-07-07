import mongoose from 'mongoose';

const SKILL_CATEGORIES = Object.freeze([
  'Frontend',
  'Backend',
  'Database',
  'Languages',
  'Tools',
  'DevOps',
]);

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80,
    },
    icon: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    category: {
      type: String,
      enum: SKILL_CATEGORIES,
      required: true,
    },
    proficiency: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
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

skillSchema.index({ category: 1, displayOrder: 1, name: 1 });
skillSchema.index({ isVisible: 1, displayOrder: 1 });

export { SKILL_CATEGORIES };
export default mongoose.model('Skill', skillSchema);
