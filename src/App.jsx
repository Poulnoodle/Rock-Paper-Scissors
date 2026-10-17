import { useState } from "react"

function App(){
  const [turn,setTurn] = useState('')
  const [error,setError] = useState('')
  const [n,setN] = useState(null)
  function startGame() {
    if (turn === ''){
      setError('please enter the turn number')
      return
    }
    const tmp = Number(turn)
    if (Number.isNaN(tmp)) {
      setError('please enter the turn number')
      return
    }
    if (!Number.isInteger(tmp) || tmp<1){
      setError('please enter a valid number')
      return
    }
    setError('')
    setN(tmp)
  }
  return (<>
    <h1>Rock Paper Scissors</h1>
    <div>
      <input
      value = {turn}
      onChange={
        (e) => setTurn(e.target.value)
      }
      />
      <p>How many turns are you going to play?:{turn}</p>
    </div>
    <div>
      <button onClick={() => startGame()}>Start</button>
      {n !== null && error === '' && <p>Ready to play {n} turns!</p>}
      {error !== '' && <p>{error}</p>}
    </div>
    <div></div>
  </>
  )
}

export default App      