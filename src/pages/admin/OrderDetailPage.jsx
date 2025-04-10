import { useNavigate, useParams } from "react-router";
import "./Admin.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { twFormatter } from "./adminUtils/TimeFormat";

export default function OrderDetailPage() {
  const BASE_URL = "https://ski-api-m9x9.onrender.com"; //正式機
  // const BASE_URL = "http://localhost:3000";             //測試機

  const navigate = useNavigate();
  const { id } = useParams();

  const [order, setOrder] = useState({}); //  單筆訂單資料
  const [timeType, setTimeType] = useState([]); //  上課時間
  const [skiLevel, setSkiLevel] = useState([]); //  滑行程度

  const getOrder = async () => {
    const res = await axios.get(
      `${BASE_URL}/orders/${id}?_expand=user&_expand=skiResort&_expand=coach`
    );
    setOrder(res.data);
  };

  const getTimeType = async () => {
    const res = await axios.get(`${BASE_URL}/classTimeType`);
    setTimeType(Object.entries(res.data));
  };

  const getSkiLevel = async () => {
    const res = await axios.get(`${BASE_URL}/studentSkiLevel`);
    setSkiLevel(Object.entries(res.data));
  };

  useEffect(() => {
    getOrder();
    getTimeType();
    getSkiLevel();
  }, [id]);

  return (
    <>
      <main className="container admin-content d-flex flex-column justify-content-between">
        <div className="d-flex flex-column">
          <div className="py-4">
            <h3>預約訂單 #{order.id}</h3>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="mb-3 d-flex">
                <label htmlFor="orderId" className="form-label">
                  訂單編號：
                </label>
                <p id="orderId">{order.id}</p>
              </div>
              <div className="mb-3 d-flex">
                <label htmlFor="memberName" className="form-label">
                  會員：
                </label>
                <p id="memberName">{order.user?.user}</p>
              </div>
            </div>
            <div className="col-6">
              <div className="mb-3 d-flex">
                <label htmlFor="orderTime" className="form-label">
                  訂單時間：
                </label>
                <p id="orderTime">
                  {order.orderTime
                    ? twFormatter.format(new Date(order.orderTime))
                    : ""}
                </p>
              </div>
              <div className="mb-3 d-flex">
                <label htmlFor="orderId" className="form-label">
                  訂單狀態：
                </label>
                <p
                  className={order.orderStatus === 1 ? "" : "danger-text"}
                  id="orderId"
                >
                  {order.orderStatus === 1 ? "已完成" : "未完成"}
                </p>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column gap-3">
            <div className="card border-0">
              <h5 className="card-title text-center border border-brand-02 bg-brand-02 text-white border-radius-top-20 p-3 mb-0">
                預約課程
              </h5>
              <div className="card-body border border-brand-02">
                <div className="row">
                  <div className="col-6">
                    <div className="mb-3">
                      <div className="d-flex align-items-center">
                        <label htmlFor="" className="form-label">
                          日期：
                        </label>
                        <p className="fw-bold">
                          {order.class?.date === ""
                            ? order.class?.startDate === order.class?.endDate
                              ? order.class?.startDate
                              : `${order.class?.startDate} ~ ${order.class?.endDate}`
                            : order.class?.date}
                        </p>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex align-items-center">
                        <label htmlFor="" className="form-label">
                          時間：
                        </label>
                        <p className="fw-bold">
                          {
                            timeType.find((type) => {
                              return type[0] === order.class?.timeType;
                            })?.[1].name
                          }
                        </p>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex align-items-center">
                        <label htmlFor="" className="form-label">
                          天數：
                        </label>
                        <p className="fw-bold">{order.class?.days} 天</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-3">
                      <div className="d-flex align-items-center">
                        <label htmlFor="" className="form-label">
                          雪場：
                        </label>
                        <p className="fw-bold">
                          {order.skiResortName
                            ? order.skiResortName
                            : order.skiResort?.chineseName}
                        </p>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex align-items-center">
                        <label htmlFor="" className="form-label">
                          類型：
                        </label>
                        <p className="fw-bold">
                          {order.class?.skiType === "double" ? "雙板" : "單板"}
                        </p>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex align-items-center">
                        <label htmlFor="" className="form-label">
                          教練：
                        </label>
                        <p className="fw-bold">
                          {order.coachName
                            ? order.coachName
                            : order.coach?.name}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card border-0">
              <h5 className="card-title text-center border border-brand-02 bg-brand-02 text-white border-radius-top-20 p-3 mb-0">
                學員資料
              </h5>
              <div className="card-body border border-brand-02">
                <div className="mb-3">
                  <div className="d-flex align-items-center">
                    <label htmlFor="" className="form-label">
                      上課人數：
                    </label>
                    <p className="fw-bold">
                      {order.studentsData?.studentNum} 人
                    </p>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="d-flex align-items-center">
                    <label htmlFor="" className="form-label">
                      滑行程度：
                    </label>
                    <p className="fw-bold">
                      {
                        skiLevel.find(
                          (level) =>
                            level[0] === String(order.studentsData?.skiLevel)
                        )?.[1]
                      }
                    </p>
                  </div>
                </div>
                <div className="row g-3">
                  {order.studentsData?.students.map((student, index) => {
                    return (
                      <div key={index} className="col-4">
                        <div className="card border-0">
                          <h5 className="card-title text-center border border-brand-02 bg-brand-02 text-white border-radius-top-20 p-3 mb-0 fs-6">
                            學員
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
            <div className="row">
              <div className="col-6">
                <div className="card border-0 h-100">
                  <h5 className="card-title text-center border border-brand-02 bg-brand-02 text-white border-radius-top-20 p-3 mb-0">
                    聯繫方式
                  </h5>
                  <div className="card-body border border-brand-02">
                    <div className="mb-3">
                      <div className="d-flex align-items-center">
                        <label htmlFor="" className="form-label">
                          姓名：
                        </label>
                        <p className="fw-bold">{order.contactInfo?.name}</p>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex align-items-center">
                        <label htmlFor="" className="form-label">
                          聯絡電話：
                        </label>
                        <p className="fw-bold">{order.contactInfo?.phone}</p>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex align-items-center">
                        <label htmlFor="" className="form-label">
                          E-mail：
                        </label>
                        <p className="fw-bold">{order.contactInfo?.email}</p>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex align-items-center">
                        <label htmlFor="" className="form-label">
                          LINE ID：
                        </label>
                        <p className="fw-bold">{order.contactInfo?.lineId}</p>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex">
                        <label htmlFor="" className="form-label text-nowrap">
                          備註：
                        </label>
                        <p className="fw-bold">{order.contactInfo?.note}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="card border-0 h-100">
                  <h5 className="card-title text-center border border-brand-02 bg-brand-02 text-white border-radius-top-20 p-3 mb-0">
                    付款明細
                  </h5>
                  <div className="card-body border border-brand-02">
                    <div className="mb-3">
                      <div className="d-flex align-items-center">
                        <label htmlFor="" className="form-label">
                          付款方式：
                        </label>
                        <p className="fw-bold">
                          {order.paymentMethod === "1" ? "信用卡" : "銀行轉帳"}
                        </p>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex align-items-center">
                        <label htmlFor="" className="form-label">
                          價格/每小時：
                        </label>
                        <p className="fw-bold">
                          {" "}
                          JPY{" "}
                          {order.coachPrice
                            ? order.coachPrice?.toLocaleString()
                            : order.coach?.charge?.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex align-items-center">
                        <label htmlFor="" className="form-label">
                          時數：
                        </label>
                        <p className="fw-bold">
                          {order.paymentDetail?.hours} 小時
                        </p>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex align-items-center">
                        <label htmlFor="" className="form-label">
                          人數：
                        </label>
                        <p className="fw-bold">
                          {order.paymentDetail?.studentNum} 人
                        </p>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex align-items-center">
                        <label htmlFor="" className="form-label fs-5">
                          總金額：
                        </label>
                        <p className="fs-4 fw-bold danger-text">
                          JPY {order.paymentDetail?.total.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto">
            <button
              onClick={() => navigate("/admin/orders")}
              type="button"
              className="btn btn-brand-01 w-content my-5"
            >
              回預約訂單列表
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
