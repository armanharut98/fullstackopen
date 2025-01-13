import { useState } from 'react'

const Anecdote = ({ anecdote, votes }) => {
  return (
    <div>
      {anecdote} <br />
      has {votes} votes
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [mostVotes, setMostVotes] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))

  const changeAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const vote = () => {
    const updatedPoints = points.map((p, i) => {
      if (i == selected) {
        return p + 1
      }
      return p
    })
    setMostVotes(updatedPoints.indexOf(Math.max(...updatedPoints)))
    setPoints(updatedPoints)
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <Anecdote anecdote={anecdotes[selected]} votes={points[selected]} />
      <div>
        <button onClick={vote}>vote</button>
        <button onClick={changeAnecdote}>next anecdote</button>
      </div>
      <h2>Anecdote with most votes</h2>
      <Anecdote anecdote={anecdotes[mostVotes]} votes={points[mostVotes]} />
    </div>
  )
}

export default App