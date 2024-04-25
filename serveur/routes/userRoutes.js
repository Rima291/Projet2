const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');



// creating user
router.post('/', async(req, res)=> {
  try {
    const {name, email, address ,phone,domaine ,password, picture} = req.body;
    console.log(req.body);
    const user = await User.create({name, email, address ,phone,domaine ,password, picture});
    res.status(201).json(user);
  } catch (e) {
    let msg;
    if(e.code == 11000){
      msg = "User already exists"
    } else {
      msg = e.message;
    }
    console.log(e);
    res.status(400).json(msg)
  }
})
 
router.post('/exist', async (req, res) => {
  try {
      data = req.body;
     existingUser = await User.findOne({ email: data.email });
      res.send({ exists: !!existingUser });
  } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal Server Error' });
  }
});
// login user

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    user.status = "online";
    await user.save();
     res.status(200).json({ user });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.post('/forgot-password', (req, res) => {
  const {email }= req.body;
  User.findOne({email: email})
  .then(user => {
      if(!user) {
          return res.send({Status: "User not existed"})
      } 
       token = jwt.sign({id: user._id}, 'CVNHFFTYJK', {expiresIn: "1d"})
      var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'rymahammami42@gmail.com',
            pass: 'iqme wwtc abmg sbqm'
          }
        });
        
        var mailOptions = {
          from: 'rymahammami42@gmail.com',
          to: email,
          subject: 'Reset Password Link',
          text: `http://localhost:3001/resetPass/${user._id}/${token}`

        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            return res.send({Status: "Success"})
          }
        });
  })
});
router.post('/reset-password/:id/:token', (req, res) => {
  const {id, token} = req.params
  const {password} = req.body

  jwt.verify(token, "CVNHFFTYJK", (err, decoded) => {
      if(err) {
          return res.json({Status: "Error with token"})
      } else {
          bcrypt.hash(password, 10)
          .then(hash => {
              User.findByIdAndUpdate({_id: id}, {password: hash})
              .then(u => res.send({Status: "Success"}))
              .catch(err => res.send({Status: err}))
          })
          .catch(err => res.send({Status: err}))
      }
  })
});
//create user 

router.post("/create",  (req, res) => {
  const { name, email, address, phone, domaine, password, picture } = req.body;
  
  User.create({ name, email, address, phone, domaine, password, picture })
    .then(user => res.json(user))
    .catch(err => res.status(400).json(err));
});

//all users
router.get('/allUsers', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(500).json({ message: err.message }));
});

router.put('/updateRole/:userId', async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, { role }, { new: true });
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating user role.' });
  }
});

router.get('/usersWithoutRoles', async (req, res) => {
  try {
    const usersWithoutRoles = await User.find({ role: 'user' });
    res.json(usersWithoutRoles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving users without roles.' });
  }
});
router.get('/usersWithRoles', async (req, res) => {
  try {
    // Recherche tous les utilisateurs avec un rôle défini et différent de 'user'
    const usersWithRoles = await User.find({ role: { $exists: true, $ne: 'user' } });
    res.json(usersWithRoles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving users with roles.' });
  }
});


router.delete('/delete/:id', (req,res) => {
  const id = req.params.id;
  User.findByIdAndDelete({_id: id})
  .then(res => res.json(res))
  .catch(err => res.json(err))
});

 //update
 router.get('/getUser/:id', (req,res)=>{
  const id = req.params.id;
  User.findById({_id: id})
  .then(users => res.json(users))
  .catch(err => res.json(err))
});

//update
router.put('/update/:id', (req, res) =>{
const id = req.params.id;
User.findByIdAndUpdate({_id:id},
   {

    name: req.body.name, 
    email: req.body.email,
    address: req.body.address, 
    phone: req.body.phone, 
    domaine: req.body.domaine,
    role: req.body.role,

  })
.then(users => res.json(users))
  .catch(err => res.json(err))
});


module.exports = router