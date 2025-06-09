
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Error boundary for unhandled errors
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

window.addEventListener('error', (event) => {
  console.error('Unhandled error:', event.error);
});

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(<App />);
