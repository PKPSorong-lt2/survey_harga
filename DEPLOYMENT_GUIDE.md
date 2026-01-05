# 📘 PANDUAN DEPLOYMENT GITHUB PAGES

## 🎯 Tujuan
Deploy frontend Sistem Procurement Intelligence ke GitHub Pages agar bisa diakses via web browser dari mana saja.

---

## 🚀 LANGKAH DEPLOYMENT

### **STEP 1: Persiapan GitHub Account**

**1.1 Buat GitHub Account (Jika Belum Punya):**
```
1. Buka https://github.com
2. Click "Sign up"
3. Isi:
   - Username: polikp-sorong (atau nama lain)
   - Email: email Anda
   - Password: password aman
4. Verify email
5. Done!
```

**1.2 Install Git (Jika Belum Ada):**

**Windows:**
```
1. Download: https://git-scm.com/download/win
2. Install dengan default settings
3. Restart komputer
```

**macOS:**
```bash
# Via Homebrew
brew install git

# Atau download dari:
https://git-scm.com/download/mac
```

**Linux:**
```bash
sudo apt-get install git  # Ubuntu/Debian
sudo yum install git      # CentOS/RHEL
```

---

### **STEP 2: Upload Files ke GitHub**

**2.1 Buat Repository Baru:**

```
1. Login ke GitHub
2. Click "+" (kanan atas) → "New repository"
3. Isi:
   - Repository name: procurement-intelligence
   - Description: Sistem Procurement Intelligence
   - Public (agar bisa GitHub Pages gratis)
   - ✅ Add README file
4. Click "Create repository"
```

**2.2 Upload Files via Web Interface (MUDAH!):**

```
CARA 1: Drag & Drop

1. Buka repository: github.com/USERNAME/procurement-intelligence
2. Click "Add file" → "Upload files"
3. Drag semua file dari folder frontend:
   - index.html
   - survey-kebutuhan.html
   - survey-harga.html
   - dashboard.html
   - css/
   - js/
   - docs/ (jika ada)
4. Commit message: "Initial commit"
5. Click "Commit changes"
6. Done!
```

**2.3 Upload Files via Git CLI (ADVANCED):**

```bash
# 1. Clone repository
git clone https://github.com/USERNAME/procurement-intelligence.git
cd procurement-intelligence

# 2. Copy semua file frontend ke folder ini
cp -r /path/to/frontend/* .

# 3. Add files
git add .

# 4. Commit
git commit -m "Add frontend files"

# 5. Push
git push origin main

# Done!
```

---

### **STEP 3: Enable GitHub Pages**

**3.1 Aktifkan GitHub Pages:**

```
1. Buka repository di GitHub
2. Click "Settings" (tab menu)
3. Scroll ke "Pages" (menu kiri)
4. Source:
   - Branch: main
   - Folder: / (root)
5. Click "Save"
6. Tunggu 1-2 menit
7. Refresh page
8. URL muncul: https://USERNAME.github.io/procurement-intelligence/
```

**3.2 Test URL:**

```
1. Copy URL: https://USERNAME.github.io/procurement-intelligence/
2. Buka di browser
3. Cek semua fungsi:
   - Homepage load
   - Menu navigasi
   - Survey form
   - Dashboard
   - Styling OK
```

---

### **STEP 4: Deploy Apps Script as Web App**

**4.1 Di Apps Script:**

```
1. Open Apps Script project
2. Deploy → New deployment
3. Settings:
   - Type: Web app
   - Description: "Production v1.0"
   - Execute as: Me (your email)
   - Who has access: Anyone
4. Click "Deploy"
5. Authorize:
   - Review permissions
   - Allow
6. Copy "Web app URL"
   Format: https://script.google.com/macros/s/DEPLOYMENT_ID/exec
```

**4.2 Test Web App URL:**

```bash
# Via curl (terminal)
curl -L https://script.google.com/macros/s/YOUR_ID/exec

# Atau buka di browser
# Should return data atau response
```

