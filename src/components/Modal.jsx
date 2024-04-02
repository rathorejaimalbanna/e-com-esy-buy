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
  const email = useRef();
  const phone = useRef();
  const city = useRef();

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Prepare data object with updated contact information
    const data = {
      id: props.modalData.id,
      name: name.current.value,
      city: city.current.value,
      phone: phone.current.value,
      email: email.current.value
    };
    dispatch(updateProductAsync(data)); // Dispatch action to update contact
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
            {/* Form group for email */}
            <Form.Group as={Col} md="6" controlId="validationCustomUsername">
              <Form.Label>Price</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  aria-describedby="inputGroupPrepend"
                  ref={email}
                  defaultValue={props.modalData.price}
                  required
                />
                <Form.Control.Feedback type="invalid">Please provide a valid email.</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            {/* Form group for city */}
            <Form.Group as={Col} md="6" controlId="validationCustom03">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="City"
                ref={city}
                defaultValue={props.modalData.category}
                required
              />
              <Form.Control.Feedback type="invalid">Please provide a city.</Form.Control.Feedback>
            </Form.Group>
            {/* Form group for phone */}
            <Form.Group as={Col} md="6" controlId="validationCustom05">
              <Form.Label>ImageUrl</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Phone"
                ref={phone}
                defaultValue={props.modalData.image}
                required
              />
              <Form.Control.Feedback type="invalid">Please provide a valid phone number.</Form.Control.Feedback>
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
