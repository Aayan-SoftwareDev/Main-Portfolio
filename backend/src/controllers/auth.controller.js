const {Account} = require("../models/auth");
const argon2 = require('argon2');
const jwt = require("jsonwebtoken");

async function controllerLogin(req, res){
    const {username, password} = req.body;
    if(!username || !password) return res.status(400).json({message:"Bad request!"});
    try {
        const account = await Account.findOne({username: username});
        if(!account) return res.status(404).json({message:"user with these credentials not found!"});
        const isPassCorrect = await argon2.verify(account.password, password);
        if(!isPassCorrect) return res.status(404).json({message:"user with these credentials not found!"});
        const ver_username = account.username
        const token = jwt.sign({ver_username}, process.env.JWT_SECRET, {expiresIn: "1d"});
        // set the cookie in the response
        res.cookie('admin_auth_token', token, {maxAge: 24 * 60 * 60 * 1000, httpOnly: false, secure: false});

        return res.status(200).json({messade: "Login successful!"});
    } catch(e) {
        console.log(e);
        return res.status(500).json({message: "Internal server error"});
    }
}

async function controllerLogout(_, res){
    res.clearCookie("admin_auth_token");
    return res.status(200).json({message: "Logout successful!"});
}

module.exports = {
    controllerLogin,
    controllerLogout
}