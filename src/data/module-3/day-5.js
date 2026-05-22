export const id = "3-5";
export const title = "If & Just As — यदि...तर्हि · यथा...तथा";
export const icon = "⚖️";

export const metadata = {
  difficulty: "beginner",
  estimatedMinutes: 10,
  tags: ["conditionals", "correlatives", "comparison", "sentences"],
  grammarTopics: ["yadi-tarhi", "yathaa-tathaa", "correlatives"],
  vocabularyTopics: ["if-then", "just as-so", "comparison"]
};

export const briefing = {
  pre: {
    title: "Conditionals & Comparisons — यदि...तर्हि · यथा...तथा",
    lead: "You know यत्र…तत्र (where…there) and यदा…तदा (when…then). Sanskrit builds all its correlative pairs the same way — a य- word always followed by a त- word. Now add the last two: conditions and comparisons.",
    sections: [
      { type:"table", label:"THE CORRELATIVE FAMILY // य-/त- सूत्र", cols:["Pair","Meaning","Type"],
        rows:[["यत्र...तत्र","where...there","Place"],["यदा...तदा","when...then","Time"],["यदि...तर्हि","if...then","Condition"],["यथा...तथा","just as...so too","Comparison"]] },
      { type:"grammar", label:"IF...THEN // यदि...तर्हि", text:"<strong>यदि</strong> = If (अगर) — opens the condition.<br><strong>तर्हि</strong> = Then (तब, उस स्थिति में) — introduces the result.<br><br>यदि त्वं जयनगरम् गमिष्यसि <strong>तर्हि</strong> अहं मधुपुरम् गमिष्यामि।<br>— If you go to Jaynagar, then I will go to Madhupur.<br><br>यदि सः पाठशालां गच्छति <strong>तर्हि</strong> अहं अपि गच्छामि।<br>— If he goes to school, then I also go." },
      { type:"grammar", label:"JUST AS...SO TOO // यथा...तथा", text:"<strong>यथा</strong> = Just as / as (जैसे) — sets the standard.<br><strong>तथा</strong> = So too / in the same way (वैसे ही) — applies it.<br><br>यथा सः गच्छति <strong>तथा</strong> त्वं गमिष्यसि।<br>— Just as he goes, so will you go. (जैसे वह जाता है, वैसे तुम जाओगे।)<br><br>यथा त्वं पाठशालां गच्छसि <strong>तथा</strong> सः अपि गच्छति।<br>— Just as you go to school, so does he." }
    ]
  },
  mid: []
};

export const questions = [
  {type:"mcq",question:"यदि means:",options:["When — जब","Always — हमेशा","How — कैसे","If — अगर"],answer:"If — अगर",explanation:"यदि = If (अगर). It opens a conditional clause and pairs with तर्हि (then). यदि...तर्हि = if...then — the condition correlative pair."},
  {type:"mcq",question:"तर्हि means:",options:["Just as — जैसे","Where — जहाँ","Then (in that case) — तब","When — जब"],answer:"Then (in that case) — तब",explanation:"तर्हि = Then / in that case (तब, उस स्थिति में). It is the result-half of यदि...तर्हि, parallel to तदा in यदा...तदा and तत्र in यत्र...तत्र."},
  {type:"mcq",question:"यथा...तथा expresses:",options:["If...then — a condition","When...then — a time sequence","Where...there — a place correlation","Just as...so too — a comparison"],answer:"Just as...so too — a comparison",explanation:"यथा...तथा = 'just as...so too'. यथा सः गच्छति तथा त्वं गमिष्यसि = Just as he goes, so will you go. The whole य-/त- family: यत्र/तत्र (place), यदा/तदा (time), यदि/तर्हि (condition), यथा/तथा (comparison)."},
  {type:"match",question:"Match each य- word to its meaning",pairs:[{left:"यत्र",right:"Where — जहाँ"},{left:"यदा",right:"When — जब"},{left:"यदि",right:"If — अगर"},{left:"यथा",right:"Just as — जैसे"}],explanation:"All य- words introduce the first clause; their त- partners (तत्र, तदा, तर्हि, तथा) introduce the second. Same structure throughout."},
  {type:"fill",question:"Complete the conditional: यदि त्वं जयनगरम् गमिष्यसि ___ अहं मधुपुरम् गमिष्यामि",sentenceParts:["यदि त्वं जयनगरम् गमिष्यसि "," अहं मधुपुरम् गमिष्यामि।"],answer:"तर्हि",answerRoman:"tarhi",translation:"If you go to Jaynagar, then I will go to Madhupur.",explanation:"यदि...तर्हि = if...then. यदि sets the condition; तर्हि introduces the result. Parallel to यदा...तदा (when...then)."},
  {type:"fill",question:"Complete the comparison: यथा सः गच्छति ___ त्वं गमिष्यसि",sentenceParts:["यथा सः गच्छति "," त्वं गमिष्यसि।"],answer:"तथा",answerRoman:"tathaa",translation:"Just as he goes, so will you go.",explanation:"यथा...तथा = just as...so too. यथा introduces the standard; तथा applies it. यथा सः गच्छति तथा त्वं गमिष्यसि = Just as he goes, so will you go."},
  {type:"wordtiles",question:"Build: 'If he goes to school, then I also go'",tiles:["यदि","सः","पाठशालां","गच्छति","तर्हि","अहं","अपि","गच्छामि"],distractors:["यदा","तदा"],answer:"यदि सः पाठशालां गच्छति तर्हि अहं अपि गच्छामि।",explanation:"यदि...तर्हि = if...then. अपि = also. The two clauses follow the correlative structure — condition first (यदि), result second (तर्हि)."}
];
