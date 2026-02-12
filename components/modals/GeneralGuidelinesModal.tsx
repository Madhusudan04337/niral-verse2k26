import React from 'react';
import { 
  X, IdCard, Clock, Lock, Smartphone, ShieldAlert, 
  UserCheck, Flag, Phone, Gavel, FileText 
} from 'lucide-react';

interface GeneralGuidelinesModalProps {
  onClose: () => void;
}

export const GeneralGuidelinesModal: React.FC<GeneralGuidelinesModalProps> = ({ onClose }) => {
  const guidelines = [
    {
      icon: <IdCard className="text-cyan-400" size={20} />,
      title: "ID & Registration",
      text: "Participants must carry a valid college ID card and complete registration before the event. On-spot registration will be available."
    },
    {
      icon: <Clock className="text-orange-400" size={20} />,
      title: "Reporting & Schedule",
      text: "Reporting time is 9:00 AM. The Inauguration Ceremony will begin at 9:30 AM at Newton Hall, and all participants must be present. Events will commence at 10:00 AM immediately after the inauguration. Late entry is not permitted."
    },
    {
      icon: <Lock className="text-red-400" size={20} />,
      title: "Restricted Access",
      text: "Only registered participants are allowed inside the venue. Audience entry is strictly prohibited."
    },
    {
      icon: <Smartphone className="text-blue-400" size={20} />,
      title: "Prohibited Devices",
      text: "Mobile phones, smart devices, and unfair means are strictly prohibited unless permitted by the Event Head."
    },
    {
      icon: <ShieldAlert className="text-yellow-400" size={20} />,
      title: "Code of Conduct",
      text: "Participants must maintain discipline, professionalism, and proper decorum. Any malpractice or misconduct will lead to immediate disqualification."
    },
    {
      icon: <Flag className="text-purple-400" size={20} />,
      title: "Valedictory Attendance",
      text: "Participants must remain until the valedictory program concludes."
    },
    {
      icon: <Phone className="text-teal-400" size={20} />,
      title: "Support Channels",
      text: "For queries, contact the staff or student coordinators (details available on the official website)."
    },
    {
      icon: <Gavel className="text-pink-400" size={20} />,
      title: "Jury Discretion",
      text: "The decision of the judges and organizing committee will be final and binding. The committee reserves the right to modify the event format if necessary."
    }
  ];

  return (
    <div className="fixed inset-0 z-[700] flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      
      <div className="glass-panel relative w-full max-w-2xl bg-[#0a0a0a] rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.15)] border border-cyan-500/30 flex flex-col max-h-[85vh]">
         
         {/* Decorative Header Line */}
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />

         {/* Header */}
         <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5 shrink-0">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center">
                  <FileText className="text-cyan-400" size={20} />
               </div>
               <div>
                  <h3 className="text-xl font-orbitron font-bold text-white tracking-wider">GENERAL GUIDELINES</h3>
                  <p className="text-cyan-500 text-[10px] font-mono uppercase tracking-widest">Mandatory Compliance Required</p>
               </div>
            </div>
            <button 
               onClick={onClose} 
               className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
               <X size={20} />
            </button>
         </div>

         {/* Content */}
         <div className="p-6 overflow-y-auto custom-scrollbar space-y-4 bg-black/20">
            {guidelines.map((rule, index) => (
               <div 
                  key={index} 
                  className="group flex gap-4 p-4 rounded-lg bg-white/5 border border-white/5 hover:border-cyan-500/30 hover:bg-white/10 transition-all duration-300"
               >
                  <div className="shrink-0 mt-1">
                     <div className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center border border-white/10 group-hover:border-cyan-500/50 transition-colors">
                        {rule.icon}
                     </div>
                  </div>
                  <div>
                     <h4 className="text-white font-bold font-orbitron text-sm mb-1 group-hover:text-cyan-400 transition-colors">
                        {rule.title}
                     </h4>
                     <p className="text-gray-400 text-sm font-mono leading-relaxed">
                        {rule.text}
                     </p>
                  </div>
               </div>
            ))}
         </div>

         {/* Footer */}
         <div className="p-4 border-t border-white/10 bg-black/40 text-center shrink-0">
            <button 
               onClick={onClose}
               className="px-8 py-2 bg-cyan-600/20 hover:bg-cyan-600/40 text-cyan-400 border border-cyan-600/50 rounded font-mono text-sm uppercase tracking-wider transition-all"
            >
               I Acknowledge
            </button>
         </div>
      </div>
    </div>
  );
};