// router.get('/', usersController.getAllUsers);
// router.get('/:id', usersController.getUserById);

const mongodb = require('../database/connect');
const { ObjectId } = require('mongodb'); 

const getAllUsers = async (req, res) => {
    const result = await mongodb.getDb().db("project1").collection('users').find();
    return result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    }).catch((err) => {
        res.status(500).json({ message: err });
    });
};

const getUserById = async (req, res) => {
    const userId = ObjectId.createFromHexString(req.params.id); // preferred way
    const result = await mongodb.getDb().db("project1").collection('users').find({_id: userId});
    return result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    }).catch((err) => {
        res.status(500).json({ message: err });
    });
};

module.exports = {
    getAllUsers,
    getUserById
};