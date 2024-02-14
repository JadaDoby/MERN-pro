import React, { useEffect } from 'react'
import{useState}from 'react'
import {Form, Button, Col}from 'react-bootstrap'
import {useDispatch,useSelector}from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import {savePaymentMethod}from '../slices/cartSlice'
import { useNavigate } from 'react-router-dom'

const PaymentScreen = () => {
    const[paymentMethod,setPaymentMethod]=useSate('PayPal');

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const cart=useSelector((state) => state.cart);
    const{shippingAddress}=cart;

        useEffect(()=>{
            if(!shippingAddress)
            naviagte('/shipping');
        }, [shippingAddress,navigate]);

        const submitHandler=(e) =>{
            e.preventDefault();
            dispatch(savePaymentMethod(paymentMethod));
            navigate('/placeorder');
        };
 
    return (
     <FormContainer>
        <CjeckoutSteos step1 step2 step3 />
        <h1> Payment Methods </h1>
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='lengend'>Select Method</Form.Label>
                <Col>
                <Form.Check>
                    type='radio'
                    className='my-2'
                    label='PayPal or Credit Card'
                    id='PayPal'
                    name='setPaymentMethod'
                    value='PayPal'
                    checked
                    onChange={(e)=> setPaymentMethod(e.target.value)}
                </Form.Check>
                </Col>
            </Form.Group>
            <Button typpe ='submit' variant='primary'>
             Continue
             </Button>
        </Form>
     </FormContainer>


    )


}

export default PaymentScreen