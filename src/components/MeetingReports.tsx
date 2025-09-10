import React, { useState } from 'react';
import { BarChart3, Calendar, Download, Search, Filter, Eye, Clock, Users, CheckCircle } from 'lucide-react';

interface MeetingReport {
  id: string;
  title: string;
  date: Date;
  duration: number; // in minutes
  participants: number;
  platform: string;
  summary: string;
  keyPoints: string[];
  actionItems: Array<{
    task: string;
    assignee: string;
    dueDate?: Date;
    completed: boolean;
  }>;
  decisions: string[];
  nextMeeting?: Date;
}

const MeetingReports: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlatform, setFilterPlatform] = useState('all');
  const [selectedReport, setSelectedReport] = useState<MeetingReport | null>(null);

  // Sample meeting reports data
  const [reports] = useState<MeetingReport[]>([
    {
      id: '1',
      title: 'Weekly Team Standup',
      date: new Date('2025-01-09T10:00:00'),
      duration: 30,
      participants: 8,
      platform: 'Zoom',
      summary: 'Team discussed progress on current sprint, identified blockers, and planned for upcoming deliverables. Overall progress is on track with minor adjustments needed.',
      keyPoints: [
        'Sprint progress is 75% complete',
        'Two critical bugs identified and assigned',
        'New feature requirements clarified',
        'Resource allocation for next sprint discussed'
      ],
      actionItems: [
        { task: 'Fix authentication bug', assignee: 'John Doe', dueDate: new Date('2025-01-12'), completed: false },
        { task: 'Update API documentation', assignee: 'Jane Smith', dueDate: new Date('2025-01-15'), completed: true },
        { task: 'Prepare demo for stakeholders', assignee: 'Mike Johnson', dueDate: new Date('2025-01-18'), completed: false }
      ],
      decisions: [
        'Extend current sprint by 2 days',
        'Prioritize bug fixes over new features',
        'Schedule additional testing session'
      ],
      nextMeeting: new Date('2025-01-16T10:00:00')
    },
    {
      id: '2',
      title: 'Q1 Budget Review',
      date: new Date('2025-01-08T14:00:00'),
      duration: 60,
      participants: 5,
      platform: 'Google Meet',
      summary: 'Comprehensive review of Q1 budget allocation, discussion of cost optimization opportunities, and planning for Q2 budget requests.',
      keyPoints: [
        'Q1 spending is 15% under budget',
        'Marketing ROI exceeded expectations',
        'Infrastructure costs need optimization',
        'New hiring budget approved for Q2'
      ],
      actionItems: [
        { task: 'Prepare Q2 budget proposal', assignee: 'Sarah Wilson', dueDate: new Date('2025-01-20'), completed: false },
        { task: 'Analyze infrastructure costs', assignee: 'Tom Brown', dueDate: new Date('2025-01-14'), completed: false },
        { task: 'Submit hiring requisitions', assignee: 'Lisa Chen', dueDate: new Date('2025-01-25'), completed: false }
      ],
      decisions: [
        'Approve additional $50K for Q2 hiring',
        'Implement cost monitoring dashboard',
        'Review vendor contracts by month end'
      ],
      nextMeeting: new Date('2025-02-05T14:00:00')
    },
    {
      id: '3',
      title: 'Product Roadmap Planning',
      date: new Date('2025-01-07T09:00:00'),
      duration: 90,
      participants: 12,
      platform: 'Microsoft Teams',
      summary: 'Strategic planning session for product roadmap, feature prioritization, and timeline alignment with business objectives.',
      keyPoints: [
        'Customer feedback analysis completed',
        'Three major features identified for Q2',
        'Technical debt prioritization discussed',
        'Competitive analysis insights shared'
      ],
      actionItems: [
        { task: 'Create detailed feature specifications', assignee: 'Alex Rodriguez', dueDate: new Date('2025-01-21'), completed: false },
        { task: 'Conduct user research interviews', assignee: 'Emma Davis', dueDate: new Date('2025-01-28'), completed: false },
        { task: 'Update project timeline', assignee: 'Chris Lee', dueDate: new Date('2025-01-16'), completed: true }
      ],
      decisions: [
        'Focus on mobile experience improvements',
        'Delay advanced analytics feature to Q3',
        'Increase QA resources for Q2'
      ]
    }
  ]);

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform = filterPlatform === 'all' || report.platform.toLowerCase() === filterPlatform.toLowerCase();
    return matchesSearch && matchesPlatform;
  });

  const handleDownloadReport = (report: MeetingReport) => {
    const reportContent = `
Meeting Report: ${report.title}
Date: ${report.date.toLocaleDateString()}
Duration: ${report.duration} minutes
Participants: ${report.participants}
Platform: ${report.platform}

SUMMARY:
${report.summary}

KEY POINTS:
${report.keyPoints.map(point => `• ${point}`).join('\n')}

ACTION ITEMS:
${report.actionItems.map(item => 
  `• ${item.task} (Assigned to: ${item.assignee}) ${item.completed ? '[COMPLETED]' : '[PENDING]'}`
).join('\n')}

DECISIONS:
${report.decisions.map(decision => `• ${decision}`).join('\n')}

${report.nextMeeting ? `Next Meeting: ${report.nextMeeting.toLocaleDateString()}` : ''}
    `.trim();

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${report.title.replace(/\s+/g, '_')}_${report.date.toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (selectedReport) {
    return (
      <div className="dashboard-content">
        <div className="page-header">
          <button 
            className="back-button"
            onClick={() => setSelectedReport(null)}
          >
            ← Back to Reports
          </button>
          <h2>{selectedReport.title}</h2>
          <button 
            className="download-button"
            onClick={() => handleDownloadReport(selectedReport)}
          >
            <Download size={16} />
            Download Report
          </button>
        </div>

        <div className="report-detail">
          <div className="report-header">
            <div className="report-meta">
              <div className="meta-item">
                <Calendar size={16} />
                {selectedReport.date.toLocaleDateString()} at {selectedReport.date.toLocaleTimeString()}
              </div>
              <div className="meta-item">
                <Clock size={16} />
                {selectedReport.duration} minutes
              </div>
              <div className="meta-item">
                <Users size={16} />
                {selectedReport.participants} participants
              </div>
              <div className="meta-item">
                <span className="platform-badge">{selectedReport.platform}</span>
              </div>
            </div>
          </div>

          <div className="report-sections">
            <section className="report-section">
              <h3>Summary</h3>
              <p>{selectedReport.summary}</p>
            </section>

            <section className="report-section">
              <h3>Key Points</h3>
              <ul className="key-points-list">
                {selectedReport.keyPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </section>

            <section className="report-section">
              <h3>Action Items</h3>
              <div className="action-items-list">
                {selectedReport.actionItems.map((item, index) => (
                  <div key={index} className={`action-item ${item.completed ? 'completed' : ''}`}>
                    <div className="action-content">
                      <span className="action-task">{item.task}</span>
                      <span className="action-assignee">Assigned to: {item.assignee}</span>
                      {item.dueDate && (
                        <span className="action-due">Due: {item.dueDate.toLocaleDateString()}</span>
                      )}
                    </div>
                    <div className="action-status">
                      {item.completed ? (
                        <CheckCircle className="completed-icon" size={20} />
                      ) : (
                        <div className="pending-indicator"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="report-section">
              <h3>Decisions Made</h3>
              <ul className="decisions-list">
                {selectedReport.decisions.map((decision, index) => (
                  <li key={index}>{decision}</li>
                ))}
              </ul>
            </section>

            {selectedReport.nextMeeting && (
              <section className="report-section">
                <h3>Next Meeting</h3>
                <p>
                  <Calendar size={16} />
                  {selectedReport.nextMeeting.toLocaleDateString()} at {selectedReport.nextMeeting.toLocaleTimeString()}
                </p>
              </section>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h2>Meeting Reports</h2>
        <p>View summaries and insights from your meetings</p>
      </div>

      <div className="reports-container">
        <div className="reports-filters">
          <div className="search-box">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-box">
            <Filter size={16} />
            <select
              value={filterPlatform}
              onChange={(e) => setFilterPlatform(e.target.value)}
            >
              <option value="all">All Platforms</option>
              <option value="zoom">Zoom</option>
              <option value="google meet">Google Meet</option>
              <option value="microsoft teams">Microsoft Teams</option>
              <option value="webex">Webex</option>
            </select>
          </div>
        </div>

        <div className="reports-grid">
          {filteredReports.map((report) => (
            <div key={report.id} className="report-card">
              <div className="report-card-header">
                <h3>{report.title}</h3>
                <span className="platform-badge">{report.platform}</span>
              </div>
              
              <div className="report-card-meta">
                <div className="meta-row">
                  <Calendar size={14} />
                  {report.date.toLocaleDateString()}
                </div>
                <div className="meta-row">
                  <Clock size={14} />
                  {report.duration} min
                </div>
                <div className="meta-row">
                  <Users size={14} />
                  {report.participants} people
                </div>
              </div>
              
              <div className="report-card-summary">
                {report.summary.substring(0, 120)}...
              </div>
              
              <div className="report-card-stats">
                <span>{report.keyPoints.length} key points</span>
                <span>{report.actionItems.length} action items</span>
                <span>{report.decisions.length} decisions</span>
              </div>
              
              <div className="report-card-actions">
                <button 
                  className="view-button"
                  onClick={() => setSelectedReport(report)}
                >
                  <Eye size={16} />
                  View Report
                </button>
                <button 
                  className="download-button"
                  onClick={() => handleDownloadReport(report)}
                >
                  <Download size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredReports.length === 0 && (
          <div className="empty-state">
            <BarChart3 size={48} />
            <h3>No reports found</h3>
            <p>
              {searchTerm || filterPlatform !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Your meeting reports will appear here once Sumry AI starts attending meetings.'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetingReports;