---

### **STEP 5: Connect Frontend dengan Backend**

**5.1 Configure Apps Script URL:**

```
1. Buka: https://USERNAME.github.io/procurement-intelligence/
2. Scroll ke "Konfigurasi Apps Script URL"
3. Paste Web App URL
4. Click "Simpan"
5. Test:
   - Buka Survey Harga
   - Submit form
   - Check data masuk ke Sheets
```

**5.2 Hardcode URL (Optional - Recommended):**

**Edit file `js/main.js` di GitHub:**

```javascript
// Tambahkan ini di bagian atas
document.addEventListener('DOMContentLoaded', () => {
  // Auto-set Apps Script URL
  const defaultUrl = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';
  
  if (!localStorage.getItem('appsScriptUrl')) {
    localStorage.setItem('appsScriptUrl', defaultUrl);
  }
  
  const urlInput = document.getElementById('appsScriptUrl');
  if (urlInput && !urlInput.value) {
    urlInput.value = defaultUrl;
  }
});
```

**Commit changes:**
```
1. Edit file di GitHub
2. Commit: "Add default Apps Script URL"
3. Tunggu ~1 menit (GitHub Pages rebuild)
4. Test lagi
```

---

## 📋 CHECKLIST DEPLOYMENT

### **Pre-Deployment:**
```
□ GitHub account ready
□ Git installed
□ Frontend files ready
□ Apps Script tested
```

### **Deployment:**
```
□ Repository created
□ Files uploaded
□ GitHub Pages enabled
□ URL accessible
```

### **Integration:**
```
□ Apps Script deployed as Web App
□ Web App URL copied
□ Frontend configured
□ Test connection successful
```

### **Testing:**
```
□ Homepage loads correctly
□ All links work
□ Forms functional
□ Data submits to Sheets
□ Mobile responsive works
```

### **Final:**
```
□ Custom domain (optional)
□ Analytics added (optional)
□ SSL certificate (auto by GitHub)
□ Team training
□ Documentation shared
```

---

## 🎨 CUSTOMIZATION SETELAH DEPLOY

### **1. Update Content:**

```
1. Edit file di GitHub:
   - Click file (e.g., index.html)
   - Click pencil icon (Edit)
   - Make changes
   - Commit changes

2. Changes auto-deploy (~1 menit)

3. Hard refresh browser: Ctrl+Shift+R
```

### **2. Custom Domain (Optional):**

**Jika punya domain sendiri:**

```
1. Beli domain (e.g., procurement.polikpsorong.ac.id)

2. Settings → Pages → Custom domain:
   - Domain: procurement.polikpsorong.ac.id
   - Save

3. DNS Settings di domain registrar:
   - Type: A
   - Name: @
   - Value: 185.199.108.153
   - Value: 185.199.109.153
   - Value: 185.199.110.153
   - Value: 185.199.111.153
   
   - Type: CNAME
   - Name: www
   - Value: USERNAME.github.io

4. Tunggu 24-48 jam (DNS propagation)

5. Access: https://procurement.polikpsorong.ac.id
```

### **3. Google Analytics (Optional):**

**Track pengunjung:**

```html
<!-- Tambahkan di <head> index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-YOUR-ID');
</script>
```

---

## 🔧 TROUBLESHOOTING

### **Problem 1: GitHub Pages Tidak Aktif**

**Symptoms:**
- URL 404 Not Found
- "Site not found"

**Solutions:**
```
1. Check Settings → Pages:
   - Source: main branch
   - Folder: / (root)
   - Save

2. Wait 2-3 minutes

3. Check repository is Public

4. Check file bernama index.html (exact name)

5. Hard refresh: Ctrl+Shift+R
```

---

### **Problem 2: CSS/JS Tidak Load**

**Symptoms:**
- Halaman plain text
- Styling broken
- No interactivity

