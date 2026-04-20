/**
 * data.js – Farmer Scheme Assistant
 * Dummy dataset of 10 government schemes with eligibility rules,
 * step-by-step guidance, document lists, and FAQ answers.
 */

// ── SCHEME DATABASE ──────────────────────────────────────────────────────────
const SCHEMES = [
  {
    id: "pm-kisan",
    emoji: "💰",
    title: "PM-KISAN Samman Nidhi",
    titleTa: "பிரதமர் கிசான் சம்மான் நிதி",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    ministryTa: "வேளாண்மை மற்றும் விவசாயிகள் நல அமைச்சகம்",
    desc: "Direct income support of ₹6,000/year in 3 equal installments to all small and marginal farmer families.",
    descTa: "அனைத்து சிறு மற்றும் பான்மை விவசாயி குடும்பங்களுக்கு ஆண்டுக்கு ₹6,000 நேரடி வருமான ஆதரவு, 3 சம தவணைகளில்.",
    benefit: "₹6,000 / year direct bank transfer",
    benefitTa: "₹6,000 / ஆண்டு நேரடி வங்கி பரிமாற்றம்",
    tags: ["Income Support", "All Crops", "Small Farmers"],
    tagsTa: ["வருமான ஆதரவு", "அனைத்து பயிர்கள்", "சிறு விவசாயிகள்"],
    tagClass: ["", "amber", "blue"],
    website: "https://pmkisan.gov.in",
    match: ["income < 200000", "land < 10"],
    steps: [
      "Visit pmkisan.gov.in or nearest Common Service Centre (CSC).",
      "Click 'Farmer Corner' → 'New Farmer Registration'.",
      "Enter Aadhaar number, mobile number, and bank details.",
      "Upload required documents.",
      "Submit and note the Application Reference Number.",
      "Verify status via 'Beneficiary Status' tab."
    ],
    stepsTa: [
      "pmkisan.gov.in இணையதளம் அல்லது அருகிலுள்ள CSC சென்று பார்வையிடுங்கள்.",
      "'விவசாயி மூலை' → 'புதிய விவசாயி பதிவு' என்பதை கிளிக் செய்யுங்கள்.",
      "ஆதார் எண், மொபைல் எண் மற்றும் வங்கி விவரங்களை உள்ளிடுங்கள்.",
      "தேவையான ஆவணங்களை பதிவேற்றவும்.",
      "சமர்ப்பித்து விண்ணப்ப தொகுப்பு எண்ணை குறிப்பிடுங்கள்.",
      "'பயனாளி நிலை' தாவல் வழியாக நிலையை சரிபார்க்கவும்."
    ],
    docs: ["Aadhaar Card", "Landholding documents (Khata/ROR)", "Bank Passbook (IFSC)", "Mobile Number linked to Aadhaar"],
    docsTa: ["ஆதார் அட்டை", "நில உடைமை ஆவணங்கள் (கட்டா/ROR)", "வங்கி பாஸ்புக் (IFSC)", "ஆதாருடன் இணைக்கப்பட்ட மொபைல் எண்"]
  },
  {
    id: "pmfby",
    emoji: "🛡️",
    title: "PM Fasal Bima Yojana (PMFBY)",
    titleTa: "பிரதமர் பயிர் காப்பீட்டு திட்டம்",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    ministryTa: "வேளாண்மை மற்றும் விவசாயிகள்நல அமைச்சகம்",
    desc: "Crop insurance scheme providing financial support to farmers suffering crop loss/damage due to unforeseen events.",
    descTa: "எதிர்பாராத நிகழ்வுகளால் பயிர் நஷ்டம்/சேதம் அடைந்த விவசாயிகளுக்கு நிதி ஆதரவு வழங்கும் பயிர் காப்பீட்டு திட்டம்.",
    benefit: "Full coverage for crop loss at lowest premium (2%)",
    benefitTa: "குறைந்தபட்ச பிரீமியத்தில் (2%) பயிர் நஷ்டத்திற்கு முழு காப்பீடு",
    tags: ["Crop Insurance", "All Crops", "Disaster Relief"],
    tagsTa: ["பயிர் காப்பீடு", "அனைத்து பயிர்கள்", "பேரிடர் நிவாரணம்"],
    tagClass: ["", "amber", "blue"],
    website: "https://pmfby.gov.in",
    match: ["always"],
    steps: [
      "Contact nearest bank, CSC, or insurance company.",
      "Fill the crop insurance proposal form.",
      "Pay the applicable premium (Kharif: 2%, Rabi: 1.5%, Cash crops: 5%).",
      "Receive policy document with sum insured details.",
      "In case of crop damage, inform within 72 hours.",
      "Compensation directly credited to bank account."
    ],
    stepsTa: [
      "அருகிலுள்ள வங்கி, CSC, அல்லது காப்பீட்டு நிறுவனத்தை தொடர்பு கொள்ளுங்கள்.",
      "பயிர் காப்பீட்டு முன்மொழிவு படிவத்தை நிரப்பவும்.",
      "பொருந்தக்கூடிய பிரீமியம் செலுத்தவும் (கரீஃப்: 2%, ரஃபி: 1.5%, பணப் பயிர்கள்: 5%).",
      "காப்பீட்டு தொகை விவரங்களுடன் பாலிசி ஆவணம் பெறுங்கள்.",
      "பயிர் சேதம் ஏற்பட்டால், 72 மணி நேரத்திற்கு இடையில் தெரிவிக்கவும்.",
      "இழப்பீடு நேரடியாக வங்கி கணக்கில் வரவு வைக்கப்படும்."
    ],
    docs: ["Aadhaar Card", "Land Documents", "Crop Sowing Certificate", "Bank Account Details", "Mobile Number"],
    docsTa: ["ஆதார் அட்டை", "நில ஆவணங்கள்", "பயிர் விதைப்பு சான்றிதழ்", "வங்கி கணக்கு விவரங்கள்", "மொபைல் எண்"]
  },
  {
    id: "kcc",
    emoji: "💳",
    title: "Kisan Credit Card (KCC)",
    titleTa: "கிசான் கடன் அட்டை",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    ministryTa: "வேளாண்மை மற்றும் விவசாயிகள் நல அமைச்சகம்",
    desc: "Provides short-term credit to farmers for crop cultivation, post-harvest expenses, and ancillary activities at subsidised interest rates.",
    descTa: "பயிர் சாகுபடி, அறுவடைக்கு பிந்தைய செலவுகள் மற்றும் துணை நடவடிக்கைகளுக்கு மானிய வட்டி விகிதத்தில் குறுகிய கால கடன் வழங்குகிறது.",
    benefit: "Credit up to ₹3 lakh @ 4% interest/year",
    benefitTa: "ஆண்டுக்கு 4% வட்டியில் ₹3 லட்சம் வரை கடன்",
    tags: ["Loan", "Low Interest", "All Farmers"],
    tagsTa: ["கடன்", "குறைந்த வட்டி", "அனைத்து விவசாயிகளும்"],
    tagClass: ["blue", "amber", ""],
    website: "https://www.nabard.org/content1.aspx?id=572",
    match: ["always"],
    steps: [
      "Visit any nationalised bank or cooperative bank.",
      "Request KCC application form.",
      "Fill crop details, land holding, and estimated credit requirement.",
      "Submit with required documents.",
      "Bank verifies and sanctions credit limit.",
      "Receive KCC card — use at ATM or for purchases."
    ],
    stepsTa: [
      "எந்த தேசியமயமாக்கப்பட்ட வங்கி அல்லது கூட்டுறவு வங்கியையும் பார்வையிடுங்கள்.",
      "KCC விண்ணப்பப் படிவத்தை கோருங்கள்.",
      "பயிர் விவரங்கள், நில உடைமை மற்றும் மதிப்பிடப்பட்ட கடன் தேவையை நிரப்பவும்.",
      "தேவையான ஆவணங்களுடன் சமர்ப்பிக்கவும்.",
      "வங்கி சரிபார்த்து கடன் வரம்பை அனுமதிக்கும்.",
      "KCC அட்டை பெறுங்கள் — ATM இல் அல்லது கொள்முதலுக்கு பயன்படுத்துங்கள்."
    ],
    docs: ["Identity Proof (Aadhaar/Voter ID)", "Land Records", "Passport Size Photos", "Income Certificate (if required)", "Crop plan/cultivation record"],
    docsTa: ["அடையாள சான்று (ஆதார்/வாக்காளர் அட்டை)", "நில பதிவேடுகள்", "பாஸ்போர்ட் அளவு புகைப்படங்கள்", "வருமான சான்றிதழ் (தேவைப்பட்டால்)", "பயிர் திட்டம்/சாகுபடி பதிவு"]
  },
  {
    id: "smam",
    emoji: "🚜",
    title: "Sub-Mission on Agricultural Mechanisation (SMAM)",
    titleTa: "வேளாண்மை இயந்திரமயமாக்கல் துணை-இயக்கம்",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    ministryTa: "வேளாண்மை மற்றும் விவசாயிகள் நல அமைச்சகம்",
    desc: "Subsidises purchase of modern farming machinery and equipment for small and marginal farmers.",
    descTa: "சிறு மற்றும் பான்மை விவசாயிகளுக்கு நவீன விவசாய இயந்திரங்கள் வாங்குவதற்கு மானியம் வழங்குகிறது.",
    benefit: "50%–80% subsidy on farm equipment",
    benefitTa: "வேளாண் உபகரணங்களில் 50%–80% மானியம்",
    tags: ["Subsidy", "Equipment", "Small Farmers"],
    tagsTa: ["மானியம்", "உபகரணங்கள்", "சிறு விவசாயிகள்"],
    tagClass: ["amber", "", ""],
    website: "https://farmer.gov.in",
    match: ["land < 5"],
    steps: [
      "Visit agrimachinery.nic.in portal.",
      "Register as a farmer with state and village details.",
      "Select desired equipment from the catalogue.",
      "Apply for subsidy — choose appropriate scheme.",
      "Receive approval and purchase from empanelled dealer.",
      "Subsidy credited to account after purchase verification."
    ],
    stepsTa: [
      "agrimachinery.nic.in போர்ட்டலை பார்வையிடுங்கள்.",
      "மாநில மற்றும் கிராம விவரங்களுடன் விவசாயியாக பதிவு செய்யுங்கள்.",
      "பட்டியலிலிருந்து விரும்பிய உபகரணத்தை தேர்ந்தெடுங்கள்.",
      "மானியத்திற்கு விண்ணப்பிக்கவும் — பொருத்தமான திட்டத்தை தேர்ந்தெடுங்கள்.",
      "ஒப்புதல் பெற்று நியமிக்கப்பட்ட விற்பனையாளரிடம் வாங்குங்கள்.",
      "கொள்முதல் சரிபார்ப்புக்கு பிறகு மானியம் கணக்கில் வரவு வைக்கப்படும்."
    ],
    docs: ["Aadhaar Card", "Land Records", "Caste Certificate (for SC/ST)", "Bank Account Details", "Passport Photo"],
    docsTa: ["ஆதார் அட்டை", "நில பதிவேடுகள்", "சாதி சான்றிதழ் (SC/ST க்கு)", "வங்கி கணக்கு விவரங்கள்", "பாஸ்போர்ட் புகைப்படம்"]
  },
  {
    id: "soil-health",
    emoji: "🌱",
    title: "Soil Health Card Scheme",
    titleTa: "மண் சுகாதார அட்டை திட்டம்",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    ministryTa: "வேளாண்மை மற்றும் விவசாயிகள் நல அமைச்சகம்",
    desc: "Provides soil health cards to farmers carrying information on nutrient status of their soil along with recommended doses of fertilisers and soil amendments.",
    descTa: "விவசாயிகளுக்கு மண் சுகாதார அட்டைகள் வழங்கி, உரங்கள் மற்றும் மண் திருத்தங்களின் பரிந்துரைக்கப்பட்ட அளவுகளுடன் மண்ணின் ஊட்டச்சத்து நிலை பற்றிய தகவல்களை வழங்குகிறது.",
    benefit: "Free soil testing + personalised fertiliser advice",
    benefitTa: "இலவச மண் பரிசோதனை + தனிப்பயன் உர ஆலோசனை",
    tags: ["Free Service", "All Farmers", "Soil Health"],
    tagsTa: ["இலவச சேவை", "அனைத்து விவசாயிகளும்", "மண் ஆரோக்கியம்"],
    tagClass: ["", "amber", "blue"],
    website: "https://soilhealth.dac.gov.in",
    match: ["always"],
    steps: [
      "Contact local Agriculture Department / Krishi Vigyan Kendra.",
      "Provide soil sample from your field.",
      "Sample tested for 12 parameters (NPK, pH, micro-nutrients).",
      "Receive Soil Health Card within 30 days.",
      "Follow recommended fertiliser doses and crop practices.",
      "Update soil data every 2 years."
    ],
    stepsTa: [
      "உள்ளூர் வேளாண்மை துறை / கிருஷி விஞ்ஞான் கேந்திராவை தொடர்பு கொள்ளுங்கள்.",
      "உங்கள் வயலிலிருந்து மண் மாதிரியை வழங்குங்கள்.",
      "மாதிரி 12 அளவுருக்களுக்கு சோதிக்கப்படுகிறது (NPK, pH, நுண்ணூட்டங்கள்).",
      "30 நாட்களுக்குள் மண் சுகாதார அட்டை பெறுங்கள்.",
      "பரிந்துரைக்கப்பட்ட உர அளவுகள் மற்றும் பயிர் நடைமுறைகளை பின்பற்றுங்கள்.",
      "ஒவ்வொரு 2 ஆண்டுகளுக்கும் மண் தரவை புதுப்பிக்கவும்."
    ],
    docs: ["Aadhaar Card", "Land Records", "Soil Sample (500g from field)"],
    docsTa: ["ஆதார் அட்டை", "நில பதிவேடுகள்", "மண் மாதிரி (வயலிலிருந்து 500 கிராம்)"]
  },
  {
    id: "pmaby",
    emoji: "👴",
    title: "PM Annadata Aay SanraksHan Abhiyan (PM-AASHA)",
    titleTa: "பிரதமர் அன்னதாதா ஆய் சன்ரக்‌ஷண் அபியான்",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    ministryTa: "வேளாண்மை மற்றும் விவசாயிகள் நல அமைச்சகம்",
    desc: "Ensures farmers get Minimum Support Price (MSP) for their produce through Price Support Scheme and Price Deficiency Payment Scheme.",
    descTa: "விலை ஆதரவு திட்டம் மற்றும் விலை குறைபாடு கட்டண திட்டம் மூலம் விவசாயிகள் தங்கள் உற்பத்திக்கு குறைந்தபட்ச ஆதார விலை (MSP) பெறுவதை உறுதிப்படுத்துகிறது.",
    benefit: "MSP guarantee for oilseeds, pulses & crops",
    benefitTa: "எண்ணெய் வித்துக்கள், பருப்பு வகைகள் & பயிர்களுக்கு MSP உத்தரவாதம்",
    tags: ["Price Support", "Pulses", "Oilseeds"],
    tagsTa: ["விலை ஆதரவு", "பருப்பு வகைகள்", "எண்ணெய் வித்துக்கள்"],
    tagClass: ["amber", "", "blue"],
    website: "https://farmer.gov.in",
    match: ["crop === 'Pulses'", "crop === 'Groundnut'", "crop === 'Sunflower'"],
    steps: [
      "Register on the PPMS (Procurement Portal for MSP).",
      "Declare crop area and expected yield.",
      "Receive appointment for crop sale at designated mandi.",
      "Sell produce at MSP — no deductions.",
      "Payment directly to registered bank account within 48 hours."
    ],
    stepsTa: [
      "PPMS (MSP கொள்முதல் போர்ட்டல்) இல் பதிவு செய்யுங்கள்.",
      "பயிர் பரப்பளவு மற்றும் எதிர்பார்க்கப்படும் விளைச்சலை அறிவிக்கவும்.",
      "நியமிக்கப்பட்ட மண்டி(mandi)யில் பயிர் விற்பனைக்கு நியமன நேரம் பெறவும்.",
      "MSP யில் உற்பத்தியை விற்கவும் — கழிவுகள் இல்லை.",
      "48 மணி நேரத்திற்குள் பதிவு செய்யப்பட்ட வங்கி கணக்கில் நேரடி கட்டணம்."
    ],
    docs: ["Aadhaar Card", "Land Records", "Bank Account (IFSC)", "Crop Sowing Certificate", "Patta (ownership deed)"],
    docsTa: ["ஆதார் அட்டை", "நில பதிவேடுகள்", "வங்கி கணக்கு (IFSC)", "பயிர் விதைப்பு சான்றிதழ்", "பட்டா (உரிமைப் பத்திரம்)"]
  },
  {
    id: "per-drop",
    emoji: "💧",
    title: "Pradhan Mantri Krishi Sinchayee Yojana – Per Drop More Crop",
    titleTa: "பிரதமர் கிருஷி சிஞ்சாய் யோஜனா – ஒரு துளி அதிக பயிர்",
    ministry: "Ministry of Jal Shakti",
    ministryTa: "ஜல் சக்தி அமைச்சகம்",
    desc: "Promotes efficient water use through drip and sprinkler irrigation. Financial assistance for micro-irrigation systems.",
    descTa: "சொட்டு மற்றும் தெளிப்பு நீர்ப்பாசனம் மூலம் திறமையான நீர் பயன்பாட்டை ஊக்குவிக்கிறது. நுண் நீர்ப்பாசன அமைப்புகளுக்கு நிதி உதவி.",
    benefit: "55%–75% subsidy on drip/sprinkler systems",
    benefitTa: "சொட்டு/தெளிப்பு அமைப்புகளில் 55%–75% மானியம்",
    tags: ["Water Conservation", "Subsidy", "All Crops"],
    tagsTa: ["நீர் பாதுகாப்பு", "மானியம்", "அனைத்து பயிர்கள்"],
    tagClass: ["blue", "amber", ""],
    website: "https://pmksy.gov.in",
    match: ["always"],
    steps: [
      "Apply through State Agriculture Department or pmksy.gov.in.",
      "Get soil and water test done.",
      "Choose appropriate irrigation system (drip/sprinkler).",
      "Purchase from approved suppliers.",
      "Submit installation proof and invoices.",
      "Subsidy transferred to bank within 30–45 days."
    ],
    stepsTa: [
      "மாநில வேளாண்மை துறை அல்லது pmksy.gov.in மூலம் விண்ணப்பிக்கவும்.",
      "மண் மற்றும் நீர் பரிசோதனை செய்யுங்கள்.",
      "பொருத்தமான நீர்ப்பாசன அமைப்பை தேர்வு செய்யுங்கள் (சொட்டு/தெளிப்பு).",
      "அங்கீகரிக்கப்பட்ட சப்ளையர்களிடம் வாங்குங்கள்.",
      "நிறுவல் சான்று மற்றும் விலைப்பட்டியல்களை சமர்ப்பிக்கவும்.",
      "30–45 நாட்களுக்குள் வங்கிக்கு மானியம் மாற்றப்படும்."
    ],
    docs: ["Aadhaar Card", "Land Ownership Documents", "Bank Account Details", "Quotation from authorized supplier"],
    docsTa: ["ஆதார் அட்டை", "நில உரிமை ஆவணங்கள்", "வங்கி கணக்கு விவரங்கள்", "அங்கீகரிக்கப்பட்ட சப்ளையரிடம் மேற்கோள்"]
  },
  {
    id: "pkvy",
    emoji: "🌿",
    title: "Paramparagat Krishi Vikas Yojana (PKVY)",
    titleTa: "பரம்பரகட் கிருஷி விகாஸ் யோஜனா",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    ministryTa: "வேளாண்மை மற்றும் விவசாயிகள் நல அமைச்சகம்",
    desc: "Promotes organic farming through cluster approach. Provides financial assistance for certification and marketing of organic produce.",
    descTa: "கிளஸ்டர் அணுகுமுறை மூலம் இயற்கை விவசாயத்தை ஊக்குவிக்கிறது. இயற்கை உற்பத்திக்கான சான்றிதழ் மற்றும் சந்தைப்படுத்தலுக்கு நிதி உதவி வழங்குகிறது.",
    benefit: "₹50,000/hectare over 3 years",
    benefitTa: "3 ஆண்டுகளில் ஹெக்டேருக்கு ₹50,000",
    tags: ["Organic Farming", "Subsidy", "Group Scheme"],
    tagsTa: ["இயற்கை விவசாயம்", "மானியம்", "குழு திட்டம்"],
    tagClass: ["", "amber", "blue"],
    website: "https://pgsindia-ncof.gov.in",
    match: ["crop === 'Vegetables'", "crop === 'Fruits'", "income < 300000"],
    steps: [
      "Form a cluster/group of at least 50 farmers.",
      "Apply through State Nodal Agency or Agriculture Department.",
      "Participate in organic farming training.",
      "Follow Participatory Guarantee System (PGS) standards.",
      "Get organic certification.",
      "Market through approved channels and earn premium prices."
    ],
    stepsTa: [
      "குறைந்தது 50 விவசாயிகளின் கிளஸ்டர்/குழுவை உருவாக்குங்கள்.",
      "மாநில நோடல் ஏஜென்சி அல்லது வேளாண்மை துறை மூலம் விண்ணப்பிக்கவும்.",
      "இயற்கை விவசாய பயிற்சியில் பங்கேற்கவும்.",
      "பங்கேற்பு உத்தரவாத அமைப்பு (PGS) தரநிலைகளை பின்பற்றுங்கள்.",
      "இயற்கை சான்றிதழ் பெறவும்.",
      "அங்கீகரிக்கப்பட்ட சேனல்கள் மூலம் சந்தைப்படுத்தி சிறந்த விலை பெறுங்கள்."
    ],
    docs: ["Aadhaar Card", "Land Records", "Cluster Registration", "Bank Account Details"],
    docsTa: ["ஆதார் அட்டை", "நில பதிவேடுகள்", "கிளஸ்டர் பதிவு", "வங்கி கணக்கு விவரங்கள்"]
  },
  {
    id: "nabard-dairy",
    emoji: "🐄",
    title: "NABARD Dairy Entrepreneurship Development Scheme (DEDS)",
    titleTa: "நாபார்ட் பால்வளம் தொழில் முனைவோர் மேம்பாட்டு திட்டம்",
    ministry: "Ministry of Fisheries, Animal Husbandry & Dairying",
    ministryTa: "மீன்வளம், கால்நடை வளர்ப்பு மற்றும் பால்வளம் அமைச்சகம்",
    desc: "Promotes dairy farming by providing back-end subsidy for dairy infrastructure development including purchase of milch animals.",
    descTa: "பால் மாடுகள் வாங்குதல் உட்பட பால் உற்பத்தி உள்கட்டமைப்பு மேம்பாட்டிற்கு பின்புற மானியம் வழங்குவதன் மூலம் பால்வளம் ஊக்குவிக்கிறது.",
    benefit: "25%–33% back-end subsidy (SC/ST up to 33%)",
    benefitTa: "25%–33% பின்புற மானியம் (SC/ST க்கு 33% வரை)",
    tags: ["Animal Husbandry", "SC/ST Priority", "Loan+Subsidy"],
    tagsTa: ["கால்நடை வளர்ப்பு", "SC/ST முன்னுரிமை", "கடன்+மானியம்"],
    tagClass: ["blue", "amber", ""],
    website: "https://www.nabard.org",
    match: ["income < 300000"],
    steps: [
      "Approach any commercial bank, RRB, or cooperative bank.",
      "Submit Business Plan for dairy unit.",
      "Bank sanctions loan and forwards subsidy claim to NABARD.",
      "NABARD releases subsidy to bank.",
      "Bank adjusts subsidy against last instalment of loan."
    ],
    stepsTa: [
      "எந்த வணிக வங்கி, RRB, அல்லது கூட்டுறவு வங்கியையும் அணுகவும்.",
      "பால்வளம் அலகிற்கான வணிக திட்டத்தை சமர்ப்பிக்கவும்.",
      "வங்கி கடனை அனுமதித்து மானிய கோரிக்கையை நாபார்டிற்கு அனுப்புகிறது.",
      "நாபார்ட் வங்கிக்கு மானியம் வழங்குகிறது.",
      "வங்கி கடனின் கடைசி தவணைக்கு எதிராக மானியத்தை சரிசெய்கிறது."
    ],
    docs: ["Aadhaar Card", "Land / Shed Documents", "Business Plan", "Bank Account Details", "Caste Certificate (for SC/ST)"],
    docsTa: ["ஆதார் அட்டை", "நில / கொட்டகை ஆவணங்கள்", "வணிக திட்டம்", "வங்கி கணக்கு விவரங்கள்", "சாதி சான்றிதழ் (SC/ST க்கு)"]
  },
  {
    id: "tamilnadu-vns",
    emoji: "🌾",
    title: "Tamil Nadu Vivasayi Nala Thittam (VNT)",
    titleTa: "தமிழ்நாடு விவசாயி நல திட்டம் (VNT)",
    ministry: "Tamil Nadu State Agriculture Department",
    ministryTa: "தமிழ்நாடு மாநில வேளாண்மை துறை",
    desc: "State-specific scheme providing input subsidy, free seeds, and farm machinery rental assistance to Tamil Nadu farmers.",
    descTa: "தமிழ்நாடு விவசாயிகளுக்கு உள்ளீட்டு மானியம், இலவச விதைகள் மற்றும் பண்ணை இயந்திர வாடகை உதவி வழங்கும் மாநில-குறிப்பிட்ட திட்டம்.",
    benefit: "Free seeds + ₹4,000/acre input subsidy",
    benefitTa: "இலவச விதைகள் + ஏக்கருக்கு ₹4,000 உள்ளீட்டு மானியம்",
    tags: ["Tamil Nadu", "Seed Subsidy", "Input Subsidy"],
    tagsTa: ["தமிழ்நாடு", "விதை மானியம்", "உள்ளீட்டு மானியம்"],
    tagClass: ["blue", "amber", ""],
    website: "https://tn.gov.in/dept/agriculturaldept",
    match: ["state === 'Tamil Nadu'"],
    steps: [
      "Visit Block Agriculture Office in your district.",
      "Register under TN Agriculture Department portal.",
      "Apply for specific benefits (seeds/subsidy) seasonally.",
      "District Agriculture Officer verifies land records.",
      "Seeds/subsidy disbursed directly to farm or account.",
      "Collect inputs from nearest Agriculture Extension Centre."
    ],
    stepsTa: [
      "உங்கள் மாவட்டத்தில் உள்ள வட்டார வேளாண்மை அலுவலகத்தை பார்வையிடுங்கள்.",
      "TN வேளாண்மை துறை போர்ட்டலில் பதிவு செய்யுங்கள்.",
      "குறிப்பிட்ட சலுகைகளுக்கு (விதைகள்/மானியம்) பருவகால விண்ணப்பிக்கவும்.",
      "மாவட்ட வேளாண்மை அதிகாரி நில பதிவேடுகளை சரிபார்க்கிறார்.",
      "விதைகள்/மானியம் நேரடியாக பண்ணை அல்லது கணக்கில் வழங்கப்படும்.",
      "அருகிலுள்ள வேளாண்மை விரிவாக்க மையத்தில் இருந்து உள்ளீடுகளை சேகரிக்கவும்."
    ],
    docs: ["Aadhaar Card", "Patta (land ownership)", "Community Certificate", "Bank Passbook"],
    docsTa: ["ஆதார் அட்டை", "பட்டா (நில உரிமை)", "சமூக சான்றிதழ்", "வங்கி பாஸ்புக்"]
  }
];

