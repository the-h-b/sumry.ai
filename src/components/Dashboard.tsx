import React, { useState, useEffect } from 'react';
import { 
  Video, 
  MessageSquare, 
  FileText, 
  Settings, 
  LogOut,
  Home,
  BarChart3,
  Clock,
  Users,
  TrendingUp,
  CheckCircle,
  Zap,
  ArrowRight,
  PlayCircle,
  PlusCircle,
  Eye
} from 'lucide-react';
import JoinMeeting from './JoinMeeting';
import MeetingMessage from './MeetingMessage';
import MeetingReports from './MeetingReports.tsx';
import './Dashboard.css';

interface DashboardProps {
  user: { name: string; email: string; phone: string };
  onLogout: () => void;
}

type DashboardView = 'overview' | 'join-meeting' | 'meeting-message' | 'reports' | 'settings';

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [currentView, setCurrentView] = useState<DashboardView>('overview');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const mockStats = {
    totalMeetings: 24,
    hoursAttended: 48,
    messagesSent: 156,
    reportGenerated: 18,
    weeklyGrowth: 12
  };

  const mockRecentActivity = [
    { id: 1, type: 'meeting', title: 'Team Standup', time: '2 hours ago', platform: 'Zoom' },
    { id: 2, type: 'report', title: 'Q4 Planning Meeting Report', time: '1 day ago', platform: 'Teams' },
    { id: 3, type: 'message', title: 'Project Update Message', time: '2 days ago', platform: 'Meet' },
    { id: 4, type: 'meeting', title: 'Client Presentation', time: '3 days ago', platform: 'Webex' }
  ];

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'join-meeting', label: 'Join Meeting', icon: Video },
    { id: 'meeting-message', label: 'Meeting Message', icon: MessageSquare },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (currentView) {
      case 'join-meeting':
        return <JoinMeeting />;
      case 'meeting-message':
        return <MeetingMessage />;
      case 'reports':
        return <MeetingReports />;
      case 'settings':
        return (
          <div className="dashboard-content">
            <h2>Settings</h2>
            <div className="settings-section">
              <h3>Account Information</h3>
              <div className="user-info">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="dashboard-content">
            {/* Hero Section */}
            <div className="hero-section">
              <div className="hero-content">
                <h1 className="hero-title">
                  {getGreeting()}, {user.name.split(' ')[0]}! 👋
                </h1>
                <p className="hero-subtitle">
                  Ready to make your meetings more productive? Here's what's happening today.
                </p>
              </div>
              <div className="hero-stats">
                <div className="hero-stat">
                  <span className="stat-number">{mockStats.totalMeetings}</span>
                  <span className="stat-label">Total Meetings</span>
                </div>
                <div className="hero-stat">
                  <span className="stat-number">{mockStats.hoursAttended}h</span>
                  <span className="stat-label">Hours Attended</span>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon meetings">
                  <Video size={24} />
                </div>
                <div className="stat-content">
                  <h3>{mockStats.totalMeetings}</h3>
                  <p>Meetings Joined</p>
                  <div className="stat-trend positive">
                    <TrendingUp size={16} />
                    <span>+{mockStats.weeklyGrowth}% this week</span>
                  </div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon messages">
                  <MessageSquare size={24} />
                </div>
                <div className="stat-content">
                  <h3>{mockStats.messagesSent}</h3>
                  <p>Messages Sent</p>
                  <div className="stat-trend positive">
                    <TrendingUp size={16} />
                    <span>+8% this week</span>
                  </div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon reports">
                  <FileText size={24} />
                </div>
                <div className="stat-content">
                  <h3>{mockStats.reportGenerated}</h3>
                  <p>Reports Generated</p>
                  <div className="stat-trend positive">
                    <TrendingUp size={16} />
                    <span>+15% this week</span>
                  </div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon time">
                  <Clock size={24} />
                </div>
                <div className="stat-content">
                  <h3>{mockStats.hoursAttended}h</h3>
                  <p>Time Saved</p>
                  <div className="stat-trend positive">
                    <TrendingUp size={16} />
                    <span>+22% this week</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions-section">
              <h2>Quick Actions</h2>
              <div className="quick-actions-grid">
                <button 
                  className="quick-action-card primary"
                  onClick={() => setCurrentView('join-meeting')}
                >
                  <div className="action-icon">
                    <PlayCircle size={28} />
                  </div>
                  <div className="action-content">
                    <h3>Join Meeting</h3>
                    <p>Connect instantly to any meeting platform</p>
                  </div>
                  <ArrowRight size={20} className="action-arrow" />
                </button>

                <button 
                  className="quick-action-card secondary"
                  onClick={() => setCurrentView('meeting-message')}
                >
                  <div className="action-icon">
                    <PlusCircle size={28} />
                  </div>
                  <div className="action-content">
                    <h3>Create Message</h3>
                    <p>Prepare your meeting communications</p>
                  </div>
                  <ArrowRight size={20} className="action-arrow" />
                </button>

                <button 
                  className="quick-action-card tertiary"
                  onClick={() => setCurrentView('reports')}
                >
                  <div className="action-icon">
                    <Eye size={28} />
                  </div>
                  <div className="action-content">
                    <h3>View Reports</h3>
                    <p>Access your meeting insights</p>
                  </div>
                  <ArrowRight size={20} className="action-arrow" />
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="recent-activity-section">
              <div className="section-header">
                <h2>Recent Activity</h2>
                <button className="view-all-button">
                  View All <ArrowRight size={16} />
                </button>
              </div>
              <div className="activity-list">
                {mockRecentActivity.map((activity) => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-icon">
                      {activity.type === 'meeting' && <Video size={20} />}
                      {activity.type === 'report' && <FileText size={20} />}
                      {activity.type === 'message' && <MessageSquare size={20} />}
                    </div>
                    <div className="activity-content">
                      <h4>{activity.title}</h4>
                      <div className="activity-meta">
                        <span className="activity-time">{activity.time}</span>
                        <span className="activity-platform">{activity.platform}</span>
                      </div>
                    </div>
                    <div className="activity-status">
                      <CheckCircle size={16} className="completed" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Feature Cards */}
            <div className="feature-cards-section">
              <h2>Explore Features</h2>
              <div className="feature-cards-grid">
                <div className="feature-card">
                  <div className="feature-header">
                    <div className="feature-icon ai">
                      <Zap size={24} />
                    </div>
                    <div className="feature-badge">AI Powered</div>
                  </div>
                  <h3>Smart Summaries</h3>
                  <p>Get AI-generated meeting summaries with key points, decisions, and action items automatically extracted.</p>
                  <div className="feature-stats">
                    <span>✨ 95% accuracy</span>
                    <span>⚡ Real-time processing</span>
                  </div>
                </div>

                <div className="feature-card">
                  <div className="feature-header">
                    <div className="feature-icon collaboration">
                      <Users size={24} />
                    </div>
                    <div className="feature-badge">Team Feature</div>
                  </div>
                  <h3>Team Collaboration</h3>
                  <p>Share meeting insights with your team and track action items across all participants.</p>
                  <div className="feature-stats">
                    <span>👥 Multi-user support</span>
                    <span>🔄 Real-time sync</span>
                  </div>
                </div>

                <div className="feature-card">
                  <div className="feature-header">
                    <div className="feature-icon analytics">
                      <BarChart3 size={24} />
                    </div>
                    <div className="feature-badge">Analytics</div>
                  </div>
                  <h3>Meeting Analytics</h3>
                  <p>Track your meeting productivity with detailed analytics and insights over time.</p>
                  <div className="feature-stats">
                    <span>📊 Detailed metrics</span>
                    <span>📈 Trend analysis</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-sidebar">
        <div className="dashboard-header">
          <h2>Sumry.ai</h2>
          <div className="user-profile">
            <div className="user-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="user-details">
              <span className="user-name">{user.name.split(' ')[0]}</span>
              <span className="user-email">{user.email}</span>
            </div>
          </div>
        </div>
        
        <nav className="dashboard-nav">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`nav-item ${currentView === item.id ? 'active' : ''}`}
                onClick={() => setCurrentView(item.id as DashboardView)}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
        
        <div className="dashboard-footer">
          <button className="logout-button" onClick={onLogout}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
      
      <div className="dashboard-main">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
