import { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import axios from "axios";
import Article from './Article';
import Comment from './Comment';
import { useContext } from 'react';
import { UserContext } from '../contexts/User';

function ArticlePage({topic}){
    const [article, setArticle] = useState({})
    const [articleComments, setArticleComments] = useState([])
    const [commentClick, setCommentClick] = useState(false)
    const { article_id } = useParams();
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
            axios.get(`https://nc-final-project.onrender.com/api/articles/${article_id}`)
            .then(({data: { article }}) => {
              setArticle(article);
            });
            axios.get(`https://nc-final-project.onrender.com/api/articles/${article_id}/comments`)
            .then(({data: { comments }}) => {
              setArticleComments(comments);
            });
    }, [article_id])

    function RenderArticle(){
        return <Article article={article} topic={topic}/>
    }

    function handleCommentButton(){
        setCommentClick(true)
    }

    function RenderCommentButton(){
            return (
                <button onClick={handleCommentButton}>comment on this post</button>
            )

    }

    function RenderPostComment(){
        if(commentClick === true){
            return (
                <div> 
                    <form onSubmit={handlePostComment}>
                        <label >Comment:</label>
                        <input type="text" name="body"/>
                        <input type="submit" value="Submit"></input>
                    </form>
                </div>
            )
        }
    }

    function handlePostComment(event){
        const commentBody = event.target.body.value;
        axios.post(`https://nc-final-project.onrender.com/api/articles/${article_id}/comments`, {username: user.user, body: commentBody})
        .then(({data: {postedComment}}) => {
            console.log(postedComment)
            setCommentClick(false)
        });
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
            <RenderCommentButton/>
            <RenderPostComment/>
            <RenderComments/>
        </div>
    );
}

export default ArticlePage;