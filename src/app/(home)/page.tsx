"use client";

import React, { useState, useEffect, useRef } from "react"; // Added useRef
import generateCode from "@/open_ai/openai_config";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Eye, Download } from "lucide-react";
import { addMessage } from "@/redux/chatReducer";

function HomePage() {
  const [prompt, setPrompt] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
  const [generatedCode, setGeneratedCode] = useState<string>("");
  const [typingText, setTypingText] = useState<string>("");
  const [typingMessageIndex, setTypingMessageIndex] = useState<number>(-1);
  const { loggedInUser } = useSelector((state: RootState) => state.userReducer);
  const chatMessages = useSelector(
    (state: RootState) => state.chatReducer.messages
  );
  const dispatch = useDispatch();
  const router = useRouter();

  // Track the last message length to detect new messages
  const lastMessageLength = useRef(chatMessages.length);

  // Typing effect logic
  useEffect(() => {
    if (typingMessageIndex >= 0 && typingMessageIndex < chatMessages.length) {
      const message = chatMessages[typingMessageIndex];
      if (message.type === "ai" && typingText !== message.text) {
        const intervalId = setInterval(() => {
          setTypingText((prev) => {
            const nextChar = message.text[prev.length];
            if (nextChar) {
              return prev + nextChar;
            } else {
              clearInterval(intervalId);
              return prev;
            }
          });
        }, 10); // Typing speed

        return () => clearInterval(intervalId);
      }
    }
  }, [typingMessageIndex, chatMessages, typingText]);

  // Trigger typing effect only when a new AI message is added
  useEffect(() => {
    if (chatMessages.length > lastMessageLength.current) {
      const newMessage = chatMessages[chatMessages.length - 1];
      if (newMessage.type === "ai") {
        setTypingMessageIndex(chatMessages.length - 1);
        setTypingText(""); // Reset typing text for the new message
      }
      lastMessageLength.current = chatMessages.length; // Update the last message length
    }
  }, [chatMessages]);

  const handleGenerateCode = async () => {
    if (loggedInUser == null) {
      router.push("/auth/login");
      return;
    }

    if (!prompt.trim()) {
      setError("Please enter a prompt.");
      console.log(error);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      dispatch(addMessage({ type: "user", text: prompt }));
      const optimizedPrompt = `Generate only HTML and CSS code for a responsive landing page based on: ${prompt}. Use internal CSS only.`;
      const code = await generateCode(optimizedPrompt);
      dispatch(addMessage({ type: "ai", text: code }));
    } catch (err) {
      setError("Failed to generate code. Please try again.");
      console.log(err);
    } finally {
      setIsLoading(false);
      setPrompt("");
    }
  };

  const handleDownload = (code: string) => {
    if (!code) return;

    const blob = new Blob([code], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "generated-code.html";
    link.click();
    URL.revokeObjectURL(url);
  };

  const openPreview = (code: string) => {
    setGeneratedCode(code);
    setIsPreviewOpen(true);
  };

  const closePreview = () => setIsPreviewOpen(false);

  if (!loggedInUser) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-6">
        <div className="max-w-md text-center">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg space-y-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Welcome to Code Generator
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Please login to start chatting with our AI and generate beautiful
              landing pages!
            </p>
            <Button
              onClick={() => router.push("/auth/login")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Login to Continue
            </Button>
            <div className="flex items-center space-x-2">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-sm text-gray-400">or</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              New user?{" "}
              <span
                onClick={() => router.push("/auth/signup")}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Create an account
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-15 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 flex flex-col">
      <div className="max-w-4xl mx-auto flex-1 flex flex-col">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Chatbot for HTML & CSS Generation
        </h1>

        {/* Chat Container */}
        <div className="flex-1 flex flex-col overflow-y-auto mb-4">
          {chatMessages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              } mb-4`}
            >
              <div
                className={`max-w-[70%] p-4 rounded-lg ${
                  message.type === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                }`}
              >
                {message.type === "ai" ? (
                  <div>
                    <pre className="text-sm whitespace-pre-wrap">
                      <code>
                        {typingMessageIndex === index
                          ? typingText
                          : message.text}
                      </code>
                    </pre>
                    <div className="flex gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openPreview(message.text)}
                        className="text-xs"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Live Preview
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownload(message.text)}
                        className="text-xs"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download HTML
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p>{message.text}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed Input and Button Section */}
      <div className="w-full h-14 fixed bottom-0 left-0 bg-gray-300 dark:bg-gray-900 flex justify-center items-center">
        <div className="flex gap-2 max-w-4xl mx-auto w-full px-4">
          <Input
            type="text"
            placeholder="Enter your prompt..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGenerateCode()}
            className="flex-1 h-10"
            disabled={isLoading}
          />
          <div className="flex justify-center items-center">
            <Button onClick={handleGenerateCode} disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Generate Code"
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Pop-up Live Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-2/3 h-3/4 overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-gray-700">
              <h2 className="text-xl font-semibold">Live Preview</h2>
              <button
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                onClick={closePreview}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <iframe className="w-full h-full" srcDoc={generatedCode} />
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
