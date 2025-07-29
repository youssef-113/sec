// Role-based navigation config and rendering
const roleNavigationConfig = {
    manager: [
        {text: 'Dashboard', url: 'dashboard.html', icon: 'fas fa-home'},
        {text: 'Analytics', url: 'analytics.html', icon: 'fas fa-chart-bar'},
        {text: 'Teams', url: 'pages/teams/teams.html', icon: 'fas fa-users'},
        {text: 'Schedule', url: 'schedule.html', icon: 'fas fa-calendar-alt'},
        {text: 'Matches & Tables', url: 'matches.html', icon: 'fas fa-trophy'},
        {text: 'Drill Library', url: 'drills.html', icon: 'fas fa-dumbbell'},
        {text: 'Manage Players', url: 'pages/player/players.html', icon: 'fas fa-user-friends'},
        {text: 'Attendance', url: 'attendance.html', icon: 'fas fa-clipboard-check'},
        {text: 'Announcements', url: 'announcements.html', icon: 'fas fa-bullhorn'},
        {text: 'Chat', url: 'chat.html', icon: 'fas fa-comments'},
        {text: 'Feedback', url: 'feedback.html', icon: 'fas fa-star'},
        {text: 'Medical Overview', url: 'pages/midical/medical-dashboard.html', icon: 'fas fa-heartbeat'},
        {text: 'Injury Management', url: 'injuries.html', icon: 'fas fa-band-aid'},
        {text: 'Profile', url: 'profile.html', icon: 'fas fa-user'}
    ],
    coach: [
        {text: 'Dashboard', url: 'pages/coach/coach-dashboard.html', icon: 'fas fa-home'},
        {text: 'Analytics', url: 'pages/coach/coach-analytics.html', icon: 'fas fa-chart-bar'},
        {text: 'My Team', url: 'pages/coach/coach-team.html', icon: 'fas fa-users'},
        {text: 'My Players', url: 'pages/coach/coach-players-list.html', icon: 'fas fa-user-friends'},
        {text: 'Matches & Tables', url: 'matches.html', icon: 'fas fa-trophy'},
        {text: 'Attendance', url: 'pages/coach/coach-attendance.html', icon: 'fas fa-clipboard-check'},
        {text: 'Training Drills', url: 'drills.html', icon: 'fas fa-dumbbell'},
        {text: 'Announcements', url: 'pages/coach/coach-announcements.html', icon: 'fas fa-bullhorn'},
        {text: 'Team Chat', url: 'pages/coach/coach-chat.html', icon: 'fas fa-comments'},
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
        {text: 'Dashboard', url: 'pages/midical/medical-dashboard.html', icon: 'fas fa-heartbeat'},
        {text: 'My Schedule', url: 'pages/midical/medical-schedule.html', icon: 'fas fa-calendar-alt'},
        {text: 'Announcements', url: 'pages/midical/medical-announcements.html', icon: 'fas fa-bullhorn'},
        {text: 'Player Search', url: 'pages/midical/medical-players.html', icon: 'fas fa-user-friends'},
        {text: 'Injury Management', url: 'pages/midical/medical-injuries.html', icon: 'fas fa-band-aid'},
        {text: 'Checkup Logs', url: 'pages/midical/medical-checkups.html', icon: 'fas fa-clipboard-list'},
        {text: 'Player Chat', url: 'pages/midical/medical-chat.html', icon: 'fas fa-comments'},
        {text: 'Medical Reports', url: 'pages/midical/medical-reports.html', icon: 'fas fa-file-medical'},
        {text: 'Team Analysis', url: 'pages/midical/medical-team-analysis.html', icon: 'fas fa-chart-line'},
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
    if (user.role === 'coach') dashboard = 'pages/coach/coach-dashboard.html';
    if (user.role === 'player') dashboard = 'pages/player/player-dashboard.html';
    if (user.role === 'medical') dashboard = 'pages/midical/medical-dashboard.html';
    window.location.href = dashboard;
}
