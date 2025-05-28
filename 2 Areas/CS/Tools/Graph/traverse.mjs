import assert from "../assert.mjs";

// console.log(
//     assert(({x,y}) => x + y, {x:1,y:2},3)
// )

const traverse = ({ graph }) => {

    const poolOfRoutes = Object.keys(graph)
    return poolOfRoutes
}

const graph1 = {
    a: ["b1", "b2"],
    b1: [],
    b2: [],

}


// if we leave the node that has neither kids nor outputs other to the one we used, DELETE the link
// 

// graph: graph1,
// curStack: ["a"],
// paths:[],
// visited:[]
// isVisited = false
// hasKids = true
// hasInputLinks = false
// nextMsg = "ADD THIS TO VISITED & ADD KID TO STACK"
//  -> 
//
// graph: graph1,
// curStack: ["a","b1"],
// paths:[],
// visited:["a","b1"]
// isVisited = false
// hasKids = true
// hasInputLinks = true
// nextMsg = "ADD THIS TO VISITED & ADD KID TO STACK"
// ->
//
// graph: graph1,
// curStack: ["a","b1","c"],
// paths:[],
// visited:["a","b1","c"]
// isVisited = false
// hasKids = false
// isStackEmpty = false
// nextMsg = "
//  ADD THIS TO VISITED 
//  & ADD STACK TO PATH 
//  & REMOVE THIS FROM STACK 
//  & REMOVE THIS FROM PARENTS LIST"
// -> 
//
// graph: graph1,
// curStack: ["a","b1"],
// paths:["a.b1.c"],
// visited:["a","b1","c"]
// isVisited = true
// hasKids = false
// isStackEmpty = false
// nextMsg = "
//  REMOVE THIS FROM STACK 
//  & REMOVE THIS FROM PARENTS LIST"
// -> 
//
// graph: graph1,
// curStack: ["a"],
// paths:["a.b1.c"]
// isVisited = true
// visited:["a","b1","c"]
// hasKids = true
// nextMsg = "moveDownTheStack & delete kid 'b1'"
// -> 
// graph: graph1,
// curStack: ["a"],
// paths:["a.b1.c"],
// cur = "a"
// isVisited = true
// visited:["a","b1","c"]
// hasKids = true
// -> 
// graph: graph1,
// curStack: ["a","b2"],
// paths:["a.b1.c"],
// cur = "b2"
// isVisited = true
// visited:["a","b1","c"]
// hasKids = true
// -> 

const tsStep = ({ graph, curStack, msg, paths, lastKid }) => {
    let curStack1 = undefined
    let msg1 = undefined
    let currentItem = undefined
    let paths1 = undefined
    let graph1 = undefined
    let lastKid1 = undefined
    switch (msg) {
        case "ADD FIRST KEY TO STACK":
            curStack1 = [Object.keys(graph)[0]]
            msg1 = "CHECK KIDS";
            return { graph, curStack: curStack1, paths, msg: msg1 }
            break;
        case "CHECK KIDS":
            currentItem = curStack.slice(-1)[0]
            if (graph[currentItem].length > 0) {
                msg1 = "ADD KID TO STACK";
                return { graph, curStack, paths, msg: msg1 }
            } else {
                msg1 = "IS STACK EMPTY?";
                curStack.pop()
                curStack1 = curStack
                return { graph, curStack: curStack1, paths, msg: msg1 }
            }
            break;
        case "IS STACK EMPTY?":
            if (curStack.length > 0) {
                msg1 = "ADD STACK TO PATHS";
                return { graph, curStack, paths, msg: msg1 }
            } else {
                msg1 = "LEAVE";
                return { graph, curStack, paths, msg: msg1 }
            }
            break;
        case "ADD STACK TO PATHS":
            paths1 = [...paths, curStack.join(".")]
            msg1 = "SAVE KIDS NAME";
            return { graph, curStack, paths: paths1, msg: msg1 }
            break;
        case "SAVE KIDS NAME":
            msg1 = "REMOVE CUR FROM STACK";
            return { graph, curStack, paths, msg: msg1, lastKid: curStack.slice(-1)[0] }
            break;
        case "ADD KID TO STACK":
            currentItem = curStack.slice(-1)[0]
            curStack1 = [...curStack, graph[currentItem][0]]
            msg1 = "CHECK KIDS";
            return { graph, curStack: curStack1, paths, msg: msg1 }
            break;
        case "REMOVE CUR FROM STACK":
            curStack.pop()
            curStack1 = [...curStack]
            msg1 = "REMOVE SAVED KID FROM PARENTS LIST"
            return { graph, curStack: curStack1, paths, msg: msg1, lastKid }
        case "REMOVE SAVED KID FROM PARENTS LIST":
            const newKidsListForParent = graph[curStack.slice(-1)[0]].filter(e => e != lastKid)
            graph1 = { ...graph, [[curStack.slice(-1)[0]]]: newKidsListForParent }
            msg1 = "CHECK KIDS"
            lastKid1 = ""
            return { graph: graph1, curStack, paths, msg: msg1, lastKid: lastKid1 }
            break;
        default:
            break
    }
}

