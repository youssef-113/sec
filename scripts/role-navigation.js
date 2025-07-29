// Role-based navigation config and rendering
const roleNavigationConfig = {
    manager: [
        {text: 'Dashboard', url: 'dashboard.html', icon: 'fas fa-home'},
        {text: 'Analytics', url: 'analytics.html', icon: 'fas fa-chart-bar'},
        {text: 'Teams', url: 'teams.html', icon: 'fas fa-users'},
        {text: 'Schedule', url: 'schedule.html', icon: 'fas fa-calendar-alt'},
        {text: 'Drill Library', url: 'drills.html', icon: 'fas fa-dumbbell'},
        {text: 'View Players', url: 'players.html', icon: 'fas fa-user-friends'},
        {text: 'Attendance', url: 'attendance.html', icon: 'fas fa-clipboard-check'},
        {text: 'Announcements', url: 'announcements.html', icon: 'fas fa-bullhorn'},
        {text: 'Chat', url: 'chat.html', icon: 'fas fa-comments'},
        {text: 'Feedback', url: 'feedback.html', icon: 'fas fa-star'},
        {text: 'Medical Overview', url: 'medical-dashboard.html', icon: 'fas fa-heartbeat'},
        {text: 'Injury Management', url: 'medical-injuries.html', icon: 'fas fa-band-aid'},
        {text: 'Profile', url: 'profile.html', icon: 'fas fa-user'}
    ],
    coach: [
        {text: 'Dashboard', url: 'coach-dashboard.html', icon: 'fas fa-home'},
        {text: 'Analytics', url: 'coach-analytics.html', icon: 'fas fa-chart-bar'},
        {text: 'My Team', url: 'coach-team.html', icon: 'fas fa-users'},
        {text: 'Attendance', url: 'coach-attendance.html', icon: 'fas fa-clipboard-check'},
        {text: 'Training Drills', url: 'drills.html', icon: 'fas fa-dumbbell'},
        {text: 'Announcements', url: 'coach-announcements.html', icon: 'fas fa-bullhorn'},
        {text: 'Team Chat', url: 'coach-chat.html', icon: 'fas fa-comments'},
        {text: 'Profile', url: 'profile.html', icon: 'fas fa-user'}
    ],
    player: [
        {text: 'Dashboard', url: 'player-dashboard.html', icon: 'fas fa-home'},
        {text: 'Performance', url: 'player-performance.html', icon: 'fas fa-chart-line'},
        {text: 'Schedule', url: 'player-schedule.html', icon: 'fas fa-calendar-alt'},
        {text: 'Attendance', url: 'player-attendance.html', icon: 'fas fa-clipboard-check'},
        {text: 'Training Drills', url: 'player-drills.html', icon: 'fas fa-dumbbell'},
        {text: 'Goals & Progress', url: 'player-goals.html', icon: 'fas fa-target'},
        {text: 'Announcements', url: 'player-announcements.html', icon: 'fas fa-bullhorn'},
        {text: 'Chat with Doctor', url: 'player-chat.html', icon: 'fas fa-comments'},
        {text: 'Feedback', url: 'player-feedback.html', icon: 'fas fa-star'},
        {text: 'Medical Records', url: 'player-medical.html', icon: 'fas fa-heartbeat'},
        {text: 'Nutrition Plan', url: 'player-nutrition.html', icon: 'fas fa-apple-alt'},
        {text: 'Profile', url: 'profile.html', icon: 'fas fa-user'}
    ],
    medical: [
        {text: 'Dashboard', url: 'medical-dashboard.html', icon: 'fas fa-heartbeat'},
        {text: 'My Schedule', url: 'medical-schedule.html', icon: 'fas fa-calendar-alt'},
        {text: 'Announcements', url: 'medical-announcements.html', icon: 'fas fa-bullhorn'},
        {text: 'Player Search', url: 'medical-players.html', icon: 'fas fa-user-friends'},
        {text: 'Injury Management', url: 'medical-injuries.html', icon: 'fas fa-band-aid'},
        {text: 'Checkup Logs', url: 'medical-checkups.html', icon: 'fas fa-clipboard-list'},
        {text: 'Player Chat', url: 'medical-chat.html', icon: 'fas fa-comments'},
        {text: 'Medical Reports', url: 'medical-reports.html', icon: 'fas fa-file-medical'},
        {text: 'Team Analysis', url: 'medical-team-analysis.html', icon: 'fas fa-chart-line'},
        {text: 'Profile', url: 'profile.html', icon: 'fas fa-user'}
    ]
};

function renderRoleNavigation(role, containerSelector) {
    const navConfig = roleNavigationConfig[role] || [];
    const container = document.querySelector(containerSelector);
    if (!container) return;
    container.innerHTML = navConfig.map(item => `
        <li><a href="${item.url}" class="nav-link"><i class="${item.icon}"></i> <span>${item.text}</span></a></li>
    `).join('');
}

// Auto-render navigation for logged-in user
function autoRenderNavigation(containerSelector = '#role-nav') {
    let user = null;
    try {
        user = JSON.parse(localStorage.getItem('currentUser'));
    } catch {}
    if (user && user.role) {
        renderRoleNavigation(user.role, containerSelector);
    }
}

// For login page: set user and redirect to dashboard
function handleLoginSuccess(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    // Redirect to role dashboard
    let dashboard = 'dashboard.html';
    if (user.role === 'coach') dashboard = 'coach-dashboard.html';
    if (user.role === 'player') dashboard = 'player-dashboard.html';
    if (user.role === 'medical') dashboard = 'medical-dashboard.html';
    window.location.href = dashboard;
}
