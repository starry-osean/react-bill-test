import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import {getBillList } from '../../store/module/billStore'
import { TabBar } from 'antd-mobile'
import {
  BillOutline,
  AddCircleOutline,
  CalculatorOutline,
} from 'antd-mobile-icons'
import './index.scss'

const Layout=()=>{
    const dispatch=useDispatch()

  const tabs = [ 
    {
      key: '/Month',
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
      key: 'year',
      title: '年度账单',
      icon:<CalculatorOutline/>
    }
  ]
    useEffect(()=>{
            dispatch(getBillList())
    },[dispatch])
    const navigate=useNavigate()
    const swithRoute=(path)=>{
        navigate(path)
        console.log(path);
        
    }
    return (
            <div className="layout">
                <div className="cotainer">
                          <Outlet/> 
                </div>
                <div className="footer">
                        <TabBar onChange={swithRoute}>
                            {
                                tabs.map(Item=>(
                                    <TabBar.Item key={Item.key} icon={Item.icon} title={Item.title}/>
                                ))
                            }
                        </TabBar>
                </div>
    </div>
    )
}
export default Layout;