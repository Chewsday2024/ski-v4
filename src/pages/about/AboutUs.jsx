import { useState } from "react";
import "../home/Home.scss";
import "./AboutUs.scss"

function AboutUs() {
  const [selectedMember, setSelectedMember] = useState(null); // 存儲當前選中的成員

  const members = [
    {
      id: 1,
      name: "Chewsday",
      image: "member-Chewsday.png",
      discord: "dd.kk",
      mail: "z647623@gmail.com",
      level: [{ css: "LV.4", js: "LV.3", react: "LV.3", git: "LV.3" }],
      responsible: `
      <p>Vite、Git環境建置</p>
      <p>Wireframe 繪製</p>
      <p>切版 & 相關資料串接</p>
      <p class="mt-2">負責區域：</p>
      <ul>
        <li>教練列表頁面</li>
        <li>教練個人頁面</li>
      </ul>
      `,
      text: `<p>開始使用框架製作作品後就漸漸感受到一種工作量的感覺，操作從原本的切版轉移成了邏輯運用，還不習慣程式語言的邏輯還滿辛苦的，但一點一滴的解開謎題而累積到知識量後就慢慢可以順利的寫出一次到位的程式碼了，還不是最完美也不是最乾淨的程式碼，但可以順利動起來時也是充滿成就感</p><h5 class="text-brand-01 my-2">開發困境</h5><p>學習後的知識量常常不夠實際操作應用，很常需要再另外找資源補充，幸運的是都可以找到可以解決方法，不過也許都是卡在一些基礎水平的事情上，畢竟是從0開始學習，掌握的資訊不夠也不夠熟悉，運用上當然很難受</p>`,
    },
    {
      id: 2,
      name: "JIA",
      image: "member-JIA.png",
      discord: "busy_dolphin_28073",
      mail: "a0911210143@gmail.com",
      level: [{ css: "LV.3", js: "LV.3", react: "LV.3", git: "LV.3" }],
      responsible: `
      <p>Wireframe 繪製</p>
      <p>切版 & 相關資料串接</p>
      <p class="mt-2">負責區域：</p>
      <ul>
        <li>雪場總覽</li>
        <li>雪場詳細介紹</li>
      </ul>
      `,
      text: `
      <p class="mb-3">覺得自己很幸運可以遇到這麼棒的組員們，除了都非常優秀之外每當有夥伴提出問題時，大家總是能集思廣益找出辦法，而我好像只是受益者。希望我也能成為替別人解答的小幫手！</p>
      <h5 class="text-brand-01 mb-2">開發困境</h5>
      <p>上課的時候都覺得有聽懂，寫作業跟著助教的步驟去做感覺有理解那麼一點點，</p>
      <p>可是真正自己在開發時，才發現自己根本懵懵懂懂</p>
      `,
    },
    {
      id: 3,
      name: "卡卡",
      image: "member-kaka.png",
      discord: "kaka_945",
      mail: "superkay0101@gmail.com",
      level: [{ css: "LV.4", js: "LV.3", react: "LV.3", git: "LV.3" }],
      responsible: `
      <p>Wireframe 繪製</p>
      <p>切版 & 相關資料串接</p>
      <p class="mt-2">負責區域：</p>
      <ul>
        <li>預約教練相關頁面</br>(預約資料頁、填寫聯繫方式＆付款頁、預約成功 & 失敗頁)</li>
        <li>後台訂單頁</li>
      </ul>
      `,
      text: `
      <h5 class="text-brand-01 mb-2">團隊合作</h5>
      <p class="mb-3">第一次跟組員們一起合作專題，開始前既興奮又期待，從一開始的專題發想，使用者故事，繪製 wireframe，到真正進開發，開始擔憂會不會做不出來或是拖累團隊進度，很開心做專題的過程中，遇到事情時，團員們總能不斷的溝通取得共識，有困難時，大家也都會一起互動幫忙解決問題，互相為彼此加油打氣，很開心可以跟大家一起共事做專題，你們都是最棒的！！！</p>
      <h5 class="text-brand-01 mb-2">個人學習</h5>
      <p>第一次使用 React 進行合作開發，學到以下技能</p>
      <ul>
        <li>使用 Git 與他人合作與版本控管</li>
        <li>使用 Bootstrap 自訂義變數與樣式套用</li>
        <li>使用 useContext 進行跨頁面資料傳遞</li>
        <li>使用 json-server 模擬 RESTful API 進行資料存取</li>
      </ul>
      <p class="mb-3">透過本次專題，學習到完整的前端開發流程，最後感謝專題小組的組員們與自己對本次專題的貢獻，學習是一段沒有終點的道路，期許自己未來回顧這段經歷時，能記得當初的努力與成長，並將這份經驗轉化為持續進步的動力。</p>
      <h5 class="text-brand-01 mb-2">開發困境</h5>
      <ol>
        <li>很常遇到環境或是版本不相容的問題，遇到這類的問題通常都會卡很久…
感謝現代科技有 ChatGPT & Google 大神，逐一排錯後終於解決啦～</li>
        <li>關於 React 的知識，很常眼睛看懂了，腦袋卻沒懂，透過每次的作業＆跟小夥伴們合作的專題，訓練自己對於 react 的掌握度，雖然目前還是小菜雞一枚，但我會加油的</li>
      </ol>
      `,
    },
    {
      id: 4,
      name: "雪粒",
      image: "member-sherry.png",
      discord: "queque6086",
      mail: "shw18731@gmail.com",
      level: [{ css: "LV.5", js: "LV.6", react: "LV.4", git: "LV.3" }],
      responsible: `
      <p>logo製作</p>
      <p>Wireframe 繪製</p>
      <p>切版 & 相關資料串接</p>
      <p class="mt-2">負責區域：</p>
      <ul>
        <li>首頁、Header、footer、會員註冊登入、關於我們</li>
      </ul>
      `,
      text: `
      <h5 class="text-brand-01 mb-2">團隊合作</h5>
      <p class="mb-3">
        這次與新團隊一起從零創作這個專題，增加了很多團隊合作的經驗值！<br />
        每週的會議與你們討論學習內容、每一次都有所收穫，<br />
        遇到困難時互相支援，到最後一起解衝突、一起做出作品。<br />
        大家真的都非常努力，能夠堅持下來也是因為有你們的陪伴！(灑淚
      </p>
      <h5 class="text-brand-01 mb-2">個人學習</h5>
      <p class="mb-2">
        這是我第一次使用 React 進行專題開發，深刻體會到 React 的強大@@<br />
        除了技術層面，我也逐漸的開始建立自己的開發習慣
      </p>
      <ul>
        <li>更有系統地規劃專案結構</li>
        <li>更加了解如何整理元件及撰寫更易讀的程式碼</li>
        <li>更有效率地使用 Git 進行版本控制</li>
      </ul>
      <h5 class="text-brand-01 mb-2">開發困境</h5>
      <p>上課時覺得都學會了，實戰時發現都學廢了，遇到了很多因為細節而導致的錯誤</p>
      <p>80%錯誤AI都可以解決，剩下的20%才是最難的🥲</p>
      <p class="mb-3">一切都在學中做、做中學，困境都是增加經驗的魂魄！</p>

      <h5 class="text-brand-01 mb-2">未來展望</h5>
      <p>關於專題 - 繼續完善網站內容，目標是能符合上線運行的標準</p>
      <p>關於個人 - 希望能多學習更多技術，嘗試製作更多不同的專題</p>
      <p class="h6 text-brand-01 text-center mt-3">這是一段充滿挑戰也非常有收穫的旅程，感謝團隊的每一位成員，也感謝這段學習的過程！</p>
      <p class="text-brand-01 text-end fs-xs mt-3">2025。春</p>
    `
    },
  ];

  // 等級對照表Accordion功能
  const [isOpen, setIsOpen] = useState(false);

  // 複製帳號
  const [copied, setCopied] = useState(null);
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
              <div className="text-brand-01 text-center fs-5 mb-5 py-5">
                <p>專題緣起於成員在雪場的親身經歷，在沒有良好學習的情況下差點受傷</p>
                <p>希望所有想滑雪的朋友都能找到一個優秀、合適的教練，讓大家在雪山上都能夠玩得安全！玩得開心！</p>
                {/* <p>讓大家在雪山上都能夠玩得安全！玩得開心！</p> */}
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
                            data-bs-toggle="modal"
                            data-bs-target="#moreModal"
                            onClick={() => setSelectedMember(item)}
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
                          <h5 className="card-title text-brand-01 fs-3">{item.name}</h5>
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
                            <div
                              className="btn btn-link d-flex align-items-center text-decoration-none text-brand-01 hover-brand-02 fs-xs px-0"
                              onClick={() => copyToClipboard(item.discord)}>
                              <i className="fs-4 bi bi-discord me-2"></i>
                              <div className="d-flex flex-column">
                                <div className="d-flex">
                                    {item.discord}<i className="fs-6 bi bi-copy mx-1"></i>
                                </div>
                                  {copied === item.discord && ( <span className="text-success fs-xs ms-1"> ✔ 已複製！</span> )}
                              </div>
                            </div>
                            
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
                          <div className="d-flex">
                              {selectedMember.discord}<i className="fs-6 bi bi-copy mx-1"></i>
                          </div>
                          {copied === selectedMember.discord && (
                          <span className="text-success fs-xs"> ✔ 已複製！</span>
                        )}
                        </button>
                        
                      </div>
                      <div className="mb-2">
                        <p className="text-brand-01">等級</p>
                        <div className="ms-3">
                          {selectedMember.level.map((lv, index) => (
                            <div key={index}>
                              <div className="d-flex">
                                <div className="w-xs me-2 mb-1">
                                  <p>CSS：</p>
                                </div>
                                <div>
                                  <span className="btn btn-sm btn-warning py-0">{lv.css}</span>
                                </div>
                              </div>
                              <div className="d-flex">
                                <div className="w-xs me-2 mb-1">
                                  <p>JS：</p>
                                </div>
                                <div>
                                  <span className="btn btn-sm btn-warning py-0">{lv.js}</span>
                                </div>
                              </div>
                              <div className="d-flex">
                                <div className="w-xs me-2 mb-1">
                                  <p>React：</p>
                                </div>
                                <div>
                                  <span className="btn btn-sm btn-warning py-0">
                                    {lv.react}
                                  </span>
                                </div>
                              </div>
                              <div className="d-flex">
                                <div className="w-xs me-2 mb-1">
                                  <p>Git：</p>
                                </div>
                                <div>
                                  <span className="btn btn-sm btn-warning py-0">
                                    {lv.git}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                          <button type="button" className="btn btn-sm btn-gray-03 text-white py-0 mt-1" onClick={() => setIsOpen(!isOpen)}>等級參考資料</button>
                            <div
                              className={`fs-xs text-gray-02 p-1 collapse ${isOpen ? "show" : ""}`}>
                              <div className="mb-2">
                                <p className="text-dark-emphasis fw-medium">CSS 等級表</p>
                                <p>LV1： 會使用 flexbox 來做元素並排</p>
                                <p>Lv2 ：可以手刻 RWD</p>
                                <p>LV3 ：學習 Bootstrap or Tailwind 框架</p>
                                <p>LV4 ：熟悉 Bootstrap or Tailwind 框架</p>
                                <p>LV5 ：使用過 Vite 來建立前端框架的 Router，並整合 BS5 </p>
                              </div>
                              <div className="mb-2">
                                <p className="text-dark-emphasis fw-medium">JS 等級表</p>
                                <p>LV1： 會一些基礎 JS（變數、if 流程判斷、函式）</p>
                                <p>Lv2 ：了解物件、陣列、DOM</p>
                                <p>LV3 ：可以介接第三方資料 GET API</p>
                                <p>LV4 ：介接 RESTful API，例如做 Todolist API 的 GET 取得、POST 新增</p>
                                <p>LV5 ：整合第三方套件，例如：C3.js、D3.js</p>
                                <p>LV6 ：會使用基本 React Hook（useState、useEffect 等）</p>
                              </div>
                              <div className="mb-2">
                                <p className="text-dark-emphasis fw-medium">React 等級表</p>
                                <p>LV1： 使用過前端框架的狀態管理（useState, ref, state）</p>
                                <p>Lv2 ：使用過前端框架的元件等知識（Component, Props, Emits）</p>
                                <p>LV3 ：使用過前端框架的路由工具，例如 VueRouter、ReactRouter</p>
                                <p>LV4 ：使用框架完成過作品或專案</p>
                                <p>LV5 ：整合第三方套件，例如：C3.js、D3.js</p>
                                <p>LV6 ：使用過框架狀態管理工具（Pinia、Vuex、Redux）</p>
                              </div>
                              <div className="mb-2">
                                <p className="text-dark-emphasis fw-medium">Git 等級表</p>
                                <p>LV1： 會使用 git init、git add、git commit、git push</p>
                                <p>Lv2 ：會使用 git pull、git merge</p>
                                <p>LV3 ：有解決過版本衝突</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                      </div>
                      <p className="text-brand-01 mt-2">本專題製作內容：</p>
                      <div className="ms-3" dangerouslySetInnerHTML={{ __html: selectedMember?.responsible }}></div>
                    </div>
                  </div>
                  <div className="px-4">
                    <h4 className="border-bottom text-brand-01 pb-1 mb-3">
                      心得分享
                    </h4>
                    <div dangerouslySetInnerHTML={{ __html: selectedMember?.text }}></div>
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
