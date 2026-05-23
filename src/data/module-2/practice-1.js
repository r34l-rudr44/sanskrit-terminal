export const id = "2-P1";
export const title = "Practice 1 — अभ्यासः १";
export const icon = "🎯";

export const metadata = {
  difficulty: "beginner",
  estimatedMinutes: 10,
  tags: ["practice", "recap", "places", "questions", "negation"],
  grammarTopics: ["accusative-case", "question-words", "negation", "correlatives"],
  vocabularyTopics: ["places", "destinations"]
};

export const briefing = {
  pre: {
    title: "Practice 1 — अभ्यासः १",
    lead: "Recap everything from this module before the test. All six places, all three question tools, negation with न, and the यत्र...तत्र correlative — all in one session.",
    sections: [
      { type:"table", label:"ALL SIX PLACES // षट् गन्तव्यानि", cols:["Sanskrit","Hindi","Meaning"],
        rows:[["गृहम्","घर","Home"],["नगरम्","नगर","City"],["ग्रामम्","गाँव","Village"],["आपणम्","बाज़ार","Market"],["पाठशालाम्","पाठशाला","School"],["उद्यानम्","बाग","Garden"]] },
      { type:"grammar", label:"QUICK PATTERNS // मुख्य प्रयोग", text:"<strong>कुत्र</strong> → Where? &nbsp;·&nbsp; <strong>किम्</strong> → Does? / What? &nbsp;·&nbsp; <strong>कः</strong> → Who?<br><strong>न</strong> before the verb negates: सः ग्रामं <strong>न</strong> गच्छति = He does not go to the village.<br><strong>यत्र...तत्र</strong> = where...there: यत्र त्वं गच्छसि <strong>तत्र</strong> अहं गच्छामि." }
    ]
  },
  mid: []
};

export const questions = [
  {type:"match",question:"Match all six place words to their meanings",pairs:[{left:"गृहम्",right:"Home — घर"},{left:"नगरम्",right:"City — नगर"},{left:"ग्रामम्",right:"Village — गाँव"},{left:"आपणम्",right:"Market — बाज़ार"},{left:"पाठशालाम्",right:"School — पाठशाला"},{left:"उद्यानम्",right:"Garden — बाग"}],explanation:"गृहम् = घर, नगरम् = नगर, ग्रामम् = गाँव, आपणम् = बाज़ार, पाठशालाम् = पाठशाला, उद्यानम् = बाग."},
  {type:"mcq",question:"कः आपणं गच्छति। means:",options:["Does he go to the market?","Where do you go?","Who goes to the market? — बाज़ार कौन जाता है?","He does not go to the market"],answer:"Who goes to the market? — बाज़ार कौन जाता है?",explanation:"कः = Who? (कौन). कः आपणं गच्छति = Who goes to the market? (बाज़ार कौन जाता है?)"},
  {type:"fill",question:"Complete: 'I do not go to the city' — अहं ___ न गच्छामि",sentenceParts:["अहं "," न गच्छामि।"],answer:"नगरं",answerRoman:"nagaram",translation:"I do not go to the city.",explanation:"अहं नगरं न गच्छामि = I do not go to the city (मैं नगर नहीं जाता). नगरम् → नगरं in connected speech."},
  {type:"fill",question:"Add the correct question word: '___ त्वं गच्छसि। — Where do you go?'",sentenceParts:[" त्वं गच्छसि।"],answer:"कुत्र",answerRoman:"kutra",translation:"Where do you go?",explanation:"कुत्र त्वं गच्छसि = Where do you go? (तुम कहाँ जाते हो?) — कुत्र asks for a place."},
  {type:"mcq",question:"यत्र त्वं गच्छसि तत्र अहं गच्छामि। means:",options:["Where you go, I go there too — जहाँ तुम जाते हो वहाँ मैं जाता हूँ","I go where he goes","Where does he go?","You do not go anywhere"],answer:"Where you go, I go there too — जहाँ तुम जाते हो वहाँ मैं जाता हूँ",explanation:"यत्र = where (जहाँ), तत्र = there (वहाँ). यत्र...तत्र links two clauses: where you go, there I go."},
  {type:"wordtiles",question:"Build: 'Does he go to school?'",tiles:["किं","सः","पाठशालां","गच्छति"],distractors:["न","कुत्र"],answer:"किं सः पाठशालां गच्छति।",explanation:"किं सः पाठशालां गच्छति = Does he go to school? (क्या वह पाठशाला जाता है?) — किम् at the start makes it a yes/no question."},
  {type:"mcq",question:"Which verb goes with अहं?",options:["गच्छति","गच्छसि","गच्छामि","गच्छन्ति"],answer:"गच्छामि",explanation:"अहं गच्छामि = I go. The -आमि ending is the first-person singular. त्वं गच्छसि (you go), सः गच्छति (he goes)."},
  {type:"translation",question:"Type: 'You do not go to the garden'",hint:"त्वं + garden + न + you-go-verb",answer:"त्वं उद्यानं न गच्छसि।",answerRoman:"tvam udyaanam na gacchasi",explanation:"त्वं उद्यानं न गच्छसि = You do not go to the garden (तुम बाग नहीं जाते). त्वं → गच्छसि; न before the verb negates."}
];
