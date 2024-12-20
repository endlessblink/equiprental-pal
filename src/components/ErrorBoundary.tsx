import React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error);
    console.error('Component stack:', errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50" dir="rtl">
          <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-red-600 mb-2">שגיאה בטעינת האפליקציה</h2>
              <p className="text-gray-600 mb-4">מצטערים, אירעה שגיאה בטעינת האפליקציה.</p>
              <pre className="text-sm bg-gray-100 p-4 rounded overflow-auto max-h-40">
                {this.state.error?.message}
              </pre>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                טען מחדש
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
