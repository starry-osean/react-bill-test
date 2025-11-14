import { Outlet, useNavigate } from "react-router-dom";
import {  useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getBillList } from '../../store/module/billStore'
import { TabBar } from 'antd-mobile'
import {
  BillOutline,
  AddCircleOutline,
  CalculatorOutline,
} from 'antd-mobile-icons'
import './index.scss'
import _ from 'lodash';


const Layout = () => {
  const dispatch = useDispatch()

  const tabs = [ 
    {
      key: '/mouth', 
      title: '月度账单',
      icon: <BillOutline />,
    },
    {
      key: '/new',
      title: '记账',
      icon: <AddCircleOutline />,
      badge: '5',
    },
    {
      key: '/year', 
      title: '年度账单',
      icon: <CalculatorOutline/>
    }
  ]

  useEffect(() => {
    dispatch(getBillList())
  }, [dispatch])

  const navigate = useNavigate()
  const switchRoute = (path) => { 
    navigate(path)
    console.log(path);
  }
  const nav=useNavigate()
  const billList = useSelector(state => state.bill.billList);
  const Mobile=localStorage.getItem('Mobile')
  const loginOut=()=>{
    localStorage.removeItem('Mouth')
    localStorage.removeItem('token_key')
    nav('/login')
    alert('退出成功')
  }
  return (
    <div className="layout">
        <div className="humam">
          <div className="img">
                <img src="/logo.png"></img>
          </div>
          <div>
              <p><span>尊贵的{Mobile}用户</span>,欢迎回来</p>
          </div>
          <div className="tip" onClick={loginOut}>
                <svg t="1762953576428" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2412" width="30" height="30"><path d="M0 192v640c0 70.7 57.3 128 128 128h352c17.7 0 32-14.3 32-32s-14.3-32-32-32H128c-35.3 0-64-28.7-64-64V192c0-35.3 28.7-64 64-64h352c17.7 0 32-14.3 32-32s-14.3-32-32-32H128C57.3 64 0 121.3 0 192z" p-id="2413" fill="#2c2c2c"></path><path d="M1013.3 535.7L650.9 863.3c-41.1 37.2-106.9 8-106.9-47.5V685c0-4.4-3.6-8-8-8H224c-17.7 0-32-14.3-32-32V379c0-17.7 14.3-32 32-32h312c4.4 0 8-3.6 8-8V208.1c0-55.5 65.8-84.7 106.9-47.5l362.4 327.6c14.1 12.8 14.1 34.8 0 47.5z" p-id="2414" fill="#2c2c2c"></path></svg>
          </div>
      </div>

      <div className="container">
        <Outlet/> 
      </div>
      <div className="footer">
        <TabBar onChange={switchRoute}>
          {
            tabs.map(item => (
              <TabBar.Item key={item.key} icon={item.icon} title={item.title}/>
            ))
          }
        </TabBar>
      </div>
    </div>
  )
}

export default Layout;