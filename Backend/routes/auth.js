const express = require('express');
const router = express.Router();
const User = require('../models/User');

const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET= 'SECRETKEY';
var fetchuser = require('../middleware/fetchuser');


//ROUTE 1: For creating a user
router.post('/createuser', [
    body('name').isLength({ min: 4 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('age'),
    body('batch'),
], async (req, res)=>{
  let success = false;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
      }
      try {
      let user = await User.findOne({email: req.body.email});
      if(user){
        return res.status(400).send({message: "Sorry a user with this email already exists"})
      }
      const salt = bcrypt.genSaltSync(10);
      const secPass =  bcrypt.hashSync(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
        age: req.body.age,
        batch: req.body.batch
      })
      const data = {
        user:{
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      if(success)
      return res.status(200).send({success,message: "You are now Registered", authtoken});
      res.json({success,authtoken})


    } catch (error){
      console.error(error.message);
      res.status(500).send("Some Error occured");
    }
      
})
  //ROUTE 2: For login a user
router.post('/login', [
  body('email').isEmail(),
  body('password', 'Does not blank').exists(),
], async (req, res)=>{
  let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  const {email, password} = req.body;
  try {
    let user = await User.findOne({email});
    if(!user){
      success = false;
      return res.status(400).send({message: "Please try to login with correct E-mail"})
    }
  const passwordcompare = await bcrypt.compare(password, user.password);
  if(!passwordcompare){
    success = false;
    return res.status(400).send({success,message: "Please try to login with correct Password"})
  }
  
  const data = {
    user:{
      id: user.id
    }
  }
  const authtoken = jwt.sign(data, JWT_SECRET);
  success = true;
  if(success)
  return res.status(400).send({success,message: "login Successfully", user})
  res.send({success, authtoken})


} catch (error){
  console.error(error.message);
  res.status(500).send("Some Error occured");
}
  });
  
//ROUTE 3: Get loggedin user details using POST
router.post('/getuser',fetchuser, async (req, res)=>{
try{
  const userId= req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
}
catch (error){
  console.error(error.message);
  res.status(500).send("Some Error occured");
}
})

router.post("/updatebatch/",[
  body('email').isEmail(),
  body('batch', 'Does not blank').exists(),
], async(req,res) =>{
User.findOne({email:req.body.email})
.then(result=>{
if(result.length<1){
  return res.status(401).json({
    message:"user not found",
    status:false,
    code:200,
  })
}
if(result.length>0)
{
  User.findByIdAndUpdate(result[0]._id, { batch: req.body.batch },
                            function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Updated User : ", docs);
        res.status(200).json({
          update_user:result,
          message:"updated successfully"
        })
    }
});
}
})
.catch(err=>{
  return res.status(404).json({
    message:"server error",
    status:false,
    code:404,
  })
})
// const batch = req.body;
//     // Creae a new note
//     const newNote = {};
//     if(batch){newNote.batch= batch};
//     // Find the note to be updated
//     let note = await User.findById(req.params.id);
//     if(!note){return res.status(404).send("Not Found")}

//     note = await User.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
//     res.json({note})

})

module.exports = router;