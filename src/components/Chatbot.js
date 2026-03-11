import React, { useState } from 'react';
import { FaComments, FaTimes, FaPaperPlane } from 'react-icons/fa';
import './Chatbot.css';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hello! 👋 I am Bajaj Insurance Assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const botResponses = {
    health: "Our health insurance plans start from ₹99/month for students! We offer coverage from ₹1 Lakh to ₹10+ Lakh. The premium plans include OPD, IPD, maternity, and preventive care.",
    gadget: "Gadget insurance protects your smartphones, laptops, and other devices from damage, theft, and accidental breakage. Plans start from just ₹99/month with up to unlimited coverage.",
    motor: "Motor insurance provides third-party liability coverage and comprehensive protection for your vehicle. Starting from ₹499/month, it protects against theft, accidents, and natural disasters.",
    personal: "Personal insurance covers personal accident, disability, and hospitalization expenses. It's perfect for protecting your family's future and financial security.",
    price: "We offer the most competitive prices in the market! Health insurance from ₹99, Gadget from ₹99, Motor from ₹499. All with excellent coverage and claims support.",
    claim: "Filing a claim with us is simple! You can file claims through our app, website, or by calling our 24/7 support team at 1800-200-200. Most claims are settled within 7-10 days.",
    eligibility: "Our insurance is available to anyone between 18 and 75 years old. We have plans for students, employees, self-employed, entrepreneurs, and homemakers.",
    support: "Our customer support team is available 24/7. You can reach us at 1800-200-200 or email support@bajajinsurance.com",
    about: "Bajaj Insurance has been serving India for over 100 years with excellence. We are committed to providing affordable, reliable insurance solutions to millions of customers.",
    default: "I'm here to help! You can ask me about:\n• Health Insurance\n• Gadget Insurance\n• Motor Insurance\n• Personal Insurance\n• Pricing & Plans\n• Claims Process\n• Eligibility\n• Customer Support",
  };

  const detectIntent = (text) => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('health')) return 'health';
    if (lowerText.includes('gadget') || lowerText.includes('phone') || lowerText.includes('device')) return 'gadget';
    if (lowerText.includes('motor') || lowerText.includes('car') || lowerText.includes('bike') || lowerText.includes('vehicle')) return 'motor';
    if (lowerText.includes('personal')) return 'personal';
    if (lowerText.includes('price') || lowerText.includes('cost') || lowerText.includes('affordable')) return 'price';
    if (lowerText.includes('claim') || lowerText.includes('claims')) return 'claim';
    if (lowerText.includes('eligible') || lowerText.includes('eligibility') || lowerText.includes('qualify')) return 'eligibility';
    if (lowerText.includes('support') || lowerText.includes('contact') || lowerText.includes('help')) return 'support';
    if (lowerText.includes('about') || lowerText.includes('bajaj')) return 'about';
    
    return 'default';
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const intent = detectIntent(inputValue);
      const botMessage = {
        id: messages.length + 2,
        text: botResponses[intent],
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chatbot Button */}
      <button
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        title="Chat with Bajaj Assistant"
      >
        <FaComments />
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="header-content">
              <h3>Bajaj Insurance Assistant</h3>
              <p className="status">Online</p>
            </div>
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              <FaTimes />
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
              >
                <div className="message-content">
                  {message.text}
                </div>
                <span className="message-time">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="message bot-message">
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="chatbot-input-area">
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="Ask me anything about Bajaj Insurance..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="chat-input"
              />
              <button
                className="send-btn"
                onClick={handleSendMessage}
                disabled={inputValue.trim() === ''}
              >
                <FaPaperPlane />
              </button>
            </div>
            <p className="disclaimer">
              AI Assistant • Always available to help
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
