// Page initialization script for access control and navigation
document.addEventListener("DOMContentLoaded", () => {
  // Check if user is logged in (except for login page)
  const currentPage = window.location.pathname.split('/').pop()
  const isLoginPage = currentPage === 'index.html' || currentPage === ''

  if (!isLoginPage) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')
    
    if (!currentUser) {
      // Redirect to login if not authenticated
      window.location.href = 'index.html'
      return
    }

    // Initialize navigation for the current user
    initializeUserNavigation(currentUser)
    
    // Check page access permissions
    if (!hasPageAccess(currentPage, currentUser.role)) {
      // Redirect to appropriate dashboard if no access
      redirectToDashboard(currentUser.role)
      return
    }
  }

  // Initialize common page functionality
  initializeCommonFeatures()
})

// Initialize navigation based on user role
function initializeUserNavigation(user) {
  const navigationConfig = {
    manager: {
      title: 'Training Management',
      navigation: [
        { section: 'OVERVIEW', items: [
          { icon: 'fas fa-home', text: 'Dashboard', url: 'dashboard.html' },
          { icon: 'fas fa-chart-bar', text: 'Analytics', url: 'analytics.html' }
        ]},
        { section: 'SPORTS MANAGEMENT', items: [
          { icon: 'fas fa-users', text: 'Teams', url: 'teams.html' },
          { icon: 'fas fa-calendar-alt', text: 'Schedule', url: 'schedule.html' },
          { icon: 'fas fa-dumbbell', text: 'Drill Library', url: 'drills.html' },
          { icon: 'fas fa-user-friends', text: 'View Players', url: 'players.html' },
          { icon: 'fas fa-clipboard-check', text: 'Attendance', url: 'attendance.html' }
        ]},
        { section: 'COMMUNICATION', items: [
          { icon: 'fas fa-bullhorn', text: 'Announcements', url: 'announcements.html' },
          { icon: 'fas fa-comments', text: 'Chat', url: 'chat.html' },
          { icon: 'fas fa-star', text: 'Feedback', url: 'feedback.html' }
        ]},
        { section: 'MEDICAL CENTER', items: [
          { icon: 'fas fa-heartbeat', text: 'Medical Overview', url: 'medical-dashboard.html' },
          { icon: 'fas fa-band-aid', text: 'Injury Management', url: 'medical-injuries.html' }
        ]}
      ]
    },
    coach: {
      title: 'Coach Dashboard',
      navigation: [
        { section: 'OVERVIEW', items: [
          { icon: 'fas fa-home', text: 'Dashboard', url: 'coach-dashboard.html' },
          { icon: 'fas fa-chart-bar', text: 'Analytics', url: 'coach-analytics.html' }
        ]},
        { section: 'TEAM MANAGEMENT', items: [
          { icon: 'fas fa-users', text: 'My Team', url: 'coach-team.html' },
          { icon: 'fas fa-clipboard-check', text: 'Attendance', url: 'coach-attendance.html' },
          { icon: 'fas fa-dumbbell', text: 'Training Drills', url: 'drills.html' }
        ]},
        { section: 'COMMUNICATION', items: [
          { icon: 'fas fa-bullhorn', text: 'Announcements', url: 'coach-announcements.html' },
          { icon: 'fas fa-comments', text: 'Team Chat', url: 'coach-chat.html' }
        ]}
      ]
    },
    player: {
      title: 'Player Portal',
      navigation: [
        { section: 'OVERVIEW', items: [
          { icon: 'fas fa-home', text: 'Dashboard', url: 'player-dashboard.html' },
          { icon: 'fas fa-chart-line', text: 'Performance', url: 'player-performance.html' },
          { icon: 'fas fa-calendar-alt', text: 'Schedule', url: 'player-schedule.html' }
        ]},
        { section: 'TRAINING', items: [
          { icon: 'fas fa-clipboard-check', text: 'Attendance', url: 'player-attendance.html' },
          { icon: 'fas fa-dumbbell', text: 'Training Drills', url: 'player-drills.html' },
          { icon: 'fas fa-target', text: 'Goals & Progress', url: 'player-goals.html' }
        ]},
        { section: 'COMMUNICATION', items: [
          { icon: 'fas fa-bullhorn', text: 'Announcements', url: 'player-announcements.html' },
          { icon: 'fas fa-comments', text: 'Chat with Doctor', url: 'player-chat.html' },
          { icon: 'fas fa-star', text: 'Feedback', url: 'player-feedback.html' }
        ]},
        { section: 'HEALTH', items: [
          { icon: 'fas fa-heartbeat', text: 'Medical Records', url: 'player-medical.html' },
          { icon: 'fas fa-apple-alt', text: 'Nutrition Plan', url: 'player-nutrition.html' }
        ]}
      ]
    },
    medical: {
      title: 'Medical Center',
      navigation: [
        { section: 'MEDICAL OVERVIEW', items: [
          { icon: 'fas fa-heartbeat', text: 'Dashboard', url: 'medical-dashboard.html' },
          { icon: 'fas fa-calendar-alt', text: 'My Schedule', url: 'medical-schedule.html' },
          { icon: 'fas fa-bullhorn', text: 'Announcements', url: 'medical-announcements.html' }
        ]},
        { section: 'PLAYER MANAGEMENT', items: [
          { icon: 'fas fa-user-friends', text: 'Player Search', url: 'medical-players.html' },
          { icon: 'fas fa-band-aid', text: 'Injury Management', url: 'medical-injuries.html' },
          { icon: 'fas fa-clipboard-list', text: 'Checkup Logs', url: 'medical-checkups.html' }
        ]},
        { section: 'COMMUNICATION', items: [
          { icon: 'fas fa-comments', text: 'Player Chat', url: 'medical-chat.html' },
          { icon: 'fas fa-file-medical', text: 'Medical Reports', url: 'medical-reports.html' }
        ]}
      ]
    }
  }

  const config = navigationConfig[user.role]
  if (config) {
    updateSidebarNavigation(config, user)
  }
}

