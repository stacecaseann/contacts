const mongodb = require('./connect');
const { ObjectId } = require('mongodb');

const getCollection = () => {
  return mongodb.getDb().db('project1').collection('users');
};

const getAllUsersFromDb = async () => {
  const result = await getCollection().find();
  return result;
};

const getUserByIdFromDb = async (id) => {
  const userId = ObjectId.createFromHexString(id); // preferred way
  const result = await getCollection().find({ _id: userId });
  return result;
};

const createUserInDb = async (user) => {
  const response = await getCollection().insertOne(user);
  return response;
};

const updateUserInDb = async (id, user) => {
  const userId = ObjectId.createFromHexString(id); // preferred way
  const response = await getCollection().replaceOne({ _id: userId }, user);
  return response;
};

const deleteUserFromDb = async (id) => {
  const userId = ObjectId.createFromHexString(id); // preferred way
  const response = await getCollection().deleteOne({ _id: userId });
  return response;
};

module.exports = {
  getAllUsersFromDb,
  getUserByIdFromDb,
  createUserInDb,
  updateUserInDb,
  deleteUserFromDb,
};
