import User from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export function getUser(req, res) 
{

}

export function createUser(req, res)
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

    user.save()
    .then(() =>
    {
        res.status(201).json({ message: "User Created !" });
    })
    .catch(() =>
    {

        res.status(500).json({ message: "User Creation Failed !" });
    });
};

export function loginUser(req, res)
{
    User.findOne({ email: req.body.email })
    .then((foundUser) =>
    {
        if(foundUser == null)
        {
            res.status(404).json({ message: "User Not Found !" });
        }
        else
        {
            const isPasswordMatch = bcrypt.compareSync(req.body.password, foundUser.password);

            if(isPasswordMatch)
            {
                const token = jwt.sign(
                    {
                        email: foundUser.email,
                        firstName: foundUser.firstName,
                        lastName: foundUser.lastName,
                        role: foundUser.role,
                        isEmailVerified: foundUser.isEmailVerified
                    },
                    "jwt secret");

                    res.status(200).json(
                        {
                            message: "Login Successful !",
                            token: token
                        }
                    )
            }
            else
            {
                res.status(401).json({ message: "Incorrect Password try again !" });
            }
        }
    })
    .catch(() =>
    {
        res.status(500).json({ message: "Login Failed !" });
    });
}

export function isAdmin(req,res)
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