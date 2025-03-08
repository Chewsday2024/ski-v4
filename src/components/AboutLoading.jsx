import { useState } from "react"
import ReactLoading from 'react-loading';
// import BounceLoader from "react-spinners/BounceLoader";

const promiseSetTimeout = (status) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (status) {
        resolve('good')
      } else {
        reject('bad')
      }
    },2000)
  })
}

function AboutLoading() {
  const [loadingState, setLoadingState] = useState(false)

  const fullScreenLoading = async () => {
    setLoadingState(true);
    
    try {
      await promiseSetTimeout(true)
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingState(false)
    }
  }
  

  return (<>
    <h1>讀取效果</h1>
    <button type="button" onClick={fullScreenLoading} className="w-25">pin me to start</button>
    
      { loadingState && (<div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'ragb(255, 255, 255, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        backdropFilter: 'blur(4px)'
      }
      }>
      <ReactLoading type={'bubbles'} color={'#779ECB'} height={100} width={100} />
      {/* <BounceLoader
        color="#779ECB"
        cssOverride={{}}
        size={60}
        speedMultiplier={1}
      /> */}
      </div>) }
    
  </>)

  
}

export default AboutLoading;