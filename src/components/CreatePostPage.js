import React, { useState } from "react";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import backgroundImage from '../img/icons8-delete.svg';


const CreatePostPage = () => {

  const [ingredients, setIngredients] = useState([{ id: 1, content: 'Add step Description' }]);

  const randomNumberGenerator = () => {
    return Math.floor(Math.random() * 1000000000000); // Generates a random 12-digit number
  };

  const handleAddStepsClick = () => {
    const newIngredientId = randomNumberGenerator();
    setIngredients([...ingredients, { id: newIngredientId, content: 'Add step Description' }]);
  };

  const handleRemoveStepClick = (id) => {
    setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
  };

  const handleIngredientChange = (index, newText) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index].content = newText;
    setIngredients(updatedIngredients);
  };

  const autoAdjustTextArea = (event, index) => {
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
    handleIngredientChange(index, textarea.value);
  };

  return (
    <>
      <h3>Create a post page</h3>
      <Container>
        <FloatingLabel
          controlId="floatingInput"
          label="Recipe Title"
          className="mb-3"
        >
          <Form.Control type="text" placeholder="" />
        </FloatingLabel><br></br>

        <FloatingLabel controlId="floatingTextarea1" label="Description">
          <Form.Control
            as="textarea"
            placeholder=""
            style={{ height: '100px' }}
          />
        </FloatingLabel><br></br>

        <FloatingLabel controlId="floatingSelect" label="Category">
          <Form.Select aria-label="Floating label select example">
            <option>None</option>
            <option value="veg">Veg</option>
            <option value="green-vegies">Green Vegies</option>
            <option value="sweets">Sweets</option>
            <option value="non-veg">Non Veg</option>
            <option value="salads">Salads</option>
            <option value="rice-biryani">Rice & Biryani</option>
            <option value="street-food">Street Food</option>
            <option value="franchise">Franchise</option>
            <option value="south-indian">South Indian</option>
          </Form.Select>
        </FloatingLabel><br></br>

        <div><h3>Add Steps:</h3></div>

        <div id='mydiv' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {ingredients.map((ingredient, index) => (
            <div key={`ingredient_${ingredient.id}`} style={{ display: 'flex', alignItems: 'center' }}>
              <FloatingLabel
                controlId={`floatingTextarea${ingredient.id}`}
                label={`Step ${index + 1}`}
                className='mt-2'
              >
                <Form.Control
                  as="textarea"
                  rows={1}
                  value={ingredient.content}
                  onChange={(e) => autoAdjustTextArea(e, index)}
                  onBlur={(e) => autoAdjustTextArea(e, index)}
                  style={{ resize: 'none', overflow: 'hidden', minHeight: '37px', borderRadius: '5px'}}
                />
              </FloatingLabel>
              <Button  onClick={() => handleRemoveStepClick(ingredient.id)}
              style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: 'white',
                border: '0px',
                width: '5vh',
                height: '5vh',
              }}
              ></Button>
            </div>
          ))}
          <Button variant='warning' onClick={handleAddStepsClick}>Add Step</Button>
        </div><br></br>

        <FloatingLabel>
          <Form.Check // prettier-ignore
            type="switch"
            id="custom-switch"
            label="Public"
          />
        </FloatingLabel>
      </Container>
    </>
  )
}

export default CreatePostPage;
