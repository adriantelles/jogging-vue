const User = require('../models/user.model');
const ROLES = require('../constants/role');

function create(req, res, next) {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  if (req.user.role === ROLES.ADMIN && req.body.role) {
    user.role = req.body.role;
  }

  user.save()
  .then((newUser) => {
    res.json(newUser);
  })
  .catch(next);
}

function update(req, res, next) {
  Object.assign(req.userModel, {
    name: req.body.name,
    email: req.body.email,
  });

  if (req.body.password) {
    req.userModel.password = req.body.password;
  }

  if (req.user.role === ROLES.ADMIN && req.body.role) {
    req.userModel.role = req.body.role;
  }

  req.userModel.save()
  .then((updatedUser) => {
    res.json(updatedUser);
  })
  .catch(next);
}

function read(req, res) {
  res.json(req.userModel);
}

function list(req, res, next) {
  let where = { _id: { $ne: req.user._id }};
  if (req.user.role === ROLES.MANAGER) {
    where.role = { $ne: ROLES.ADMIN } ;
  }
  User.find(where)
  .then((users) => {
    res.json(users);
  })
  .catch(next);
}

function remove(req, res, next) {
  req.userModel
    .remove()
    .then(() => {
      res.json(req.userModel);
    })
    .catch(next);
}

function getUserByID(req, res, next, id) {
  User.findById(id)
  .then((user) => {
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    req.userModel = user;
    next();
  })
  .catch(next);
}

function getProfile(req, res, next) {
  User.findById(req.user._id)
  .then((user) => {
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    req.userModel = user;
    next();
  })
  .catch(next);
}

module.exports = {
  create,
  update,
  read,
  list,
  remove,
  getUserByID,
  getProfile,
};
