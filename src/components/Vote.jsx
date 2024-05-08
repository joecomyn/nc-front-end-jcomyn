import { useEffect, useState } from "react";
import axios from "axios";
import '../style-sheets/Vote.css'
import { useContext } from 'react';
import { UserContext } from '../contexts/User';

function Vote({vote, article_id}){
    const [voteState, setVoteState] = useState();
    const [err, setErr] = useState(null);
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        setVoteState(vote)
    }, [vote])

    function checkIfVoted(voteType){
        if(user.votes.hasOwnProperty(article_id)){
            if(user.votes[article_id] === voteType){
                return false;
            }
            return true;
        }
        return true;
    }

    function undoVote(voteType){
        if(user.votes.hasOwnProperty(article_id)){
            if(user.votes[article_id] === voteType){
                return true;
            }
            return false;
        }
        return false;
    }

    //optimistic rendering of vote incremement
    function handleVote(event) {
        let votes = 0
        event.preventDefault();
        if(event.target.value === "upvote" && checkIfVoted("upvote")){
            if(undoVote("downvote")){
                votes = 2
            }
            else{
                votes = 1
            }
            setVoteState((voteState) => voteState + 1*votes);
            setUser((user) => {
                let userCopy = {...user};
                userCopy.votes[article_id] = 'upvote';
                return userCopy
            });
            setErr(null);
            axios.patch(`https://nc-final-project.onrender.com/api/articles/${article_id}`, {inc_votes: 1*votes})
            .catch((err)=> {
                setVoteState((voteState) => voteState - 1);
                setUser((user) => {
                    let userCopy = {...user};
                    userCopy.votes[article_id] = '';
                    return userCopy
                });
                setErr("Something went wrong, please try again");
            });
        }

        if(event.target.value === "downvote" && checkIfVoted("downvote")){
            if(undoVote("upvote")){
                votes = 2
            }
            else{
                votes = 1
            }
            setVoteState((voteState) => voteState - 1*votes);
            setUser((user) => {
                let userCopy = {...user};
                userCopy.votes[article_id] = 'downvote';
                return userCopy
            });
            setErr(null);
            axios.patch(`https://nc-final-project.onrender.com/api/articles/${article_id}`, {inc_votes: -1*votes})
            .catch((err)=> {
                setVoteState((voteState) => voteState + 1);
                setUser((user) => {
                    let userCopy = {...user};
                    userCopy.votes[article_id] = '';
                    return userCopy
                });
                setErr("Something went wrong, please try again");
            });
        }
    }

    return (
        <div className="vote-box">
            {err ? <p>{err}</p> : null}
            <p className="vote-counter">Votes: {voteState}</p>
            <input type="image" className="vote-icon" src="https://i.ibb.co/Vp26WSZ/downvote-icon.png" id="downvote" value="downvote" onClick={handleVote}/>
            <input type="image" className="vote-icon" src="https://i.ibb.co/Hh1JPR5/upvote-icon.png" id="upvote" value="upvote" onClick={handleVote}/>
        </div>
    );
}

export default Vote;