// Update sidebar navigation
function updateSidebarNavigation(config, user) {
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
    sidebarNav.innerHTML = generateNavigationHTML(config.navigation)
    
    // Set active link
    const currentPage = window.location.pathname.split('/').pop()
    const activeLink = sidebarNav.querySelector(`a[href="${currentPage}"]`)
    if (activeLink) {
      activeLink.classList.add('active')
    }
  }

  // Update user info
  updateUserInfo(user)
}

// Generate navigation HTML
function generateNavigationHTML(navigation) {
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
function updateUserInfo(user) {
  const userName = document.querySelector('.user-name')
  const userRole = document.querySelector('.user-role')
  const userAvatar = document.querySelector('.user-avatar')

  if (userName) userName.textContent = user.name || 'User'
  if (userRole) {
    const roleMap = {
      manager: 'Manager',
      coach: 'Coach', 
      player: 'Player',
      medical: 'Medical Staff'
    }
    userRole.textContent = roleMap[user.role] || user.role
  }
  if (userAvatar && user.avatar) {
    userAvatar.src = user.avatar
  }
}

// Check if user has access to current page
function hasPageAccess(page, userRole) {
  const rolePages = {
    manager: [
      'dashboard.html', 'analytics.html', 'teams.html', 'schedule.html', 
      'drills.html', 'players.html', 'attendance.html', 'announcements.html',
      'chat.html', 'feedback.html', 'medical-dashboard.html', 'medical-injuries.html'
    ],
    coach: [
      'coach-dashboard.html', 'coach-analytics.html', 'coach-team.html',
      'coach-attendance.html', 'drills.html', 'coach-announcements.html', 'coach-chat.html'
    ],
    player: [
      'player-dashboard.html', 'player-performance.html', 'player-schedule.html',
      'player-attendance.html', 'player-drills.html', 'player-goals.html',
      'player-announcements.html', 'player-chat.html', 'player-feedback.html',
      'player-medical.html', 'player-nutrition.html'
    ],
    medical: [
      'medical-dashboard.html', 'medical-schedule.html', 'medical-announcements.html',
      'medical-players.html', 'medical-injuries.html', 'medical-checkups.html',
      'medical-chat.html', 'medical-reports.html'
    ]
  }

  return rolePages[userRole]?.includes(page) || false
}

// Redirect to appropriate dashboard
function redirectToDashboard(userRole) {
  const dashboards = {
    manager: 'dashboard.html',
    coach: 'pages/coach/coach-dashboard.html',
    player: 'pages/player/player-dashboard.html',
    medical: 'pages/midical/medical-dashboard.html'
  }
  
  window.location.href = dashboards[userRole] || 'dashboard.html'
}

// Initialize common page features
function initializeCommonFeatures() {
  // Add logout functionality to all logout links
  const logoutLinks = document.querySelectorAll('a[href="index.html"]')
  logoutLinks.forEach(link => {
    if (link.textContent.includes('Logout') || link.querySelector('.fa-sign-out-alt')) {
      link.addEventListener('click', (e) => {
        e.preventDefault()
        localStorage.removeItem('currentUser')
        window.location.href = 'index.html'
      })
    }
  })

  // Initialize sidebar toggle if not already done
  if (!window.sidebarInitialized) {
    const sidebarToggle = document.querySelector('.sidebar-toggle')
    const sidebar = document.querySelector('.sidebar')
    
    if (sidebarToggle && sidebar) {
      // Create overlay for mobile if it doesn't exist
      let overlay = document.querySelector('.sidebar-overlay')
      if (!overlay) {
        overlay = document.createElement('div')
        overlay.className = 'sidebar-overlay'
        document.body.appendChild(overlay)
      }

      sidebarToggle.addEventListener('click', () => {
        const isMobile = window.innerWidth <= 768
        
        if (isMobile) {
          sidebar.classList.toggle('active')
          overlay.classList.toggle('active')
        } else {
          sidebar.classList.toggle('collapsed')
        }
      })

      overlay.addEventListener('click', () => {
        sidebar.classList.remove('active')
        overlay.classList.remove('active')
      })

      window.sidebarInitialized = true
    }
  }
}

