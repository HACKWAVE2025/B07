const connectDB = require("./config/db.js");
const mongoose = require("mongoose");
const Scheme = require("./models/Scheme.js");
require("dotenv").config();


connectDB().then(async () => {
    try {

        const centralSchemes = [
            {
                name: "Pradhan Mantri Jan Dhan Yojana",
                category: "welfare",
                authority: "central",
                state: "All",
                description: "Zero-balance bank accounts & financial inclusion for poor/unbanked citizens.",
                eligibilityCriteria: {
                    minAge: 10,
                    maxAge: 65,
                    occupation: [],
                    incomeLimit: null,
                    gender: []
                },
                deadline: null,
                applyLink: "https://pmjdy.gov.in/scheme",
                addedBy: "admin"
            },
            {
                name: "Ayushman Bharat – Pradhan Mantri Jan Arogya Yojana",
                category: "welfare",
                authority: "central",
                state: "All",
                description: "Health insurance cover up to ₹5 lakh per family per year for eligible low-income families.",
                eligibilityCriteria: {
                    minAge: 0,
                    maxAge: 100,
                    occupation: [],
                    incomeLimit: null,
                    gender: []
                },
                deadline: null,
                applyLink: "https://pmjay.gov.in",
                addedBy: "admin"
            },
            {
                name: "Pradhan Mantri Awas Yojana (Gramin)",
                category: "welfare",
                authority: "central",
                state: "All",
                description: "Housing for all in rural India: construction/subsidy for eligible households.",
                eligibilityCriteria: {
                    minAge: 18,
                    maxAge: 60,
                    occupation: [],
                    incomeLimit: null,
                    gender: []
                },
                deadline: null,
                applyLink: "https://pmayg.nic.in",
                addedBy: "admin"
            },
            {
                name: "Startup India",
                category: "startup",
                authority: "central",
                state: "All",
                description: "Facilitation, incentives and recognition for innovative start-ups in India.",
                eligibilityCriteria: {
                    minAge: 0,
                    maxAge: null,
                    occupation: ["startup founder"],
                    incomeLimit: null,
                    gender: []
                },
                deadline: null,
                applyLink: "https://startupindia.gov.in",
                addedBy: "admin"
            },
            {
                name: "Stand Up India",
                category: "business",
                authority: "central",
                state: "All",
                description: "Loans between ₹10 lakh and ₹1 crore for SC/ST & women entrepreneurs to set up green-field enterprises.",
                eligibilityCriteria: {
                    minAge: 18,
                    maxAge: null,
                    occupation: [],
                    incomeLimit: null,
                    gender: ["female"]
                },
                deadline: null,
                applyLink: "https://www.standupmitra.in",
                addedBy: "admin"
            },
            {
                name: "Pradhan Mantri MUDRA Yojana",
                category: "business",
                authority: "central",
                state: "All",
                description: "Loans for micro-units/entrepreneurs up to ₹10 lakh (Shishu/Kishor/Tarun categories) to promote entrepreneurship.",
                eligibilityCriteria: {
                    minAge: 18,
                    maxAge: null,
                    occupation: [],
                    incomeLimit: null,
                    gender: []
                },
                deadline: null,
                applyLink: "https://financialservices.gov.in/beta/en/homepagejansuraksha/pradhan-mantri-mudra-yojana",
                addedBy: "admin"
            },
            {
                name: "Pradhan Mantri Fasal Bima Yojana",
                category: "farmer",
                authority: "central",
                state: "All",
                description: "Crop insurance for farmers: protection from yield losses, natural calamities and post-harvest losses.",
                eligibilityCriteria: {
                    minAge: null,
                    maxAge: null,
                    occupation: ["farmer"],
                    incomeLimit: null,
                    gender: []
                },
                deadline: null,
                applyLink: "https://pmfby.gov.in",
                addedBy: "admin"
            }
        ];







        const moreCentralSchemes = [
            {
                name: "Atal Pension Yojana",
                category: "welfare",
                authority: "central",
                state: "All",
                description: "A pension scheme for unorganised sector workers: central government guarantees minimum monthly pension after age 60. :contentReference[oaicite:0]{index=0}",
                eligibilityCriteria: {
                    minAge: 18,
                    maxAge: 40,
                    occupation: [],
                    incomeLimit: null,
                    gender: []
                },
                deadline: null,
                applyLink: "https://www.pfrda.org.in/web/pfrda/schemes/atal-pension-yojana-apy",
                addedBy: "admin"
            },
            {
                name: "Atal Bhujal Yojana",
                category: "other",
                authority: "central",
                state: "All",
                description: "Scheme for sustainable groundwater management & community-based conservation in selected gram panchayats. :contentReference[oaicite:1]{index=1}",
                eligibilityCriteria: {
                    minAge: 0,
                    maxAge: null,
                    occupation: [],
                    incomeLimit: null,
                    gender: []
                },
                deadline: null,
                applyLink: "https://ibef.org/government-schemes/atal-bhujal-yojana",
                addedBy: "admin"
            },
            {
                name: "One Nation-One Ration Card Scheme",
                category: "welfare",
                authority: "central",
                state: "All",
                description: "Portability of subsidised foodgrain benefits across India: beneficiaries can access from any Fair Price Shop in any state. :contentReference[oaicite:2]{index=2}",
                eligibilityCriteria: {
                    minAge: 0,
                    maxAge: null,
                    occupation: [],
                    incomeLimit: null,
                    gender: []
                },
                deadline: null,
                applyLink: "https://theiashub.com/upsc/government-schemes-in-india/",
                addedBy: "admin"
            },
            {
                name: "Pradhan Mantri Surya Ghar Muft Bijli Yojana",
                category: "other",
                authority: "central",
                state: "All",
                description: "Scheme to provide rooftop solar installations (or free electricity) to large number of households, promoting renewable energy. :contentReference[oaicite:3]{index=3}",
                eligibilityCriteria: {
                    minAge: 0,
                    maxAge: null,
                    occupation: [],
                    incomeLimit: null,
                    gender: []
                },
                deadline: null,
                applyLink: "https://pmsuryaghar.gov.in",
                addedBy: "admin"
            },
            {
                name: "Pradhan Mantri Kaushal Vikas Yojana (PMKVY)",
                category: "student",
                authority: "central",
                state: "All",
                description: "Skill-development scheme: trains youth in industry relevant skills and provides certification. :contentReference[oaicite:4]{index=4}",
                eligibilityCriteria: {
                    minAge: 18,
                    maxAge: null,
                    occupation: [],
                    incomeLimit: null,
                    gender: []
                },
                deadline: null,
                applyLink: "https://www.pmkvyofficial.org/",
                addedBy: "admin"
            },
            {
                name: "Beti Bachao Beti Padhao",
                category: "welfare",
                authority: "central",
                state: "All",
                description: "Campaign and scheme to improve the sex-ratio, welfare of girls, education for girls. :contentReference[oaicite:5]{index=5}",
                eligibilityCriteria: {
                    minAge: 0,
                    maxAge: null,
                    occupation: [],
                    incomeLimit: null,
                    gender: ["female"]
                },
                deadline: null,
                applyLink: "https://wcd.nic.in/beti-bachao-beti-padhao-scheme",
                addedBy: "admin"
            },
            {
                name: "Production Linked Incentive (PLI) Scheme",
                category: "business",
                authority: "central",
                state: "All",
                description: "Incentive scheme to boost manufacturing & exports in targeted sectors – firms get incentives for incremental production. :contentReference[oaicite:6]{index=6}",
                eligibilityCriteria: {
                    minAge: 0,
                    maxAge: null,
                    occupation: ["manufacturer", "exporter"],
                    incomeLimit: null,
                    gender: []
                },
                deadline: null,
                applyLink: "https://dpiit.gov.in/incentives/schemes/production-linked-incentive-scheme",
                addedBy: "admin"
            },
            {






                
                name: "Atmanirbhar Bharat Rojgar Yojana",
                category: "welfare",
                authority: "central",
                state: "All",
                description: "Scheme to promote employment creation and provide social security for new employees in EPFO-registered establishments post-COVID period. :contentReference[oaicite:7]{index=7}",
                eligibilityCriteria: {
                    minAge: 18,
                    maxAge: null,
                    occupation: [],
                    incomeLimit: null,
                    gender: []
                },
                deadline: null,
                applyLink: "https://www.epfindia.gov.in/site_en/index.php",
                addedBy: "admin"
            }
        ];

        const stateData = require("./statedata.js");

        // const result = await Scheme.insertMany(moreCentralSchemes);
        // const result = await Scheme.insertMany(stateData);

        console.log("successfull");


        process.exit();


    } catch (err) {
        console.log(err);
    }
});