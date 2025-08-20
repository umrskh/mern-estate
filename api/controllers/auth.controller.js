import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';

export const signup = async(req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  const hashesdPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashesdPassword });
   try{
    await newUser.save()
    res.status(201).json({ message: 'User created successfully'});
   }
    catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
    }
    
}