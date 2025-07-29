// Main JavaScript functionality
document.addEventListener("DOMContentLoaded", () => {
  // Enhanced Sidebar toggle functionality
  const sidebarToggle = document.querySelector(".sidebar-toggle")
  const sidebar = document.querySelector(".sidebar")
  const mainContent = document.querySelector(".main-content")
  
  // Create overlay for mobile
  const overlay = document.createElement('div')
  overlay.className = 'sidebar-overlay'
  document.body.appendChild(overlay)

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener("click", () => {
      const isMobile = window.innerWidth <= 768
      
      if (isMobile) {
        // Mobile behavior - slide in/out
        sidebar.classList.toggle("active")
        overlay.classList.toggle("active")
      } else {
        // Desktop behavior - collapse/expand
        sidebar.classList.toggle("collapsed")
      }
    })
  }

  // Close sidebar when clicking overlay (mobile)
  overlay.addEventListener('click', () => {
    sidebar.classList.remove("active")
    overlay.classList.remove("active")
  })

  // Handle window resize
  window.addEventListener('resize', () => {
    const isMobile = window.innerWidth <= 768
    
    if (!isMobile) {
      // Reset mobile classes on desktop
      sidebar.classList.remove("active")
      overlay.classList.remove("active")
    } else {
      // Reset desktop classes on mobile
      sidebar.classList.remove("collapsed")
    }
  })

  // Wrap nav link text in spans for better toggle animation
  const navLinks = document.querySelectorAll('.nav-link')
  navLinks.forEach(link => {
    const icon = link.querySelector('i')
    const text = link.textContent.trim()
    
    if (icon && text) {
      link.innerHTML = ''
      link.appendChild(icon)
      const span = document.createElement('span')
      span.textContent = text
      span.style.transition = 'opacity 0.3s ease-in-out, visibility 0.3s ease-in-out'
      link.appendChild(span)
    }
  })

  // Theme toggle functionality
  const themeToggle = document.querySelector(".theme-toggle")
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode")
      const icon = themeToggle.querySelector("i")
      if (document.body.classList.contains("dark-mode")) {
        icon.className = "fas fa-sun"
      } else {
        icon.className = "fas fa-moon"
      }
    })
  }

  // Modal functionality
  window.openModal = (modalId) => {
    const modal = document.getElementById(modalId)
    if (modal) {
      modal.classList.add("active")
      modal.style.display = "flex"
    }
  }

  window.closeModal = (modalId) => {
    const modal = document.getElementById(modalId)
    if (modal) {
      modal.classList.remove("active")
      setTimeout(() => {
        modal.style.display = "none"
      }, 200)
    }
  }

  // Close modal when clicking outside
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      e.target.classList.remove("active")
      setTimeout(() => {
        e.target.style.display = "none"
      }, 200)
    }
  })

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const activeModal = document.querySelector(".modal.active")
      if (activeModal) {
        activeModal.classList.remove("active")
        setTimeout(() => {
          activeModal.style.display = "none"
        }, 200)
      }
    }
  })

  // Form validation
  const forms = document.querySelectorAll("form")
  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault()

      // Basic validation
      const requiredFields = form.querySelectorAll("[required]")
      let isValid = true

      requiredFields.forEach((field) => {
        const formGroup = field.closest(".form-group")
        if (!field.value.trim()) {
          formGroup.classList.add("error")
          isValid = false
        } else {
          formGroup.classList.remove("error")
          formGroup.classList.add("success")
        }
      })

      if (isValid) {
        // Show success message or submit form
        window.showNotification("Form submitted successfully!", "success")

        // Close modal if form is in modal
        const modal = form.closest(".modal")
        if (modal) {
          modal.classList.remove("active")
          setTimeout(() => {
            modal.style.display = "none"
          }, 200)
        }
      }
    })
  })

  // Notification system
  window.showNotification = (message, type = "info") => {
    const notification = document.createElement("div")
    notification.className = `notification ${type}`
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

  // Search functionality
  const searchInputs = document.querySelectorAll('input[type="text"][placeholder*="Search"]')
  searchInputs.forEach((input) => {
    input.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase()
      const searchableItems = document.querySelectorAll(".searchable-item")

      searchableItems.forEach((item) => {
        const text = item.textContent.toLowerCase()
        if (text.includes(searchTerm)) {
          item.style.display = ""
          item.classList.add("highlighted")
        } else {
          item.style.display = "none"
          item.classList.remove("highlighted")
        }
      })
    })
  })

  // Loading states
  window.showLoading = (element) => {
    element.classList.add("loading")
  }

  window.hideLoading = (element) => {
    element.classList.remove("loading")
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        })
      }
    })
  })
})
