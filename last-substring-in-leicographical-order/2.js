/**
 * @param {string} s
 * @return {string}
 */
var lastSubstring = function (s) {
    if (s.length === 0) {
        return '';
    }
    const chars = Array.from(s);
    let maxChar = chars[0];
    let maxCharPosArr = [];
    chars.forEach((char, index) => {
        if (maxChar < char) {
            maxCharPosArr = [index];
            maxChar = char;
        } else if (maxChar === char) {
            maxCharPosArr.push(index);
        }
    });

    let maxPosIndex = 0;
    let maxBasePos = maxCharPosArr[maxPosIndex];
    for (let currMaxCharPosIndex = 1; currMaxCharPosIndex < maxCharPosArr.length; ) {
        const basePos = maxCharPosArr[currMaxCharPosIndex];
        const currStrLength = chars.length - basePos;
        const baseDiff = basePos - maxBasePos;
        let removingMaxCharPosIndex = null;
        console.log(maxCharPosArr, { maxBasePos, basePos, currStrLength });
        for (let offset = 1; offset < baseDiff; offset++) {
            const currPos = basePos + offset;
            const currChar = chars[currPos] || -1;
            const refChar = chars[maxBasePos + offset] || -1;
            console.log({basePos,offset, currPos, currChar, refChar});
            if (currChar > refChar) {
                removingMaxCharPosIndex = maxPosIndex;
                maxPosIndex = currMaxCharPosIndex - 1;
                maxBasePos = maxCharPosArr[maxPosIndex];
                break;
            } else if (currChar < refChar) {
                removingMaxCharPosIndex = currMaxCharPosIndex;
                break;
            }
        }
        if (removingMaxCharPosIndex === null) {
            removingMaxCharPosIndex = currMaxCharPosIndex;
        }

        console.log('REMOVE', removingMaxCharPosIndex, maxCharPosArr.length, { maxCharPosIndex: currMaxCharPosIndex, maxBasePos });
        maxCharPosArr.splice(removingMaxCharPosIndex, 1);

    }
    return chars.slice(maxCharPosArr[0]).join('');
};
const fs = require('fs');
console.log(lastSubstring("aaaaaaaabaaaaaaaaacaaaaaaaaaaacaaaaaaaaaaaaaaacaaaaaaaaaaaaaaaaaaa"));
