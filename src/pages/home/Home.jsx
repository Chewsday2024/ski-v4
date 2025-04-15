import BackToTopButton from '../../components/BackToTopButton';
import BannerSection from './homeComps/BannerSection';
import ServicesSection from './homeComps/ServicesSection';
import CoachesSection from './homeComps/CoachesSection';
import SkiHouseSection from './homeComps/SkiHouseSection';
import ArticleSection from './homeComps/ArticleSection';
import FAQ from './homeComps/FAQ';

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
        <CoachesSection />
        {/* 雪場 */}  
        <SkiHouseSection />
        {/* 文章 */}
        <ArticleSection />
        {/* 常見問題 */}
        <FAQ />
      </main>
    </>
  )
}

export default Home
