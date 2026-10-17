export const beats = {
    rock:'scissors', paper:'rock', scissors:'paper'
}

export function invert(obj) {
    let tmp = {}
    for(const [key,value] of Object.entries(obj)){
        tmp[value] = key
    }
    return tmp
}

export const beatenBy = invert(beats)

export function tableProbabilities(result, humanLast){
    if (result === null){
        return {rock: 0.381, paper: 0.360, scissors: 0.259}
    }
    if (result === 'draw'){
        return {rock: 0.362, paper: 0.356, scissors: 0.282}
    }
    if (result === 'win'){
        return {[humanLast]: 0.2, [beatenBy[humanLast]]: 0.423, [beats[humanLast]]: 0.377}
    }
    if (result === 'loss'){
        return {[humanLast]: 0.275, [beatenBy[humanLast]]: 0.385, [beats[humanLast]]: 0.34}
    }
    return null
}

export function sigmoid(z){
    return 1/(1+Math.exp(-z))
}

export function markovProbabilities(counts ,prev){
    if(prev === null){
        return {rock:1/3, paper: 1/3, scissors: 1/3}
    }
    let s = counts[prev]['rock']+counts[prev]['paper']+counts[prev]['scissors']
    let rock_p = (counts[prev]['rock']+1)/(s+3)
    let paper_p = (counts[prev]['paper']+1)/(s+3)
    let scissors_p = (counts[prev]['scissors']+1)/(s+3)
    return {rock:rock_p, paper:paper_p, scissors:scissors_p}
}

export function argmax(obj){
    let mx=0, mxa=null
    for(const [key,value] of Object.entries(obj)){
        if(value>mx){
            mx = value
            mxa = key
        }
    }
    return mxa
}

export function blend(markovP, tableP, n, a, b){
    const w = sigmoid(a*n+b)
    const rock_p = w*markovP['rock'] + (1-w)*tableP['rock']
    const paper_p = w*markovP['paper'] + (1-w)*tableP['paper']
    const scissors_p = w*markovP['scissors'] + (1-w)*tableP['scissors']
    return {rock:rock_p, paper:paper_p, scissors:scissors_p}
}

export function chooseModelMove(probs){
    return beatenBy[argmax(probs)]
}

export function judge(humanMove, modelMove){
    if(beats[humanMove] === modelMove){
        return 'win'
    }
    if(beatenBy[humanMove] === modelMove){
        return 'loss'
    }
    if(humanMove === modelMove){
        return 'draw'
    }
    return null
}

export function updateCounts(counts, prev, next){
    let new_row = {...counts[prev], [next]:counts[prev][next]+1}
    let new_counts = {...counts, [prev]:new_row}
    return new_counts
}

export const A = 0.1, B =-2