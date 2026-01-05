// ==========================================
// SURVEY.JS - Survey Form Functionality
// ==========================================

class SurveyAPI {
  constructor() {
    this.baseUrl = localStorage.getItem('appsScriptUrl') || '';
  }

  async request(endpoint, data = {}) {
    if (!this.baseUrl) {
      throw new Error('Apps Script URL belum dikonfigurasi');
    }

    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: endpoint,
          data: data
        })
      });

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  async submitKebutuhan(data) {
    return await this.request('submitKebutuhan', data);
  }

  async submitSurvey(data) {
    return await this.request('submitSurvey', data);
  }

  async getPekerjaan() {
    return await this.request('getPekerjaan');
  }

  async getItems(idPekerjaan) {
    return await this.request('getItems', { idPekerjaan });
  }
}

// Initialize API
const surveyAPI = new SurveyAPI();

// Form validation
function validateForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return false;

  const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
  let isValid = true;

  inputs.forEach(input => {
    if (!input.value.trim()) {
      input.style.borderColor = '#f44336';
      isValid = false;
    } else {
      input.style.borderColor = '#e0e0e0';
    }
  });

  return isValid;
}

// Format rupiah
function formatRupiah(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
}

// Calculate average
function calculateAverage(prices) {
  const validPrices = prices.filter(p => p > 0);
  if (validPrices.length === 0) return 0;
  
  const sum = validPrices.reduce((a, b) => a + b, 0);
  return Math.round(sum / validPrices.length);
}

// Show loading
function showLoading(button) {
  const originalText = button.innerHTML;
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memproses...';
  button.disabled = true;
  
  return () => {
    button.innerHTML = originalText;
    button.disabled = false;
  };
}

// Show notification
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
    <span>${message}</span>
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Auto-save to localStorage
function autoSave(formId, key) {
  const form = document.getElementById(formId);
  if (!form) return;
  
  const inputs = form.querySelectorAll('input, select, textarea');
  
  // Load saved data
  const savedData = localStorage.getItem(key);
  if (savedData) {
    const data = JSON.parse(savedData);
    Object.keys(data).forEach(name => {
      const input = form.querySelector(`[name="${name}"]`);
      if (input) input.value = data[name];
    });
  }
  
  // Save on change
  inputs.forEach(input => {
    input.addEventListener('change', () => {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      localStorage.setItem(key, JSON.stringify(data));
    });
  });
}

// Clear saved data
function clearSavedData(key) {
  localStorage.removeItem(key);
}

// Export functions for global use
window.surveyAPI = surveyAPI;
window.validateForm = validateForm;
window.formatRupiah = formatRupiah;
window.calculateAverage = calculateAverage;
window.showLoading = showLoading;
window.showNotification = showNotification;
window.autoSave = autoSave;
window.clearSavedData = clearSavedData;

// Notification styles
const notificationStyles = `
  <style>
    .notification {
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 1rem 1.5rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      display: flex;
      align-items: center;
      gap: 1rem;
      transform: translateX(400px);
      transition: transform 0.3s ease;
      z-index: 9999;
    }
    
    .notification.show {
      transform: translateX(0);
    }
    
    .notification-success {
      border-left: 4px solid #4caf50;
    }
    
    .notification-error {
      border-left: 4px solid #f44336;
    }
    
    .notification i {
      font-size: 1.5rem;
    }
    
    .notification-success i {
      color: #4caf50;
    }
    
    .notification-error i {
      color: #f44336;
    }
  </style>
`;

document.head.insertAdjacentHTML('beforeend', notificationStyles);
