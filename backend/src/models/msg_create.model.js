const mongoose = require("mongoose");
const validator = require("validator"); // Recommended library for deep string validation

const msg_create = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email address"],
        maxlength: [100, "Email is too long"]
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
        trim: true,
        validate: {
            validator: function(v) {
                // Validates that it starts with 03 and has 11 digits total
                return /^03\d{9}$/.test(v);
            },
            message: "Please provide a valid Pakistani mobile number (03XXXXXXXXX)"
        }
    },
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        maxlength: [50, "Name cannot exceed 50 characters"]
    },
    idea: {
        type: String,
        required: [true, "Idea description is required"],
        maxlength: [2000, "Idea description is too long"]
    },
    plan: {
        type: String,
        maxlength: [1000, "Plan description is too long"]
    },
    customSol: {
        type: String,
        maxlength: [1000, "Custom solution text is too long"]
    }
}, { 
    timestamps: true // Automatically adds createdAt and updatedAt
});

const model_msg = mongoose.model("msg", msg_create);

module.exports = {
    model_msg,
};