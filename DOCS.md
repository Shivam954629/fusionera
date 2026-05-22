# Fusion The Era — System Documentation

Complete reference for all flows, processes, and admin operations.

---

## 1. Website Pages

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Hero, countdown, exhibitor marquee, video, comments, gallery preview |
| About | `/about` | Event overview and objectives |
| Exhibitors | `/exhibitors` | List of confirmed exhibitors |
| Gallery | `/gallery` | Photo gallery with auto-polling |
| Videos | `/videos` | Video library (YouTube embeds + local MP4) |
| Podcasts | `/podcasts` | Podcast/interview listings |
| Contact | `/contact` | Contact details (Delhi & Mumbai offices) |
| Visitor Registration | `/visitor-registration` | Multi-step visitor sign-up form |
| Exhibitor Registration | `/exhibitors-registration` | Exhibitor enquiry form |
| Visitor Login | `/visitor-login` | Visitor portal login (reg no + password) |
| Admin | `/admin` | Admin dashboard (JWT-protected) |

---

## 2. Visitor Registration Flow

### Step 1 — Select Type
- Visitor chooses **Indian Visitor** or **International Visitor**.
- Indian visitors enter a 10-digit Indian mobile number; OTP is sent via SMS.
- International visitors enter their country code + number; OTP is delivered via email instead of SMS.

### Step 2 — OTP Verification
- **Indian**: 6-digit OTP sent to mobile via SMS API.
- **International**: 6-digit OTP sent to the visitor's email.
- A visitor record is created in the `visitors` table with `otp_verified = FALSE`.
- On successful OTP entry, `otp_verified` is set to `TRUE` and a `visitorId` session is stored.

### Step 3 — Personal Details
Visitor fills out:
- Title, First Name, Middle Name, Last Name
- Designation, Company
- Primary mobile, Secondary mobile (optional)
- Primary email, Secondary email (optional)
- Address Line 1 & 2, City, State, Pincode, Country

All fields are saved to the `visitors` table via `POST /api/registration/save`.

### Step 4 — Business Details
Visitor fills out:
- Nature of Business
- Annual Turnover
- Annual Buying (estimated purchase volume)
- Product Interests (multi-select)
- Visit Purpose
- How did you hear about us
- Brands Interested
- Additional Notes

Saved to `visitors` table via `POST /api/registration/save`.

### Step 5 — Photo & Business Card Upload
- Visitor uploads their photo (face photo).
- Optional: Upload front and back of business card.
- Uploads saved to the `visitors` table as `photo_url`, `business_card_front`, `business_card_back`.

### Step 6 — Complete (QR Code Generation)
- `POST /api/registration/submit` is called with the `visitorId`.
- Server generates a **unique Registration Number** (format: `FE<year><5-digit random>`, e.g. `FE202612345`).
  - Up to 5 retry attempts to ensure uniqueness.
- Server generates a **password** (8 characters, alphanumeric).
- Server generates a **QR Code** (base64 PNG) encoding: `{ regNo, phone, name }`.
- All three are saved to the `visitors` row; `registration_complete` set to `TRUE`.
- **Indian visitors**: QR code is displayed directly on screen. Visitor screenshots or downloads it.
- **International visitors (with email)**: Entry pass email sent with QR code image, reg no, and password.
- Admin notification email sent to `info@fusiontheera.com` and `jasvinder.chaudhary@fusiontheera.com`.

### Gate Entry (using QR Code)
- At the venue entrance, the gate operator opens the **Admin Scanner** page.
- The QR code is scanned using the device camera.
- The scanner calls `POST /api/admin/mark-entry` with the decoded `regNo`.
- Server checks: visitor exists, registration is complete, visitor is not blocked.
- An entry row is inserted into `visitor_entries` with a timestamp (IST timezone).
- The system tracks how many times a visitor has entered **today** (IST date).
- Response shows entry count so staff know if it is a repeat entry.

---

## 3. Exhibitor Registration Flow

