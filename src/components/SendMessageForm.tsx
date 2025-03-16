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
    <div className="flex gap-2">
      <Input
        type="text"
        placeholder="Enter your prompt..."
        value={userInput}
        onChange={onInputChange}
        onKeyDown={(e) => e.key === "Enter" && onSendMessage()}
        className="flex-1"
        disabled={isLoading}
      />
      <Button onClick={onSendMessage} disabled={isLoading}>
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send"}
      </Button>
    </div>
  );
};

export default SendMessageForm;
