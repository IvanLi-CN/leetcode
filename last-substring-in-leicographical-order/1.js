
const fs = require('fs');
/**
 * @param {string} s
 * @return {string}
 */
 var lastSubstring = function (s) {
    if (s.length === 0) {
        return '';
    }
    let maxChar = s[0];
    let maxCharPosArr = [];
    const chars = Array.from(s);
    chars.forEach((char, index) => {
        if (maxChar < char) {
            maxCharPosArr = [index];
            maxChar = char;
        } else if (maxChar === char) {
            maxCharPosArr.push(index);
        }
    });

    let isDone = false;
    for (let offset = 1; !isDone; offset++) {
        if (maxCharPosArr.length === 1) {
            isDone = true;
        }
        let currMaxIndex = 0;
        let currMaxChar = chars[maxCharPosArr[currMaxIndex] + offset] || 0;
        let samePosArr = [];
        let removePosArr = [];
        // console.log(currMaxChar, maxCharPosArr);
        if (!currMaxChar) {
            break;
        }
        for (let i = 1; i < maxCharPosArr.length; i++) {
            const currChar = chars[maxCharPosArr[i] + offset] || 0;
            // console.log({i, offset, currChar, currMaxChar});
            if (currMaxChar < currChar) {
                // console.log('CASE A: ', 'keep:', offset + i, currChar, currMaxIndex, currMaxChar);
                currMaxChar = currChar;
                removePosArr.push(currMaxIndex, ...samePosArr);
                currMaxIndex = i;
            } else if (currMaxChar > currChar) {
                // console.log('CASE B: ', offset + i, currChar, 'keep:', currMaxIndex, currMaxChar);
                removePosArr.push(i);
            } else if (currMaxChar === currChar) {
                samePosArr.push(i);
                // console.log('CASE C: ', offset + i, currMaxIndex, currMaxChar, samePosArr);
            }
        }
        maxCharPosArr = maxCharPosArr.filter((_, index) => !removePosArr.includes(index));
        // console.log({ removePosArr, maxCharPosArr }, removePosArr.map(pos => chars[maxCharPosArr[pos]]), maxCharPosArr.map(pos => chars[pos]));
    }
    return chars.slice(maxCharPosArr[0]).join('');
};
console.log(lastSubstring(fs.readFileSync('ia.txt').toString()));
