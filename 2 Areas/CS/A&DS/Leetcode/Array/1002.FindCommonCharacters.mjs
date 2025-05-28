/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[][]}
 */

// My solution
var commonChars = function (words) {

    
    return words[0]
        .split("")
        .reduce((acc, cur) => {
            if (!acc[cur]) {
                acc[cur] = 1
            } else {
                acc[cur] = acc[cur] + 1
            }
            return acc
        }, {})
    // words.reduce((acc,cur) => {},{})

    // const acc = []
    // const wordDict = {}
    // for (let char of words[0]) {
    //     wordDict[char] = (wordDict[char] || 0) + 1
    // }
    // for (let i = 1; i < words.length; i++) {

    //     const word = words[i]
    //     const charFreq = {}
    //     for (let char of words[i]) {
    //         charFreq[char] = (charFreq[char] || 0) + 1
    //     }

    //     for (let char in wordDict) {
    //         const x = wordDict[char]
    //         const y = charFreq[char] || 0
    //         wordDict[char] = Math.min(
    //             x, y
    //         )
    //     }
    // }
    // for (let char in wordDict) {
    //     for (let i = 0; i < wordDict[char]; i++) {
    //         acc.push(char)
    //     }
    // }
    // return acc
};

// Simple solution
// let res = [];
// for (let wo of words[0]) {
//     if (words.every((word) => word.includes(wo))) {
//         res.push(wo)
//         words = words.map((word) => word.replace(wo, ""))
//     }
// }
// return res

console.log(commonChars(["cool", "lock", "cook"]))