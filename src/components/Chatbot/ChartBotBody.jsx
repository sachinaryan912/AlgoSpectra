import React, { useState, useRef } from 'react';
import {
  Fab,
  Paper,
  IconButton,
  Typography,
  TextField,
  Button,
  Box
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import Draggable from 'react-draggable';
import axios from 'axios';

export default function ChatbotBody() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // Refs for draggable components
  const fabRef = useRef(null);
  const chatRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;
  
    const userMessage = input;
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setInput('');
  // console.log(process.env.REACT_APP_OPENAI_API_KEY);
  
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: userMessage }],
          temperature: 0.7
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}` // replace with your key
          }
        }
      );
  
      const botReply = response.data.choices[0].message.content.trim();
      setMessages(prev => [...prev, { text: botReply, sender: 'bot' }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { text: "Sorry, I couldn't get a response.", sender: 'bot' }]);
    }
  };

//   const handleSend = () => {
//     if (!input.trim()) return;
//     setMessages(prev => [...prev, { text: input, sender: 'user' }]);
//     setInput('');
//     setTimeout(() => {
//       setMessages(prev => [...prev, { text: 'Hello! How can I help you?', sender: 'bot' }]);
//     }, 600);
//   };

  return (
    <>
      {/* Draggable FAB */}
      <Draggable nodeRef={fabRef}>
        <div
          ref={fabRef}
          style={{
            position: 'absolute',
            bottom: 16,
            right: 16,
            zIndex: 1300,
            cursor: 'grab',
          }}
        >
          <Fab color="primary" onClick={() => setOpen(!open)}>
            <ChatIcon />
          </Fab>
        </div>
      </Draggable>

      {/* Draggable Chatbot Window */}
      {open && (
        <Draggable nodeRef={chatRef} handle=".chat-header">
          <div
            ref={chatRef}
            style={{
              position: 'absolute',
              bottom: 100,
              right: 20,
              zIndex: 1400,
              width: 320,
            }}
          >
            <Paper
              elevation={6}
              sx={{
                height: 420,
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
              }}
            >
              {/* Drag handle */}
              <Box
                className="chat-header"
                sx={{
                  p: 1,
                  bgcolor: 'primary.main',
                  color: 'white',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'move',
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8
                }}
              >
                <Typography variant="subtitle1">AlgoBot</Typography>
                <IconButton size="small" sx={{ color: 'white' }} onClick={() => setOpen(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>

              {/* Messages */}
              <Box sx={{ flex: 1, overflowY: 'auto', p: 1 }}>
                {messages.map((msg, i) => (
                  <Box
                    key={i}
                    sx={{
                      textAlign: msg.sender === 'user' ? 'right' : 'left',
                      mb: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        display: 'inline-block',
                        p: 1,
                        borderRadius: 2,
                        bgcolor: msg.sender === 'user' ? 'primary.light' : 'grey.300',
                        color: 'black',
                        maxWidth: '80%',
                      }}
                    >
                      {msg.text}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* Input */}
              <Box sx={{ display: 'flex', p: 1, gap: 1 }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Type something..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') handleSend();
                  }}
                />
                <Button variant="contained" onClick={handleSend}>
                  Send
                </Button>
              </Box>
            </Paper>
          </div>
        </Draggable>
      )}
    </>
  );
}
