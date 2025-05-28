import assert from "../../../Tools/assert.mjs";

// /**
//  * @param {number[]} digits
//  * @return {number[]}
//  */

var plusOne = (digits) => {
    let i = digits.length - 1
    while(i > -1){
        if(digits[i] < 9){
            digits[i]++
            return digits
        }else{
            digits[i] = 0
        }
        i--
    }
    digits.unshift(1)
    return digits
}

plusOne([9,9])
// var plusOne = function ({ digits }) {
//     const step = ({ state }) => {
//         switch (state.ip) {
//             case "INIT":
//                 state.pointer = state.digits.length - 1
//                 state.ip = "CHECK OVERFLOW"
//                 break;
//             case "CHECK OVERFLOW":
//                 if ((state.digits[state.pointer] + 1) > 9) {
//                     state.ip = "CHECK PREVIOUS RANK"
//                 } else {
//                     state.digits[state.pointer]++
//                     state.ip = "LEAVE"
//                 }
//                 break;
//             case "CHECK PREVIOUS RANK":
//                 if (state.digits[state.pointer - 1] == undefined) {
//                     state.digits.shift()
//                     state.digits = [1, 0, ...state.digits]
//                     state.ip = "LEAVE"
//                 } else {
//                     state.digits[state.pointer] = 0
//                     state.ip = "MOVE POINTER TO NEXT RANK"
//                 }
//                 break;
//             case "MOVE POINTER TO NEXT RANK":
//                 state.pointer--
//                 state.ip = "CHECK OVERFLOW"
//                 break;
//             default:
//                 break;
//         }
//         return state
//     }

//     let state = {
//         ip: "INIT",
//         pointer: undefined,
//         digits: digits,
//     }
  
//     while (state.ip != "LEAVE") {
//         state = step({ state: state })
//         console.log(state)
//     }

//     return state.digits
// };

// // const s1 = step({
// //     state: {
// //         ip: "INIT",
// //         pointer: undefined,
// //         digits: [1, 2, 3],
// //     }
// // })
// // console.log("S1: ", s1)
// // const s2 = step({state:s1})
// // console.log("S2: ", s2)

// // const s1 = step({
// //     state: {
// //         ip: "INIT",
// //         pointer: undefined,
// //         digits: [4, 3, 2, 1],
// //     }
// // })
// // console.log("S1: ", s1)
// // const s2 = step({state:s1})
// // console.log("S2: ", s2)

// // const s1 = step({
// //     state: {
// //         ip: "INIT",
// //         pointer: undefined,
// //         digits: [9],
// //     }
// // })
// // console.log("S1: ", s1)
// // const s2 = step({ state: s1 })
// // console.log("S2: ", s2)
// // const s3 = step({ state: s2 })
// // console.log("S3: ", s3)

// const s1 = step({
//     state: {
//         ip: "INIT",
//         pointer: undefined,
//         digits: [9, 9],
//     }
// })
// // console.log("S1: ", s1)
// // const s2 = step({ state: s1 })
// // console.log("S2: ", s2)
// // const s3 = step({ state: s2 })
// // console.log("S3: ", s3)
// // const s4 = step({ state: s3 })
// // console.log("S4: ", s2)
// // const s5 = step({ state: s4 })
// // console.log("S5: ", s5)
// // const s6 = step({ state: s5 })
// // console.log("S6: ", s6)

// let state = {
//     ip: "INIT",
//     pointer: undefined,
//     digits: [9, 9, 9, 9],
// }
// while (state.ip != "LEAVE") {
//     state = step({ state: state })
//     console.log(state)
// }




// )

// console.log(
//     assert(plusOne),
//     {digits:[1,2,3]},
//     [1,2,4]
// )