// ── CHATBOT FAQ KNOWLEDGE BASE ───────────────────────────────────────────────
const FAQ = [
  {
    keywords: ["apply", "application", "register", "sign up", "registration", "விண்ணப்பிக்க", "விண்ணப்பம்", "பதிவு"],
    response: "📋 **How to Apply for Government Schemes:**\n\n1. Visit the official scheme portal (link on each card).\n2. Go to your nearest Common Service Centre (CSC/e-Seva).\n3. Or contact your Block Agriculture Officer.\n\nYou need your Aadhaar, land records, bank passbook, and mobile number. Our chatbot can guide you step-by-step for any specific scheme — just ask!",
    responseTa: "📋 **அரசு திட்டங்களுக்கு எப்படி விண்ணப்பிப்பது:**\n\n1. அதிகாரப்பூர்வ திட்ட போர்ட்டலை பார்வையிடுங்கள் (ஒவ்வொரு அட்டையிலும் இணைப்பு).\n2. அருகிலுள்ள பொதுவான சேவை மையம் (CSC/இ-சேவை) க்கு செல்லுங்கள்.\n3. அல்லது உங்கள் வட்டார வேளாண்மை அதிகாரியை தொடர்பு கொள்ளுங்கள்.\n\nஆதார், நில பதிவேடுகள், வங்கி பாஸ்புக் மற்றும் மொபைல் எண் தேவை. எந்த குறிப்பிட்ட திட்டத்திற்கும் படிப்படியாக வழிகாட்ட எங்கள் அரட்டை அனுமதிக்கும் — வெறுமனே கேளுங்கள்!"
  },
  {
    keywords: ["document", "documents", "required", "papers", "proof", "ஆவணம்", "ஆவணங்கள்", "தேவை"],
    response: "📄 **Common Documents Required for Most Schemes:**\n\n• ✅ Aadhaar Card (mandatory)\n• ✅ Land Records / Patta / Khatauni\n• ✅ Bank Passbook with IFSC code\n• ✅ Mobile number linked to Aadhaar\n• ✅ Passport-size photographs\n• ✅ Caste Certificate (for SC/ST schemes)\n• ✅ Crop Sowing Certificate (seasonal)\n\nSpecific schemes may need additional documents — click 'View Details' on any scheme card!",
    responseTa: "📄 **பெரும்பாலான திட்டங்களுக்கு பொதுவாக தேவையான ஆவணங்கள்:**\n\n• ✅ ஆதார் அட்டை (கட்டாயம்)\n• ✅ நில பதிவேடுகள் / பட்டா / கட்டவுணி\n• ✅ IFSC குறியீட்டுடன் வங்கி பாஸ்புக்\n• ✅ ஆதாருடன் இணைக்கப்பட்ட மொபைல் எண்\n• ✅ பாஸ்போர்ட் அளவு புகைப்படங்கள்\n• ✅ சாதி சான்றிதழ் (SC/ST திட்டங்களுக்கு)\n• ✅ பயிர் விதைப்பு சான்றிதழ் (பருவகால)\n\nகுறிப்பிட்ட திட்டங்களுக்கு கூடுதல் ஆவணங்கள் தேவைப்படலாம் — எந்த திட்ட அட்டையிலும் 'விவரங்களை காண்க' என்பதை கிளிக் செய்யுங்கள்!"
  },
  {
    keywords: ["pm kisan", "kisan samman", "6000", "income support", "direct benefit", "பிரதமர் கிசான்"],
    response: "💰 **PM-KISAN Samman Nidhi:**\n\nAll land-holding farmer families get ₹6,000/year in 3 installments of ₹2,000 each.\n\n🔗 Apply at: pmkisan.gov.in\n📞 Helpline: 155261 / 1800115526\n\n**Steps:** Register online → Verify Aadhaar → Add bank details → Submit → Check status in 'Beneficiary Status'.",
    responseTa: "💰 **பிரதமர் கிசான் சம்மான் நிதி:**\n\nனைத்து நில வைத்திருக்கும் விவசாயி குடும்பங்களுக்கும் ₹2,000 வீதம் 3 தவணைகளில் ₹6,000/ஆண்டு கிடைக்கும்.\n\n🔗 விண்ணப்பிக்கவும்: pmkisan.gov.in\n📞 உதவி எண்: 155261 / 1800115526\n\n**படிகள்:** ஆன்லைனில் பதிவு செய்யுங்கள் → ஆதாரை சரிபார்க்கவும் → வங்கி விவரங்களை சேர்க்கவும் → சமர்ப்பிக்கவும் → 'பயனாளி நிலை' இல் நிலையை சரிபார்க்கவும்."
  },
  {
    keywords: ["eligibility", "eligible", "qualify", "who can", "criteria", "தகுதி", "யார்"],
    response: "✅ **General Eligibility Criteria:**\n\n• Must be a resident Indian farmer\n• Should own or cultivate agricultural land\n• Aadhaar card mandatory\n• Bank account linked to Aadhaar\n\n**Usually NOT eligible:**\n• Government employees\n• Income tax payers\n• Professionals (doctors, lawyers)\n\nUse our **Profile Form** above to instantly check which schemes you qualify for!",
    responseTa: "✅ **பொதுவான தகுதி அளவுகோல்கள்:**\n\n• இந்திய குடியிருப்பு விவசாயியாக இருக்க வேண்டும்\n• விவசாய நிலத்தை சொந்தமாக வைத்திருக்கவோ அல்லது சாகுபடி செய்யவோ வேண்டும்\n• ஆதார் அட்டை கட்டாயம்\n• ஆதாருடன் இணைக்கப்பட்ட வங்கி கணக்கு\n\n**பொதுவாக தகுதி இல்லாதவர்கள்:**\n• அரசு ஊழியர்கள்\n• வருமான வரி செலுத்துவோர்\n• தொழில் வல்லுநர்கள் (மருத்துவர்கள், வழக்கறிஞர்கள்)\n\nநீங்கள் தகுதிபெறும் திட்டங்களை உடனடியாக சரிபார்க்க மேலே உள்ள **சுயவிவர படிவத்தை** பயன்படுத்துங்கள்!"
  },
  {
    keywords: ["loan", "credit", "kisan credit", "kcc", "finance", "borrow", "கடன்", "நிதி"],
    response: "💳 **Farmer Loan Schemes:**\n\n🏷️ **Kisan Credit Card (KCC):**\nCredit up to ₹3 lakh at just 4% interest/year. Apply at any bank.\n\n🏷️ **Agricultural Term Loans:**\nFor farm equipment, irrigation, land development.\n\n🏷️ **NABARD Schemes:**\nFor dairy, fishery, and allied activities.\n\n📞 Contact your nearest bank or call Kisan Call Centre: 1800-180-1551 (Free)",
    responseTa: "💳 **விவசாயி கடன் திட்டங்கள்:**\n\n🏷️ **கிசான் கடன் அட்டை (KCC):**\nஆண்டுக்கு வெறும் 4% வட்டியில் ₹3 லட்சம் வரை கடன். எந்த வங்கியிலும் விண்ணப்பிக்கவும்.\n\n🏷️ **விவசாய கால கடன்கள்:**\nவேளாண் உபகரணங்கள், நீர்ப்பாசனம், நில மேம்பாட்டிற்காக.\n\n🏷️ **நாபார்ட் திட்டங்கள்:**\nபால்வளம், மீன்வளம் மற்றும் துணைச் செயல்பாடுகளுக்கு.\n\n📞 அருகிலுள்ள வங்கியை தொடர்பு கொள்ளுங்கள் அல்லது கிசான் கால் சென்டரை அழைக்கவும்: 1800-180-1551 (இலவசம்)"
  },
  {
    keywords: ["subsidy", "subsidi", "discount", "grant", "free", "மானியம்", "இலவசம்"],
    response: "🎁 **Key Subsidy Schemes for Farmers:**\n\n• 🚜 **SMAM** – 50–80% on farm machinery\n• 💧 **PMKSY** – 55–75% on drip/sprinkler irrigation\n• 🌾 **PKVY** – ₹50,000/hectare for organic farming\n• 🌱 **Soil Health Card** – Free soil testing\n• 🐄 **NABARD DEDS** – 25–33% on dairy\n\nAll subsidies are directly credited to your bank. No middlemen!\n\nFill the profile form above to see which subsidies you qualify for.",
    responseTa: "🎁 **விவசாயிகளுக்கான முக்கிய மானிய திட்டங்கள்:**\n\n• 🚜 **SMAM** – வேளாண் இயந்திரங்களில் 50–80%\n• 💧 **PMKSY** – சொட்டு/தெளிப்பு நீர்ப்பாசனத்தில் 55–75%\n• 🌾 **PKVY** – இயற்கை விவசாயத்திற்கு ஹெக்டேருக்கு ₹50,000\n• 🌱 **மண் சுகாதார அட்டை** – இலவச மண் பரிசோதனை\n• 🐄 **நாபார்ட் DEDS** – பால்வளத்தில் 25–33%\n\nஅனைத்து மானியங்களும் உங்கள் வங்கியில் நேரடியாக வரவு வைக்கப்படும். இடைத்தரகர்கள் இல்லை!\n\nநீங்கள் தகுதி பெறும் மானியங்களை பார்க்க மேலே உள்ள சுயவிவர படிவத்தை நிரப்பவும்."
  },
  {
    keywords: ["helpline", "contact", "phone", "call", "support", "help", "உதவி", "தொலைபேசி"],
    response: "📞 **Important Helpline Numbers:**\n\n🌾 **Kisan Call Centre:** 1800-180-1551 (Free, 24×7)\n💰 **PM-KISAN Helpline:** 155261 or 1800-115-526\n🛡️ **Crop Insurance:** 1800-200-7710\n🏦 **NABARD:** 022-26539895\n🌱 **Soil Health:** 1800-180-1551\n\n🌐 **Key Portals:**\n• pmkisan.gov.in | farmer.gov.in\n• pmfby.gov.in | agrimachinery.nic.in",
    responseTa: "📞 **முக்கியமான உதவி எண்கள்:**\n\n🌾 **கிசான் கால் சென்டர்:** 1800-180-1551 (இலவசம், 24×7)\n💰 **பிரதமர் கிசான் உதவி:** 155261 அல்லது 1800-115-526\n🛡️ **பயிர் காப்பீடு:** 1800-200-7710\n🏦 **நாபார்ட்:** 022-26539895\n🌱 **மண் ஆரோக்கியம்:** 1800-180-1551\n\n🌐 **முக்கிய போர்ட்டல்கள்:**\n• pmkisan.gov.in | farmer.gov.in\n• pmfby.gov.in | agrimachinery.nic.in"
  },
  {
    keywords: ["hello", "hi", "hey", "namaste", "vanakkam", "வணக்கம்", "help me", "start"],
    response: "🙏 **Namaste! Welcome to Farmer Scheme Assistant!**\n\nI can help you with:\n• 🔍 Finding the right government schemes\n• 📋 Application steps for any scheme\n• 📄 Documents you need\n• 💰 Subsidy and loan information\n• 📞 Helpline numbers\n\nWhat would you like to know today?",
    responseTa: "🙏 **வணக்கம்! கிசான் திட்ட உதவியாளருக்கு வரவேற்கிறோம்!**\n\nநான் உங்களுக்கு உதவ முடியும்:\n• 🔍 சரியான அரசு திட்டங்களை கண்டுபிடித்தல்\n• 📋 எந்த திட்டத்திற்கும் விண்ணப்ப படிகள்\n• 📄 நீங்கள் தேவையான ஆவணங்கள்\n• 💰 மானியம் மற்றும் கடன் தகவல்\n• 📞 உதவி எண்கள்\n\nஈன்று என்ன தெரிந்துகொள்ள விரும்புகிறீர்கள்?"
  },
  {
    keywords: ["organic", "organic farming", "natural farming", "இயற்கை"],
    response: "🌿 **Organic Farming Support:**\n\n**PKVY (Paramparagat Krishi Vikas Yojana):**\n• ₹50,000/hectare over 3 years\n• Covers compost, organic inputs, certification\n• Group of 50+ farmers required\n\n**Zero Budget Natural Farming (ZBNF):**\n• Promoted in several states (AP, Karnataka)\n• Training provided free\n\nOrganic produce gets 20–30% premium market price. Apply at your State Agriculture Department.",
    responseTa: "🌿 **இயற்கை விவசாய ஆதரவு:**\n\n**PKVY (பரம்பரகட் கிருஷி விகாஸ் யோஜனா):**\n• 3 ஆண்டுகளில் ஹெக்டேருக்கு ₹50,000\n• உரம், இயற்கை உள்ளீடுகள், சான்றிதழ் ஆகியவை உள்ளடங்கும்\n• 50+ விவசாயிகளின் குழு தேவை\n\n**பூஜ்ய பட்ஜெட் இயற்கை விவசாயம் (ZBNF):**\n• பல மாநிலங்களில் ஊக்குவிக்கப்படுகிறது (AP, கர்நாடகா)\n• இலவச பயிற்சி வழங்கப்படுகிறது\n\nஇயற்கை உற்பத்திக்கு 20–30% அதிக சந்தை விலை கிடைக்கும். உங்கள் மாநில வேளாண்மை துறையில் விண்ணப்பிக்கவும்."
  }
];

