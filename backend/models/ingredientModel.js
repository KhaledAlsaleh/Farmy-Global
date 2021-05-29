import mongoose from 'mongoose';

const ingredientSchema = mongoose.Schema(
  {
    createdByUser: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    bundles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Bundle',
      },
    ],
    farms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Farm',
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
    },
    category: [
      {
        type: String,
        required: true,
      },
    ],
    origin: {
      type: String,
      required: true,
      default: 'The Netherlands',
    },
    price: {
      type: Number,
      required: true,
      default: 9,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 5,
    },
  },
  {
    timestamps: true,
  },
);

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

export default Ingredient;
