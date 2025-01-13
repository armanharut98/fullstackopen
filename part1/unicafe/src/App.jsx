import { useState } from "react"

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const StatisticsLine = ({ name, value }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad

  const calculateAverage = () => ((good - bad) / total).toFixed(3)
  const calculatePositive = () => (good / total).toFixed(3)

  if (total > 0) {
    return (
      <>
        <h2>Statistics</h2>
        <table>
          <tbody>
            <StatisticsLine name="Good" value={good} />
            <StatisticsLine name="Neutral" value={neutral} />
            <StatisticsLine name="Bad" value={bad} />
            <StatisticsLine name="All" value={total} />
            <StatisticsLine name="Average" value={calculateAverage()} />
            <StatisticsLine name="Positive" value={`${calculatePositive()}%`} />
          </tbody>
        </table>
      </>
    )
  }

  return (
    <>
      <h2>Statistics</h2>
      <p>No feedback given</p>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>Give Feedback</h2>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
