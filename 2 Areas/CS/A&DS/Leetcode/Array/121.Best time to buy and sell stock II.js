/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {

    // let currentMin = Infinity
    let profit = 0
    let pointer = 0
    // let p2 = 0
    let nextUp = undefined
    let nextDown = undefined
    let hold = false
    let buy = false
    let sell = false
    let ttl = false
    let buyPrice = 0

    while (pointer < prices.length) {
        nextUp = prices[pointer + 1] > prices[pointer]
        nextDown = prices[pointer + 1] < prices[pointer]
        buy = !hold && nextUp
        buyPrice = buy ? prices[pointer] : 
        sell = hold && nextDown
        hold = (hold || buy) && nextUp
        skip = !hold && nextDown
        pointer = pointer + 1
        profit = sell ? profit + (prices[pointer] - buyPrice)
        // ttl =  
        // currentMin = Math.min(currentMin, prices[pointer])
        // maxProfit = Math.max(maxProfit, prices[pointer] - currentMin)
        // pointer = pointer + 1
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
