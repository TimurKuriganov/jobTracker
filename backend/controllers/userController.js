const User = require('../models/User');
const bcrypt = require('bcryptjs');
const ExpressError = require('../utils/expressError');

const signupUser = async (req, res, next) => {
  const { name, lastName, email, password, location } = req.body;
  try {
    if (!name?.trim() || !lastName?.trim() || !email?.trim() || !password?.trim() || !location?.trim()) {
      throw new ExpressError('Invalid Credentials', 400);
    }
    const isUserExist = await User.findOne({ email });
    if (isUserExist) throw new ExpressError('User already exists', 401)
    const pwd = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, lastName, password: pwd, email, location
    })
    const token = user.generateToken();
    res.status(201).json({
      user: {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        location: user.location
      },
      token
    })
  } catch (err) {
    return next(err);
  }
}

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email?.trim() || !password?.trim()) throw new ExpressError('Invalid Credentials', 400);
    const user = await User.findOne({ email });
    console.log('user', user)
    if (!user) throw new ExpressError('User does not exist', 401);
    const isPasswordCorrect = await user.checkPassword(password);
    if (!isPasswordCorrect) throw new ExpressError('Invalid Credentials', 401);
    const token = user.generateToken();
    res.status(200).json({
      user: {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        location: user.location
      },
      token
    })
  } catch(err) {
    return next(err);
  }
}

module.exports = { signupUser, login }
