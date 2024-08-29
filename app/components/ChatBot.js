import { useState } from "react";
import { Box, Button, Stack, TextField } from "@mui/material";

const ChatBot = () => {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: "Hi! I am your Medical support assistant. How can I help you today?",
        },
        ])

        const [history, setHistory] = useState([
        {
            role: 'user',
            parts: [{ text: "Hello" }],
        },
        {
            role: 'model',
            parts: [{ text: "Hi! I am your Medical support assistant. How can I help you today?" }],
        },
        ])

        const [message, setMessage] = useState('');

        const sendMessage = async () => {
        setMessage('')

        setMessages((messages) => [
            ...messages,
            { role: 'user', content: message },
        ])

        try {
            const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                history: history,
                message: message,
                }),
            })

            const data = await response.json();

            setMessages((messages) => [
            ...messages,
            { role: 'assistant', content: data.text },
            ])

            setHistory((history) => [
            ...history,
            { 
                role: 'user',
                parts: [{ text: message }], 
            },
            {
                role: 'model',
                parts: [{ text: data.text }], 
            },
            ])

        } catch (error) {
            console.error('An error occurred:', error);
            const alertmsg = "An unexpected error occurred. Please try again."
            alert("An unexpected error occurred. Please try again.");
            setMessages((messages) => [
                ...messages,
                { role: 'assistant', content: alertmsg },
            ])
        }
    }

        return (
        <Box 
        width="100vw"
        height="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        >
        <Stack
            direction={'column'}
            width="500px"
            height="600px"
            border="1px solid black"
            p={2}
            spacing={3}
        >
            <Stack
                direction={'column'}
                spacing={2}
                flexGrow={1}
                overflow="auto"
                maxHeight="100%"
            >
                {messages.map((message, index) => (
                <Box
                    key={index}
                    display="flex"
                    justifyContent={
                    message.role === 'assistant' ? 'flex-start' : 'flex-end'
                    }
                >
                    <Box
                    bgcolor={
                        message.role === 'assistant'
                        ? 'primary.main'
                        : 'secondary.main'
                    }
                    color="white"
                    borderRadius={16}
                    p={3}
                    >
                    {message.content}
                    </Box>
                </Box>
                ))}
            </Stack>
            <Stack direction={'row'} spacing={2}>
            <TextField
                label = 'Type Message Here'
                fullWidth
                value = {message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <Button variant="contained" onClick={sendMessage}>SEND</Button>
            </Stack>
        </Stack>
        </Box>
        )
};

export default ChatBot;