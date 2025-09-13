const mongodb = require('../database/connect');
const { ObjectId } = require('mongodb');

const getAllUsers = async (req, res) => {
  //#swagger.tags = ['Users']
  //#swagger.summary = 'Gets all users.'
  const result = await mongodb
    .getDb()
    .db('project1')
    .collection('users')
    .find();
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
  const userId = ObjectId.createFromHexString(req.params.id); // preferred way
  const result = await mongodb
    .getDb()
    .db('project1')
    .collection('users')
    .find({ _id: userId });
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
  const response = await mongodb
    .getDb()
    .db('project1')
    .collection('users')
    .insertOne(user);
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
  const userId = ObjectId.createFromHexString(req.params.id); // preferred way
  const user = {
    username: req.body.username,
    email: req.body.email,
    name: req.body.name,
    ipaddress: req.body.ipaddress,
  };

  const response = await mongodb
    .getDb()
    .db('project1')
    .collection('users')
    .replaceOne({ _id: userId }, user);
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
  const userId = ObjectId.createFromHexString(req.params.id); // preferred way

  const response = await mongodb
    .getDb()
    .db('project1')
    .collection('users')
    .deleteOne({ _id: userId });
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
