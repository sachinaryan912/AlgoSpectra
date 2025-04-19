import React from 'react'
import AlgoVisulizerLayout from '../layout/AlgoVisulizerLayout'
import Dashboard from '../components/componentPage/Dashboard'

function DashboardPage() {
  return (
    <div>
      <AlgoVisulizerLayout component={<Dashboard/>} title='Dashboard'/>
    </div>
  )
}

export default DashboardPage