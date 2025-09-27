// FHIR IQ AI Chatbot Component
// Interactive FHIR knowledge chatbot for Wix Studio

import { fhirCopilotAPI } from '../velo/ai-functions.js';

export function initializeChatbot() {
    $w.onReady(function () {
        setupChatInterface();
        loadChatHistory();
        setupEventHandlers();
    });
}

let chatHistory = [];
let isLoading = false;

function setupChatInterface() {
    // Initialize chat container
    if ($w('#chatContainer')) {
        $w('#chatContainer').html = `
            <div id="chatMessages" style="
                height: 400px;
                overflow-y: auto;
                padding: var(--spacing-4);
                background: var(--color-white);
                border: 1px solid var(--color-gray-200);
                border-radius: var(--border-radius-lg);
                margin-bottom: var(--spacing-4);
            ">
                <div class="welcome-message">
                    <div style="
                        background: var(--color-blue-50);
                        padding: var(--spacing-4);
                        border-radius: var(--border-radius-md);
                        margin-bottom: var(--spacing-4);
                    ">
                        <p style="
                            color: var(--color-blue-700);
                            margin: 0;
                            font-weight: var(--font-weight-medium);
                        ">
                            👋 Hi! I'm your FHIR IQ Copilot. Ask me anything about FHIR implementation, resources, or standards.
                        </p>
                    </div>
                </div>
            </div>
        `;
    }

    // Setup input area
    if ($w('#chatInput')) {
        $w('#chatInput').placeholder = "Ask about FHIR resources, implementation patterns, or best practices...";
        $w('#chatInput').style.borderRadius = "var(--border-radius-md)";
    }

    // Setup send button
    if ($w('#sendButton')) {
        $w('#sendButton').label = "Send";
        $w('#sendButton').style.backgroundColor = "var(--color-blue-500)";
        $w('#sendButton').style.borderRadius = "var(--border-radius-md)";
    }
}

function setupEventHandlers() {
    // Send button click handler
    if ($w('#sendButton')) {
        $w('#sendButton').onClick(handleSendMessage);
    }

    // Enter key handler for input
    if ($w('#chatInput')) {
        $w('#chatInput').onKeyPress((event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                handleSendMessage();
            }
        });
    }

    // Clear chat button
    if ($w('#clearChatButton')) {
        $w('#clearChatButton').onClick(clearChat);
    }

    // Export chat button
    if ($w('#exportChatButton')) {
        $w('#exportChatButton').onClick(exportChat);
    }
}

async function handleSendMessage() {
    const message = $w('#chatInput').value.trim();

    if (!message || isLoading) return;

    // Add user message to chat
    addMessageToChat(message, 'user');

    // Clear input
    $w('#chatInput').value = '';

    // Show loading indicator
    showLoadingIndicator();

    try {
        // Call backend API
        const response = await fhirCopilotAPI.sendMessage(message, chatHistory);

        // Add AI response to chat
        addMessageToChat(response.message, 'assistant');

        // Update chat history
        chatHistory.push(
            { role: 'user', content: message },
            { role: 'assistant', content: response.message }
        );

        // Track interaction
        wixAnalytics.track('Chatbot Message Sent', {
            messageLength: message.length,
            responseTime: response.responseTime,
            hasCodeExample: response.hasCodeExample
        });

    } catch (error) {
        console.error('Chatbot error:', error);
        addMessageToChat('Sorry, I encountered an error. Please try again.', 'error');
    } finally {
        hideLoadingIndicator();
    }
}

