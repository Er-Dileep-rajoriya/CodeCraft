import React from "react";

interface ChatMessageProps {
  role: "user" | "bot";
  content: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ role, content }) => {
  return (
    <div
      className={`flex ${role === "user" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[80%] p-4 rounded-lg shadow-sm transition-all duration-200 ${
          role === "user"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
        }`}
      >
        <p className="text-sm">{content}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
