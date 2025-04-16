import React from 'react'
import "./style.css"
import { Box } from '@mui/material'
import Navbar from '../components/navbar/Navbar'

function AlgoVisulizerLayout({ component, title = "AlgoSpectra" }) {
  return (
    <Box className="main-containe">
      <Box className="header">
        <Navbar title={title} />
      </Box>
      <Box className="body">
        {component}
      </Box>
      <Box className="footer">
      Made with ❤️ for learners • © 2025 AlgoSpectra
      </Box>
    </Box>
  )
}

export default AlgoVisulizerLayout
