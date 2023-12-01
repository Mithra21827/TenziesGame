import './App.css';
import Die from './Components/Die'
import React from 'react'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'
function App() {

  let [dice, setDice] = React.useState(allNewDice())
  let [tenzies,setTenzies] = React.useState(false)

  React.useEffect(()=>{
      const allHeld = dice.every(die=>die.isHeld)
      const firstvalue = dice[0].value
      const allSameValue = dice.every(die=>die.value===firstvalue)
      if(allHeld && allSameValue){
        setTenzies(true)
        console.log("You won")
      }

  },[dice])

  function generateNewDie(){
    return { 
      value:Math.floor(Math.random()*6)+1,
      isHeld:false,
      id: nanoid()
    }
  }
  function allNewDice(){
    let dieArray = [];
    for(let i=0; i<10;i++){
      dieArray.push(generateNewDie())
    }
    return dieArray
  }

  function diceHold(id){
    setDice(prevRoll=>{
      return(
        prevRoll.map((value)=>{
        return (
          {
          ...value,
          isHeld: value.id===id? !value.isHeld: value.isHeld
        }
        )}))
     })
  }

  function setState(){
    setDice(allNewDice)
      setTenzies(false)
  }
  
  function rollDice(){
    //Method two
    tenzies? setState()
      :setDice(oldDie=>oldDie.map(die=>{
      return die.isHeld?die:generateNewDie()
    }))

    //Method one
    // setDice(prevState=>{
    //   let newArray=[]
    //   for(let i=0; i<prevState.length; i++){
    //     if(!prevState[i].isHeld){
    //       newArray.push({
    //         ...prevState[i],
    //         value: allNewDice()[i].value
    //       })
    //     }else{
    //       newArray.push(prevState[i])
    //     }
    //   }
    //   return newArray
    // })
  }

  let mapDiceArray = dice.map((die)=>{
    return <Die value={die.value} key={die.id} isheld={die.isHeld} hold={()=>diceHold(die.id)}/>
  })

  return (
    <main className='main'>
      {tenzies && <Confetti/>}
      <h1>Tenzies</h1>
      <p>Roll until all dice are the same. Click each die to freeze it at it's current value between roll</p>
      <div className='dies-container'>
        {mapDiceArray}
      </div>
      <button className='roll-dice'onClick={rollDice}>{tenzies?"NewGame":"Roll"}</button>
    </main>
  );
}

export default App;
