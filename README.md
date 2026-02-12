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
- **Live Registration System**:
  - **Real-time Database**: Forms submit directly to a secure Google Sheet backend via Google Apps Script.
  - **Smart Validation**: 
    - Prevents duplicate emails and phone numbers per event.
    - Enforces unique Team Names (while allowing generic names for solo events).
    - Auto-formatting (Capitalization, Upper-case Course names).
  - **Dynamic Forms**: Adapts UI based on event type (Solo vs. Team).
- **Cyberpunk UI/UX**:
  - Custom magnetic cursor with lag effects.
  - Film grain overlays.
  - Neon glow typography and glassmorphism design.

## 📸 Screenshots

*(Ensure these files are present in your assets folder)*

| Welcome Screen | Command Deck |
|:---:|:---:|
| ![Welcome Screen](./components/assets/screenshots/welcome.jpeg) | ![Command Deck](./components/assets/screenshots/dashboard.jpeg) |

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation**: [GSAP (GreenSock Animation Platform)](https://gsap.com/)
- **Visuals**: [tsparticles](https://particles.js.org/) (Digital rain & starfields)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend / Database**: Google Apps Script & Google Sheets
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
    ├── data/
    │   └── events.ts           # Event data configuration (modify events here)
    ├── dashboard/
    │   └── DashboardSection.tsx# Main event browsing interface
    ├── events/
    │   ├── EventZone.tsx       # Individual event detail view
    │   └── EventListItem.tsx   # List item component
    ├── modals/
    │   ├── NPCModal.tsx        # Event Head interaction modal
    │   ├── RegistrationFormModal.tsx  # Form logic with API integration
    │   └── RegistrationConfirmModal.tsx
    ├── transitions/
    │   ├── ArrivalCutscene.tsx
    │   └── TravelSequence.tsx
    └── ui/
        └── CustomScrollbar.tsx