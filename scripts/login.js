// Login page functionality
document.addEventListener("DOMContentLoaded", () => {
  // Tab switching
  const tabBtns = document.querySelectorAll(".tab-btn")
  const loginForms = document.querySelectorAll(".login-form")

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const targetTab = this.getAttribute("data-tab")

      // Remove active class from all tabs and forms
      tabBtns.forEach((tab) => tab.classList.remove("active"))
      loginForms.forEach((form) => form.classList.remove("active"))

      // Add active class to clicked tab and corresponding form
      this.classList.add("active")
      document.getElementById(targetTab + "-form").classList.add("active")
    })
  })

  // Password toggle functionality
  window.togglePassword = (inputId) => {
    const input = document.getElementById(inputId)
    const icon = input.nextElementSibling

    if (input.type === "password") {
      input.type = "text"
      icon.classList.remove("fa-eye")
      icon.classList.add("fa-eye-slash")
    } else {
      input.type = "password"
      icon.classList.remove("fa-eye-slash")
      icon.classList.add("fa-eye")
    }
  }

  // Forgot password modal
  window.showForgotPassword = () => {
    document.getElementById("forgot-password-modal").style.display = "flex"
    document.getElementById("forgot-password-modal").classList.add("active")
  }

  window.closeForgotPassword = () => {
    const modal = document.getElementById("forgot-password-modal")
    modal.classList.remove("active")
    setTimeout(() => {
      modal.style.display = "none"
    }, 200)
  }

  // Notification function declaration
  function showNotification(message, type) {
    const notification = document.createElement("div")
    notification.classList.add("notification", type)
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas fa-${type === "success" ? "check-circle" : type === "error" ? "exclamation-circle" : "info-circle"}"></i>
        <span>${message}</span>
      </div>
      <button class="notification-close" onclick="this.parentElement.remove()">
        <i class="fas fa-times"></i>
      </button>
    `

    // Add notification styles if not already added
    if (!document.querySelector("#notification-styles")) {
      const styles = document.createElement("style")
      styles.id = "notification-styles"
      styles.textContent = `
        .notification {
          position: fixed;
          top: 20px;
          right: 20px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          z-index: 10000;
          min-width: 300px;
          animation: slideInRight 0.3s ease-out;
        }
        .notification.success { border-left: 4px solid #10b981; }
        .notification.error { border-left: 4px solid #ef4444; }
        .notification.info { border-left: 4px solid #3b82f6; }
        .notification-content { display: flex; align-items: center; gap: 8px; flex: 1; }
        .notification-close { background: none; border: none; cursor: pointer; color: #6b7280; }
        @keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
      `
      document.head.appendChild(styles)
    }

    document.body.appendChild(notification)

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove()
      }
    }, 5000)
  }

  // Mock user database for demonstration
  const mockUsers = {
    'manager@alahly.com': { 
      password: 'manager123', 
      role: 'manager', 
      name: 'Ahmed Hassan',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
    },
    'coach@alahly.com': { 
      password: 'coach123', 
      role: 'coach', 
      name: 'Mohamed Ali',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
    },
    'player@alahly.com': { 
      password: 'player123', 
      role: 'player', 
      name: 'Mohamed Salah',
      avatar: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=40&h=40&fit=crop&crop=face'
    },
    'doctor@alahly.com': { 
      password: 'doctor123', 
      role: 'medical', 
      name: 'Dr. Sarah Ahmed',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=40&h=40&fit=crop&crop=face'
    }
  }

  // Form submissions
  document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault()

    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]')
    submitBtn.classList.add("loading")
    submitBtn.textContent = "Signing in..."

    // Simulate login process
    setTimeout(() => {
      submitBtn.classList.remove("loading")
      submitBtn.textContent = "Login"

      // Check credentials
      const user = mockUsers[email]
      if (user && user.password === password) {
        // Successful login
        const userData = {
          email: email,
          name: user.name,
          role: user.role,
          avatar: user.avatar
        }

        // Store user data and redirect based on role
        localStorage.setItem('currentUser', JSON.stringify(userData))
        showNotification(`Welcome back, ${user.name}!`, "success")

        // Role-based redirection
        setTimeout(() => {
          switch (user.role) {
            case 'manager':
              window.location.href = "dashboard.html"
              break
            case 'coach':
              window.location.href = "pages/coach/coach-dashboard.html"
              break
            case 'player':
              window.location.href = "pages/player/player-dashboard.html"
              break
            case 'medical':
              window.location.href = "pages/midical/medical-dashboard.html"
              break
            default:
              window.location.href = "dashboard.html"
          }
        }, 1000)
      } else {
        // Failed login
        showNotification("Invalid email or password!", "error")
      }
    }, 2000)
  })

  document.getElementById("signup-form").addEventListener("submit", function (e) {
    e.preventDefault()

    const fullname = document.getElementById("fullname").value
    const email = document.getElementById("signup-email").value
    const role = document.getElementById("role").value
    const password = document.getElementById("signup-password").value
    const confirmPassword = document.getElementById("confirm-password").value

    if (password !== confirmPassword) {
      showNotification("Passwords do not match!", "error")
      return
    }

    if (!role) {
      showNotification("Please select your role!", "error")
      return
    }

    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]')
    submitBtn.classList.add("loading")
    submitBtn.textContent = "Creating account..."

    // Simulate signup process
    setTimeout(() => {
      submitBtn.classList.remove("loading")
      submitBtn.textContent = "Create Account"
      
      // Add user to mock database (in real app, this would be sent to server)
      mockUsers[email] = {
        password: password,
        role: role,
        name: fullname,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
      }

      showNotification("Account created successfully! Please login.", "success")
      
      // Switch to login tab and pre-fill email
      document.querySelector('[data-tab="login"]').click()
      document.getElementById("email").value = email
    }, 2000)
  })

  document.getElementById("forgot-password-form").addEventListener("submit", function (e) {
    e.preventDefault()

    const email = document.getElementById("reset-email").value

    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]')
    submitBtn.classList.add("loading")
    submitBtn.textContent = "Sending..."

    // Simulate password reset
    setTimeout(() => {
      submitBtn.classList.remove("loading")
      submitBtn.textContent = "Send Reset Link"
      showNotification("Password reset link sent to your email!", "success")
      window.closeForgotPassword()
    }, 2000)
  })

  // Demo login buttons for testing
  const createDemoButton = (role, email, name) => {
    const button = document.createElement('button')
    button.className = 'btn-outline demo-btn'
    button.style.cssText = 'margin: 5px; padding: 8px 16px; font-size: 12px;'
    button.textContent = `Demo ${name}`
    button.onclick = () => {
      document.getElementById("email").value = email
      document.getElementById("password").value = mockUsers[email].password
    }
    return button
  }

  // Add demo buttons container
  const demoContainer = document.createElement('div')
  demoContainer.style.cssText = 'margin-top: 20px; text-align: center; border-top: 1px solid #e5e7eb; padding-top: 20px;'
  demoContainer.innerHTML = '<p style="font-size: 12px; color: #6b7280; margin-bottom: 10px;">Quick Demo Login:</p>'
  
  demoContainer.appendChild(createDemoButton('manager', 'manager@alahly.com', 'Manager'))
  demoContainer.appendChild(createDemoButton('coach', 'coach@alahly.com', 'Coach'))
  demoContainer.appendChild(createDemoButton('player', 'player@alahly.com', 'Player'))
  demoContainer.appendChild(createDemoButton('medical', 'doctor@alahly.com', 'Doctor'))

  document.getElementById("login-form").appendChild(demoContainer)
})
