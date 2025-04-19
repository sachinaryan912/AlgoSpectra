import React from 'react'
import "./style.css"
import { Box } from '@mui/material'
import Navbar from '../components/navbar/Navbar'

function AlgoVisulizerLayout({ component, title = "" }) {
  return (
    <Box className="main-containe">
      {title !== "" && (
        <Box className="header">
          <Navbar title={title} />
        </Box>
      )}
      <Box className="body">
        {component}
      </Box>
    </Box>
  )
}

export default AlgoVisulizerLayout
