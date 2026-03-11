const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const emailService = require('../services/emailService');

const SALT_ROUNDS = 10;

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existing = await userModel.findByEmail(email);
    if (existing) {
      return res.status(409).json({ message: 'You already have an account. Please sign in.' });
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const userId = await userModel.createUser({ name, email, passwordHash });

    // Fire-and-forget emails (don’t block registration success on email issues)
    emailService
      .sendWelcomeEmail({ to: email, name })
      .catch((err) => console.error('Welcome email failed:', err));

    emailService
      .notifyAdminNewUser({ name, email })
      .catch((err) => console.error('Admin notification failed:', err));

    return res.status(201).json({
      message: 'Welcome to Bajaj Insurance. You are successfully registered.',
      user: { id: userId, name, email },
    });
  } catch (err) {
    if (err && err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'You already have an account. Please sign in.' });
    }
    return next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Simple login response (no JWT/session required by current requirements)
    return res.json({
      message: 'Login successful',
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = { register, login };
