const express = require('express');
const {user} = require('../models/Auth');

const router = express.Router();


router.post('/login',async (req, res)=>
{

  console.log(req.body.it);
  
 
   //* Initially checking if we have the user in our DB or not and if not then only er are pushing into DB */

  try {
    const userCheck = await user.findOne({email: req.body.it.Tt});
    if(userCheck)
    {
      res.status(200).json(
        {
          status: true,
          message: "Login In Success"
        }
      )
    }
    else 
    {
      console.log(req.body);
    const name=req.body.it.Se;
    
    const email=req.body.it.Tt;
    const photo=req.body.it.SJ ;
    const ip = req.socket.remoteAddress;
    

    

    

    const newUser= await new user({ name:name,email:email,photo:photo,ip:ip });


    if(!newUser)
    {
      res.status(200).json(
        {
          status: false,
          message: "User Not Added!!"
        }
      )
    }
    else 
    {
      await newUser.save((err,data)=>{
        if(err)
        {
          console.log(err);
          res.send(err);
  
        }
  
        else{
          console.log(data);
          res.status(200).send(data);
        }
  
      })

    }

    


  }

    
 } catch (error) {
    console.log(error);
    
  }
     
    
})

router.get('/testSample', (req, res)=>
{
  
  res.status(200).json(
    {
      status: true,
      message: "OK"
    }
  )
})


module.exports = router;