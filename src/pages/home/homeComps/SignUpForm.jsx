import { useState } from "react";
import axios from 'axios';

  function SignUpForm() {
    const [emailSignIn, setEmailSignIn] = useState('');
    const [passwordSignIn, setPasswordSignIn] = useState('');
    const [nickName, setNickName] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [isErrorMessage, setIsErrorMessage] = useState(false);
    const [token, setToken] = useState('');
  
    const api = 'https://todolist-api.hexschool.io';
    
    // 練習區塊
    const signUp = async () => {
      try {
      const res = await axios.post(`${api}/users/sign_up`, {
        email: emailSignIn,
        password: passwordSignIn,
        nickname: nickName
      });
        setResponseMessage('註冊成功');
        setToken(res.data.token);
        setIsErrorMessage(false);
      } catch (error) {
        setResponseMessage(`註冊失敗: ${error.response?.data?.message || '未知錯誤'}`);
        setIsErrorMessage(true);
      }
    };
    
  return (
    <div className="container mb-5">
      <div className="row flex-column align-items-center">
        <div className="col-md-4 col-10">
          <form className="d-flex flex-column text-brand-01 mb-5">
            <h2 className="mb-4 text-brand-02 align-self-center">註冊</h2>
            <div className="form-group mb-2">
              <label htmlFor="exampleInputEmail2">Email</label>
              <input
                value={emailSignIn}
                onChange={(e) => setEmailSignIn(e.target.value)}
                type="email"
                className="form-control mt-3"
                id="exampleInputEmail2"
                placeholder="請輸入信箱"
                autoComplete="current-username"
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="exampleInputPassword2">Password</label>
              <input
                value={passwordSignIn}
                onChange={(e) => setPasswordSignIn(e.target.value)}
                type="password"
                className="form-control mt-2"
                id="exampleInputPassword2"
                placeholder="請輸入密碼"
                autoComplete="current-password"
              />
            </div>
            <div className="form-group my-2 mb-4">
              <label htmlFor="exampleInputNickName">Nick Name</label>
              <input
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
                type="text"
                className="form-control mt-2"
                id="exampleInputNickName"
                placeholder="請輸入暱稱"
              />
            </div>  
            <button type="button" className="btn btn-brand-01 home-btn-hover rounded-pill align-self-center w-25 mb-4 mt-3" onClick={signUp}>
              註冊
            </button>
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

export default SignUpForm;