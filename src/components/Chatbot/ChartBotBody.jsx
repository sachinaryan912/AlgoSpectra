import React, { useState, useRef, useEffect } from 'react';
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
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';


import CloseIcon from '@mui/icons-material/Close';
import Draggable from 'react-draggable';
import axios from 'axios';
import { motion } from 'framer-motion';
import '../../styles/ChatBot.css';

export default function ChatbotBody() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [responseCount, setResponseCount] = useState(
    Number(localStorage.getItem('botResponseCount')) || 0
  );

  const fabRef = useRef(null);
  const chatRef = useRef(null);
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  
    if (!open && messages.length === 0) {
      setMessages([
        {
          text: `👋 Hello! I'm AlgoBot — your personal assistant for Data Structures and Algorithms (DSA).\n⚠️ Note: You can ask up to 2 questions per session. Make them count!`,
          sender: 'bot'
        }
      ]);
    }
  };
  
  
  

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setInput('');

    if (responseCount >= 2) {
      setMessages(prev => [
        ...prev,
        {
          text: `⚠️ You've reached your free limit for this session.\n\n✨ Upgrade to unlock unlimited access using contacts and continue exploring DSA topics with us!\n\n🔁 You can also try again later.`,
          sender: 'bot'
        }
      ]);
      return;
    }
    

    try {
      setIsTyping(true);
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
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
          }
        }
      );

      const botReply = response.data.choices[0].message.content.trim();
      animateBotReply(botReply);

      const newCount = responseCount + 1;
      setResponseCount(newCount);
      localStorage.setItem('botResponseCount', newCount.toString());
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { text: "⚠️ Sorry, I couldn't get a response.", sender: 'bot' }]);
      setIsTyping(false);
    }
  };

  const animateBotReply = (fullText) => {
    let index = 0;
    const typingSpeed = 25;
    const reply = { text: '', sender: 'bot' };

    setMessages((prev) => [...prev, reply]);

    const intervalId = setInterval(() => {
      index++;
      reply.text = fullText.substring(0, index);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { ...reply };
        return updated;
      });

      if (index === fullText.length) {
        clearInterval(intervalId);
        setIsTyping(false);
      }
    }, typingSpeed);
  };

  return (
    <>
      <Draggable nodeRef={fabRef}>
        <motion.div
          ref={fabRef}
          style={{
            position: 'absolute',
            bottom: 36,
            right: 46,
            zIndex: 1300,
            cursor: 'grab'
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Fab
            sx={{
              backgroundColor: '#002d57',
              color: 'white',
              '&:hover': { backgroundColor: '#004080' },
              borderRadius: '40px'
            }}
            onClick={handleOpen}
          >
            {open ? <CloseIcon /> : <SmartToyIcon />}
          </Fab>



        </motion.div>
      </Draggable>

      {open && (
        <Draggable nodeRef={chatRef} handle=".chat-header">
          <motion.div
            ref={chatRef}
            className="chatbot-container"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Paper elevation={6} className="chat-paper">
              <Box className="chat-header">
                <Typography variant="subtitle1">AlgoBot</Typography>
                <Typography variant="body2" className="credit-count">
                  💎 {2 - responseCount} credits left
                </Typography>
                <IconButton size="small" sx={{ color: 'white' }} onClick={() => setOpen(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>

              <Box className="chat-messages">
                {messages.map((msg, i) => (
                  <Box
                    key={i}
                    className={`chat-row ${msg.sender === 'user' ? 'user' : 'bot'}`}
                  >
                    <Box className={`chat-bubble ${msg.sender}`}>
                    <Typography sx={{ whiteSpace: 'pre-line' }}>{msg.text}</Typography>

                    </Box>
                  </Box>
                ))}
                {isTyping && (
                  <Box className="chat-row bot">
                    <Box className="chat-bubble bot typing-indicator">
                      AlgoBot is typing<span className="dot">.</span><span className="dot">.</span><span className="dot">.</span>
                    </Box>
                  </Box>
                )}
                <div ref={messageEndRef} />
              </Box>

              <Box className="chat-input">
              <TextField
                  fullWidth
                  size="small"
                  className="chat-textfield"
                  placeholder="Type something..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSend();
                  }}
                  InputProps={{
                    style: { color: 'white', borderColor: 'white' }
                  }}
                  InputLabelProps={{
                    style: { color: 'white' }
                  }}
                  variant="outlined"
                />

            <IconButton
              onClick={handleSend}
              sx={{
                backgroundColor: '#002d57',
                color: 'white',
                '&:hover': { backgroundColor: '#004080' },
                borderRadius: '10px'
              }}
            >
              <SendIcon />
            </IconButton>


                 </Box>
            </Paper>
          </motion.div>
        </Draggable>
      )}
    </>
  );
}
