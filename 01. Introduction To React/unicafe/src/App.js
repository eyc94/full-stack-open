import { useState } from 'react';

const Statistics = (props) => {
  const total = props.good + props.bad + props.neutral;
  const average = (props.good - props.bad) / total;
  const positive = props.good / total * 100;

  if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
    return (
      <p>No feedback given</p>
    );
  }

  return (
    <>
      <h2>Statistics</h2>
      <StatisticLine text='good' value={props.good} />
      <StatisticLine text='neutral' value={props.neutral} />
      <StatisticLine text='bad' value={props.bad} />
      <StatisticLine text='all' value={total} />
      <StatisticLine text='average' value={average} />
      <StatisticLine text='positive' value={positive} />
    </>
  );
};

const StatisticLine = (props) => {
  if (props.text === 'positive') {
    return (
      <div>{props.text} {props.value} %</div>
    );
  }

  return (
    <div>{props.text} {props.value}</div>
  );
};

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  );
};

const App = () => {
  // Save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };

  const handleBad = () => {
    setBad(bad + 1);
  };


  return (
    <div>
      <h2>Give Feedback</h2>
      <Button text='good' onClick={handleGood} />
      <Button text='neutral' onClick={handleNeutral} />
      <Button text='bad' onClick={handleBad} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
