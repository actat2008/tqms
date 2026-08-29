# TQMS - Tələbə Qeydiyyat Məlumat Sistemi

Azərbaycan universitetinə yeni qəbul olunan tələbələr üçün məlumat toplama sistemi.

## Layihə Haqqında

Bu sistem tələbədən şəxsi, əlaqə və əvvəlki təhsil məlumatlarını toplamaq üçün müasir, təhlükəsiz və tam funksional web tətbiqidir.

## Texnologiya Stack'ı

- **Frontend**: Next.js + TypeScript
- **UI**: Tailwind CSS + shadcn/ui
- **Backend**: Next.js API Routes & Server Actions
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **Form Management**: React Hook Form
- **Validation**: Zod
- **Export**: xlsx, CSV

## Məsələfiyyətlər

### Tələbə Formu
- Mərhələli wizard forması
- Şəxsi məlumatlar (Ad, Soyad, Ata adı, FİN)
- Əlaqə məlumatları (Valideyn, şəxsi telefon)
- Təhsil məlumatları (Səviyyə, müəssisə, il)
- Ünvan məlumatları (Qeydiyyat və faktiki)
- Dinamik müəssisə seçimi
- Məlumatların yoxlanılması
- Unikal tələbə ID yaratma

### Admin Panel
- Autentifikasiya sistemi
- Dashboard (statistika və qrafiklər)
- Tələbə siyahısı (axtarış, filter, sort)
- Tələbə detalları
- Redaktə və audit log
- Export (Excel, CSV)
- Təhsil müəssisələri idarəetməsi
- Institutların şəhər/rayon dinamik filtri

## Verilən Bazası

### Əsas Cədvəllər
- `users` - Admin istifadəçiləri
- `students` - Tələbə məlumatları
- `education_institutions` - Təhsil müəssisələri
- `education_institution_types` - Müəssisə tipleri
- `regions` - Azərbaycan şəhər/rayonları
- `addresses` - Ünvan məlumatları
- `audit_logs` - Dəyişikliklərin audit log-u

## Quraşdırma

### Tələblər
- Node.js 18+
- PostgreSQL 14+
- npm veya yarn

### Addımlar

1. **Depo klonla**
```bash
git clone https://github.com/actat2008/tqms.git
cd tqms
```

2. **Dependencies qur**
```bash
npm install
```

3. **Environment dəyişənləri qur**
```bash
cp .env.example .env.local
```

4. **Database migration**
```bash
npx prisma migrate dev
```

5. **Seed məlumatları əlavə et**
```bash
npm run seed
```

6. **Inkişaf serveri başlat**
```bash
npm run dev
```

Server `http://localhost:3000` ünvanında işə düşəcəkdir.

## Fayllar Strukturu

```
tqms/
├── app/
│   ├── (public)/
│   │   ├── page.tsx          # Tələbə formu
│   │   └── layout.tsx
│   ├── admin/
│   │   ├── layout.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── students/page.tsx
│   │   ├── institutions/page.tsx
│   │   └── login/page.tsx
│   ├── api/
│   │   ├── students/
│   │   ├── institutions/
│   │   ├── dashboard/
│   │   └── auth/
│   └── layout.tsx
├── components/
│   ├── forms/
│   ├── tables/
│   ├── ui/
│   └── admin/
├── lib/
│   ├── db.ts
│   ├── auth.ts
│   ├── validators.ts
│   └── utils.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── public/
└── types/
```

## Təhlükəsizlik

- HTTPS tətbiq edilmiş
- Password hashing (bcrypt)
- Secure authentication
- Server-side validation
- CSRF qorunması
- XSS qorunması
- SQL injection qorunması
- Secure cookies
- Input sanitization
- Rate limiting

## Məlumat Mənbələri

Təhsil müəssisələri məlumatları:
- https://edu.gov.az/umumitehsil-muessiselerinin-siyahisi
- https://edu.gov.az/az/secondary-special-education/orta-ixtisas-tehsili-muessiselerinin-siyahisi
- https://vet.edu.gov.az/educationInstitutions

## Lisenziya

Bütün hüquqlar qorunur.

## Əlaqə

Layihə ilə bağlı suallar üçün: actat2008@gmail.com

---

**Hazırlanma tarixi**: 2026-08-29
**Status**: Inkişafda
