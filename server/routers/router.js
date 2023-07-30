const express = require('express');
const router = express.Router();
const users = require('../models/UsersSchema');

// Add the express.json() middleware to parse the request body
router.use(express.json());

// register user
router.post('/register', async (req, res) => {
  const { name, email, age, phone, work, address, description } = req.body;

  if (!name || !email || !age || !phone || !work || !address || !description) {
    return res.status(422).json('Please fill all the required data');
  }

  try {
    const preuser = await users.findOne({ email: email });

    if (preuser) {
      return res.status(422).json('This user is already present');
    } else {
      const adduser = new users({
        name,
        email,
        age,
        phone,
        work,
        address,
        description,
      });

      await adduser.save();
      res.status(201).json(adduser);
      console.log(adduser);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json('Server Error');
  }
});

// get users

router.get('/getusers', async (req, res) => {
  try {
    const getUsersData = await users.find();
    res
      .status(200)
      .json({ data: getUsersData, message: 'User fetched successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json('Server Error');
  }
});

// delete users
router.delete('/delete/:id', async (req, res) => {
  try {
    // Find the user by ID in the database and delete
    const deletedUser = await users.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      // If the user is not found, return 404
      return res.status(404).send('User not found');
    }

    // If the user is found and deleted successfully, return 200
    res.status(200).send('User deleted successfully');
  } catch (error) {
    // Handle server errors
    res.status(500).json('Server Error');
  }
});

// edit user

router.patch('/edit/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    const updatedUser = req.body;

    const EditedUsersData = await users.findByIdAndUpdate(userId, updatedUser, {
      new: true,
    });
    if (EditedUsersData) {
      return res.status(201).send('User data updated successfully');
    }
    return res.status(400).send('somethinhg went wrog');
  } catch (err) {
    console.log(err);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
