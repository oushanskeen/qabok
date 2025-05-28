/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {

    if (nums.length == 1) {
        return nums
    }

    let p1 = 0
    let p2 = 0

    while (nums[p1] != 0 && nums[p1] != undefined) {
        p1++
    }
    p2 = p1 + 1

    while (p2 < nums.length) {
        if (nums[p2] != 0) {
            nums[p1] = nums[p2]
            nums[p2] = 0
            p1++
        }
        p2++
    }

    return nums

};

console.log(moveZeroes([0, 1, 0, 3, 7, 0, 0, 12]))
console.log(moveZeroes([1]))
console.log(moveZeroes([2, 1]))

console.log(moveZeroes([1, 0, 1]))

console.log(moveZeroes([1, 0]))
console.log(moveZeroes([0, 1]))

// Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.

// Note that you must do this in -place without making a copy of the array.



//     Example 1:

// Input: nums = [0, 1, 0, 3, 12]
// Output: [1, 3, 12, 0, 0]

// Example 2:

// Input: nums = [0]
// Output: [0]



// Constraints:

// 1 <= nums.length <= 104
//     - 231 <= nums[i] <= 231 - 1
