import { configureStore } from '@reduxjs/toolkit'
import billReducer from './module/billStore'
import userReducer from './module/user'
const store=configureStore({
    reducer:{
        bill:billReducer,
        token:userReducer
    }
})
export default store
