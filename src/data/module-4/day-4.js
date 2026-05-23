export const id = "4-4";
export const title = "Semi-vowel Shift — यण सन्धि";
export const icon = "↩️";

export const metadata = {
  difficulty: "intermediate",
  estimatedMinutes: 12,
  tags: ["sandhi", "grammar", "vowels", "semi-vowels", "phonology"],
  grammarTopics: ["sandhi", "yaN-sandhi", "semi-vowels"],
  vocabularyTopics: ["compound words"]
};

export const briefing = {
  pre: {
    title: "Semi-vowel Shift — यण सन्धि",
    lead: "When इ, उ, or ऋ is immediately followed by a different vowel, it converts into the corresponding semi-vowel — य्, व्, or र्. This is यण सन्धि, and it explains everyday words like यद्यपि, गुर्वाश्रम, and पित्रादेश.",
    sections: [
      { type:"grammar", label:"THE RULE // इको यणचि", text:"<strong>इको यणचि</strong> — the 'ik' vowels (इ/ई, उ/ऊ, ऋ) become yaṇ sounds (य्, व्, र्) before any different vowel.<br>The syllable before converts; the following vowel attaches directly to the new semi-vowel." },
      { type:"table", label:"THE THREE SHIFTS // त्रयः परिवर्तनाः", cols:["Vowel","Becomes","Example"],
        rows:[["इ / ई","→ य्","यदि + अपि = यद्यपि"],["उ / ऊ","→ व्","गुरु + आश्रम = गुर्वाश्रम"],["ऋ","→ र्","पितृ + आदेश = पित्रादेश"]] },
      { type:"block", text:"<strong>More examples:</strong><br>इति + अत्र = इत्यत्र &nbsp;(Thus + here = Thus here)<br>मधु + इच्छा = मध्विच्छा &nbsp;(Honey + desire = Desire for honey)<br>देवी + आगमन = देव्यागमन &nbsp;(Goddess + arrival = Goddess's arrival)<br>वधू + आगमन = वध्वागमन &nbsp;(Bride + arrival = Bride's arrival)" }
    ]
  },
  mid: []
};

export const questions = [
  {type:"mcq",question:"\"इको यणचि\" means:",options:["Similar vowels fuse into a long vowel","अ/आ upgrades the following vowel","ik vowels (इ/ई, उ/ऊ, ऋ) become semi-vowels before a different vowel — इक् स्वर यण् बन जाते हैं","Vowels disappear after consonants"],answer:"ik vowels (इ/ई, उ/ऊ, ऋ) become semi-vowels before a different vowel — इक् स्वर यण् बन जाते हैं",explanation:"इकः = of the ik vowels (इ/ई, उ/ऊ, ऋ); यण् = the semi-vowels (य्, व्, र्); अचि = before a vowel. When ik vowels precede any different vowel, they shift to the corresponding semi-vowel."},
  {type:"mcq",question:"इ / ई + (different vowel) = ?",options:["य् + that vowel","व् + that vowel","र् + that vowel","ए"],answer:"य् + that vowel",explanation:"इ or ई before a different vowel becomes य् (the palatal semi-vowel) by यण सन्धि. Example: यदि + अपि → यद् + य् + अपि = यद्यपि."},
  {type:"mcq",question:"यदि + अपि = ?",options:["यदिअपि","यदेऽपि","यद्यपि","यदिपि"],answer:"यद्यपि",explanation:"यदि ends in इ; अपि begins with a different vowel अ. इ → य् before अ: यद् + य् + अपि = यद्यपि (although / यद्यपि)."},
  {type:"mcq",question:"उ / ऊ + (different vowel) = ?",options:["य् + that vowel","व् + that vowel","र् + that vowel","ओ"],answer:"व् + that vowel",explanation:"उ or ऊ before a different vowel becomes व् (the labial semi-vowel) by यण सन्धि. Example: गुरु + आश्रम → गुर् + व् + आश्रम = गुर्वाश्रम."},
  {type:"fill",question:"Apply यण सन्धि: गुरु + आश्रम = ___",sentenceParts:["गुरु + आश्रम = ",""],answer:"गुर्वाश्रम",answerRoman:"gurvaaShrama",translation:"Guru's hermitage",explanation:"गुरु ends in उ; आश्रम begins with आ (a different vowel). उ → व् before आ: गुर् + व् + आश्रम = गुर्वाश्रम."},
  {type:"fill",question:"Apply यण सन्धि: पितृ + आदेश = ___",sentenceParts:["पितृ + आदेश = ",""],answer:"पित्रादेश",answerRoman:"pitraadesha",translation:"Father's command",explanation:"पितृ ends in ऋ; आदेश begins with आ (a different vowel). ऋ → र् before आ: पित् + र् + आदेश = पित्रादेश."},
  {type:"mcq",question:"इति + अत्र = ?",options:["इत्यत्र","इत्यात्र","इतिअत्र","इतेऽत्र"],answer:"इत्यत्र",explanation:"इति ends in इ; अत्र begins with अ (different vowel). इ → य् before अ: इत् + य् + अत्र = इत्यत्र (thus here)."},
  {type:"match",question:"Match each word pair to its यण सन्धि result",pairs:[{left:"यदि + अपि",right:"यद्यपि"},{left:"गुरु + आश्रम",right:"गुर्वाश्रम"},{left:"पितृ + आदेश",right:"पित्रादेश"},{left:"इति + अत्र",right:"इत्यत्र"}],explanation:"इ→य् (यद्यपि, इत्यत्र), उ→व् (गुर्वाश्रम), ऋ→र् (पित्रादेश) — all three yaṇ shifts demonstrated."}
];
