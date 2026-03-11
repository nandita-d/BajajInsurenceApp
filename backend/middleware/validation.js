const isNonEmptyString = (value) => typeof value === 'string' && value.trim().length > 0;

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body || {};

  if (!isNonEmptyString(name)) {
    return res.status(400).json({ message: 'Name is required' });
  }

  if (!isNonEmptyString(email) || !isValidEmail(email.trim())) {
    return res.status(400).json({ message: 'Valid email is required' });
  }

  if (!isNonEmptyString(password) || password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters' });
  }

  req.body.email = email.trim().toLowerCase();
  req.body.name = name.trim();
  return next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body || {};

  if (!isNonEmptyString(email) || !isValidEmail(email.trim())) {
    return res.status(400).json({ message: 'Valid email is required' });
  }

  if (!isNonEmptyString(password)) {
    return res.status(400).json({ message: 'Password is required' });
  }

  req.body.email = email.trim().toLowerCase();
  return next();
};

module.exports = { validateRegister, validateLogin };

