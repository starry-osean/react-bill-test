import Layout from '../component/Layout'
import Mouth from '../component/Mouth'
import New from '../component/New'
import Year from '../component/Year'
import Login from '../component/login'
import {createBrowserRouter} from 'react-router-dom'
const router=createBrowserRouter([
    {
        path:'/',
        element:<Layout/>,
         children:[
            {
                path:'mouth',
                element:<Mouth/>
            },{
                path:'year',
                element:<Year/>
            }
        ]
    },{
        path:'/new',
        element:<New/>
    },{
        path:'/login',
        element:<Login/>
    },{
        index: true,  // 默认路由
        element: <Login />
    },
])
export default router