/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[][]}
 */
var findDifference = function (nums1, nums2) {
    const setOne = new Set(nums1)
    const setTwo = new Set(nums2)

    const setOneDiff = [...setOne].filter(x => !setTwo.has(x))
    const setTwoDiff = [...setTwo].filter(x => !setOne.has(x))

    return [setOneDiff,setTwoDiff]
};
// console.log(findDifference([1, 2, 3, 3], [1, 1, 2, 2]))
// console.log(findDifference([1, 2, 3], [2, 4, 6]))
console.log(findDifference(
    // [1, 2, 3], 
    // [-73],
    [-80, -15, -81, -28, -61, 63, 14, -45, -35, -10],
    [-1, -40, -44, 41, 10, -43, 69, 10, 2]
    // [-66, 9, -54, -32, 94, 11]
    // [2, 4, 6]
)
)