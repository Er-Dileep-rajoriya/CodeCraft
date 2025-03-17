import React from "react";
import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";

interface CodePreviewProps {
  generatedCode: string;
  isLoading: boolean;
  onShowPreview: () => void;
  onDownloadCode: () => void;
}

const CodePreview: React.FC<CodePreviewProps> = ({
  generatedCode,
  isLoading,
  onShowPreview,
  onDownloadCode,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Generated Code
        </h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onShowPreview}
            disabled={!generatedCode || isLoading}
          >
            <Eye className="h-4 w-4 mr-2" />
            Live Preview
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onDownloadCode}
            disabled={!generatedCode || isLoading}
          >
            <Download className="h-4 w-4 mr-2" />
            Download HTML
          </Button>
        </div>
      </div>
      <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto">
        <h2>HTML and CSS Code:</h2>
        <code className="text-sm text-gray-900 dark:text-white">
          {generatedCode || "// Your generated code will appear here..."}
        </code>
      </pre>
    </div>
  );
};

export default CodePreview;
