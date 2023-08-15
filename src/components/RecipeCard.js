import Cookies from "js-cookie";
import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import card_img from '../img/recipe_login_wallpaper.jpg';
import '../css/homepage.css';
import unlikeImg from '../img/icons8-heart-unliked.png';
import likeImg from '../img/icons8-heart-liked.png';
import bookmarkImg from '../img/icons8-bookmarked.png';
import unbookmarkImg from '../img/icons8-unbookmark.png'


const RecipeCard = (props) => {
  const [isBookmarked, setIsBookmarked] = useState(props.feed.bookmarked);
  const [isLiked, setIsLiked] = useState(props.feed.liked);
  const [likesCnt, setLikesCnt] = useState(props.feed.recipe_likes);

  const token = Cookies.get('token');

  const toogleLike = async () => {

    const flag = isLiked ? '0' : '1';
    const url = 'http://127.0.0.1:3000/posts/like';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token,
      },
      body: JSON.stringify({ 'postId': props.feed._id, 'likeFlag': flag, }),
    });

    if (!response.ok) {
      console.log('There was an error: ' + response.error);
    }

    const data = await response.json();
    setIsLiked(!isLiked);
    setLikesCnt(data.total_likes);
  }

  const toogleBookmark = async () => {

    const flag = isBookmarked ? '0' : '1';
    const url = 'http://127.0.0.1:3000/posts/bookmark/' + props.feed._id + '/' + flag;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token,
      },
    });

    if (!response.ok) {
      console.log('There was an error: ' + response.error);
    }

    const data = await response.json();
    console.log(data);
    setIsBookmarked(!isBookmarked);
  }

  return (
    <Container style={{ justifyContent: 'center', width: '97%', }}>
      <div style={{ boxShadow: '0 2px 3px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',padding: '2%', display: 'flex', backgroundColor:'white', justifyContent: 'space-between', alignItems: 'flex-start', border: '0px solid lightgray', position: 'relative', border:'1px solid lightgray', borderRadius: '13px' }}>
        <div style={{ width: '30%', borderRadius: '13px' }}>
          <img src={card_img} style={{ borderRadius: '13px', maxHeight: "100%", maxWidth: "100%", width: '100%', height: '25vh', objectFit: 'cover' }}></img>
        </div>
        <div style={{ width: '68%' }}>
          <div style={{ fontSize: '1.5rem', color: 'gray', wordWrap:'break-word', width:'90%'}}><b>{props.feed.recipe_title}</b></div>
          <div style={{ fontSize: '0.9rem' }}>{props.feed.recipe_description}</div>
          <div className="interact-buttons" style={{ position: 'absolute', gap: '15px', bottom: '2vh', display: 'flex', alignItems: 'flex-start' }}>

            {
              (!isLiked) ?
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent:'flex-start', alignItems:'center' }}>
                    <div style={{ cursor: 'pointer', width: '4vh', height: '4vh', borderRadius: '25px', }} onClick={toogleLike}>
                      <img src={unlikeImg} alt='like' style={{ maxHeight: '100%', maxWidth: '100%', height: '100%', width: '100%' }} />
                    </div>
                    <div style={{color:'gray'}}>{likesCnt}</div>
                  </div>
                </>
                :
                <>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent:'flex-start', alignItems:'center' }}>
                <div style={{ cursor: 'pointer', width: '4vh', height: '4vh', borderRadius: '25px', }} onClick={toogleLike}>
                    <img src={likeImg} alt='like' style={{ maxHeight: '100%', maxWidth: '100%', height: '100%', width: '100%' }} />
                  </div>
                  <div style={{color:'gray'}}>{likesCnt}</div>
                </div>
              </>
            }
            <div ><Button style={{ backgroundColor: 'orange', color: 'white', borderRadius: '10px', border: '0px' }}>View</Button></div>
          </div>
          <div style={{position: 'absolute', top:'1vh', right:'3vh', boxShadow:'0 4px 6px rgba(0, 0, 0, 0.3)', borderRadius:'25px', padding:'1%'}}>
          {
              (isBookmarked) ?
                <div style={{ cursor: 'pointer', width: '4vh', height: '4vh', borderRadius: '25px', }} onClick={toogleBookmark}>
                  <img src={bookmarkImg} alt='like' style={{ maxHeight: '100%', maxWidth: '100%', height: '100%', width: '100%' }} />
                </div> :
                <div style={{ cursor: 'pointer', width: '4vh', height: '4vh', borderRadius: '25px', }} onClick={toogleBookmark}>
                  <img src={unbookmarkImg} alt='like' style={{ maxHeight: '100%', maxWidth: '100%', height: '100%', width: '100%' }} />
                </div>
            }
          </div>
          <div style={{ color: 'gray', position: 'absolute', bottom: '2%', right: '2%' }}><small>Author: <i style={{color: 'blue'}}>{props.feed.author_username}</i></small></div>
        </div>
      </div>
    </Container>
  );
};

export default RecipeCard;