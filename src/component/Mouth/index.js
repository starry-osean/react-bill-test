import { NavBar, DatePicker } from "antd-mobile";
import { useMemo, useState } from "react";
import './index.scss'
import { useSelector } from "react-redux";
import _ from 'lodash';
import dayjs from "dayjs";
import DayBill from "./Day/DayBill";

const Month = () => {
  const [dateVisible, setDateVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const billList = useSelector(state => state.bill.billList);

  // 格式化选中的日期为 YYYY-MM
  const formattedDate = dayjs(selectedDate).format('YYYY-MM');
  
  // 按月份分组账单
  const monthGroup = useMemo(() => {
    return _.groupBy(billList, (item) => dayjs(item.date).format('YYYY-MM'));
  }, [billList]);
 
  

  // 获取当前选中月份的统计数据
  const currentMonthStats = useMemo(() => {
    const currentMonthBills = monthGroup[formattedDate] || [];
    
    const income = currentMonthBills
      .filter(item => item.money > 0)
      .reduce((sum, item) => sum + item.money, 0);
    
    const expense = currentMonthBills
      .filter(item => item.money < 0)
      .reduce((sum, item) => sum + Math.abs(item.money), 0);
    
    const balance = income - expense;
    
    return {
      income,
      expense,
      balance,
      bills: currentMonthBills
    };
  }, [monthGroup, formattedDate]);

  // 所有月份的汇总数据（用于显示月份列表）
  const monthSummary = useMemo(() => {
    return Object.entries(monthGroup).map(([month, bills]) => {
      const income = bills
        .filter(item => item.money > 0)
        .reduce((sum, item) => sum + item.money, 0);
      
      const expense = bills
        .filter(item => item.money < 0)
        .reduce((sum, item) => sum + Math.abs(item.money), 0);
      
      const balance = income - expense;
      
      return {
        month,
        income,
        expense,
        balance,
        count: bills.length
      };
    }).sort((a, b) => b.month.localeCompare(a.month)); // 按月份倒序排列
  }, [monthGroup]);
   const dayGroup=useMemo(() => {
    const GroupData=_.groupBy(currentMonthStats.bills, (item) => dayjs(item.date).format('YYYY-MM-DD'));
    const keys=Object.keys(GroupData)
    return {
      keys,
      GroupData
    }
  }, [currentMonthStats.bills]);
  console.log('is',dayGroup);
  const onConfirm = (date) => {
    setSelectedDate(date);
    setDateVisible(false);
  };

  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header"> 
          {/* 日期选择器 */}
          <div 
            className="date"
            onClick={() => setDateVisible(true)}
          >
            <span className="text">
              {dayjs(selectedDate).format('YYYY年MM月')}账单
            </span>
            <span className={`arrow ${dateVisible ? 'open' : ''}`}>
              ▼
            </span>
          </div>
          
          {/* 月度概览 */}
          <div className="twoLineOverview">
            <div className="item">
              <span className="money expense">
                ¥{currentMonthStats.expense.toFixed(2)}
              </span>
              <span className="type">
                支出
              </span>
            </div>
            <div className="item">
              <span className="money income">
                ¥{currentMonthStats.income.toFixed(2)}
              </span>
              <span className="type">
                收入
              </span>
            </div>
            <div className="item">
              <span className={`money balance ${currentMonthStats.balance >= 0 ? 'positive' : 'negative'}`}>
                ¥{currentMonthStats.balance.toFixed(2)}
              </span>
              <span className="type">
                结余
              </span>
            </div>
          </div>
          
          <DatePicker
            className="kaDate"
            title="选择月份"
            precision="month"
            visible={dateVisible}
            onClose={() => setDateVisible(false)}
            onConfirm={onConfirm}
            max={new Date()} 
          />{/*当前时间对应的 Date 对象通过 prop 名 max 传给子组件*/}
        </div>
        <p>详细账单</p>
        {
          dayGroup.keys.map(key=>{
            return    <DayBill  key={key} date={key} billList={dayGroup.GroupData[key]}/>
          })
        }
     
        {/* 月份列表 */}
        <div className="monthList">
          {monthSummary.map(monthData => (
            <div key={monthData.month} className="monthItem">
              <div className="monthHeader">
                <span className="monthTitle">
                  {dayjs(monthData.month).format('YYYY年MM月')}
                </span>
                <span className={`monthAmount ${monthData.balance >= 0 ? 'positive' : 'negative'}`}>
                  ¥{monthData.balance.toFixed(2)}
                </span>
              </div>
              <div className="monthDetails">
                <div className="detailItem">
                  <div className="label">收入</div>
                  <div className="value income">¥{monthData.income.toFixed(2)}</div>
                </div>
                <div className="detailItem">
                  <div className="label">支出</div>
                  <div className="value expense">¥{monthData.expense.toFixed(2)}</div>
                </div>
                <div className="detailItem">
                  <div className="label">交易笔数</div>
                  <div className="value">{monthData.count}笔</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {currentMonthStats.bills.length === 0 && (
          <div className="emptyState">
            <div className="emptyText">暂无账单数据</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Month;