// frontend/src/components/ChatbotWidget.jsx

import React, { useState, useEffect, useRef } from 'react';
// Using simple SVG icons for now, but you can replace with react-icons if preferred
const ChatIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
);
const SendIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
);
const CloseIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

const ChatbotWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [chatHistory, setChatHistory] = useState([]); // Stores { role: 'user' | 'model', parts: [{ text: '...' }] }
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null); // Ref for auto-scrolling chat

    // Auto-scroll to the latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatHistory]);

    const handleToggleChat = () => {
        setIsOpen(!isOpen);
    };

    const handleSendMessage = async (e) => {
        e.preventDefault(); // Prevent form default submission
        if (inputMessage.trim() === '' || isLoading) return;

        const userMessage = { role: 'user', parts: [{ text: inputMessage }] };
        const updatedChatHistory = [...chatHistory, userMessage];
        setChatHistory(updatedChatHistory);
        setInputMessage('');
        setIsLoading(true);

        try {
            const payload = {
                message: inputMessage,
                // Send only necessary parts to avoid circular references or unnecessary data
                chatHistory: chatHistory.map(msg => ({ role: msg.role, parts: msg.parts }))
            };

            // IMPORTANT: If your backend is on a different machine, replace 'localhost' with its IP address.
            // Example: `http://192.168.1.100:5000/api/chat`
            const apiUrl = `http://192.168.241.198:5000/api/chat`; // Your backend chatbot API URL

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log("Chatbot API response:", result);

            if (result.response && result.chatHistory) {
                // Update chat history with the model's response
                setChatHistory(result.chatHistory); // The backend sends back the full updated history
            } else {
                setChatHistory(prev => [...prev, { role: 'model', parts: [{ text: "Sorry, I didn't get a clear response." }] }]);
            }
        } catch (error) {
            console.error("Error communicating with chatbot API:", error);
            setChatHistory(prev => [...prev, { role: 'model', parts: [{ text: `Error: ${error.message || 'Could not connect to the chatbot.'}` }] }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="chatbot-widget-container">
            {/* Chatbot Toggle Button */}
            <button className="chatbot-toggle-button" onClick={handleToggleChat}>
                {isOpen ? <CloseIcon /> : <ChatIcon />}
            </button>

            {/* Chatbot Window */}
            {isOpen && (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <h3>VendorConex Chatbot</h3>
                        <button className="chatbot-close-button" onClick={handleToggleChat}>
                            <CloseIcon />
                        </button>
                    </div>
                    <div className="chat-messages">
                        {chatHistory.length === 0 && (
                            <div className="chat-welcome-message">
                                Hi there! How can I help you today?
                            </div>
                        )}
                        {chatHistory.map((msg, index) => (
                            <div key={index} className={`chat-message ${msg.role}-message`}>
                                {msg.parts.map((part, pIdx) => (
                                    <span key={pIdx}>{part.text}</span>
                                ))}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="chat-message model-message loading-message">
                                <span>Typing...</span>
                            </div>
                        )}
                        <div ref={messagesEndRef} /> {/* For auto-scrolling */}
                    </div>
                    <form className="chat-input-area" onSubmit={handleSendMessage}>
                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            disabled={isLoading}
                        />
                        <button type="submit" disabled={isLoading}>
                            <SendIcon />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ChatbotWidget;