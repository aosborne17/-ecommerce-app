import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { saveShippingAddress } from '../actions/cartActions';

import CheckoutSteps from '../components/CheckoutSteps';
const ShippingScreen = ({ history }) => {
  const shippingAddress = useSelector((state) => state.cart.shippingAddress);

  // Setting the state for all the variables that will have our shipping information
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    // dont want the app to refresh
    e.preventDefault();
    // now we dispatch the action to save the address to the store and local storage
    dispatch(
      saveShippingAddress({
        address: address,
        city: city,
        postalCode: postalCode,
        country: country,
      })
    );
    // now we can push the user to the payment step
    history.push('/payment');
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter address...'
            // if the address is in local storage, it will be shown to the user
            value={address}
            // As the user types in their address, the state will be updated
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
      </Form>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter city...'
            // if the address is in local storage, it will be shown to the user
            value={city}
            // As the user types in their address, the state will be updated
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
      </Form>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='postalCode'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type='postalCode'
            placeholder='Enter postal code...'
            // if the address is in local storage, it will be shown to the user
            value={postalCode}
            // As the user types in their address, the state will be updated
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>
      </Form>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='address'
            placeholder='Enter country...'
            // if the address is in local storage, it will be shown to the user
            value={country}
            // As the user types in their address, the state will be updated
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='dark'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
