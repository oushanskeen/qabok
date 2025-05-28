/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function (nums1, nums2) {
    if (nums1.length > nums2.length) return intersect(nums2, nums1);

    const countMap = {};
    for (let num of nums1) {
        countMap[num] = (countMap[num] || 0) + 1;
    }

    const result = [];
    for (let num of nums2) {
        if (countMap[num] > 0) {
            result.push(num);
            countMap[num]--;
        }
    }

    return result;
};
console.log(intersect([4, 9, 5], [9, 4, 9, 8, 4]))