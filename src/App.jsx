import React from "react"
import Die from "./assets/components/Die"
import Timer from "./assets/components/Timer"
import { useState } from "react"
import Confetti from "react-confetti"

function App() {

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [rolls, setRolls] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(true)
  const [seconds, setSeconds] = useState(0)
  const [timesItTook, setTimesItTook] = useState(JSON.parse(localStorage.getItem("timesItTook")) || [])

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value  
    const allSameValue = dice.every(die => die.value === firstValue)
    if(allHeld && allSameValue) {
      console.log("you won!")
      setTenzies(true)
      setIsTimerRunning(false)
    } else {
      setTenzies(false)
      setIsTimerRunning(true)
    }
  }, [dice])

  function allNewDice() {
    const newDice = []
    for(let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: Math.random() * 10000
    }
  }

  function rollDice() {
    if(!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : generateNewDie()
      }))
      setRolls(prevRolls => prevRolls + 1)
    } else {
      setDice(allNewDice())
      setRolls(0)
      setSeconds(0)
      console.log("TIMER NOW SHOULD BE SET TO 0")
    }
    
    console.log(dice)
  }

  function holdDice(id) {
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
    console.log(id)
  }
 
  const diceElements = dice.map(die => (
    <Die 
    value={die.value}
    isHeld={die.isHeld}
    key={die.id}
    holdDice={() => holdDice(die.id)}
    />
  ))

  const winningText = `Ganaste! Haga click en el botón de abajo para seguir jugando. Te tomó ${rolls} tiradas para ganar.`

  function saveTimes(time) {
    setTimesItTook(prevTimes => [
      ...prevTimes, {
        record: time
      }
    ])
    console.log("times it took to win", timesItTook)
    localStorage.setItem("timesItTook", JSON.stringify(timesItTook))
  }

  return (
    <div className="bg-gradient-to-bl from-[#fef9c3] to-[#d8b4ff] h-screen w-full flex justify-center items-center">
      {tenzies && <Confetti />}
      
      <div className="h-[680px] w-[760px] bg-[#F5F5F5] flex flex-col items-center justify-normal rounded-2xl shadow-xl font-victor text-center">
        
        <h1 className="text-4xl mt-12">Tenzies</h1>
        <p className="mt-6 w-[600px]">{tenzies ? winningText : "Tire los dados hasta que todos sean iguales. Haz click en cada dado para congelarlo y mantener su valor actual entre tiradas."}</p>
        
        <div className="h-auto w-[550px] grid grid-cols-5 grid-rows-2 gap-4 my-12">
          {diceElements}
        </div>
        <button className="bg-blue-400 text-white text-lg font-size mt-4 py-4 px-4 rounded-xl hover:shadow-xl hover:px-6 duration-200" onClick={rollDice}>
          {tenzies ? "Nuevo juego" : "Tirar dados"}
        </button>
        <Timer isTimerRunning={isTimerRunning} tenzies={tenzies} seconds={seconds} setSeconds={setSeconds} saveTimes={saveTimes} timesItTook={timesItTook} />
      </div>
    </div>
  )
}

export default App