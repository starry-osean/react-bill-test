import { createSlice } from "@reduxjs/toolkit"
import request from "../../utils/request.ts"; 

const useStore = createSlice({
    name: 'user', 
    initialState: {
        token: ''
    },
    reducers: {
        setToken(state, action) {
            state.token = action.payload
        }
    }
})

const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        const res = await request.post('/authorizations', loginForm) 
        //存token
        dispatch(setToken(res.data.token))
        console.log(res.data.token);
        
    }
}

const { setToken } = useStore.actions
const userReducer = useStore.reducer

export { setToken, fetchLogin }
export default userReducer