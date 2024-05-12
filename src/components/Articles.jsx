import { useState, useEffect } from 'react';
import { fetchArticles, fetchArticlesByTopic } from '../utils/newsApi.jsx';
import Article from './Article';

function Articles({topic}){

    const [articlesState, setArticlesState] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(topic === 'all'){
            fetchArticles()
            .then(({data: {articles}}) => {
              setArticlesState(articles);
              setIsLoading(false);
            });
        }
        else{
            fetchArticlesByTopic(topic)
            .then(({data: {articles}}) => {
              setArticlesState(articles);
              setIsLoading(false);
            });
        }
    }, [topic])

    function RenderArticles(){
        return articlesState.map((article) => {
          return <Article key={article.article_id} article = {article} topic={topic}/>
        })
    }

    if (isLoading) return <p>Loading...</p>
    return (
        <div>
            <p>topic: {topic}</p>
            <p>Articles:</p>
            <div>
            <RenderArticles/>
            </div>
        </div>
    )
}

export default Articles;