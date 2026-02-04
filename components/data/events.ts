import { 
  Bug, Palette, BrainCircuit, Network, Image, 
  Smile, Gamepad2, Briefcase 
} from 'lucide-react';
import { IMAGES } from '../assets/images';

export const EVENTS_LIST = [
  { 
    id: 'bug', 
    title: "Bug Hunt", 
    category: "Technical",
    icon: Bug, 
    color: "text-red-400", 
    border: "group-hover:border-red-500", 
    shadow: "group-hover:shadow-red-500/50", 
    desc: "Identify and fix critical bugs in given programs under time pressure.",
    banner: IMAGES.BANNERS.BUG_HUNT,
    fullDesc: "Step into a fast-paced debugging arena where participants must analyze, detect, and resolve errors in provided code within time limit. Accuracy, logical thinking, and speed will determine your rank on the leaderboard. The more bugs you eliminate, the higher you score.",
    minMembers: 1,
    maxMembers: 2,
    timing: "10:30 AM - 11:30 AM",
    rulebook: "/assets/rulebooks/bug_hunt.pdf",
    contact: { phone: "+919943086228", whatsapp: "+919943086228" },
    npc: { 
      name: "Mr. Jaaveed", 
      role: "Event Head", 
      avatar: IMAGES.NPCS.JAAVEED, 
      dialogue: "The system is unstable, Agent. Find the flaws, patch the code, and restore control before time runs out." 
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
    rulebook: "/assets/rulebooks/ui_ux.pdf",
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
    desc: "Test your knowledge of legacy and quantum systems.",
    banner: IMAGES.BANNERS.TECH_QUIZ,
    fullDesc: "A gauntlet of trivia spanning from the first transistor to the latest quantum processors. Only the most knowledgeable survive.",
    minMembers: 2,
    maxMembers: 2,
    timing: "11:30 AM - 12:30 PM",
    rulebook: "/assets/rulebooks/tech_quiz.pdf",
    contact: { phone: "", whatsapp: "" },
    npc: { 
      name: "Ms. Fowzeeya", 
      role: "Event Head", 
      avatar: IMAGES.NPCS.FOWZEEYA, 
      dialogue: "Query initiated. Validating intelligence quotient. Prepare for data extraction." 
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
    desc: "Solve cyber-security and networking clues in a fast-paced technical crossword.",
    banner: IMAGES.BANNERS.NETIQ,
    fullDesc: "Put your networking knowledge and cyber-security awareness to the test in this fun yet challenging crossword battle. Decode clues related to protocols, attacks, tools, and security concepts within the time limit. Speed, accuracy, and technical depth will determine the winners.",
    minMembers: 2,
    maxMembers: 2,
    timing: "01:30 PM - 02:30 PM",
    rulebook: "/assets/rulebooks/netiq.pdf",
    contact: { phone: "+919360331266", whatsapp: "919360331266" },
    npc: { 
      name: "Mr. Madhusudan", 
      role: "Event Head", 
      avatar: IMAGES.NPCS.MADHUSUDAN, 
      dialogue: "The grid is encrypted. Decode the clues, reconnect the network, and restore the signal before time expires."
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
    desc: "Create impactful posters that communicate powerful ideas visually.",
    banner: IMAGES.BANNERS.POSTER,
    fullDesc: "Showcase your creativity and presentation skills by designing an engaging and meaningful poster. Participants must effectively convey their ideas through visuals, layout, and message clarity within the given time. Strong concepts and impactful designs score higher.",
    minMembers: 1,
    maxMembers: 2,
    timing: "10:30 AM - 11:30 AM",
    rulebook: "/assets/rulebooks/poster_making.pdf",
    contact: { phone: "+919655650184", whatsapp: "919655650184" },
    npc: { 
      name: "Mr. Gokulnath", 
      role: "Event Head", 
      avatar: IMAGES.NPCS.GOKULNATH, 
      dialogue: "Your message is your power. Design with purpose, speak through visuals, and make it impossible to ignore" 
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
    desc: "Create a unique and hilarious meme from the given theme.",
    banner: IMAGES.BANNERS.MEME,
    fullDesc: "Put your creativity and humor to the test by designing an original meme based on the provided input. Clarity, wit, and relevance matter most. Offensive, inappropriate, or duplicated content will be rejected immediately. Make it funny, make it smart, and stand out.",
    minMembers: 2,
    maxMembers: 2,
    timing: "11:30 AM - 12:30 PM",
    rulebook: "/assets/rulebooks/meme_creation.pdf",
    contact: { phone: "", whatsapp: "" },
    npc: { 
      name: "Mr. Sugin", 
      role: "Event Head", 
      avatar: IMAGES.NPCS.SUGIN, 
      dialogue: "Make it clever. Make it viral. Only the sharpest humor survives. 😎🔥"
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
    desc: "4v4 Free Fire squad battles testing teamwork and reflexes.",
    banner: IMAGES.BANNERS.GAMING,
    fullDesc: "Step into the Gaming Zone for intense 4v4 Free Fire squad matches. Compete in fast-paced battles that challenge your coordination, strategy, and combat skills. Work as a team, dominate the arena, and prove your squad is unstoppable.",
    minMembers: 4,
    maxMembers: 4,
    timing: "10:00 AM Onwards",
    rulebook: "/assets/rulebooks/gaming_zone.pdf",
    contact: { phone: "+916383142810", whatsapp: "916383142810" },
    npc: { 
      name: "Mr. Viknesh", 
      role: "Event Head", 
      avatar: IMAGES.NPCS.VIKNESH, 
      dialogue: "Squad up. Strategy ready. Victory belongs to the team that fights together." 
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
    rulebook: "/assets/rulebooks/corporate_walk.pdf",
    contact: { phone: "", whatsapp: "" },
    npc: { 
      name: "Mr. Antony", 
      role: "Event Head", 
      avatar: IMAGES.NPCS.ANTONY, 
      dialogue: "Time is money. Impress me in the next 30 seconds, or get out of my office." 
    }
  },
];