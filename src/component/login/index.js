import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchLogin } from "../../store/module/user";
import { useNavigate } from "react-router-dom";
import './index.scss'
const Login = () => {
    const [formData, setFormData] = useState({
        mobile: '', 
        code: ''    
    });
    const nav=useNavigate()
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');

    const handleSubmit = async () => {
        // 重置消息
        setMsg('');
        
        // 表单验证
        if (!formData.mobile.trim()) {
            setMsg('请输入手机号');
            return;
        }
        
        if (!formData.code.trim()) {
            setMsg('请输入验证码');
            return;
        }

        // 简单的手机号格式验证
        const mobileRegex = /^1[3-9]\d{9}$/;
        if (!mobileRegex.test(formData.mobile)) {
            setMsg('请输入正确的手机号格式');
            return;
        }

        setLoading(true);

        try {
           
            await dispatch(fetchLogin(formData));
            alert("登录成功");
            localStorage.setItem('Mobile',formData.mobile)
            nav('/mouth')
        } catch (error) {
            console.log("登录失败:", error);
            setMsg('登录失败，请检查手机号和验证码');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h1>欢迎回来</h1>
                    <p>请输入您的手机号和验证码</p>
                </div>
                
                <div className="form-group with-icon">
                    <div className="input-icon">📱</div>
                    <input 
                        className="input-field"
                        name="mobile" 
                        placeholder="请输入手机号" 
                        type="tel" 
                        value={formData.mobile} 
                        onChange={handleChange}
                        maxLength="11"
                    />
                </div>
                
                <div className="form-group with-icon">
                    <div className="input-icon">🔒</div>
                    <input 
                        className="input-field"
                        name="code" 
                        placeholder="请输入验证码" 
                        type="text" 
                        value={formData.code} 
                        onChange={handleChange}
                        maxLength="6"
                    />
                </div>
                
                {msg && <div className="error-message">{msg}</div>}
                
                <div className="form-group">
                    <button 
                        className={`login-button ${isLoading ? 'loading' : ''}`}
                        onClick={handleSubmit} 
                        disabled={isLoading}
                    >
                        <span className="button-text">
                            {isLoading ? "登录中..." : "登录"}
                        </span>
                    </button>
                </div>
                
                <div className="login-options">
                    <a href="#" className="forgot-password">遇到问题？</a>
                </div>
                
                <div className="login-footer">
                    <p>保护您的隐私安全</p>
                </div>
            </div>
        </div>
    );
};

export default Login;