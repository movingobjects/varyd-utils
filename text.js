
import * as random from './random';
import * as arrays from './arrays';

export const QUOTE_L    = '\u201C';
export const QUOTE_R    = '\u201D';


// String functions

export function beginsWith(s, test) {
  return (s.substr(0, test.length) === test);
}
export function endsWith(s, test) {
  return (s.substr(-test.length) === test);
}

export function toTitleCase(str) {
  return str.replace(/\b[a-z]/g, char => char.toUpperCase());
}
export function toCamelCase(str) {
  let s =
    str &&
    str
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      .map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
      .join('');
  return s.slice(0, 1).toLowerCase() + s.slice(1);
};
export function toKebabCase(str) {
  return
    str &&
    str
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      .map(x => x.toLowerCase())
      .join('-');
};
export function toSnakeCase(str) {
  return
    str &&
    str
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      .map(x => x.toLowerCase())
      .join('_');
};

export function words(str) {
  return str.split(/[^a-zA-Z-]+/).filter(Boolean);
}

export function trunc(str, count, addElipsis = false) {
  if (str.length <= count) {
    return str;
  } else if (addElipsis) {
    return str.slice(0, (count > 3) ? count - 3 : count) + '...';
  } else {
    return str.slice(0, count);
  }
}


// Text generation

export function getLatin(wordCount = 1, punctuate = false) {

  const CHANCE_PERIOD = 0.1,
        CHANCE_COMMA  = 0.15;

  let sourceWords = [
    'a', 'ac', 'accumsan', 'ad', 'adipiscing', 'aenean', 'aliquam', 'amet', 'ante',
    'aptent', 'arcu', 'at', 'auctor', 'augue', 'bibendum', 'blandit', 'class',
    'commodo', 'congue', 'consectetur', 'consequat', 'conubia', 'convallis', 'cras',
    'curabitur', 'cursus', 'dapibus', 'diam', 'dictum', 'dignissim', 'dolor',
    'donec', 'dui', 'duis', 'egestas', 'eget', 'eleifend', 'elementum', 'elit',
    'enim', 'erat', 'eros', 'est', 'et', 'etiam', 'eu', 'euismod', 'fames',
    'faucibus', 'felis', 'fermentum', 'feugiat', 'fringilla', 'fusce', 'gravida',
    'habitant', 'hendrerit', 'himenaeos', 'iaculis', 'id', 'imperdiet', 'in',
    'inceptos', 'integer', 'interdum', 'ipsum', 'justo', 'lacinia', 'lacus',
    'laoreet', 'lectus', 'leo', 'libero', 'ligula', 'litora', 'lobortis', 'lorem',
    'luctus', 'maecenas', 'magna', 'malesuada', 'massa', 'mattis', 'mauris',
    'metus', 'mi', 'mollis', 'morbi', 'nam', 'nec', 'neque', 'netus', 'nibh',
    'nisi', 'nisl', 'non', 'nostra', 'nulla', 'nullam', 'nunc', 'odio', 'orci',
    'ornare', 'pellentesque', 'per', 'pharetra', 'phasellus', 'placerat',
    'porttitor', 'posuere', 'praesent', 'pretium', 'proin', 'pulvinar', 'purus',
    'quam', 'quis', 'quisque', 'rhoncus', 'risus', 'rutrum', 'sagittis', 'sapien',
    'scelerisque', 'sed', 'sem', 'semper', 'senectus', 'sit', 'sociosqu',
    'suscipit', 'suspendisse', 'taciti', 'tellus', 'tempor', 'tempus', 'tincidunt',
    'torquent', 'tortor', 'tristique', 'turpis', 'ullamcorper', 'ultrices',
    'ultricies', 'urna', 'ut', 'varius', 'vehicula', 'vel', 'velit', 'venenatis',
    'vitae', 'vivamus', 'viverra', 'volutpat', 'vulputate'
  ];

  while(sourceWords.length < wordCount) {
    sourceWords = sourceWords.concat(sourceWords);
  }

  let isNewSentence = true,
      words         = random.items(sourceWords, wordCount),
      result        = '';

  for (let i = 0; i < words.length; i++) {

    let isLastWord  = (i === arrays.lastIndex(words)),
        nextWord    = words[i];

    if (isNewSentence) {
      result += nextWord.charAt(0).toUpperCase() + nextWord.substr(1);
      isNewSentence = false;

    } else {
      result += words[i];

    }

    if (punctuate) {

      if (isLastWord) {
        result += '.';

      } else if (random.boolean(CHANCE_PERIOD)) {
        result += '. ';
        isNewSentence = true;

      } else if (random.boolean(CHANCE_COMMA)) {
        result += ', ';

      } else {
        result += ' ';
      }

    } else if (!isLastWord) {
      result += ' ';
    }

  }

  return result;

}

export function getFakeWord(len) {

  // Adapted from: http://ozh.in/vh

  const CONSONANTS_INIT = [
    'b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't',
    'v', 'w', 'x', 'dr', 'gl', 'gr', 'ch', 'ph', 'ps', 'sh', 'st', 'th', 'wh'
  ];

  const CONSONANTS = [
    'b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't',
    'v', 'w', 'x', 'pt', 'gl', 'gr', 'ch', 'ph', 'ps', 'sh', 'st', 'th', 'wh',
    'ck', 'cm', 'fr', 'ds', 'ft', 'gh', 'gn', 'kr', 'ks', 'ls', 'lt', 'lr',
    'mp', 'mt', 'ms', 'ng', 'ns', 'rd', 'rg', 'rs', 'rt', 'ss', 'ts', 'tch'
  ];

  const VOWELS = [
    'a', 'e', 'i', 'o', 'u', 'y', 'ee', 'ea', 'oa', 'oo', 'ou'
  ];

  let word        = '',
      prevIsVowel = random.boolean();

  while (word.length < len) {
    if (prevIsVowel) {
      word += (word.length === 0) ? random.item(CONSONANTS_INIT) : random.item(CONSONANTS);
    } else {
      word += random.item(VOWELS);
    }
    prevIsVowel = !prevIsVowel;
  }

  return word.slice(0, len);

}
