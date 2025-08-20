const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];

// GET request: Retrieve all users
router.get("/",(req,res)=>{
  // Copy the code here
  res.json({ users }); // This line returns the list of users as JSON
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
  let user = users.find(user => user.email === req.params.email);
  res.send(user); // This line returns the user object if found
});


// POST request: Create a new user
router.post("/",(req,res)=>{
  let newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    DOB: req.body.DOB
  };
  users.push(newUser);
  res.send(newUser);
});


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
  let userIndex = users.findIndex(user => user.email === req.params.email);
  if (userIndex !== -1) {
    users[userIndex] = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      DOB: req.body.DOB
    };
    res.send(users[userIndex]);
  } else {
    res.status(404).send("User not found");
  }
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  let userIndex = users.findIndex(user => user.email === req.params.email);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.send("User deleted");
  } else {
    res.status(404).send("User not found");
  } 
});

module.exports=router;
