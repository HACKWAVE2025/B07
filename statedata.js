// stateSchemesAll.js
const stateSchemesAll = [
  // ===== Telangana (5) =====
  {
    name: "Rythu Bandhu Scheme",
    category: "farmer",
    authority: "state",
    state: "Telangana",
    description: "Direct investment support for land-holding farmers in Telangana (cash support per acre for cultivation inputs).",
    eligibilityCriteria: {
      minAge: 18,
      maxAge: null,
      occupation: ["farmer"],
      incomeLimit: null,
      gender: []
    },
    deadline: null,
    applyLink: "http://rythubandhu.telangana.gov.in/",
    addedBy: "admin"
  },
  {
    name: "Dalit Bandhu",
    category: "welfare",
    authority: "state",
    state: "Telangana",
    description: "One-time financial assistance & support package for eligible SC families to start an income-generating activity or enterprise.",
    eligibilityCriteria: {
      minAge: 18,
      maxAge: null,
      occupation: [],
      incomeLimit: null,
      gender: []
    },
    deadline: null,
    applyLink: "https://www.telangana.gov.in/", // Telangana government portal — check Dalit Bandhu section
    addedBy: "admin"
  },
  {
    name: "Aasara Pension Scheme",
    category: "welfare",
    authority: "state",
    state: "Telangana",
    description: "Monthly pension support for elderly, widows, disabled and other vulnerable persons in Telangana.",
    eligibilityCriteria: {
      minAge: 18,
      maxAge: null,
      occupation: [],
      incomeLimit: null,
      gender: []
    },
    deadline: null,
    applyLink: "https://www.telangana.gov.in/departments/social-welfare", // state welfare department landing
    addedBy: "admin"
  },
  {
    name: "Gruha Jyothi / Solar Rooftop Support (Telangana)",
    category: "other",
    authority: "state",
    state: "Telangana",
    description: "State-level support and facilitation for household rooftop solar installations and energy-efficiency measures.",
    eligibilityCriteria: {
      minAge: 18,
      maxAge: null,
      occupation: [],
      incomeLimit: null,
      gender: []
    },
    deadline: null,
    applyLink: "https://www.telanganagaas.in/", // Telangana energy / schemes area (state portal)
    addedBy: "admin"
  },
  {
    name: "Rajiv Yuva Vikasam",
    category: "student",
    authority: "state",
    state: "Telangana",
    description: "Skill development and youth entrepreneurship support program (training, loans & handholding for unemployed youth).",
    eligibilityCriteria: {
      minAge: 16,
      maxAge: 35,
      occupation: ["unemployed","student","youth"],
      incomeLimit: null,
      gender: []
    },
    deadline: null,
    applyLink: "https://www.telangana.gov.in/departments/skill-development", // state skill/industry dept
    addedBy: "admin"
  },

  // ===== Andhra Pradesh (5) =====
  {
    name: "YSR Rythu Bharosa",
    category: "farmer",
    authority: "state",
    state: "Andhra Pradesh",
    description: "Direct cash support to eligible farmer families in Andhra Pradesh to support crop investments and welfare.",
    eligibilityCriteria: {
      minAge: 18,
      maxAge: null,
      occupation: ["farmer"],
      incomeLimit: null,
      gender: []
    },
    deadline: null,
    applyLink: "https://www.ysrrythubharosa.ap.gov.in/",
    addedBy: "admin"
  },
  {
    name: "Amma Vodi",
    category: "student",
    authority: "state",
    state: "Andhra Pradesh",
    description: "Financial assistance paid to mothers/guardians for sending children to school (education support program).",
    eligibilityCriteria: {
      minAge: 18,
      maxAge: null,
      occupation: ["student","guardian"],
      incomeLimit: null,
      gender: ["female"]
    },
    deadline: null,
    applyLink: "https://kadapa.ap.gov.in/navaratnalu/", // state scheme portal reference (Amma Vodi details)
    addedBy: "admin"
  },
  {
    name: "Jagananna Gorumudda / Nutritional Support Program",
    category: "welfare",
    authority: "state",
    state: "Andhra Pradesh",
    description: "State program to enhance child and maternal nutrition with school mid-day meals and maternal support (local brand names vary).",
    eligibilityCriteria: {
      minAge: 0,
      maxAge: null,
      occupation: ["student","mother"],
      incomeLimit: null,
      gender: []
    },
    deadline: null,
    applyLink: "https://www.ap.gov.in/", // Andhra Pradesh official government portal (nutrition program pages)
    addedBy: "admin"
  },
  {
    name: "Pedalandariki Illu",
    category: "welfare",
    authority: "state",
    state: "Andhra Pradesh",
    description: "Housing for poor — state implementation of mass housing programs to provide pucca houses for eligible beneficiaries.",
    eligibilityCriteria: {
      minAge: 18,
      maxAge: null,
      occupation: [],
      incomeLimit: null,
      gender: []
    },
    deadline: null,
    applyLink: "https://ap.gov.in/", // AP government schemes portal (housing program pages)
    addedBy: "admin"
  },
  {
    name: "YSR Free Crop Insurance",
    category: "farmer",
    authority: "state",
    state: "Andhra Pradesh",
    description: "State-supplemented crop insurance program providing premium support for eligible farmers under state schemes.",
    eligibilityCriteria: {
      minAge: 18,
      maxAge: null,
      occupation: ["farmer"],
      incomeLimit: null,
      gender: []
    },
    deadline: null,
    applyLink: "https://pmfby.gov.in/", // central crop insurance portal (state variants handled via this portal)
    addedBy: "admin"
  },

  // ===== Tamil Nadu (5) =====
  {
    name: "Kalaignar Magalir Urimai Thogai",
    category: "women",
    authority: "state",
    state: "Tamil Nadu",
    description: "Monthly financial assistance to eligible women heads of households in Tamil Nadu (benefit amount per state notification).",
    eligibilityCriteria: {
      minAge: 18,
      maxAge: null,
      occupation: [],
      incomeLimit: null,
      gender: ["female"]
    },
    deadline: null,
    applyLink: "https://www.tn.gov.in/", // Tamil Nadu government portal — welfare schemes section
    addedBy: "admin"
  },
  {
    name: "Pudhumai Penn",
    category: "student",
    authority: "state",
    state: "Tamil Nadu",
    description: "Support for girl students in higher education (scholarships / monetary assistance under state programs).",
    eligibilityCriteria: {
      minAge: 17,
      maxAge: 30,
      occupation: ["student"],
      incomeLimit: null,
      gender: ["female"]
    },
    deadline: null,
    applyLink: "https://www.tn.gov.in/departments/welfare", // TN welfare/education portal
    addedBy: "admin"
  },
  {
    name: "Amma Two Wheeler Scheme for Working Women",
    category: "women",
    authority: "state",
    state: "Tamil Nadu",
    description: "Assistance program to help working women buy two-wheelers (subsidy/loan support subject to state rules).",
    eligibilityCriteria: {
      minAge: 18,
      maxAge: null,
      occupation: ["working_women"],
      incomeLimit: null,
      gender: ["female"]
    },
    deadline: null,
    applyLink: "https://www.tn.gov.in/department/16", // TN transport / schemes reference
    addedBy: "admin"
  },
  {
    name: "Kudimaramathu Scheme",
    category: "other",
    authority: "state",
    state: "Tamil Nadu",
    description: "Community-based restoration and maintenance of water bodies and irrigation assets to improve local irrigation and water security.",
    eligibilityCriteria: {
      minAge: 0,
      maxAge: null,
      occupation: ["farmer"],
      incomeLimit: null,
      gender: []
    },
    deadline: null,
    applyLink: "https://www.tn.gov.in/department/11", // TN rural/water resources department
    addedBy: "admin"
  },

  // ===== Gujarat (5) =====
  {
    name: "Namo Lakshmi Yojana",
    category: "student",
    authority: "state",
    state: "Gujarat",
    description: "Financial assistance / scholarship for girl students in Gujarat for secondary & higher secondary studies (state guidelines define amounts).",
    eligibilityCriteria: {
      minAge: 14,
      maxAge: 18,
      occupation: ["student"],
      incomeLimit: null,
      gender: ["female"]
    },
    deadline: null,
    applyLink: "https://www.gujaratindia.gov.in/", // Gujarat state official portal - education / schemes
    addedBy: "admin"
  },
  {
    name: "Vahli Dikri Yojana",
    category: "student",
    authority: "state",
    state: "Gujarat",
    description: "Scheme to encourage girl child welfare via savings / scholarship support and incentives on school progression.",
    eligibilityCriteria: {
      minAge: 0,
      maxAge: 18,
      occupation: ["student"],
      incomeLimit: null,
      gender: ["female"]
    },
    deadline: null,
    applyLink: "https://www.sje.gujarat.gov.in/", // Gujarat social justice & empowerment department
    addedBy: "admin"
  },
  {
    name: "Mukhyamantri Kisan Sahay Yojana",
    category: "farmer",
    authority: "state",
    state: "Gujarat",
    description: "State support program to compensate or assist farmers affected by crop loss due to natural calamities (details under state disaster response/agrdepts).",
    eligibilityCriteria: {
      minAge: 18,
      maxAge: null,
      occupation: ["farmer"],
      incomeLimit: null,
      gender: []
    },
    deadline: null,
    applyLink: "https://agri.gujarat.gov.in/", // Gujarat agriculture department portal
    addedBy: "admin"
  },
  {
    name: "Mukhyamantri Mahila Kisan Sashaktikaran Yojana",
    category: "women",
    authority: "state",
    state: "Gujarat",
    description: "Support & capacity building for women farmers (training, inputs and small asset assistance under state programs).",
    eligibilityCriteria: {
      minAge: 18,
      maxAge: null,
      occupation: ["farmer","women"],
      incomeLimit: null,
      gender: ["female"]
    },
    deadline: null,
    applyLink: "https://www.gujaratindia.gov.in/departments/agriculture", // state agriculture dept landing
    addedBy: "admin"
  },

  // ===== Maharashtra (5) =====
  {
    name: "Mukhyamantri Saur Krushi Pump Yojana",
    category: "farmer",
    authority: "state",
    state: "Maharashtra",
    description: "Provision and subsidy for solar-powered agricultural pumps for farmers to reduce diesel/electricity dependence.",
    eligibilityCriteria: {
      minAge: 18,
      maxAge: null,
      occupation: ["farmer"],
      incomeLimit: null,
      gender: []
    },
    deadline: null,
    applyLink: "https://www.mahadiscom.in/solar/index.html",
    addedBy: "admin"
  },
  {
    name: "Majhi Kanya Bhagyashree / Mamhi Kanya",
    category: "women",
    authority: "state",
    state: "Maharashtra",
    description: "State-level girl child support scheme — incentives/savings oriented programs to improve education and welfare outcomes for girls.",
    eligibilityCriteria: {
      minAge: 0,
      maxAge: 21,
      occupation: ["student"],
      incomeLimit: null,
      gender: ["female"]
    },
    deadline: null,
    applyLink: "https://www.maharashtra.gov.in/", // Maharashtra state portal (women & child welfare sections)
    addedBy: "admin"
  },
  {
    name: "UMED (Maharashtra State Rural Livelihoods Mission)",
    category: "other",
    authority: "state",
    state: "Maharashtra",
    description: "Livelihoods mission: support self-help groups, microenterprises and rural livelihoods through training, credit and market linkage.",
    eligibilityCriteria: {
      minAge: 18,
      maxAge: null,
      occupation: ["rural_household","entrepreneur"],
      incomeLimit: null,
      gender: []
    },
    deadline: null,
    applyLink: "https://divcomcsn.maharashtra.gov.in/en/list-of-rural-development-schemes/",
    addedBy: "admin"
  },
  {
    name: "Mahatma Jyotirao Phule Jan Arogya Yojana (State Health Support)",
    category: "welfare",
    authority: "state",
    state: "Maharashtra",
    description: "State-level health support and schemes complementing central health programs for low-income families and poor households.",
    eligibilityCriteria: {
      minAge: 0,
      maxAge: null,
      occupation: [],
      incomeLimit: null,
      gender: []
    },
    deadline: null,
    applyLink: "https://www.mahaarogya.gov.in/", // Maharashtra health portal
    addedBy: "admin"
  }
];

module.exports = stateSchemesAll;
