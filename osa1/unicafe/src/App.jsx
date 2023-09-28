import { useState } from 'react'

const Heading = ({ heading }) => {
  return (
    <div>
      <h1>{heading}</h1>
    </div>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Display = ({ text, value }) => {
  return (
    <tbody>
      <tr>
        <td>{text}</td> 
        <td>{value}</td>
      </tr>
    </tbody>
  )
}

const DisplayPositive = ({ text, value }) => {
  return (
    <tbody>
      <tr>
        <td>{text}</td> 
        <td>{value} %</td>
      </tr>
    </tbody>
  )
}

const Statistics = (props) => {
  if (props.total === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  else {
    return (
      <div>
        <table>
          <Display value={props.good} text='good' />
          <Display value={props.neutral} text='neutral' />
          <Display value={props.bad} text='bad' />
          <Display value={props.total} text='all' />
          <Display value={props.avg} text='average'/>
          <DisplayPositive value={props.isPositive} text='positive' />
        </table>
      </div>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [avg, setAvg] = useState(0)
  const [isPositive, setIsPositive] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    const updatedTotal = total + 1
    setTotal(updatedTotal)
    const updatedAvg = (good*1 + neutral*0 + bad*(-1)) / updatedTotal
    setAvg(updatedAvg)
    const positive = (updatedGood / updatedTotal) * 100
    setIsPositive(positive)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    const updatedTotal = total + 1
    setTotal(updatedTotal)
    const updatedAvg = (good*1 + neutral*0 + bad*(-1)) / updatedTotal
    setAvg(updatedAvg)
    const positive = (good / updatedTotal) * 100
    setIsPositive(positive)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    const updatedTotal = total + 1
    setTotal(updatedTotal)
    const updatedAvg = (good*1 + neutral*0 + bad*(-1)) / updatedTotal
    setAvg(updatedAvg)
    const positive = (good / updatedTotal) * 100
    setIsPositive(positive)
  }

  return (
    <div>
      <Heading heading='give feedback' />
      <div>
        <Button handleClick={handleGoodClick} text='good' />
        <Button handleClick={handleNeutralClick} text='neutral' />
        <Button handleClick={handleBadClick} text='bad' />
      </div>
        <Heading heading='statistics' />
      <div>
        <Statistics good={good} neutral={neutral} 
        bad={bad} total={total} avg={avg} isPositive={isPositive} />
      </div>
    </div>
  )
}

export default App
