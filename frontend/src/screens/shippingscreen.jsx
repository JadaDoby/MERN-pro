import React, { useState } from 'react';
import { Form, Button } from '../components/FormContainer';
import { UseDispatch, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../slices/cartSlice';
import{FormContainer}from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = () => {
  
  const cart=useSelector((state)=> state.cart);
  const {shippingAddress}=cart;



  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city ||'');
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode ||'');
  const [country, setCountry] = useState(shippingAddress?.setCountry ||'');
  

  const navigate=useNavigate();
  const dispatch=useDispatch();

  const submitHandler= (e) =>{
    e.preventDefault();
      dispatch(saveShippingAddress({address,coty,postalCode}));
      navigate('/payment');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address' className='my-2'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter address'
            value={address}  // Corrected 'values' to 'value'
            onChange={(e) => setAddress(e.target.value)}  // Corrected 'omChange' to 'onChange'
          ></Form.Control>
        </Form.Group>
       
        <Form.Group controlId='city' className='my-2'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter city'
            value={address}  // Corrected 'values' to 'value'
            onChange={(e) => setCity(e.target.value)}  // Corrected 'omChange' to 'onChange'
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='postalcCode' className='my-2'>
          <Form.Label>postalcCode</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter postal code'
            value={address}  // Corrected 'values' to 'value'
            onChange={(e) => setPostalCode(e.target.value)}  // Corrected 'omChange' to 'onChange'
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='coutry' className='my-2'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Country'
            value={address}  // Corrected 'values' to 'value'
            onChange={(e) => setAddress(e.target.value)}  // Corrected 'omChange' to 'onChange'
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary' className='my-2'>
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
