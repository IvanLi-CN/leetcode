/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
  const totalLength = nums1.length + nums2.length;
  const leftLength = Math.ceil((totalLength - 1) / 2);
  const m1Pos = Math.ceil((totalLength - 1) / 2);
  const m2Pos = Math.floor((totalLength - 1) / 2);
  if (nums1.length === 0) {
    if (m1Pos === m2Pos) {
      return nums2[m1Pos];
    } else {
      return (nums2[m1Pos] + nums2[m2Pos]) / 2;
    }
  }
  if (nums2.length === 0) {
    if (m1Pos === m2Pos) {
      return nums1[m1Pos];
    } else {
      return (nums1[m1Pos] + nums1[m2Pos]) / 2;
    }
  }
  let s1 = 0;
  let e1 = getEndPos(nums1, leftLength);
  let e2;
  while (true) {
    const t1 = (e1 - s1) / 2 + s1;
    const c1 = Math.ceil(t1);
    e2 = leftLength - c1 - 1;
    const c1l = nums1[c1] || Number.MIN_VALUE;
    const c1r = nums1[c1 + 1] || Number.MAX_SAFE_INTEGER;
    const e2l = nums2[e2] || Number.MIN_VALUE;
    const e2r = nums2[e2 + 1] || Number.MAX_SAFE_INTEGER;
    if (s1 > e1) {
      let cortNums;
      if (e2r > c1l) {
        sortNums = [nums1[c1-1], nums1[c1], nums2[e2 - 1], nums2[e2]].sort((a, b) => b - a);
      } else {
        sortNums = [nums2[e2 + 1], nums2[e2]].sort((a, b) => b - a);
      }
      if (m1Pos === m2Pos) {
        return sortNums[0];
      } else {
        return (sortNums[0] + sortNums[1]) / 2;
      }
    }
    if (c1 >= nums2.length) {
      [nums1, nums2] = [nums2, nums1];
      s1 = 0;
      e1 = getEndPos(nums1, leftLength);
      continue;
    }

    if (c1l <= e2l && e2l <= c1r) {
      const sortNums = [nums1[c1-1], nums1[c1], nums2[e2 - 1], nums2[e2]].sort((a, b) => b - a);
      if (m1Pos === m2Pos) {
        return sortNums[0];
      } else {
        return (sortNums[0] + sortNums[1]) / 2;
      }
    }

    if (e2l < c1l && c1l < e2r) {
      const sortNums = [nums1[c1-1], nums1[c1], nums2[e2 - 1], nums2[e2]].sort((a, b) => b - a);
      if (m1Pos === m2Pos) {
        return sortNums[0];
      } else {
        return (sortNums[0] + sortNums[1]) / 2;
      }
    }
    if (c1l >= e2l) {
      e1 = c1 - 1;
    }
    if (c1r <= e2l) {
      s1 = c1 + 1;
    }
  }

};

function getEndPos(nums, target) {
  return nums.length > target ? target : nums.length - 1;
}

const a = new Array(Math.round(Math.random() * 99999) + 1).fill(0).map(() => Math.round(Math.random() * 10000)).sort((a, b) => a - b);
const b = new Array(Math.round(Math.random() * 99999) + 1).fill(0).map(() => Math.round(Math.random() * 10000)).sort((a, b) => a - b);
const len = a.length + b.length;
const arr = [...a, ...b].sort((a, b) => a - b);
// console.log(arr);
// console.log(a, a.length);
// console.log(b, b.length);
console.log('结果', findMedianSortedArrays([], [1]));
// console.log('预计', (arr[Math.floor((len - 1) / 2)] + arr[Math.ceil((len - 1) / 2)]) / 2);
