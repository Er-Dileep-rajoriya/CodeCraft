import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

interface SendMessageFormProps {
  userInput: string;
  isLoading: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSendMessage: () => void;
}

const SendMessageForm: React.FC<SendMessageFormProps> = ({
  userInput,
  isLoading,
  onInputChange,
  onSendMessage,
}) => {
  return (
    <div className="w-full h-14 fixed bottom-0 rounded-sm left-0 bg-gray-300 dark:bg-gray-900 flex justify-center items-center ">
      <div className="flex gap-2 max-w-4xl mx-auto w-full">
        <Input
          type="text"
          placeholder="Enter your prompt..."
          value={userInput}
          onChange={onInputChange}
          onKeyDown={(e) => e.key === "Enter" && onSendMessage()}
          className="flex-1 h-10"
          disabled={isLoading}
        />
        <div className="flex justify-center items-center">
          <Button onClick={onSendMessage} disabled={isLoading}>
            {isLoading ? <Loader2 className="h-10 w-4 animate-spin" /> : "Send"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SendMessageForm;
