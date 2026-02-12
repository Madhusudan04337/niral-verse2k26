# Niral-Verse 2K26 🌐

**Niral-Verse 2K26** is a futuristic, immersive web portal designed for the annual tech fest conducted by the **Department of Computer Applications (BCA Sunstone)** at **Hindustan College of Arts & Science**.

This application features a high-fidelity Sci-Fi/Cyberpunk aesthetic, leveraging advanced animations and particle effects to create an engaging user experience for students registering for events.

## ✨ Key Features

- **Cinematic Entrance**: A particle-rich welcome screen with an orchestrated GSAP logo reveal.
- **Command Deck Hero**: A futuristic HUD (Heads-Up Display) interface featuring:
  - Digital Rain background effects.
  - Live Countdown timer to the event date.
  - Holographic glass panels with institution details.
- **Immersive Navigation**: "Warp speed" transition effects accompanied by sound design when navigating between sections.
- **Event Dashboard**:
  - Categorized browsing (Technical vs. Non-Technical).
  - Detailed "Event Protocols" (descriptions, rules, team size).
  - RPG-style "NPC" Event Heads with unique avatars and dialogue.
  - **General Guidelines**: dedicated modal for event-wide rules and protocols.
- **Live Registration System**:
  - **Real-time Database**: Forms submit directly to a secure Google Sheet backend via Google Apps Script.
  - **Secure Verification**: Integration with **EmailJS** for OTP-based email validation.
  - **Instant Confirmation**: Automated HTML email dispatch containing team details, schedule, and Google Maps location upon successful registration.
  - **Smart Validation**: 
    - Prevents duplicate emails and phone numbers per event.
    - Enforces unique Team Names (while allowing generic names for solo events).
    - Auto-formatting (Capitalization, Upper-case Course names).
  - **Dynamic Forms**: Adapts UI based on event type (Solo vs. Team).
- **Cyberpunk UI/UX**:
  - Custom magnetic cursor with lag effects.
  - Film grain overlays.
  - Neon glow typography and glassmorphism design.

## 📸 Interface Gallery

*(Ensure these files are present in your `/assets/screenshots/` folder)*

### 🌌 Core Experience
| **1. Welcome Screen** | **2. Command Deck (HUD)** | **3. Category Selection** |
|:---:|:---:|:---:|
| ![Welcome Screen](./assets/screenshots/welcome.png) | ![Command Deck](./assets/screenshots/command-deck.png) | ![Categories](./assets/screenshots/categories.png) |
| *Cinematic Entry* | *Main Hub & Countdown* | *Domain Selection* |

### 🚀 Exploration Flow
| **4. Protocol List** | **5. Travel Sequence** | **6. Mission Brief** |
|:---:|:---:|:---:|
| ![Event List](./assets/screenshots/event-list.png) | ![Loading](./assets/screenshots/travel-loading.png) | ![Event Details](./assets/screenshots/event-details.png) |
| *Browsing Events* | *Hyperspace Transition* | *Detailed Event View* |

### 🔐 Secure Registration
| **7. OTP Verification** | **8. Email Confirmation** |
|:---:|:---:|
| ![OTP](./assets/screenshots/otp-verify.png) | ![Email](./assets/screenshots/email-success.png) |
| *EmailJS OTP Validation* | *Automated Booking Ticket* |

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation**: [GSAP (GreenSock Animation Platform)](https://gsap.com/)
- **Visuals**: [tsparticles](https://particles.js.org/) (Digital rain & starfields)
- **Integrations**: [EmailJS](https://www.emailjs.com/) (Transactional Emails & OTP)
- **Backend / Database**: Google Apps Script & Google Sheets
- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: Orbitron & Share Tech Mono (Google Fonts)

## 📂 Project Structure

```text
/
├── index.html                  # Entry point, CDN imports, Tailwind Config
├── index.tsx                   # React Root mount
├── App.tsx                     # Main Application Layout
├── metadata.json               # Project metadata
└── components/
    ├── WelcomeScreen.tsx       # Initial intro with logos & strategic alliance bar
    ├── CommandDeckHero.tsx     # Main HUD landing page
    ├── MainContent.tsx         # Logic for switching between views
    ├── ParticlesBackground.tsx # tsparticles configuration
    ├── UIEffects.tsx           # Custom cursor and grain overlay
    ├── assets/
    │   └── images.ts           # Centralized image asset configuration
    ├── data/
    │   └── events.ts           # Event data configuration (modify events here)
    ├── dashboard/
    │   └── DashboardSection.tsx# Main event browsing interface
    ├── events/
    │   ├── EventZone.tsx       # Individual event detail view
    │   └── EventListItem.tsx   # List item component
    ├── modals/
    │   ├── GeneralGuidelinesModal.tsx # Event-wide rules modal
    │   ├── NPCModal.tsx        # Event Head interaction modal
    │   ├── RegistrationFormModal.tsx  # Form logic with API integration
    │   └── RegistrationConfirmModal.tsx
    ├── transitions/
    │   ├── ArrivalCutscene.tsx
    │   └── TravelSequence.tsx
    └── ui/
        └── CustomScrollbar.tsx
```

## 🧠 Architecture Overview

- **State Management**: `MainContent.tsx` acts as the central router, orchestrating the transition between the Command Deck, Cutscenes, and the Dashboard. It utilizes React State alongside Session Storage to persist the user's location during reloads.
- **Data Driven**: All event protocols are centralized in `components/data/events.ts`. The UI components (`EventListItem`, `EventZone`, `NPCModal`) are agnostic and render dynamically based on this config file, allowing for easy updates to rules, images, and text.
- **Component Isolation**: 
  - **Modals**: Implemented as conditional overlays within the `DashboardSection` to ensure they sit above the 3D-transform layers.
  - **Effects**: Particle engines and Grain overlays are isolated in their own components to prevent re-render performance hits on the main UI.

## ⚡ Performance Optimizations

Given the heavy use of animations, several strategies are employed:
- **GSAP Context**: All animations use `gsap.context()` for proper cleanup in React `useEffect` hooks to prevent memory leaks.
- **Particle Management**: `tsparticles` is configured with `detectRetina: false` and capped particle counts to maintain 60FPS on standard devices.
- **Lazy Rendering**: The application uses conditional rendering to only mount heavy 3D dashboard components when the user actually enters the simulation, keeping the initial load light.

## 🔐 Configuration Requirements

- **Desktop First**: The interface is heavily optimized for mouse interaction (hover effects, custom cursors). While responsive, the full immersive experience is best viewed on a desktop/laptop.
- **Environment Variables**: To enable the live registration features fully, valid credentials (`SERVICE_ID`, `TEMPLATE_ID`, `PUBLIC_KEY`) must be configured for EmailJS and the Google Apps Script Web App URL must be set.

## 🚀 Usage

This project utilizes **ES Modules** via CDN imports (`esm.sh`) defined in the `index.html` import map. This allows the application to run directly in modern browsers without a complex build step.

### Running Locally

1.  **Clone the repository** (or download the files).
2.  **Serve the directory** using any static file server.
    *   *Using Python:* `python3 -m http.server 8000`
    *   *Using Node:* `npx serve .`
    *   *VS Code:* Use the "Live Server" extension.
3.  Open `http://localhost:8000` in your browser.

## 🏆 Credits

**Conducted By:**
Department of Computer Applications (BCA Sunstone)
Hindustan College of Arts & Science, Chennai.

---
*Optimized for Desktop Interfaces*