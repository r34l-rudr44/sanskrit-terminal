export const id = "4-T";
export const title = "Final Test";
export const icon = "📝";
export const isTest = true;

export const metadata = {
  difficulty: "beginner",
  estimatedMinutes: 12,
  tags: ["assessment", "module-test", "sandhi", "review"],
  grammarTopics: ["sandhi", "dirgha-sandhi", "guNa-sandhi", "vRddhi-sandhi", "yaN-sandhi", "ayaadi-sandhi"],
  vocabularyTopics: ["compound words"]
};

export const briefing = {
  pre: {
    title: "Module 4 Final Test",
    lead: "You've learned all five types of स्वर सन्धि — दीर्घ, गुण, वृद्धि, यण, and अयादि. This test checks whether you can identify which rule applies and apply it correctly.",
    sections: [
      { type:"block", text:"<strong>This test covers:</strong> दीर्घ सन्धि (similar vowels fuse) · गुण सन्धि (अ/आ + इ/उ/ऋ → ए/ओ/अर्) · वृद्धि सन्धि (अ/आ + ए/ओ → ऐ/औ) · यण सन्धि (इ/उ/ऋ → य्/व्/र् before different vowel) · अयादि सन्धि (ए/ऐ/ओ/औ → अय्/आय्/अव्/आव्)" },
      { type:"grammar", label:"TEST RULES", text:"Answer at least 60% correctly to pass. Mistakes show the correct answer with an explanation." }
    ]
  },
  mid: []
};

export const questions = [
  {type:"mcq",question:"हिम + आलय = ?",options:["हिमेलय","हिमाआलय","हिमालय","हिमोलय"],answer:"हिमालय",explanation:"दीर्घ सन्धि: हिम ends in अ; आलय begins with आ. अ + आ → आ (same family — both fuse to long आ). Result: हिमालय (Himalaya)."},
  {type:"mcq",question:"देव + इन्द्र = ?",options:["देवइन्द्र","देवेन्द्र","देवैन्द्र","देवोन्द्र"],answer:"देवेन्द्र",explanation:"गुण सन्धि: देव ends in अ; इन्द्र begins with इ (different family). अ + इ → ए. Result: देवेन्द्र (Lord of gods)."},
  {type:"mcq",question:"एक + एक = ?",options:["एकेक","एकएक","एकोक","एकैक"],answer:"एकैक",explanation:"वृद्धि सन्धि: एक ends in अ; the second एक begins with ए. अ + ए → ऐ (vṛddhi rule). Result: एकैक (one by one)."},
  {type:"mcq",question:"यदि + अपि = ?",options:["यदिअपि","यदेऽपि","यद्यपि","यदिपि"],answer:"यद्यपि",explanation:"यण सन्धि: यदि ends in इ; अपि begins with a different vowel अ. इ → य् before अ. Result: यद्यपि (although)."},
  {type:"mcq",question:"ने + अन = ?",options:["नेअन","नेन","नान","नयन"],answer:"नयन",explanation:"अयादि सन्धि: ने ends in ए; अन begins with अ. ए → अय् before अ. Result: नयन (eye)."},
  {type:"mcq",question:"Which sandhi type applies to: रवि + इन्द्र = रवीन्द्र?",options:["गुण सन्धि","वृद्धि सन्धि","दीर्घ सन्धि","यण सन्धि"],answer:"दीर्घ सन्धि",explanation:"रवि ends in इ; इन्द्र begins with इ — the same vowel family. इ + इ → ई. This is दीर्घ सन्धि (similar vowels fuse into one long vowel)."},
  {type:"mcq",question:"Which sandhi type applies to: महा + ओषधि = महौषधि?",options:["गुण सन्धि","दीर्घ सन्धि","वृद्धि सन्धि","अयादि सन्धि"],answer:"वृद्धि सन्धि",explanation:"महा ends in आ; ओषधि begins with ओ. आ + ओ → औ. This is वृद्धि सन्धि — अ/आ before ओ/औ produces vṛddhi vowel औ."},
  {type:"fill",question:"Apply sandhi: सूर्य + उदय = ___",sentenceParts:["सूर्य + उदय = ",""],answer:"सूर्योदय",answerRoman:"suuRyodaya",translation:"Sunrise",explanation:"गुण सन्धि: सूर्य ends in अ; उदय begins with उ. अ + उ → ओ. Result: सूर्योदय (sunrise)."},
  {type:"fill",question:"Apply sandhi: गुरु + आश्रम = ___",sentenceParts:["गुरु + आश्रम = ",""],answer:"गुर्वाश्रम",answerRoman:"gurvaaShrama",translation:"Guru's hermitage",explanation:"यण सन्धि: गुरु ends in उ; आश्रम begins with आ (different vowel). उ → व् before आ. Result: गुर्वाश्रम."},
  {type:"match",question:"Match each word pair to the sandhi type it follows",pairs:[{left:"हिम + आलय → हिमालय",right:"दीर्घ सन्धि"},{left:"गण + ईश → गणेश",right:"गुण सन्धि"},{left:"नौ + इक → नाविक",right:"अयादि सन्धि"},{left:"पितृ + आदेश → पित्रादेश",right:"यण सन्धि"}],explanation:"दीर्घ (similar vowels fuse), गुण (अ/आ + इ/ई → ए), अयादि (औ → आव्), यण (ऋ → र् before vowel)."}
];
