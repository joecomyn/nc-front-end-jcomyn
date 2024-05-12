import axios from "axios";

const newsApi = axios.create({
    baseURL: 'https://nc-final-project.onrender.com/api'
  });

export function fetchArticles(){
  return newsApi.get('/articles');
};

export function fetchArticlesByTopic(topic){
  return newsApi.get(`/articles/?topic=${topic}`);
};

export function fetchArticleById(article_id){
  return newsApi.get(`/articles/${article_id}`);
};

export function fetchCommentsByArticleId(article_id){
  return newsApi.get(`/articles/${article_id}/comments`);
};

export function deleteCommentByCommentId(comment_id){
  return newsApi.delete(`/comments/${comment_id}`);
};

export function postCommentByArticleId(article_id, comment){
  return newsApi.post(`/articles/${article_id}/comments`, comment);
};

export function fetchTopics(){
  return newsApi.get('/topics');
};

export function patchArticleByArticleId(article_id, votePatch){
  return newsApi.patch(`/articles/${article_id}`, votePatch);
}