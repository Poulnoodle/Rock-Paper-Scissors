function invert(dic){
    const new_dic = {}
    for (const [key, value] of Object.entries(dic)) {
        new_dic[value] = key
    }
    return new_dic
}

function argmax(dic){
    let max_value = 0
    let max_key = ''
    for (const [key,value] of Object.entries(dic)){
        if(max_value < value){
            max_value = value
            max_key = key
        }
    }
    return max_key
}

function sigmoid(z){
    return 1/(Math.exp(-1*z)+1)
}

console.log(invert({ rock: 'scissors', scissors: 'paper', paper: 'rock'}))
console.log(argmax({ rock: 0.2, paper: 0.423, scissors: 0.377}))
console.log(sigmoid(0))
console.log(sigmoid(0.1*10-2))
console.log(sigmoid(0.1*30-2))