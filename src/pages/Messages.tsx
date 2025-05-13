
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useParams } from "react-router-dom";
import { getMatchesByUserId, getMessagesBetweenUsers, mockMessages, getUserById } from "@/data/mockData";

const Messages = () => {
  const { user } = useAuth();
  const { userId } = useParams<{ userId: string }>();
  const [activeConversation, setActiveConversation] = useState<string | null>(userId || null);
  const [message, setMessage] = useState("");
  const [conversations, setConversations] = useState<{ userId: string; unreadCount: number }[]>([]);
  const [messages, setMessages] = useState<typeof mockMessages>([]);

  useEffect(() => {
    if (user) {
      // Get all users I have matched with
      const myMatches = getMatchesByUserId(user.id);
      
      // Extract unique conversation partners
      const uniqueConversations = Array.from(
        new Set(
          myMatches.map(match => 
            match.user1Id === user.id ? match.user2Id : match.user1Id
          )
        )
      );
      
      // For each conversation partner, count unread messages
      const conversationsWithUnread = uniqueConversations.map(partnerId => {
        const unreadCount = mockMessages.filter(
          msg => msg.senderId === partnerId && msg.receiverId === user.id && !msg.read
        ).length;
        
        return { userId: partnerId, unreadCount };
      });
      
      setConversations(conversationsWithUnread);
      
      // If we have an active conversation, load those messages
      if (activeConversation) {
        const conversationMessages = getMessagesBetweenUsers(user.id, activeConversation);
        setMessages(conversationMessages);
      }
    }
  }, [user, activeConversation]);
  
  // Handle selecting a conversation
  const handleSelectConversation = (userId: string) => {
    setActiveConversation(userId);
  };
  
  // Handle sending a message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || !activeConversation) return;
    
    // In a real app, this would send to API
    const newMessage = {
      id: `msg${Date.now()}`,
      senderId: user?.id || "",
      receiverId: activeConversation,
      content: message,
      timestamp: new Date().toISOString(),
      read: false,
    };
    
    // Add to messages list
    setMessages(prev => [...prev, newMessage]);
    
    // Clear input
    setMessage("");
  };

  if (!user) {
    return (
      <Layout>
        <div className="container py-8 text-center">
          <p>Please log in to view your messages.</p>
          <Link to="/login">Log in</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Messages</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Conversations list */}
          <div className="bg-white rounded-lg border overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="font-medium">Conversations</h2>
            </div>
            <div className="divide-y max-h-[600px] overflow-y-auto">
              {conversations.length > 0 ? (
                conversations.map(({ userId: partnerId, unreadCount }) => {
                  const partner = getUserById(partnerId)!;
                  const isActive = activeConversation === partnerId;
                  
                  return (
                    <button
                      key={partnerId}
                      className={`w-full flex items-center p-4 hover:bg-gray-50 text-left transition ${
                        isActive ? "bg-bartr-light" : ""
                      }`}
                      onClick={() => handleSelectConversation(partnerId)}
                    >
                      <img
                        src={partner.avatar}
                        alt={partner.name}
                        className="w-10 h-10 rounded-full object-cover mr-3"
                      />
                      <div>
                        <p className="font-medium">{partner.name}</p>
                        <p className="text-sm text-gray-500 truncate">
                          {partner.location}
                        </p>
                      </div>
                      {unreadCount > 0 && (
                        <div className="ml-auto">
                          <span className="bg-bartr-secondary text-white text-xs px-2 py-1 rounded-full">
                            {unreadCount}
                          </span>
                        </div>
                      )}
                    </button>
                  );
                })
              ) : (
                <div className="p-4 text-center text-gray-500">
                  No conversations yet
                </div>
              )}
            </div>
          </div>
          
          {/* Messages */}
          <div className="md:col-span-2 flex flex-col bg-white rounded-lg border overflow-hidden">
            {activeConversation ? (
              <>
                <div className="p-4 border-b flex items-center">
                  {activeConversation && (
                    <>
                      <img
                        src={getUserById(activeConversation)?.avatar}
                        alt={getUserById(activeConversation)?.name}
                        className="w-8 h-8 rounded-full object-cover mr-2"
                      />
                      <h2 className="font-medium">{getUserById(activeConversation)?.name}</h2>
                    </>
                  )}
                </div>
                
                <div className="flex-1 p-4 overflow-y-auto max-h-[400px] flex flex-col space-y-4">
                  {messages.map(msg => {
                    const isOutgoing = msg.senderId === user.id;
                    
                    return (
                      <div
                        key={msg.id}
                        className={`flex ${isOutgoing ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg p-3 ${
                            isOutgoing
                              ? "bg-bartr-primary text-white"
                              : "bg-gray-100"
                          }`}
                        >
                          <p>{msg.content}</p>
                          <p className={`text-xs mt-1 ${isOutgoing ? "text-bartr-light" : "text-gray-500"}`}>
                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  
                  {messages.length === 0 && (
                    <div className="text-center text-gray-500 my-10">
                      No messages yet. Start a conversation!
                    </div>
                  )}
                </div>
                
                <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-2">
                  <Input
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                  />
                  <Button type="submit" className="bg-bartr-primary hover:bg-bartr-dark">
                    Send
                  </Button>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center p-8">
                  <h3 className="font-medium mb-2">No conversation selected</h3>
                  <p className="text-gray-500">
                    Select a conversation from the list to start messaging
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Messages;
