// ==========================================
// MINIMAL.JS - Simple & Direct
// ==========================================

// Configuration
let config = {
  appsScriptUrl: localStorage.getItem('appsScriptUrl') || ''
};

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  loadConfig();
  loadStats();
  setupAutoRefresh();
});

// Load config from localStorage
function loadConfig() {
  const url = localStorage.getItem('appsScriptUrl');
  if (url) {
    document.getElementById('appsScriptUrl').value = url;
    config.appsScriptUrl = url;
  }
}

// ==========================================
// CONFIG MODAL
// ==========================================

function showConfig() {
  document.getElementById('configModal').classList.add('show');
}

function closeConfig() {
  document.getElementById('configModal').classList.remove('show');
}

function saveConfig() {
  const url = document.getElementById('appsScriptUrl').value.trim();
  
  if (!url) {
    showToast('Mohon masukkan URL Apps Script', 'error');
    return;
  }
  
  if (!url.includes('script.google.com')) {
    showToast('URL tidak valid', 'error');
    return;
  }
  
  localStorage.setItem('appsScriptUrl', url);
  config.appsScriptUrl = url;
  
  showToast('Konfigurasi berhasil disimpan!', 'success');
  closeConfig();
}

// ==========================================
// HELP MODAL
// ==========================================

function showHelp() {
  document.getElementById('helpModal').classList.add('show');
}

function closeHelp() {
  document.getElementById('helpModal').classList.remove('show');
}

// ==========================================
// TOAST NOTIFICATION
// ==========================================

function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast ${type} show`;
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// ==========================================
// STATS
// ==========================================

async function loadStats() {
  // Mock data - replace with actual API call
  const stats = {
    transaksi: 42,
    survey: 28,
    dokumen: 156,
    progress: 75
  };
  
  // Animate counters
  animateCounter('totalTransaksi', stats.transaksi);
  animateCounter('totalSurvey', stats.survey);
  animateCounter('totalDokumen', stats.dokumen);
  
  document.getElementById('progressPersen').textContent = stats.progress + '%';
  
  // If you want to load from Apps Script:
  // const data = await apiRequest('getStats');
  // animateCounter('totalTransaksi', data.transaksi);
  // etc...
}

function animateCounter(id, target) {
  const element = document.getElementById(id);
  let current = 0;
  const increment = target / 30;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 30);
}

// Auto-refresh stats every 5 minutes
function setupAutoRefresh() {
  setInterval(loadStats, 5 * 60 * 1000);
}

// ==========================================
// ACTIONS
// ==========================================

function surveyBaru() {
  if (!checkConfig()) return;
  
  // Option 1: Open form page
  window.open('survey-form.html', '_blank');
  
  // Option 2: Call Apps Script directly
  // const url = config.appsScriptUrl + '?action=showSurveyForm';
  // window.open(url, '_blank');
}

function lihatSurvey() {
  if (!checkConfig()) return;
  window.open('survey-list.html', '_blank');
}

function inputTransaksi() {
  if (!checkConfig()) return;
  window.open('transaksi-form.html', '_blank');
}

function lihatTransaksi() {
  if (!checkConfig()) return;
  window.open('transaksi-list.html', '_blank');
}

function generateDok() {
  if (!checkConfig()) return;
  window.open('generate-dokumen.html', '_blank');
}

function uploadDok() {
  if (!checkConfig()) return;
  window.open('upload-dokumen.html', '_blank');
}

function openDashboard() {
  if (!checkConfig()) return;
  window.open('dashboard.html', '_blank');
}

function downloadLaporan() {
  if (!checkConfig()) return;
  
  showToast('Generating laporan...', 'success');
  
  // Call Apps Script to generate report
  apiRequest('generateLaporan')
    .then(result => {
      if (result.success) {
        window.open(result.url, '_blank');
        showToast('Laporan berhasil dibuat!', 'success');
      } else {
        showToast('Gagal generate laporan', 'error');
      }
    })
    .catch(error => {
      showToast('Error: ' + error.message, 'error');
    });
}

// ==========================================
// API HELPER
// ==========================================

function checkConfig() {
  if (!config.appsScriptUrl) {
    showToast('Mohon konfigurasi Apps Script URL terlebih dahulu', 'error');
    showConfig();
    return false;
  }
  return true;
}

async function apiRequest(action, data = {}) {
  if (!config.appsScriptUrl) {
    throw new Error('Apps Script URL not configured');
  }
  
  try {
    const response = await fetch(config.appsScriptUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: action,
        data: data
      })
    });
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// ==========================================
// KEYBOARD SHORTCUTS
// ==========================================

document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + K = Config
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    showConfig();
  }
  
  // Ctrl/Cmd + H = Help
  if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
    e.preventDefault();
    showHelp();
  }
  
  // Escape = Close modals
  if (e.key === 'Escape') {
    closeConfig();
    closeHelp();
  }
});

// ==========================================
// MODAL BACKDROP CLICK
// ==========================================

document.getElementById('configModal').addEventListener('click', (e) => {
  if (e.target.id === 'configModal') {
    closeConfig();
  }
});

document.getElementById('helpModal').addEventListener('click', (e) => {
  if (e.target.id === 'helpModal') {
    closeHelp();
  }
});

// ==========================================
// CONSOLE INFO
// ==========================================

console.log('%c🌊 Sistem Procurement Intelligence', 'font-size: 18px; color: #1976d2; font-weight: bold;');
console.log('%cPoliteknik KP Sorong', 'font-size: 14px; color: #666;');
console.log('%cV2.0 - Minimal & Fast', 'font-size: 12px; color: #999;');
