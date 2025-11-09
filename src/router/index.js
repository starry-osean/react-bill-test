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
                path:'Mouth',
                element:<Mouth/>
            },
            {
                path:'Year',
                element:<Year/>
            }
        ]
    },{
        path:'/New',
        element:<New/>
    }
])
export default router