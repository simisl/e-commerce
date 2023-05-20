import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import HomeCover from '../components/HomeCover'
import Slider from '../components/Slider'

const Home = () => {
  return (
    <div>
        {/* <Header /> */}
        <HomeCover />
        <Slider />
        {/* <Footer /> */}
    </div>
  )
}

export default Home