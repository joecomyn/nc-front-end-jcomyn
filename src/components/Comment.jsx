import '../style-sheets/Comment.css';

function Comment({comment}){

    return (
        <div className="comment">
            <p>{comment.body}</p>
            <p>Votes: {comment.votes}</p>
            <p>Author: {comment.author}</p>
            <p>Created at: {comment.created_at}</p>
        </div>
    )
}

export default Comment;