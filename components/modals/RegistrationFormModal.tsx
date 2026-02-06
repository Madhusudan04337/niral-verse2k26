import React, { useState, useEffect } from 'react';
import { 
  Target, X, Users2, Building, User, Mail, Phone, BookOpen, GraduationCap, 
  Loader2, Zap, CheckCircle2, AlertCircle, ShieldCheck, Lock, RefreshCw, Timer
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import { EVENTS_LIST } from '../data/events';

interface MemberData {
  name: string;
  email: string;
  phone: string;
  course: string;
  year: string;
}

// REPLACE WITH YOUR DEPLOYED WEB APP URL
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwYD8LKwtndNDsfOQCbm7zo2VYmE6VALIEvparxmbGc_f2q2lL6ARt1swgGYiA6U3jfAw/exec";

// EMAILJS CONFIG
const EMAILJS_SERVICE_ID = "service_0r5787t";
const EMAILJS_OTP_TEMPLATE_ID = "template_dl8fvcn";
const EMAILJS_REG_TEMPLATE_ID = "template_0f0sytn";
const EMAILJS_PUBLIC_KEY = "urCXzIu8mEl1xXFu1";

export const RegistrationFormModal: React.FC<{
   event: typeof EVENTS_LIST[0];
   onClose: () => void;
}> = ({ event, onClose }) => {
   // UI States
   const [currentStep, setCurrentStep] = useState<'form' | 'otp' | 'success'>('form');
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [errors, setErrors] = useState<Record<string, string>>({});
   
   // OTP State
   const [generatedOtp, setGeneratedOtp] = useState('');
   const [userOtp, setUserOtp] = useState('');
   const [otpError, setOtpError] = useState('');
   const [timer, setTimer] = useState(0);

   // Form State
   const [teamName, setTeamName] = useState('');
   const [collegeName, setCollegeName] = useState('');
   
   // Initialize members with unique objects
   const [members, setMembers] = useState<MemberData[]>(() => 
      Array.from({ length: event.minMembers }, () => ({ 
         name: '', email: '', phone: '', course: '', year: '' 
      }))
   );

   const [participationMode, setParticipationMode] = useState<'solo' | 'duo'>(
      event.minMembers === 1 && event.maxMembers === 2 ? 'solo' : 'solo'
   );

   // Initialize EmailJS
   useEffect(() => {
       try {
           emailjs.init(EMAILJS_PUBLIC_KEY);
       } catch (e) {
           console.warn("EmailJS init warning:", e);
       }
   }, []);

   // Robust Timer Countdown Effect using setTimeout
   useEffect(() => {
      if (currentStep === 'otp' && timer > 0) {
         const timerId = setTimeout(() => {
            setTimer(prev => prev - 1);
         }, 1000);
         return () => clearTimeout(timerId);
      }
   }, [currentStep, timer]);

   useEffect(() => {
      if (event.minMembers !== event.maxMembers) {
         const targetSize = participationMode === 'solo' ? 1 : 2;
         if (members.length !== targetSize) {
            setMembers(prev => {
               const newMembers = [...prev];
               if (targetSize > prev.length) {
                  for (let i = prev.length; i < targetSize; i++) {
                     newMembers.push({ name: '', email: '', phone: '', course: '', year: '' });
                  }
               } else {
                  return newMembers.slice(0, targetSize);
               }
               return newMembers;
            });
         }
      }
   }, [participationMode, event.minMembers, event.maxMembers, members.length]);

   const handleMemberChange = (index: number, field: keyof MemberData, value: string) => {
      const updatedMembers = [...members];
      updatedMembers[index] = { ...updatedMembers[index], [field]: value };
      setMembers(updatedMembers);
      
      // Clear specific error when user types
      if (errors[`members.${index}.${field}`]) {
         setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[`members.${index}.${field}`];
            return newErrors;
         });
      }
      if (field === 'name' && errors.teamName) {
         // optional UI cleanup logic
      }
   };

   const validateForm = (): boolean => {
      const newErrors: Record<string, string> = {};
      let isValid = true;
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[6-9]\d{9}$/;

      if (event.maxMembers > 1 && !teamName.trim()) {
         newErrors['teamName'] = 'Team Name is required';
         isValid = false;
      }
      if (!collegeName.trim()) {
         newErrors['collegeName'] = 'College Name is required';
         isValid = false;
      }

      const seenEmails = new Set<string>();
      const seenPhones = new Set<string>();

      members.forEach((member, index) => {
         if (!member.name.trim()) {
            newErrors[`members.${index}.name`] = 'Name is required';
            isValid = false;
         } else if (member.name.trim().length < 3) {
             newErrors[`members.${index}.name`] = 'Name must be at least 3 chars';
             isValid = false;
         }

         if (!member.email.trim()) {
            newErrors[`members.${index}.email`] = 'Email is required';
            isValid = false;
         } else if (!emailRegex.test(member.email)) {
            newErrors[`members.${index}.email`] = 'Invalid email format';
            isValid = false;
         } else if (seenEmails.has(member.email.toLowerCase())) {
            newErrors[`members.${index}.email`] = 'Duplicate email in team';
            isValid = false;
         } else {
            seenEmails.add(member.email.toLowerCase());
         }

         if (!member.phone.trim()) {
            newErrors[`members.${index}.phone`] = 'Phone is required';
            isValid = false;
         } else if (!phoneRegex.test(member.phone)) {
            newErrors[`members.${index}.phone`] = 'Invalid 10-digit mobile number';
            isValid = false;
         } else if (seenPhones.has(member.phone)) {
            newErrors[`members.${index}.phone`] = 'Duplicate phone in team';
            isValid = false;
         } else {
            seenPhones.add(member.phone);
         }

         if (!member.course.trim()) {
            newErrors[`members.${index}.course`] = 'Course is required';
            isValid = false;
         }
         if (!member.year) {
            newErrors[`members.${index}.year`] = 'Year is required';
            isValid = false;
         }
      });

      setErrors(newErrors);
      return isValid;
   };

   const generateAndSendOtp = async () => {
       const code = Math.floor(100000 + Math.random() * 900000).toString();
       setGeneratedOtp(code);
       
       console.log(`[DEV MODE] Generated OTP: ${code}`);

       const teamLeader = members[0];
       
       // Create a string listing other team members if they exist
       const otherMembers = members.length > 1 
           ? members.slice(1).map(m => m.name).join(', ') 
           : '';

       const emailParams = {
          to_name: teamLeader.name,
          to_email: teamLeader.email,
          otp: code,
          message: code,
          // Optional: Add team context to OTP email if needed by template
          team_context: otherMembers ? `Verifying for Team: ${otherMembers}` : '',
          event_name: event.title
       };
       
       console.log("Sending OTP with params:", emailParams);
       
       await emailjs.send(
           EMAILJS_SERVICE_ID,
           EMAILJS_OTP_TEMPLATE_ID,
           emailParams
       );

       setTimer(60); // Reset timer to 60 seconds
   };

   // STEP 1: Send OTP (Initial)
   const handleInitiateOtp = async (e: React.FormEvent) => {
      e.preventDefault();
      
      if (!validateForm()) {
         const firstErrorField = document.querySelector('.border-red-500');
         if (firstErrorField) {
            firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
         }
         return;
      }

      setIsSubmitting(true);

      try {
         await generateAndSendOtp();
         setCurrentStep('otp');
      } catch (error: any) {
         console.error("Failed to send OTP", error);
         
         const errorText = error?.text || error?.message || "Network Error";
         alert(`EMAIL FAILED (${errorText}).\n\nCHECK CONSOLE FOR OTP.`);
         setCurrentStep('otp');
      } finally {
         setIsSubmitting(false);
      }
   };

   // Resend Logic
   const handleResendOtp = async () => {
       if (timer > 0) return;
       setIsSubmitting(true);
       try {
           await generateAndSendOtp();
       } catch (error: any) {
           console.error("Failed to resend OTP", error);
           alert("Failed to resend email.");
       } finally {
           setIsSubmitting(false);
       }
   };

   // STEP 2: Verify OTP and Final Submit
   const handleVerifyAndSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      if (userOtp !== generatedOtp) {
         setOtpError("INVALID ACCESS CODE");
         return;
      }

      setIsSubmitting(true);
      
      const payload = {
        eventName: event.title,
        teamName: event.maxMembers > 1 ? teamName : "Solo/Duo", 
        college: collegeName,
        members: members
      };

      try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify(payload),
        });

        const result = await response.json();

        if (result.result === "success") {
           // --- SEND FINAL CONFIRMATION EMAIL ---
           try {
              const teamLeader = members[0];
              
              // Create formatted list of all members
              const membersListString = members.map((m, i) => 
                  `${i + 1}. ${m.name} - ${m.course} (Yr ${m.year})`
              ).join('\n');

              const emailParams = {
                 to_name: teamLeader.name,
                 to_email: teamLeader.email,
                 event_name: event.title,
                 team_name: event.maxMembers > 1 ? teamName : "Solo Participant",
                 members_list: membersListString,
                 college_name: collegeName
              };

              await emailjs.send(
                 EMAILJS_SERVICE_ID,
                 EMAILJS_REG_TEMPLATE_ID,
                 emailParams
              );
           } catch (emailErr) {
              console.warn("Failed to send confirmation email:", emailErr);
           }

           setCurrentStep('success');
        } else {
           if (result.errors && Array.isArray(result.errors)) {
               const backendErrors: Record<string, string> = {};
               result.errors.forEach((err: any) => {
                   backendErrors[err.field] = err.message;
               });
               setErrors(prev => ({...prev, ...backendErrors}));
               setCurrentStep('form');
           } else if (result.message) {
               alert("REGISTRATION FAILED:\n" + result.message);
               setCurrentStep('form');
           }
        }

      } catch (error) {
        console.error("Registration failed", error);
        alert("System Error: Unable to connect to mainframe.");
        setCurrentStep('form');
      } finally {
        setIsSubmitting(false);
      }
   };

   // SUCCESS VIEW
   if (currentStep === 'success') {
      return (
         <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 animate-in zoom-in-95 duration-200">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <div className="glass-panel relative w-full max-w-md bg-gray-900/80 rounded-xl p-8 text-center shadow-[0_0_50px_rgba(34,197,94,0.2)] border border-green-500/20">
               <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-400" />
               </div>
               <h3 className="text-2xl font-orbitron font-bold text-white mb-2">REGISTRATION COMPLETE</h3>
               <p className="text-gray-400 mb-6">
                  Registration successful. You have been added to the event list.
                  <br/>
                  <span className="text-xs text-cyan-400/70 mt-2 block">
                     Confirmation email sent to {members[0].email}
                  </span>
               </p>
               <button 
                  onClick={onClose}
                  className="px-8 py-3 bg-green-500 hover:bg-green-400 text-black font-bold rounded uppercase tracking-wider cursor-hover"
               >
                  CLOSE
               </button>
            </div>
         </div>
      );
   }

   // OTP VIEW
   if (currentStep === 'otp') {
      return (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 animate-in zoom-in-95 duration-200">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setCurrentStep('form')} />
            
            <div className="glass-panel relative w-full max-w-md bg-gray-900/90 rounded-xl p-8 text-center shadow-[0_0_50px_rgba(0,240,255,0.2)] border border-cyan-500/30">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-white to-cyan-500 animate-pulse" />
                
                <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-cyan-500/30">
                    <ShieldCheck className="w-8 h-8 text-cyan-400" />
                </div>
                
                <h3 className="text-2xl font-orbitron font-bold text-white mb-2 tracking-wide">SECURITY CHECK</h3>
                <p className="text-gray-400 text-sm font-mono mb-6">
                    A verification code has been sent to <br/>
                    <span className="text-cyan-400">{members[0].email}</span>.
                </p>

                <div className="mb-6 relative">
                    <input 
                        type="text" 
                        value={userOtp}
                        onChange={(e) => {
                            setUserOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 6));
                            setOtpError('');
                        }}
                        className={`w-full bg-black/50 border-2 rounded-lg py-3 text-center text-2xl font-mono tracking-[0.5em] text-white focus:outline-none transition-all ${otpError ? 'border-red-500 animate-pulse' : 'border-cyan-500/50 focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(0,240,255,0.2)]'}`}
                        placeholder="000000"
                        autoFocus
                    />
                    {otpError && <p className="text-red-400 text-xs font-mono mt-2 flex items-center justify-center gap-1"><AlertCircle size={12} /> {otpError}</p>}
                </div>
                
                <div className="flex items-center justify-between mb-6 bg-black/20 p-3 rounded border border-white/5">
                    <div className="flex items-center gap-2 text-sm font-mono text-gray-400">
                        <Timer size={16} className={timer > 0 ? "text-cyan-400 animate-pulse" : "text-gray-600"} />
                        <span className={timer > 0 ? "text-cyan-400 font-bold" : "text-gray-600"}>
                            {timer > 0 ? `EXPIRES IN ${String(timer).padStart(2, '0')}s` : "EXPIRED"}
                        </span>
                    </div>

                    <button
                        onClick={handleResendOtp}
                        disabled={timer > 0 || isSubmitting}
                        className={`flex items-center gap-2 text-xs font-mono transition-colors uppercase tracking-wider ${
                           timer > 0 ? 'text-gray-600 cursor-not-allowed opacity-50' : 'text-cyan-400 hover:text-white cursor-pointer hover:underline'
                        }`}
                    >
                       <RefreshCw size={12} className={isSubmitting ? "animate-spin" : ""} />
                       {isSubmitting ? "SENDING..." : "RESEND CODE"}
                    </button>
                </div>

                <button 
                    onClick={handleVerifyAndSubmit}
                    disabled={isSubmitting}
                    className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold font-orbitron uppercase tracking-widest rounded transition-all disabled:opacity-50 disabled:cursor-wait flex items-center justify-center space-x-2 cursor-hover mb-3 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                >
                    {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Lock size={18} />}
                    <span>{isSubmitting ? "VERIFYING..." : "AUTHENTICATE"}</span>
                </button>

                <button 
                    onClick={() => setCurrentStep('form')}
                    className="text-gray-500 hover:text-white text-xs font-mono underline cursor-hover"
                >
                    Incorrect Email? Return to Form
                </button>
            </div>
        </div>
      );
   }

   // FORM VIEW
   return (
      <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 animate-in zoom-in-95 duration-200">
         <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
         
         <div className="glass-panel relative w-full max-w-4xl bg-gray-900/90 rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] border border-white/10">
            {/* Header */}
            <div className="bg-white/5 backdrop-blur-md p-6 border-b border-white/10 flex justify-between items-center shrink-0">
               <div>
                  <h3 className="text-xl font-orbitron font-bold text-white flex items-center space-x-2">
                     <Target className="text-cyan-400" size={20} />
                     <span>Event Registration</span>
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                     <span className="text-xs text-cyan-500 font-mono bg-cyan-900/30 px-2 py-0.5 rounded border border-cyan-500/30">
                        Event: {event.title}
                     </span>
                     <span className="text-xs text-gray-500 font-mono">
                        Team Size: {event.minMembers === event.maxMembers ? `${event.minMembers} Member${event.minMembers > 1 ? 's' : ''}` : `${event.minMembers} - ${event.maxMembers} Members`}
                     </span>
                  </div>
               </div>
               <button onClick={onClose} className="text-gray-500 hover:text-white cursor-hover"><X size={20} /></button>
            </div>

            {/* Form */}
            <form onSubmit={handleInitiateOtp} className="flex-1 overflow-y-auto p-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Left Column: Team Details */}
                  <div className="space-y-6">
                     <h4 className="text-sm font-orbitron text-gray-400 border-b border-gray-800 pb-2 mb-4">Team Details</h4>
                     
                     {/* Participation Type Selection (Only for 1-2 member events) */}
                     {event.minMembers !== event.maxMembers && (
                        <div className="p-4 bg-white/5 rounded border border-dashed border-gray-700">
                           <label className="text-xs font-mono text-cyan-400 uppercase block mb-3">Select Participation Type</label>
                           <div className="flex space-x-4">
                              <label className={`flex-1 cursor-pointer p-3 rounded border text-center transition-all cursor-hover ${participationMode === 'solo' ? 'bg-cyan-900/40 border-cyan-500 text-white' : 'border-gray-700 text-gray-500 hover:border-gray-500'}`}>
                                 <input 
                                    type="radio" 
                                    name="mode" 
                                    className="hidden" 
                                    checked={participationMode === 'solo'} 
                                    onChange={() => setParticipationMode('solo')} 
                                 />
                                 <span className="font-bold text-sm">Individual</span>
                              </label>
                              <label className={`flex-1 cursor-pointer p-3 rounded border text-center transition-all cursor-hover ${participationMode === 'duo' ? 'bg-cyan-900/40 border-cyan-500 text-white' : 'border-gray-700 text-gray-500 hover:border-gray-500'}`}>
                                 <input 
                                    type="radio" 
                                    name="mode" 
                                    className="hidden" 
                                    checked={participationMode === 'duo'} 
                                    onChange={() => setParticipationMode('duo')} 
                                 />
                                 <span className="font-bold text-sm">Team (2 Members)</span>
                              </label>
                           </div>
                        </div>
                     )}

                     {/* Team Name (Required if maxMembers > 1) */}
                     {event.maxMembers > 1 && (
                        <div className="space-y-2 group">
                           <label className="text-xs font-mono text-cyan-400 uppercase flex justify-between">
                              Team Name
                              {errors.teamName && <span className="text-red-400 flex items-center gap-1 normal-case"><AlertCircle size={10} /> {errors.teamName}</span>}
                           </label>
                           <div className="relative">
                              <Users2 className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${errors.teamName ? 'text-red-500' : 'text-gray-500 group-focus-within:text-cyan-400'}`} size={18} />
                              <input 
                                 type="text" 
                                 value={teamName}
                                 onChange={(e) => {
                                    setTeamName(e.target.value);
                                    if(errors.teamName) setErrors(prev => { const n = {...prev}; delete n.teamName; return n; });
                                 }}
                                 className={`w-full bg-gray-900/50 border rounded p-3 pl-10 text-white focus:outline-none transition-all cursor-hover ${errors.teamName ? 'border-red-500 focus:border-red-500' : 'border-gray-700 focus:border-cyan-500 focus:shadow-[0_0_10px_rgba(0,240,255,0.2)]'}`}
                                 placeholder="e.g. Cyber Punks"
                              />
                           </div>
                        </div>
                     )}

                     {/* College Name (Single Input) */}
                     <div className="space-y-2 group">
                        <label className="text-xs font-mono text-cyan-400 uppercase flex justify-between">
                           College / Institution Name
                           {errors.collegeName && <span className="text-red-400 flex items-center gap-1 normal-case"><AlertCircle size={10} /> {errors.collegeName}</span>}
                        </label>
                        <div className="relative">
                           <Building className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${errors.collegeName ? 'text-red-500' : 'text-gray-500 group-focus-within:text-cyan-400'}`} size={18} />
                           <input 
                              type="text" 
                              value={collegeName}
                              onChange={(e) => {
                                 setCollegeName(e.target.value);
                                 if(errors.collegeName) setErrors(prev => { const n = {...prev}; delete n.collegeName; return n; });
                              }}
                              className={`w-full bg-gray-900/50 border rounded p-3 pl-10 text-white focus:outline-none transition-all cursor-hover ${errors.collegeName ? 'border-red-500 focus:border-red-500' : 'border-gray-700 focus:border-cyan-500 focus:shadow-[0_0_10px_rgba(0,240,255,0.2)]'}`}
                              placeholder="Institute of Technology"
                           />
                        </div>
                        <p className="text-[10px] text-gray-500 italic">* Applies to all team members.</p>
                     </div>
                  </div>

                  {/* Right Column: Member Details */}
                  <div className="space-y-6">
                     <h4 className="text-sm font-orbitron text-gray-400 border-b border-gray-800 pb-2 mb-4">Participant Details</h4>
                     
                     <div className="space-y-8 max-h-[50vh] overflow-y-auto pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                        {members.map((member, index) => (
                           <div key={index} className="bg-white/5 p-4 rounded border border-white/10 hover:border-cyan-500/30 transition-colors animate-in slide-in-from-right duration-300">
                              <h5 className="text-xs font-bold text-cyan-300 mb-3 uppercase tracking-wider flex justify-between">
                                 <span>{index === 0 ? "Team Leader Details" : `Participant ${index + 1}`}</span>
                              </h5>
                              
                              <div className="space-y-3">
                                 {/* Name & Email Row */}
                                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                       <div className="relative">
                                          <User className={`absolute left-3 top-3 ${errors[`members.${index}.name`] ? 'text-red-500' : 'text-gray-600'}`} size={14} />
                                          <input 
                                             type="text" 
                                             placeholder="Full Name"
                                             value={member.name}
                                             onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                                             className={`w-full bg-black/50 border rounded py-2 pl-9 text-sm text-white focus:outline-none cursor-hover ${errors[`members.${index}.name`] ? 'border-red-500 focus:border-red-500' : 'border-gray-700 focus:border-cyan-500'}`}
                                          />
                                       </div>
                                       {errors[`members.${index}.name`] && <span className="text-[10px] text-red-400 ml-1">{errors[`members.${index}.name`]}</span>}
                                    </div>
                                    
                                    <div className="space-y-1">
                                       <div className="relative">
                                          <Mail className={`absolute left-3 top-3 ${errors[`members.${index}.email`] ? 'text-red-500' : 'text-gray-600'}`} size={14} />
                                          <input 
                                             type="email" 
                                             placeholder="Email"
                                             value={member.email}
                                             onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
                                             className={`w-full bg-black/50 border rounded py-2 pl-9 text-sm text-white focus:outline-none cursor-hover ${errors[`members.${index}.email`] ? 'border-red-500 focus:border-red-500' : 'border-gray-700 focus:border-cyan-500'}`}
                                          />
                                       </div>
                                       {errors[`members.${index}.email`] && <span className="text-[10px] text-red-400 ml-1">{errors[`members.${index}.email`]}</span>}
                                    </div>
                                 </div>

                                 {/* Phone & Course Row */}
                                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                       <div className="relative">
                                          <Phone className={`absolute left-3 top-3 ${errors[`members.${index}.phone`] ? 'text-red-500' : 'text-gray-600'}`} size={14} />
                                          <input 
                                             type="tel" 
                                             placeholder="Phone Number"
                                             value={member.phone}
                                             onChange={(e) => handleMemberChange(index, 'phone', e.target.value)}
                                             className={`w-full bg-black/50 border rounded py-2 pl-9 text-sm text-white focus:outline-none cursor-hover ${errors[`members.${index}.phone`] ? 'border-red-500 focus:border-red-500' : 'border-gray-700 focus:border-cyan-500'}`}
                                             maxLength={10}
                                          />
                                       </div>
                                       {errors[`members.${index}.phone`] && <span className="text-[10px] text-red-400 ml-1">{errors[`members.${index}.phone`]}</span>}
                                    </div>
                                    
                                    <div className="space-y-1">
                                       <div className="relative">
                                          <BookOpen className={`absolute left-3 top-3 ${errors[`members.${index}.course`] ? 'text-red-500' : 'text-gray-600'}`} size={14} />
                                          <input 
                                             type="text" 
                                             placeholder="Department / Course"
                                             value={member.course}
                                             onChange={(e) => handleMemberChange(index, 'course', e.target.value)}
                                             className={`w-full bg-black/50 border rounded py-2 pl-9 text-sm text-white focus:outline-none cursor-hover ${errors[`members.${index}.course`] ? 'border-red-500 focus:border-red-500' : 'border-gray-700 focus:border-cyan-500'}`}
                                          />
                                       </div>
                                       {errors[`members.${index}.course`] && <span className="text-[10px] text-red-400 ml-1">{errors[`members.${index}.course`]}</span>}
                                    </div>
                                 </div>

                                 {/* Year Row */}
                                 <div className="space-y-1">
                                    <div className="relative">
                                       <GraduationCap className={`absolute left-3 top-3 ${errors[`members.${index}.year`] ? 'text-red-500' : 'text-gray-600'}`} size={14} />
                                       <select 
                                          value={member.year}
                                          onChange={(e) => handleMemberChange(index, 'year', e.target.value)}
                                          className={`w-full bg-black/50 border rounded py-2 pl-9 text-sm focus:outline-none appearance-none cursor-pointer cursor-hover ${member.year ? 'text-white' : 'text-gray-400'} ${errors[`members.${index}.year`] ? 'border-red-500 focus:border-red-500' : 'border-gray-700 focus:border-cyan-500'}`}
                                       >
                                          <option value="">Year of Study</option>
                                          <option value="1">1st Year</option>
                                          <option value="2">2nd Year</option>
                                          <option value="3">3rd Year</option>
                                          <option value="4">4th Year</option>
                                          <option value="5">5th Year</option>
                                       </select>
                                    </div>
                                    {errors[`members.${index}.year`] && <span className="text-[10px] text-red-400 ml-1">{errors[`members.${index}.year`]}</span>}
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </form>

            {/* Footer / Actions */}
            <div className="bg-white/5 backdrop-blur-md p-6 border-t border-white/10 shrink-0 flex justify-between items-center">
               <div className="text-xs text-gray-500 font-mono hidden md:block">
                  Your data is secure.
               </div>
               <button 
                  onClick={(e) => handleInitiateOtp(e as any)}
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold font-orbitron uppercase tracking-widest rounded transition-all disabled:opacity-50 disabled:cursor-wait relative overflow-hidden flex items-center justify-center space-x-2 cursor-hover"
               >
                  {isSubmitting ? (
                     <>
                        <Loader2 className="animate-spin" size={18} />
                        <span>SENDING VERIFICATION...</span>
                     </>
                  ) : (
                     <>
                        <Zap size={18} className="fill-current" />
                        <span>SUBMIT</span>
                     </>
                  )}
               </button>
            </div>
         </div>
      </div>
   );
};