import React from 'react'
import AlgoVisulizerLayout from '../../layout/AlgoVisulizerLayout'
import JsonVisulizerComponent from '../../components/componentPage/JsonVisulizerComponent'

function JsonVisual() {
  return (
    <div> <AlgoVisulizerLayout component={<JsonVisulizerComponent/>} title='JSON Visualizer'/></div>
  )
}

export default JsonVisual