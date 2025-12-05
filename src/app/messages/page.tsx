import { getConversationsWithUserDetails, getUserById, type User } from "@/lib/data";
import ChatLayout from "@/components/messaging/ChatLayout";

export default function MessagesPage() {
  const conversations = getConversationsWithUserDetails();
  // For this example, we'll pick the first conversation to be active by default on desktop
  const defaultLayout = {
    conversations: conversations,
    selectedConversation: conversations[0],
  };

  return (
    <div className="h-[calc(100vh-4rem)]">
        <ChatLayout
          defaultLayout={defaultLayout}
        />
    </div>
  );
}
