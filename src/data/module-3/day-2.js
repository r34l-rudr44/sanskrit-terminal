export const id = "3-2";
export const title = "When & Then — यदा...तदा";
export const icon = "⏳";

export const metadata = {
  difficulty: "beginner",
  estimatedMinutes: 10,
  tags: ["time", "correlatives", "negation", "sentences"],
  grammarTopics: ["temporal-correlatives", "negation-with-adverbs"],
  vocabularyTopics: ["when-then", "negation patterns"]
};

export const briefing = {
  pre: {
    title: "When & Then — यदा...तदा",
    lead: "यदा...तदा is the temporal parallel to यत्र...तत्र. 'When (यदा) A happens, then (तदा) B follows.' Master this pair and you can chain any two events in time.",
    sections: [
      { type:"grammar", label:"CORRELATIVES // यदा...तदा", text:"<strong>यदा...तदा</strong> = 'when...then' — a two-part structure linking two events:<br>यदा सः ग्रामं गच्छति <strong>तदा</strong> अहं उद्यानं गच्छामि। — When he goes to the village, then I go to the garden.<br>यदा त्वं ग्रामं गच्छसि <strong>तदा</strong> अहं उद्यानं गच्छामि। — When you go to the village, then I go to the garden.<br>(जब वह गाँव जाता है तब मैं बाग जाता हूँ।)" },
      { type:"grammar", label:"NEGATION + TIME // न + कालवाचक", text:"Adding <strong>न</strong> with a time adverb creates nuanced negation:<br>सः उद्यानं <strong>सर्वदा न</strong> गच्छति। — He does not <em>always</em> go to the garden. (= sometimes he doesn't)<br>सः तत्र <strong>सदैव न</strong> गच्छति। — He does not always go there.<br><strong>सर्वदा/सदैव + न</strong> = 'not always' — partial negation, not total absence." },
      { type:"block", text:"<strong>More sentences:</strong><br>त्वं पाठशालां न गच्छसि किम् — Do you not go to school? (क्या तुम पाठशाला नहीं जाते?)<br>किं सः उद्यानं न गच्छति — Does he not go to the garden? (क्या वह बाग नहीं जाता?)<br>सः ग्रामं न गच्छति — He does not go to the village. (वह गाँव नहीं जाता।)" }
    ]
  },
  mid: []
};

export const questions = [
  {type:"mcq",question:"यदा सः ग्रामं गच्छति। means:",options:["He always goes to the village","When does he go to the village?","When he goes to the village — जब वह गाँव जाता है","He does not go to the village"],answer:"When he goes to the village — जब वह गाँव जाता है",explanation:"यदा introduces a relative time clause — 'when (something happens)'. यदा सः ग्रामं गच्छति = When he goes to the village (जब वह गाँव जाता है)."},
  {type:"fill",question:"Complete: यदा त्वं ग्रामं गच्छसि ___ अहं उद्यानं गच्छामि",sentenceParts:["यदा त्वं ग्रामं गच्छसि "," अहं उद्यानं गच्छामि।"],answer:"तदा",answerRoman:"tadaa",translation:"When you go to the village, then I go to the garden",explanation:"यदा...तदा is the correlative pair meaning 'when...then'. यदा = when (जब), तदा = then (तब)."},
  {type:"mcq",question:"सः उद्यानं सर्वदा न गच्छति। means:",options:["He always goes to the garden","He does not go to the garden","He does not always go to the garden — वह बाग हमेशा नहीं जाता","He never goes anywhere"],answer:"He does not always go to the garden — वह बाग हमेशा नहीं जाता",explanation:"सर्वदा न = 'not always' (partial negation). सः उद्यानं सर्वदा न गच्छति = He does not always go to the garden — sometimes he does, just not every time."},
  {type:"wordtiles",question:"Build: 'When he goes to the village, then I go to the garden'",tiles:["यदा","सः","ग्रामं","गच्छति","तदा","अहं","उद्यानं","गच्छामि"],distractors:["सदा","तत्र"],answer:"यदा सः ग्रामं गच्छति तदा अहं उद्यानं गच्छामि।",explanation:"यदा सः ग्रामं गच्छति तदा अहं उद्यानं गच्छामि = When he goes to the village, then I go to the garden. यदा begins the 'when' clause, तदा begins the 'then' clause."},
  {type:"mcq",question:"त्वं पाठशालां न गच्छसि किम्। means:",options:["You do not go to school","Do you not go to school? — क्या तुम पाठशाला नहीं जाते","Does he not go to school?","You always go to school"],answer:"Do you not go to school? — क्या तुम पाठशाला नहीं जाते",explanation:"त्वं पाठशालां न गच्छसि = You do not go to school. Adding किम् at the end turns it into a negative question: Do you not go to school?"},
  {type:"match",question:"Match each sentence to its meaning",pairs:[{left:"यदा सः ग्रामं गच्छति",right:"When he goes to the village"},{left:"तदा अहं उद्यानं गच्छामि",right:"Then I go to the garden"},{left:"सः उद्यानं सर्वदा न गच्छति",right:"He does not always go to the garden"},{left:"किं सः उद्यानं न गच्छति",right:"Does he not go to the garden?"}],explanation:"यदा = when (जब), तदा = then (तब), सर्वदा न = not always, किम् + न = does not...?"},
  {type:"translation",question:"Type: 'I always go to the city'",hint:"अहं + सदैव + नगरं + गच्छामि (any word order works)",answer:"अहं सदैव नगरं गच्छामि।",answerRoman:"aham sadaiva nagaram gacchami",explanation:"अहं सदैव नगरं गच्छामि = I always go to the city (मैं हमेशा नगर जाता हूँ). सदैव = always."}
];
