import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import{fetchUser} from  '../../store/module/user'
import './index.scss'
const User = () => {
    const UserList = useSelector(state => state.user.user);
    const dispatch = useDispatch();
    const name = localStorage.getItem('Mobile');
    
    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]); // 修复了依赖数组

    console.log('u', UserList);
    
    return(
        <div className="user-container">
            <div className="user-header">
                <img src="/logo.png" alt="用户头像"/>
                <p>{name}</p>
            </div>
            <div className="user-info">
                {UserList && UserList.length > 0 ? (
                    <div className="user-list">
                        {UserList.map(item => (
                            <div key={item.id} className="user-item">
                                <p>生日：{item.birth}</p>
                                <p>电子邮箱：{item.email}</p>
                                <span>简介：{item.text}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-info">没有本人信息</div>
                )}
            </div>
        </div>
    )
}
export default User;