import { 
  Bug, Palette, BrainCircuit, Network, Image, 
  Smile, Gamepad2, Briefcase 
} from 'lucide-react';
import { IMAGES } from '../assets/images';
import bughunt from '../assets/rules/bughunt.png';
import gamingzone from '../assets/rules/gamingzone.jpeg';
import ui_ux from '../assets/rules/ui_ux.pdf';
import poster from '../assets/rules/poster.png';

export const EVENTS_LIST = [
  { 
    id: 'bug', 
    title: "Bug Hunt", 
    category: "Technical",
    icon: Bug, 
    color: "text-red-400", 
    border: "group-hover:border-red-500", 
    shadow: "group-hover:shadow-red-500/50", 
    desc: "Identify and neutralize system vulnerabilities.",
    banner: IMAGES.BANNERS.BUG_HUNT,
    fullDesc: "Dive into the mainframe and purge critical system errors. Competitors must identify security flaws in a simulated banking infrastructure within 60 minutes.",
    minMembers: 1,
    maxMembers: 2,
    timing: "10:30 AM - 11:30 AM",
    rulebook: bughunt,
    contact: { phone: "+919943086228", whatsapp: "+919943086228" },
    npc: { 
      name: "Mr. Jaaveed", 
      role: "Event Head", 
      avatar: IMAGES.NPCS.JAAVEED, 
      dialogue: "The code is bleeding, Agent. I need you to patch those vulnerabilities before the system crashes." 
    }
  },
  { 
    id: 'uiux', 
    title: "UI/UX Design", 
    category: "Technical",
    icon: Palette, 
    color: "text-pink-400", 
    border: "group-hover:border-pink-500", 
    shadow: "group-hover:shadow-pink-500/50", 
    desc: "Architect the next-gen neural interfaces.",
    banner: IMAGES.BANNERS.UI_UX,
    fullDesc: "Redesign the interface for the colony's life support systems. Aesthetics meet functionality in this high-stakes design challenge.",
    minMembers: 1,
    maxMembers: 2,
    timing: "10:00 AM - 12:00 PM",
    rulebook: ui_ux,
    contact: { phone: "+917010974603", whatsapp: "+917010974603" },
    npc: { 
      name: "Mr. Sarath", 
      role: "Event Head", 
      avatar: IMAGES.NPCS.SARATH, 
      dialogue: "Form follows function, but beauty inspires hope. Show me a design that can save the world." 
    }
  },
  { 
    id: 'quiz', 
    title: "Tech Quiz", 
    category: "Technical",
    icon: BrainCircuit, 
    color: "text-yellow-400", 
    border: "group-hover:border-yellow-500", 
    shadow: "group-hover:shadow-yellow-500/50", 
    desc: "Test your knowledge, logic, and speed in a fun quiz battle.",
    banner: IMAGES.BANNERS.TECH_QUIZ,
    fullDesc: "A competitive quiz event featuring multiple engaging rounds designed to challenge your knowledge, reasoning, and quick thinking. Participants must think smart, respond fast, and stay sharp to score higher and lead the scoreboard.",
    minMembers: 2,
    maxMembers: 2,
    timing: "11:30 AM - 12:30 PM",
    rulebook: "/assets/rules/tech_quiz.pdf",
    contact: { phone: "", whatsapp: "" },
    npc: { 
      name: "Ms. Fowzeeya", 
      role: "Event Head", 
      avatar: IMAGES.NPCS.FOWZEEYA, 
      dialogue: "Questions incoming. Stay sharp, think fast, and prove your mind is faster than the clock. 🎯🔥"
    }
  },
  { 
    id: 'netiq', 
    title: "NetIQ Challenge", 
    category: "Technical",
    icon: Network, 
    color: "text-blue-400", 
    border: "group-hover:border-blue-500", 
    shadow: "group-hover:shadow-blue-500/50", 
    desc: "Optimize data flow across the global grid.",
    banner: IMAGES.BANNERS.NETIQ,
    fullDesc: "The network is congested. You must re-route packets and optimize protocols to restore global communications.",
    minMembers: 2,
    maxMembers: 2,
    timing: "01:30 PM - 02:30 PM",
    rulebook: "/assets/rules/netiq.pdf",
    contact: { phone: "+919360331266", whatsapp: "919360331266" },
    npc: { 
      name: "Mr. Madhusudan", 
      role: "Event Head", 
      avatar: IMAGES.NPCS.MADHUSUDAN, 
      dialogue: "Signal strength is at 15%. I need you to boost the grid nodes manually. Hurry." 
    }
  },
  { 
    id: 'poster', 
    title: "Poster Presentation", 
    category: "Non-Technical",
    icon: Image, 
    color: "text-blue-400", 
    border: "group-hover:border-blue-500", 
    shadow: "group-hover:shadow-blue-500/50", 
    desc: "Design propaganda for the resistance.",
    banner: IMAGES.BANNERS.POSTER,
    fullDesc: "Create visual assets to inspire the populace. The message is as powerful as the weapon.",
    minMembers: 1,
    maxMembers: 2,
    timing: "10:30 AM - 11:30 AM",
    rulebook: poster,
    contact: { phone: "+919655650184", whatsapp: "919655650184" },
    npc: { 
      name: "Mr. Gokulnath", 
      role: "Event Head", 
      avatar: IMAGES.NPCS.GOKULNATH, 
      dialogue: "The streets are silent. Wake them up with your art. Make it loud, make it bold." 
    }
  },
  { 
    id: 'meme', 
    title: "Meme Creation", 
    category: "Non-Technical",
    icon: Smile, 
    color: "text-green-400", 
    border: "group-hover:border-green-500", 
    shadow: "group-hover:shadow-green-500/50", 
    desc: "Engage in viral memetic warfare.",
    banner: IMAGES.BANNERS.MEME,
    fullDesc: "Construct viral payloads to disrupt enemy morale. Humor is the ultimate trojan horse.",
    minMembers: 2,
    maxMembers: 2,
    timing: "11:30 AM - 12:30 PM",
    rulebook: "/assets/rules/meme_creation.pdf",
    contact: { phone: "", whatsapp: "" },
    npc: { 
      name: "Mr. Sugin", 
      role: "Event Head", 
      avatar: IMAGES.NPCS.SUGIN, 
      dialogue: "Top kek. Upload the payload. If they aren't laughing, we aren't winning." 
    }
  },
  { 
    id: 'game', 
    title: "Gaming Zone", 
    category: "Non-Technical",
    icon: Gamepad2, 
    color: "text-cyan-400", 
    border: "group-hover:border-cyan-500", 
    shadow: "group-hover:shadow-cyan-500/50", 
    desc: "Combat simulation and tactical training.",
    banner: IMAGES.BANNERS.GAMING,
    fullDesc: "Enter the arena. FPS, MOBA, and Battle Royale simulations to test your reflexes and strategic thinking.",
    minMembers: 4,
    maxMembers: 4,
    timing: "10:00 AM Onwards",
    rulebook: gamingzone,
    contact: { phone: "+916383142810", whatsapp: "916383142810" },
    npc: { 
      name: "Mr. Viknesh", 
      role: "Event Head", 
      avatar: IMAGES.NPCS.VIKNESH, 
      dialogue: "1v1 me, recruit. Let's see if your aim is as good as your talk." 
    }
  },
  { 
    id: 'corp', 
    title: "Corporate Walk", 
    category: "Non-Technical",
    icon: Briefcase, 
    color: "text-orange-400", 
    border: "group-hover:border-orange-500", 
    shadow: "group-hover:shadow-orange-500/50", 
    desc: "Navigate the political labyrinth of the corp.",
    banner: IMAGES.BANNERS.CORP_WALK,
    fullDesc: "Dress the part, walk the walk. Navigate the boardroom politics and secure the funding for your sector.",
    minMembers: 6,
    maxMembers: 6,
    timing: "02:00 PM - 03:00 PM",
    rulebook: "/assets/rules/corporate_walk.pdf",
    contact: { phone: "", whatsapp: "" },
    npc: { 
      name: "Mr. Antony", 
      role: "Event Head", 
      avatar: IMAGES.NPCS.ANTONY, 
      dialogue: "Time is money. Impress me in the next 30 seconds, or get out of my office." 
    }
  },
];