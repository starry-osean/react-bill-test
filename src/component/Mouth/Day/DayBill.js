import classNames from "classnames";
import './index.scss'
import { useMemo, useState } from "react";
import dayjs from "dayjs";

const DayBill = ({ billList = [], date }) => { 
  const [visible, setVisible] = useState(false); // 移到组件顶层

  const dayResult = useMemo(() => {
    if (!billList || !Array.isArray(billList)) {
      return {
        income: 0,
        pay: 0,
        total: 0
      };
    }

    const payItems = billList.filter(item => item && item.money > 0);
    const incomeItems = billList.filter(item => item && item.money < 0);
    
    const pay = payItems.reduce((sum, item) => sum + item.money, 0);
    const income = incomeItems.reduce((sum, item) => sum + Math.abs(item.money), 0);
    
    return {
      income,
      pay,
      total: pay + income
    };
  }, [billList]);

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
        
        {/* 只在展开时显示概览 */}
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
      
      {/* 只在展开时显示账单列表 */}
      {visible && (
        <div className="billList">
          {billList.map(item => {
            return (
              <div className="billItem" key={item.id || item.key}>
                <div className="detail">
                  <div className="category">{item.category}</div>
                  <div className="description">{item.description}</div>
                  <div className="time">{dayjs(item.date).format('HH:mm')}</div>
                </div>
                <div className={`amount ${item.money > 0 ? 'income' : 'expense'}`}>
                  {item.money > 0 ? '+' : ''}¥{Math.abs(item.money).toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DayBill;