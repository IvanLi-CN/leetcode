/**
 * @param {string} s
 * @return {string}
 */
var removeDuplicateLetters = function (s) {
    const chars = Array.from(s);
    const length = chars.length;

    if (length === 0) {
        return '';
    }
    const singleCharMap = new Map();
    chars.forEach((char, index) => {
        if (!singleCharMap.has(char)) {
            singleCharMap.set(char, [index]);
        } else {
            singleCharMap.get(char).push(index)
        }
    })
    const sortedSingleChars = Array.from(singleCharMap.keys())
        .sort()
        .map(char => ({
            char: char,
            arrPos: singleCharMap.get(char),
        }));

    const unmatchedChars = sortedSingleChars.slice();
    let minPos = 0;
    let unmatchedCharPos = 0;
    const resultChars = new Array();

    while (unmatchedChars.length > 0) {
        const currCharPos = unmatchedChars[unmatchedCharPos].arrPos.find(pos => pos >= minPos);
        const isExsitsSubStr = unmatchedChars.every(single => single.arrPos.some(pos => pos >= currCharPos));
        if (isExsitsSubStr) {
            const currChar = unmatchedChars.splice(unmatchedCharPos, 1)[0];
            resultChars.push(currChar.char);
            minPos = currCharPos;
            unmatchedCharPos = 0;
        } else {
            unmatchedCharPos++;
        }
    }

    return resultChars.join('');
};


// console.log(removeDuplicateLetters('abcdefg'));
// console.log(removeDuplicateLetters('gfedcba'));
// console.log(removeDuplicateLetters('afcdebg'));
// console.log(removeDuplicateLetters('cabc'));

/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
    for (let i = 1; i < nums.length; i++) {
        nums[0] ^= nums[i]
        console.log(nums[0]);
    }
    return nums[0];
};

// console.log(singleNumber([2, 2, 1]));

var searchMatrix = function (matrix, target) {
    let maxM = matrix.length;
    if (maxM === 0) {
        return false;
    }
    let maxN = matrix[0].length;
    let minM = 0;
    let minN = 0;
    let centerM;
    let centerN;

    let isMDone = false;
    let isNDone = false;

    while (!isMDone && !isNDone) {
        if (maxM !== minM) {
            centerM = Math.floor((maxM + minM) / 2);
        } else {
            isMDone = true;
        }
        if (maxN !== minN) {
            centerN = Math.floor((maxN + minN) / 2);
        } else {
            isNDone = true;
        }
        console.log(centerM, centerN, matrix[centerM][centerN], target);
        if (matrix[centerM][centerN] > target) {
            maxM = centerM;
            maxN = centerN;
            console.log({ maxM, maxN }, { minM, minN });
        } else if (matrix[centerM][centerN] < target) {
            minM = centerM + 1;
            minN = centerN + 1;
            console.log({ minM, minN }, { maxM, maxN });
        } else if (matrix[centerM][centerN] === target) {
            return true;
        }
    }
    if (maxM >= matrix.length || maxN >= matrix[0].length) {
        return false;
    }
    if (matrix[maxM][maxN] > target) {
        for (let m = 0; m < maxM; m++) {
            if (matrix[m][maxN] === target) {
                return true;
            }
        }
        for (let n = 0; n < maxN; n++) {
            if (matrix[maxM][n] === target) {
                return true;
            }
        }
    } else {
        for (let m = 0; m < matrix.length; m++) {
            for (let n = 0; n < matrix[0].length; n++) {
                if (matrix[maxM][n] === target) {
                    return true;
                }
            }
        }
        
    }
    return false;


};

console.log(searchMatrix([
    [1, 2, 3, 4, 5],
     [6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15],
       [16, 17, 18, 19, 20], 
       [21, 22, 23, 24, 25]],
15));