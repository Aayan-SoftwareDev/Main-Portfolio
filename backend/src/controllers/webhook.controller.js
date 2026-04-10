const { model } = require("mongoose");
const {model_msg} = require("../models/msg_create.model.js");

const controllerCreate = async (req, res) => {
    console.log("Received Body:", req.body);
    const {email, phone, name, plan, customSolution, idea} = req.body;
    if(!email || !phone || !name || !idea) return res.status(400).json({message:"Invalid Body"});
    if(!plan && !customSolution) return res.status(400).json({message:"Invalid Body"});
    try {
        if(!plan){
            await model_msg.create({
                email,
                phone,
                name,
                customSol: customSolution,
                idea,
            });
        } else {
            await model_msg.create({
                email,
                phone,
                name,
                plan,
                idea,
            });
        }
        res.status(201).json({message:"Message Created!"});
    } catch(e) {
        console.log(`error at controller: ${e}`);
        return res.status(500).json({message:"Sever Error"});
    }
}

const controllerShowMessages = async (req, res) => {
    try {
        const messages = await model_msg.find();
        res.status(200).json({messages: messages, success:true})
    } catch(e){
        console.log(`Error at controller, e: ${e}`);
        return res.status(500).json({message:"Invalid Information!"});
    }
}

module.exports = {
    controllerCreate,
    controllerShowMessages,
}