import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetOrderDetailsQuery, usePayOrderMutation, 
  useGetPayPalClientIdQuery, useDeliverOrderMutation} from '../slices/ordersApiSlice';
import { Row, Col, ListGroup, Image, Button, Card } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const [deliverOrder,{isLoading:loadingDeliver}]=
  useDeliverOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: payPal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && payPal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'clientid': payPal.clientId,
            currency: 'USD',
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      if (order && !order.isPaid) {
        if (!window.payPal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, payPal,paypalDispatch,loadingPayPal,errorPayPal]);

  function onApprove (data,actions) {
    return actions.order.capture().then(async function(details){
    try{
      await payOrder({orderId,details});
      refetch();
      toast.success('payment sucessful');
    }catch (error){
      toast.error(err?.data?.message || err.message);
    }
  });
}
  
  async function onApproveTest () {
    await payOrder({orderId,details:{payer:{}}});
    refetch();
    toast.success('payment sucessful');
  }

  function onError (err) {
    toast.error(err.message);
  }

  function createOrder (data,actions) {
    return actions.order.create({
      purchase_units: [
        {
          amount:{
            value:order.totalPrice,
          },
        },
      ] ,  
     })
     .then((orderId)=> {
      return orderId;
    });
  }

   const deliverOrderHandler=async()=>{
    try{
      await deliverHandler(orderId);
      refetch();
      toast.success('Order delivered');
    } catch(err){
      toast.error(err?.data?.message || err.message);
    }
   }




  return isLoading ? <Loader /> : error ? <Message variant="danger" /> : (
    <>
      <h1> Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            {/* ... other content ... */}
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                {/* ... other summary items ... */}
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {isPending ? <Loader /> : (
                    <div>
                      {/* <Button 
                      onClick={onApprovedTest} 
                      style={{ marginBottom: '10px' }}>
                        Test Pay Order</Button> */}
                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                        ></PayPalButtons>
            
                    </div>
                  )}
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader/>}

              {userInfo && 
              userInfo.isAdmin &&
               order.isPaid &&
              !order.isDeliivered &&(
                <ListGroup.Item>
                  <Button type='button' className='btn btn-block'
                  onClick={deliverOrderHandler}>
                     Mark As Delivered
                    </Button>
                    </ListGroup.Item>
                       )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
