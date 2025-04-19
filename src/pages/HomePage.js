import React from 'react'
import AlgoVisulizerLayout from '../layout/AlgoVisulizerLayout'
import Home from '../components/componentPage/Home'

function HomePage() {
  return (
    <div>
      <AlgoVisulizerLayout component={<Home/>} title=''/>
    </div>
  )
}

export default HomePage