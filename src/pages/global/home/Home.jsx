import React from 'react'
import Banner from '../../components/banner/Banner'
import './home.scss'

export default function Home() {
  return (
    <div>
      <Banner/>
      <section className='home-content'>
        <section className='subTitle-container'>
          <h2>It’s not a pipeline problem. <br />
          <span>It’s a spotlight problem.</span></h2>
          <p>Tech hiring needs a reset. From prepping for jobs and practicing coding to running a<br /> world-class technical interview, give developers the tools they need to showcase<br /> their skills, passion, and potential.</p>
        </section>
      </section>
    </div>
  )
}
