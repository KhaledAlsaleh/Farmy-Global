import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

const bundleSchema = mongoose.Schema(
  {
    createdByUser: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    ingredients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Ingredient',
      },
    ],
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      default: ' ',
    },
    category: [
      {
        type: String,
        required: true,
      },
    ],
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 19,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 25,
    },
  },
  {
    timestamps: true,
  },
);

const Bundle = mongoose.model('Bundle', bundleSchema);

export default Bundle;
