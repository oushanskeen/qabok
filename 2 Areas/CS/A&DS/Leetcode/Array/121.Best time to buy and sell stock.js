/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {

    let currentMin = Infinity
    let maxProfit = 0
    let pointer = 0

    while (pointer < prices.length) {
        currentMin = Math.min(currentMin, prices[pointer])
        maxProfit = Math.max(maxProfit, prices[pointer] - currentMin)
        pointer = pointer + 1
    }

    return maxProfit

};

// console.log(
//     maxProfit([7, 1, 5, 3, 6, 4])
// )
console.log(
    maxProfit([7, 1, 5, 3, 6, 4, 0, 8, 4, 5])
)

// console.log(
//     maxProfit([7,6,4,3,1])
// )

// console.log(
//     maxProfit([1,2,3,4,5])
// )

// Input: prices = [7,1,5,3,6,4]
// Output: 5

// Input: prices = [7,6,4,3,1]
// Output: 0

// 1 <= prices.length <= 10^5
// 0 <= prices[i] <= 10^4
