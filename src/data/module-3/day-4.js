export const id = "3-4";
export const title = "Future & Conditionals — भविष्यत्";
export const icon = "🔮";

export const metadata = {
  difficulty: "beginner",
  estimatedMinutes: 10,
  tags: ["future-tense", "conditionals", "correlatives", "sentences"],
  grammarTopics: ["future-tense", "yadi-tarhi", "yathaa-tathaa"],
  vocabularyTopics: ["will go", "if-then", "just as-so"]
};

export const briefing = {
  pre: {
    title: "Future & Conditionals — भविष्यत्",
    lead: "Three new structures open up whole new kinds of sentences: the future tense (गमिष्यामि — I will go), the conditional pair यदि...तर्हि (if...then), and the comparative pair यथा...तथा (just as...so too).",
    sections: [
      { type:"table", label:"FUTURE TENSE // भविष्यत्काल", cols:["Sanskrit","Hindi","Meaning"],
        rows:[["गमिष्यामि","मैं जाऊँगा","I will go"],["गमिष्यसि","तुम जाओगे","You will go"],["गमिष्यति","वह जाएगा","He will go"]] },
      { type:"grammar", label:"IF...THEN // यदि...तर्हि", text:"<strong>यदि...तर्हि</strong> = 'if...then' — a conditional pair that follows the same य-/त- pattern you already know:<br>यदि त्वं जयनगरम् गमिष्यसि <strong>तर्हि</strong> अहं मधुपुरम् गमिष्यामि। — If you go to Jaynagar, then I will go to Madhupur.<br>Compare: यदा...तदा (when...then), यत्र...तत्र (where...there), यथा...तथा (just as...so too)." },
      { type:"block", text:"<strong>More sentences:</strong><br>अहं श्वः जयनगरम् गमिष्यामि — I will go to Jaynagar tomorrow.<br>सः परश्वः मधुपुरम् गमिष्यति — He will go to Madhupur day after tomorrow.<br>त्वं कथम् जयनगरम् गमिष्यसि — How will you go to Jaynagar? (तुम कैसे जयनगर जाओगे?)<br>यथा सः गच्छति तथा त्वं गमिष्यसि — Just as he goes, so will you go." }
    ]
  },
  mid: []
};

export const questions = [
  {type:"mcq",question:"गमिष्यामि means:",options:["I am going — मैं जाता हूँ","I went — मैं गया","He will go — वह जाएगा","I will go — मैं जाऊँगा"],answer:"I will go — मैं जाऊँगा",explanation:"गमिष्यामि = I will go (मैं जाऊँगा). The -इष्य- infix marks the future tense; -आमि = I. Pattern: गमिष्यामि (I) / गमिष्यसि (you) / गमिष्यति (he)."},
  {type:"mcq",question:"यदि means:",options:["When — जब","Always — हमेशा","How — कैसे","If — यदि, अगर"],answer:"If — यदि, अगर",explanation:"यदि = If (अगर). It introduces a conditional clause and pairs with तर्हि (then). यदि...तर्हि = if...then."},
  {type:"mcq",question:"कथम् means:",options:["Where? — कहाँ","When? — कब","What? — क्या","How? — कैसे"],answer:"How? — कैसे",explanation:"कथम् = How? (कैसे). The question word family: कुत्र = where?, कदा = when?, कः = who?, कथम् = how?"},
  {type:"match",question:"Match the future tense forms and the new question word",pairs:[{left:"गमिष्यामि",right:"I will go — मैं जाऊँगा"},{left:"गमिष्यसि",right:"You will go — तुम जाओगे"},{left:"गमिष्यति",right:"He will go — वह जाएगा"},{left:"कथम्",right:"How? — कैसे"}],explanation:"Future tense of गम्: -आमि (I), -सि (you), -ति (he/she). कथम् = how?, the manner question word."},
  {type:"fill",question:"Complete the conditional: यदि त्वं जयनगरम् गमिष्यसि ___ अहं मधुपुरम् गमिष्यामि",sentenceParts:["यदि त्वं जयनगरम् गमिष्यसि "," अहं मधुपुरम् गमिष्यामि।"],answer:"तर्हि",answerRoman:"tarhi",translation:"If you go to Jaynagar, then I will go to Madhupur",explanation:"यदि...तर्हि = if...then. यदि sets the condition; तर्हि introduces the result. Same family as यदा...तदा (when...then) and यत्र...तत्र (where...there)."},
  {type:"mcq",question:"यथा...तथा expresses:",options:["If...then — a condition","When...then — a time sequence","Where...there — a place correlation","Just as...so too — a comparison"],answer:"Just as...so too — a comparison",explanation:"यथा...तथा = 'just as...so too'. यथा सः गच्छति तथा त्वं गमिष्यसि = Just as he goes, so will you go. The full य-/त- correlative family: यत्र/तत्र, यदा/तदा, यथा/तथा, यदि/तर्हि."},
  {type:"wordtiles",question:"Build: 'I will go to Jaynagar tomorrow'",tiles:["अहं","श्वः","जयनगरम्","गमिष्यामि"],distractors:["गमिष्यति","परश्वः"],answer:"अहं श्वः जयनगरम् गमिष्यामि।",explanation:"अहं श्वः जयनगरम् गमिष्यामि = I will go to Jaynagar tomorrow. श्वः = tomorrow, जयनगरम् = to Jaynagar (accusative), गमिष्यामि = I will go."}
];
