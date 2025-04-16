import React from 'react'
import AlgoVisulizerLayout from '../layout/AlgoVisulizerLayout'
import HomeComponent from '../components/componentPage/HomeComponent'

function HomePage() {
  return (
    <div>
      <AlgoVisulizerLayout component={<HomeComponent/>} title='AlgoSpectra'/>
    </div>
  )
}

export default HomePage