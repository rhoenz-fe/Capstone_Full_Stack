import { useState } from 'react'

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td> <td>{value}</td>
    </tr>
  );
};

const Statistics = (props) => {
  const good = props.values[0]
  const bad = props.values[1]
  const neutral = props.values[2]
  const total = good + bad + neutral
  return (
    <div>
      <h1>statistics</h1>

      <StatisticLine text="good" value= {good} />
      <StatisticLine text="neutral" value= {neutral} />
      <StatisticLine text="bad" value= {bad} />
      <StatisticLine text="all" value= {total} />
      <StatisticLine text="average" value= {(good-bad)/total} />
      <StatisticLine text="positive" value= {`${good/total}%`} />
    </div>
  );
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad
  const values = [good, neutral, bad]
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>Good</button>
      <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
      <button onClick={() => setBad(bad + 1)}>Bad</button>
      
      {total > 0 ? (
        <Statistics values = {values} />
      ) : (
        <h4>No feedback given</h4>
      )}
    </div>
  )
}

export default App