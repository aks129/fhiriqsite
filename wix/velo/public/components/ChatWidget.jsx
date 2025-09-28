/**
 * FHIR IQ Chat Widget Component
 * @module components/ChatWidget
 */

import React, { useState, useRef, useEffect } from 'react';

/**
 * Chat widget for FHIR knowledge assistance
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether chat widget is open
 * @param {Function} props.onToggle - Toggle function for widget
 * @param {string} props.position - Position of widget (bottom-right, bottom-left)
 * @param {Object} props.customStyles - Custom styling overrides
 */
export const ChatWidget = ({
  isOpen = false,
  onToggle,
  position = 'bottom-right',
  customStyles = {},
  className = ''
}) => {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hi! I\'m your FHIR IQ assistant. I can help you with FHIR implementation questions, healthcare interoperability guidance, and information about our services. What would you like to know?',
      timestamp: new Date(),
      citations: []
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`);
  const [feedbackGiven, setFeedbackGiven] = useState(new Set());

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const textareaRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Focus input when widget opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [inputValue]);

  const sendMessage = async (userMessage = inputValue.trim()) => {
    if (!userMessage || isLoading) return;

    const userMessageObj = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessageObj]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Prepare conversation history (last 8 messages)
      const conversationHistory = messages.slice(-8).map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await fetch('/_functions/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: userMessage,
          sessionId: sessionId,
          conversationHistory: conversationHistory
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      const assistantMessage = {
        id: data.messageId || `assistant_${Date.now()}`,
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
        citations: data.citations || [],
        isOutOfScope: data.isOutOfScope || false,
        suggestedAction: data.suggestedAction,
        processingTime: data.processingTime
      };

      setMessages(prev => [...prev, assistantMessage]);

    } catch (error) {
      console.error('Chat error:', error);

      const errorMessage = {
        id: `error_${Date.now()}`,
        role: 'assistant',
        content: 'I\'m sorry, I encountered an error while processing your message. Please try again or contact FHIR IQ support if the issue persists.',
        timestamp: new Date(),
        isError: true,
        citations: []
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const copyCodeBlock = (code) => {
    navigator.clipboard.writeText(code).then(() => {
      // Could add a toast notification here
      console.log('Code copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy code:', err);
    });
  };

  const provideFeedback = async (messageId, rating) => {
    if (feedbackGiven.has(messageId)) return;

    try {
      const response = await fetch('/_functions/chat/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sessionId: sessionId,
          messageId: messageId,
          rating: rating,
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        setFeedbackGiven(prev => new Set([...prev, messageId]));
      }
    } catch (error) {
      console.error('Feedback error:', error);
    }
  };

  const renderMarkdown = (content) => {
    // Simple markdown rendering - in production, consider using a proper markdown library
    let html = content
      // Code blocks
      .replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
        const language = lang || 'text';
        return `<div class="code-block">
          <div class="code-header">
            <span class="code-lang">${language}</span>
            <button class="copy-button" onclick="copyCode('${encodeURIComponent(code.trim())}')">Copy</button>
          </div>
          <pre><code class="language-${language}">${code.trim()}</code></pre>
        </div>`;
      })
      // Inline code
      .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      // Line breaks
      .replace(/\n/g, '<br>');

    return { __html: html };
  };

  const renderCitations = (citations) => {
    if (!citations || citations.length === 0) return null;

    return (
      <div className="citations">
        <div className="citations-header">Sources:</div>
        {citations.map((citation, index) => (
          <div key={index} className="citation">
            <a
              href={citation.url}
              target="_blank"
              rel="noopener noreferrer"
              className="citation-link"
            >
              [{index + 1}] {citation.source}
            </a>
          </div>
        ))}
      </div>
    );
  };

  const positionStyles = {
    'bottom-right': {
      bottom: '20px',
      right: '20px'
    },
    'bottom-left': {
      bottom: '20px',
      left: '20px'
    }
  };

  // Add global function for code copying (called from rendered HTML)
  useEffect(() => {
    window.copyCode = (encodedCode) => {
      const code = decodeURIComponent(encodedCode);
      copyCodeBlock(code);
    };

    return () => {
      delete window.copyCode;
    };
  }, []);

  return (
    <div
      className={`chat-widget ${isOpen ? 'open' : 'closed'} ${className}`}
      style={{
        position: 'fixed',
        zIndex: 1000,
        ...positionStyles[position],
        ...customStyles
      }}
    >
      {/* Chat toggle button */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="chat-toggle"
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-primary-500)',
            border: 'none',
            color: 'var(--color-white)',
            fontSize: 'var(--font-size-xl)',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-lg)',
            transition: 'all var(--transition-normal) var(--transition-timing)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'var(--color-primary-600)';
            e.target.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'var(--color-primary-500)';
            e.target.style.transform = 'scale(1)';
          }}
          aria-label="Open FHIR IQ chat assistant"
        >
          💬
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div
          className="chat-window"
          style={{
            width: '400px',
            height: '600px',
            backgroundColor: 'var(--color-white)',
            borderRadius: 'var(--radius-xl)',
            boxShadow: 'var(--shadow-2xl)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          {/* Header */}
          <div
            className="chat-header"
            style={{
              backgroundColor: 'var(--color-primary-500)',
              color: 'var(--color-white)',
              padding: 'var(--spacing-4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div className="header-content">
              <h3
                style={{
                  fontFamily: 'var(--font-family-heading)',
                  fontSize: 'var(--font-size-lg)',
                  fontWeight: 'var(--font-weight-semibold)',
                  margin: '0',
                  marginBottom: 'var(--spacing-1)'
                }}
              >
                FHIR IQ Assistant
              </h3>
              <p
                style={{
                  fontSize: 'var(--font-size-sm)',
                  opacity: '0.9',
                  margin: '0'
                }}
              >
                Ask me about FHIR & healthcare interoperability
              </p>
            </div>

            <button
              onClick={onToggle}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: 'var(--color-white)',
                fontSize: 'var(--font-size-lg)',
                cursor: 'pointer',
                padding: 'var(--spacing-1)',
                borderRadius: 'var(--radius-md)',
                transition: 'background-color var(--transition-normal) var(--transition-timing)'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
              }}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div
            className="chat-messages"
            style={{
              flex: '1',
              overflowY: 'auto',
              padding: 'var(--spacing-4)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--spacing-4)'
            }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message ${message.role}`}
                style={{
                  display: 'flex',
                  flexDirection: message.role === 'user' ? 'row-reverse' : 'row',
                  alignItems: 'flex-start',
                  gap: 'var(--spacing-2)'
                }}
              >
                {/* Avatar */}
                <div
                  className="message-avatar"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: message.role === 'user'
                      ? 'var(--color-gray-300)'
                      : 'var(--color-primary-100)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'var(--font-size-sm)',
                    flexShrink: 0
                  }}
                >
                  {message.role === 'user' ? '👤' : '🤖'}
                </div>

                {/* Message content */}
                <div
                  className="message-content"
                  style={{
                    maxWidth: '85%',
                    backgroundColor: message.role === 'user'
                      ? 'var(--color-primary-500)'
                      : message.isError
                        ? 'var(--color-red-50)'
                        : 'var(--color-gray-50)',
                    color: message.role === 'user'
                      ? 'var(--color-white)'
                      : message.isError
                        ? 'var(--color-red-700)'
                        : 'var(--color-gray-900)',
                    padding: 'var(--spacing-3)',
                    borderRadius: 'var(--radius-lg)',
                    fontSize: 'var(--font-size-sm)',
                    lineHeight: 'var(--line-height-relaxed)'
                  }}
                >
                  <div
                    className="message-text"
                    dangerouslySetInnerHTML={renderMarkdown(message.content)}
                  />

                  {/* Citations */}
                  {message.role === 'assistant' && message.citations && (
                    <div style={{ marginTop: 'var(--spacing-3)' }}>
                      {renderCitations(message.citations)}
                    </div>
                  )}

                  {/* Suggested action for out-of-scope */}
                  {message.isOutOfScope && message.suggestedAction === 'contact_expert' && (
                    <div
                      style={{
                        marginTop: 'var(--spacing-3)',
                        padding: 'var(--spacing-3)',
                        backgroundColor: 'var(--color-secondary-50)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-secondary-200)'
                      }}
                    >
                      <a
                        href="/contact"
                        style={{
                          color: 'var(--color-secondary-600)',
                          textDecoration: 'none',
                          fontWeight: 'var(--font-weight-semibold)',
                          fontSize: 'var(--font-size-sm)'
                        }}
                      >
                        📞 Contact a FHIR IQ Expert →
                      </a>
                    </div>
                  )}

                  {/* Feedback buttons */}
                  {message.role === 'assistant' && !message.isError && !feedbackGiven.has(message.id) && (
                    <div
                      className="message-feedback"
                      style={{
                        marginTop: 'var(--spacing-3)',
                        display: 'flex',
                        gap: 'var(--spacing-2)',
                        justifyContent: 'flex-end'
                      }}
                    >
                      <button
                        onClick={() => provideFeedback(message.id, 'up')}
                        style={{
                          backgroundColor: 'transparent',
                          border: '1px solid var(--color-gray-300)',
                          borderRadius: 'var(--radius-sm)',
                          padding: 'var(--spacing-1)',
                          cursor: 'pointer',
                          fontSize: 'var(--font-size-sm)',
                          transition: 'all var(--transition-normal) var(--transition-timing)'
                        }}
                        title="Helpful"
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = 'var(--color-green-50)';
                          e.target.style.borderColor = 'var(--color-green-300)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'transparent';
                          e.target.style.borderColor = 'var(--color-gray-300)';
                        }}
                      >
                        👍
                      </button>

                      <button
                        onClick={() => provideFeedback(message.id, 'down')}
                        style={{
                          backgroundColor: 'transparent',
                          border: '1px solid var(--color-gray-300)',
                          borderRadius: 'var(--radius-sm)',
                          padding: 'var(--spacing-1)',
                          cursor: 'pointer',
                          fontSize: 'var(--font-size-sm)',
                          transition: 'all var(--transition-normal) var(--transition-timing)'
                        }}
                        title="Not helpful"
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = 'var(--color-red-50)';
                          e.target.style.borderColor = 'var(--color-red-300)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'transparent';
                          e.target.style.borderColor = 'var(--color-gray-300)';
                        }}
                      >
                        👎
                      </button>
                    </div>
                  )}

                  {feedbackGiven.has(message.id) && (
                    <div
                      style={{
                        marginTop: 'var(--spacing-2)',
                        fontSize: 'var(--font-size-xs)',
                        color: 'var(--color-gray-500)',
                        textAlign: 'right'
                      }}
                    >
                      Thanks for your feedback!
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="loading-message" style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-2)' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-primary-100)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'var(--font-size-sm)',
                    flexShrink: 0
                  }}
                >
                  🤖
                </div>

                <div
                  style={{
                    backgroundColor: 'var(--color-gray-50)',
                    padding: 'var(--spacing-3)',
                    borderRadius: 'var(--radius-lg)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-2)'
                  }}
                >
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      border: '2px solid var(--color-gray-200)',
                      borderTop: '2px solid var(--color-primary-500)',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }}
                  />
                  <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-gray-600)' }}>
                    Thinking...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div
            className="chat-input"
            style={{
              padding: 'var(--spacing-4)',
              borderTop: '1px solid var(--color-gray-200)',
              backgroundColor: 'var(--color-white)'
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: 'var(--spacing-2)',
                alignItems: 'flex-end'
              }}
            >
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about FHIR, healthcare APIs, or our services..."
                disabled={isLoading}
                style={{
                  flex: '1',
                  padding: 'var(--spacing-3)',
                  border: '1px solid var(--color-gray-300)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 'var(--font-size-sm)',
                  fontFamily: 'var(--font-family-primary)',
                  resize: 'none',
                  minHeight: '40px',
                  maxHeight: '120px',
                  lineHeight: 'var(--line-height-normal)',
                  transition: 'border-color var(--transition-normal) var(--transition-timing)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--color-primary-500)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--color-gray-300)';
                }}
              />

              <button
                onClick={() => sendMessage()}
                disabled={!inputValue.trim() || isLoading}
                style={{
                  backgroundColor: inputValue.trim() && !isLoading
                    ? 'var(--color-primary-500)'
                    : 'var(--color-gray-300)',
                  color: 'var(--color-white)',
                  border: 'none',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--spacing-3)',
                  cursor: inputValue.trim() && !isLoading ? 'pointer' : 'not-allowed',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  transition: 'background-color var(--transition-normal) var(--transition-timing)',
                  minWidth: '60px',
                  height: '40px'
                }}
                onMouseEnter={(e) => {
                  if (inputValue.trim() && !isLoading) {
                    e.target.style.backgroundColor = 'var(--color-primary-600)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (inputValue.trim() && !isLoading) {
                    e.target.style.backgroundColor = 'var(--color-primary-500)';
                  }
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .citations {
          margin-top: var(--spacing-2);
          padding-top: var(--spacing-2);
          border-top: 1px solid var(--color-gray-200);
        }

        .citations-header {
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-semibold);
          color: var(--color-gray-700);
          margin-bottom: var(--spacing-2);
        }

        .citation {
          margin-bottom: var(--spacing-1);
        }

        .citation-link {
          font-size: var(--font-size-xs);
          color: var(--color-primary-600);
          text-decoration: none;
        }

        .citation-link:hover {
          text-decoration: underline;
        }

        .code-block {
          margin: var(--spacing-2) 0;
          border-radius: var(--radius-md);
          overflow: hidden;
          background-color: var(--color-gray-900);
        }

        .code-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--spacing-2) var(--spacing-3);
          background-color: var(--color-gray-800);
          border-bottom: 1px solid var(--color-gray-700);
        }

        .code-lang {
          font-size: var(--font-size-xs);
          color: var(--color-gray-300);
          text-transform: uppercase;
        }

        .copy-button {
          background-color: var(--color-primary-500);
          color: var(--color-white);
          border: none;
          padding: var(--spacing-1) var(--spacing-2);
          border-radius: var(--radius-sm);
          font-size: var(--font-size-xs);
          cursor: pointer;
        }

        .copy-button:hover {
          background-color: var(--color-primary-600);
        }

        .code-block pre {
          margin: 0;
          padding: var(--spacing-3);
          background-color: var(--color-gray-900);
          color: var(--color-gray-100);
          font-family: 'Monaco', 'Consolas', monospace;
          font-size: var(--font-size-sm);
          line-height: var(--line-height-relaxed);
          overflow-x: auto;
        }

        .inline-code {
          background-color: var(--color-gray-100);
          padding: 2px 4px;
          border-radius: var(--radius-sm);
          font-family: 'Monaco', 'Consolas', monospace;
          font-size: var(--font-size-sm);
        }

        @media (max-width: 480px) {
          .chat-window {
            width: 100vw !important;
            height: 100vh !important;
            border-radius: 0 !important;
            bottom: 0 !important;
            right: 0 !important;
            left: 0 !important;
            top: 0 !important;
          }

          .chat-widget {
            bottom: 0 !important;
            right: 0 !important;
            left: 0 !important;
            top: 0 !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .chat-toggle,
          .copy-button,
          textarea,
          button {
            transition: none !important;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        }
      `}</style>
    </div>
  );
};

export default ChatWidget;