import '../style-sheets/Article.css'

function Article({article}){

    return (
        <div className="article">
            <p>Article name: {article.title}</p>
            <img className='article-img' src = {article.article_img_url}/>
            <p>Author: {article.author}</p>
            <p>Votes: {article.votes}</p>
            <p>Comments: {article.comment_count}</p>
            <p>Created at: {article.created_at}</p>
        </div>
    )
}

export default Article;