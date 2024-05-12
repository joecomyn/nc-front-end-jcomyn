import { useEffect, useState } from "react";
import { patchArticleByArticleId } from "../utils/newsApi";
import { useContext } from 'react';
import { UserContext } from '../contexts/User';

function Vote({vote, article_id}){
    const [voteState, setVoteState] = useState();
    const [err, setErr] = useState(null);
    const [ hasVoted, setHasVoted] = useState('none');
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        setVoteState(vote)
    }, [vote, setVoteState])

    function checkVote(value){
        let vote = 0
        if(value === 'upvote'){
            if( hasVoted === 'none'){
                setHasVoted('upvote')
                return vote = 1;
            }
            else if(value === hasVoted){
                setHasVoted('none')
                return vote = -1
            }
            else if(hasVoted === 'downvote'){
                setHasVoted('upvote')
                return vote = 2
            }
        }
        if(value === 'downvote'){
            if( hasVoted === 'none'){
                setHasVoted('downvote')
                return vote = -1;
            }
            else if(value === hasVoted){
                setHasVoted('none')
                return vote = 1
            }
            else if(hasVoted === 'upvote'){
                setHasVoted('downvote')
                return vote = -2
            }
        }
    }
    
    //optimistic rendering of vote incremementw
    function handleVote(event) {
        let vote = checkVote(event.target.value)
        setVoteState((voteState) => {
            return voteState + vote
        });
        setErr(null);
        patchArticleByArticleId(article_id, {inc_votes: vote})
        .catch((err)=> {
            setVoteState((voteState) => voteState - vote);
            setErr("Something went wrong, please try again");
        });
    }

        
    

    return (
        <div >
            {err ? <p>{err}</p> : null}
            <p>Votes: {voteState}</p>
            <input type="image" className="vote-icon" src="https://i.ibb.co/Vp26WSZ/downvote-icon.png" id="downvote" value="downvote" onClick={handleVote}/>
            <input type="image" className="vote-icon" src="https://i.ibb.co/Hh1JPR5/upvote-icon.png" id="upvote" value="upvote" onClick={handleVote}/>
        </div>
    );
}

export default Vote;