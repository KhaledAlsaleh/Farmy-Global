/* eslint-disable camelcase */
import asyncHandler from 'express-async-handler';
import axios from 'axios';
import nodemailer from 'nodemailer';
import pkg from 'google-auth-library';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';
import Bundle from '../models/bundleModel.js';

const { OAuth2Client } = pkg;
// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      preferences: user.preferences,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      preferences: user.preferences,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      preferences: user.preferences,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    if (req.body.preferences) {
      user.preferences = {
        diet: req.body.preferences.diet,
        cookingSkill: req.body.preferences.cookingSkill,
        cuisine: req.body.preferences.cuisine,
        cookingTime: req.body.preferences.cookingTime,
      };
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      preferences: updatedUser.preferences,
      token: generateToken(updatedUser._id),
    });
    const bundles = await Bundle.find({});
    const filteredBundle = bundles.filter((b) => b.category.includes(user.preferences.diet));
    // a transporter object
    if (req.body.preferences.diet !== '') {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.GMAIL_ACCOUNT,
          pass: process.env.GMAIL_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
      // sends email to a specific user's email
      const info = await transporter.sendMail({
        from: `"Farmy" <${process.env.GMAIL_ACCOUNT}>`,
        to: `${req.user.email}`,
        subject: 'Farmy Recommendations For You',
        html: `<h1>Hi, ${req.user.name}!</h1>
        <p>Here are carefully selected Farmy Bundles for you according to your preferences:</p>
        <ul>${filteredBundle
          .map(
            (bundle) => `<br>
            <a href="${process.env.LINK_TO_PROFILE}${bundle._id}">${bundle.name}</a>
        <p>${bundle.description}</p>
        <img src="${bundle.image}" width="200" />
        <br>
        `,
          )
          .join('')}</ul>
        `,
      });
    }
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Login or Register with Facebook
// @route   POST /api/users/auth/facebook
// @access  Public
const authUserFacebook = asyncHandler(async (req, res) => {
  const { accessToken, userID } = req.body;

  try {
    const urlGraphFacebook = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;
    const { data } = await axios.get(urlGraphFacebook);

    const { name, email } = data;
    const password = email + process.env.JWT_SECRET;

    const user = await User.findOne({ email });

    if (user) {
      if (await user.matchPassword(password)) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          status: user.status,

          token: generateToken(user._id),
        });
      } else {
        res.status(401);
        throw new Error('Invalid email or password');
      }
    } else {
      const newUser = await User.create({
        name,
        email,
        password,
      });

      if (newUser) {
        res.status(201).json({
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          isAdmin: newUser.isAdmin,
          status: newUser.status,

          token: generateToken(newUser._id),
        });
      } else {
        res.status(400);
        throw new Error('Invalid user data');
      }
    }
  } catch (error) {
    res.status(400);
    throw new Error('Something went wrong...');
  }
});

// @desc    Login or Register with Google
// @route   POST /api/users/auth/google
// @access  Public
const authUserGoogle = asyncHandler(async (req, res) => {
  const { tokenId } = req.body;

  try {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const { payload } = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email_verified, name, email } = payload;
    const password = email + process.env.JWT_SECRET;

    const user = await User.findOne({ email });

    if (email_verified) {
      if (user) {
        if (await user.matchPassword(password)) {
          res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            status: user.status,

            token: generateToken(user._id),
          });
        } else {
          res.status(401);
          throw new Error('Invalid email or password');
        }
      } else {
        const newUser = await User.create({
          name,
          email,
          password,
        });

        if (newUser) {
          res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            status: newUser.status,

            token: generateToken(newUser._id),
          });
        } else {
          res.status(400);
          throw new Error('Invalid user data');
        }
      }
    } else {
      res.status(400);
      throw new Error('Email address not verified');
    }
  } catch (error) {
    res.status(400);
    throw new Error('Something went wrong...');
  }
});

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  authUserFacebook,
  authUserGoogle,
};
