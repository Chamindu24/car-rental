"use client";
import { useEffect, useRef, useState } from "react";
// Assuming you have access to a library like 'lucide-react' for cleaner icons, 
// if not, you can replace these with simple text or emojis.
// import { X, Bot, MessageSquare, Loader2, RefreshCw } from "lucide-react"; 

// --- TYPE DEFINITIONS ---
type Message = {
  role: "user" | "assistant";
  text: string;
  ts?: number;
};

function removeMarkdown(text: string) {
  return text.replace(/\*\*/g, "");
}
// --- HELPER COMPONENTS (For better readability) ---

const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
  const isUser = message.role === "user";
  const baseClasses = "max-w-[80%] px-4 py-2 text-sm rounded-xl relative shadow-sm";
  const userClasses = "bg-teal-600 text-white rounded-br-none ml-auto";
  const assistantClasses = "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-tl-none mr-auto";
  const timeString = message.ts
    ? new Date(message.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '';

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`${baseClasses} ${isUser ? userClasses : assistantClasses}`}>
        <div className="text-sm break-words whitespace-pre-wrap">
          {message.text}
        </div>
        {message.ts && (
          <div className="mt-1 text-[10px] text-opacity-80 dark:text-opacity-60 text-right font-light italic"
               style={{ color: isUser ? 'rgba(255, 255, 255, 0.6)' : 'inherit' }}>
            {timeString}
          </div>
        )}
      </div>
    </div>
  );
};

const Header: React.FC<{ onClose: () => void, clearChat: () => void }> = ({ onClose, clearChat }) => (
  <div className="flex items-center justify-between bg-teal-600/95 backdrop-blur-sm px-4 py-3 shadow-md">
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 flex-shrink-0 rounded-full bg-white/70 flex items-center justify-center text-xl shadow-inner">
        {/* Use a cleaner icon/emoji for the bot */}
        <span className="text-teal-600">🤖</span> 
      </div>
      <div>
        <div className="text-base font-semibold tracking-wide text-white">CR Cab Assistant</div>
        <div className="text-xs text-gray-200 opacity-80">Ask about services or bookings</div>
      </div>
    </div>
    <div className="flex items-center gap-2 ml-auto">
        <button 
            aria-label="Start a new chat" 
            onClick={clearChat} 
            title="Start New Chat"
            className="text-white/70 text-sm hover:text-white/90 transition duration-150 p-1 rounded-full hover:bg-white/10"
        >
            {/* Replace with RefreshCw icon if available, otherwise use text */}
            Clear
        </button>
        <button 
            aria-label="Close chat" 
            onClick={onClose} 
            className="text-white/80 text-xl hover:text-white hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center transition"
        >
            &times; 
        </button>
    </div>
  </div>
);

// --- MAIN COMPONENT ---

