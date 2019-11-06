/**
 * @param {string} s
 * @return {string}
 */
var lastSubstring = function(s) {
  let ans = ""
  for(let i=0;i<s.length;i++){
    if(s.substr(i)>ans){
      ans = s.substr(i);
    }
  }
  return ans;
};

console.time('START');
// console.log(lastSubstring("zrziy"));
// console.log(lastSubstring(fs.readFileSync('ia.txt').toString()));
// lastSubstring(fs.readFileSync('i1.txt').toString());
console.log(lastSubstring((new Array(100000)).fill('c').concat('bb').join('')));
// console.log(lastSubstring('zzzazzzz'));
// console.log(lastSubstring('leetcode'));

console.timeEnd('START');
