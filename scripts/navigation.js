// Navigation system for Al Ahly SC Training Management
class NavigationManager {
  constructor() {
    this.currentUser = this.getCurrentUser()
    this.initializeNavigation()
  }

  // Get current user from localStorage or session
  getCurrentUser() {
    const user = localStorage.getItem('currentUser')
    return user ? JSON.parse(user) : null
  }

  // Set current user
  setCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user))
    this.currentUser = user
  }

  // Role-based navigation configuration
  getNavigationConfig() {
    return {
      manager: {
        dashboard: 'dashboard.html',
        title: 'Manager Dashboard',
        navigation: [
          { section: 'OVERVIEW', items: [
            { icon: 'fas fa-home', text: 'Dashboard', url: 'pages/coach/coach-dashboard.html' },
            { icon: 'fas fa-chart-bar', text: 'Analytics', url: 'pages/coach/coach-analytics.html' }
          ]},
          { section: 'SPORTS MANAGEMENT', items: [
            { icon: 'fas fa-users', text: 'Teams', url: 'pages/teams/teams.html' },
            { icon: 'fas fa-calendar-alt', text: 'Schedule', url: 'pages/coach/schedule.html' },
            { icon: 'fas fa-dumbbell', text: 'Drill Library', url: 'pages/coach/drills.html' },
            { icon: 'fas fa-user-friends', text: 'View Players', url: 'pages/player/players.html' },
            { icon: 'fas fa-clipboard-check', text: 'Attendance', url: 'pages/coach/coach-attendance.html' }
          ]},
          { section: 'COMMUNICATION', items: [
            { icon: 'fas fa-bullhorn', text: 'Announcements', url: 'pages/coach/coach-announcements.html' },
            { icon: 'fas fa-comments', text: 'Chat', url: 'pages/coach/coach-chat.html' },
            { icon: 'fas fa-star', text: 'Feedback', url: 'pages/coach/coach-feedback.html' }
          ]},
          { section: 'MEDICAL CENTER', items: [
            { icon: 'fas fa-heartbeat', text: 'Medical Overview', url: 'pages/midical/medical-dashboard.html' },
            { icon: 'fas fa-band-aid', text: 'Injury Management', url: 'pages/midical/medical-injuries.html' }
          ]}
        ]
      },
      coach: {
        dashboard: 'coach-dashboard.html',
        title: 'Coach Dashboard',
        navigation: [
          { section: 'OVERVIEW', items: [
            { icon: 'fas fa-home', text: 'Dashboard', url: 'pages/coach/coach-dashboard.html' },
            { icon: 'fas fa-chart-bar', text: 'Analytics', url: 'pages/coach/coach-analytics.html' }
          ]},
          { section: 'TEAM MANAGEMENT', items: [
            { icon: 'fas fa-users', text: 'My Team', url: 'pages/coach/coach-team.html' },
            { icon: 'fas fa-clipboard-check', text: 'Attendance', url: 'pages/coach/coach-attendance.html' },
            { icon: 'fas fa-dumbbell', text: 'Training Drills', url: 'pages/coach/drills.html' }
          ]},
          { section: 'COMMUNICATION', items: [
            { icon: 'fas fa-bullhorn', text: 'Announcements', url: 'pages/coach/coach-announcements.html' },
            { icon: 'fas fa-comments', text: 'Team Chat', url: 'pages/coach/coach-chat.html' }
          ]}
        ]
      },
      player: {
        dashboard: 'player-dashboard.html',
        title: 'Player Portal',
        navigation: [
          { section: 'OVERVIEW', items: [
            { icon: 'fas fa-home', text: 'Dashboard', url: 'pages/player/player-dashboard.html' },
            { icon: 'fas fa-chart-line', text: 'Performance', url: 'pages/player/player-performance.html' },
            { icon: 'fas fa-calendar-alt', text: 'Schedule', url: 'pages/player/player-schedule.html' }
          ]},
          { section: 'TRAINING', items: [
            { icon: 'fas fa-clipboard-check', text: 'Attendance', url: 'pages/player/player-attendance.html' },
            { icon: 'fas fa-dumbbell', text: 'Training Drills', url: 'pages/player/player-drills.html' },
            { icon: 'fas fa-target', text: 'Goals & Progress', url: 'pages/player/player-goals.html' }
          ]},
          { section: 'COMMUNICATION', items: [
            { icon: 'fas fa-bullhorn', text: 'Announcements', url: 'pages/player/player-announcements.html' },
            { icon: 'fas fa-comments', text: 'Chat with Doctor', url: 'pages/player/player-chat.html' },
            { icon: 'fas fa-star', text: 'Feedback', url: 'pages/player/player-feedback.html' }
          ]},
          { section: 'HEALTH', items: [
            { icon: 'fas fa-heartbeat', text: 'Medical Records', url: 'pages/player/player-medical.html' },
            { icon: 'fas fa-apple-alt', text: 'Nutrition Plan', url: 'pages/player/player-nutrition.html' }
          ]}
        ]
      },
      medical: {
        dashboard: 'pages/midical/medical-team-analysis.html',
        title: 'Medical Center',
        navigation: [
          { section: 'MEDICAL OVERVIEW', items: [
            { icon: 'fas fa-heartbeat', text: 'Dashboard', url: 'pages/midical/medical-dashboard.html' },
            { icon: 'fas fa-calendar-alt', text: 'My Schedule', url: 'pages/midical/medical-schedule.html' },
            { icon: 'fas fa-bullhorn', text: 'Announcements', url: 'pages/midical/medical-announcements.html' }
          ]},
          { section: 'PLAYER MANAGEMENT', items: [
            { icon: 'fas fa-user-friends', text: 'Player Search', url: 'pages/midical/medical-players.html' },
            { icon: 'fas fa-band-aid', text: 'Injury Management', url: 'pages/midical/medical-injuries.html' },
            { icon: 'fas fa-clipboard-list', text: 'Checkup Logs', url: 'pages/midical/medical-checkups.html' }
          ]},
          { section: 'COMMUNICATION', items: [
            { icon: 'fas fa-comments', text: 'Player Chat', url: 'pages/midical/medical-chat.html' },
            { icon: 'fas fa-file-medical', text: 'Medical Reports', url: 'pages/midical/medical-reports.html' }
          ]}
        ]
      }
    }
  }

  // Initialize navigation based on current user role
  initializeNavigation() {
    if (!this.currentUser) return

    const config = this.getNavigationConfig()
    const userConfig = config[this.currentUser.role]
    
    if (userConfig) {
      this.updateSidebarNavigation(userConfig)
    }
  }

  // Update sidebar navigation
  updateSidebarNavigation(config) {
    const sidebar = document.querySelector('.sidebar')
    if (!sidebar) return

    // Update sidebar title
    const sidebarTitle = sidebar.querySelector('.sidebar-title p')
    if (sidebarTitle) {
      sidebarTitle.textContent = config.title
    }

    // Update navigation
    const sidebarNav = sidebar.querySelector('.sidebar-nav')
    if (sidebarNav) {
      sidebarNav.innerHTML = this.generateNavigationHTML(config.navigation)
    }

    // Update user info
    this.updateUserInfo()
  }

  // Generate navigation HTML
  generateNavigationHTML(navigation) {
    return navigation.map(section => `
      <div class="nav-section">
        <h4>${section.section}</h4>
        <ul>
          ${section.items.map(item => `
            <li>
              <a href="${item.url}" class="nav-link">
                <i class="${item.icon}"></i>
                <span>${item.text}</span>
              </a>
            </li>
          `).join('')}
        </ul>
      </div>
    `).join('')
  }

  // Update user info in sidebar
  updateUserInfo() {
    if (!this.currentUser) return

    const userName = document.querySelector('.user-name')
    const userRole = document.querySelector('.user-role')
    const userAvatar = document.querySelector('.user-avatar')

    if (userName) userName.textContent = this.currentUser.name || 'User'
    if (userRole) userRole.textContent = this.formatRole(this.currentUser.role)
    if (userAvatar && this.currentUser.avatar) {
      userAvatar.src = this.currentUser.avatar
    }
  }

  // Format role for display
  formatRole(role) {
    const roleMap = {
      manager: 'Manager',
      coach: 'Coach',
      player: 'Player',
      medical: 'Medical Staff'
    }
    return roleMap[role] || role
  }

  // Handle login with role-based redirection
  handleLogin(userData) {
    this.setCurrentUser(userData)
    const config = this.getNavigationConfig()
    const userConfig = config[userData.role]
    
    if (userConfig) {
      window.location.href = userConfig.dashboard
    } else {
      window.location.href = 'dashboard.html'
    }
  }

  // Handle logout
  handleLogout() {
    localStorage.removeItem('currentUser')
    this.currentUser = null
    window.location.href = 'index.html'
  }

  // Check if user has access to a specific page
  hasAccess(page, userRole) {
    const config = this.getNavigationConfig()
    const roleConfig = config[userRole]
    
    if (!roleConfig) return false

    // Check if page is in user's navigation
    for (const section of roleConfig.navigation) {
      for (const item of section.items) {
        if (item.url === page) return true
      }
    }
    
    return false
  }

  // Redirect unauthorized users
  checkAccess() {
    if (!this.currentUser) {
      window.location.href = 'index.html'
      return false
    }

    const currentPage = window.location.pathname.split('/').pop()
    if (!this.hasAccess(currentPage, this.currentUser.role)) {
      const config = this.getNavigationConfig()
      const userConfig = config[this.currentUser.role]
      if (userConfig) {
        window.location.href = userConfig.dashboard
      }
      return false
    }

    return true
  }
}

// Initialize navigation manager
const navigationManager = new NavigationManager()

// Export for use in other scripts
window.NavigationManager = NavigationManager
window.navigationManager = navigationManager

