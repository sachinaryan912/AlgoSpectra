import React from 'react'
import AlgoVisulizerLayout from '../../layout/AlgoVisulizerLayout'
import StackComponent from '../../components/componentPage/StackComponent'

function StackPage() {
  return (
    <div> <AlgoVisulizerLayout component={<StackComponent/>} title='Stack Visualizer'/></div>
  )
}

export default StackPage