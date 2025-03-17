import React from "react";
import { X } from "lucide-react";

interface LivePreviewModalProps {
  generatedCode: string;
  onClose: () => void;
}

const LivePreviewModal: React.FC<LivePreviewModalProps> = ({
  generatedCode,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-4xl p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <X className="h-5 w-5 text-gray-900 dark:text-white" />
        </button>

        {/* Modal Content */}
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Live Preview
        </h2>
        <iframe
          srcDoc={generatedCode}
          className="w-full h-[80vh] border border-gray-200 dark:border-gray-700 rounded-lg"
        />
      </div>
    </div>
  );
};

export default LivePreviewModal;
