import { Link } from "react-router";
import "./Admin.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { twFormatter } from "./adminUtils/TimeFormat";
import Swal from "sweetalert2";

export default function OrderListPage() {
  const BASE_URL = "https://ski-api-m9x9.onrender.com"; //正式機
  // const BASE_URL = "http://localhost:3000";             //測試機

  const [allOrders, setAllOrders] = useState([]); //全部訂單
  const [filteredOrders, setFilteredOrders] = useState([]); //篩選後的訂單

  const [selectedStatus, setSelectedStatus] = useState(""); //選中的訂單狀態
  const [selectedStartDate, setSelectedStartDate] = useState(""); //選中的開始日期
  const [selectedEndDate, setSelectedEndDate] = useState(""); //選中的結束日期
  const [selectedCategory, setSelectedCategory] = useState(""); //選中的分類
  const [inputWords, setInputWords] = useState(""); //輸入的搜尋關鍵字

  // 取得訂單資料
  const getOrders = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/orders?_expand=user`);
      setAllOrders(res.data);
      setFilteredOrders(res.data);
    } catch (error) {
      Swal.fire({
        title: "取得訂單資料失敗",
        text: error.message,
        icon: "error",
        confirmButtonText: "確定"
      });
    }
  };

  // 依據訂單狀態的選擇，篩選訂單
  const handleOrders = (status) => {
    const orders = allOrders.filter((order) => {
      if (status === "") {
        return allOrders;
      }
      return order.orderStatus === Number(status);
    });
    setFilteredOrders(orders);
  };

  // 根據時間區間進行篩選
  const handleSearchOrders = () => {
    let keywords = "";
    if (inputWords !== "") {
      keywords = inputWords.trim().toLowerCase(); //關鍵字處理：移除前後空白 & 轉小寫字母
    }
    const result = allOrders.filter(
      (order) =>
        // 沒有選分類 or 符合關鍵字搜尋
        (!selectedCategory ||
          (selectedCategory === "orderId" &&
            String(order.id).toLowerCase().includes(keywords)) ||
          (selectedCategory === "member" &&
            order.user?.user.toLowerCase().includes(keywords))) &&
        // 沒有選訂單狀態 or 訂單狀態有選
        (!selectedStatus ||
          (selectedStatus && order.orderStatus === Number(selectedStatus))) &&
        // 沒有選日期 or 有選日期
        (!selectedStartDate ||
          !selectedEndDate ||
          (selectedStartDate &&
            selectedEndDate &&
            new Date(order.orderTime) >=
              new Date(new Date(selectedStartDate).setHours(0, 0, 0, 0)) &&
            new Date(order.orderTime) <=
              new Date(new Date(selectedEndDate).setHours(23, 59, 59, 0))))
    );
    setFilteredOrders(result);
  };

  // 更新訂單狀態使用
  const updateStatus = async () => {
    const now = new Date();
    await Promise.all(
      allOrders.map(async (order) => {
        const end = new Date(order.class.endDate);
        const date = new Date(order.class.date);
        if (order.orderStatus === 0 && (end <= now || date <= now)) {
          order.orderStatus = 1;
          await changeStatus(order.id, order);
        }
      })
    );
    getOrders();
  };

  const changeStatus = async (id, order) => {
    try {
      await axios.put(`${BASE_URL}/orders/${id}`, order);
      // alert("資料更新完畢!");
    } catch (error) {
      Swal.fire({
        title: "資料更新失敗",
        text: error.message,
        icon: "error",
        confirmButtonText: "確定"
      });
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <main className="admin-content container d-flex flex-column justify-content-between">
        <div>
          <div className="py-4 d-flex gap-3">
            <h3>預約訂單</h3>
            <button
              onClick={() => {
                updateStatus();
              }}
              type="button"
              className="btn btn-brand-01 btn-sm"
            >
              更新訂單狀態
            </button>
          </div>
          <form className="d-flex text-nowrap gap-5 pb-3 border-bottom">
            <div className="d-flex">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                }}
                className="form-select w-auto"
              >
                <option value="">選擇分類</option>
                <option value="orderId">訂單編號</option>
                <option value="member">會員</option>
              </select>
              <input
                value={inputWords}
                onChange={(e) => {
                  setInputWords(e.target.value);
                }}
                className="form-control me-2"
                type="search"
                placeholder="請輸入關鍵字"
                aria-label="Search"
              />
            </div>
            <div className="d-flex align-items-center">
              <label htmlFor="startDate" className="form-label me-1">
                訂單時間
              </label>
              <input
                value={selectedStartDate}
                onChange={(e) => {
                  setSelectedStartDate(e.target.value);
                }}
                type="date"
                className="form-control"
                id="startDate"
                placeholder="開始日期"
              />
              <input
                value={selectedEndDate}
                onChange={(e) => {
                  setSelectedEndDate(e.target.value);
                }}
                type="date"
                className="form-control"
                id="endDate"
                placeholder="結束日期"
              />
            </div>
            <button
              onClick={() => {
                handleSearchOrders();
              }}
              type="button"
              className="btn btn-brand-01"
            >
              搜尋
            </button>
          </form>
        </div>
        <div>
          <div className="mb-1 d-flex justify-content-between mb-3">
            <div className="d-flex align-items-center">
              <label htmlFor="orderStatus" className="form-label me-1">
                訂單狀態
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                  handleOrders(e.target.value);
                }}
                className="form-select w-auto"
                id="orderStatus"
              >
                <option value="">全部</option>
                <option value="0">未完成</option>
                <option value="1">已完成</option>
              </select>
            </div>
            <select className="form-select w-auto d-none">
              <option value="25">每頁 25 筆</option>
              <option value="50">每頁 50 筆</option>
              <option value="100">每頁 100 筆</option>
              <option value="200">每頁 200 筆</option>
            </select>
          </div>
          <div className="admin-table-content overflow-y-auto">
            <table className="table table-hover table-responsive">
              <thead>
                <tr>
                  <th scope="col">訂單時間</th>
                  <th scope="col">訂單編號</th>
                  <th scope="col">會員</th>
                  <th scope="col">訂單金額 (JPY) </th>
                  <th scope="col">訂單狀態</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length !== 0 ? (
                  filteredOrders.toReversed().map((order) => {
                    return (
                      <tr key={order.id}>
                        <td>{twFormatter.format(new Date(order.orderTime))}</td>
                        <td>{order.id}</td>
                        <td>{order.user?.user}</td>
                        <td>{order.paymentDetail.total.toLocaleString()}</td>
                        <td
                          className={
                            order.orderStatus === 1 ? "" : "danger-text"
                          }
                        >
                          {order.orderStatus === 1 ? "已完成" : "未完成"}
                        </td>
                        <td>
                          <Link
                            to={`/admin/orders/${order.id}`}
                            className="me-4"
                          >
                            <span className="material-symbols-outlined align-middle text-brand-01">
                              visibility
                            </span>
                          </Link>
                          {/* <Link to="/">
                                          <span className="material-symbols-outlined align-middle text-brand-01">edit</span>
                                      </Link>       */}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td className="text-center py-3" colSpan={5}>
                      找不到符合條件的訂單(´-﹏-`；)
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center d-none">
              <li className="page-item">
                <Link to="" className="page-link" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </Link>
              </li>
              <li className="page-item">
                <Link to="" className="page-link">
                  1
                </Link>
              </li>
              <li className="page-item">
                <Link to="" className="page-link">
                  2
                </Link>
              </li>
              <li className="page-item">
                <Link to="" className="page-link">
                  3
                </Link>
              </li>
              <li className="page-item">
                <Link to="" className="page-link" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </main>
    </>
  );
}
