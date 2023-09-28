import { useState, useEffect } from 'react'

const Heading = ({text}) => <h1>{text}</h1>

const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>

const DisplayVotes = ({votes}) => <p>has {votes} votes</p>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const max = anecdotes.length

  const pointsInit = Array(max).fill(0)
  
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(pointsInit)
  const [leader, setLeader] = useState(0)

  const mostVotes = () => {
    const currentLeader = points.indexOf(Math.max(...points))
    setLeader(currentLeader)
  }

  const vote = () => {
    const copyPoints = [...points]
    copyPoints[selected] += 1
    setPoints(copyPoints)
    mostVotes()
    console.log(points)
  }

  const randomGenerator = () => {
    const newSelection = Math.floor(Math.random() * max )
    console.log(newSelection)
    console.log(selected)
    setSelected(newSelection)
    console.log(selected)
  }

  return (
    <div>
      <div>
        <Heading text={'Anecdote of the day'} />
        <div>{anecdotes[selected]}</div>
        <DisplayVotes votes={points[selected]} />
        <Button handleClick={randomGenerator} text={'next anecdote'}/>
        <Button handleClick={vote} text={'vote'} />
        <Heading text={'Anecdote with most votes'} />
        <div>{anecdotes[leader]}</div>
      </div>
    </div>
  )
}

export default App
