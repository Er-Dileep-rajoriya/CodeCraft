import React from "react";

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start">
      <div className="max-w-[80%] p-4 rounded-lg bg-gray-200 dark:bg-gray-700 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
