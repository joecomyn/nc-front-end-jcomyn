import { useState, useEffect } from 'react';
import axios from "axios";
import Article from './Article';
import '../style-sheets/Articles.css'

function Articles({topic}){
    console.log(topic)
    const [articlesState, setArticlesState] = useState([]);
    useEffect(() => {
        axios.get("https://nc-final-project.onrender.com/api/articles")
        .then(({data: {articles}}) => {
          setArticlesState(articles);
        });
    }, [topic])

    function RenderArticles(){
        return articlesState.map((article) => {
          return <Article key={article.article_id} article = {article}/>
        })
    }

    return (
        <div>
            <p>topic: {topic}</p>
            <p>Articles:</p>
            <div className='article-list'>
            <RenderArticles/>
            </div>
        </div>
    )
}

export default Articles;