console.log(
    assert(
        tsStep,
        {
            graph: {
                a: ["b1", "b2"],
                b1: [],
                b2: [],
            },
            curStack: [],
            paths: [],
            msg: "ADD FIRST KEY TO STACK"
        },
        { "graph": { "a": ["b1", "b2"], "b1": [], "b2": [] }, "curStack": ["a"], paths: [], "msg": "CHECK KIDS" }
    )
)
console.log(
    assert(
        tsStep,
        { "graph": { "a": ["b1", "b2"], "b1": [], "b2": [] }, "curStack": ["a"], paths: [], "msg": "CHECK KIDS" },
        { "graph": { "a": ["b1", "b2"], "b1": [], "b2": [] }, "curStack": ["a"], paths: [], "msg": "ADD KID TO STACK" }
    )
)
console.log(
    assert(
        tsStep,
        { "graph": { "a": ["b1", "b2"], "b1": [], "b2": [] }, "curStack": ["a"], paths: [], "msg": "ADD KID TO STACK" },
        { "graph": { "a": ["b1", "b2"], "b1": [], "b2": [] }, "curStack": ["a", "b1"], paths: [], "msg": "CHECK KIDS" }
    )
)
console.log(
    assert(
        tsStep,
        { "graph": { "a": ["b1", "b2"], "b1": [], "b2": [] }, "curStack": ["a", "b1"], paths: [], "msg": "CHECK KIDS" },
        { "graph": { "a": ["b1", "b2"], "b1": [], "b2": [] }, "curStack": ["a", "b1"], paths: [], "msg": "IS STACK EMPTY?" }
    )
)
console.log(
    assert(
        tsStep,
        { "graph": { "a": ["b1", "b2"], "b1": [], "b2": [] }, "curStack": ["a", "b1"], paths: [], "msg": "IS STACK EMPTY?" },
        { "graph": { "a": ["b1", "b2"], "b1": [], "b2": [] }, "curStack": ["a", "b1"], paths: [], "msg": "ADD STACK TO PATHS" }
    )
)
console.log(
    assert(
        tsStep,
        { "graph": { "a": ["b1", "b2"], "b1": [], "b2": [] }, "curStack": ["a", "b1"], paths: [], "msg": "ADD STACK TO PATHS" },
        { "graph": { "a": ["b1", "b2"], "b1": [], "b2": [] }, "curStack": ["a", "b1"], paths: ["a.b1"], "msg": "SAVE KIDS NAME" }
    )
)
console.log(
    assert(
        tsStep,
        { "graph": { "a": ["b1", "b2"], "b1": [], "b2": [] }, "curStack": ["a", "b1"], paths: ["a.b1"], "msg": "SAVE KIDS NAME" },
        { "graph": { "a": ["b1", "b2"], "b1": [], "b2": [] }, "curStack": ["a", "b1"], paths: ["a.b1"], "msg": "REMOVE CUR FROM STACK", lastKid: "b1" },
    )
)
console.log(
    assert(
        tsStep,
        { "graph": { "a": ["b1", "b2"], "b1": [], "b2": [] }, "curStack": ["a", "b1"], paths: ["a.b1"], "msg": "REMOVE CUR FROM STACK", lastKid: "b1" },
        { "graph": { "a": ["b1", "b2"], "b1": [], "b2": [] }, "curStack": ["a"], paths: ["a.b1"], "msg": "REMOVE SAVED KID FROM PARENTS LIST", lastKid: "b1" },
    )
)
console.log(
    assert(
        tsStep,
        { "graph": { "a": ["b1", "b2"], "b1": [], "b2": [] }, "curStack": ["a"], paths: ["a.b1"], "msg": "REMOVE SAVED KID FROM PARENTS LIST", lastKid: "b1" },
        { "graph": { "a": ["b2"], "b1": [], "b2": [] }, "curStack": ["a"], paths: ["a.b1"], msg: "CHECK KIDS", lastKid: "" },
    )
)
console.log(
    assert(
        tsStep,
        { "graph": { "a": ["b2"], "b1": [], "b2": [] }, "curStack": ["a"], paths: ["a.b1"], msg: "CHECK KIDS", lastKid: "" },
        { "graph": { "a": ["b2"], "b1": [], "b2": [] }, "curStack": ["a"], "paths": ["a.b1"], "msg": "ADD KID TO STACK" }
    )
)
console.log(
    assert(
        tsStep,
        { "graph": { "a": ["b2"], "b1": [], "b2": [] }, "curStack": ["a"], "paths": ["a.b1"], "msg": "ADD KID TO STACK" },
        { "graph": { "a": ["b2"], "b1": [], "b2": [] }, "curStack": ["a", "b2"], "paths": ["a.b1"], "msg": "CHECK KIDS" }
    )
)
console.log(
    assert(
        tsStep,
        { "graph": { "a": ["b2"], "b1": [], "b2": [] }, "curStack": ["a", "b2"], "paths": ["a.b1"], "msg": "CHECK KIDS" },
        { "graph": { "a": ["b2"], "b1": [], "b2": [] }, "curStack": ["a", "b2"], "paths": ["a.b1"], "msg": "IS STACK EMPTY?" }
    )
)
console.log(
    assert(
        tsStep,
        { "graph": { "a": ["b2"], "b1": [], "b2": [] }, "curStack": ["a", "b2"], "paths": ["a.b1"], "msg": "IS STACK EMPTY?" },
        { "graph": { "a": ["b2"], "b1": [], "b2": [] }, "curStack": ["a", "b2"], "paths": ["a.b1"], "msg": "ADD STACK TO PATHS" }
    )
)
console.log(
    assert(
        tsStep,
        { "graph": { "a": ["b2"], "b1": [], "b2": [] }, "curStack": ["a", "b2"], "paths": ["a.b1"], "msg": "ADD STACK TO PATHS" },
        { "graph": { "a": ["b2"], "b1": [], "b2": [] }, "curStack": ["a", "b2"], "paths": ["a.b1", "a.b2"], "msg": "SAVE KIDS NAME" },
    )
)
console.log(
    assert(
        tsStep,
        { "graph": { "a": ["b2"], "b1": [], "b2": [] }, "curStack": ["a", "b2"], "paths": ["a.b1", "a.b2"], "msg": "SAVE KIDS NAME" },
        { "graph": { "a": ["b2"], "b1": [], "b2": [] }, "curStack": ["a", "b2"], "paths": ["a.b1", "a.b2"], "msg": "REMOVE CUR FROM STACK", "lastKid": "b2" },
    )
)
console.log(
    assert(
        tsStep,
        { "graph": { "a": ["b2"], "b1": [], "b2": [] }, "curStack": ["a", "b2"], "paths": ["a.b1", "a.b2"], "msg": "REMOVE CUR FROM STACK", "lastKid": "b2" },
        { "graph": { "a": ["b2"], "b1": [], "b2": [] }, "curStack": ["a"], "paths": ["a.b1", "a.b2"], "msg": "REMOVE SAVED KID FROM PARENTS LIST", "lastKid": "b2" },
    )
)
console.log(
    assert(
        tsStep,
        { "graph": { "a": ["b2"], "b1": [], "b2": [] }, "curStack": ["a"], "paths": ["a.b1", "a.b2"], "msg": "REMOVE SAVED KID FROM PARENTS LIST", "lastKid": "b2" },
        { "graph": { "a": [], "b1": [], "b2": [] }, "curStack": ["a"], "paths": ["a.b1", "a.b2"], "msg": "CHECK KIDS", "lastKid": "" },
    )
)
console.log(
    assert(
        tsStep,
        { "graph": { "a": [], "b1": [], "b2": [] }, "curStack": ["a"], "paths": ["a.b1", "a.b2"], "msg": "CHECK KIDS", "lastKid": "" },
        { "graph": { "a": [], "b1": [], "b2": [] }, "curStack": [], "paths": ["a.b1", "a.b2"], "msg": "IS STACK EMPTY?" },
    )
)
console.log(
    assert(
        tsStep,
        { "graph": { "a": [], "b1": [], "b2": [] }, "curStack": [], "paths": ["a.b1", "a.b2"], "msg": "IS STACK EMPTY?" },
        { "graph": { "a": [], "b1": [], "b2": [] }, "curStack": [], "paths": ["a.b1", "a.b2"], "msg": "LEAVE" },
    )
)


