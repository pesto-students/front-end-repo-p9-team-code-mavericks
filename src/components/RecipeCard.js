import Cookies from "js-cookie";
import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import card_img from '../img/recipe_login_wallpaper.jpg';
import '../css/homepage.css';
import unlikeImg from '../img/icons8-heart-unliked.png';
import likeImg from '../img/icons8-heart-liked.png';
import bookmarkImg from '../img/icons8-bookmarked.png';
import unbookmarkImg from '../img/icons8-unbookmark.png'
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";


const RecipeCard = (props) => {
  const [isBookmarked, setIsBookmarked] = useState(props.feed.bookmarked);
  const [isLiked, setIsLiked] = useState(props.feed.liked);
  const [likesCnt, setLikesCnt] = useState(props.feed.recipe_likes);

  const token = Cookies.get('token');

  const toogleLike = async () => {

    const flag = isLiked ? '0' : '1';
    const url = process.env.REACT_APP_WEBSITE_URL + '/posts/like';

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
    const url = process.env.REACT_APP_WEBSITE_URL + '/posts/bookmark/' + props.feed._id + '/' + flag;
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

  const viewDetailedRecipe = () => {
    console.log('view '+window.location.href);
    window.location.href = '/post/'+props.feed._id;
  }

  function capitalizeFirstLetter(word) {
    if (typeof word === 'undefined') {
      return ''; // Handle empty string
    }
    if (word.length === 0) {
      return ''; // Handle empty string
    }
    return word[0].toUpperCase();
  }

  const src_var = process.env.REACT_APP_WEBSITE_URL+"/uploads/ca2080db-afce-4f0a-9869-dda96f405ca2.png"
  console.log(src_var);
  return (
    <Container className="recipe-card-container">
      {/* <div className="recipe-card-inner-div"> */}
      <Card sx={{ maxWidth: '100%' }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {capitalizeFirstLetter(props.feed.author_username)}
            </Avatar>
          }
          action={
            <IconButton aria-label="bookmark">
              {
              (isBookmarked) ?
                <div style={{ cursor: 'pointer', width: '4vh', height: '4vh', borderRadius: '25px', }} onClick={toogleBookmark}>
                  <img src={bookmarkImg} alt='like' style={{ maxHeight: '100%', maxWidth: '100%', height: '100%', width: '100%' }} />
                </div> :
                <div style={{ cursor: 'pointer', width: '4vh', height: '4vh', borderRadius: '25px', }} onClick={toogleBookmark}>
                  <img src={unbookmarkImg} alt='like' style={{ maxHeight: '100%', maxWidth: '100%', height: '100%', width: '100%' }} />
                </div>
            }
            </IconButton>
          }
          title={props.feed.recipe_title}
          subheader={"by " +props.feed.author_username}
        />
        <CardMedia
          component="img"
          height="auto"
          image={src_var}
          alt="Paella dish"
        />
        
        <CardContent>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
        <div style={{fontSize: '0.8rem', color: 'blue'}}>10 views</div>&nbsp;
        <div style={{fontSize: '1rem', color: 'blue'}}> | </div>&nbsp;
        <div style={{fontSize: '0.8rem', color: 'blue'}}>{likesCnt + ' Likes'}</div>
        </div>
        <div style={{fontSize: '0.6rem', color: 'blue'}}>26 July 2023</div>
        </div>
          <Typography variant="body2" color="text.secondary">
            {props.feed.recipe_description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            {
              (!isLiked) ?
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ cursor: 'pointer', width: '4vh', height: '4vh', borderRadius: '25px', }} onClick={toogleLike}>
                      <img src={unlikeImg} alt='like' style={{ maxHeight: '100%', maxWidth: '100%', height: '100%', width: '100%' }} />
                    </div>
                    {/* <div></div>
                    <div style={{ color: 'gray', fontSize: '0.8rem' }}>{likesCnt} Likes.</div> */}
                  </div>
                </>
                :
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ cursor: 'pointer', width: '4vh', height: '4vh', borderRadius: '25px', }} onClick={toogleLike}>
                      <img src={likeImg} alt='like' style={{ maxHeight: '100%', maxWidth: '100%', height: '100%', width: '100%' }} />
                    </div>
                    {/* <div></div>
                    <div style={{ color: 'gray', fontSize: '0.8rem' }}>{likesCnt} Likes.</div> */}
                  </div>
                </>
            }
          </IconButton>
          <IconButton aria-label="viewMore">
          <div onClick={viewDetailedRecipe} ><Button style={{ backgroundColor: 'orange', color: 'white', borderRadius: '10px', border: '0px' }}>View</Button></div>
          </IconButton>
        </CardActions>
      </Card>
        {/* <div className='recipe-card-img-div'>
          <img className="recipe-card-img" src={src_var} ></img>
        </div>
        <div className='recipe-card-content-div' >
          <div style={{ fontSize: '1.5rem', color: 'gray', wordWrap: 'break-word', width: '90%' }}><b>{props.feed.recipe_title}</b></div>
          <div style={{ fontSize: '0.9rem' }}>{props.feed.recipe_description}</div>
          <div className="interact-buttons-flex-div" >

            {
              (!isLiked) ?
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <div style={{ cursor: 'pointer', width: '4vh', height: '4vh', borderRadius: '25px', }} onClick={toogleLike}>
                      <img src={unlikeImg} alt='like' style={{ maxHeight: '100%', maxWidth: '100%', height: '100%', width: '100%' }} />
                    </div>
                    <div style={{ color: 'gray' }}>{likesCnt}</div>
                  </div>
                </>
                :
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <div style={{ cursor: 'pointer', width: '4vh', height: '4vh', borderRadius: '25px', }} onClick={toogleLike}>
                      <img src={likeImg} alt='like' style={{ maxHeight: '100%', maxWidth: '100%', height: '100%', width: '100%' }} />
                    </div>
                    <div style={{ color: 'gray' }}>{likesCnt}</div>
                  </div>
                </>
            }
            <div onClick={viewDetailedRecipe} ><Button style={{ backgroundColor: 'orange', color: 'white', borderRadius: '10px', border: '0px' }}>View</Button></div>
          </div> */}
          {/* <div className="recipe-card-bookmark-icon">
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
          <div className='recipe-card-author-tag'><small>Author: <i style={{ color: 'blue' }}>{props.feed.author_username}</i></small></div> */}
        {/* </div> */}
      {/* </div> */}
    </Container>
  );
};

export default RecipeCard;