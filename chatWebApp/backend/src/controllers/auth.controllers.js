import bcrypt from "bcryptjs";
import User from "../models/user.model.js"

export const signup = async(req, res) => {
    const {fullName, email, password} = req.body;
    try {
        if(!fullName || !email || !password){
            return res.status(400).json({Message: "All fields are required"});
        }

        if(password.length < 6){
            return res.status(400).json({Message:"Password must be atleast 6 characters long"});
        }

        const user = await User.findOne({email});

        if(user){
            return res.status(400).json({Message:"User already exists with this email"});
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });

        if(newUser){
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            })
        }
    } catch (error) {
        
    }
};


export const login = async(req, res) => {};


export const logout = async(req, res) => {};


export const updateProfile = async(req, res) => {};