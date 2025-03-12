import { Link } from 'react-router';
import './Admin.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
export default function OrderListPage(){

    const [allOrders,setAllOrders] = useState([]);

    // const [filterOrders,setFilterOrders] = useState([]);

    // 取得訂單資料
    const getOrders = async()=>{
        try {
            const res = await axios.get("http://localhost:3000/orders?_expand=user");
            setAllOrders(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    // const updateStatus = (adminOrders)=>{
    //     const now = new Date();
    //     adminOrders.map((order)=>{
    //         if (new Date(order.orderTime) > now){
    //             order.orderTime = 1;
    //         }
    //     })
    // }


    // const changeStatus = async(id)=>{
    //     try {
    //         const res = await axios.put(`http://localhost:3000/orders/${id}`,)
    //     } catch (error) {
            
    //     }
    // }

    console.log(allOrders.toReversed());
    
    useEffect(()=>{
        getOrders();
    },[])

    return(<>
        <main className="admin-content d-flex flex-column justify-content-between">
            <div>
                <div className="py-4 d-flex gap-3">
                    <h3>預約訂單</h3><button type="button" className="btn btn-brand-01 btn-sm">更新訂單狀態</button>
                </div>
                <form action="" className="d-flex text-nowrap gap-5 mb-3">
                    <div className="d-flex">
                        <select className="form-select w-auto">
                            <option value="">請選擇分類</option>
                            <option value="orderId">訂單編號</option>
                            <option value="member">會員</option>
                        </select>
                        <input className="form-control me-2" type="search" placeholder="請輸入關鍵字" aria-label="Search" />
                    </div>
                    <div className="d-flex align-items-center">
                        <label htmlFor="startDate" className="form-label me-1">時間</label>
                        <input type="date" className="form-control" id="startDate" placeholder="開始日期" />
                        <input type="date" className="form-control" id="endDate" placeholder="結束日期" />
                    </div>
                    <button type="submit" className="btn btn-brand-01">搜尋</button>
                </form>
            </div>
            <div>
                <div className="mb-1 d-flex justify-content-between mb-3">
                    <div className="d-flex align-items-center">
                        <label htmlFor="orderStatus" className="form-label me-1">訂單狀態</label>
                        <select className="form-select w-auto" id="orderStatus">
                            <option value="">全部</option>
                            <option value="0">未完成</option>
                            <option value="1">已完成</option>
                        </select>
                    </div>
                    <select className="form-select w-auto">
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
                                <th scope="col">訂單金額</th>
                                <th scope="col">訂單狀態</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allOrders.toReversed().map((order)=>{
                                    return(
                                        <>
                                            <tr key={order.id}>
                                                <td>{order.orderTime}</td>
                                                <td>{order.id}</td>
                                                <td>{order.user.user}</td>
                                                <td>{order.paymentDetail.total.toLocaleString()}</td>
                                                <td>{order.orderStatus === 1 ? "已完成":"未完成"}</td>
                                                <td>
                                                    <Link to="/" className="me-4" data-bs-toggle="modal" data-bs-target="#viewAdmin">
                                                        <span className="material-symbols-outlined align-middle text-brand-01">visibility</span>
                                                    </Link>
                                                    <Link to="/" data-bs-toggle="modal" data-bs-target="#editAdmin">
                                                        <span className="material-symbols-outlined align-middle text-brand-01">edit</span>
                                                    </Link>      
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <nav aria-label="Page navigation">
                    <ul className="pagination justify-content-center">
                        <li className="page-item">
                        <Link to="" className="page-link" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </Link>
                        </li>
                        <li className="page-item"><Link to="" className="page-link" >1</Link></li>
                        <li className="page-item"><Link to="" className="page-link" >2</Link></li>
                        <li className="page-item"><Link to="" className="page-link" >3</Link></li>
                        <li className="page-item">
                        <Link to="" className="page-link" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </main>
    </>)
}