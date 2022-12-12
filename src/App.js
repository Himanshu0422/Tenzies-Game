import React from "react";
import Die from './components/Die'
import { nanoid } from "nanoid";
import Confetti from 'react-confetti'

export default function App() {

  const [dice, setdice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
    
  React.useEffect(() => {
    const allHeld = dice.every(die => die.isheld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
        setTenzies(true)
        console.log("You won!")
    }
  }, [dice])

  function generatedice(){
    return{
      value: Math.ceil(Math.random() * 6),
      isheld: false ,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
        newDice.push(
          generatedice()
        )
    }
    return newDice
  }

  function holdice(id){
    // console.log(id);
    setdice(oldice => oldice.map(die => {
      return die.id === id ? {...die, isheld : !die.isheld} : die
    }))
  }

  const diceElement = dice.map(die => <Die key={die.id} value={die.value} isheld={die.isheld} holdice={()=> holdice(die.id)}/>)

  function rollDices(){
    if(!tenzies){
      setdice(olddice => olddice.map(die => {
        return die.isheld ? die : generatedice()
      }));
    }else{
      setTenzies(false)
      setdice(allNewDice())
    }
}

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElement}
      </div>
      <button className="roll-button" onClick={rollDices}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  );
}