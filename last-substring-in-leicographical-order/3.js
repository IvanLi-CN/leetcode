const fs = require('fs');
const MIN_CHAR = String.fromCodePoint(0);
/**
 * @param {string} s
 * @return {string}
 */
var lastSubstring = function (s) {
  if (s.length === 0) {
    return '';
  }
  const chars = Array.from(s);
  let lastLimit = String.fromCharCode(127);
  let lastRangeArray = [];
  do {
    const result = findRangeArray(lastLimit, lastRangeArray, chars);
    lastRangeArray = result[0];
    console.log(!!result[1], result[1], lastRangeArray.map(([start, end]) => [start, end, chars.slice(start, end).join('')]));
    lastLimit = result[1];
  } while (lastLimit);



  return chars.slice(lastRangeArray[0][0], lastRangeArray[0][1]).join('');
};

/**
 *
 * @param {number} limitChar
 * @param {[number, number][]} prevLevelRangeArray
 * @param { [string] }chars
 * @returns {[]}
 */
function findRangeArray(limitChar, prevLevelRangeArray, chars) {
  const startPos = prevLevelRangeArray[0] ? prevLevelRangeArray[0][1] + 1 : 0;
  const isAllowPush = prevLevelRangeArray.length === 0;
  let maxChar = '';
  let maxRangeArr = prevLevelRangeArray;
  let maxRangeLength = 0;
  console.log('START ROUND', startPos, isAllowPush, maxRangeArr);
  for (let i = startPos; i < chars.length; i++) {
    const char = chars[i];
    if (limitChar <= char) {
      continue;
    }
    console.log(i, maxChar, char);
    if (maxChar < char) {
      maxChar = char;
      maxRangeLength = 1;
      if (isAllowPush) {
        maxRangeArr = [[i, i + 1]];
        console.log('NEW MAX', maxChar, maxRangeArr);
      }
    } else if (maxChar === char) {
      const lastRange = maxRangeArr[maxRangeArr.length - 1];
      if (lastRange[1] === i) {
        lastRange[1] = i + 1;
        const currRangeLength = lastRange[1] - lastRange[0];
        if (currRangeLength > maxRangeLength) {
          maxRangeLength = currRangeLength;
        }
        console.log('CONCAT', lastRange, chars.slice(...lastRange).join(''));
      } else {
        maxRangeLength = 0;
        if (isAllowPush) {
          maxRangeArr.push([i, i + 1]);
          console.log('ADD', maxChar, maxRangeArr);
        }
      }
    }
  }
  let rangeArr = [];
  for (let i = 0; i < maxRangeArr.length; i++) {
    const range = maxRangeArr[i];
    if (maxRangeLength <= range[1] - range[0]) {
      rangeArr.push(range);
    }
  }
  return [rangeArr, maxChar];
}
// console.log(lastSubstring('aaabbbccc'));
// console.log(lastSubstring('zzzazzz'));
console.log(lastSubstring(fs.readFileSync('i1.txt').toString()));
