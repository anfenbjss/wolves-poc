import React, { ErrorInfo, ReactNode } from 'react';
import { Button } from 'react-aria-components';

import '@/styles/react-aria/Button.css';

import CenteredStack from '../CenteredStack';

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
}

export default class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_error: Error) {
        // Update state so next render shows fallback UI
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // Log the error if needed
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <CenteredStack>
                    <Button
                        onPress={() => window.location.reload()}
                        style={{ cursor: 'pointer' }}
                    >
                        An error occurred, click to reload
                    </Button>
                </CenteredStack>
            );
        }

        return this.props.children;
    }
}
