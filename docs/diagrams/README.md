# LearnHub E-Learning Platform - UML Diagrams

Folder ini berisi diagram UML untuk dokumentasi sistem LearnHub E-Learning Platform.

## 📁 Daftar Diagram

| File | Deskripsi |
|------|-----------|
| `use_case_diagram.puml` | Use Case Diagram - Menampilkan aktor dan use case sistem |
| `activity_diagram.puml` | Activity Diagram - Alur enrollment hingga klaim sertifikat |
| `class_diagram.puml` | Class Diagram - Struktur kelas dan relasi |
| `erd_diagram.puml` | ERD - Entity Relationship Diagram database |

## 🛠️ Cara Render Diagram

### Opsi 1: VS Code Extension (Recommended)
1. Install extension **"PlantUML"** by jebbs di VS Code
2. Buka file `.puml`
3. Tekan `Alt + D` untuk preview
4. Klik kanan → "Export Current Diagram" untuk export ke PNG/SVG

### Opsi 2: PlantUML Online Server
1. Kunjungi https://www.plantuml.com/plantuml/uml
2. Copy-paste isi file `.puml`
3. Klik "Submit" untuk generate diagram
4. Download gambar hasil

### Opsi 3: PlantUML CLI (Local)
```bash
# Install Java terlebih dahulu
# Download plantuml.jar dari https://plantuml.com/download

# Generate PNG
java -jar plantuml.jar use_case_diagram.puml

# Generate SVG
java -jar plantuml.jar -tsvg use_case_diagram.puml

# Generate semua diagram
java -jar plantuml.jar *.puml
```

## 📊 Ringkasan Sistem

### Aktor (Roles)
- **Guest** - Pengunjung yang belum login
- **Customer (Student)** - Pengguna yang terdaftar dan bisa mengambil kursus
- **Dosen (Instructor)** - Pengajar yang membuat dan mengelola kursus
- **Admin** - Administrator yang mengelola seluruh sistem

### Fitur Utama
1. **Browse & Search Courses** - Jelajahi dan cari kursus
2. **Enrollment System** - Daftar kursus gratis/berbayar
3. **Video Learning** - Tonton video pembelajaran
4. **Progress Tracking** - Lacak kemajuan belajar
5. **Certificate System** - Klaim dan verifikasi sertifikat
6. **Review System** - Tulis dan moderasi review
7. **Dark/Light Mode** - Toggle tema tampilan

### Entitas Database
- `users` - Data pengguna
- `courses` - Data kursus
- `categories` - Kategori kursus
- `chapters` - Chapter/bab dalam kursus
- `lessons` - Pelajaran dalam chapter
- `enrollments` - Data pendaftaran kursus
- `lesson_progress` - Progress per lesson
- `reviews` - Review kursus
- `certificates` - Sertifikat yang diterbitkan
- `course_tags` - Tag untuk kursus
