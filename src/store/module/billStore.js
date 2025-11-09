import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const billstore = createSlice({
    name: 'bill',
    initialState: {
        billList: []
    },
    reducers: { 
        setBillList(state, action) {
            state.billList = action.payload;
        }
    }
});

const { setBillList } = billstore.actions;

const getBillList = () => {
    return async (dispatch) => {
        const res = await axios.get('http://localhost:8800/data');
        dispatch(setBillList(res.data));
    };
};

export { getBillList };

const reducer = billstore.reducer;
export default reducer;