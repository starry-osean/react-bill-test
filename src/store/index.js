import { configureStore } from '@reduxjs/toolkit'
import billReducer from './module/billStore'
import userReducer from './module/user'
const store=configureStore({
    reducer:{
        bill:billReducer,
        user:userReducer
    }
})
export default store