console.log(
    assert(
        traverse,
        {
            graph: {
                a: ["b1", "b2"],
                b1: [],
                b2: [],
                // c: []
            }
        },
        ["a.b1", "a.b2"]
    )
)

console.log(
    assert(
        traverse,
        {
            graph: {
                a: []
            }
        },
        ["a"]
    )
)

// const mergeKey = ({data,key,goal}) => {
//     const inputData = {...data}
//     const outputData = {}

//     // add merged route
//     outputData[goal + "" + key] = []

//     // remove added node from neigbours
//     outputData[goal] = inputData[goal].filter(e => e != key)

//     // remove added node from data
//     delete inputData[goal]
//     delete inputData[key]
//     return {...outputData,...inputData}
// }

// console.log(
//     assert(
//         mergeKey,
//         {
//             data: {
//                 a:["b","c"],
//                 b:[],
//                 c:[]
//             },
//             key: "b",
//             goal: "a"
//         },
//         {
//             ab:[],
//             a:["c"],
//             c:[],
//         }
//     )
// )

// console.log(
//     assert(
//         mergeKey,
//         {
//             data: {
//                 ab:[],
//                 a:["c"],
//                 c:[]
//             },
//             key: "c",
//             goal: "a"
//         },
//         {
//             ab:[],
//             ac:[]
//         }
//     )
// )

// console.log(
//     assert(
//         traverse,
//         {
//             data: {
//                 a:["b","c"],
//                 b:[],
//                 c:[]
//             }
//         },
//         ["ab","ac"]
//     )
// )

// console.log(
//     assert(
//         traverse,
//         {
//             data: {
//                 a:[]
//             }
//         },
//         ["a"]
//     )
// )