// ── TRANSLATIONS ──────────────────────────────────────────────────────────────
const TRANSLATIONS = {
  en: {
    matchFound: matches => `${matches} scheme(s) matched your profile.`,
    noMatch:    "No schemes matched your profile right now.",
    viewDetails:"View Details →",
    matchScore: score => `${score}% Match`,
    modalSteps: "📋 Step-by-Step Application Guide",
    modalDocs:  "📄 Required Documents",
    modalVisit: "🔗 Visit Official Portal",
    chatPlaceholder: "Type your question here... / இங்கே கேளுங்கள்...",
    defaultReply: "I'm not sure about that. Try asking about: 'How to apply?', 'Documents needed', 'PM Kisan', 'subsidy', or 'eligibility'. You can also fill the profile form above to see personalised scheme recommendations!"
  },
  ta: {
    matchFound: matches => `${matches} திட்டம்/திட்டங்கள் உங்கள் சுயவிவரத்துடன் பொருந்துகின்றன.`,
    noMatch:    "இப்போது எந்த திட்டமும் உங்கள் சுயவிவரத்துடன் பொருந்தவில்லை.",
    viewDetails:"விவரங்களை காண்க →",
    matchScore: score => `${score}% பொருத்தம்`,
    modalSteps: "📋 படிப்படியான விண்ணப்ப வழிகாட்டி",
    modalDocs:  "📄 தேவையான ஆவணங்கள்",
    modalVisit: "🔗 அதிகாரப்பூர்வ போர்ட்டலை பார்வையிடுங்கள்",
    chatPlaceholder: "Type your question here... / இங்கே கேளுங்கள்...",
    defaultReply: "அதைப் பற்றி எனக்கு உறுதியில்லை. கேட்டுப்பாருங்கள்: 'விண்ணப்பிக்கும் முறை?', 'தேவையான ஆவணங்கள்', 'பிரதமர் கிசான்', 'மானியம்', அல்லது 'தகுதி'. தனிப்பயனாக்கப்பட்ட திட்ட பரிந்துரைகளை காண மேலே உள்ள சுயவிவர படிவத்தை நிரப்பவும்!"
  }
};
