import{configureStore} from '@reduxjs/toolkit';
import{apiSlice} from './slices/apiSlice';
import CartSliceReducer from './slices/cartSlice';
import authSliceReducer from './slices/authSlice';

const store=configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
        cart:CartSliceReducer,
        auth: authSliceReducer,
    },
    middleware:(getDefaultMiddleware)=> buildGetDefaultMiddleware().concat
    (apiSlice.middleware),
    devtools:true
});

export default store;

