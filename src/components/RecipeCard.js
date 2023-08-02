import Cookies from "js-cookie";
import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

const RecipeCard = (props) => {
  const [isBookmarked, setIsBookmarked] = useState(props.feed.bookmarked);
  const token = Cookies.get('token');

  const toogleBookmark = async () => {

    const flag = isBookmarked ? '0' : '1';
    const url = 'http://127.0.0.1:3000/posts/bookmark/' + props.feed._id + '/' + flag;
    console.log('Url is '+url);
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token,
      },
    });

    if(!response.ok){
      console.log('There was an error: '+response.error);
    }

    const data  = await response.json();
    console.log(data);
    setIsBookmarked(!isBookmarked);
  }
  return (
    <div>
      <Container>
        <Card style={{ width: '28rem' }}>
          <Card.Img variant="top" src="" />
          <Card.Body>
            <Card.Title>{props.feed.recipe_title}</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="warning">View Recipe</Button>
            <Button variant={!isBookmarked ? "outline-primary" : "primary"} onClick={toogleBookmark}>Bookmark</Button>
            <Button variant="danger">Like</Button>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default RecipeCard;