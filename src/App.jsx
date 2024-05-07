import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import TopicSelector from './components/TopicSelector';
import Articles from './components/Articles';
import ArticlePage from './components/ArticlePage';
import Topics from './components/Topics';
import './App.css'

function App() {
  const [topic, setTopic] = useState("all");
  function handleTopicState(event) {
    setTopic(event.target.value);
  }

  return (
    <div>
      <h1>NC NEWS</h1>
      <TopicSelector topic={topic} handleTopicState={handleTopicState}/>
      <Routes>
        <Route index element={<Articles topic={topic}/>} />
        <Route path="/articles" element={<Articles />}/>
        <Route path="/articles/:article_id" element={<ArticlePage topic={topic}/>}/>
        <Route path="/topics" element={<Topics />}/>
      </Routes>
    </div>
  )
}

export default App
