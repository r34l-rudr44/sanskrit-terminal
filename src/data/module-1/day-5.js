export const id = "1-5";
export const title = "Who? — कः";
export const icon = "❓";

export const metadata = {
  difficulty: "beginner",
  estimatedMinutes: 8,
  tags: ["questions", "grammar", "sentences"],
  grammarTopics: ["question-words", "existence-verb"],
  vocabularyTopics: ["who", "is", "is not"]
};

export const briefing = {
  pre: {
    title: "Who? — कः",
    lead: "You already know कुत्र (where?) and किम् (does?). Now meet कः — the 'who?' for masculine subjects. Together they complete your question toolkit.",
    sections: [
      { type:"table", label:"QUESTION WORDS // प्रश्नवाचक", cols:["Devanagari","Hindi","Meaning"],
        rows:[["कः","कौन","Who? (masculine subject)"],["किम्","क्या","What? / Does?"],["कुत्र","कहाँ","Where?"],["अस्ति","है","Is"],["नास्ति","नहीं है","Is not"]] },
      { type:"grammar", label:"KAH // कः", text:"<strong>कः</strong> asks 'Who?' when the subject is masculine.<br>कः तत्र गच्छति। — Who goes there? (कौन वहाँ जाता है?)<br>कः सर्वत्र गच्छति। — Who goes everywhere? (कौन सब स्थान पर जाता है?)" },
      { type:"grammar", label:"EXISTENCE // अस्ति", text:"<strong>अस्ति</strong> means 'is'. Combine it with कः and तत्र:<br>कः तत्र <strong>अस्ति</strong>। — Who is there? (कौन वहाँ है?)<br>Add किम् to ask yes/no: कः तत्र अस्ति <strong>किम्</strong>। — Is someone there? (क्या वहाँ कोई है?)" },
      { type:"block", text:"<strong>Sentences with negation:</strong><br>तत्र कः न गच्छति। — Who does not go there? (वहाँ कौन नहीं जाता?)<br>कः सर्वत्र न गच्छति। — Who does not go everywhere? (कौन सब स्थान पर नहीं जाता?)" }
    ]
  },
  mid: []
};

export const questions = [
  {type:"mcq",question:"कः means:",options:["Where — कहाँ","Who? — कौन","What? — क्या","There — वहाँ"],answer:"Who? — कौन",explanation:"कः = Who? (कौन) — used for masculine subjects. It is the interrogative pronoun for 'who'."},
  {type:"mcq",question:"कः तत्र गच्छति means:",options:["Who is there?","Who goes there? — कौन वहाँ जाता है?","He goes there","Does he go there?"],answer:"Who goes there? — कौन वहाँ जाता है?",explanation:"कः तत्र गच्छति = Who goes there? (कौन वहाँ जाता है?) — कः (who) + तत्र (there) + गच्छति (goes)."},
  {type:"match",question:"Match the words to their meanings",pairs:[{left:"कः",right:"Who? — कौन"},{left:"अस्ति",right:"Is — है"},{left:"नास्ति",right:"Is not — नहीं है"},{left:"तत्र",right:"There — वहाँ"}],explanation:"कः = कौन, अस्ति = है, नास्ति = नहीं है, तत्र = वहाँ."},
  {type:"fill",question:"Complete: ___ तत्र अस्ति (Who is there?)",sentenceParts:["", " तत्र अस्ति"],answer:"कः",answerRoman:"kaH",explanation:"कः तत्र अस्ति = Who is there? (कौन वहाँ है?) — कः starts the question."},
  {type:"wordtiles",question:"Build the sentence: 'Who goes everywhere?'",tiles:["कः","सर्वत्र","गच्छति"],distractors:["अस्ति","न"],answer:"कः सर्वत्र गच्छति",explanation:"कः सर्वत्र गच्छति = Who goes everywhere? (कौन सब स्थान पर जाता है?)"},
  {type:"mcq",question:"कः तत्र अस्ति किम् means:",options:["Who goes there?","He is there","Is someone there? — क्या वहाँ कोई है?","Who does not go?"],answer:"Is someone there? — क्या वहाँ कोई है?",explanation:"कः तत्र अस्ति किम् = Is someone there? (क्या वहाँ कोई है?) — किम् at the end turns it into a yes/no question."},
  {type:"mcq",question:"तत्र कः न गच्छति means:",options:["Who is everywhere?","Who does not go there? — वहाँ कौन नहीं जाता?","He does not go","Where does he go?"],answer:"Who does not go there? — वहाँ कौन नहीं जाता?",explanation:"तत्र कः न गच्छति = Who does not go there? (वहाँ कौन नहीं जाता?) — combines तत्र, कः, न, and गच्छति."}
];
