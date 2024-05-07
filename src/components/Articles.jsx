import { useState, useEffect } from 'react';
import axios from "axios";
import Article from './Article';
import '../style-sheets/Articles.css'

function Articles({topic}){
    const [articlesState, setArticlesState] = useState([]);
    useEffect(() => {
        if(topic === 'all'){
            axios.get("https://nc-final-project.onrender.com/api/articles")
            .then(({data: {articles}}) => {
              setArticlesState(articles);
            });
        }
        else{
            axios.get(`https://nc-final-project.onrender.com/api/articles/?topic=${topic}`)
            .then(({data: {articles}}) => {
              setArticlesState(articles);
            });
        }
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