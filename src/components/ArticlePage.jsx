import { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import axios from "axios";
import Article from './Article';
import Comment from './Comment';

function ArticlePage({topic}){
    const [article, setArticle] = useState({})
    const [articleComments, setArticleComments] = useState([])
    const { article_id } = useParams();

    useEffect(() => {
            axios.get(`https://nc-final-project.onrender.com/api/articles/${article_id}`)
            .then(({data: { article }}) => {
              setArticle(article);
            });
            axios.get(`https://nc-final-project.onrender.com/api/articles/${article_id}/comments`)
            .then(({data: { comments }}) => {
              setArticleComments(comments);
            });
    }, [article_id, setArticle, setArticleComments])

    function RenderArticle(){
        return <Article article={article} topic={topic}/>
    }

    function RenderComments(){
        return articleComments.map((comment) => {
            return <Comment key={comment.comment_id} comment={comment}/>
        });
    }

    return (
        <div>
            <p>Article:</p>
            <RenderArticle/>
            <RenderComments/>
        </div>
    );
}

export default ArticlePage;