export default function Chatbot({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loadingReply, setLoadingReply] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement | null>(null);
  const streamingIntervalRef = useRef<any>(null);
  const [isInputFocused, setIsInputFocused] = useState(false);

  // Focus management and Escape key
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Persist messages logic (Kept as is)
  useEffect(() => {
    try {
      const raw = localStorage.getItem("cr_chat_messages");
      if (raw) setMessages(JSON.parse(raw));
    } catch (e) { /* ignore */ }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("cr_chat_messages", JSON.stringify(messages));
    } catch (e) { /* ignore */ }
  }, [messages]);

  // Auto-scroll logic (Kept as is)
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, loadingReply]);

  async function sendMessage(text: string) {
    if (!text || loadingReply) return;
    const trimmed = text.trim();
    if (!trimmed) return;
    
    // Clear any active streaming interval before sending a new message
    if (streamingIntervalRef.current) {
      clearInterval(streamingIntervalRef.current);
      streamingIntervalRef.current = null;
    }

    const userMsg = { role: "user" as const, text: trimmed, ts: Date.now() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoadingReply(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });
      const data = await res.json();
      const rawReply = String(data?.reply || data?.error || "Sorry, I couldn't get a reply.");
      const reply = removeMarkdown(rawReply);

      // Initialize the assistant message for streaming
      setMessages((m) => [...m, { role: "assistant", text: "", ts: Date.now() }]);

      let charIndex = 0;
      const speed = 18; // Speed in ms per character
      streamingIntervalRef.current = setInterval(() => {
        charIndex += 1;
        setMessages((cur) => {
          const copy = [...cur];
          // Find the last assistant message (which is the one we just added)
          const idx = copy.map((x) => x.role).lastIndexOf("assistant");
          
          if (idx >= 0) {
            // Update the text slice
            copy[idx] = { ...copy[idx], text: reply.slice(0, charIndex) };
          }
          
          // Check for completion inside the state update to ensure latest state is used
          if (charIndex >= reply.length) {
            clearInterval(streamingIntervalRef.current);
            streamingIntervalRef.current = null;
            setLoadingReply(false);
          }
          return copy;
        });
      }, speed);
      
    } catch (e) {
      setMessages((m) => [...m, { role: "assistant", text: "Error contacting chat service.", ts: Date.now() }]);
      setLoadingReply(false);
    }
  }

  function clearChat() {
    setMessages([]);
    // Stop any ongoing streaming interval
    if (streamingIntervalRef.current) {
      clearInterval(streamingIntervalRef.current);
      streamingIntervalRef.current = null;
    }
    setLoadingReply(false);
    try {
      localStorage.removeItem("cr_chat_messages");
    } catch (e) {}
  }

  if (!isOpen) return null;

  return (
    // Backdrop and container
    <div className="fixed inset-0 z-[9999] flex items-start sm:items-center justify-end p-4 sm:p-6 font-sans antialiased">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300" onClick={onClose} />
        
        {/* Chat window */}
      <div className="relative z-[10000] w-[90%] max-w-md rounded-2xl bg-white dark:bg-gray-800 shadow-2xl ring-1 ring-black/5 transform transition-transform duration-300 ease-out">
        <div className="rounded-2xl overflow-hidden">
          
          {/* Header */}
          <Header onClose={onClose} clearChat={clearChat} />

          <div className="p-4 bg-gray-50 dark:bg-gray-800">
            
            {/* Message Area */}
            <div
              ref={chatScrollRef}
              className="min-h-[280px] sm:min-h-[360px] max-h-[45vh] sm:max-h-[40vh] md:max-h-[60vh] overflow-y-auto rounded-lg p-2 sm:p-3 space-y-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 shadow-inner"
            >
              {messages.length === 0 && (
                <div className="mt-4 flex flex-col sm:flex-row items-center sm:items-start gap-3 text-center sm:text-left">
                  
                  <div className="text-sm text-gray-600 dark:text-gray-300 p-2 max-w-full sm:max-w-[80%]">
                    Hello! How can I assist you with <strong>CR Cab Service</strong> today? 
                  </div>
                </div>
              )}

              {messages.map((m, i) => (
                <div key={i} className="px-1 sm:px-0">
                  <MessageBubble message={m} />
                </div>
              ))}

              {/* Modern Loading Indicator (responsive; sticky on very small viewports so user sees typing) */}
              {loadingReply && !isInputFocused && (
                <div className="flex items-center gap-2 justify-start mt-3 sm:mt-3 sticky bottom-0 sm:static bg-gradient-to-t from-white/90 dark:from-gray-900/90 sm:bg-transparent py-2 sm:py-0 -mx-2 sm:mx-0 px-2 sm:px-0">
                  <div className="h-6 w-6 rounded-full bg-teal-100 dark:bg-teal-700 flex items-center justify-center text-sm flex-shrink-0">
                    <span className="text-teal-600 dark:text-teal-100">...</span>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    <div className="flex items-center gap-1">
                      <span className="inline-flex h-2 w-2 rounded-full bg-teal-500 animate-pulse-fast-1" />
                      <span className="inline-flex h-2 w-2 rounded-full bg-teal-500 animate-pulse-fast-2" />
                      <span className="inline-flex h-2 w-2 rounded-full bg-teal-500 animate-pulse-fast-3" />
                      <span className="ml-2 text-xs">Assistant is typing...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Prompts */}
            <div className="mt-4 border-t border-gray-100 dark:border-gray-700 pt-3">
              <div className="flex flex-wrap gap-2">
                {[
                  "How to book ?",
                  "What vehicles are available?",
                  "Daily rental pricing",
                ].map((s) => (
                  <button 
                    key={s} 
                    onClick={() => sendMessage(s)} 
                    disabled={loadingReply}
                    className="text-xs rounded-full border border-teal-300 dark:border-teal-700 px-3 py-1 bg-white dark:bg-gray-800 text-teal-700 dark:text-teal-300 hover:bg-teal-50 dark:hover:bg-gray-700 transition disabled:opacity-50"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="mt-4 flex gap-3">
              <input
                type="text"
                placeholder={loadingReply ? "Waiting for response..." : "Type your question..."}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                disabled={loadingReply}
                className="flex-1 rounded-full border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white transition disabled:bg-gray-100 dark:disabled:bg-gray-800"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !loadingReply) sendMessage(input);
                }}
              />
              <button 
                onClick={() => sendMessage(input)} 
                disabled={!input.trim() || loadingReply} 
                className="rounded-full bg-teal-600 px-4 py-2 text-sm text-white font-medium hover:bg-teal-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loadingReply ? '...' : 'Send'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tailwind CSS for Custom Animations (Optional, but good for modern feel) */}
      <style jsx global>{`
        @keyframes pulse-fast {
          0%, 100% { opacity: 0.2; }
          40% { opacity: 1; }
        }
        .animate-pulse-fast-1 {
          animation: pulse-fast 1s infinite;
        }
        .animate-pulse-fast-2 {
          animation: pulse-fast 1s infinite 0.15s; /* Delay */
        }
        .animate-pulse-fast-3 {
          animation: pulse-fast 1s infinite 0.3s; /* Delay */
        }
      `}</style>
    </div>
  );
}