import BackToTopButton from '../../components/BackToTopButton';
import BannerSection from './homeComps/BannerSection';
import ServicesSection from './homeComps/ServicesSection';
import SwiperSection from './homeComps/swiperSection';
import SkiHouseSection from './homeComps/SkiHouseSection';
import ArticleSection from './homeComps/ArticleSection';



import './Home.scss';

function Home() {

  return (
    <>
      <main className="bg-gray-05">
        <BackToTopButton />
      {/* banner */}
        <BannerSection />
      {/* 提供的服務 */}
        <ServicesSection />
      {/* 教練 */}          
        <SwiperSection />
      {/* 雪場 */}  
        <SkiHouseSection />
      {/* 文章 */}
        <ArticleSection />
      </main>
    </>
  )
}

export default Home
