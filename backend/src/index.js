const express = require("express");
const dotnev = require("dotenv");
const {connectDB} = require("./connectDb");
const {router} = require("./routes/webhook.route");
const {controllerLogin} = require("./controllers/auth.controller");
const {Account} = require("./models/auth");
const {controllerShowMessages} = require("./controllers/webhook.controller");
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");
const cors = require("cors");

dotnev.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.ENV === "development" 
        ? "http://localhost:5173" 
        : "https://main-portfolio-eta-one.vercel.app", 
    credentials: true,
}));

const isAdmin = async (req, res, next) => {
    try {
        if(!req.cookies.admin_auth_token){
            return res.status(401).json({message: "unauthorized"});
        }
        const token = req.cookies.admin_auth_token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const username = decoded.ver_username;
        const account = await Account.findOne({username}); 
        if(!account){
            return res.status(401).json({message: "Invalid Token!"});
        }
        req.username = username;
        next();
    } catch (error) {
        return res.status(401).json({message: "Invalid or Expired Token"});
    }
};

app.use("/webhook", router);
app.post("/login", controllerLogin);
app.post("/admin/show", isAdmin, controllerShowMessages);
app.get("/admin/verify", isAdmin, (_, res) => res.status(200).json({ok: true}));

if(process.env.ENV == "development"){
    connectDB().then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on PORT: ${process.env.PORT}`);
        });
    });
} else {
    connectDB();
    module.exports = app
}
