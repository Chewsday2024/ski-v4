import './Admin.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin(){
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  
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
      // 向 json-server 發送請求以獲取使用者資料
      // const response = await fetch('http://localhost:5000/users'); // 假設 json-server 跑在 localhost:5000
      const response = await fetch('https://ski-api-m9x9.onrender.com/users'); 
      const users = await response.json();
      
      // 驗證用戶資料
      const user = users.find(u => u.email === account.username && u.password === account.password && u.identity === 'admin');
      
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/admin');  // 若符合條件，跳轉到 admin 頁面
      } else {
        setError("輸入錯誤，請重新輸入");
      }
    } catch (error) {
      setError("輸入錯誤，請重新輸入");
      // console.error(error);
      alert(error);
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
        {error && <p className="text-danger">{error}</p>}
        <button className="btn btn-custom btn-custom-filled" type="submit">登入</button>
      </form>
      <p className="mt-5 mb-3 text-muted">&copy; 2025~∞ - 雪伴 SnowBuddy</p>
    </div>
  );
}