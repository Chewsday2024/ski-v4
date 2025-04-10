import { Link, useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";

import "./Order.scss";
import axios from "axios";

import { useForm } from "react-hook-form";
import { OrderContext } from "./OrderContext";
import { defaultOrder } from "./DefaultOrder";

export default function CheckoutPage() {
  const BASE_URL = "https://ski-api-m9x9.onrender.com"; //正式機
  // const BASE_URL = "http://localhost:3000";                   //測試機

  const [, setUser] = useState(null);

  const { order, setOrder } = useContext(OrderContext);

  const [payments, setPayments] = useState([]); //付款方式

  const [checkedPayment, setCheckedPayment] = useState(""); //勾選中的付款方式 value

  const [inputContactData, setInputContactData] = useState({
    lastName: "",
    firstName: "",
    email: "",
    phone: "",
    lineId: "",
    note: "",
  });
  const [isChecked, setIsChecked] = useState(false); //是否勾選同意條款
  const { setErrorMessage } = useContext(OrderContext); //錯誤訊息

  const orderNavigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async () => {
    try {
      await submitOrder();
      localStorage.removeItem("orderData");
      setOrder(defaultOrder);
    } catch (error) {
      // console.error(error);
      alert(error);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      orderNavigate("/sign-in");
      alert("請先登入！");
    }

    const getPayments = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/paymentWays`);
        setPayments(res.data);
      } catch (error) {
        // console.error(error);
        alert(error);
      }
    };
    getPayments();
  }, []);

  const handleContact = (e) => {
    const { name, value } = e.target;
    setInputContactData((contact) => ({
      ...contact,
      [name]: value,
    }));
  };

  const getSubmitTime = () => {
    const now = new Date();
    // return now.toLocaleString();
    return now.toISOString();
  };

  // 把填入的資料更新存到 orders 訂單裡
  const updateOrder = () => {
    const tmpOrder = {
      ...order,
      orderTime: getSubmitTime(),
      contactInfo: {
        name: inputContactData.lastName + inputContactData.firstName,
        phone: inputContactData.phone,
        email: inputContactData.email,
        lineId: inputContactData.lineId,
        note: inputContactData.note,
      },
      is_checked: isChecked,
      paymentMethod: Number(checkedPayment),
      isPaid: true,
    };
    setOrder(tmpOrder);
  };

  useEffect(() => {
    updateOrder();
  }, [inputContactData, isChecked, checkedPayment]);

  // 送出訂單
  const submitOrder = async () => {
    try {
      await axios.post(`${BASE_URL}/orders`, order);
      orderNavigate("/checkout-success");
    } catch (error) {
      // console.error(error);
      alert(error);
      if (error.response.status === 404) {
        setErrorMessage("404 網路連線問題，請重新嘗試");
        orderNavigate("/checkout-fail");
      }
    }
  };

  return (
    <div className="container">
      {/* PC Step flow */}
      <div className="row justify-content-center">
        <div className="col-lg-8 col">
          <div className="d-none d-md-block">
            <div className="d-flex justify-content-between step-sec">
              <div className="d-flex">
                <span className="step-circle d-flex justify-content-center align-items-center">
                  1
                </span>
                <h2 className="fs-4 ms-3 text-gray-03">填寫預約資料</h2>
              </div>
              <span className="material-symbols-outlined d-flex justify-content-center align-items-center  text-gray-03">
                play_arrow
              </span>
              <div className="d-flex">
                <span className="step-circle active d-flex justify-content-center align-items-center">
                  2
                </span>
                <h2 className="fs-4 ms-3 text-brand-01">填寫聯繫方式與付款</h2>
              </div>
              <span className="material-symbols-outlined d-flex justify-content-center align-items-center text-brand-01">
                play_arrow
              </span>
              <div className="d-flex">
                <span className="step-circle d-flex justify-content-center align-items-center">
                  3
                </span>
                <h2 className="fs-4 ms-3 text-gray-03">預約完成</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Step Flow */}
      <div className="row">
        <div className="col">
          <div className="d-md-none">
            <ul className="mobile-steps d-flex mt-20 mb-32">
              <li className="d-flex flex-column align-items-center">
                <span className="step-circle mobile-step-number d-flex justify-content-center align-items-center mb-3">
                  1
                </span>
                <h2 className="fs-6 text-gray-03 text-nowrap d-none">
                  填寫預約資料
                </h2>
              </li>
              <li className="d-flex flex-column align-items-center step-active">
                <span className="step-circle active d-flex justify-content-center align-items-center mb-3">
                  2
                </span>
                <h2 className="fs-6 text-brand-01 text-nowrap">
                  填寫聯繫方式與付款
                </h2>
              </li>
              <li className="d-flex flex-column align-items-center">
                <span className="step-circle d-flex justify-content-center align-items-center mb-3">
                  3
                </span>
                <h2 className="fs-6 text-gray-03 text-nowrap d-none">
                  預約完成
                </h2>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <form
            id="contactForm"
            onSubmit={(e) => e.preventDefault()}
            className="d-flex flex-column gap-5"
          >
            {/* 區塊：預約課程 */}
            <div className="d-flex flex-column gap-4">
              <h3 className="form-title text-brand-02 ps-4">預約課程</h3>
              <div className="d-flex flex-column gap-4">
                <div className="mb-3 form-section">
                  <div className="d-flex justify-content-between align-items-center">
                    <label htmlFor="" className="form-label mb-0">
                      日期
                    </label>
                    <p className="form-control-plaintext w-70 w-md-80 fw-bold">
                      {order.class?.timeType === "allday"
                        ? order.class.startDate !== order.class.endDate
                          ? `${order.class.startDate} ～ ${order.class.endDate}`
                          : order.class.startDate
                        : order.class?.date}
                    </p>
                  </div>
                </div>
                <div className="mb-3 form-section">
                  <div className="d-flex justify-content-between align-items-center">
                    <label htmlFor="" className="form-label mb-0">
                      時間
                    </label>
                    <p className="form-control-plaintext w-70 w-md-80  fw-bold">
                      {order.class?.timeTypeName}
                    </p>
                  </div>
                </div>
                <div className="mb-3 form-section">
                  <div className="d-flex justify-content-between align-items-center">
                    <label htmlFor="" className="form-label mb-0">
                      天數
                    </label>
                    <p className="form-control-plaintext w-70 w-md-80  fw-bold">
                      {order.class?.days} 天
                    </p>
                  </div>
                </div>
                <div className="mb-3 form-section">
                  <div className="d-flex justify-content-between align-items-center">
                    <label htmlFor="" className="form-label mb-0">
                      雪場
                    </label>
                    <p className="form-control-plaintext w-70 w-md-80 fw-bold">
                      {order.skiResortName}
                    </p>
                  </div>
                </div>
                <div className="mb-3 form-section">
                  <div className="d-flex justify-content-between align-items-center">
                    <label htmlFor="" className="form-label mb-0">
                      類型
                    </label>
                    <p className="form-control-plaintext w-70 w-md-80 fw-bold">
                      {order.class?.skiType
                        ? order.class.skiType === "single"
                          ? "單板"
                          : "雙板"
                        : ""}
                    </p>
                  </div>
                </div>
                <div className="mb-3 form-section">
                  <div className="d-flex justify-content-between align-items-center">
                    <label htmlFor="" className="form-label mb-0">
                      教練
                    </label>
                    <p className="form-control-plaintext w-70 w-md-80 fw-bold">
                      {order.coachName}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* 區塊：學員資料 */}
            <div className="d-flex flex-column gap-4">
              <div>
                <h3 className="form-title text-brand-02 ps-4 mb-3">學員資料</h3>
                <p className="">
                  同班學員程度需一致，若有明顯差異，教練將以較初階程度為授課基準。
                </p>
              </div>
              <div className="mb-3 form-section">
                <div className="d-flex justify-content-between align-items-center">
                  <label htmlFor="" className="form-label mb-0">
                    上課人數
                  </label>
                  <p className="form-control-plaintext w-70 w-md-80  fw-bold">
                    {order.studentsData?.studentNum} 人
                  </p>
                </div>
              </div>
              <div className="mb-3 form-section">
                <div className="d-flex justify-content-between align-items-center">
                  <label htmlFor="" className="form-label mb-0">
                    滑行程度
                  </label>
                  <p className="form-control-plaintext w-70 w-md-80  fw-bold">
                    {order.studentsData?.skiLevelName}
                  </p>
                </div>
              </div>
              {/* 區塊：學員資料明細 */}
              <div className="mb-3 form-section">
                <div className="row g-3">
                  {order.studentsData?.students.map((student, index) => {
                    return (
                      <div key={index} className="col-md-6">
                        <div className="card border-0">
                          <h5 className="card-title text-center border border-brand-02 bg-brand-02 text-white border-radius-top-20 p-3 mb-0">
                            學員 {index + 1}
                          </h5>
                          <div className="card-body border border-brand-02">
                            <div className="card-text d-flex justify-content-between align-items-center mb-2">
                              <label htmlFor="" className="form-label mb-0">
                                姓名
                              </label>
                              <p className="form-control-plaintext w-50 fw-bold">
                                {student.name}
                              </p>
                            </div>
                            <div className="card-text d-flex justify-content-between align-items-center mb-2">
                              <label htmlFor="" className="form-label mb-0">
                                性別
                              </label>
                              <p className="form-control-plaintext w-50 fw-bold">
                                {student.gender === "male" ? "男" : "女"}
                              </p>
                            </div>
                            <div className="card-text d-flex justify-content-between align-items-center mb-2">
                              <label htmlFor="" className="form-label mb-0">
                                年齡
                              </label>
                              <p className="form-control-plaintext w-50 fw-bold">
                                {student.age}
                              </p>
                            </div>
                            <div className="card-text d-flex justify-content-between align-items-center mb-2">
                              <label htmlFor="" className="form-label mb-0">
                                聯絡電話
                              </label>
                              <p className="form-control-plaintext w-50 fw-bold">
                                {student.phone}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* 區塊：付款 */}
            <div className="row gap-4">
              {/* 付款明細 */}
              <div className="col-12">
                <div className="d-flex flex-column gap-4">
                  <h3 className="form-title text-brand-02 ps-4">付款明細</h3>
                  <div className="mb-3 form-section">
                    <div className="d-flex justify-content-between align-items-center">
                      <label htmlFor="" className="form-label mb-0">
                        價格/每小時
                      </label>
                      <p className="form-control-plaintext w-70 w-md-80 fw-bold">
                        {`JPY ${order.coachPrice?.toLocaleString()}`}
                      </p>
                    </div>
                  </div>
                  <div className="mb-3 form-section">
                    <div className="d-flex justify-content-between align-items-center">
                      <label htmlFor="" className="form-label mb-0">
                        時數
                      </label>
                      <p className="form-control-plaintext w-70 w-md-80 fw-bold">
                        {order.paymentDetail?.hours} 小時
                      </p>
                    </div>
                  </div>
                  <div className="mb-3 form-section">
                    <div className="d-flex justify-content-between align-items-center">
                      <label htmlFor="" className="form-label mb-0">
                        人數
                      </label>
                      <p className="form-control-plaintext w-70 w-md-80 fw-bold">
                        {order.studentsData?.studentNum} 人
                      </p>
                    </div>
                  </div>
                  <div className="mb-3 form-section">
                    <div className="d-flex justify-content-between align-items-center">
                      <label htmlFor="" className="form-label mb-0 fs-4">
                        總金額
                      </label>
                      <p className="form-control-plaintext w-70 w-md-80 fw-bold fs-3 text-brand-01">{`JPY ${order.paymentDetail?.total.toLocaleString()}`}</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* 區塊：付款方式 */}
              <div className="col-12">
                <div className="d-flex flex-column gap-4">
                  <h3 className="form-title text-brand-02 ps-4">付款方式</h3>
                  <div className="mb-3 form-section">
                    {payments.map((payment) => {
                      return (
                        <div key={payment.id} className="form-check mb-3">
                          <input
                            {...register("payments", {
                              required: "必選",
                            })}
                            value={String(payment.id)}
                            checked={
                              checkedPayment === String(payment.id)
                                ? true
                                : false
                            }
                            onChange={(e) => {
                              setCheckedPayment(e.target.value);
                              setValue("payments", e.target.value, {
                                shouldValidate: true,
                              });
                            }}
                            className={`form-check-input ${
                              errors.payments && "is-invalid"
                            }`}
                            type="radio"
                            name="payments"
                            id={payment.id}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={payment.id}
                          >
                            {payment.name}
                          </label>
                        </div>
                      );
                    })}
                    <div className="d-flex align-items-center w-70 w-md-80">
                      {errors.payments && (
                        <p className="text-danger mt-1">
                          {errors.payments.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* 區塊：聯繫方式 */}
            <div className="row">
              <div className="col-12">
                <div className="d-flex flex-column gap-4">
                  <h3 className="form-title text-brand-02 ps-4">聯繫方式</h3>
                  <div className="mb-3 form-section">
                    <div className="d-flex justify-content-between align-items-center">
                      <label
                        htmlFor="contactLastName"
                        className="form-label mb-0"
                      >
                        姓名
                      </label>
                      <div className="w-70 w-md-80 d-flex">
                        <input
                          {...register("contactLastName", {
                            required: "必填",
                          })}
                          value={inputContactData.lastName}
                          onChange={(e) => {
                            handleContact(e);
                            setValue("contactLastName", e.target.value, {
                              shouldValidate: true,
                            });
                          }}
                          name="lastName"
                          type="text"
                          className={`form-control w-25 me-3 ${
                            errors.contactLastName && "is-invalid"
                          }`}
                          id="contactLastName"
                          placeholder="姓氏"
                        />
                        <input
                          {...register("contactFirstName", {
                            required: "必填",
                          })}
                          value={inputContactData.firstName}
                          onChange={(e) => {
                            handleContact(e);
                            setValue("contactFirstName", e.target.value, {
                              shouldValidate: true,
                            });
                          }}
                          name="firstName"
                          id="contactFirstName"
                          type="text"
                          className={`form-control w-75 ${
                            errors.contactFirstName && "is-invalid"
                          }`}
                          placeholder="姓名"
                        />
                      </div>
                    </div>
                    <div className="w-70 w-md-80 d-flex ms-auto">
                      {errors.contactLastName && (
                        <p className="text-danger w-25 me-3 mt-1">
                          {errors.contactLastName.message}
                        </p>
                      )}
                      {errors.contactFirstName && (
                        <p
                          className="text-danger ms-auto mt-1"
                          style={{ width: "calc(75% - 16px)" }}
                        >
                          {errors.contactFirstName.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mb-3 form-section">
                    <div className="d-flex justify-content-between align-items-center">
                      <label htmlFor="contactPhone" className="form-label mb-0">
                        聯絡電話
                      </label>
                      <input
                        {...register("contactPhone", {
                          required: "必填",
                          pattern: {
                            value: /^(0[2-8]\d{7,8}|09\d{8})$/,
                            message: "格式錯誤",
                          },
                        })}
                        value={inputContactData.phone}
                        onChange={(e) => {
                          handleContact(e);
                          setValue("contactPhone", e.target.value, {
                            shouldValidate: true,
                          });
                        }}
                        name="phone"
                        type="tel"
                        className={`form-control w-70 w-md-80 ${
                          errors.contactPhone && "is-invalid"
                        }`}
                        id="contactPhone"
                        placeholder="請輸入手機號碼09或市話"
                      />
                    </div>
                    <div className="d-flex align-items-center w-70 w-md-80 ms-auto">
                      {errors.contactPhone && (
                        <p className="text-danger mt-1">
                          {errors.contactPhone.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mb-3 form-section">
                    <div className="d-flex justify-content-between align-items-center">
                      <label htmlFor="email" className="form-label mb-0">
                        E-mail
                      </label>
                      <input
                        {...register("email", {
                          required: "必填",
                          pattern: {
                            value:
                              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "格式錯誤",
                          },
                        })}
                        value={inputContactData.email}
                        onChange={(e) => {
                          handleContact(e);
                          setValue("email", e.target.value, {
                            shouldValidate: true,
                          });
                        }}
                        type="email"
                        className={`form-control w-70 w-md-80 ${
                          errors.email && "is-invalid"
                        }`}
                        name="email"
                        id="email"
                        placeholder="xxx@xxx.xxx"
                      />
                    </div>
                    <div className="d-flex align-items-center w-70 w-md-80 ms-auto">
                      {errors.email && (
                        <p className="text-danger mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mb-3 form-section">
                    <div className="d-flex justify-content-between align-items-center">
                      <label htmlFor="lineId" className="form-label mb-0">
                        LINE ID
                      </label>
                      <input
                        {...register("lineId", {
                          required: "必填",
                          pattern: {
                            value: /^[a-z0-9._-]{2,20}$/,
                            message: "格式錯誤",
                          },
                        })}
                        value={inputContactData.lineId}
                        onChange={(e) => {
                          handleContact(e);
                          setValue("lineId", e.target.value, {
                            shouldValidate: true,
                          });
                        }}
                        type="text"
                        className={`form-control w-70 w-md-80 ${
                          errors.lineId && "is-invalid"
                        }`}
                        name="lineId"
                        id="lineId"
                        placeholder=""
                      />
                    </div>
                    <div className="d-flex align-items-center w-70 w-md-80 ms-auto">
                      {errors.lineId && (
                        <p className="text-danger mt-1">
                          {errors.lineId.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mb-3 form-section">
                    <div className="d-flex justify-content-between align-items-start">
                      <label htmlFor="note" className="form-label mb-0">
                        備註(選填)
                      </label>
                      <textarea
                        value={inputContactData.note}
                        onChange={handleContact}
                        className="form-control w-70 w-md-80"
                        name="note"
                        id="note"
                        rows="3"
                        placeholder="如有其他特殊需求，可以跟我們說唷！"
                      ></textarea>
                    </div>
                  </div>
                  <div className="mb-3 form-section">
                    <div className="d-flex align-items-center">
                      <input
                        {...register("isAgreed", {
                          required: "請勾選",
                        })}
                        onChange={(e) => {
                          setIsChecked(e.target.checked);
                          setValue("isAgreed", e.target.checked, {
                            shouldValidate: true,
                          });
                        }}
                        className={`form-check-input mt-0 me-3 ${
                          errors.isAgreed && "is-invalid"
                        }`}
                        type="checkbox"
                        name="isAgreed"
                        id="isAgreed"
                        required
                      />
                      <label
                        htmlFor="isAgreed"
                        className="form-label mb-0 w-70 w-md-80 text-nowrap"
                      >
                        本人已詳閱並同意
                        <Link
                          to="/"
                          className="text-brand-02 text-md-20"
                          target="_blank"
                        >
                          預約訂單注意事項
                        </Link>
                      </label>
                    </div>
                    <div className="d-flex align-items-center w-70 w-md-80">
                      {errors.isAgreed && (
                        <p
                          className="text-danger mt-1"
                          style={{ marginLeft: "36px" }}
                        >
                          {errors.isAgreed.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="d-flex justify-content-center flex-wrap gap-3 mt-4 mt-lg-5 mb-5 mb-lg-60">
        <button
          type="button"
          onClick={() => {
            orderNavigate("/booking");
          }}
          className="btn-custom btn-custom-unfilled w-lg-25 w-md-50 w-xs-100 text-nowrap"
        >
          上一步
        </button>
        <button
          type="button"
          form="contactForm"
          className="btn-custom btn-custom-filled w-lg-25 w-md-50 w-xs-100 text-nowrap"
          onClick={() => {
            handleSubmit(onSubmit)();
          }}
        >
          付款去
        </button>
      </div>
    </div>
  );
}
