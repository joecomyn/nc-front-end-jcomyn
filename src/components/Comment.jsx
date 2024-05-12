import { deleteCommentByCommentId } from '../utils/newsApi';

function Comment({ setCommentsAltered, user, comment}){

    function handleDeleteComment(){
        deleteCommentByCommentId(comment.comment_id)
        .then(() => {
            setCommentsAltered(true);
        })
    }

    function RenderDeleteButton(){
        if (comment.author === user.user){
            return <button onClick={handleDeleteComment}>Delete comment</button>
        }
    }

    return (
        <div>
            <p>{comment.body}</p>
            <p>Votes: {comment.votes}</p>
            <p>Author: {comment.author}</p>
            <RenderDeleteButton/>
            <p>Created at: {comment.created_at}</p>
        </div>
    )
}

export default Comment;