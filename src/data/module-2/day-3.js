export const id = "2-3";
export const title = "Negation + Places — नकारः";
export const icon = "🚫";

export const metadata = {
  difficulty: "beginner",
  estimatedMinutes: 10,
  tags: ["negation", "places", "synthesis", "sentences"],
  grammarTopics: ["negation", "destination-nouns", "correlatives"],
  vocabularyTopics: ["places", "negation patterns"]
};

export const briefing = {
  pre: {
    title: "Negation + Places — नकारः",
    lead: "One particle, endless sentences. See how न transforms every destination sentence — and how यत्र...तत्र connects two thoughts into one flowing idea.",
    sections: [
      { type:"grammar", label:"NOT + PLACE // न + गन्तव्य", text:"<strong>न</strong> before the verb negates destination sentences:<br>अहं गृहं <strong>न</strong> गच्छामि — I do not go home.<br>सः ग्रामं <strong>न</strong> गच्छति — He does not go to the village.<br>त्वं पाठशालां <strong>न</strong> गच्छसि — You do not go to school." },
      { type:"block", text:"<strong>All three persons with negation:</strong><br>अहं नगरं न गच्छामि — I do not go to the city. (मैं नगर नहीं जाता।)<br>त्वं आपणं न गच्छसि — You do not go to the market. (तुम बाज़ार नहीं जाते।)<br>सः उद्यानं न गच्छति — He does not go to the garden. (वह बाग नहीं जाता।)" },
      { type:"grammar", label:"CORRELATIVES // यत्र...तत्र", text:"<strong>यत्र...तत्र</strong> = 'where...there' — a two-part structure connecting two clauses:<br>यत्र त्वं गच्छसि <strong>तत्र</strong> अहं गच्छामि — Where you go, I go there too.<br>(जहाँ तुम जाते हो वहाँ मैं जाता हूँ।)" }
    ]
  },
  mid: []
};

export const questions = [
  {type:"mcq",question:"अहं नगरं न गच्छामि means:",options:["I go to the city","He does not go to the city","I do not go to the city — मैं नगर नहीं जाता","You do not go"],answer:"I do not go to the city — मैं नगर नहीं जाता",explanation:"अहं नगरं न गच्छामि = I do not go to the city (मैं नगर नहीं जाता). न before गच्छामि negates the sentence."},
  {type:"fill",question:"Complete: सः ग्रामं ___ गच्छति (He does not go to the village)",sentenceParts:["सः ग्रामं "," गच्छति"],answer:"न",answerRoman:"na",explanation:"सः ग्रामं न गच्छति = He does not go to the village. न goes directly before the verb गच्छति."},
  {type:"wordtiles",question:"Build: 'You do not go to school'",tiles:["त्वं","पाठशालां","न","गच्छसि"],distractors:["किम्","गच्छामि"],answer:"त्वं पाठशालां न गच्छसि",explanation:"त्वं पाठशालां न गच्छसि = You do not go to school. Pronoun + destination + न + verb."},
  {type:"mcq",question:"यत्र त्वं गच्छसि तत्र अहं गच्छामि means:",options:["Where I go, you go","Where you go, I go there too — जहाँ तुम जाते हो वहाँ मैं जाता हूँ","Where does he go?","You do not go everywhere"],answer:"Where you go, I go there too — जहाँ तुम जाते हो वहाँ मैं जाता हूँ",explanation:"यत्र त्वं गच्छसि = where you go; तत्र अहं गच्छामि = I go there. The यत्र...तत्र pair links the two clauses."},
  {type:"mcq",question:"How do you say 'He does not go to the garden'?",options:["सः उद्यानं गच्छति","सः उद्यानं न गच्छति","अहं उद्यानं न गच्छामि","सः न अस्ति"],answer:"सः उद्यानं न गच्छति",explanation:"सः उद्यानं न गच्छति = He does not go to the garden (वह बाग नहीं जाता). सः is third person, so the verb is गच्छति."},
  {type:"match",question:"Match each sentence to its meaning",pairs:[{left:"अहं गृहं न गच्छामि",right:"I do not go home"},{left:"सः ग्रामं गच्छति",right:"He goes to the village"},{left:"त्वं पाठशालां गच्छसि",right:"You go to school"},{left:"कः आपणं गच्छति",right:"Who goes to the market?"}],explanation:"Each sentence uses a different pronoun or question word: अहं (I), सः (he), त्वं (you), कः (who)."},
  {type:"translation",question:"Type: 'I do not go everywhere'",hint:"अहं + everywhere + not + I-go-verb",answer:"अहं सर्वत्र न गच्छामि",answerRoman:"aham sarvatra na gacchami",explanation:"अहं सर्वत्र न गच्छामि = I do not go everywhere (मैं सब स्थान पर नहीं जाता हूँ). सर्वत्र = everywhere."}
];
