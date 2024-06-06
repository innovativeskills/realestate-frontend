export const errorObjectValueToArray = (obj) => {
  let result = [];
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const element = obj[key];
      result.push(element[0]);
    }
  }
  return result;
};
export const toTitleCase = (str) => {
  // Trim extra spaces and split the string into words
  const words = str.trim().split(/\s+/);

  // Capitalize the first letter of each word
  const titleCasedWords = words.map((word) => {
    if (word.length === 0) return '';
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  });

  // Join the words back into a single string
  return titleCasedWords.join(' ');
};
