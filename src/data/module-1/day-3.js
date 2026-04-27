export const id = "1-3";
export const title = "Greetings & Phrases";
export const icon = "🙏";

export const briefing = {
  pre: {
    title: "Greetings & Phrases",
    lead: "Sanskrit has specific greetings for every time of day. These phrases remain in active use across India and religious contexts worldwide.",
    sections: [
      { type:"table", label:"DAILY GREETINGS", cols:["Phrase","Devanagari","Meaning"],
        rows:[["Shubha Prabhat","शुभ प्रभात","Good morning"],["Shubha Divas","शुभ दिवस","Good day"],["Shubha Sandhya","शुभ संध्या","Good evening"],["Shubha Ratri","शुभ रात्रि","Good night"],["Dhanyavad","धन्यवाद","Thank you"],["Kripaya","कृपया","Please"],["Swagatam","स्वागतम्","Welcome"]] },
      { type:"block", text:"<strong>शुभ</strong> (Śubha) means 'auspicious' or 'good' — it appears as a prefix across many greetings." },
      { type:"grammar", label:"POLITE_FORMS", text:"<strong>ते</strong> (te) is the dative of 'you' — literally 'to you'. So <span class='dev'>शुभ प्रभात ते</span> = 'Good morning to you.'" }
    ]
  },
  mid: []
};

export const questions = [
  {type:"mcq",question:"How do you say 'Good morning' in Sanskrit?",options:["Shubha Ratri","Shubha Prabhat","Dhanyavad","Swagat"],optionsDevanagari:["शुभ रात्रि","शुभ प्रभात","धन्यवाद","स्वागत"],answer:"Shubha Prabhat",explanation:"शुभ प्रभात — शुभ means auspicious/good, प्रभात means morning/dawn."},
  {type:"translation",question:"Type: 'Thank you' in Sanskrit (Devanagari)",hint:"Think of 'Dhanya' — means blessed/thankful",answer:"धन्यवाद",explanation:"धन्यवाद (Dhanyavāda) — literally 'utterance of gratitude'."},
  {type:"mcq",question:"What does 'स्वागतम्' (Swagatam) mean?",options:["Goodbye","Welcome","Please sit","How are you?"],answer:"Welcome",explanation:"स्वागतम् = सु (good) + आगत (arrival). Literally 'good arrival'."},
  {type:"fill",question:"Complete: '____ अस्ति' means 'All is well'",sentenceParts:["","अस्ति means 'All is well'"],answer:"सर्वम्",answerRoman:"Sarvam",explanation:"सर्वम् अस्ति — सर्वम् means 'all/everything', अस्ति means 'is'."},
  {type:"mcq",question:"Which phrase means 'Please' in Sanskrit?",options:["Anugraha","Kripaya","Pranaam","Artha"],optionsDevanagari:["अनुग्रह","कृपया","प्रणाम","अर्थ"],answer:"Kripaya",explanation:"कृपया (Kṛpayā) means 'please' — from कृपा meaning grace or kindness."},
  {type:"wordtiles",question:"Build the greeting: 'Good morning to you'",tiles:["शुभ","प्रभात","ते"],distractors:["रात्रि","नमः"],answer:"शुभ प्रभात ते",explanation:"शुभ = auspicious, प्रभात = morning, ते = to you."}
];
