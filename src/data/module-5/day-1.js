export const id = "5-1";
export const title = "How Often? — आवृत्तिवाचक शब्द";
export const icon = "🔁";

export const metadata = {
  difficulty: "intermediate",
  estimatedMinutes: 10,
  tags: ["time", "adverbs", "frequency", "sentences"],
  grammarTopics: ["temporal-adverbs", "frequency"],
  vocabularyTopics: ["once", "many times", "daily", "another time"]
};

export const briefing = {
  pre: {
    title: "Frequency Words — आवृत्तिवाचक शब्द",
    lead: "You know the core -दा words (कदा, यदा, तदा, सदा). The same suffix attaches to numerals and qualifiers to express frequency — once, many times, a hundred times, and more.",
    sections: [
      { type:"table", label:"FREQUENCY WORDS // आवृत्तिवाचक", cols:["Devanagari","Hindi","Meaning"],
        rows:[["एकदा","एक बार","Once"],["अनेकदा","कई बार","Many times"],["शतदा","सौ बार","A hundred times"],["अन्यदा","किसी अन्य समय","At another time"],["नित्यदा","हमेशा, प्रतिदिन","Always, daily"]] },
      { type:"block", text:"<strong>Sentences:</strong><br>अहं एकदा तत्र अगच्छम् — I went there once. (मैं एक बार वहाँ गया।)<br>सः अनेकदा पाठशालां गच्छति — He goes to school many times. (वह कई बार पाठशाला जाता है।)<br>अन्यदा आगच्छ — Come at another time. (किसी और समय आओ।)<br>सः नित्यदा अध्ययनं करोति — He studies every day. (वह प्रतिदिन अध्ययन करता है।)<br>सः शतदा अभ्यासं करोति — He practises a hundred times. (वह सौ बार अभ्यास करता है।)" },
      { type:"grammar", label:"-दा WITH NUMERALS & QUALIFIERS", text:"The <strong>-दा</strong> suffix is not limited to the pronoun-based set (कदा/यदा/तदा). It freely attaches to numerals and adjectives to answer <em>how often?</em>:<br><strong>एक</strong> (one) → <strong>एकदा</strong> = once<br><strong>अनेक</strong> (many) → <strong>अनेकदा</strong> = many times<br><strong>शत</strong> (hundred) → <strong>शतदा</strong> = a hundred times<br><strong>अन्य</strong> (other) → <strong>अन्यदा</strong> = at another time<br><strong>नित्य</strong> (constant/daily) → <strong>नित्यदा</strong> = always, every day<br><br>The pattern is productive: any numeral or qualifier can take -दा to express a time-frequency idea." }
    ]
  },
  mid: []
};

export const questions = [
  {type:"mcq",question:"एकदा means:",options:["Many times — कई बार","Once — एक बार","Always — हमेशा","At another time — किसी और समय"],answer:"Once — एक बार",explanation:"एकदा = Once (एक बार). एक (one) + दा → एकदा. Compare: अनेकदा (many times), शतदा (hundred times)."},
  {type:"mcq",question:"Which word means 'at another time — किसी अन्य समय'?",options:["एकदा","नित्यदा","अन्यदा","शतदा"],answer:"अन्यदा",explanation:"अन्यदा = at another time (किसी अन्य समय). अन्य (other) + दा → अन्यदा."},
  {type:"mcq",question:"शतदा means:",options:["Once","A hundred times — सौ बार","Always","Daily"],answer:"A hundred times — सौ बार",explanation:"शतदा = a hundred times (सौ बार). शत (hundred) + दा → शतदा. Used to express intense repetition."},
  {type:"match",question:"Match the frequency words to their meanings",pairs:[{left:"एकदा",right:"Once — एक बार"},{left:"अनेकदा",right:"Many times — कई बार"},{left:"शतदा",right:"Hundred times — सौ बार"},{left:"अन्यदा",right:"Another time — अन्य समय"},{left:"नित्यदा",right:"Daily — प्रतिदिन"}],explanation:"All built with -दा: एकदा (once), अनेकदा (many times), शतदा (hundred times), अन्यदा (another time), नित्यदा (daily/always)."},
  {type:"fill",question:"Complete — 'He studies every day': सः ___ अध्ययनं करोति",sentenceParts:["सः "," अध्ययनं करोति।"],answer:"नित्यदा",answerRoman:"nityadaa",translation:"He studies every day.",explanation:"नित्यदा = always, every day. नित्य (constant/daily) + दा → नित्यदा."},
  {type:"wordtiles",question:"Build: 'He goes to school many times'",tiles:["सः","अनेकदा","पाठशालां","गच्छति"],distractors:["एकदा","नित्यदा"],answer:"सः अनेकदा पाठशालां गच्छति।",explanation:"सः अनेकदा पाठशालां गच्छति = He goes to school many times. अनेकदा = many times (अनेक + दा)."},
  {type:"mcq",question:"'Come at another time' is:",options:["एकदा आगच्छ","नित्यदा आगच्छ","अन्यदा आगच्छ","शतदा आगच्छ"],answer:"अन्यदा आगच्छ",explanation:"अन्यदा आगच्छ = Come at another time (किसी और समय आओ). अन्यदा = at another time."}
];
