import { configureStore } from '@reduxjs/toolkit'
import billReducer from './module/billStore'
const store=configureStore({
    reducer:{
        bill:billReducer
    }
})
export default store
