# Panduan Setup Repository GitHub Baru

## Metode 1: Push Project Existing ke Repository GitHub Baru

### Langkah 1: Buat Repository Baru di GitHub

1. **Login ke GitHub**: [https://github.com](https://github.com)
2. Klik tombol **+** (pojok kanan atas) → pilih **New repository**
3. **Isi form repository**:
   - **Repository name**: `submission2-forum-app` (atau nama pilihan Anda)
   - **Description**: "Forum Discussion App - Dicoding React Expert Submission"
   - **Visibility**: 
     - ✅ **Public** (jika ingin publik)
     - ⚪ **Private** (jika ingin private)
   - **❌ PENTING**: JANGAN centang apapun:
     - ❌ Add a README file
     - ❌ Add .gitignore
     - ❌ Choose a license
4. Klik **Create repository**
5. **Simpan URL repository** yang muncul, contoh:
   ```
   https://github.com/username/submission2-forum-app.git
   ```

---

### Langkah 2: Persiapan Project Lokal

Buka **PowerShell** atau **Terminal** di folder project Anda:

```powershell
# Masuk ke folder project
cd "D:\SEMESTER 7\PUHAT\submission2-main\submission2-main"

# Cek status git
git status
```

#### Jika Git Belum Diinisialisasi (Error: "not a git repository")

```powershell
# Inisialisasi git
git init

# Konfigurasi user (jika belum)
git config user.name "Nama Anda"
git config user.email "email@example.com"

# Tambahkan semua file
git add .

# Commit pertama
git commit -m "Initial commit: Forum Discussion App"
```

#### Jika Git Sudah Ada

```powershell
# Cek apakah ada uncommitted changes
git status

# Jika ada perubahan, commit dulu
git add .
git commit -m "Update project files"
```

---

### Langkah 3: Hubungkan dengan Repository GitHub

```powershell
# Cek remote saat ini (jika ada)
git remote -v

# Jika sudah ada remote 'origin', hapus dulu
git remote remove origin

# Tambahkan remote baru (GANTI dengan URL repository Anda!)
git remote add origin https://github.com/username/submission2-forum-app.git

# Verifikasi remote sudah terhubung
git remote -v
```

**Output yang benar:**
```
origin  https://github.com/username/submission2-forum-app.git (fetch)
origin  https://github.com/username/submission2-forum-app.git (push)
```

---

### Langkah 4: Push ke GitHub

```powershell
# Set branch utama ke 'master' (atau 'main')
git branch -M master

# Push pertama kali
git push -u origin master
```

**Jika diminta login:**
- **Username**: username GitHub Anda
- **Password**: Gunakan **Personal Access Token** (bukan password akun!)

---

### Langkah 5: Verifikasi di GitHub

1. Buka browser
2. Refresh halaman repository GitHub
3. Semua file project seharusnya sudah muncul
4. Cek apakah ada file:
   - `README.md`
   - `package.json`
   - Folder `src/`
   - dll

---

## Metode 2: Menggunakan GitHub CLI (Lebih Cepat)

### Install GitHub CLI

**Download dan Install:**
- Website: [https://cli.github.com/](https://cli.github.com/)
- Atau via package manager:
  ```powershell
  # Windows (via winget)
  winget install --id GitHub.cli
  
  # Atau via Chocolatey
  choco install gh
  ```

### Setup dan Push

```powershell
# Login ke GitHub
gh auth login
# Pilih: GitHub.com → HTTPS → Yes → Login with a web browser

# Buat repository dan push sekaligus
gh repo create submission2-forum-app --public --source=. --remote=origin --push

# Atau interaktif
gh repo create
```

---

## Troubleshooting

### ❌ Error: "remote origin already exists"

**Masalah:** Sudah ada remote origin yang terhubung ke repository lain

**Solusi:**
```powershell
# Lihat remote saat ini
git remote -v

# Hapus remote lama
git remote remove origin

# Tambahkan remote baru
git remote add origin https://github.com/username/repo-baru.git

# Push
git push -u origin master
```

---

### ❌ Error: "failed to push some refs"

**Masalah:** Repository GitHub tidak kosong (ada file README/LICENSE)

**Solusi 1: Pull dan Merge**
```powershell
# Pull dengan merge
git pull origin master --allow-unrelated-histories

# Resolve conflicts (jika ada)
git add .
git commit -m "Merge remote changes"

# Push
git push -u origin master
```

**Solusi 2: Force Push (HATI-HATI!)**
```powershell
# Force push (akan menimpa semua di GitHub)
git push -u origin master --force
```

---

### ❌ Error: "Support for password authentication was removed"

**Masalah:** GitHub tidak lagi menerima password biasa untuk push

**Solusi: Gunakan Personal Access Token (PAT)**

#### Cara Membuat Personal Access Token:

1. **Login GitHub** → Klik foto profil → **Settings**
2. Scroll ke bawah → **Developer settings** (paling bawah sidebar kiri)
3. **Personal access tokens** → **Tokens (classic)**
4. Klik **Generate new token** → **Generate new token (classic)**
5. **Isi form:**
   - **Note**: "Token for submission2 project"
   - **Expiration**: 90 days (atau custom)
   - **Select scopes**: ✅ **repo** (centang semua)
6. Scroll ke bawah → **Generate token**
7. **COPY TOKEN** dan simpan (tidak bisa dilihat lagi!)

#### Cara Menggunakan Token:

```powershell
# Saat push, GitHub akan minta login
git push -u origin master

# Username: username_github_anda
# Password: PASTE_TOKEN_DISINI (bukan password akun!)
```

#### Simpan Token (Agar Tidak Perlu Input Berulang):

```powershell
# Windows (Credential Manager)
git config --global credential.helper manager-core

# Push sekali dengan token, Windows akan simpan otomatis
git push -u origin master
```

---

### ✅ Alternatif: Gunakan SSH (Recommended)

SSH lebih aman dan tidak perlu input password berulang.

#### Generate SSH Key:

```powershell
# Generate key baru
ssh-keygen -t ed25519 -C "email@example.com"

# Tekan Enter 3x (default location, no passphrase)

# Copy public key
Get-Content ~/.ssh/id_ed25519.pub | clip
# Atau manual: cat ~/.ssh/id_ed25519.pub
```

#### Tambahkan ke GitHub:

1. **GitHub** → **Settings** → **SSH and GPG keys**
2. Klik **New SSH key**
3. **Title**: "Laptop Pribadi" (atau nama device)
4. **Key**: Paste key yang sudah di-copy
5. Klik **Add SSH key**

#### Test Koneksi:

```powershell
# Test SSH
ssh -T git@github.com

# Output yang benar:
# Hi username! You've successfully authenticated...
```

#### Ubah Remote ke SSH:

```powershell
# Ubah dari HTTPS ke SSH
git remote set-url origin git@github.com:username/submission2-forum-app.git

# Verifikasi
git remote -v

# Push (tidak perlu password lagi!)
git push -u origin master
```

---

## Checklist Setup Repository

Pastikan semua sudah dilakukan:

- [ ] Repository GitHub sudah dibuat
- [ ] Git sudah diinisialisasi di project lokal
- [ ] Remote 'origin' sudah terhubung ke repository GitHub
- [ ] Branch utama bernama 'master' atau 'main'
- [ ] Semua file sudah di-commit
- [ ] Berhasil push ke GitHub
- [ ] File muncul di repository GitHub
- [ ] Autentikasi setup (PAT atau SSH)

---

## Quick Reference Commands

```powershell
# Setup baru dari scratch
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/repo.git
git branch -M master
git push -u origin master

# Ganti repository tujuan
git remote remove origin
git remote add origin https://github.com/username/repo-baru.git
git push -u origin master

# Update dan push perubahan
git add .
git commit -m "Update description"
git push

# Cek status
git status
git remote -v
git log --oneline

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1
```

---

## Tips Best Practices

1. **Commit Message yang Jelas**
   ```powershell
   # Good
   git commit -m "feat: add login functionality"
   git commit -m "fix: resolve authentication bug"
   git commit -m "docs: update README"
   
   # Bad
   git commit -m "update"
   git commit -m "fix"
   ```

2. **Jangan Push File Sensitive**
   - Tambahkan `.env` ke `.gitignore`
   - Jangan commit API keys atau passwords
   - Gunakan environment variables

3. **Gunakan `.gitignore`**
   ```
   node_modules/
   dist/
   .env
   .DS_Store
   *.log
   ```

4. **Commit Frequently**
   - Commit setiap selesai fitur kecil
   - Jangan tunggu banyak perubahan

5. **Branch Strategy**
   - `master`/`main`: production code
   - `develop`: development code
   - `feature/xxx`: fitur baru
   - `hotfix/xxx`: bug fixes

---

## Next Steps

Setelah repository setup berhasil:

1. ✅ Lanjut ke setup **GitHub Actions** (CI)
2. ✅ Setup **Vercel** untuk deployment (CD)
3. ✅ Konfigurasi **Branch Protection**
4. ✅ Ikuti `DEPLOYMENT_GUIDE.md` untuk lengkapnya

---

**Good luck! 🚀**
