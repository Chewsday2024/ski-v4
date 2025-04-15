import { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";

function SignInForm() {
  const [emailSignIn, setEmailSignIn] = useState("ming@ggmail.com");
  const [passwordSignIn, setPasswordSignIn] = useState("123123");
  const [responseMessage, setResponseMessage] = useState("");
  const [isErrorMessage, setIsErrorMessage] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(null);

  const api = "https://ski-api-m9x9.onrender.com";

  const navigate = useNavigate();

  const signIn = async () => {
    try {
      // 取得所有會員資料
      const res = await axios.get(`${api}/users`);
      const users = res.data;

      // 查找是否有對應的會員
      const foundUser = users.find(
        (u) => u.email === emailSignIn && u.password === passwordSignIn
      );

      if (foundUser) {
        setResponseMessage("登入成功！");
        setIsErrorMessage(false);
        setUser(foundUser); // 設定登入的用戶資訊
        localStorage.setItem("user", JSON.stringify(foundUser)); // 存入 localStorage
        navigate("/booking");
      } else {
        setResponseMessage("帳號或密碼錯誤");
        setIsErrorMessage(true);
      }
    } catch (error) {
      setResponseMessage(`登入失敗: ${error.message}`);
      setIsErrorMessage(true);
    }
  };

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
                <Link to="*" className="text-gray-02 text-decoration-none">
                  <small>忘記密碼？</small>
                </Link>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-brand-01 home-btn-hover rounded-pill align-self-center w-25 mb-4"
              onClick={signIn}
            >
              登入
            </button>
            <Link to="/sign-up" className="text-brand-02 text-decoration-none align-self-center">
              註冊
            </Link>
          </form>
          {responseMessage && (
            <p className={`h3 my-3 ${isErrorMessage ? "text-danger" : "text-success"}`}>
              {responseMessage}
            </p>
          )}
          {/* {user && (
            <div className="mt-3">
              <h3>歡迎, {user.user}!</h3>
              <p>身份: {user.identity ? "管理員" : "普通用戶"}</p>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}

export default SignInForm;