### Step 1 — Intent Declaration
- Exhibitor visits `/exhibitors-registration`.
- They see a form asking about their company and product category.
- If they have exhibited at similar trade shows before, they can click a dedicated button to indicate that.

### Step 2 — Form Submission
- Exhibitor fills: Company name, contact person, mobile, email, product type, stall size preference, and any message.
- Form submits to `POST /api/visitors` (shared endpoint).
- Admin receives an email notification at `info@fusiontheera.com` and `jasvinder.chaudhary@fusiontheera.com`.

### Step 3 — Admin Follow-up
- Exhibitors do **not** receive a QR code or registration number.
- The Fusion The Era team contacts the exhibitor directly by phone/email.
- Stall allocation, pricing, and agreements are handled offline.

---

## 4. Admin Panel

**URL:** `/admin`  
**Login:** Username + password (bcrypt hashed, stored in `admins` table).  
**Session:** JWT token stored in an httpOnly cookie, valid for 8 hours.

### Dashboard Features

| Feature | Description |
|---------|-------------|
| **Visitor List** | Table of all registered visitors with search/filter. Shows reg no, name, company, phone, email, entry count. |
| **Block / Unblock** | Toggle `is_blocked` on any visitor. Blocked visitors are denied entry at the gate. |
| **QR Scanner** | Camera-based QR scanner. Scan a visitor's QR, server verifies and records entry. |
| **Manual Entry** | Enter a reg no manually if QR scan fails. |
| **Entry Log** | View all gate entry records with timestamps (IST). |
| **Visitor Details** | Click any visitor to see full profile: photo, business card, all form fields. |
| **Exhibitor Enquiries** | View all exhibitor registration submissions. |
| **Gallery Management** | Upload, publish/unpublish, reorder gallery photos. |
| **Video Management** | Add YouTube video URLs or upload local MP4 videos; publish/unpublish. |
| **Podcast Management** | Add podcast entries; publish/unpublish. |
| **Site Settings** | Update contact details (Delhi & Mumbai offices), logo URL, event dates and venue. |
| **Create Admin** | Add new admin accounts (super-admin only). |

---

## 5. Database Tables

| Table | Purpose |
|-------|---------|
| `visitors` | All visitor records — personal info, business info, reg no, QR code, password hash, OTP status |
| `admins` | Admin accounts — username and bcrypt password hash |
| `visitor_entries` | Gate entry log — one row per entry per visitor |
| `otps` | OTP codes for phone and email verification (short-lived) |
| `site_settings` | Key-value store for contact details, logo, event date/venue |

---

## 6. Email Notifications

| Trigger | Recipients | Content |
|---------|-----------|---------|
| New visitor enquiry / walk-in OTP start | `info@fusiontheera.com`, `jasvinder.chaudhary@fusiontheera.com` | Basic visitor info |
| Registration complete | `info@fusiontheera.com`, `jasvinder.chaudhary@fusiontheera.com` | Visitor name, reg no, company, phone, email |
| Registration complete (international visitor with email) | Visitor's email | Full entry pass: QR code image, reg no, password, event details |
| Exhibitor enquiry submission | `info@fusiontheera.com`, `jasvinder.chaudhary@fusiontheera.com` | Exhibitor details |

All admin emails are fire-and-forget — an email delivery failure does **not** block or fail the registration.

---

## 7. Contact Details (Editable via Admin → Site Settings)

| Office | Person | Mobile | Email |
|--------|--------|--------|-------|
| Delhi | Mr. Pawan Singh | +91 93157 00590 | pawan.singh@fusiontheera.com |
| Mumbai | Mr. Jasvinder Singh Chaudhary | +91 85888 92885 | jasvinder.chaudhary@fusiontheera.com |

WhatsApp float and footer link on the website use **Jasvinder's number** (+91 85888 92885).

---

## 8. Event Details

- **Name:** Fusion The Era 2026 — Perfect Business Platform
- **Dates:** July 4–6, 2026
- **Venue:** Bharat Mandapam, Pragati Maidan, New Delhi
- **Entry for Visitors:** FREE

---

*Last updated: May 2026*
