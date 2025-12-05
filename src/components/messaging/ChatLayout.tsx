"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MessageSquare,
  Search,
  ArrowLeft,
  Paperclip,
  SendHorizonal,
} from "lucide-react";
import { format, formatDistanceToNowStrict } from "date-fns";
import {
  getConversationsWithUserDetails,
  getUserById,
  loggedInUser,
} from "@/lib/data";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface ChatLayoutProps {
  defaultLayout: {
    conversations: Awaited<ReturnType<typeof getConversationsWithUserDetails>>;
    selectedConversation: Awaited<
      ReturnType<typeof getConversationsWithUserDetails>
    >[number];
  };
}

export default function ChatLayout({ defaultLayout }: ChatLayoutProps) {
  const [
    selectedConversation,
    setSelectedConversation,
  ] = React.useState(defaultLayout.selectedConversation);
  const [message, setMessage] = React.useState("");

  const me = loggedInUser;

  return (
    <div className="z-10 h-full w-full text-foreground flex">
      <div
        className={cn(
          "h-full w-full md:w-1/3 xl:w-1/4 bg-card border-r",
          "md:flex flex-col",
          selectedConversation && "hidden"
        )}
      >
        <div className="p-4">
          <h1 className="font-headline text-2xl font-bold flex items-center gap-2">
            <MessageSquare className="text-primary" />
            Messages
          </h1>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search messages..." className="pl-9" />
          </div>
        </div>
        <Separator />
        <ScrollArea className="flex-1">
          <div className="p-2">
            {defaultLayout.conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConversation(conv)}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg w-full text-left transition-colors hover:bg-accent/50",
                  selectedConversation?.id === conv.id && "bg-accent"
                )}
              >
                <Avatar className="h-12 w-12 border-2 border-primary">
                  <AvatarImage
                    src={conv.user?.image.imageUrl}
                    alt={conv.user?.name}
                  />
                  <AvatarFallback>
                    {conv.user?.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <div className="flex justify-between items-center">
                    <h3 className="font-headline font-semibold truncate">
                      {conv.user?.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNowStrict(
                        new Date(conv.lastMessage.timestamp)
                      )}
                    </p>
                  </div>
                  <p
                    className={cn(
                      "text-sm text-muted-foreground truncate",
                      !conv.lastMessage.isRead &&
                        conv.lastMessage.senderId !== me.id &&
                        "font-bold text-foreground"
                    )}
                  >
                    {conv.lastMessage.text}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>
      <div
        className={cn(
          "h-full w-full flex-col",
          "md:flex",
          !selectedConversation && "hidden"
        )}
      >
        {selectedConversation ? (
          <>
            <div className="flex items-center gap-4 p-4 border-b">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setSelectedConversation(undefined as any)}
              >
                <ArrowLeft />
              </Button>
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={selectedConversation.user?.image.imageUrl}
                  alt={selectedConversation.user?.name}
                />
                <AvatarFallback>
                  {selectedConversation.user?.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-headline text-lg font-semibold">
                  {selectedConversation.user?.name}
                </h2>
                <p className="text-xs text-muted-foreground">
                  {selectedConversation.user?.isOnline ? "Online" : "Offline"}
                </p>
              </div>
            </div>
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-6">
                {selectedConversation.messages.map((msg, index) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex items-end gap-2",
                      msg.senderId === me.id ? "justify-end" : "justify-start"
                    )}
                  >
                    {msg.senderId !== me.id && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={selectedConversation.user?.image.imageUrl}
                        />
                        <AvatarFallback>
                          {selectedConversation.user?.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={cn(
                        "max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-2xl font-body",
                        msg.senderId === me.id
                          ? "bg-primary text-primary-foreground rounded-br-none"
                          : "bg-muted rounded-bl-none"
                      )}
                    >
                      <p>{msg.text}</p>
                      <p className="text-xs opacity-70 mt-1 text-right">
                        {format(new Date(msg.timestamp), 'p')}
                      </p>
                    </div>
                    {msg.senderId === me.id && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={me.image.imageUrl} />
                        <AvatarFallback>{me.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-4 border-t">
              <div className="relative">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && message.trim()) {
                      // handle send message
                      setMessage('');
                    }
                  }}
                  placeholder="Type a message..."
                  className="pr-24 h-12"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="size-5" />
                  </Button>
                  <Button
                    size="icon"
                    className="bg-accent hover:bg-accent/90"
                    disabled={!message.trim()}
                    onClick={() => {
                        // handle send message
                        setMessage('');
                    }}
                  >
                    <SendHorizonal className="size-5" />
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center bg-card">
            <MessageSquare className="size-16 text-muted-foreground/50" />
            <h2 className="mt-4 font-headline text-2xl font-semibold">
              Select a conversation
            </h2>
            <p className="mt-1 text-muted-foreground">
              Choose one of your matches to start chatting.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
