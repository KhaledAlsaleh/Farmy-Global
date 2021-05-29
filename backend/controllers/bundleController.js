import asyncHandler from 'express-async-handler';
import Bundle from '../models/bundleModel.js';
import Ingredient from '../models/ingredientModel.js';

// @desc    Fetch all bundles
// @route   GET /api/bundles
// @access  Public
const getBundles = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        $or: [
          {
            name: {
              $regex: req.query.keyword,
              $options: 'i',
            },
          },
          {
            category: {
              $regex: req.query.keyword,
              $options: 'i',
            },
          },
          {
            description: {
              $regex: req.query.keyword,
              $options: 'i',
            },
          },
        ],
      }
    : {};

  if (req.query.keyword) {
    const ingredients = await Ingredient.find({ ...keyword }, 'bundles');
    if (ingredients.length > 0) {
      const ingredientBundles = ingredients.map((ingredient) => ingredient.bundles).flat(1);
      keyword.$or.push({ _id: ingredientBundles });
    }
    keyword.$or.push({
      'reviews.comment': {
        $regex: req.query.keyword,
        $options: 'i',
      },
    });
  }

  const price = {
    price: {
      $gte: Number(req.query.minPrice) || 0,
      $lt: Number(req.query.maxPrice) || 99999999,
    },
  };

  const ratingQuery = Number(req.query.rating);
  const rating = ratingQuery
    ? {
        rating: {
          $gte: ratingQuery,
        },
      }
    : {};

  const category = req.query.category
    ? {
        category: req.query.category,
      }
    : {};

  const count = await Bundle.countDocuments({ ...keyword });
  const bundles = await Bundle.find({
    ...keyword,
    ...rating,
    ...price,
    ...category,
  })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  // sorting by one of the selected criterias
  switch (req.query.sortBy) {
    case 'highestPrice':
      bundles.sort((high, low) => low.price - high.price);
      break;
    case 'lowestPrice':
      bundles.sort((high, low) => high.price - low.price);
      break;
    case 'rating':
      bundles.sort((high, low) => low.rating - high.rating);
      break;
    case 'newest':
      bundles.sort((newer, older) => older.createdAt - newer.createdAt);
      break;
    default:
      break;
  }

  res.json({ bundles, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch all bundles for new User
// @route   GET /api/bundles
// @access  Private
const getBundlesNewUser = asyncHandler(async (req, res) => {
  const bundles = await Bundle.find({});

  res.json(bundles);
});

// @desc    Fetch single bundle
// @route   GET /api/bundles/:id
// @access  Public
const getBundleById = asyncHandler(async (req, res) => {
  const bundle = await Bundle.findById(req.params.id).populate({
    path: 'ingredients',
    model: Ingredient,
  });

  if (bundle) {
    res.json(bundle);
  } else {
    res.status(404);
    throw new Error('Bundle not found');
  }
});

// @desc    Delete a bundles
// @route   DELETE /api/bundles/:id
// @access  Private/Admin
const deleteBundle = asyncHandler(async (req, res) => {
  const bundle = await Bundle.findById(req.params.id);

  if (bundle) {
    await bundle.remove();
    res.json({ message: 'bundle removed' });
  } else {
    res.status(404);
    throw new Error('bundle not found');
  }
});

// @desc    Create a bundles
// @route   POST /api/bundles
// @access  Private/Admin
const createBundle = asyncHandler(async (req, res) => {
  const bundle = new Bundle({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  const createdBundle = await bundle.save();
  res.status(201).json(createdBundle);
});

// @desc    Update a bundles
// @route   PUT /api/bundles/:id
// @access  Private/Admin
const updateBundle = asyncHandler(async (req, res) => {
  const {
 name, price, description, image, brand, category, countInStock,
} = req.body;

  const bundle = await Bundle.findById(req.params.id);

  if (bundle) {
    bundle.name = name;
    bundle.price = price;
    bundle.description = description;
    bundle.image = image;
    bundle.brand = brand;
    bundle.category = category;
    bundle.countInStock = countInStock;

    const updatedBundle = await bundle.save();
    res.json(updatedBundle);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create new review
// @route   POST /api/bundles/:id/reviews
// @access  Private
const createBundleReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const bundle = await Bundle.findById(req.params.id);

  if (bundle) {
    const alreadyReviewed = bundle.reviews.find(
      (r) => r.user.toString() === req.user._id.toString(),
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('bundle already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    bundle.reviews.push(review);

    bundle.numReviews = bundle.reviews.length;

    bundle.rating = bundle.reviews.reduce((acc, item) => item.rating + acc, 0) / bundle.reviews.length;

    await bundle.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('bundle not found');
  }
});

// @desc    Get latest bundles
// @route   GET /api/bundles/latest
// @access  Public
const getLatestBundles = asyncHandler(async (req, res) => {
  const bundles = await Bundle.find({}).sort({ createdAt: 'desc' }).limit(3);
  res.json(bundles);
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopBundle = asyncHandler(async (req, res) => {
  const bundles = await Bundle.find({}).sort({ rating: -1 }).limit(3);

  res.json(bundles);
});

export {
  getBundles,
  getBundleById,
  deleteBundle,
  createBundle,
  updateBundle,
  createBundleReview,
  getTopBundle,
  getLatestBundles,
  getBundlesNewUser,
};
