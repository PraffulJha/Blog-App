import { db } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = (req,res) => {
    const q = "SELECT * FROM users where email = ? or username = ?";
    db.query(q, [req.body.email,req.body.username], (err,data) => {
        if(err) return err.json();
        if(data.length) return res.status(409).json("User already exits!");
        // hash a password
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const q = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)"
        const values = [
            req.body.username,
            req.body.email,
            hash
        ]
        db.query(q, [values],(err,data) => {
            if(err) return err.json();
            return res.status(200).json("Users added sucessfully!");

        })
    });
};
export const login = (req,res) => {
    const q = "SELECT * FROM users where username = ?";
    db.query(q,[res.body.username], (err,data) => {
        if(err) return err.json();
        if(username.length === 0) return res.status(404).json("USer not found!");
        // check password
        const isPasswordCorrect = bcrypt.compareSync(res.body.password, data[0].password)
        if(!isPasswordCorrect) return res.status(400).json("Username or password is incorrect!");
        const token = jwt.sign({id:data[0].id},"jwtkey")
        const {password, ...other} = data[0];
        res.cookie("access_token",token,{httpOnly: true}).status(200).json(data[0])
    })

}
export const logout = (req,res) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    }).status(200).json("User has bee Logged Out!")

}