import React, { useState, useRef, useEffect } from "react";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import CloseButton from 'react-bootstrap/CloseButton';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import backgroundImage from '../img/icons8-delete.svg';
import "../css/create_post.css";
import bubbleSvg from "../img/svgtest.svg"
import Cookies from "js-cookie";
import UploadImgComponent from "./UploadImgComponent";
import MobileNavbar from '../components/MobileNavbar';
import BackNavbar from "./BackNavbar";
import { BACKEND_URL } from "../global";

const CreatePostPage = () => {

  const [steps, setSteps] = useState([{ id: 1, content: 'Add step Description' }]);
  const [ingridients, setIngridients] = useState([]);
  const [ingridientInputValue, setIngridientInputValue] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const title = useRef('');
  const category = useRef('');
  const switchRef = useRef(false);
  const description = useRef('');
  const cookingTime = useRef('');
  const [isMobile, setIsMobile] = useState(false);

  const checkScreenSize = () => {
    setIsMobile(window.innerWidth <= 767);
  };

  const randomNumberGenerator = () => {
    return Math.floor(Math.random() * 1000000000000); // Generates a random 12-digit number
  };

  const handleAddStepsClick = () => {
    const newStep = randomNumberGenerator();
    setSteps([...steps, { id: newStep, content: 'Add step Description' }]);
  };

  const handleRemoveStepClick = (id) => {
    setSteps(steps.filter((step) => step.id !== id));
  };

  const handleRemoveBadgeClick = (id) => {
    setIngridients(ingridients.filter((ingridient) => ingridient.id !== id));
  };

  const handleStepChange = (index, newText) => {
    const updatedSteps = [...steps];
    updatedSteps[index].content = newText;
    setSteps(updatedSteps);
  };

  const autoAdjustTextArea = (event, index) => {
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
    handleStepChange(index, textarea.value);
  };

  const addIngridient = (content) => {
    const newingridient = Math.floor(Math.random() * 10000000000);;
    setIngridients([...ingridients, { id: newingridient, content: content }]);
    setIngridientInputValue('');
  }

  const handleAddIngridientButtonClick = () => {
    addIngridient(ingridientInputValue);
  }

  const handleIngridientInputChange = (e) => {
    if (e.key === 'Enter') {
      addIngridient(ingridientInputValue);
      e.target.value = '';
    }
    setIngridientInputValue(e.target.value);
  }

  const handleCreateRecipeClick = async() => {
    console.log('recipe title is '+title.current.value);
    const token = Cookies.get('token');
    const handleUploadImgResp = await handleUpload(token);

    if(handleUploadImgResp.error){
      console.log(handleUploadImgResp.error);
      return;
    }
    console.log('Ret files:', handleUploadImgResp);
    let recipePictures = [];

    handleUploadImgResp.map((item) => {
      recipePictures = [...recipePictures, item];
    });
    console.log('pic array ',recipePictures);

    const response = await fetch(BACKEND_URL + '/posts/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token,
      },

      body: JSON.stringify(
        { 
          ispublic: isPublic,
          recipe_steps: steps.map(item => item.content),
          recipe_title: title.current.value,
          recipe_ingredients: ingridients.map(item => item.content),
          recipe_category: category.current.value,
          recipe_description: description.current.value,
          recipe_picture: handleUploadImgResp.map(item => item),
          recipe_time: cookingTime.current.value,
        }),
    });
    const data = await response.json();

    if(!response.ok){
      console.log(data.error);
      return;
    }
    console.log(data);
    window.location.href = '/';
  }

  const handleUpload = async (token) => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    try {
      const response = await fetch(BACKEND_URL + '/posts/img/upload', {
        method: 'POST',
        headers: {
          'authorization': token,
        },
        body: formData,
      });

      const data = await response.json();

      if(!response.ok){
        return data;
      }
      setFiles([]);
      setSelectedFiles([]);
      return data.filePaths;
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  const handleSwitchChange = () => {
    setIsPublic(switchRef.current.checked);
  }

  useEffect(() => {
    checkScreenSize();
  }, []);

  return (
    <>
      {isMobile?<BackNavbar />: <></>}
      <div className="create-post-outer-container">
        <Container >
          <div className="create-post-divs" style={{boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',borderRadius: '20px',padding: '2.5%'}}>
            <div><h3 style={{ color: 'gray' }}>Basic info:</h3></div>
            <div style={{ padding: "1%" }}>
              <FloatingLabel
                controlId="floatingInput"
                label="Recipe Title"
                className="mb-3"
              >
                <Form.Control type="text" placeholder="" ref = {title}/>
              </FloatingLabel>
            </div>

            <div style={{ padding: "1%" }}>
              <FloatingLabel controlId="floatingSelect" label="Category">
                <Form.Select aria-label="Floating label select example" ref = {category}>
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
              </FloatingLabel>
            </div>

            <div style={{ padding: "1%" }}>
              <FloatingLabel controlId="floatingTextarea1" label="Description">
                <Form.Control
                  as="textarea"
                  placeholder=""
                  style={{ height: '100px' }}
                  ref = {description}
                />
              </FloatingLabel>
            </div>

            <div style={{ padding: "1%" }}>
              <FloatingLabel
                controlId="floatingInput"
                label="Cooking Time"
                className="mb-3"
              >
                <Form.Control type="text" placeholder="" ref = {cookingTime}/>
              </FloatingLabel>
            </div>


            <div style={{ padding: "1%" }}>
              <FloatingLabel>
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label="Public"
                  ref = {switchRef}
                  onChange={handleSwitchChange}
                />
              </FloatingLabel>
            </div>
          </div>

          <div className="create-post-divs" style={{ marginTop: "4%",boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',borderRadius: '20px',padding: '2.5%' }}>
            <div><h3 style={{ color: 'gray' }}>Add Steps:</h3></div>

            <div id='mydiv' style={{ padding: "1%" }}>
              {steps.map((step, index) => (
                <div key={`step_${step.id}`}>
                  <FloatingLabel
                    controlId={`floatingTextarea${step.id}`}
                    label={`Step ${index + 1}`}
                    className='mt-2'
                  >
                    <Form.Control
                      as="textarea"
                      rows={1}
                      value={step.content}
                      onChange={(e) => autoAdjustTextArea(e, index)}
                      onBlur={(e) => autoAdjustTextArea(e, index)}
                      style={{ resize: 'none', overflow: 'hidden', minHeight: '37px', borderRadius: '5px' }}
                    />
                  </FloatingLabel>
                  <Button onClick={() => handleRemoveStepClick(step.id)}
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
              <div style={{ padding: "1%" }}><Button className="create-post-button" onClick={handleAddStepsClick} style={{ color: 'white', border: "0px" }}>Add Step</Button></div>
            </div>
          </div>

          <div className="create-post-divs" style={{ marginTop: "4%",boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',borderRadius: '20px',padding: '2.5%' }}>
            <div><h3 style={{ color: 'gray' }}>Add ingredient:</h3></div>
            <div style={{ padding: "1%" }}>
              <div style={{ width: "100%", display: "flex", justifyContent: "space-evenly" }}>
                <div style={{ width: "80%", padding: "1%" }}><Form.Control type="text" placeholder="Normal text" value={ingridientInputValue} onChange={handleIngridientInputChange} onKeyDown={handleIngridientInputChange} /></div>
                <div style={{ width: "20%", padding: "1%" }}><Button className="create-post-button" onClick={handleAddIngridientButtonClick} style={{ color: 'white', border: "0px" }}>Add</Button></div>
              </div>
            </div>
            <div style={{ padding: "1%" }}>
              {ingridients.map((ingridient) => {
                return (
                  <>
                    <div key={`ingridient_${ingridient.id}`} style={{ maxWidth: '100%', overflow: 'auto', margin: '3px', backgroundColor: 'orange', alignItems: "center", padding: "0.5% 1% 1% 3%", borderRadius: "25px", display: 'inline-block' }}>
                      <div style={{ backgroundColor: "orange", color: "white", display: "inline-block" }}>
                        <span>{ingridient.content}</span>
                      </div>&nbsp;&nbsp;
                      <div style={{ display: "inline-block" }}>
                        <CloseButton variant="white" onClick={() => { handleRemoveBadgeClick(ingridient.id) }} />&nbsp;&nbsp;
                      </div>
                    </div>
                  </>
                )
              })}
            </div>
          </div>

          <div className="create-post-divs" style={{ marginTop: "4%", boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',borderRadius: '20px',padding: '2.5%' }}>
            <UploadImgComponent files={files} selectedFiles={selectedFiles} setFiles={setFiles} setSelectedFiles={setSelectedFiles}/>
          </div>

          <div className="create-post-divs" style={{ marginTop: "4%" }}>
            <Button className="create-post-button" style={{ color: 'white', border: '0px' }} onClick={handleCreateRecipeClick}>Create Recipe Post</Button>
          </div>
        </Container>
      </div>

    </>
  )
}

export default CreatePostPage;