function addMessageToChat(message, type) {
    const chatMessages = $w('#chatContainer').children.find(child =>
        child.id === 'chatMessages'
    );

    const messageClass = type === 'user' ? 'user-message' :
                        type === 'error' ? 'error-message' : 'assistant-message';

    const messageHtml = `
        <div class="${messageClass}" style="
            margin-bottom: var(--spacing-4);
            ${getMessageStyles(type)}
        ">
            <div style="
                padding: var(--spacing-3);
                border-radius: var(--border-radius-md);
                ${getMessageContentStyles(type)}
            ">
                ${formatMessage(message, type)}
            </div>
            <div style="
                font-size: var(--font-size-xs);
                color: var(--color-gray-500);
                margin-top: var(--spacing-1);
                text-align: ${type === 'user' ? 'right' : 'left'};
            ">
                ${new Date().toLocaleTimeString()}
            </div>
        </div>
    `;

    chatMessages.innerHTML += messageHtml;

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getMessageStyles(type) {
    switch (type) {
        case 'user':
            return 'text-align: right;';
        case 'error':
            return 'text-align: left;';
        default:
            return 'text-align: left;';
    }
}

function getMessageContentStyles(type) {
    switch (type) {
        case 'user':
            return `
                background: var(--color-blue-500);
                color: white;
                margin-left: var(--spacing-8);
            `;
        case 'error':
            return `
                background: var(--color-error);
                color: white;
                margin-right: var(--spacing-8);
            `;
        default:
            return `
                background: var(--color-gray-100);
                color: var(--color-gray-900);
                margin-right: var(--spacing-8);
            `;
    }
}

function formatMessage(message, type) {
    if (type === 'assistant') {
        // Format code blocks and FHIR examples
        return message
            .replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
                return `
                    <div style="
                        background: var(--color-gray-900);
                        color: var(--color-gray-100);
                        padding: var(--spacing-3);
                        border-radius: var(--border-radius-sm);
                        margin: var(--spacing-2) 0;
                        font-family: var(--font-family-mono);
                        font-size: var(--font-size-sm);
                        overflow-x: auto;
                    ">
                        <div style="
                            font-size: var(--font-size-xs);
                            color: var(--color-gray-400);
                            margin-bottom: var(--spacing-1);
                        ">
                            ${lang || 'code'}
                        </div>
                        <pre style="margin: 0; white-space: pre-wrap;">${code}</pre>
                        <button onclick="copyToClipboard('${code.replace(/'/g, "\\'")}');" style="
                            background: var(--color-gray-700);
                            color: white;
                            border: none;
                            padding: var(--spacing-1) var(--spacing-2);
                            border-radius: var(--border-radius-sm);
                            font-size: var(--font-size-xs);
                            margin-top: var(--spacing-2);
                            cursor: pointer;
                        ">
                            Copy
                        </button>
                    </div>
                `;
            })
            .replace(/`([^`]+)`/g, `
                <code style="
                    background: var(--color-gray-200);
                    padding: 2px 4px;
                    border-radius: var(--border-radius-sm);
                    font-family: var(--font-family-mono);
                    font-size: var(--font-size-sm);
                ">\$1</code>
            `);
    }

    return message;
}

function showLoadingIndicator() {
    isLoading = true;
    $w('#sendButton').disable();
    $w('#sendButton').label = "Thinking...";

    // Add typing indicator
    addMessageToChat('🤔 Thinking...', 'loading');
}

function hideLoadingIndicator() {
    isLoading = false;
    $w('#sendButton').enable();
    $w('#sendButton').label = "Send";

    // Remove typing indicator
    const chatMessages = $w('#chatContainer').children.find(child =>
        child.id === 'chatMessages'
    );
    const loadingMessages = chatMessages.querySelectorAll('.loading-message');
    loadingMessages.forEach(msg => msg.remove());
}

function clearChat() {
    chatHistory = [];
    const chatMessages = $w('#chatContainer').children.find(child =>
        child.id === 'chatMessages'
    );
    chatMessages.innerHTML = `
        <div class="welcome-message">
            <div style="
                background: var(--color-blue-50);
                padding: var(--spacing-4);
                border-radius: var(--border-radius-md);
                margin-bottom: var(--spacing-4);
            ">
                <p style="
                    color: var(--color-blue-700);
                    margin: 0;
                    font-weight: var(--font-weight-medium);
                ">
                    👋 Chat cleared! Ask me anything about FHIR.
                </p>
            </div>
        </div>
    `;
}

function exportChat() {
    const chatContent = chatHistory.map(msg =>
        `${msg.role.toUpperCase()}: ${msg.content}`
    ).join('\n\n');

    const blob = new Blob([chatContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fhir-iq-chat-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
}

function loadChatHistory() {
    // Load previous chat history from local storage if available
    const saved = wixStorage.local.getItem('fhir-iq-chat-history');
    if (saved) {
        try {
            chatHistory = JSON.parse(saved);
            // Restore chat messages to UI
            chatHistory.forEach(msg => {
                addMessageToChat(msg.content, msg.role);
            });
        } catch (error) {
            console.error('Error loading chat history:', error);
        }
    }
}

// Global function for copy to clipboard
window.copyToClipboard = function(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Show success message
        console.log('Code copied to clipboard');
    });
};