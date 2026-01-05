# 🌊 Sistem Procurement Intelligence - Frontend

Frontend aplikasi untuk Sistem Procurement Intelligence Politeknik Kelautan dan Perikanan Sorong.

## 🚀 Demo

**Live Demo:** [https://USERNAME.github.io/procurement-intelligence/](https://USERNAME.github.io/procurement-intelligence/)

> Replace `USERNAME` dengan username GitHub Anda

## ✨ Fitur

- 📋 Survey Harga Online
- 📊 Dashboard Visual
- 📱 Responsive Design
- 🎨 Modern UI/UX
- ⚡ Fast & Lightweight
- 🔗 Integrated dengan Google Apps Script

## 📂 Struktur File

```
frontend/
├── index.html              # Homepage
├── survey-kebutuhan.html   # Form input kebutuhan
├── survey-harga.html       # Form survey harga
├── dashboard.html          # Dashboard monitoring
├── css/
│   └── style.css          # Main stylesheet
├── js/
│   ├── main.js            # Core functionality
│   └── survey.js          # Survey API
└── docs/
    ├── quick-start.html
    ├── user-guide.html
    └── api-docs.html
```

## 🛠️ Instalasi

### Option 1: GitHub Pages (Recommended)

1. **Fork/Clone Repository:**
```bash
git clone https://github.com/USERNAME/procurement-intelligence.git
cd procurement-intelligence
```

2. **Enable GitHub Pages:**
   - Go to repository Settings
   - Scroll to "Pages"
   - Source: Deploy from branch
   - Branch: `main` → `/root`
   - Save

3. **Access:**
   - URL: `https://USERNAME.github.io/procurement-intelligence/`

### Option 2: Local Development

1. **Clone repository:**
```bash
git clone https://github.com/USERNAME/procurement-intelligence.git
cd procurement-intelligence
```

2. **Run local server:**
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

3. **Open browser:**
```
http://localhost:8000
```

## ⚙️ Konfigurasi

### 1. Deploy Apps Script sebagai Web App

**Di Google Apps Script:**

1. Open Apps Script project
2. Deploy → New deployment
3. Type: **Web app**
4. Execute as: **Me**
5. Who has access: **Anyone** (atau sesuai kebutuhan)
6. Deploy
7. Copy **Web app URL**

### 2. Configure Frontend

**Di Homepage (index.html):**

1. Scroll ke section "Konfigurasi"
2. Paste **Web app URL**
3. Click **Simpan**

**Manual (jika perlu):**

Edit `js/main.js`:
```javascript
// Hardcode URL (optional)
localStorage.setItem('appsScriptUrl', 'YOUR_WEB_APP_URL');
```

## 📝 Penggunaan

### Survey Kebutuhan

1. Buka: `survey-kebutuhan.html`
2. Isi form:
   - Nama Pekerjaan
   - Unit Pengusul
   - Jenis Kebutuhan
   - Tanggal dibutuhkan
3. Input daftar barang (bulk)
4. Submit

### Survey Harga

1. Buka: `survey-harga.html`
2. Pilih pekerjaan & item
3. Isi 3 sumber harga:
   - E-commerce
   - Toko lokal
   - Kontrak lama, dll
4. Auto-calculate average
5. Submit

### Dashboard

1. Buka: `dashboard.html`
2. View overview:
   - Progress per pekerjaan
   - Color coding status
   - Statistics
3. Click pekerjaan → Detail items

## 🎨 Customization

### Colors

Edit `css/style.css`:
```css
:root {
  --primary-color: #1565C0;    /* Main color */
  --secondary-color: #0D47A1;  /* Secondary */
  --accent-color: #667eea;     /* Accent */
  /* ... */
}
```

### Logo & Branding

Replace:
- Logo di navbar: `<i class="fas fa-anchor"></i>` → `<img src="logo.png">`
- Footer branding
- Color scheme

### Content

Edit `index.html`:
- Hero section
- Features
- Contact info
- Footer links

## 🔗 API Integration

### Apps Script Backend

**Deploy as Web App:**

```javascript
// Code.gs
function doPost(e) {
  const request = JSON.parse(e.postData.contents);
  const action = request.action;
  const data = request.data;
  
  switch(action) {
    case 'submitKebutuhan':
      return submitKebutuhan(data);
    case 'submitSurvey':
      return submitSurvey(data);
    case 'getPekerjaan':
      return getPekerjaan();
    default:
      return { error: 'Invalid action' };
  }
}
```

**CORS Headers:**

```javascript
function doPost(e) {
  // ... processing ...
  
  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## 📱 Mobile Responsive

Sudah responsive untuk:
- ✅ Desktop (1200px+)
- ✅ Tablet (768px - 1199px)
- ✅ Mobile (< 768px)

## 🚀 Deployment Checklist

- [ ] Apps Script deployed as Web App
- [ ] Web App URL configured di frontend
- [ ] Test API connection
- [ ] Test form submission
- [ ] Check mobile responsive
- [ ] Update contact info
- [ ] Customize branding
- [ ] Enable GitHub Pages
- [ ] Test live URL
- [ ] Share with team

## 🐛 Troubleshooting

### CORS Error

**Problem:** `Access-Control-Allow-Origin` error

**Solution:**
- Pastikan Apps Script deployed sebagai Web App
- Execute as: **Me**
- Access: **Anyone**

### Form Tidak Submit

**Problem:** Form tidak terkirim

**Solution:**
1. Check Apps Script URL configured
2. Check browser console for errors
3. Verify Apps Script doPost() function
4. Test Apps Script deployment

### Styling Broken

**Problem:** CSS tidak load

**Solution:**
1. Check path: `css/style.css`
2. Clear browser cache
3. Hard refresh: Ctrl+Shift+R

## 📖 Documentation

**Live Docs:**
- Quick Start: `/docs/quick-start.html`
- User Guide: `/docs/user-guide.html`
- API Docs: `/docs/api-docs.html`

## 🤝 Contributing

1. Fork repository
2. Create feature branch: `git checkout -b feature/AmazingFeature`
3. Commit changes: `git commit -m 'Add AmazingFeature'`
4. Push to branch: `git push origin feature/AmazingFeature`
5. Open Pull Request

## 📄 License

Copyright © 2026 Politeknik Kelautan dan Perikanan Sorong

## 👥 Team

**Developed by:**
- PPK Team
- IT Support

**Contact:**
- Email: ppk@polikpsorong.ac.id
- Phone: (0951) 123456

## 🙏 Acknowledgments

- Google Apps Script
- Font Awesome
- GitHub Pages

---

**Built with ❤️ for better procurement management**
