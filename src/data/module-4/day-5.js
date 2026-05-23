export const id = "4-5";
export const title = "Vowel Dissolution — अयादि सन्धि";
export const icon = "🌊";

export const metadata = {
  difficulty: "intermediate",
  estimatedMinutes: 12,
  tags: ["sandhi", "grammar", "vowels", "phonology"],
  grammarTopics: ["sandhi", "ayaadi-sandhi", "diphthong-resolution"],
  vocabularyTopics: ["compound words"]
};

export const briefing = {
  pre: {
    title: "Vowel Dissolution — अयादि सन्धि",
    lead: "When ए, ऐ, ओ, or औ is followed by any vowel, each compound vowel dissolves into its two original parts with a semi-vowel bridge. This is अयादि सन्धि — how ने + अन became नयन (eye) and गै + अक became गायक (singer).",
    sections: [
      { type:"grammar", label:"THE RULE // एचोऽयवायावः", text:"<strong>एचोऽयवायावः</strong> — the 'ec' vowels (ए, ओ, ऐ, औ) resolve into अय्, अव्, आय्, आव् before any following vowel.<br>Think of it as splitting a compound vowel back into its two original components." },
      { type:"table", label:"THE FOUR SHIFTS // चत्वारः परिवर्तनाः", cols:["Vowel","Becomes","Example"],
        rows:[["ए","→ अय्","ने + अन = नयन"],["ऐ","→ आय्","गै + अक = गायक"],["ओ","→ अव्","भो + अन = भवन"],["औ","→ आव्","नौ + इक = नाविक"]] },
      { type:"block", text:"<strong>More examples:</strong><br>चे + अन = चयन &nbsp;(To choose + action = Selection)<br>पो + अन = पवन &nbsp;(To purify + action = Wind / Pavan)<br>शे + अन = शयन &nbsp;(To lie down + action = Sleeping)<br>नौ + इक = नाविक &nbsp;(Boat + one who = Sailor)" }
    ]
  },
  mid: []
};

export const questions = [
  {type:"mcq",question:"\"एचोऽयवायावः\" means:",options:["Two similar vowels fuse into one long vowel","ec vowels (ए, ओ, ऐ, औ) dissolve into अय्/अव्/आय्/आव् before a vowel — ए, ओ, ऐ, औ विभक्त हो जाते हैं","अ/आ upgrades the following vowel","ik vowels become semi-vowels"],answer:"ec vowels (ए, ओ, ऐ, औ) dissolve into अय्/अव्/आय्/आव् before a vowel — ए, ओ, ऐ, औ विभक्त हो जाते हैं",explanation:"एचः = of the 'ec' vowels (ए, ओ, ऐ, औ); they become अय्, अव्, आय्, आव् before another vowel. Each compound vowel splits back into its two parts with a semi-vowel bridge."},
  {type:"mcq",question:"ए + (vowel) = ?",options:["ए + vowel unchanged","अय् + vowel","आय् + vowel","अव् + vowel"],answer:"अय् + vowel",explanation:"ए before any vowel dissolves into अय् by अयादि सन्धि. Example: ने + अन → न + अय् + अन = नयन (eye)."},
  {type:"mcq",question:"ने + अन = ?",options:["नेअन","नेन","नयन","नान"],answer:"नयन",explanation:"ने ends in ए; अन begins with अ. ए → अय् before अ: न + अय् + अन = नयन (eye)."},
  {type:"mcq",question:"औ + (vowel) = ?",options:["औ + vowel unchanged","अय् + vowel","आव् + vowel","अव् + vowel"],answer:"आव् + vowel",explanation:"औ before any vowel dissolves into आव् by अयादि सन्धि. Example: नौ + इक → न + आव् + इक = नाविक (sailor)."},
  {type:"fill",question:"Apply अयादि सन्धि: गै + अक = ___",sentenceParts:["गै + अक = ",""],answer:"गायक",answerRoman:"gaayaka",translation:"One who sings = Singer",explanation:"गै ends in ऐ; अक begins with अ. ऐ → आय् before अ: ग + आय् + अक = गायक (singer)."},
  {type:"fill",question:"Apply अयादि सन्धि: भो + अन = ___",sentenceParts:["भो + अन = ",""],answer:"भवन",answerRoman:"bhavana",translation:"Building / Abode",explanation:"भो ends in ओ; अन begins with अ. ओ → अव् before अ: भ + अव् + अन = भवन (building)."},
  {type:"fill",question:"Apply अयादि सन्धि: नौ + इक = ___",sentenceParts:["नौ + इक = ",""],answer:"नाविक",answerRoman:"naavika",translation:"Sailor / Navigator",explanation:"नौ ends in औ; इक begins with इ. औ → आव् before इ: न + आव् + इक = नाविक (sailor)."},
  {type:"match",question:"Match each word pair to its अयादि सन्धि result",pairs:[{left:"ने + अन",right:"नयन"},{left:"गै + अक",right:"गायक"},{left:"भो + अन",right:"भवन"},{left:"नौ + इक",right:"नाविक"}],explanation:"ए→अय् (नयन), ऐ→आय् (गायक), ओ→अव् (भवन), औ→आव् (नाविक) — all four ayādi shifts demonstrated."}
];
