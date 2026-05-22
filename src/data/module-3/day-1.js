export const id = "3-1";
export const title = "When? — कालवाचक शब्द";
export const icon = "🕐";

export const metadata = {
  difficulty: "beginner",
  estimatedMinutes: 9,
  tags: ["time", "adverbs", "sentences"],
  grammarTopics: ["temporal-adverbs", "interrogative"],
  vocabularyTopics: ["when", "always", "then"]
};

export const briefing = {
  pre: {
    title: "Time Words — कालवाचक शब्द",
    lead: "Just as -त्र marks place (कुत्र, यत्र, तत्र), the suffix -दा marks time. The same prefixes apply: कु- for questions, य- for relative clauses, त- for pointing, स- for continuity.",
    sections: [
      { type:"table", label:"TIME WORDS // कालवाचक", cols:["Devanagari","Hindi","Meaning"],
        rows:[["कदा","कब","When?"],["यदा","जब","When (relative)"],["सदा","हमेशा","Always"],["सर्वदा","सदा, हमेशा","Always"],["सदैव","हमेशा","Always"],["तदा","तब","Then"]] },
      { type:"block", text:"<strong>Sentences:</strong><br>कदा सः नगरं गच्छति — When does he go to the city? (कब वह नगर जाता है?)<br>त्वं कदा गच्छसि — When do you go? (तुम कब जाते हो?)<br>अहं सदैव पाठशालां गच्छामि — I always go to school. (मैं हमेशा पाठशाला जाता हूँ।)<br>सः सर्वदा उद्यानं गच्छति — He always goes to the garden. (वह सदा बाग जाता है।)<br>किं त्वं सदा आपणं गच्छसि — Do you always go to the market? (क्या तुम हमेशा बाज़ार जाते हो?)" },
      { type:"grammar", label:"THE -दा SUFFIX", text:"The <strong>-दा</strong> suffix means 'time/when' — parallel to <strong>-त्र</strong> (place). The same prefixes reappear:<br><strong>कु-</strong> (question): कदा = when? | कुत्र = where?<br><strong>य-</strong> (relative): यदा = when | यत्र = where<br><strong>त-</strong> (pointing): तदा = then | तत्र = there<br><strong>सर्व-</strong> (all): सर्वदा = always | सर्वत्र = everywhere" }
    ]
  },
  mid: []
};

export const questions = [
  {type:"mcq",question:"कदा means:",options:["Then — तब","Always — हमेशा","When? — कब","Where? — कहाँ"],answer:"When? — कब",explanation:"कदा = When? (कब) — interrogative time adverb. The कु- prefix marks questions: कदा = when?, कुत्र = where?"},
  {type:"mcq",question:"Which word means 'Then — तब'?",options:["सदा","यदा","सर्वदा","तदा"],answer:"तदा",explanation:"तदा = Then (तब). The त- prefix points to something: तदा = then, तत्र = there."},
  {type:"match",question:"Match the time words to their meanings",pairs:[{left:"कदा",right:"When? — कब"},{left:"यदा",right:"When — जब"},{left:"सदा",right:"Always — हमेशा"},{left:"तदा",right:"Then — तब"},{left:"सर्वदा",right:"Always — सदा"},{left:"सदैव",right:"Always — हमेशा"}],explanation:"कदा = कब (when?), यदा = जब (when/relative), सदा/सर्वदा/सदैव = हमेशा (always), तदा = तब (then)."},
  {type:"mcq",question:"अहं सदैव पाठशालां गच्छामि। means:",options:["I go to school","He always goes to school","I always go to school — मैं हमेशा पाठशाला जाता हूँ","I do not always go to school"],answer:"I always go to school — मैं हमेशा पाठशाला जाता हूँ",explanation:"अहं सदैव पाठशालां गच्छामि = I always go to school (मैं हमेशा पाठशाला जाता हूँ). सदैव = always, placed between subject and destination."},
  {type:"mcq",question:"कदा सः नगरं गच्छति। means:",options:["He always goes to the city","When does he go to the city? — कब वह नगर जाता है?","He does not go to the city","Does he go to the city?"],answer:"When does he go to the city? — कब वह नगर जाता है?",explanation:"कदा at the start makes a 'when' question. कदा सः नगरं गच्छति = When does he go to the city? (कब वह नगर जाता है?)"},
  {type:"fill",question:"Complete — when do you go? त्वं ___ गच्छसि",sentenceParts:["त्वं "," गच्छसि।"],answer:"कदा",answerRoman:"kadaa",translation:"When do you go?",explanation:"त्वं कदा गच्छसि = When do you go? (तुम कब जाते हो?) कदा = when? (the interrogative time word)."},
  {type:"wordtiles",question:"Build: 'He always goes to the garden'",tiles:["सः","सर्वदा","उद्यानं","गच्छति"],distractors:["त्वं","कदा"],answer:"सः सर्वदा उद्यानं गच्छति।",explanation:"सः सर्वदा उद्यानं गच्छति = He always goes to the garden (वह सदा बाग जाता है). सर्वदा = always."}
];
