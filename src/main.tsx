import { createRoot } from 'react-dom/client';
import App from './components/App/App';

const domNode = document.getElementById('app');

if(domNode) {
  const root = createRoot(domNode);

  root.render(<App />);
}