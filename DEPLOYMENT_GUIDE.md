# Panduan Lengkap Deployment CI/CD - Kriteria Utama 2

## Daftar Isi
1. [Persiapan Awal](#1-persiapan-awal)
2. [Setup GitHub Actions (CI)](#2-setup-github-actions-ci)
3. [Setup Vercel (CD)](#3-setup-vercel-cd)
4. [Konfigurasi Branch Protection](#4-konfigurasi-branch-protection)
5. [Testing dan Screenshot](#5-testing-dan-screenshot)
6. [Troubleshooting](#6-troubleshooting)

---

## 1. Persiapan Awal

### 1.0 Setup Repository GitHub Baru (Jika Belum Ada)

#### Cara 1: Membuat Repository Baru dari Project Existing

**Step 1: Buat Repository di GitHub**
1. Login ke [GitHub](https://github.com)
2. Klik tombol **+** di pojok kanan atas → **New repository**
3. Isi form:
   - **Repository name**: `submission2-forum-app` (atau nama lain)
   - **Description**: "Forum App - Dicoding Submission"
   - **Public** atau **Private** (pilih sesuai kebutuhan)
   - ❌ **JANGAN** centang "Initialize this repository with a README"
   - ❌ **JANGAN** tambahkan .gitignore atau license
4. Klik **Create repository**

**Step 2: Inisialisasi Git Lokal (Jika Belum)**

Buka terminal di folder project dan jalankan:

```powershell
# Cek apakah sudah ada git
git status

# Jika belum ada git (error), inisialisasi dulu
git init

# Tambahkan semua file
git add .

# Commit pertama
git commit -m "Initial commit: Forum App"
```

**Step 3: Hubungkan dengan Repository GitHub**

```powershell
# Ganti URL dengan repository Anda
git remote add origin https://github.com/username/submission2-forum-app.git

# Verifikasi remote
git remote -v

# Push ke GitHub (pertama kali)
git branch -M master
git push -u origin master
```

**Step 4: Verifikasi**
- Refresh halaman repository di GitHub
- Semua file seharusnya sudah muncul

#### Cara 2: Clone dari Repository Existing dan Push ke Repository Baru

Jika Anda sudah punya project di komputer dari source lain:

```powershell
# 1. Hapus remote lama (jika ada)
git remote remove origin

# 2. Tambahkan remote baru
git remote add origin https://github.com/username/repository-baru.git

# 3. Push ke repository baru
git push -u origin master
```

#### Cara 3: Menggunakan GitHub CLI (gh)

Jika sudah install GitHub CLI:

```powershell
# Install GitHub CLI (jika belum)
# Download dari: https://cli.github.com/

# Login
gh auth login

# Buat repository dan push sekaligus
gh repo create submission2-forum-app --public --source=. --remote=origin --push
```

#### Troubleshooting Common Issues

**Error: "remote origin already exists"**
```powershell
# Lihat remote saat ini
git remote -v

# Hapus remote lama
git remote remove origin

# Tambahkan remote baru
git remote add origin https://github.com/username/repo-baru.git
```

**Error: "failed to push some refs"**
```powershell
# Pull dulu untuk merge
git pull origin master --allow-unrelated-histories

# Atau force push (HATI-HATI!)
git push -u origin master --force
```

**Error: "Support for password authentication was removed"**
```powershell
# Gunakan Personal Access Token (PAT) bukan password
# Cara membuat PAT:
# 1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
# 2. Generate new token → Pilih repo scope
# 3. Copy token
# 4. Saat push, gunakan token sebagai password

# Atau gunakan SSH
git remote set-url origin git@github.com:username/repo.git
```

**Setup SSH Key (Recommended)**
```powershell
# Generate SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"

# Copy public key
Get-Content ~/.ssh/id_ed25519.pub | clip

# Tambahkan ke GitHub:
# Settings → SSH and GPG keys → New SSH key → Paste

# Test koneksi
ssh -T git@github.com

# Ubah remote ke SSH
git remote set-url origin git@github.com:username/repo.git
```

---

### 1.1 Cek Package.json
Pastikan file `package.json` memiliki script yang diperlukan:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest",
    "lint": "eslint . --ext .js,.jsx"
  }
}
```

### 1.2 Pastikan Testing Berfungsi
Jalankan perintah berikut di terminal untuk memastikan semua berjalan dengan baik:

```bash
# Install dependencies
npm install

# Jalankan tests
npm test

# Jalankan linter (jika ada)
npm run lint

# Build aplikasi
npm run build
```

### 1.3 Persiapan Repository GitHub
- Pastikan project sudah di-push ke GitHub
- Repository harus dalam status clean (tidak ada uncommitted changes)
- Branch utama bernama `master` atau `main`

---

## 2. Setup GitHub Actions (CI)

### 2.1 Buat Folder dan File Workflow

Buat struktur folder berikut di root project:
```
.github/
  workflows/
    ci.yml
```

### 2.2 Isi File ci.yml

Buat file `.github/workflows/ci.yml` dengan konten berikut:

```yaml
name: Continuous Integration

on:
  push:
    branches: [ master, main ]
  pull_request:
    branches: [ master, main ]

jobs:
  test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x]

    steps:
    - name: Checkout code
      uses: actions/checkout@v3
    
    - name: Setup Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linter (optional)
      run: npm run lint || echo "Linter not configured"
      continue-on-error: true
    
    - name: Run tests
      run: npm test
    
    - name: Build application
      run: npm run build
    
    - name: Upload build artifacts
      uses: actions/upload-artifact@v3
      with:
        name: dist
        path: dist/
```

### 2.3 Commit dan Push

```bash
git add .github/workflows/ci.yml
git commit -m "feat: add CI workflow with GitHub Actions"
git push origin master
```

### 2.4 Verifikasi GitHub Actions
1. Buka repository di GitHub
2. Klik tab **Actions**
3. Lihat workflow berjalan otomatis
4. Pastikan workflow berhasil (✅ hijau)

---

## 3. Setup Vercel (CD)

### 3.1 Daftar/Login ke Vercel
1. Buka [https://vercel.com](https://vercel.com)
2. Klik **Sign Up** atau **Login**
3. Pilih **Continue with GitHub**
4. Authorize Vercel untuk akses repository

### 3.2 Import Project

1. Di dashboard Vercel, klik **Add New** → **Project**
2. Pilih repository GitHub Anda
3. Klik **Import**

### 3.3 Konfigurasi Project

Vercel akan otomatis mendeteksi:
- **Framework Preset**: Vite
- **Root Directory**: `./`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

Jika tidak terdeteksi otomatis, isi manual:

```
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### 3.4 Environment Variables (Jika Ada)

Jika aplikasi menggunakan environment variables:
1. Klik **Environment Variables**
2. Tambahkan variable yang diperlukan (misalnya API keys)
3. Contoh:
   ```
   VITE_API_URL = https://api.example.com
   ```

### 3.5 Deploy

1. Klik **Deploy**
2. Tunggu proses deployment selesai (2-5 menit)
3. Setelah selesai, Anda akan mendapat URL seperti:
   ```
   https://your-project-name.vercel.app
   ```

### 3.6 Konfigurasi Production Domain (Optional)

1. Di dashboard project, klik **Settings** → **Domains**
2. Tambahkan custom domain jika diperlukan

### 3.7 Automatic Deployments

Vercel secara otomatis akan:
- Deploy setiap push ke branch `master` → Production
- Deploy setiap PR → Preview URL

---

## 4. Konfigurasi Branch Protection

### 4.1 Buka Settings Repository

1. Buka repository di GitHub
2. Klik **Settings** (tab paling kanan)
3. Di sidebar kiri, klik **Branches**

### 4.2 Add Branch Protection Rule

1. Klik **Add rule** atau **Add branch protection rule**
2. **Branch name pattern**: ketik `master` (atau `main`)

### 4.3 Konfigurasi Protection Rules

Aktifkan opsi berikut:

#### Required Settings:
- ☑️ **Require a pull request before merging**
  - ☑️ Require approvals: 1 (opsional jika solo)
  - ☑️ Dismiss stale pull request approvals when new commits are pushed

- ☑️ **Require status checks to pass before merging**
  - ☑️ Require branches to be up to date before merging
  - Di search box, ketik dan pilih: `test` (dari GitHub Actions)

- ☑️ **Require conversation resolution before merging** (opsional)

#### Additional Settings (Recommended):
- ☑️ **Include administrators** (rules juga berlaku untuk admin)
- ☑️ **Restrict who can push to matching branches** (opsional)
- ☑️ **Allow force pushes** → **Everyone** (TIDAK dicentang)
- ☑️ **Allow deletions** (TIDAK dicentang)

### 4.4 Save Changes

Klik **Create** atau **Save changes** di bagian bawah

---

## 5. Testing dan Screenshot

### 5.1 Persiapan Branch untuk Testing

```bash
# Pastikan di branch master dan sudah update
git checkout master
git pull origin master

# Buat branch baru untuk testing
git checkout -b test-ci-cd
```

### 5.2 Screenshot 1: CI Check Error (1_ci_check_error.png)

**Cara membuat CI error:**

1. Edit salah satu file test untuk membuat error sengaja:

```javascript
// Contoh: Edit file src/components/LoginInput.test.jsx
// Ubah salah satu test menjadi gagal
it('should fail intentionally', () => {
  expect(true).toBe(false); // Test akan gagal
});
```

2. Commit dan push:
```bash
git add .
git commit -m "test: intentional test failure for CI error screenshot"
git push origin test-ci-cd
```

3. Buat Pull Request:
   - Buka repository di GitHub
   - Klik **Pull requests** → **New pull request**
   - Base: `master`, Compare: `test-ci-cd`
   - Klik **Create pull request**

4. **Ambil Screenshot:**
   - Tunggu CI check berjalan
   - Setelah muncul ❌ (error/failed)
   - Screenshot halaman PR yang menunjukkan:
     - CI check failed (tanda ❌ merah)
     - Detail error dari GitHub Actions
     - Branch protection mencegah merge
   - Simpan sebagai `Screenshoot/1_ci_check_error.png`

### 5.3 Screenshot 2: CI Check Pass (2_ci_check_pass.png)

**Cara membuat CI pass:**

1. Fix test yang dibuat error tadi:

```javascript
// Hapus atau fix test yang error
it('should pass correctly', () => {
  expect(true).toBe(true); // Test akan berhasil
});
```

2. Commit dan push:
```bash
git add .
git commit -m "fix: resolve test failure for CI pass screenshot"
git push origin test-ci-cd
```

3. **Ambil Screenshot:**
   - Refresh halaman PR
   - Tunggu CI check berjalan ulang
   - Setelah muncul ✅ (success)
   - Screenshot halaman PR yang menunjukkan:
     - CI check passed (tanda ✅ hijau)
     - "All checks have passed"
     - Merge button sudah aktif (hijau)
   - Simpan sebagai `Screenshoot/2_ci_check_pass.png`

### 5.4 Screenshot 3: Branch Protection (3_branch_protection.png)

**Ambil screenshot pada halaman Pull Request:**

Screenshot harus menunjukkan:
- Branch protection rules aktif
- Status checks required
- "Merge pull request" button dengan status checks
- Keterangan "This branch has no conflicts with the base branch"
- Section yang menunjukkan "Review required" atau "Status checks"

**Cara mengambil:**
1. Buka Pull Request yang sama
2. Scroll ke bagian bawah (merge section)
3. Screenshot area yang menunjukkan:
   - Branch protection rules summary
   - Required status checks
   - Merge restrictions
4. Simpan sebagai `Screenshoot/3_branch_protection.png`

### 5.5 Merge Pull Request (Setelah Screenshot)

Setelah semua screenshot diambil:
```bash
# Di GitHub, klik Merge Pull Request
# Atau via command line:
git checkout master
git merge test-ci-cd
git push origin master
```

### 5.6 Verifikasi Deployment di Vercel

1. Setelah merge, Vercel akan otomatis deploy
2. Buka dashboard Vercel
3. Lihat deployment baru dengan status "Ready"
4. Klik untuk melihat production URL
5. Test aplikasi di URL tersebut

---

## 6. Troubleshooting

### Problem: GitHub Actions Gagal

**Solusi:**
```bash
# Cek error di tab Actions GitHub
# Perbaiki error sesuai log
# Biasanya masalah:
# - Missing dependencies
# - Test failure
# - Build error

# Test lokal dulu:
npm test
npm run build
```

### Problem: Vercel Build Gagal

**Solusi:**
1. Cek build log di Vercel dashboard
2. Pastikan:
   - `dist` folder ada setelah build
   - Node version compatible (18.x)
   - All dependencies di `package.json`

```bash
# Test build lokal:
npm run build
ls dist  # Pastikan ada file
```

### Problem: Branch Protection Tidak Muncul

**Solusi:**
1. Pastikan sudah ada GitHub Actions workflow
2. Push ke branch dan buat PR dulu
3. Status check baru muncul setelah workflow run pertama kali
4. Refresh halaman branch protection settings

### Problem: CI Check Tidak Berjalan

**Solusi:**
1. Cek file `.github/workflows/ci.yml` ada dan valid
2. Pastikan syntax YAML benar (gunakan YAML validator)
3. Cek tab Actions di GitHub untuk error
4. Pastikan workflow enabled:
   - Settings → Actions → General
   - Allow all actions

### Problem: Merge Button Masih Disabled

**Kemungkinan:**
1. CI check belum selesai (tunggu)
2. CI check failed (fix error)
3. Branch not up to date (update branch)
4. Required reviewers belum approve

```bash
# Update branch:
git checkout test-ci-cd
git merge master
git push origin test-ci-cd
```

---

## 7. Checklist Submission

### ✅ GitHub Actions (CI)
- [ ] File `.github/workflows/ci.yml` ada
- [ ] Workflow berjalan otomatis saat push/PR
- [ ] Workflow menjalankan tests
- [ ] Workflow menjalankan build
- [ ] Badge status di README (opsional)

### ✅ Vercel (CD)
- [ ] Project ter-deploy di Vercel
- [ ] Auto deployment dari master branch
- [ ] Preview deployment untuk PR
- [ ] URL production aktif dan berfungsi
- [ ] URL dicatat di submission

### ✅ Branch Protection
- [ ] Protection rule aktif di branch master
- [ ] Require PR before merging
- [ ] Require status checks (CI)
- [ ] Branches must be up to date
- [ ] Include administrators (recommended)

### ✅ Screenshots
- [ ] `1_ci_check_error.png` - CI check failed
- [ ] `2_ci_check_pass.png` - CI check passed
- [ ] `3_branch_protection.png` - Branch protection di PR
- [ ] Screenshot jelas dan lengkap

### ✅ Documentation
- [ ] URL Vercel di catatan submission
- [ ] Screenshot di folder `Screenshoot/`
- [ ] README updated (opsional)

---

## 8. Template Catatan Submission

```markdown
## Deployment Information

### Vercel URL
Production: https://your-app-name.vercel.app

### CI/CD Configuration
- **Continuous Integration**: GitHub Actions
- **Continuous Deployment**: Vercel
- **Branch Protection**: Enabled on master branch

### GitHub Actions Workflow
- Trigger: Push & Pull Request to master
- Jobs: Install → Lint → Test → Build
- Status: ✅ All checks passing

### Branch Protection Rules
- Require pull request reviews
- Require status checks to pass (test job)
- Require branches to be up to date
- Include administrators

### Screenshots
1. `1_ci_check_error.png` - CI check error (test failure)
2. `2_ci_check_pass.png` - CI check passed successfully
3. `3_branch_protection.png` - Branch protection on Pull Request page

### Testing
- Unit Tests: Passing
- Build: Success
- Deployment: Automatic via Vercel
```

---

## 9. Tips & Best Practices

### GitHub Actions
- Gunakan cache untuk npm dependencies (lebih cepat)
- Set timeout untuk job (default 6 jam, bisa dikurangi)
- Gunakan matrix strategy untuk test multiple Node versions
- Tambahkan badge status di README

### Vercel
- Set environment variables untuk different environments
- Gunakan preview deployments untuk testing
- Enable automatic Git integration
- Configure custom domains jika diperlukan

### Branch Protection
- Jangan skip protection untuk administrators (lebih aman)
- Require linear history (opsional, untuk clean git log)
- Set required reviewers jika tim lebih dari 1 orang
- Enable "Restrict who can dismiss pull request reviews"

### General
- Selalu test lokal sebelum push
- Commit dengan pesan yang jelas
- Gunakan conventional commits (feat:, fix:, docs:, etc.)
- Keep workflows simple dan maintainable

---

## 10. Referensi

### Dokumentasi Resmi
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Branch Protection](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches)

### Contoh Workflow
- [Vite + GitHub Actions](https://vitejs.dev/guide/static-deploy.html#github-pages)
- [React Testing with CI](https://create-react-app.dev/docs/running-tests#continuous-integration)

### Tools
- [YAML Validator](https://www.yamllint.com/)
- [GitHub Actions Marketplace](https://github.com/marketplace?type=actions)
- [Vercel CLI](https://vercel.com/docs/cli)

---

## Selesai! 🎉

Ikuti langkah-langkah di atas secara berurutan untuk menyelesaikan Kriteria Utama 2.

Jika ada pertanyaan atau error, cek bagian Troubleshooting atau dokumentasi resmi.

Good luck! 🚀
