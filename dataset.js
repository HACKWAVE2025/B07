const mongoose = require("mongoose");
const connectDB = require("./config/db.js");
const Scheme = require("./models/Scheme.js");
require("dotenv").config();


connectDB().then(async () => {
    try {

        
        const farmers = require("./datasets/farmersdata.js");
        const students = require("./datasets/students.js");
        const startups = require("./datasets/startupdata.js");
        const women = require("./datasets/women.js");
        const others = require("./datasets/others.js");

        // const result = await Scheme.insertMany(moreCentralSchemes);
        // const result = await Scheme.insertMany(stateData);
        // const result = await Scheme.insertMany(farmers);
        // console.log("done farmers");
        //const result1 = await Scheme.insertMany(startups);
        //console.log("done startups");
        // const result2 = await Scheme.insertMany(students);
        // console.log("done students");
        //const result3 = await Scheme.insertMany(women);
        //console.log("done women");
        //const result4 = await Scheme.insertMany(others);
        //console.log("done others");
        //const result = await Scheme.deleteMany();

        console.log("successfull");


        process.exit();


    } catch (err) {
        console.log(err);
    }
});