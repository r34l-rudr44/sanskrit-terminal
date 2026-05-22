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
        rows:[["कदा","कब","When?"],["यदा","जब","When (relative)"],["सदा","हमेशा","Always"],["तदा","तब","Then"]] },
      { type:"block", text:"<strong>Sentences:</strong><br>कदा सः नगरं गच्छति — When does he go to the city? (कब वह नगर जाता है?)<br>त्वं कदा गच्छसि — When do you go? (तुम कब जाते हो?)<br>अहं सदा पाठशालां गच्छामि — I always go to school. (मैं हमेशा पाठशाला जाता हूँ।)<br>सः सदा उद्यानं गच्छति — He always goes to the garden. (वह हमेशा बाग जाता है।)<br>किं त्वं सदा आपणं गच्छसि — Do you always go to the market? (क्या तुम हमेशा बाज़ार जाते हो?)" },
      { type:"grammar", label:"THE -दा SUFFIX", text:"The <strong>-दा</strong> suffix means 'time/when' — parallel to <strong>-त्र</strong> (place). The same prefixes reappear:<br><strong>कु-</strong> (question): कदा = when? | कुत्र = where?<br><strong>य-</strong> (relative): यदा = when | यत्र = where<br><strong>त-</strong> (pointing): तदा = then | तत्र = there<br><strong>सर्व-</strong> (all): सर्वदा = always | सर्वत्र = everywhere" },
      { type:"block", text:"<strong>Note — 'always' variants:</strong> You will also encounter <strong>सर्वदा</strong> and <strong>सदैव</strong> — both mean exactly the same as सदा (always). Use सदा when writing your own sentences; the other two will become familiar through reading." }
    ]
  },
  mid: []
};

export const questions = [
  {type:"mcq",question:"कदा means:",options:["Then — तब","Always — हमेशा","When? — कब","Where? — कहाँ"],answer:"When? — कब",explanation:"कदा = When? (कब) — interrogative time adverb. The कु- prefix marks questions: कदा = when?, कुत्र = where?"},
  {type:"mcq",question:"Which word means 'Then — तब'?",options:["सदा","यदा","कदा","तदा"],answer:"तदा",explanation:"तदा = Then (तब). The त- prefix points to something: तदा = then, तत्र = there."},
  {type:"match",question:"Match the time words to their meanings",pairs:[{left:"कदा",right:"When? — कब"},{left:"यदा",right:"When — जब"},{left:"सदा",right:"Always — हमेशा"},{left:"तदा",right:"Then — तब"}],explanation:"कदा = कब (when?), यदा = जब (when/relative), सदा = हमेशा (always), तदा = तब (then). You may also see सर्वदा and सदैव — synonyms for सदा."},
  {type:"mcq",question:"सः सदा उद्यानं गच्छति। means:",options:["He sometimes goes to the garden","He never goes to the garden","He always goes to the garden — वह हमेशा बाग जाता है","He will go to the garden"],answer:"He always goes to the garden — वह हमेशा बाग जाता है",explanation:"सः सदा उद्यानं गच्छति = He always goes to the garden (वह हमेशा बाग जाता है). सदा = always (हमेशा). You may also see सर्वदा and सदैव with the same meaning."},
  {type:"mcq",question:"कदा सः नगरं गच्छति। means:",options:["He always goes to the city","When does he go to the city? — कब वह नगर जाता है?","He does not go to the city","Does he go to the city?"],answer:"When does he go to the city? — कब वह नगर जाता है?",explanation:"कदा at the start makes a 'when' question. कदा सः नगरं गच्छति = When does he go to the city? (कब वह नगर जाता है?)"},
  {type:"fill",question:"Complete — when do you go? त्वं ___ गच्छसि",sentenceParts:["त्वं "," गच्छसि।"],answer:"कदा",answerRoman:"kadaa",translation:"When do you go?",explanation:"त्वं कदा गच्छसि = When do you go? (तुम कब जाते हो?) कदा = when? (the interrogative time word)."},
  {type:"wordtiles",question:"Build: 'He always goes to the garden'",tiles:["सः","सदा","उद्यानं","गच्छति"],distractors:["त्वं","कदा"],answer:"सः सदा उद्यानं गच्छति।",explanation:"सः सदा उद्यानं गच्छति = He always goes to the garden (वह हमेशा बाग जाता है). सदा = always."}
];
