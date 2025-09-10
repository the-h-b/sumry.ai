import React, { useState } from 'react';
import { MessageSquare, Send, Save, Trash2, Edit3, Clock } from 'lucide-react';

interface SavedMessage {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  lastUsed?: Date;
}

const MeetingMessage: React.FC = () => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageTitle, setMessageTitle] = useState('');
  const [savedMessages, setSavedMessages] = useState<SavedMessage[]>([
    {
      id: '1',
      title: 'Weekly Status Update',
      content: 'Hi everyone, I wanted to share a quick update on the project progress. We\'ve completed the initial phase and are moving into testing. The timeline looks good for our target delivery date.',
      createdAt: new Date('2025-01-08'),
      lastUsed: new Date('2025-01-09')
    },
    {
      id: '2',
      title: 'Budget Discussion Points',
      content: 'I\'d like to discuss the budget allocation for Q2. We need to consider the additional resources required for the new initiative and how it impacts our current projections.',
      createdAt: new Date('2025-01-07')
    }
  ]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const handleSaveMessage = () => {
    if (!currentMessage.trim()) return;
    
    if (!messageTitle.trim()) {
      setShowSaveDialog(true);
      return;
    }

    const newMessage: SavedMessage = {
      id: Date.now().toString(),
      title: messageTitle.trim(),
      content: currentMessage.trim(),
      createdAt: new Date()
    };

    setSavedMessages(prev => [newMessage, ...prev]);
    setCurrentMessage('');
    setMessageTitle('');
    setShowSaveDialog(false);
  };

  const handleUseMessage = (message: SavedMessage) => {
    setCurrentMessage(message.content);
    setSavedMessages(prev => 
      prev.map(msg => 
        msg.id === message.id 
          ? { ...msg, lastUsed: new Date() }
          : msg
      )
    );
  };

  const handleDeleteMessage = (id: string) => {
    setSavedMessages(prev => prev.filter(msg => msg.id !== id));
  };

  const handleEditMessage = (message: SavedMessage) => {
    setEditingId(message.id);
    setCurrentMessage(message.content);
    setMessageTitle(message.title);
  };

  const handleUpdateMessage = () => {
    if (!editingId || !currentMessage.trim() || !messageTitle.trim()) return;

    setSavedMessages(prev => 
      prev.map(msg => 
        msg.id === editingId 
          ? { ...msg, title: messageTitle.trim(), content: currentMessage.trim() }
          : msg
      )
    );
    
    setEditingId(null);
    setCurrentMessage('');
    setMessageTitle('');
  };

  const handleSendToMeeting = () => {
    if (!currentMessage.trim()) return;
    
    // Simulate sending message to active meeting
    alert('Message sent to Sumry AI! It will communicate this in the meeting when appropriate.');
    setCurrentMessage('');
  };

  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h2>Meeting Message</h2>
        <p>Prepare what you want to communicate in meetings</p>
      </div>

      <div className="meeting-message-container">
        <div className="message-composer-card">
          <div className="card-header">
            <MessageSquare size={24} />
            <h3>{editingId ? 'Edit Message' : 'Compose Message'}</h3>
          </div>
          
          <div className="message-form">
            {(showSaveDialog || editingId) && (
              <div className="form-group">
                <label htmlFor="messageTitle">Message Title</label>
                <input
                  id="messageTitle"
                  type="text"
                  placeholder="Give your message a title..."
                  value={messageTitle}
                  onChange={(e) => setMessageTitle(e.target.value)}
                  className="message-title-input"
                />
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="messageContent">Your Message</label>
              <textarea
                id="messageContent"
                placeholder="What would you like to communicate in the meeting? Sumry AI will deliver this message at the appropriate time..."
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                className="message-textarea"
                rows={6}
              />
              <div className="character-count">
                {currentMessage.length} characters
              </div>
            </div>

            <div className="message-actions">
              {editingId ? (
                <>
                  <button 
                    className="secondary-button"
                    onClick={() => {
                      setEditingId(null);
                      setCurrentMessage('');
                      setMessageTitle('');
                    }}
                  >
                    Cancel
                  </button>
                  <button 
                    className="primary-button"
                    onClick={handleUpdateMessage}
                    disabled={!currentMessage.trim() || !messageTitle.trim()}
                  >
                    <Save size={16} />
                    Update Message
                  </button>
                </>
              ) : (
                <>
                  <button 
                    className="secondary-button"
                    onClick={handleSaveMessage}
                    disabled={!currentMessage.trim()}
                  >
                    <Save size={16} />
                    Save Message
                  </button>
                  <button 
                    className="primary-button"
                    onClick={handleSendToMeeting}
                    disabled={!currentMessage.trim()}
                  >
                    <Send size={16} />
                    Send to Meeting
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {savedMessages.length > 0 && (
          <div className="saved-messages-card">
            <h3>Saved Messages</h3>
            <div className="messages-list">
              {savedMessages.map((message) => (
                <div key={message.id} className="message-item">
                  <div className="message-header">
                    <h4>{message.title}</h4>
                    <div className="message-meta">
                      <span className="message-date">
                        <Clock size={14} />
                        Created {message.createdAt.toLocaleDateString()}
                      </span>
                      {message.lastUsed && (
                        <span className="last-used">
                          Last used {message.lastUsed.toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="message-content">
                    {message.content}
                  </div>
                  
                  <div className="message-actions">
                    <button 
                      className="action-button"
                      onClick={() => handleUseMessage(message)}
                      title="Use this message"
                    >
                      <Send size={16} />
                      Use
                    </button>
                    <button 
                      className="action-button"
                      onClick={() => handleEditMessage(message)}
                      title="Edit message"
                    >
                      <Edit3 size={16} />
                      Edit
                    </button>
                    <button 
                      className="action-button delete"
                      onClick={() => handleDeleteMessage(message.id)}
                      title="Delete message"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="info-card">
          <h4>How it works</h4>
          <ul>
            <li>Compose your message or select from saved templates</li>
            <li>Send it to Sumry AI during an active meeting</li>
            <li>Sumry AI will deliver your message at the most appropriate time</li>
            <li>Save frequently used messages for quick access</li>
          </ul>
        </div>
      </div>

      {showSaveDialog && (
        <div className="modal-overlay">
          <div className="save-dialog">
            <h3>Save Message</h3>
            <p>Please provide a title for your message:</p>
            <input
              type="text"
              placeholder="Message title..."
              value={messageTitle}
              onChange={(e) => setMessageTitle(e.target.value)}
              className="dialog-input"
              autoFocus
            />
            <div className="dialog-actions">
              <button 
                className="secondary-button"
                onClick={() => {
                  setShowSaveDialog(false);
                  setMessageTitle('');
                }}
              >
                Cancel
              </button>
              <button 
                className="primary-button"
                onClick={handleSaveMessage}
                disabled={!messageTitle.trim()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingMessage;
