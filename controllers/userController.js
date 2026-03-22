import User from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export function getUser(req, res) 
{
    
}

export async function createUser(req, res)
{
    try
    {
        const hashPassword = bcrypt.hashSync(req.body.password, 10);

        const user = new User(
            {
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: hashPassword,
                role: req.body.role
            }
        );

        await user.save();
        res.status(201).json({ message: "User Created !" });
    }
    catch(error)
    {
        res.status(500).json({ message: "User Creation Failed !" });
    }
};


export async function loginUser(req, res)
{
    try
    {
        const foundUser = await User.findOne({ email: req.body.email });

        if(!foundUser)
        {
            res.status(404).json({ message: "User Not Found !" });
            return;
        };

        const isPasswordMatch = bcrypt.compareSync(req.body.password, foundUser.password);

        if(!isPasswordMatch)
        {
            res.status(401).json({ message: "Incorrect Password try again !" });
            return;
        }

        const token = jwt.sign(
        {
            email: foundUser.email,
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            role: foundUser.role,
            isEmailVerified: foundUser.isEmailVerified
        },
        "jwt secret"
        );

        res.status(200).json(
        {
            message: "Login Successful !",
            token: token
        });
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ message: "Login Failed !" });
    };
}

export function isAdmin(req)
{
    if(!req.user)
    {
        return false;
    }

    if(req.user.role !== "admin")
    {
        return false;
    }

    return true;
}

export function isCustomer(req)
{
    if(!req.user)
    {
        return false;
    }

    if(req.user.role !== "customer")
    {
        return false;
    }

    return true;
}