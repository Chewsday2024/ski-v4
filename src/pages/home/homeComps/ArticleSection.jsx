import { Link } from 'react-router';
import BackToTopButton from '../../../components/BackToTopButton';

function ArticleSection() {
  const imagesData = [
    {
      id:1,
      url: "https://images.unsplash.com/photo-1596473536124-397c469c8506?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id:2,
      url: "https://images.unsplash.com/photo-1707923391566-75d852902fc5?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id:3,
      url: "https://images.unsplash.com/photo-1707923392378-bdbbbb2e7442?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id:4,
      url: "https://images.unsplash.com/photo-1707923391552-b63a21b301c6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id:5,
      url: "https://images.unsplash.com/photo-1521509914299-f45173fd00bd?q=80&w=2748&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id:6,
      url: "https://images.unsplash.com/photo-1656323542916-593133787561?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ]

  return (
    <>
    <BackToTopButton />
    <section className="py-5" style={{background:"url('https://firebasestorage.googleapis.com/v0/b/homework-b5f67.appspot.com/o/Rectangle%204.png?alt=media&token=573736d0-99bf-4e55-9b40-2217764e23db') no-repeat center center/cover"}}>
      <div className="container d-flex flex-column align-items-center">
        <div className="border-1 border-bottom border-gray-03 w-50 mb-5">
          <h3 className="text-center text-brand-01 pb-4">推薦文章</h3>
        </div>
        <Link to="/article" className="card border-0 col-10 mb-3 p-4 text-decoration-none">
          <div className="row g-4">
            <div className="col-md-8">
              <div className="card-body p-0">
                <div className="d-flex align-items-center">
                  <img src="https://images.unsplash.com/photo-1710170599407-618cca3904d6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="img-fluid rounded-circle me-4" alt="" style={{width:"80px", height:"80px", objectFit: "cover"}}/>
                  <div className="d-flex flex-column">
                    <h5 className="card-title">五條老師</h5>
                    <small className="text-muted">單板/雙板</small>
                    <small className="text-muted">輕井澤王子飯店滑雪場</small>
                  </div>
                </div>
                <div className="d-flex flex-column">
                  <p className="card-text my-md-4 py-2">
                    滑雪教學是一種結合運動與樂趣的體驗。從基本技巧到高階挑戰，專業教練將引導學員掌握滑雪技巧，提升自信心與安全意識，讓每次滑雪都成為難忘的回憶，無論是初學者還是進階玩家，都能在雪場中找到屬於自己的節奏，享受速度與自由，感受大自然的美好與挑戰的樂趣<small className="text-gray-02 hover-brand-01">...Read More</small>
                  </p>

                </div>
              </div>
            </div>
            <div className="col-md-4">
              <img src="https://images.unsplash.com/photo-1596473536056-91eadf31189e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="img-fluid rounded" alt="..." style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>
        </Link>
        <div className="row col-10 row-cols-1 row-cols-lg-3 g-2 g-lg-3">
          {imagesData.map((item, index) => (
            <div className="col" key={index}>
              <div style={{ height: "200px", overflow: "hidden" }}> {/* 固定高度容器 */}
                <img
                  src={item.url}
                  alt=""
                  className="img-fluid rounded w-100 h-100 hover-zoom object-fit-cover" // 撑满容器
                  style={{ objectFit: "cover" }} // 保持图片比例
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  )
}

export default ArticleSection;