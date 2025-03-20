
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Bot, X, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotPanelProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const ChatbotPanel = ({ isOpen, onClose, className }: ChatbotPanelProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: "Hello! I'm your AI study assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Quick reply suggestions
  const quickReplies = [
    "Create a study plan for me",
    "What topics should I focus on?",
    "Give me test preparation tips",
    "Help me with time management"
  ];

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    // Simulate AI response (in a real app, this would call an AI API)
    setTimeout(() => {
      let response = '';
      
      // Basic response logic based on keywords
      const lowercaseInput = inputValue.toLowerCase();
      
      if (lowercaseInput.includes('study plan') || lowercaseInput.includes('schedule')) {
        response = "I can help create a personalized study plan. To get started, let me know your target exam, available study hours per day, and key subjects you need to focus on.";
      } else if (lowercaseInput.includes('focus') || lowercaseInput.includes('topic')) {
        response = "Based on your recent activity, I recommend focusing on Mathematics - particularly Calculus, as you seem to have struggled with related tests. Would you like study resources for this topic?";
      } else if (lowercaseInput.includes('test') || lowercaseInput.includes('exam')) {
        response = "For optimal test preparation, I recommend practicing with timed tests, focusing on your weak areas first, and reviewing mistakes carefully. Would you like me to create a practice test for you?";
      } else if (lowercaseInput.includes('time') || lowercaseInput.includes('management')) {
        response = "For better time management, try the Pomodoro Technique: 25 minutes of focused study followed by a 5-minute break. Your optimal study times appear to be mornings, based on your previous activity patterns.";
      } else {
        response = "I'm here to help with your studies. You can ask me about creating study plans, subject recommendations, test preparation, or time management strategies!";
      }
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleQuickReply = (reply: string) => {
    setInputValue(reply);
    // Wait for state update then send
    setTimeout(() => handleSendMessage(), 50);
  };

  return (
    <div className={cn(
      "fixed inset-y-0 right-0 w-full sm:w-96 z-50 transform transition-transform duration-300 ease-in-out bg-background border-l shadow-xl",
      isOpen ? "translate-x-0" : "translate-x-full",
      className
    )}>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b flex items-center justify-between bg-primary/5">
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-primary" />
            <h2 className="font-medium">AI Study Assistant</h2>
          </div>
          
          <button 
            onClick={onClose}
            className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id}
              className={cn(
                "flex",
                message.sender === 'user' ? "justify-end" : "justify-start"
              )}
            >
              <div className={cn(
                "max-w-[80%] rounded-lg p-3",
                message.sender === 'user' 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted"
              )}>
                <p className="text-sm">{message.content}</p>
                <span className="text-xs opacity-70 mt-1 block text-right">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg p-3 flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <p className="text-sm">Thinking...</p>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Quick replies */}
        {messages.length < 3 && (
          <div className="px-4 pb-2">
            <p className="text-xs text-muted-foreground mb-2">Try asking:</p>
            <div className="flex flex-wrap gap-2">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickReply(reply)}
                  className="text-xs bg-muted hover:bg-muted/80 px-3 py-1.5 rounded-full text-muted-foreground transition-colors"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <form onSubmit={handleSendMessage} className="p-4 border-t flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Ask a question..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={!inputValue.trim() || isLoading}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatbotPanel;
