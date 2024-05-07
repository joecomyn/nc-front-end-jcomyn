import { useState, useEffect } from 'react';
import axios from "axios";

function TopicSelector({topic, handleTopicState}){

    const [topics, setTopics] = useState([]);
  useEffect(() => {
    axios
      .get("https://nc-final-project.onrender.com/api/topics")
      .then(({ data: { topics } }) => {
        setTopics(() => {
          return topics.map((topic) => {
            return topic.slug;
          });
        });
      });
    }, [setTopics]);

    function RenderTopics() {
        return topics.map((topic) => {
          return (
            <option value={topic} key={topic}>
              {topic}
            </option>
          );
        });
    }
    
    function RenderDropDown() {
        return (
          <select name="topics" onChange={handleTopicState} defaultValue={topic}>
            <option value="all" key="all">All</option>
            <RenderTopics />
          </select>
        );
    }

    return (
        <div>
            <RenderDropDown/>
        </div>
    )
}

export default TopicSelector;