import React from "react";
import CustomCarousel from "./CustomCarousel";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { Card, Col, Row } from "react-bootstrap";
import unlikeImg from '../img/icons8-heart-unliked.png';
import likeImg from '../img/icons8-heart-liked.png';
import bookmarkImg from '../img/icons8-bookmarked.png';
import unbookmarkImg from '../img/icons8-unbookmark.png'
import '../css/recipe_detail.css';
import watchIconImg from '../img/icons8-time-50.png';
import dishIconImg from '../img/icons8-dish-50.png';

const RecipeDetail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [postDetail, setPostDetail] = useState({});
  const { id } = useParams();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCnt, setLikesCnt] = useState(0);
  const token = Cookies.get('token');


  const fetchPostDetails = async () => {
    setIsLoading(true);
    try {
      const token = Cookies.get('token');

      const response = await fetch('http://127.0.0.1:3000/posts/getpost/' + id, {
        method: 'GET',
        headers: {
          'authorization': token,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        console.log(data.error);
        return;
      }
      setPostDetail(data);
      setLikesCnt(data.post.recipe_likes);
    } catch (error) {
      console.error('Error fetching feeds:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const isLikedAndIsBookmarked = async () => {
    setIsLoading(true);
    try {
      const token = Cookies.get('token');

      const response = await fetch('http://127.0.0.1:3000/posts/isliked/isbookmarked/' + id + '/' + Cookies.get('username'), {
        method: 'GET',
        headers: {
          'authorization': token,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        console.log(data.error);
        return;
      }
      setIsLiked(data.is_liked);
      setIsBookmarked(data.is_bookmarked);
    } catch (error) {
      console.error('Error fetching feeds:', error);
    } finally {
      setIsLoading(false);
    }

  }

  const toogleLike = async () => {

    const flag = isLiked ? '0' : '1';
    const url = 'http://127.0.0.1:3000/posts/like';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token,
      },
      body: JSON.stringify({ 'postId': postDetail.post._id, 'likeFlag': flag, }),
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
    const url = 'http://127.0.0.1:3000/posts/bookmark/' + postDetail.post._id + '/' + flag;
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


  useEffect(() => {
    fetchPostDetails();
    isLikedAndIsBookmarked();
  }, []);

  return (
    <>
      {console.log(JSON.stringify(postDetail))}
      <div style={{ display: 'flex', position: 'relative', padding:'2%'}}>

        <div className="right-half-div">

          <div style={{boxShadow: '0 4px 6px rgba(0, 0, 0, 0.4)'}}>
            <CustomCarousel />
          </div>

          <div className="intro-content" style={{ width: '100%', marginTop: '1.5vh' }}>

            <div className='author-title-intro-content-flex-div' style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
              <div style={{ fontSize: '1.5rem', color: 'black', width: '70%' }}>
                {isLoading ? <>Loading...</> : postDetail.post ? (
                  <>
                  <div style={{display:'flex',justifyContent:'flex-start', gap:'2vw', alignItems:'center'}}>
                  <div xs={2}><img src={dishIconImg}/></div>
                  <div xs={10} style={{fontSize:'1.5rem'}}><strong>{postDetail.post?postDetail.post.recipe_title:<></>}</strong></div>
                </div>

                  </>
                ) : (
                  <strong>No recipe available.</strong>
                )}
              </div>
              <div style={{color:'gray'}}>Author: &nbsp;<i style={{ color: 'blue' }}>{postDetail.post ? postDetail.post.author_username : <></>}</i></div>
            </div>

            <div className="likes-bookmark-icon-intro-div" style={{ padding: '1%', display: 'flex', justifyContent: 'flex-end', gap: '4vw', alignItems: 'center' }}>
              <div className="likes-div">
                {
                  (!isLiked) ?
                    <>
                      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <div style={{ color: 'gray', fontSize: '1.5rem' }}><strong>{likesCnt}</strong></div>&nbsp;&nbsp;
                        <div style={{ cursor: 'pointer', width: '4vh', height: '4vh', borderRadius: '25px', }} onClick={toogleLike}>
                          <img src={unlikeImg} alt='like' style={{ maxHeight: '100%', maxWidth: '100%', height: '100%', width: '100%' }} />
                        </div>
                      </div>
                    </>
                    :
                    <>
                      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ color: 'gray', fontSize: '1.5rem' }}><strong>{likesCnt}</strong></div>&nbsp;&nbsp;
                        <div style={{ cursor: 'pointer', width: '4vh', height: '4vh', borderRadius: '25px', }} onClick={toogleLike}>
                          <img src={likeImg} alt='like' style={{ maxHeight: '100%', maxWidth: '100%', height: '100%', width: '100%' }} />
                        </div>
                      </div>
                    </>
                }
              </div>
              <div className="bookmark-div">
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
            </div>

            <hr />
            <div className="recipe-des">
              <p style={{fontSize:'1.2rem'}}><strong>Description</strong></p>
              <p>
                {postDetail.post ? postDetail.post.recipe_description : <></>}
              </p>
              <p>
                <div style={{display:'flex',justifyContent:'flex-start', gap:'2vw', alignItems:'center'}}>
                  <div xs={2}><img src={watchIconImg}/></div>
                  <div xs={10} style={{color:'Blue'}}><strong>TIME : </strong>{postDetail.post_in_detail? postDetail.post_in_detail.recipe_time:<></>}</div>
                </div>
              </p>
            </div><hr />
          </div>

          <div className="ingridient-div">
            <Card style={{border:'0px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.4)', width:'100%', color:'white', backgroundColor:'orange', textAlign:'center', padding:'1% 0% 1% 0'}}>
              <Card.Title style={{marginTop:'2vh'}}>Ingridients</Card.Title>
              <Card.Body style={{display:'flex', flexDirection:'column', gap:'1vh'}}>
                {
                  postDetail.post?
                    postDetail.post_in_detail.recipe_ingredients.map((ingridient, index)=>{
                      return (
                        <>
                        <div key={index} style={{borderRadius:'14px', backgroundColor:'white', color:'gray', padding:'4% 0.6%'}}>
                          {ingridient}
                        </div>
                        </>
                      )
                    }):
                    <></>
                }
              </Card.Body>
            </Card>
          </div>

          <div className='steps' style={{ width: '100%' ,padding:'2% 3% 0 3%', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.4)'}}>
            <div style={{ fontSize: '1.2rem', color:'black'}}><strong>Steps</strong></div><br />
            <Row>
              {
                postDetail.post_in_detail ?
                  postDetail.post_in_detail.recipe_steps.map((step, index) => {
                    return (
                      <>
                        <Col lg={6} md={12} key={index}>
                          <Card style={{ border: '0px' }}>
                            <Card.Title ><strong style={{backgroundColor:'orange', color:'white', borderRadius:'13px', width:'auto', padding:'2%', fontSize:'0.8rem'}}>Step {index + 1}</strong></Card.Title>
                            <Card.Body>{step}</Card.Body>
                          </Card>
                        </Col>
                      </>
                    )
                  })
                  :
                  <></>
              }
            </Row>
          </div>
        </div>
      </div>
    </>
  )
}

export default RecipeDetail;