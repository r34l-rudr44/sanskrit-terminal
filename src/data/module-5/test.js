export const id = "5-T";
export const title = "Final Test";
export const icon = "📝";
export const isTest = true;

export const metadata = {
  difficulty: "beginner",
  estimatedMinutes: 6,
  tags: ["assessment", "module-test", "frequency", "review", "interrogatives"],
  grammarTopics: ["frequency", "temporal-adverbs", "question-words"],
  vocabularyTopics: ["frequency words", "interrogatives"]
};

export const briefing = {
  pre: {
    title: "Module 5 Final Test",
    lead: "You've learned the -दा frequency words and the seven question words (सप्तककाराः). This test checks whether you can identify and use all of them.",
    sections: [
      { type:"block", text:"<strong>This test covers:</strong> Frequency adverbs (एकदा, अनेकदा, शतदा, अन्यदा, नित्यदा) · the -दा suffix pattern · the seven ka-words (किम्, कुत्र, कति, कुतः, कदा, कथम्, किमर्थम्)" },
      { type:"grammar", label:"TEST RULES", text:"Answer at least 60% correctly to pass. Mistakes show the correct answer with an explanation." }
    ]
  },
  mid: []
};

export const questions = [
  {type:"mcq",question:"अनेकदा means:",options:["Once — एक बार","Always — हमेशा","Many times — कई बार","A hundred times — सौ बार"],answer:"Many times — कई बार",explanation:"अनेकदा = many times (कई बार). अनेक (many) + दा → अनेकदा."},
  {type:"mcq",question:"Which -दा word means 'always / every day'?",options:["एकदा","अन्यदा","शतदा","नित्यदा"],answer:"नित्यदा",explanation:"नित्यदा = always, every day (हमेशा / प्रतिदिन). नित्य (constant) + दा → नित्यदा."},
  {type:"mcq",question:"एकदा means:",options:["Many times — कई बार","A hundred times — सौ बार","Always — हमेशा","Once — एक बार"],answer:"Once — एक बार",explanation:"एकदा = once (एक बार). एक (one) + दा → एकदा."},
  {type:"fill",question:"Complete — 'He practises a hundred times': सः ___ अभ्यासं करोति",sentenceParts:["सः "," अभ्यासं करोति।"],answer:"शतदा",answerRoman:"Shatadaa",translation:"He practises a hundred times.",explanation:"शतदा = a hundred times (सौ बार). शत (hundred) + दा → शतदा."},
  {type:"match",question:"Match the frequency words to their meanings",pairs:[{left:"एकदा",right:"Once"},{left:"अनेकदा",right:"Many times"},{left:"अन्यदा",right:"At another time"},{left:"नित्यदा",right:"Daily / Always"}],explanation:"All formed with the -दा suffix: एकदा (once), अनेकदा (many times), अन्यदा (another time), नित्यदा (daily)."},
  {type:"wordtiles",question:"Build: 'He studies every day'",tiles:["सः","नित्यदा","अध्ययनं","करोति"],distractors:["एकदा","अन्यदा"],answer:"सः नित्यदा अध्ययनं करोति।",explanation:"सः नित्यदा अध्ययनं करोति = He studies every day. नित्यदा = always/every day."},
  {type:"mcq",question:"कथम् means:",options:["When — कब","Why — क्यों","How — कैसे","How many — कितने"],answer:"How — कैसे",explanation:"कथम् = How? (कैसे?) — one of the seven ka-words (सप्तककाराः) asking about manner."},
  {type:"mcq",question:"किमर्थम् means:",options:["What? — क्या","From where? — कहाँ से","How many? — कितने","Why? — क्यों"],answer:"Why? — क्यों",explanation:"किमर्थम् = Why? (क्यों?) — literally 'for what purpose?'. किम् (what) + अर्थम् (for the sake of)."}
];
