import DOMPurify from "dompurify";

import { useState } from "react";
import "../home/Home.scss";
import "./AboutUs.scss"

function AboutUs() {
  const [selectedMember, setSelectedMember] = useState(null); // 存儲當前選中的成員

  const members = [
    {
      id: 1,
      name: "C",
      image: "",
      discord: "11",
      mail: "11@mail",
      level: [{ css: "LV.4", js: "LV.3", react: "LV.3" }],
      responsible: "首頁、Header、footer、會員登入、關於我們",
      text: `心得分享`,
    },
    {
      id: 2,
      name: "J",
      image: "",
      discord: "22",
      mail: "11@mail",
      level: [{ css: "LV.4", js: "LV.3", react: "LV.3" }],
      responsible: "首頁、Header、footer、會員登入、關於我們",
      text: `心得分享`,
    },
    {
      id: 3,
      name: "K",
      image: "",
      discord: "33",
      mail: "11@mail",
      level: [{ css: "LV.4", js: "LV.3", react: "LV.3" }],
      responsible: "首頁、Header、footer、會員登入、關於我們",
      text: `心得分享`,
    },
    {
      id: 4,
      name: "雪粒",
      image: "public/host.jpg",
      discord: "queque6086",
      mail: "shw18731@gmail.com",
      level: [{ css: "LV.4", js: "LV.3", react: "LV.3" }],
      responsible: "首頁、Header、footer、會員登入、關於我們",
      text: `
      <h5 className="mb-2">團隊合作</h5>
      <p class="mb-3">
        這次與新團隊一起從零開始創作這個專題，體驗到許多的合作體驗。<br />
        在每週的會議與你們討論學習內容、一起解衝突、在每一次溝通之中不停的成長、遇到困難時互相支援，每一次的溝通與討論都讓我有所成長。<br />
        大家都非常努力，能夠持續的堅持下來也是因為有你們的陪伴🥲
      </p>
      <h5 class="mb-2">個人學習</h5>
      <p class="mb-2">
        這是我第一次使用 React 進行專題開發，深刻體會到 React 的強大@@<br />
        除了技術層面，我也逐漸的開始建立自己的開發習慣<br />
        。更有系統地規劃專案結構<br />
        。更加了解如何整理元件及撰寫更易讀的程式碼<br />
        。更有效率地使用 Git 進行版本控制<br />
      </p>
      <p class="h6 mt-3">這是一段充滿挑戰也非常有收穫的旅程，感謝團隊的每一位成員，也感謝這段學習的過程！</p>
      <p class="text-end fs-xs mt-3">2025。春</p>
    `
    },
  ];

  const [copied, setCopied] = useState(null);

  // 複製帳號
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(text); // 記錄已複製的內容
      setTimeout(() => setCopied(null), 1000); // 1.5 秒後清除狀態
    });
  };

  return (
    <>
      <section>
        <div className="background-overlay mb-5">
          <div className="container d-flex justify-content-start h-100">
            <div className="d-flex flex-column justify-content-center align-items-start text-white fs-2 lh-1 z-3">
              <p>Snow Buddy </p>
              <p>希望成為你滑雪旅程中的知心夥伴</p>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-10">
              <div className="text-brand-01 text-center fs-5 mb-5 pb-3">
                <p>專題緣起於成員在雪場的親身經歷，在沒有良好請教練的情況下差點受傷。</p>
                <p>希望可以為嘗試滑雪的朋友提供一個方便找到優秀、合適的滑雪教練。</p>
                <p>讓大家在雪山上留下的都是美好的記憶，更有機會再次於雪場與你相見。</p>
              </div>
              <div className="d-flex flex-column align-items-center">
                <h3 className="text-center border-bottom text-brand-01 pb-1 mb-3 w-75">開發團隊</h3>
                <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 gx-lg-5">
                  {members.map((item) => (
                    <div className="col my-4" key={item.id}>
                      <div
                        className="card border-0 mx-auto"
                        style={{ width: "15rem" }}
                      >
                        <div className="d-flex justify-content-center">
                          <img
                            src={item.image}
                            className="card-img-top border border-secondary-subtle rounded rounded-4"
                            alt="..."
                            style={{
                              width: "220px",
                              height: "220px",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                        <div className="card-body p-4">
                          <h5 className="card-title">{item.name}</h5>
                          <p className="card-text">
                          <p>
                            <a
                              className="d-flex align-items-center text-decoration-none text-brand-01 hover-brand-02 fs-xs"
                              href={`mailto:${item.mail}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i className="fs-4 bi bi-envelope-fill me-2"></i>
                              {item.mail}
                            </a>
                          </p>
                            <button
                              className="btn btn-link d-flex align-items-center text-decoration-none text-brand-01 hover-brand-02 fs-xs px-0"
                              onClick={() => copyToClipboard(item.discord)}
                            >
                              <i className="fs-4 bi bi-discord me-2"></i>
                              {item.discord}{copied === item.discord && (
                              <span className="text-success fs-xs"> ✔ 已複製！</span>
                            )}
                            </button>
                            
                          </p>
                          
                          <div className="d-flex justify-content-center mt-2">
                            <button
                              type="button"
                              className="btn btn-brand-02 btn-sm text-white"
                              data-bs-toggle="modal"
                              data-bs-target="#moreModal"
                              onClick={() => setSelectedMember(item)}
                            >
                              更多資訊
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

      </section>

      {/* Modal */}
      <div
        className="modal fade"
        id="moreModal"
        tabIndex="-1"
        aria-labelledby="moreModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header border-0">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body px-4 my-3">
              {selectedMember && (
                <>
                  <div className="d-flex align-items-stretch mb-4">
                    <img
                      src={selectedMember.image}
                      className="card-img-top border border-secondary-subtle rounded rounded-circle me-4"
                      alt="..."
                      style={{
                        width: "220px",
                        height: "220px",
                        objectFit: "cover",
                      }}
                    />
                    <div>
                      <h3 className="text-brand-01">
                        {selectedMember.name}
                      </h3>
                      <div className="d-flex">
                        
                        <a
                          className="d-inline-flex align-items-center text-decoration-none text-brand-01 hover-brand-02 fs-xs"
                          href={`mailto:${selectedMember.mail}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fs-4 bi bi-envelope-fill me-2"></i>
                          {selectedMember.mail}
                        </a>
                        <button
                          className="btn btn-link d-flex align-items-center text-decoration-none text-brand-01 hover-brand-02 fs-xs"
                          onClick={() => copyToClipboard(selectedMember.discord)}
                        >
                          <i className="fs-4 bi bi-discord me-2"></i>
                          {selectedMember.discord}{copied === selectedMember.discord && (
                          <span className="text-success fs-xs"> ✔ 已複製！</span>
                        )}
                        </button>
                        
                      </div>
                      <div className="mb-2">
                        <p>等級</p>
                        <div className="ms-3">
                          {selectedMember.level.map((lv, index) => (
                            <div key={index}>
                              <div className="d-flex">
                                <div className="w-xs me-2 mb-1">
                                  <p>CSS：</p>
                                </div>
                                <div>
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-warning py-0"
                                  >
                                    {lv.css}
                                  </button>
                                </div>
                              </div>
                              <div className="d-flex">
                                <div className="w-xs me-2 mb-1">
                                  <p>JS：</p>
                                </div>
                                <div>
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-warning py-0"
                                  >
                                    {lv.js}
                                  </button>
                                </div>
                              </div>
                              <div className="d-flex">
                                <div className="w-xs me-2 mb-1">
                                  <p>React：</p>
                                </div>
                                <div>
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-warning py-0"
                                  >
                                    {lv.react}
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <p>本專題負責：</p>
                      <p className="ms-3">{selectedMember.responsible}</p>
                    </div>
                  </div>
                  <div className="px-4">
                    <h4 className="border-bottom text-brand-01 pb-1 mb-3">
                      心得分享
                    </h4>
                    {/* bug:這裡有一段報錯，暫時排除不了 */}
                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedMember?.text) }}></div>
                  </div>
                </>
              )}
            </div>
            <div className="modal-footer border-0"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutUs;
