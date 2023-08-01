import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

const RecipeCard = (props) => {
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
            <Button variant="primary">Bookmark</Button>
            <Button variant="danger">Like</Button>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default RecipeCard;