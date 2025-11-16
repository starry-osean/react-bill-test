import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import dayjs from "dayjs";
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
        },
        deleteBill(state,action){
            state.billList=state.billList.filter(item=>item.id!==action.payload)
        },
    }
});

const { setBillList,addBill, deleteBill} = billstore.actions;

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
// 删除账单 - 新增异步操作
const deleteBillList = (billId) => {
    return async (dispatch) => {
        try {
            // 调用API删除后端数据
           await axios.delete(`http://localhost:8800/data/${billId}`);
            // 再更新前端状态
            dispatch(deleteBill(billId));
        } catch (error) {
            console.error('删除账单失败:', error);
            alert('删除失败，请重试');
        }
    };
};

export { getBillList ,addBillList,deleteBillList};

const reducer = billstore.reducer;
export default reducer;