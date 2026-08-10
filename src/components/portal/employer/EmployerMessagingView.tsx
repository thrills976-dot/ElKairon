import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, Search, MessageSquare, Paperclip, ShieldCheck, 
  CheckCheck, User, Sparkles, Phone, Video, Calendar, Clock,
  FileText, CheckCircle2, ChevronRight, CornerDownLeft
} from 'lucide-react';
import { INITIAL_EMPLOYER_MESSAGES } from '../../../data/mockEmployerData';
import { EmployerMessage, MessageEntry } from '../../../types/recruitment';
import toast from 'react-hot-toast';

interface EmployerMessagingViewProps {
  onScheduleInterview?: (candidateName: string) => void;
  onOpenCompliance?: () => void;
}

export function EmployerMessagingView({ onScheduleInterview, onOpenCompliance }: EmployerMessagingViewProps) {
  const [threads, setThreads] = useState<EmployerMessage[]>(INITIAL_EMPLOYER_MESSAGES);
  const [activeThreadId, setActiveThreadId] = useState<string>(threads[0]?.id || '');
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const activeThread = threads.find(t => t.id === activeThreadId) || threads[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeThread) return;

    const newMsg: MessageEntry = {
      sender: 'employer',
      text: inputText.trim(),
      time: 'Just now'
    };

    setThreads(prev => prev.map(thread => {
      if (thread.id === activeThread.id) {
        return {
          ...thread,
          lastMessage: inputText.trim(),
          timestamp: 'Just now',
          unread: false,
          messages: [...thread.messages, newMsg]
        };
      }
      return thread;
    }));

    setInputText('');
    toast.success('Message sent directly to candidate');

    // Simulate smart automated response after 2 seconds
    setTimeout(() => {
      const autoReply: MessageEntry = {
        sender: 'compliance_officer',
        text: `[ElKairon Fast-Track Desk]: We have notified ${activeThread.candidateName} and logged this communication for the §81a immigration file.`,
        time: 'Just now'
      };

      setThreads(prev => prev.map(thread => {
        if (thread.id === activeThread.id) {
          return {
            ...thread,
            messages: [...thread.messages, autoReply]
          };
        }
        return thread;
      }));
    }, 1800);
  };

  const filteredThreads = threads.filter(t => 
    t.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col md:flex-row h-[720px]">
      {/* Sidebar: Conversation Threads */}
      <div className="w-full md:w-80 border-r border-gray-100 flex flex-col bg-gray-50/50">
        <div className="p-4 border-b border-gray-100 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-navy-900 text-base flex items-center gap-2">
              <MessageSquare size={18} className="text-teal-600" />
              <span>Communications</span>
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 text-[10px] font-extrabold">
              {threads.length} Threads
            </span>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={14} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations..."
              className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-xl text-xs outline-none focus:border-teal-500"
            />
          </div>
        </div>

        {/* Thread List */}
        <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
          {filteredThreads.map((thread) => {
            const isSelected = thread.id === activeThreadId;
            return (
              <button
                key={thread.id}
                type="button"
                onClick={() => {
                  setActiveThreadId(thread.id);
                  setThreads(prev => prev.map(t => t.id === thread.id ? { ...t, unread: false } : t));
                }}
                className={`w-full p-4 text-left transition-all flex items-start gap-3 ${
                  isSelected ? 'bg-white shadow-sm border-l-4 border-teal-600' : 'hover:bg-gray-100/70'
                }`}
              >
                <img
                  src={thread.candidateAvatar}
                  alt={thread.candidateName}
                  className="w-11 h-11 rounded-2xl object-cover border border-gray-200 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <h4 className={`text-xs font-bold truncate ${isSelected ? 'text-navy-900' : 'text-gray-800'}`}>
                      {thread.candidateName}
                    </h4>
                    <span className="text-[10px] text-gray-400 shrink-0">{thread.timestamp}</span>
                  </div>
                  <p className="text-[11px] font-medium text-teal-700 truncate">{thread.subject}</p>
                  <p className="text-[11px] text-gray-500 truncate mt-0.5">{thread.lastMessage}</p>
                </div>
                {thread.unread && (
                  <span className="w-2 h-2 rounded-full bg-teal-500 shrink-0 mt-1.5" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Chat Pane */}
      {activeThread ? (
        <div className="flex-1 flex flex-col bg-white">
          {/* Header */}
          <div className="p-4 md:px-6 border-b border-gray-100 flex items-center justify-between flex-wrap gap-3 bg-white">
            <div className="flex items-center gap-3">
              <img
                src={activeThread.candidateAvatar}
                alt={activeThread.candidateName}
                className="w-10 h-10 rounded-xl object-cover border border-gray-200"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-navy-900 text-sm">{activeThread.candidateName}</h3>
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-teal-50 text-teal-800 flex items-center gap-1">
                    <ShieldCheck size={11} className="text-teal-600" />
                    <span>Pre-Vetted</span>
                  </span>
                </div>
                <p className="text-xs text-gray-400 font-medium">{activeThread.subject}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {onScheduleInterview && (
                <button
                  type="button"
                  onClick={() => onScheduleInterview(activeThread.candidateName)}
                  className="px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-800 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Calendar size={13} />
                  <span>Interview</span>
                </button>
              )}
              {onOpenCompliance && (
                <button
                  type="button"
                  onClick={onOpenCompliance}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-navy-900 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <FileText size={13} />
                  <span>Visa Dossier</span>
                </button>
              )}
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-50/30">
            {/* Notice */}
            <div className="p-3 bg-teal-50/70 border border-teal-100 rounded-2xl text-[11px] text-teal-900 flex items-center gap-2 max-w-xl mx-auto">
              <ShieldCheck size={16} className="text-teal-600 shrink-0" />
              <span>All communications in this channel are mirrored with ElKairon German Legal Counsel for expedited § 81a work permit filing.</span>
            </div>

            {activeThread.messages.map((msg, index) => {
              if (msg.sender === 'compliance_officer') {
                return (
                  <div key={index} className="flex justify-center my-2">
                    <div className="px-4 py-2 bg-navy-900 text-teal-300 rounded-2xl text-xs font-medium max-w-md border border-navy-800 shadow-sm flex items-center gap-2">
                      <Sparkles size={14} className="text-gold-400 shrink-0" />
                      <span>{msg.text}</span>
                    </div>
                  </div>
                );
              }

              const isEmployer = msg.sender === 'employer';
              return (
                <div
                  key={index}
                  className={`flex ${isEmployer ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-md p-4 rounded-2xl shadow-sm text-xs leading-relaxed space-y-1 ${
                      isEmployer
                        ? 'bg-navy-900 text-white rounded-br-none'
                        : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4 text-[10px] opacity-75">
                      <span className="font-bold">
                        {isEmployer ? 'You (Hiring Manager)' : activeThread.candidateName}
                      </span>
                      <span>{msg.time}</span>
                    </div>
                    <p>{msg.text}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Message Input Box */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-100 bg-white flex items-center gap-2">
            <button
              type="button"
              onClick={() => toast.success('Attach document file (PDF / DOCX)')}
              className="p-2.5 text-gray-400 hover:text-navy-900 hover:bg-gray-100 rounded-xl transition-colors"
              title="Attach Document"
            >
              <Paperclip size={18} />
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Write a message to ${activeThread.candidateName}...`}
              className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:bg-white focus:border-teal-500 transition-all"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 disabled:opacity-40 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md transition-all"
            >
              <span>Send</span>
              <Send size={13} />
            </button>
          </form>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center p-12 text-center text-gray-400">
          <MessageSquare size={32} className="mx-auto mb-2 opacity-50" />
          <p className="text-xs">Select a conversation thread to begin communicating.</p>
        </div>
      )}
    </div>
  );
}
