// Player Nutrition JavaScript

// Initialize nutrition page
document.addEventListener('DOMContentLoaded', function() {
    initializeNutritionPage();
});

function initializeNutritionPage() {
    // Initialize progress rings
    initializeProgressRings();
    
    // Set up event listeners
    setupEventListeners();
    
    // Load nutrition data
    loadNutritionData();
}

function initializeProgressRings() {
    const progressRings = document.querySelectorAll('.progress-ring');
    
    progressRings.forEach(ring => {
        const circle = ring.querySelector('.progress-fill');
        const text = ring.querySelector('.progress-text');
        
        if (circle && text) {
            const percentage = parseInt(text.textContent);
            const radius = 26;
            const circumference = 2 * Math.PI * radius;
            const offset = circumference - (percentage / 100) * circumference;
            
            circle.style.strokeDasharray = circumference;
            circle.style.strokeDashoffset = offset;
        }
    });
}

function setupEventListeners() {
    // Meal action buttons
    const mealActions = document.querySelectorAll('.meal-action');
    mealActions.forEach(button => {
        button.addEventListener('click', function() {
            const mealId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            markMealCompleted(mealId);
        });
    });
    
    // Supplement status buttons
    const supplementButtons = document.querySelectorAll('.status-btn');
    supplementButtons.forEach(button => {
        button.addEventListener('click', function() {
            const supplementId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            toggleSupplement(supplementId);
        });
    });
}

function loadNutritionData() {
    // Simulate loading nutrition data
    console.log('Loading nutrition data...');
    
    // Update progress rings with current data
    updateNutritionProgress();
}

function updateNutritionProgress() {
    const progressData = {
        calories: 80,
        protein: 70,
        carbs: 90,
        fats: 60,
        water: 85
    };
    
    Object.keys(progressData).forEach(nutrient => {
        const ring = document.querySelector(`.overview-card.${nutrient} .progress-ring`);
        if (ring) {
            const circle = ring.querySelector('.progress-fill');
            const text = ring.querySelector('.progress-text');
            
            if (circle && text) {
                const percentage = progressData[nutrient];
                const radius = 26;
                const circumference = 2 * Math.PI * radius;
                const offset = circumference - (percentage / 100) * circumference;
                
                // Animate the progress
                circle.style.transition = 'stroke-dashoffset 1s ease-in-out';
                circle.style.strokeDashoffset = offset;
                text.textContent = percentage + '%';
            }
        }
    });
}

function markMealCompleted(mealId) {
    const mealCard = document.querySelector(`[onclick*="${mealId}"]`).closest('.meal-card');
    const statusElement = mealCard.querySelector('.status');
    const actionButton = mealCard.querySelector('.meal-action');
    
    if (statusElement && actionButton) {
        statusElement.textContent = 'Completed';
        statusElement.className = 'status completed';
        actionButton.style.display = 'none';
        
        // Show success message
        showNotification('Meal marked as completed!', 'success');
        
        // Update nutrition progress
        updateNutritionProgress();
    }
}

function toggleSupplement(supplementId) {
    const button = document.querySelector(`[onclick*="${supplementId}"]`);
    
    if (button) {
        const currentStatus = button.classList.contains('taken') ? 'taken' : 
                            button.classList.contains('pending') ? 'pending' : 'scheduled';
        
        // Remove current status
        button.classList.remove('taken', 'pending', 'scheduled');
        
        // Toggle to next status
        let newStatus, newText, newIcon;
        
        switch(currentStatus) {
            case 'scheduled':
                newStatus = 'taken';
                newText = 'Taken';
                newIcon = 'fas fa-check';
                break;
            case 'pending':
                newStatus = 'taken';
                newText = 'Taken';
                newIcon = 'fas fa-check';
                break;
            case 'taken':
                newStatus = 'pending';
                newText = 'Pending';
                newIcon = 'fas fa-clock';
                break;
        }
        
        button.classList.add(newStatus);
        button.innerHTML = `<i class="${newIcon}"></i> ${newText}`;
        
        showNotification(`Supplement status updated to ${newText}`, 'success');
    }
}

function consultNutritionist() {
    // Simulate opening consultation modal or redirect
    showNotification('Connecting you with the nutritionist...', 'info');
    
    // In a real application, this would open a chat or booking system
    setTimeout(() => {
        window.location.href = 'player-chat.html';
    }, 1500);
}

function logMeal() {
    // Simulate opening meal logging modal
    const modal = createMealLogModal();
    document.body.appendChild(modal);
    modal.style.display = 'block';
}

function createMealLogModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Log Meal</h3>
                <span class="close" onclick="closeMealLogModal()">&times;</span>
            </div>
            <div class="modal-body">
                <form id="meal-log-form">
                    <div class="form-group">
                        <label for="meal-type">Meal Type</label>
                        <select id="meal-type" required>
                            <option value="">Select meal type</option>
                            <option value="breakfast">Breakfast</option>
                            <option value="lunch">Lunch</option>
                            <option value="dinner">Dinner</option>
                            <option value="snack">Snack</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="meal-description">Description</label>
                        <textarea id="meal-description" rows="3" placeholder="Describe what you ate..."></textarea>
                    </div>
                    <div class="form-group">
                        <label for="meal-calories">Estimated Calories</label>
                        <input type="number" id="meal-calories" placeholder="Enter calories">
                    </div>
                    <div class="form-group">
                        <label for="meal-time">Time</label>
                        <input type="time" id="meal-time" required>
                    </div>
                    <button type="submit" class="btn-primary">Log Meal</button>
                </form>
            </div>
        </div>
    `;
    
    // Add form submission handler
    modal.querySelector('#meal-log-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            type: document.getElementById('meal-type').value,
            description: document.getElementById('meal-description').value,
            calories: document.getElementById('meal-calories').value,
            time: document.getElementById('meal-time').value
        };
        
        // Simulate saving meal log
        console.log('Logging meal:', formData);
        showNotification('Meal logged successfully!', 'success');
        closeMealLogModal();
    });
    
    return modal;
}

function closeMealLogModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add notification styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 16px 20px;
                border-radius: 8px;
                color: white;
                font-weight: 500;
                z-index: 1000;
                animation: slideIn 0.3s ease-out;
            }
            
            .notification.success {
                background: linear-gradient(135deg, #10b981, #059669);
            }
            
            .notification.error {
                background: linear-gradient(135deg, #ef4444, #dc2626);
            }
            
            .notification.info {
                background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Export functions for global access
window.consultNutritionist = consultNutritionist;
window.logMeal = logMeal;
window.markMealCompleted = markMealCompleted;
window.toggleSupplement = toggleSupplement;
window.closeMealLogModal = closeMealLogModal;

