import { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import Article from './Article';
import Comment from './Comment';
import { useContext } from 'react';
import { UserContext } from '../contexts/User';
import { fetchArticleById, fetchCommentsByArticleId, postCommentByArticleId } from '../utils/newsApi';

function ArticlePage({topic}){
    const [article, setArticle] = useState({})
    const [articleComments, setArticleComments] = useState([])
    const [commentClick, setCommentClick] = useState(false)
    const [commentsAltered, setCommentsAltered] = useState(false)
    const { user, setUser } = useContext(UserContext);
    const { article_id } = useParams();
    const [isArticleLoading, setIsArticleLoading] = useState(true);
    const [isCommentsLoading, setIsCommentsLoading] = useState(true);

    useEffect(() => {
            fetchArticleById(article_id)
            .then(({data: { article }}) => {
              setArticle(article);
              setIsArticleLoading(false);
            });
            fetchCommentsByArticleId(article_id)
            .then(({data: { comments }}) => {
              setArticleComments(comments);
              setIsCommentsLoading(false);
              setCommentsAltered(false);
            });
    }, [article_id, commentsAltered])

    function RenderArticle(){
        if (isArticleLoading) return <p>Loading...</p>
        return <Article article={article} topic={topic}/>
    }

    function handleCommentButton(){
        setCommentClick(true)
    }

    function RenderCommentButton(){
            return (
                <button onClick={handleCommentButton}>Comment</button>
            )

    }

    function RenderPostComment(){
        if(commentClick === true){
            return (
                <div> 
                    <form onSubmit={handlePostComment}>
                        <label >Comment:</label>
                        <textarea name="body" rows="4" cols="50"/>
                        <input type="submit" value="Submit"></input>
                    </form>
                </div>
            )
        }
    }

    //optimistic comment rendering
    function handlePostComment(event){
        event.preventDefault()
        const commentBody = event.target.body.value;
        postCommentByArticleId(article_id, {username: user.user, body: commentBody})
        .then(({data: {postedComment}}) => {
            setCommentClick(false);
            setCommentsAltered(true);
        });
    }

    function RenderComments(){
        if (isCommentsLoading) return <p>Loading...</p>
        return articleComments.map((comment) => {
            return <Comment key={comment.comment_id} setCommentsAltered={setCommentsAltered} user={user} comment={comment}/>
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