export const id = "5-T";
export const title = "Final Test";
export const icon = "📝";
export const isTest = true;

export const metadata = {
  difficulty: "beginner",
  estimatedMinutes: 6,
  tags: ["assessment", "module-test", "frequency", "review"],
  grammarTopics: ["frequency", "temporal-adverbs"],
  vocabularyTopics: ["frequency words"]
};

export const briefing = {
  pre: {
    title: "Module 5 Final Test",
    lead: "You've learned the -दा frequency words — एकदा, अनेकदा, शतदा, अन्यदा, and नित्यदा. This test checks whether you can identify and use them in sentences.",
    sections: [
      { type:"block", text:"<strong>This test covers:</strong> Frequency adverbs (एकदा, अनेकदा, शतदा, अन्यदा, नित्यदा) · the -दा suffix pattern · using frequency words in real sentences" },
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
  {type:"wordtiles",question:"Build: 'He studies every day'",tiles:["सः","नित्यदा","अध्ययनं","करोति"],distractors:["एकदा","अन्यदा"],answer:"सः नित्यदा अध्ययनं करोति।",explanation:"सः नित्यदा अध्ययनं करोति = He studies every day. नित्यदा = always/every day."}
];
