import React from 'react'
import "./style.css"
import { Box } from '@mui/material'
import Navbar from '../components/navbar/Navbar'
import ChatbotBody from '../components/Chatbot/ChartBotBody'

function AlgoVisulizerLayout({ component, title = "" }) {
  return (
    <Box className="main-containe">
      <ChatbotBody />
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
