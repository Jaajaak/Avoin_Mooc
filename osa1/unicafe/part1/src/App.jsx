import { useState } from 'react'

const Display = props => <div>{props.value}</div>

const History = (props) => {
  if (props.total === 0) {
    return (
      <div>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <Statistics good={props.good} neutral={props.neutral} bad={props.bad} /> 
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => {
  return (
    <div>

      <p>{props.text}: {props.value}</p>
    </div>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;

  return (
    <div>
      <h2>Statistics</h2>
      <StatisticLine text="Good" value ={good} />
      <StatisticLine text="Neutral" value ={neutral} />
      <StatisticLine text="Bad" value ={bad} />
      <StatisticLine text="Total" value={total}/>
      <StatisticLine text="Average" value={good/total + neutral/total -bad/total}/>
      <StatisticLine text="Positive" value={good/total}/>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad

  const setToGood = newGood => {
    console.log('value now', newGood)
    setGood(newGood)

  }

  const setToNeutral = newNeutral => {
    console.log('value now', newNeutral)
    setNeutral(newNeutral)

  }

  const setToBad = newBad => {
    console.log('value now', newBad)
    setBad(newBad)

  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => setToGood(good+1)} text="good" />
      <Button handleClick={() => setToNeutral(neutral+1)} text="neutral" />
      <Button handleClick={() => setToBad(bad+1)} text="bad" />
      <History good={good} neutral={neutral} bad={bad} total={total} />

    </div>
  )
}

export default App