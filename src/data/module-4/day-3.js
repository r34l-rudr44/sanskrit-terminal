export const id = "4-3";
export const title = "Peak Vowels — वृद्धि सन्धि";
export const icon = "⬆️";

export const metadata = {
  difficulty: "beginner",
  estimatedMinutes: 10,
  tags: ["sandhi", "grammar", "vowels", "phonology"],
  grammarTopics: ["sandhi", "vRddhi-sandhi", "vowel-combination"],
  vocabularyTopics: ["compound words"]
};

export const briefing = {
  pre: {
    title: "Peak Vowels — वृद्धि सन्धि",
    lead: "When अ or आ meets ए/ऐ or ओ/औ, the vowels combine into the highest vowel of that family — ऐ or औ. This is वृद्धि सन्धि, literally 'growth sandhi', producing words like एकैक and महौषधि.",
    sections: [
      { type:"grammar", label:"THE RULE // वृद्धिरेचि", text:"<strong>वृद्धिरेचि</strong> — when अ or आ precedes ए/ऐ or ओ/औ, both merge into the vṛddhi vowel ऐ or औ.<br>वृद्धि vowels are the 'grown' forms: <strong>ऐ</strong> is the vṛddhi of इ, and <strong>औ</strong> is the vṛddhi of उ." },
      { type:"table", label:"THE TWO RULES // द्वे नियमे", cols:["Vowels joining","Result","Example"],
        rows:[["अ / आ + ए / ऐ","→ ऐ","एक + एक = एकैक"],["अ / आ + ओ / औ","→ औ","महा + ओषधि = महौषधि"]] },
      { type:"block", text:"<strong>More examples:</strong><br>देव + ऐश्वर्य = देवैश्वर्य &nbsp;(God + glory = Divine glory)<br>वन + औषधि = वनौषधि &nbsp;(Forest + medicine = Forest herb)<br>जल + ओघ = जलौघ &nbsp;(Water + flood = Flood of water)<br>महा + ऐश्वर्य = महैश्वर्य &nbsp;(Great + glory = Great glory)" }
    ]
  },
  mid: []
};

export const questions = [
  {type:"mcq",question:"\"वृद्धिरेचि\" means:",options:["Two similar vowels fuse into a long vowel","अ/आ upgrades ए/ऐ or ओ/औ into a vṛddhi vowel — ऐ or औ","अ/आ combines with इ or उ to form ए or ओ","Vowels disappear before consonants"],answer:"अ/आ upgrades ए/ऐ or ओ/औ into a vṛddhi vowel — ऐ or औ",explanation:"वृद्धि = 'growth'; एचि = before ec vowels (ए, ओ, ऐ, औ). When अ/आ precedes these vowels, the pair rises to ऐ or औ — the 'grown' forms."},
  {type:"mcq",question:"अ + ए = ?",options:["ऐ","ओ","ए","औ"],answer:"ऐ",explanation:"अ + ए → ऐ by वृद्धि सन्धि. Example: एक (अ) + एक (ए) = एकैक. The boundary अ+ए rises to ऐ."},
  {type:"mcq",question:"एक + एक = ?",options:["एकेक","एकएक","एकोक","एकैक"],answer:"एकैक",explanation:"एक ends in अ; the second एक begins with ए. अ + ए → ऐ: the boundary rises to ऐ, giving एकैक (one by one)."},
  {type:"mcq",question:"अ + ओ = ?",options:["ओ","ऐ","औ","ए"],answer:"औ",explanation:"अ + ओ → औ by वृद्धि सन्धि. Example: महा (आ) + ओषधि (ओ) → आ+ओ → औ → महौषधि."},
  {type:"mcq",question:"महा + ओषधि = ?",options:["महेषधि","महाओषधि","महौषधि","महोषधि"],answer:"महौषधि",explanation:"महा ends in आ; ओषधि begins with ओ. आ + ओ → औ: the boundary rises to औ, giving महौषधि (great medicine)."},
  {type:"fill",question:"Apply वृद्धि सन्धि: देव + ऐश्वर्य = ___",sentenceParts:["देव + ऐश्वर्य = ",""],answer:"देवैश्वर्य",answerRoman:"devaiShvarya",translation:"God + glory = Divine glory",explanation:"देव ends in अ; ऐश्वर्य begins with ऐ. अ + ऐ → ऐ: the boundary rises to ऐ, giving देवैश्वर्य."},
  {type:"fill",question:"Apply वृद्धि सन्धि: जल + ओघ = ___",sentenceParts:["जल + ओघ = ",""],answer:"जलौघ",answerRoman:"jalaugha",translation:"Water + flood = Flood of water",explanation:"जल ends in अ; ओघ begins with ओ. अ + ओ → औ: the boundary rises to औ, giving जलौघ."},
  {type:"match",question:"Match each combination to its sandhi result",pairs:[{left:"एक + एक",right:"एकैक"},{left:"महा + ओषधि",right:"महौषधि"},{left:"देव + ऐश्वर्य",right:"देवैश्वर्य"},{left:"जल + ओघ",right:"जलौघ"}],explanation:"अ+ए→ऐ (एकैक), आ+ओ→औ (महौषधि), अ+ऐ→ऐ (देवैश्वर्य), अ+ओ→औ (जलौघ) — both vṛddhi rules in action."}
];
