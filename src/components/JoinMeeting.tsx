import React, { useState } from 'react';
import { Video, Link, CheckCircle, AlertCircle, Loader } from 'lucide-react';

interface MeetingData {
  id: string;
  link: string;
  platform: string;
  status: 'connecting' | 'connected' | 'failed';
  timestamp: Date;
}

const JoinMeeting: React.FC = () => {
  const [meetingLink, setMeetingLink] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'connecting' | 'connected' | 'failed'>('idle');
  const [activeMeetings, setActiveMeetings] = useState<MeetingData[]>([]);
  const [error, setError] = useState('');

  const detectMeetingPlatform = (url: string): string => {
    if (url.includes('zoom.us')) return 'Zoom';
    if (url.includes('meet.google.com')) return 'Google Meet';
    if (url.includes('teams.microsoft.com')) return 'Microsoft Teams';
    if (url.includes('webex.com')) return 'Webex';
    return 'Unknown Platform';
  };

  const validateMeetingLink = (url: string): boolean => {
    try {
      new URL(url);
      return url.includes('zoom.us') || 
             url.includes('meet.google.com') || 
             url.includes('teams.microsoft.com') || 
             url.includes('webex.com') ||
             url.includes('meet.') ||
             url.includes('zoom.') ||
             url.includes('teams.');
    } catch {
      return false;
    }
  };

  const handleJoinMeeting = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!meetingLink.trim()) {
      setError('Please enter a meeting link');
      return;
    }

    if (!validateMeetingLink(meetingLink)) {
      setError('Please enter a valid meeting link (Zoom, Google Meet, Teams, etc.)');
      return;
    }

    setIsConnecting(true);
    setConnectionStatus('connecting');

    try {
      // Simulate Sumry AI connection process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const platform = detectMeetingPlatform(meetingLink);
      const newMeeting: MeetingData = {
        id: Date.now().toString(),
        link: meetingLink,
        platform,
        status: 'connected',
        timestamp: new Date()
      };

      setActiveMeetings(prev => [...prev, newMeeting]);
      setConnectionStatus('connected');
      setMeetingLink('');
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setConnectionStatus('idle');
      }, 3000);

    } catch (err) {
      setConnectionStatus('failed');
      setError('Failed to connect to the meeting. Please try again.');
      setTimeout(() => {
        setConnectionStatus('idle');
      }, 3000);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectMeeting = (meetingId: string) => {
    setActiveMeetings(prev => prev.filter(meeting => meeting.id !== meetingId));
  };

  const getStatusIcon = () => {
    switch (connectionStatus) {
      case 'connecting':
        return <Loader className="animate-spin" size={20} />;
      case 'connected':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'failed':
        return <AlertCircle className="text-red-500" size={20} />;
      default:
        return <Video size={20} />;
    }
  };

  const getStatusMessage = () => {
    switch (connectionStatus) {
      case 'connecting':
        return 'Connecting Sumry AI to meeting...';
      case 'connected':
        return 'Successfully connected! Sumry AI is now attending the meeting.';
      case 'failed':
        return 'Connection failed. Please try again.';
      default:
        return '';
    }
  };

  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h2>Join Meeting</h2>
        <p>Connect Sumry AI to your meetings for automated assistance</p>
      </div>

      <div className="join-meeting-container">
        <div className="meeting-form-card">
          <div className="card-header">
            <Video size={24} />
            <h3>Connect to Meeting</h3>
          </div>
          
          <form onSubmit={handleJoinMeeting} className="meeting-form">
            <div className="form-group">
              <label htmlFor="meetingLink">
                <Link size={16} />
                Meeting Link
              </label>
              <input
                id="meetingLink"
                type="url"
                placeholder="https://zoom.us/j/123456789 or https://meet.google.com/abc-defg-hij"
                value={meetingLink}
                onChange={(e) => setMeetingLink(e.target.value)}
                disabled={isConnecting}
                className="meeting-input"
              />
              <small className="input-help">
                Supported platforms: Zoom, Google Meet, Microsoft Teams, Webex
              </small>
            </div>

            {error && (
              <div className="error-message">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            {connectionStatus !== 'idle' && (
              <div className={`status-message ${connectionStatus}`}>
                {getStatusIcon()}
                {getStatusMessage()}
              </div>
            )}

            <button 
              type="submit" 
              className="primary-button full"
              disabled={isConnecting || !meetingLink.trim()}
            >
              {isConnecting ? 'Connecting...' : 'Connect Sumry AI'}
            </button>
          </form>
        </div>

        {activeMeetings.length > 0 && (
          <div className="active-meetings-card">
            <h3>Active Meetings</h3>
            <div className="meetings-list">
              {activeMeetings.map((meeting) => (
                <div key={meeting.id} className="meeting-item">
                  <div className="meeting-info">
                    <div className="meeting-platform">
                      <Video size={16} />
                      {meeting.platform}
                    </div>
                    <div className="meeting-details">
                      <span className="meeting-time">
                        Connected at {meeting.timestamp.toLocaleTimeString()}
                      </span>
                      <span className="meeting-link">{meeting.link}</span>
                    </div>
                  </div>
                  <div className="meeting-status">
                    <span className="status-indicator connected">
                      <CheckCircle size={16} />
                      Connected
                    </span>
                    <button 
                      className="disconnect-button"
                      onClick={() => disconnectMeeting(meeting.id)}
                    >
                      Disconnect
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
            <li>Paste your meeting link above</li>
            <li>Sumry AI will join the meeting as a participant</li>
            <li>It will listen, take notes, and can participate when needed</li>
            <li>Get a complete summary and action items after the meeting</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JoinMeeting;
