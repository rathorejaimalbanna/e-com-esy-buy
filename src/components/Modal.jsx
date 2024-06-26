import { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { updateProductAsync } from '../Redux/productReducer';

// Component for updating contact details in a modal
function UpdateModal(props) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(true); // State to manage modal visibility
  const [validated, setValidated] = useState(false); // State to manage form validation
  const handleClose = () => {
    setShow(false); // Close modal
    props.handleClose(); // Call parent handleClose function
  };
  const name = useRef();
  const category = useRef();
  const image = useRef();
  const price = useRef();

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Prepare data object with updated product information
    const data = {
      id: props.modalData.id,
      name: name.current.value,
      price: price.current.value,
      image: image.current.value,
      category: category.current.value
    };
    dispatch(updateProductAsync(data)); // Dispatch action to update product
    setValidated(true); // Set form validation to true
    handleClose(); // Close modal
  };

  // Render JSX
  return (
    <>
      {show &&
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            {/* Form group for name */}
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Name"
                ref={name}
                defaultValue={props.modalData.name}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            {/* Form group for price */}
            <Form.Group as={Col} md="6" controlId="validationCustomUsername">
              <Form.Label>Price</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="number" // Changed type to 'number' assuming it's a numeric value
                  placeholder="Price"
                  aria-describedby="inputGroupPrepend"
                  ref={price}
                  defaultValue={props.modalData.price}
                  required
                />
                <Form.Control.Feedback type="invalid">Please provide a valid price.</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            {/* Form group for category */}
            <Form.Group as={Col} md="6" controlId="validationCustom03">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="category"
                ref={category}
                defaultValue={props.modalData.category}
                required
              />
              <Form.Control.Feedback type="invalid">Please provide a category.</Form.Control.Feedback>
            </Form.Group>
            {/* Form group for image URL */}
            <Form.Group as={Col} md="6" controlId="validationCustom05">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="url" // Changed type to 'url' assuming it's a valid URL
                placeholder="Image URL"
                ref={image}
                defaultValue={props.modalData.image}
                required
              />
              <Form.Control.Feedback type="invalid">Please provide a valid Image URL.</Form.Control.Feedback>
            </Form.Group>
          </Row>
          {/* Button to submit changes */}
          <Button type="submit">Save Changes</Button>
          {/* Button to cancel */}
          <Button onClick={handleClose} style={{backgroundColor:"red",marginLeft:"10px"}}>Cancel</Button>
        </Form>
      }
    </>
  );
}

export default UpdateModal;
