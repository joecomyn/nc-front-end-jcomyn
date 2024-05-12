import {Link} from 'react-router-dom'
import Vote from './Vote'

function Article({article, topic}){

    function RenderBody(){
        if(article.body !== undefined){
            return <p>Body: {article.body}</p>
        }
    }

    function RenderLink(){
        if(article.body === undefined){
            return (
                <Link to={`/articles/${article.article_id}`}>
                    <p>View Article</p>
                </Link>
            )
        }
        else{
            return (
                <Link to={`/`}>
                    <p>Back to {topic}</p>
                </Link>
            )
        }
    }

    function RenderVote(){
        if(article.body === undefined){
            return <p>Votes: {article.votes}</p>
        }
        else{
            return <Vote vote={article.votes} article_id={article.article_id}/>
        }
    }


    return (
        <div>
            <p>Article name: {article.title}</p>
            <RenderLink/>
            <img src = {article.article_img_url}/>
            <RenderBody/>
            <p>Author: {article.author}</p>
            <RenderVote/>
            <p>Comments: {article.comment_count}</p>
            <p>Created at: {article.created_at}</p>
        </div>
    )
}

export default Article;