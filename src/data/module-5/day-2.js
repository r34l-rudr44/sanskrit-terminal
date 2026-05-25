export const id = "5-2";
export const title = "The 7 Questions — सप्तककाराः";
export const icon = "❓";

export const metadata = {
  difficulty: "intermediate",
  estimatedMinutes: 10,
  tags: ["questions", "grammar", "interrogatives", "vocabulary"],
  grammarTopics: ["question-words", "interrogatives"],
  vocabularyTopics: ["what", "where", "how many", "from where", "when", "how", "why"]
};

export const briefing = {
  pre: {
    title: "The 7 Questions — सप्तककाराः",
    lead: "Every Sanskrit question word begins with क. These seven — the सप्तककाराः (the seven ka-words) — cover the full range of inquiry: what, where, how many, from where, when, how, and why.",
    sections: [
      { type:"table", label:"THE SEVEN KA-WORDS // सप्तककाराः", cols:["Sanskrit","Roman","Meaning","Hindi"],
        rows:[
          ["किम्","kim","What?","क्या?"],
          ["कुत्र","kutra","Where?","कहाँ?"],
          ["कति","kati","How many?","कितने?"],
          ["कुतः","kutaH","From where?","कहाँ से?"],
          ["कदा","kadā","When?","कब?"],
          ["कथम्","katham","How?","कैसे?"],
          ["किमर्थम्","kimartham","Why?","क्यों?"]
        ]
      },
      { type:"grammar", label:"NO QUESTION MARK // प्रश्नचिन्ह नहीं", text:"Sanskrit does not traditionally use a question mark — the question word itself signals the interrogative. Relative pronouns (यत्र, यदा, यथा) are separate and used only in correlatives; the seven कक-words are purely interrogative.<br><strong>कुतः त्वं आगच्छसि।</strong> — From where do you come? (कहाँ से तुम आते हो?)<br><strong>किमर्थम् त्वं तत्र गच्छसि।</strong> — Why do you go there? (तुम वहाँ क्यों जाते हो?)" },
      { type:"block", text:"<strong>Grouping to remember:</strong><br>किम् · कति · किमर्थम् — start with किम्: ask about things, count, reason<br>कुत्र · कुतः — place pair: <em>where</em> vs <em>from where</em><br>कदा — time: <em>when</em><br>कथम् — manner: <em>how</em>" }
    ]
  },
  mid: []
};

export const questions = [
  {type:"mcq",question:"कति means:",options:["When — कब","How many — कितने","How — कैसे","From where — कहाँ से"],answer:"How many — कितने",explanation:"कति = How many? (कितने?) — asks about quantity or number."},
  {type:"mcq",question:"कुतः means:",options:["Where — कहाँ","From where — कहाँ से","How — कैसे","Why — क्यों"],answer:"From where — कहाँ से",explanation:"कुतः = From where? (कहाँ से?) — asks about origin or starting point. Contrast: कुत्र = Where? (location or destination)."},
  {type:"mcq",question:"कथम् त्वं गच्छसि। means:",options:["When do you go?","Why do you go?","How do you go? — तुम कैसे जाते हो?","Where do you go?"],answer:"How do you go? — तुम कैसे जाते हो?",explanation:"कथम् = How? (कैसे?). कथम् त्वं गच्छसि = How do you go? (तुम कैसे जाते हो?)"},
  {type:"mcq",question:"किमर्थम् means:",options:["What? — क्या","When? — कब","How? — कैसे","Why? — क्यों"],answer:"Why? — क्यों",explanation:"किमर्थम् = Why? (क्यों?) — literally 'for what purpose?'. किम् (what) + अर्थम् (for the sake of) = किमर्थम्."},
  {type:"match",question:"Match all seven question words to their meanings",pairs:[{left:"किम्",right:"What? — क्या"},{left:"कुत्र",right:"Where? — कहाँ"},{left:"कति",right:"How many? — कितने"},{left:"कुतः",right:"From where? — कहाँ से"},{left:"कदा",right:"When? — कब"},{left:"कथम्",right:"How? — कैसे"},{left:"किमर्थम्",right:"Why? — क्यों"}],explanation:"किम् = क्या, कुत्र = कहाँ, कति = कितने, कुतः = कहाँ से, कदा = कब, कथम् = कैसे, किमर्थम् = क्यों."},
  {type:"fill",question:"Complete: '___ त्वं गच्छसि। — How do you go?'",sentenceParts:["", " त्वं गच्छसि।"],answer:"कथम्",answerRoman:"katham",translation:"How do you go?",explanation:"कथम् त्वं गच्छसि = How do you go? (तुम कैसे जाते हो?) — कथम् asks about manner."},
  {type:"fill",question:"Complete: '___ त्वं तत्र गच्छसि। — Why do you go there?'",sentenceParts:["", " त्वं तत्र गच्छसि।"],answer:"किमर्थम्",answerRoman:"kimartham",translation:"Why do you go there?",explanation:"किमर्थम् त्वं तत्र गच्छसि = Why do you go there? (तुम वहाँ क्यों जाते हो?) — किमर्थम् = 'for what purpose?'"},
  {type:"wordtiles",question:"Build: 'From where do you come?'",tiles:["कुतः","त्वं","आगच्छसि"],distractors:["कुत्र","गच्छसि"],answer:"कुतः त्वं आगच्छसि।",explanation:"कुतः त्वं आगच्छसि = From where do you come? (तुम कहाँ से आते हो?) — कुतः (from where) vs कुत्र (where). आगच्छसि = you come (आ + गच्छसि)."}
];
