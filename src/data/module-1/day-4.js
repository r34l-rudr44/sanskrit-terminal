export const id = "1-4";
export const title = "No & Not — नकार";
export const icon = "🚫";

export const metadata = {
  difficulty: "beginner",
  estimatedMinutes: 8,
  tags: ["negation", "grammar", "sentences"],
  grammarTopics: ["negation", "existence-verb"],
  vocabularyTopics: ["not", "is", "is not"]
};

export const briefing = {
  pre: {
    title: "No & Not — नकार",
    lead: "One small word unlocks dozens of new sentences. न (na) means 'not' — place it before the verb and any sentence becomes its opposite.",
    sections: [
      { type:"table", label:"NEW WORDS // नये शब्द", cols:["Devanagari","Hindi","Meaning"],
        rows:[["न","नहीं","Not / No"],["अस्ति","है","Is (3rd person)"],["नास्ति","नहीं है","Is not (न + अस्ति)"]] },
      { type:"grammar", label:"NEGATION // नकार", text:"Place <strong>न</strong> directly <em>before</em> the verb:<br>अहं गच्छामि → अहं <strong>न</strong> गच्छामि। — I do not go.<br>त्वं गच्छसि → त्वं <strong>न</strong> गच्छसि। — You do not go.<br>सः गच्छति → सः <strong>न</strong> गच्छति। — He does not go." },
      { type:"grammar", label:"NASTI // नास्ति", text:"<strong>नास्ति</strong> = न + अस्ति — a built-in contraction meaning 'is not'.<br>सः तत्र <strong>नास्ति</strong>। — He is not there.<br>Compare: सः तत्र <strong>अस्ति</strong>। — He is there." },
      { type:"block", text:"<strong>More sentences:</strong><br>अहं तत्र न गच्छामि। — I do not go there. (मैं वहाँ नहीं जाता।)<br>त्वं सर्वत्र न गच्छसि। — You do not go everywhere. (तुम सब स्थान पर नहीं जाते।)<br>किं सः न गच्छति। — Does he not go? (क्या वह नहीं जाता?)<br>अहं सर्वत्र न गच्छामि। — I do not go everywhere. (मैं सब स्थान पर नहीं जाता।)" }
    ]
  },
  mid: []
};

export const questions = [
  {type:"mcq",question:"न means:",options:["Not / No — नहीं","There — वहाँ","Where — कहाँ","Is — है"],answer:"Not / No — नहीं",explanation:"न = not/no (नहीं). It is placed before the verb to negate any sentence."},
  {type:"mcq",question:"अहं न गच्छामि means:",options:["I go","I do not go — मैं नहीं जाता","He does not go","You do not go"],answer:"I do not go — मैं नहीं जाता",explanation:"अहं न गच्छामि = I do not go (मैं नहीं जाता). न before गच्छामि negates the first-person verb."},
  {type:"match",question:"Match the words to their meanings",pairs:[{left:"न",right:"Not / No — नहीं"},{left:"अस्ति",right:"Is — है"},{left:"नास्ति",right:"Is not — नहीं है"},{left:"किम्",right:"Does? / What? — क्या"}],explanation:"न = नहीं, अस्ति = है, नास्ति = नहीं है (न + अस्ति), किम् = क्या."},
  {type:"mcq",question:"How do you say 'He does not go'?",options:["सः गच्छति","सः न गच्छति","अहं न गच्छामि","त्वं न गच्छसि"],answer:"सः न गच्छति",explanation:"सः न गच्छति = He does not go. न is placed before गच्छति (the third-person verb)."},
  {type:"fill",question:"Negate the sentence: त्वं सर्वत्र ___ गच्छसि (You do not go everywhere)",sentenceParts:["त्वं सर्वत्र "," गच्छसि"],answer:"न",answerRoman:"na",translation:"You do not go everywhere",explanation:"त्वं सर्वत्र न गच्छसि = You do not go everywhere. न goes before the verb गच्छसि."},
  {type:"wordtiles",question:"Build the sentence: 'I do not go there'",tiles:["अहं","तत्र","न","गच्छामि"],distractors:["गच्छसि","सः"],answer:"अहं तत्र न गच्छामि",explanation:"अहं तत्र न गच्छामि = I do not go there. Place न directly before the verb to negate — other words can appear in any order."},
  {type:"mcq",question:"त्वं न गच्छसि किम् means:",options:["You go everywhere","Do you not go? — तुम नहीं जाते क्या?","He does not go","You do not go here"],answer:"Do you not go? — तुम नहीं जाते क्या?",explanation:"किम् added to त्वं न गच्छसि turns it into a question: Do you not go? (तुम नहीं जाते क्या?)"},
  {type:"mcq",question:"नास्ति is a contraction of:",options:["न + गच्छति","न + सः","न + अस्ति","न + तत्र"],answer:"न + अस्ति",explanation:"नास्ति = न + अस्ति. Just as 'isn't' = 'is not' in English, नास्ति is the ready-made negation of अस्ति (is)."}
];
