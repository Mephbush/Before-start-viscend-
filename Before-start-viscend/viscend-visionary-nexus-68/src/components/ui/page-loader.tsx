import { cn } from '@/lib/utils';

interface PageLoaderProps {
  isLoading: boolean;
  onComplete?: () => void;
}

const PageLoader = ({ isLoading }: PageLoaderProps) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm">
      <div className="text-center space-y-4">
        {/* Simple Logo Text */}
        <div className="animate-pulse">
          <div className="text-3xl font-bold text-primary mb-2">
            VisCend
          </div>
        </div>

        {/* Clean Loading Animation */}
        <div className="flex justify-center">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground">جاري التحميل...</p>
      </div>
    </div>
  );
};

export default PageLoader;