import React from 'react'
import AlgoVisulizerLayout from '../../layout/AlgoVisulizerLayout'
import QueueComponent from '../../components/componentPage/QueueComponent'

function QueuePage() {
  return (
    <div> <AlgoVisulizerLayout component={<QueueComponent/>} title='Queue Visualizer'/></div>
  )
}

export default QueuePage