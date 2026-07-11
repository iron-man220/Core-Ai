import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Mic, Plus, X, ArrowUp, Paperclip, Triangle, 
  MoreHorizontal, Video, ChevronRight, Image as ImageIcon, 
  Terminal, Edit3, MessageSquare, Lightbulb, RefreshCw 
} from 'lucide-react';
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';
import WebGLBackground from '../../components/WebGLBackground';

=======
import { socket } from '../../utils/socket';

// Custom inline style markdown parser
const parseInlineStyles = (line) => {
  const boldAndCodeRegex = /(\*\*.*?\*\*|`.*?`)/g;
  const parts = line.split(boldAndCodeRegex);

  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i} className="bg-muted/80 px-1.5 py-0.5 rounded font-mono text-sm text-pink-500 dark:text-pink-400">{part.slice(1, -1)}</code>;
    }
    return part;
  });
};

// Table Renderer Helper
const renderTableBlock = (rows, key) => {
  if (rows.length === 0) return null;
  const headers = rows[0];
  const dataRows = rows.slice(1);
>>>>>>> 715814d4b475b37fb9e9e7efd451d8e255bd22cb

  return (
    <div key={key} className="my-4 overflow-x-auto rounded-xl border border-border bg-card/45 backdrop-blur-sm shadow-sm">
      <table className="w-full text-left border-collapse text-xs md:text-sm">
        <thead>
          <tr className="bg-muted/70 border-b border-border">
            {headers.map((h, i) => (
              <th key={i} className="px-4 py-3 font-semibold text-muted-foreground select-none">
                {parseInlineStyles(h)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border/60">
          {dataRows.map((row, rowIdx) => (
            <tr key={rowIdx} className="hover:bg-muted/30 transition-colors">
              {row.map((cell, cellIdx) => (
                <td key={cellIdx} className="px-4 py-3 text-foreground/95">
                  {parseInlineStyles(cell || '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Custom Markdown Renderer
const MarkdownRenderer = ({ text }) => {
  if (!text) return null;

  // Split text by code blocks: ```lang ... ```
  const parts = text.split(/(```[\s\S]*?```)/g);

  return (
    <div className="space-y-3 text-foreground/90 selection:bg-primary/20">
      {parts.map((part, index) => {
        if (part.startsWith('```')) {
          // Extract language and code content
          const match = part.match(/```(\w*)\n([\s\S]*?)```/);
          const language = match ? match[1] : '';
          const code = match ? match[2] : part.slice(3, -3);

          return (
            <div key={index} className="my-4 rounded-xl overflow-hidden border border-border bg-card/60 backdrop-blur-sm shadow-inner">
              <div className="bg-muted/70 px-4 py-2 flex justify-between items-center text-xs text-muted-foreground border-b border-border font-mono">
                <span>{language || 'code'}</span>
                <button
                  onClick={() => navigator.clipboard.writeText(code)}
                  className="hover:text-foreground transition-colors px-2.5 py-1 rounded bg-background/50 border border-border hover:bg-background"
                >
                  Copy
                </button>
              </div>
              <pre className="p-4 overflow-x-auto text-sm font-mono text-foreground bg-background/40">
                <code>{code}</code>
              </pre>
            </div>
          );
        }

        // Process line by line and group consecutive table rows
        const lines = part.split('\n');
        const renderedElements = [];
        let currentTable = null;

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          const trimmed = line.trim();

          // 1. Check if it's a table row
          if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
            // Check if it is a separator row (e.g. |:---|:---|), skip if so
            if (trimmed.replace(/[\s|:-]/g, '') === '') {
              continue;
            }

            if (!currentTable) {
              currentTable = [];
            }

            // Split by pipe, ignore first and last empty elements
            const cells = line.split('|').map(c => c.trim()).filter((c, idx, arr) => idx > 0 && idx < arr.length - 1);
            currentTable.push(cells);
            continue;
          } else {
            // If a table was building and ends, render it
            if (currentTable) {
              renderedElements.push(renderTableBlock(currentTable, `table-${index}-${i}`));
              currentTable = null;
            }
          }

          // 2. Horizontal rule
          if (trimmed === '---') {
            renderedElements.push(<hr key={`hr-${index}-${i}`} className="my-4 border-t border-border/80" />);
            continue;
          }

          // 3. Bullet list items
          if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
            const itemText = line.replace(/^\s*[-*]\s+/, '');
            renderedElements.push(
              <li key={`list-${index}-${i}`} className="ml-6 list-disc mb-1.5 pl-1 leading-relaxed">
                {parseInlineStyles(itemText)}
              </li>
            );
            continue;
          }

          // 4. Headers
          if (line.startsWith('# ')) {
            renderedElements.push(<h1 key={`h1-${index}-${i}`} className="text-2xl font-bold mt-5 mb-2.5 text-gradient font-sans">{parseInlineStyles(line.slice(2))}</h1>);
            continue;
          }
          if (line.startsWith('## ')) {
            renderedElements.push(<h2 key={`h2-${index}-${i}`} className="text-xl font-bold mt-4 mb-2 text-gradient-warm font-sans">{parseInlineStyles(line.slice(3))}</h2>);
            continue;
          }
          if (line.startsWith('### ')) {
            renderedElements.push(<h3 key={`h3-${index}-${i}`} className="text-lg font-bold mt-3.5 mb-1.5 font-sans">{parseInlineStyles(line.slice(4))}</h3>);
            continue;
          }

          // 5. Normal paragraphs
          if (trimmed === '') {
            renderedElements.push(<div key={`empty-${index}-${i}`} className="h-2" />);
          } else {
            renderedElements.push(
              <p key={`p-${index}-${i}`} className="leading-relaxed mb-2 font-sans font-normal text-foreground/90">
                {parseInlineStyles(line)}
              </p>
            );
          }
        }

        // Flush any remaining table at the end of the block
        if (currentTable) {
          renderedElements.push(renderTableBlock(currentTable, `table-end-${index}`));
        }

        return <div key={index} className="space-y-1">{renderedElements}</div>;
      })}
    </div>
  );
};

const Landing = () => {
  const [inputValue, setInputValue] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [socketConnected, setSocketConnected] = useState(socket.connected);

  const messagesEndRef = useRef(null);

  // Setup sockets
  useEffect(() => {
    const onConnect = () => {
      console.log('Socket connected to server');
      setSocketConnected(true);
    };

    const onDisconnect = () => {
      console.log('Socket disconnected from server');
      setSocketConnected(false);
    };

    const onResponseChunk = ({ messageId, chunk }) => {
      setMessages((prev) =>
        prev.map((msg) => {
          if (msg.id === messageId) {
            return { ...msg, text: msg.text + chunk, isStreaming: true };
          }
          return msg;
        })
      );
    };

    const onResponseEnd = ({ messageId }) => {
      setMessages((prev) =>
        prev.map((msg) => {
          if (msg.id === messageId) {
            return { ...msg, isStreaming: false };
          }
          return msg;
        })
      );
      setIsGenerating(false);
    };

    const onResponseError = ({ messageId, error }) => {
      setMessages((prev) =>
        prev.map((msg) => {
          if (msg.id === messageId) {
            return { 
              ...msg, 
              text: msg.text + `\n\n*(Error: ${error})*`, 
              isStreaming: false,
              isError: true
            };
          }
          return msg;
        })
      );
      setIsGenerating(false);
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('responseChunk', onResponseChunk);
    socket.on('responseEnd', onResponseEnd);
    socket.on('responseError', onResponseError);

    // If socket is already connected at mount time, update status state immediately
    if (socket.connected) {
      setSocketConnected(true);
    } else {
      socket.connect();
    }

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('responseChunk', onResponseChunk);
      socket.off('responseEnd', onResponseEnd);
      socket.off('responseError', onResponseError);
    };
  }, []);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isGenerating]);

  const handleSendMessage = (textToSend) => {
    const promptText = textToSend || inputValue;
    if (!promptText || !promptText.trim()) return;

    const userMsgId = Date.now().toString();
    const aiMsgId = (Date.now() + 1).toString();

    const newUserMsg = { id: userMsgId, sender: 'user', text: promptText.trim() };
    const newAiMsg = { id: aiMsgId, sender: 'ai', text: '', isStreaming: true };

    setMessages((prev) => [...prev, newUserMsg, newAiMsg]);
    setIsGenerating(true);
    setInputValue('');
    setIsMenuOpen(false);

    // Emit event
    socket.emit('sendMessage', { prompt: promptText.trim(), messageId: aiMsgId });
  };

  return (
<<<<<<< HEAD
    <>
      {/* ─── SIMPLE FADE REVEAL (Only on initial load) ─── */}
      {showSplash && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0, pointerEvents: 'none' }}
          transition={{ delay: 2.0, duration: 1.0, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]"
        >
           <motion.div
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative flex items-center justify-center"
           >
             {/* Subtle glow behind logo */}
             <div className="absolute w-32 h-32 bg-cyan-500/20 blur-[40px] rounded-full" />
             <img 
                src="/logo.png" 
                alt="Core AI Logo" 
                className="w-32 h-32 object-contain drop-shadow-[0_0_30px_rgba(0,229,255,0.8)] relative z-10 dark:brightness-0 dark:invert" 
             />
           </motion.div>
        </motion.div>
      )}

      {/* Main App Container */}
      <motion.div
        initial={showSplash ? { opacity: 0, scale: 1.05 } : { opacity: 1, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={showSplash ? { duration: 1.2, delay: 2.4, ease: [0.25, 0.46, 0.45, 0.94] } : { duration: 0.4, ease: "easeOut" }}
        className="flex h-screen w-full bg-[#0a0a0a] text-[#ededed] font-sans overflow-hidden"
      >
      {/* ─── 3D PARTICLE BACKGROUND ─── */}
      <WebGLBackground />

      {/* ─── SIDEBAR ─── */}
      <motion.aside
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-64 flex-shrink-0 flex flex-col bg-[#0f0f0f]/80 backdrop-blur-sm border-r border-white/5 h-full p-4 overflow-y-auto hidden md:flex relative z-10"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 mb-6 px-2">
          <img src="/logo.png" alt="Logo" className="h-10 w-auto object-contain drop-shadow-[0_0_8px_rgba(6,182,212,0.4)] dark:brightness-0 dark:invert" />
          <span className="text-lg font-bold tracking-wide">Core AI</span>
=======
    <div className="flex flex-col h-full bg-background relative overflow-hidden">
      
      {/* Top Header Row: Connection Status */}
      <div className="absolute top-4 right-4 z-50 flex items-center gap-3">
        {/* Connection status indicator */}
        <div className="flex items-center gap-2 bg-card/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-border shadow-sm text-xs font-medium">
          <span className={`w-2 h-2 rounded-full ${socketConnected ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
          <span className="text-muted-foreground">{socketConnected ? 'Connected' : 'Disconnected'}</span>
>>>>>>> 715814d4b475b37fb9e9e7efd451d8e255bd22cb
        </div>
      </div>

      {/* Main Messages & Suggestions Container */}
      <div className="flex-1 overflow-y-auto w-full max-w-4xl mx-auto px-4 md:px-8 pt-12 pb-24 flex flex-col">
        {messages.length === 0 ? (
          /* EMPTY STATE */
          <div className="flex-1 flex flex-col items-center justify-center py-12">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-3 text-foreground flex items-center justify-center gap-2">
                What can I help with, <span className="text-gradient">BHUVA</span>?
              </h1>
              <p className="text-sm text-muted-foreground font-normal">
                Core AI streams knowledge via WebSockets instantly.
              </p>
            </motion.div>
          </div>
        ) : (
          /* CHAT LOG */
          <div className="space-y-6 py-4 flex-1">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {/* AI Avatar */}
                {msg.sender === 'ai' && (
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-sm flex-shrink-0">
                    <Sparkles className="w-5 h-5 animate-pulse" strokeWidth={1.5} />
                  </div>
                )}

                {/* Message Bubble */}
                <div 
                  className={`max-w-[85%] rounded-2xl px-5 py-3.5 shadow-sm border ${
                    msg.sender === 'user'
                      ? 'bg-send-bg/10 border-send-bg/25 text-foreground rounded-tr-none'
                      : msg.isError
                      ? 'bg-rose-500/10 border-rose-500/20 text-rose-500 rounded-tl-none font-sans'
                      : 'bg-card border-border rounded-tl-none font-sans'
                  }`}
                >
                  {msg.sender === 'user' ? (
                    <p className="whitespace-pre-wrap leading-relaxed text-sm font-medium">{msg.text}</p>
                  ) : msg.text === '' && msg.isStreaming ? (
                    /* Loading Skeleton */
                    <div className="flex items-center gap-1.5 py-1.5">
                      <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  ) : (
                    /* Rendered Text */
                    <div className="text-sm">
                      <MarkdownRenderer text={msg.text} />
                      {msg.isStreaming && (
                        <span className="inline-block w-1.5 h-4 bg-primary animate-pulse ml-1 align-middle" />
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Floating Bottom Input Bar */}
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-background via-background/95 to-transparent pt-8 pb-6 px-4 md:px-8 z-40">
        <div className="max-w-3xl mx-auto relative">
          
          {/* Attachment Menu Popup */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute bottom-full left-0 mb-3 bg-card rounded-2xl border border-border shadow-lg p-2 min-w-[200px] z-50"
              >
                <div className="flex flex-col">
                  <button className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-sidebar-hover rounded-xl transition-colors text-left">
                    <Paperclip className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                    Upload files
                  </button>
                  <button className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-sidebar-hover rounded-xl transition-colors text-left">
                    <Triangle className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                    Add from Drive
                  </button>
                  <button className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-sidebar-hover rounded-xl transition-colors text-left border-t border-border mt-1 pt-2">
                    <ImageIcon className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                    Create image
                  </button>
                  <button className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-sidebar-hover rounded-xl transition-colors text-left">
                    <Video className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                    Create video
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Input Box */}
          <div className="bg-card border border-border rounded-full p-1.5 flex items-center shadow-md focus-within:ring-2 focus-within:ring-primary/40 focus-within:border-primary/50 transition-all relative">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-3 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors flex-shrink-0 ml-1 active:scale-95"
            >
              {isMenuOpen ? <X className="w-5 h-5" strokeWidth={1.5} /> : <Plus className="w-5 h-5" strokeWidth={1.5} />}
            </button>
            
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              placeholder={socketConnected ? "Ask Gemini (via WebSocket)..." : "Connecting to WebSocket server..."} 
              disabled={isGenerating}
              className="flex-1 bg-transparent border-none focus:outline-none text-foreground placeholder:text-muted-foreground/75 px-3 py-3 text-sm disabled:opacity-50"
            />
            
            <div className="flex items-center gap-2 pr-1">
              {isGenerating ? (
                <div className="p-3 bg-muted text-primary rounded-full transition-colors">
                  <RefreshCw className="w-5 h-5 animate-spin" strokeWidth={2} />
                </div>
              ) : inputValue.trim().length > 0 ? (
                <button 
                  onClick={() => handleSendMessage()}
                  disabled={!socketConnected || isGenerating}
                  className="p-3 bg-primary hover:opacity-90 disabled:opacity-40 text-white rounded-full transition-all active:scale-95 shadow-sm disabled:cursor-not-allowed"
                >
                  <ArrowUp className="w-5 h-5" strokeWidth={2} />
                </button>
              ) : (
                <button className="p-3 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors">
                  <Mic className="w-5 h-5" strokeWidth={1.5} />
                </button>
              )}
            </div>
          </div>
          
          <div className="text-center text-[10px] text-muted-foreground/70 mt-2.5">
            Core AI can make mistakes. Verify important info. Connected via real-time WebSocket.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;