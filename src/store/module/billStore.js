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
        },
        addBill (state, action) {
        state.billList.push(action.payload)
    }
    }
});

const { setBillList,addBill } = billstore.actions;

const getBillList = () => {
    return async (dispatch) => {
        const res = await axios.get('http://localhost:8800/data');
        dispatch(setBillList(res.data));
    };
};
const addBillList = (data) => {
  return async (dispatch) => {
    // 编写异步请求
    const res = await axios.post('http://localhost:8800/data', data)
    // 触发同步reducer
    dispatch(addBill(res.data))
  }
}

export { getBillList ,addBillList};

const reducer = billstore.reducer;
export default reducer;