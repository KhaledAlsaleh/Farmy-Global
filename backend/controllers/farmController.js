import asyncHandler from 'express-async-handler';
import Farm from '../models/farmModel.js';

// @desc    Fetch all farms
// @route   GET /api/farms
// @access  Public
export const getFarms = asyncHandler(async (req, res) => {
  const farms = await Farm.find({});

  res.json(farms);
});

export const getFarmById = asyncHandler(async (req, res) => {
  const farm = await Farm.findById(req.params.id).populate({
    path: 'farms',
    model: Farm,
  });

  if (farm) {
    res.json(farm);
  } else {
    res.status(404);
    throw new Error('Farm not found');
  }
});
