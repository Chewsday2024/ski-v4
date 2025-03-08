function FAQ() {
  const questions = [
    {
      id: 1,
      topic: "可以跟其他人併班上課嗎？",
      answer: "不行喔，為維護教學品質，我們僅接受私人包班，教練只會服務您一組貴賓。"
    },
    {
      id: 2,
      topic: "單、雙板可一起上課嗎？",
      answer: "沒辦法喔~若有人想學單、有人想學雙，就必須請兩位教練分開上課。"
    },
    {
      id: 3,
      topic: "教練會陪我租雪具嗎？",
      answer: "沒問題！但上課時間就會從陪同時間開始計算。建議先租好，在集合時間與教練會合，這樣每一分學費，都會紮實用在學習上。"
    },
    {
      id: 4,
      topic: "小朋友幾歲可以學滑雪呢？",
      answer: "建議最小4歲~7歲：可學雙板，需一對一教學 (視情況由可自行滑行的家長陪同)。"
    },
  ]

  return (<div className="container d-flex flex-column mt-5 mb-4 pb-5">
    <div className="align-self-center border-1 border-bottom border-gray-03 w-50 mb-4">
      <h3 className="text-center text-brand-01 pb-3">常見問題</h3>
    </div>
    <div className="row justify-content-center">
      <div className="col-10">
        <div className="row row-cols-1 row-cols-lg-2">
          {
            questions.map(item => {
              return (
                <div key={item.id} className="col">
                  <div className="card bg-gray-05 border-0 p-3">
                    <div className="card-body">
                      <h5 className="card-title text-brand-02 border-bottom border-gray-03 mb-3 pb-2">Ｑ：{item.topic}</h5>
                      <p className="card-text">{item.answer}</p>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>

      </div>
    </div>
  </div>)
}

export default FAQ;