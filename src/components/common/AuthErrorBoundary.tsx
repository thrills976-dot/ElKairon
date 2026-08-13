import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ShieldAlert, RefreshCw, LogIn } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackMessage?: string;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class AuthErrorBoundary extends Component<Props, State> {
  override state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('AuthErrorBoundary caught error:', error, errorInfo);
  }

  public handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  public handleReload = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  public override render() {
    if (this.state.hasError) {
      const errorMessage = this.state.error?.message || this.props.fallbackMessage || 'An unexpected authentication or session error occurred.';

      return (
        <div className="min-h-[400px] w-full flex items-center justify-center p-6 bg-gray-50">
          <div className="bg-white rounded-3xl border border-rose-100 p-8 max-w-md w-full shadow-lg text-center space-y-6">
            <div className="w-14 h-14 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
              <ShieldAlert size={28} />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-display font-bold text-navy-900">
                Authentication Notice
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                {errorMessage}
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={this.handleReset}
                className="flex-1 py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw size={14} />
                <span>Try Again</span>
              </button>

              <button
                type="button"
                onClick={this.handleReload}
                className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-navy-900 text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <LogIn size={14} />
                <span>Reload App</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
