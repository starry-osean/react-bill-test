import classNames from "classnames";
import './index.scss'
import { useMemo, useState } from "react";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { deleteBill,deleteBillList} from '../../../store/module/billStore'
const DayBill = ({ 
  billList = [], 
  date
}) => { 
  const [visible, setVisible] = useState(false);
  const dispatch=useDispatch();
  const dayResult = useMemo(() => {
    // ... 保持原来的计算逻辑不变
    if (!billList || !Array.isArray(billList)) {
      return {
        income: 0,
        pay: 0,
        total: 0
      };
    }

    const payItems = billList.filter(item => item && item.money > 0);
    const incomeItems = billList.filter(item => item && item.money < 0);
    
    const income = payItems.reduce((sum, item) => sum + item.money, 0);
    const pay= incomeItems.reduce((sum, item) => sum + Math.abs(item.money), 0);
    
    return {
      income,
      pay,
      total: pay + income
    };
  }, [billList]);
  console.log('day',dayResult);
  
  // 删除单条账单 - 使用异步版本
  const handleDeleteBill = async (billId) => {
    if (window.confirm('确定要删除这条账单吗？')) {
        console.log('删除账单 ID:', billId);
        await dispatch(deleteBillList(billId)); 
    }
  };

  return (
    <div className={classNames('dayBill')}>  
      <div className="header">
        <div className="date" onClick={() => setVisible(!visible)}>
          <span className="text">
            {date ? dayjs(date).format('MM月DD日') : '账单'}
          </span>
          <span className={classNames('arrow', { open: visible })}>
            ▼
          </span>
        </div>
        
        <div className="overview">
          <div className="pay">
            <span className="money">  
              ¥{dayResult.pay.toFixed(2)}  
            </span>
            <span className="type">
              支出
            </span>
          </div>
          <div className="income">
            <span className="money">
              ¥{dayResult.income.toFixed(2)}
            </span>
            <span className="type">
              收入
            </span>
          </div>
          <div className="balance">
            <span className="money">
              ¥{dayResult.total.toFixed(2)}
            </span>
            <span className="type">
              结余
            </span>
          </div>
        </div>
      </div>

     

      {/* 账单列表 */}
      {visible && (
        <div className="billList">
          {billList.map(item => {
            return (
              <div className="billItem" key={item.id || item.key}>
                <div className="detail">
                  <div className="category">{item.category||item.useFor}</div>
                  <div className="description">{item.description}</div>
                  <div className="time">{dayjs(item.date).format('MM-DD')}</div>
                </div>
                <div className="amountContainer">
                  <div className={`amount ${item.money > 0 ? 'income' : 'expense'}`}>
                    {item.money > 0 ? '+' : ''}¥{Math.abs(item.money).toFixed(2)}
                  </div>
                  
                </div>
                <button 
                    className="deleteBillBtn"
                    onClick={() => handleDeleteBill(item.id||item.key)}
                    title="删除此账单"
                  >
                    ×
                  </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DayBill;