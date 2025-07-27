// frontend/src/components/Chatbot.js

import React, { useState, useRef, useEffect } from 'react';
import { chatService } from '../services/api';

function Chatbot() {
    const [messages, setMessages] = useState([
        { role: 'bot', text: 'Hello! How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // This state will mirror the structure required by the backend's chatHistory
    const [backendChatHistory, setBackendChatHistory] = useState([
        { role: 'model', parts: [{ text: 'Hello! How can I help you today?' }] }
    ]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userMessage = input.trim();
        if (!userMessage) return;

        setMessages((prevMessages) => [...prevMessages, { role: 'user', text: userMessage }]);
        setBackendChatHistory((prevHistory) => [...prevHistory, { role: 'user', parts: [{ text: userMessage }] }]);
        setInput('');
        setLoading(true);

        try {
            const data = await chatService.sendMessage(userMessage, backendChatHistory);
            setMessages((prevMessages) => [...prevMessages, { role: 'bot', text: data.response }]);
            setBackendChatHistory(data.chatHistory); // Update history from backend response
        } catch (error) {
            setMessages((prevMessages) => [...prevMessages, { role: 'bot', text: 'Error: Could not get a response. Please try again.' }]);
            console.error("Chatbot API call failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md flex flex-col h-[70vh]">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 text-center">AI Chatbot</h2>
            <div id="chat-messages" className="flex-1 overflow-y-auto p-4 border border-slate-200 rounded-md mb-4 space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`${msg.role === 'user' ? 'chat-message-user self-end' : 'chat-message-bot self-start'} p-3 max-w-[80%]`}>
                        {msg.text}
                    </div>
                ))}
                {loading && (
                    <div className="chat-message-bot p-3 max-w-[80%] animate-pulse">Typing...</div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 p-2 border border-slate-300 rounded-md shadow-sm"
                    disabled={loading}
                />
                <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors" disabled={loading}>
                    Send
                </button>
            </form>
        </div>
    );
}

export default Chatbot;