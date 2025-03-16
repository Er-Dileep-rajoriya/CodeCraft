"use client";

import React, { useState, useEffect } from "react";
import ChatMessage from "@/components/ChatMessage";
import TypingIndicator from "@/components/TypingIndicator";
import SendMessageForm from "@/components/SendMessageForm";
import CodePreview from "@/components/CodePreview";
import LivePreviewModal from "@/components/LivePreviewModal";
import generateCode from "@/open_ai/openai_config";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";

function HomePage() {
  const [userInput, setUserInput] = useState("");
  const [chatMessages, setChatMessages] = useState<
    { role: "user" | "bot"; content: string }[]
  >([]);
  const [generatedCode, setGeneratedCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const { loggedInUser } = useSelector((store: RootState) => store.userReducer);
  const router = useRouter();

  const simulateTyping = (
    text: string,
    callback: (finalText: string) => void
  ) => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= text.length) {
        callback(text.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 10);
  };

  const handleSendMessage = async () => {
    // if user not logged in then redirect to login page

    if (loggedInUser == null) {
      router.push("/auth/login");
      return;
    }

    if (!userInput.trim()) return;

    setIsLoading(true);
    setChatMessages((prev) => [...prev, { role: "user", content: userInput }]);
    setUserInput("");

    try {
      const botResponse = await generateCode(
        `Generate HTML and CSS code for: ${userInput}`
      );
      setIsTyping(true);
      simulateTyping(botResponse, (finalText) => {
        setChatMessages((prev) => [
          ...prev.slice(0, -1),
          { role: "bot", content: finalText },
        ]);
        setGeneratedCode(finalText);
      });
    } catch (error) {
      console.error("Error generating code:", error);
      setChatMessages((prev) => [
        ...prev,
        { role: "bot", content: "Failed to generate code. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadCode = () => {
    const blob = new Blob([generatedCode], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "generated-page.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col p-4 pt-16">
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col gap-6">
        {/* Chat Interface */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto space-y-4">
            {chatMessages.map((message, index) => (
              <ChatMessage
                key={index}
                role={message.role}
                content={message.content}
              />
            ))}
            {isTyping && <TypingIndicator />}
          </div>

          {/* Input Field and Send Button */}
          <SendMessageForm
            userInput={userInput}
            isLoading={isLoading}
            onInputChange={(e) => setUserInput(e.target.value)}
            onSendMessage={handleSendMessage}
          />
        </div>

        {/* Generated Code Preview */}
        <CodePreview
          generatedCode={generatedCode}
          isLoading={isLoading}
          onShowPreview={() => setShowPreviewModal(true)}
          onDownloadCode={handleDownloadCode}
        />
      </div>

      {/* Live Preview Modal */}
      {showPreviewModal && (
        <LivePreviewModal
          generatedCode={generatedCode}
          onClose={() => setShowPreviewModal(false)}
        />
      )}
    </div>
  );
}

export default HomePage;
