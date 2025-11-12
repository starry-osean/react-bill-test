import Layout from '../component/Layout'
import Mouth from '../component/Mouth'
import New from '../component/New'
import Year from '../component/Year'
import {createBrowserRouter} from 'react-router-dom'
const router=createBrowserRouter([
    {
        path:'/',
        element:<Layout/>,
         children:[
             {
                index: true,  // 默认路由
                element: <Mouth />
            },
            {
                path:'mouth',
                element:<Mouth/>
            },
            {
                path:'year',
                element:<Year/>
            }
        ]
    },{
        path:'/new',
        element:<New/>
    }
])
export default router