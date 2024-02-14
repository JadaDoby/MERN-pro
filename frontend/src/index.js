// Your main file (e.g., index.js)

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import App from './App';
import reportWebVitals from './reportWebVitals';
import PrivateRoute from './components/PrivateRoute';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';


import rootReducer from './reducers'; // replace with the actual path to your root reducer

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/product/:id' element={<ProductScreen />} />
      <Route path='/cart' element={<CartScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='' element={<PrivateRoute/>} >
        <Route path='shipping'element={<ShippingScreen/>}/>
        <Route path='payment' element={<PaymentScreen/>}/>
        <Route path='/placeorder' element={<PlaceOrderScreen/>}/>
      </Route>
</Route>
  )
);


const store = configureStore({
  reducer: rootReducer,
 
});



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <Provider store={store}>
        <App />
      </Provider>
    </RouterProvider>
  </React.StrictMode>
);

reportWebVitals();
