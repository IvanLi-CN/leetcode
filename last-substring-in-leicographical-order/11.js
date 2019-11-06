const fs = require('fs');
/**
 * @param {string} s
 * @return {string}
 */
var lastSubstring = function (s) {
  if (s.length === 0) {
    return '';
  }
  let globalMaxChar = s[0];
  let maxCharPosArr = [0];
  const chars = s;
  for (let i = 1; i < chars.length; i++) {
    const char = chars[i];
    if (globalMaxChar < char) {
      maxCharPosArr = [i];
      globalMaxChar = char;
    } else if (globalMaxChar === char) {
      if (chars[i-1] !== globalMaxChar) {
        maxCharPosArr.push(i);
      }
    }
  }
  // console.log(maxCharPosArr);
  for (let offset = 1; maxCharPosArr.length > 1; offset++) {
    let currMaxIndex = 0;
    let currMaxCharPos = maxCharPosArr[currMaxIndex] + offset;
    let currMaxChar = chars[currMaxCharPos] || '';
    let prevMaxCharPos = currMaxCharPos;
    let samePosArr = [];
    let removePosArr = [];
    // console.log(currMaxChar, maxCharPosArr);
    if (!currMaxChar) {
      break;
    }
    for (let i = 1; i < maxCharPosArr.length; i++) {
      const currCharPos = maxCharPosArr[i] + offset;
      const currChar = chars[currCharPos] || '';
      // console.log({i, pos: maxCharPosArr[i], offset, currChar, currMaxChar});
      if (currMaxChar < currChar) {
        // console.log('CASE A: ', `C:${offset + i}:${currChar}\tM:${currMaxIndex}:${currMaxChar}`, [currMaxIndex, ...samePosArr].map(pos => maxCharPosArr[pos]));
        currMaxCharPos = currCharPos;
        currMaxChar = currChar;
        prevMaxCharPos = currMaxCharPos;
        removePosArr.push(currMaxIndex, ...samePosArr);
        currMaxIndex = i;
        samePosArr = [];
      } else if (currMaxChar > currChar) {
        // console.log('CASE B: ', `C:${offset + i}: ${currChar}\tM:${currMaxIndex}:${currMaxChar}`, [i].map(pos => maxCharPosArr[pos]));
        removePosArr.push(i);
      } else if (currMaxChar === currChar) {
        // console.warn(prevMaxCharPos, currMaxCharPos, maxCharPosArr[i], maxCharPosArr[i] + offset);
        if (prevMaxCharPos === maxCharPosArr[i]) {
          removePosArr.push(i);
          samePosArr = [];
          // console.log('CASE C: ', `${currMaxIndex + offset}: ${maxCharPosArr[i]}, ${currMaxChar}`, [i].map(pos => maxCharPosArr[pos]));
        } else {
          samePosArr.push(i);
          // console.log('CASE D: ', { currCharPos, prevMaxCharPos, currMaxIndex, currMaxChar}, 'same:', samePosArr.map(pos => maxCharPosArr[pos]));
        }
        prevMaxCharPos = currCharPos;
      }
    }

    // const tmp1 = maxCharPosArr;
    maxCharPosArr = maxCharPosArr.filter((_, index) => !removePosArr.includes(index));
    // console.log('ROUND RESULT', maxCharPosArr);
    // console.log({
    //   remove: removePosArr.map(pos => `${tmp1[pos]}:${chars[tmp1[pos]]}`),
    //   max: maxCharPosArr.map(pos => `${pos}-${chars.slice(pos).join('')}`),
    // });
  }
  return chars.slice(maxCharPosArr[0]);
};
console.time('START');
// console.log(lastSubstring("zrziy"));
console.log(lastSubstring((new Array(100000)).fill('c').concat('bb').join('')));

// console.log(lastSubstring(fs.readFileSync('ia.txt').toString()));
// lastSubstring(fs.readFileSync('i1.txt').toString());
// console.log(lastSubstring((new Array(1 << 1000 << 1000 << 100)).fill('a')));
// console.log(lastSubstring('zzzazzzz'));
// console.log(lastSubstring('leetcode'));

console.timeEnd('START');
