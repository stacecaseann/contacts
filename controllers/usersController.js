const usersModel = require('../database/usersModel');

const getAllUsers = async (req, res) => {
  //#swagger.tags = ['Users']
  //#swagger.summary = 'Gets all users.'
  const result = await usersModel.getAllUsersFromDb();
  return result
    .toArray()
    .then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
};

const getUserById = async (req, res) => {
  //#swagger.tags = ['Users']
  //#swagger.summary = 'Gets a user by id.'
  //#swagger.parameters['id'] = { description: 'User ID.' }
  const id = req.params.id;
  const result = await usersModel.getUserByIdFromDb(id);
  return result
    .toArray()
    .then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
};

const createUser = async (req, res) => {
  //#swagger.tags = ['Users']
  //#swagger.summary = 'Creates a user.'
  //#swagger.description = 'Creates a new user with the provided information.'
  const user = {
    username: req.body.username,
    email: req.body.email,
    name: req.body.name,
    ipaddress: req.body.ipaddress,
  };
  const response = await usersModel.createUserInDb(user);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || 'Some error occurred while creating user.');
  }
};

const updateUser = async (req, res) => {
  //#swagger.tags = ['Users']
  //#swagger.summary = 'Updates a user by ID.'
  //#swagger.description = 'Updates a user by ID with the provided information.'
  //#swagger.parameters['id'] = { description: 'User ID.' }
  const userId = req.params.id;
  const user = {
    username: req.body.username,
    email: req.body.email,
    name: req.body.name,
    ipaddress: req.body.ipaddress,
  };

  const response = await usersModel.updateUserInDb(userId, user);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || 'Some error occurred while updating the user.');
  }
};

const deleteUser = async (req, res) => {
  //#swagger.tags = ['Users']
  //#swagger.summary = 'Deletes a user by ID.'
  //#swagger.description = 'Creates a user by ID.'
  //#swagger.parameters['id'] = { description: 'User ID.' }
  const userId = req.params.id;

  const response = await usersModel.deleteUserFromDb(userId);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || 'Some error occurred while deleting the user.');
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
