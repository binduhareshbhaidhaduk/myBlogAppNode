const signup= require('../model/signUp-model');
const bcrypt = require('bcrypt');
const saltRounds=8;

const signUpForm = async (req, res) => {
        console.log('signUp')
        res.render('signUp');
}

const signUpCon=async (req,res)=>{

    if(req.body.password === req.body.con_pass){
        console.log(req.body)
        bcrypt.hash(req.body.password, saltRounds,async function (err, hash) {
            try{
                
            // Store hash in your password DB.
            console.log(hash,'hash')
            const Users =await new signup({
                path:req.file.path,
                name:req.body.name,
                email:req.body.email,
                password:hash
                });
                let user=  await  Users.save();

            console.log(user,'users')
            res.redirect('/logInForm')
            }catch(err){
                console.log(err,'err')  
                res.status(400).send({message:err.message})
            }
        });

    }else{
        res.redirect('/signUpForm')
    }

}

module.exports ={signUpCon,signUpForm}