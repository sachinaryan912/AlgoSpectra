import React from 'react'
import AlgoVisulizerLayout from '../../layout/AlgoVisulizerLayout'
import InfixToPostfixComponent from '../../components/componentPage/InfixToPostfixComponent'

function InfixToPostfix() {
  return (
<div> <AlgoVisulizerLayout component={<InfixToPostfixComponent/>} title='Infix Postfix Visualizer'/></div>
  )
}

export default InfixToPostfix