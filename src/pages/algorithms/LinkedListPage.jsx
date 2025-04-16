import React from 'react'
import LinkedListComponent from '../../components/componentPage/LinkedListComponent'
import AlgoVisulizerLayout from '../../layout/AlgoVisulizerLayout'

function LinkedListPage() {
  return (
    <div>
        <AlgoVisulizerLayout component={<LinkedListComponent/>} title='LinkedList Visualizer'/>
    </div>
  )
}

export default LinkedListPage