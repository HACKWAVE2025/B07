const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  occupation: { 
    type: String, 
    enum: ["student", "farmer", "entrepreneur", "employee", "other"], 
    required: true 
  },
  income: { type: Number },
  state: { type: String },
  age: { type: Number },
  gender: { type: String, enum: ["male", "female", "other"] },
  caste: { type: String ,enum:["OC","OBC","SC","ST"]},
  eligibleSchemes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Scheme" }], // linked schemes
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);