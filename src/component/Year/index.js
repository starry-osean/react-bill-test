import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { DatePicker,NavBar } from "antd-mobile";
import _ from "lodash"
import './index.scss'; 
const Year = () => {
    const billList = useSelector(state => state.bill.billList);
    console.log('is', billList);
    
    // 修正状态命名
    const [dateVisible, setDateVisible] = useState(false);
    const [currentYear, setCurrentYear] = useState(new Date());
    const format = dayjs(currentYear).format('YYYY');

    // 按年份分组
    const YearGroup = useMemo(() => {
        return _.groupBy(billList, item => dayjs(item.date).format('YYYY'));
    }, [billList]);

    console.log('y', YearGroup);

    // 计算当前年份的统计数据
    const currentYearStats = useMemo(() => {
        const currentBills = YearGroup[format] || [];
        const income = currentBills
            .filter(item => item.money > 0)
            .reduce((sum, item) => sum + item.money, 0);
        
        const expense = currentBills
            .filter(item => item.money < 0)
            .reduce((sum, item) => sum + Math.abs(item.money), 0);
        
        const balance = income - expense;
        
        return {
            income,
            expense,
            balance,
            bills: currentBills
        };
    }, [YearGroup, format]);

    // 计算每个月份的汇总数据
    const monthlyStats = useMemo(() => {
        if (!currentYearStats.bills || currentYearStats.bills.length === 0) {
            return [];
        }
        
        // 按月份分组
        const monthGroup = _.groupBy(currentYearStats.bills, item => 
            dayjs(item.date).format('YYYY-MM')
        );
        
        // 计算每个月份的收入、支出和结余
        const monthlyData = Object.entries(monthGroup).map(([month, bills]) => {
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
                count: bills.length // 交易笔数
            };
        });
        
        // 按月份倒序排列
        return monthlyData.sort((a, b) => b.month.localeCompare(a.month));
    }, [currentYearStats.bills]);

    console.log('月度汇总数据:', monthlyStats);

    const onConfirm = (date) => {
        setCurrentYear(date); 
        setDateVisible(false);
    };

    return (
        <div className="yearly-bill">
            <NavBar className="nav" backArrow={false}>
                    年度收支
            </NavBar>
            <div className="header">
                {/* 日期选择器触发按钮 */}
                <div 
                    className="date-selector"
                    onClick={() => setDateVisible(true)}
                >
                    <span className="text">
                        {dayjs(currentYear).format('YYYY年')}年度账单
                    </span>
                    <span className={`arrow ${dateVisible ? 'open' : ''}`}>
                        ▼
                    </span>
                </div>
                
                {/* 年度概览 */}
                <div className="year-overview">
                    <div className="overview-item">
                        <span className="money income">
                            ¥{currentYearStats.income.toFixed(2)}
                        </span>
                        <span className="type">年收入</span>
                    </div>
                    <div className="overview-item">
                        <span className="money expense">
                            ¥{currentYearStats.expense.toFixed(2)}
                        </span>
                        <span className="type">年支出</span>
                    </div>
                    <div className="overview-item">
                        <span className={`money balance ${currentYearStats.balance >= 0 ? 'positive' : 'negative'}`}>
                            ¥{currentYearStats.balance.toFixed(2)}
                        </span>
                        <span className="type">年结余</span>
                    </div>
                </div>

                {/* 日期选择器 */}
                <DatePicker
                    className="year-picker"
                    title="选择年份"
                    precision="year" // 改为选择年份
                    visible={dateVisible}
                    onClose={() => setDateVisible(false)}
                    onConfirm={onConfirm}
                    max={new Date()}
                />
            </div>

            {/* 月度明细 */}
            <div className="monthly-breakdown">
                <h3>月度明细</h3>
                {monthlyStats.length > 0 ? (
                    <div className="month-list">
                        {monthlyStats.map(monthData => (
                            <div key={monthData.month} className="month-item">
                                <div className="month-header">
                                    <h4>{dayjs(monthData.month).format('YYYY年MM月')}</h4>
                                    <span className={`balance ${monthData.balance >= 0 ? 'positive' : 'negative'}`}>
                                        ¥{monthData.balance.toFixed(2)}
                                    </span>
                                </div>
                                <div className="month-details">
                                    <div className="detail">
                                        <span>收入：</span>
                                        <span className="income">¥{monthData.income.toFixed(2)}</span>
                                    </div>
                                    <div className="detail">
                                        <span>支出：</span>
                                        <span className="expense">¥{monthData.expense.toFixed(2)}</span>
                                    </div>
                                    <div className="detail">
                                        <span>交易笔数：</span>
                                        <span>{monthData.count}笔</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-data">暂无月度数据</div>
                )}
            </div>
        </div>
    );
}

export default Year;