**Solutions:**
```
1. Check file paths:
   ✅ Correct: css/style.css
   ❌ Wrong: /css/style.css or ../css/style.css

2. Check folder structure:
   - index.html (root)
   - css/style.css
   - js/main.js

3. Check case-sensitive:
   - style.css (not Style.css)

4. Clear browser cache: Ctrl+Shift+R
```

---

### **Problem 3: Form Tidak Submit**

**Symptoms:**
- Click submit, nothing happens
- No error message
- Data tidak masuk Sheets

**Solutions:**
```
1. Check Apps Script URL configured

2. Check browser console (F12):
   - Look for errors
   - CORS issues?

3. Test Apps Script:
   - Open Web App URL directly
   - Should return response

4. Check Apps Script permissions:
   - Execute as: Me
   - Access: Anyone

5. Re-deploy Apps Script:
   - Deploy → New deployment
   - Get new URL
   - Update frontend
```

---

### **Problem 4: CORS Error**

**Symptoms:**
```
Access to fetch at '...' from origin '...' has been blocked by CORS policy
```

**Solutions:**
```
1. Pastikan Apps Script deployed as Web App

2. Access: Anyone (not "Only myself")

3. Execute as: Me

4. Use 'no-cors' mode di fetch (sudah ada di survey.js)

5. Alternative: Gunakan jsonp atau iframe
```

---

## 📊 MONITORING & MAINTENANCE

### **1. Check Status:**

```
Weekly check:
□ Site accessible
□ Forms working
□ Data flowing to Sheets
□ No errors in console
```

### **2. Update Content:**

```
Monthly update:
□ News/announcements
□ Statistics/numbers
□ Contact info
□ Documentation
```

### **3. Backup:**

```
Quarterly backup:
□ Download repository
□ Backup Apps Script
□ Export data from Sheets
□ Store in safe place
```

---

## 🎉 SETELAH DEPLOY

### **Share dengan Tim:**

**URL:**
```
Production: https://USERNAME.github.io/procurement-intelligence/
Staging: (jika ada branch lain)
```

**Documentation:**
```
Quick Start: /docs/quick-start.html
User Guide: /docs/user-guide.html
```

**Training:**
```
1. Demo live site
2. Walkthrough features
3. Practice survey form
4. Q&A session
```

---

## 💡 TIPS & BEST PRACTICES

### **1. Version Control:**
```
- Use semantic versioning: v1.0.0, v1.1.0, v2.0.0
- Tag releases di GitHub
- Maintain changelog
```

### **2. Testing:**
```
- Test di berbagai browser (Chrome, Firefox, Safari)
- Test di mobile (iOS, Android)
- Test slow connection
```

### **3. Performance:**
```
- Minimize CSS/JS (optional)
- Compress images
- Use CDN untuk libraries
- Enable browser caching
```

### **4. Security:**
```
- HTTPS otomatis by GitHub
- Validate input di frontend & backend
- Sanitize data
- Rate limiting di Apps Script
```

### **5. SEO (Optional):**
```html
<!-- Add meta tags -->
<meta name="description" content="...">
<meta name="keywords" content="...">
<meta property="og:title" content="...">
<meta property="og:image" content="...">
```

---

## 🆘 NEED HELP?

**Resources:**
- GitHub Docs: https://docs.github.com/pages
- Apps Script Docs: https://developers.google.com/apps-script
- Stack Overflow: https://stackoverflow.com

**Support:**
- Email: ppk@polikpsorong.ac.id
- Internal IT: ext. 123

---

## ✅ FINAL CHECKLIST

**Deployment Complete When:**
```
✅ GitHub Pages live
✅ Apps Script connected
✅ Forms submit successfully
✅ Data appears in Sheets
✅ Mobile responsive works
✅ All links functional
✅ Team trained
✅ Documentation ready
✅ Backup strategy in place
✅ Monitoring setup
```

---

**🎊 CONGRATULATIONS!**

**Sistem sudah live dan siap digunakan!**

**URL: https://USERNAME.github.io/procurement-intelligence/**

**Share dengan tim dan mulai gunakan! 🚀**
