// Sort array (by name, not article)
const bands = ["The Coders", "A Abords", "The Brovers"];
const strip = name => name.replace(/^(a |the |an)/i, "").trim(""); // remove "a" "the" "an"
const sorted = bands.sort((a,b) => strip(a) > strip(b) ? 1 : -1); // sorted array
