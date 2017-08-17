
export const QUOTE_L    = "\u201C";
export const QUOTE_R    = "\u201D";

export function getLatin(wordCount = 1, punctuate = false) {

  const CHANCE_PERIOD = 0.1,
        CHANGE_COMMA  = 0.15;

  let sourceWords = [
    "a", "ac", "accumsan", "ad", "adipiscing", "aenean", "aliquam", "amet", "ante",
    "aptent", "arcu", "at", "auctor", "augue", "bibendum", "blandit", "class",
    "commodo", "congue", "consectetur", "consequat", "conubia", "convallis", "cras",
    "curabitur", "cursus", "dapibus", "diam", "dictum", "dignissim", "dolor",
    "donec", "dui", "duis", "egestas", "eget", "eleifend", "elementum", "elit",
    "enim", "erat", "eros", "est", "et", "etiam", "eu", "euismod", "fames",
    "faucibus", "felis", "fermentum", "feugiat", "fringilla", "fusce", "gravida",
    "habitant", "hendrerit", "himenaeos", "iaculis", "id", "imperdiet", "in",
    "inceptos", "integer", "interdum", "ipsum", "justo", "lacinia", "lacus",
    "laoreet", "lectus", "leo", "libero", "ligula", "litora", "lobortis", "lorem",
    "luctus", "maecenas", "magna", "malesuada", "massa", "mattis", "mauris",
    "metus", "mi", "mollis", "morbi", "nam", "nec", "neque", "netus", "nibh",
    "nisi", "nisl", "non", "nostra", "nulla", "nullam", "nunc", "odio", "orci",
    "ornare", "pellentesque", "per", "pharetra", "phasellus", "placerat",
    "porttitor", "posuere", "praesent", "pretium", "proin", "pulvinar", "purus",
    "quam", "quis", "quisque", "rhoncus", "risus", "rutrum", "sagittis", "sapien",
    "scelerisque", "sed", "sem", "semper", "senectus", "sit", "sociosqu",
    "suscipit", "suspendisse", "taciti", "tellus", "tempor", "tempus", "tincidunt",
    "torquent", "tortor", "tristique", "turpis", "ullamcorper", "ultrices",
    "ultricies", "urna", "ut", "varius", "vehicula", "vel", "velit", "venenatis",
    "vitae", "vivamus", "viverra", "volutpat", "vulputate"
  ];

  while(sourceWords.length < wordCount) {
    sourceWords = sourceWords.concat(sourceWords);
  }

  let isNewSentence = true,
      words         = Random.items(sourceWords, wordCount),
      result        = "";

  for (let i = 0; i < words.length; i++) {

    let isLastWord  = (i === Arrays.lastIndex(words)),
        nextWord    = words[i];

    if (isNewSentence) {
      result += nextWord.charAt(0).toUpperCase() + nextWord.substr(1);
      isNewSentence = false;

    } else {
      result += words[i];

    }

    if (punctuate) {

      if (isLastWord) {
        result += ".";

      } else if (Random.boolean(CHANCE_PERIOD)) {
        result += ". ";
        isNewSentence = true;

      } else if (Random.boolean(CHANCE_COMMA)) {
        result += ", ";

      } else {
        result += " ";
      }

    } else if (!isLastWord) {
      result += " ";
    }

  }

  return result;

}

export function trunc(s, charCount, addElipsis = false) {
  if (!s) return "";
  if (s.length <= charCount) {
    return s;
  } else {
    if (addElipsis) {
      return s.substr(0, charCount - 3) + "...";
    } else {
      return s.substr(0, charCount);
    }
  }
}

export function beginsWith(s, test) {
  return (s.substr(0, test.length) === test);
}

export function endsWith(s, test) {
  return (s.substr(-test.length) === test);
}
