import { Link } from 'react-router';
import BackToTopButton from '../../components/BackToTopButton';

function ArticlePage() {
  return (
    <>
      <img className="w-100 object-fit-cover object-position-center" src="https://images.unsplash.com/photo-1548784806-b9b21e8d740f?q=80&w=2932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="滑雪照片" style={{height:"300px"}}/>
      <div className="container">
      <BackToTopButton />
        <div className="row flex-column align-items-center mt-4 mb-xxl">
          <div className="col-md-8">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item"><Link to="/" className="text-decoration-none text-gray-03">首頁</Link></li>
                <li className="breadcrumb-item"><Link to="*" className="text-decoration-none text-gray-03">所有文章</Link></li>
                <li className="breadcrumb-item text-brand-02" aria-current="page">雪境之心：在滑行中遇見自由的自己</li>
              </ol>
            </nav>
            <div className="pb-3 mb-4">
              <h2 className="mb-2">雪境之心：在滑行中遇見自由的自己</h2>
              <small className="text-gray-03 me-3">2025 / 1 / 1</small>
              <small className="text-gray-03">作者： 五條老師</small>
            </div>
            <p className="pb-3 mb-4">作為一名滑雪教練，每當我站在白雪皚皚的山頂，俯瞰腳下綿延的雪道，心中總會湧起一股難以言喻的感動。滑雪對我來說，不僅是一項運動，更是一種與自然對話的方式，一種釋放身心、找回自我的旅程。</p>
            <p className="pb-3 mb-4">記得我第一次接觸滑雪，是在日本的北海道。那時的我，還是一個對雪充滿好奇的遊客。站在初級雪道上，雙腳被固定在雪板上，我感受到一種前所未有的不安與興奮。教練告訴我：「滑雪就像人生，你要學會放鬆，才能找到平衡。」這句話深深烙印在我的腦海中，成為我日後教學的核心哲學。</p>
            <img className="w-100 object-fit-cover object-position-center pb-3 mb-4" src="https://images.unsplash.com/photo-1504446659705-07c22b96c3fd?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="滑雪照片" />
            <p className="pb-3 mb-4">起初，我的滑行並不順利。每一次摔倒，都讓我更加懷疑自己是否適合這項運動。但每當我重新站起來，調整呼吸，再次嘗試時，我發現自己比之前進步了一點點。那種逐漸掌握技巧的感覺，就像解開一道難題，充滿成就感。慢慢地，我開始享受在雪地上滑行的感覺，風從耳邊呼嘯而過，眼前的景色快速變換，彷彿整個世界都屬於我。</p>
            <p className="pb-3 mb-4">隨著經驗的累積，我開始挑戰更難的雪道。從初級的緩坡到中級的彎道，再到高級的陡坡，每一次的突破都讓我對滑雪有了更深的理解。滑雪不僅是技術的累積，更是心態的磨練。在高級雪道上，速度與風險並存，稍有不慎就可能失去控制。這時，保持冷靜與專注顯得尤為重要。我學會了如何與自己的恐懼共處，如何在高速滑行中做出精準的判斷。</p>
            <div className="row pb-3">
              <div className="col-lg-6 mb-4" style={{ height: "300px"}}>
                <img className="h-100 w-100 object-fit-cover object-position-center" src="https://images.unsplash.com/photo-1735505767859-49d4ca3964cd?q=80&w=2946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="滑雪照片" />
              </div>
              <div className="col-lg-6 mb-4" style={{ height: "300px"}}>
                <img className="h-100 w-100 object-fit-cover object-position-center" src="https://images.unsplash.com/photo-1418662589339-364ad47f98a2?q=80&w=2412&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="滑雪照片" />
              </div>
            </div>
            
            <p className="pb-3 mb-4">如今，作為一名滑雪教練，我最大的樂趣就是將這份感動傳遞給我的學員。每當看到他們從最初的緊張不安，到後來在雪地上自如滑行，臉上洋溢著自信與喜悅的笑容，我就感到無比滿足。滑雪教會了我如何面對挑戰，如何與自然和諧共處，也讓我明白，真正的自由，來自於對自己的信任與對生活的熱愛。</p>
            <p className="pb-3 mb-4">滑雪是一場沒有終點的旅程，每一次的滑行都是一次新的探索。無論你是初學者還是進階者，只要你願意踏出第一步，雪地就會為你敞開懷抱，帶你體驗那份獨一無二的自由與快樂。希望有一天，我們能在雪地上相遇，一起分享這份屬於滑雪的美好。</p>
            <img className="w-100 object-fit-cover object-position-center pb-3 mb-4" src="https://images.unsplash.com/photo-1507492147080-3d1b3e5cd0aa?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="滑雪照片" />
            <div className="">
              <span className="btn btn-brand-02 text-white px-1 py-0 me-2 fw-light">#滑雪</span>
              <span className="btn btn-brand-02 text-white px-1 py-0 me-2 fw-light">#冬季旅遊</span>
              <span className="btn btn-brand-02 text-white px-1 py-0 fw-light">#教練很帥</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ArticlePage;