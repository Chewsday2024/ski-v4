import './Admin.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin(){

    const navigate = useNavigate();
    
    const [ account, setAccout ] = useState({
        "username": "example@gmail.com",
        "password": "12345678"
    })

    const handleInputChange = (e) => {
        const { value, name } = e.target;
        setAccout({
          ...account,
          [name]: value
        })
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            navigate('/admin');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
            <h2 className="mb-5 text-brand-02">= 管理者登入 =</h2>
            <form onSubmit={handleLogin} className="d-flex flex-column gap-3">
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Email</label>
                    <input type="email" name="username" value={account.username} onChange={handleInputChange} className="form-control" id="username" placeholder="name@example.com" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" value={account.password} onChange={handleInputChange} className="form-control" id="password" placeholder="Password" />
                </div>
                <button className="btn btn-custom btn-custom-filled" onClick={navigate("/admin")}>登入</button>
            </form>
            <p className="mt-5 mb-3 text-muted">&copy; 2025~∞ - 雪伴 SnowBuddy</p>
        </div>
    );
}