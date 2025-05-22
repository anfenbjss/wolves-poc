import { ProgressBar } from 'react-aria-components';

import '@/styles/react-aria/ProgressBar.css';

import './Loading.css';

export default function Loading() {
    return (
        <ProgressBar
            isIndeterminate
            className={'react-aria-ProgressBar loading-bar'}
            data-testid={'loading-bar'}
            aria-label={'loading-bar'}
        >
            <div className="bar">
                <div className="fill" />
            </div>
        </ProgressBar>
    );
}
