import { ComponentType } from 'react';

import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';

export default function withErrorBoundary<P extends object>(
    Component: ComponentType<P>,
) {
    return (props: P) => {
        return (
            <ErrorBoundary>
                <Component {...(props as P)} />
            </ErrorBoundary>
        );
    };
}
