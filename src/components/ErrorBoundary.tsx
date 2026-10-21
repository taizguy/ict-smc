import React, { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught component error:', error, errorInfo);
  }

  public handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-surface-muted text-ink-secondary flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-surface-muted border border-line rounded-xl p-6 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-50/60 border border-rose-800/80 flex items-center justify-center mx-auto text-rose-700">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold font-sans tabular-nums text-ink">Something went wrong</h2>
            <p className="text-xs text-ink-muted font-sans leading-relaxed">
              The application encountered an unexpected state. You can reload the view to continue learning.
            </p>
            {this.state.error?.message && (
              <div className="p-3 rounded bg-surface-muted border border-line text-[0.8125rem] font-sans tabular-nums text-rose-700 text-left overflow-x-auto">
                {this.state.error.message}
              </div>
            )}
            <button
              onClick={this.handleReset}
              className="w-full py-2.5 px-4 rounded-lg bg-cyan-500 hover:bg-cyan-700 text-on-brand font-sans tabular-nums font-bold text-xs flex items-center justify-center gap-2 transition-[color,background-color,border-color,box-shadow,opacity,transform] shadow-lg shadow-cyan-500/10"
            >
              <RefreshCw className="w-4 h-4" />
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

