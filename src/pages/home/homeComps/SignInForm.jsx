import { useState } from "react";
import { Link } from 'react-router';
import axios from 'axios';

function SignInForm() {
  const [emailSignIn, setEmailSignIn] = useState('exam@mail.com');
  const [passwordSignIn, setPasswordSignIn] = useState('00000000');
  const [responseMessage, setResponseMessage] = useState('');
  const [isErrorMessage, setIsErrorMessage] = useState(false);
  const [token, setToken] = useState('');

  const api = 'https://todolist-api.hexschool.io';
  
  // 練習區塊
  const signIn = async () => {
    try {
    const res = await axios.post(`${api}/users/sign_in`, {
      email: emailSignIn,
      password: passwordSignIn,
    });
      setResponseMessage('登入成功');
      setIsErrorMessage(false);
    } catch (error) {
      setResponseMessage(`登入失敗: ${error.response?.data?.message || '未知錯誤'}`);
      setIsErrorMessage(true);
    }
  };
  // 區塊結束
  
  return (
    <div className="container mb-5">
      <div className="row flex-column justify-content-center align-items-center">
        <div className="col-md-4 col-10">
          <form className="d-flex flex-column text-brand-01">
            <h2 className="mb-4 text-brand-02 align-self-center">會員登入</h2>
            <div className="form-group mb-2">
              <label htmlFor="exampleInputEmail2">Email</label>
              <input
                value={emailSignIn}
                onChange={(e) => setEmailSignIn(e.target.value)}
                type="email"
                className="form-control mt-2"
                id="exampleInputEmail2"
                placeholder="請輸入信箱"
              />
            </div>
            <div className="form-group my-3 mb-5">
              <label htmlFor="exampleInputPassword2">Password</label>
              <input
                value={passwordSignIn}
                onChange={(e) => setPasswordSignIn(e.target.value)}
                type="password"
                className="form-control mt-2"
                id="exampleInputPassword2"
                placeholder="請輸入密碼"
              />
              <div className="text-end">
                <Link to="*" className="text-gray-02 text-decoration-none"><small>忘記密碼？</small></Link>
              </div>
            </div>
            {/* <button type="button" className="btn btn-brand-01 home-btn-hover rounded-pill align-self-center w-25 mb-4" onClick={signIn}>
              登入
            </button> */}
            {/* 功能未完成前先用連結前往預約頁面 */}
            <Link to='/booking' className="btn btn-brand-01 home-btn-hover rounded-pill align-self-center w-25 mb-4">登入</Link>
            <Link to='/sign-up' className="text-brand-02 text-decoration-none align-self-center">註冊</Link>
          </form>
          {responseMessage && (
            <p className={`h3 my-3 ${isErrorMessage ? 'text-danger' : 'text-success'}`}>
              {responseMessage}
            </p>
          )}
        </div>
          
      </div>
    </div>
  );
}

export default SignInForm;