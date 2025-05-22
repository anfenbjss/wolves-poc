import { ComponentType, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

//import appInsights from '@/utils/appInsights';

//appInsights.trackEvent({ name: 'startup' });

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

export default function render(App: ComponentType) {
    root.render(
        <StrictMode>
            <App />
        </StrictMode>,
    );
}
