import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import TopicSelector from './components/TopicSelector';
import Articles from './components/Articles';
import Article from './components/Article';
import Topics from './components/Topics';
import './App.css'

function App() {
  const [topic, setTopic] = useState("all")

  function handleTopicState(event) {
    setTopic(event.target.value);
  }

  return (
    <div>
      <h1>NC NEWS</h1>
      <TopicSelector topic={topic} handleTopicState={handleTopicState}/>
      <Routes>
        <Route index element={<Articles />} />
        <Route path="/articles" render={() => <Articles topic={topic}/>}/>
        <Route path="/topics" element={<Topics />}/>
      </Routes>
    </div>
  )
}

export default App
