import { useState } from "react";
import axios from 'axios';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

function SignUpForm() {
  // const [emailSignIn, setEmailSignIn] = useState('');
  // const [passwordSignIn, setPasswordSignIn] = useState('');
  // const [nickName, setNickName] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [isErrorMessage, setIsErrorMessage] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useState('');
  const api = 'https://ski-api-m9x9.onrender.com';
  const navigate = useNavigate();
  
  const signUp = async (data) => {
    try {
      const res = await axios.post(`${api}/users`, {
        email: data.email,
        password: data.password,
        nickname: data.nickname,
      });
      setResponseMessage('註冊成功');
      setToken(res.data.token);
      setIsErrorMessage(false);
    } catch (error) {
      setResponseMessage(`註冊失敗: ${error.response?.data?.message || '未知錯誤'}`);
      setIsErrorMessage(true);
    }
    navigate("/sign-in");
  };

  const {
    register,
    handleSubmit, 
    formState: { errors }
  } = useForm({
    mode: "onTouched",
  });
    
  return (
    <div className="container mb-5">
      <div className="row flex-column align-items-center">
        <div className="col-md-4 col-10">
          <form onSubmit={handleSubmit(signUp)} className="d-flex flex-column text-brand-01 mb-5">
            <h2 className="mb-4 text-brand-02 align-self-center">註冊</h2>
            <div className="form-group mb-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control mt-3"
                id="email"
                placeholder="請輸入信箱"
                autoComplete="current-username"
                {...register("email", {
                  required: "信箱為必填資料",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                    message: "請輸入正確的信箱格式",
                  },
                })}
              />
              {errors.email && <p className="text-danger">{errors.email.message}</p>}
            </div>
            <div className="form-group my-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control mt-2"
                id="password"
                placeholder="請輸入密碼"
                autoComplete="current-password"
                {...register("password", {
                  required: "密碼為必填資料",
                  minLength: {
                    value: 4,
                    message: "密碼長度至少為 4 個字元",
                  },
                })}
              />
              {errors.password && <p className="text-danger">{errors.password.message}</p>}
            </div>
            <div className="form-group my-2 mb-4">
              <label htmlFor="nickname">Nick Name</label>
              <input
                type="text"
                className="form-control mt-2"
                id="nickname"
                placeholder="請輸入暱稱"
                autoComplete="nickname"
                {...register("nickname", {
                  required: "暱稱為必填資料",
                  minLength: {
                    value: 2,
                    message: "暱稱長度至少為 2 個字元",
                  },
                })}
              />
              {errors.nickname && <p className="text-danger">{errors.nickname.message}</p>}
            </div>  
            <button type="submit" className="btn btn-brand-01 home-btn-hover rounded-pill align-self-center w-25 mb-4 mt-3">
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