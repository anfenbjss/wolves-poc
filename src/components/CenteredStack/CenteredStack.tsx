import { ReactNode } from 'react';

import './CenteredStack.css';

type Props = {
    children: ReactNode;
    className?: string;
};

export default function CenteredStack({ children, className }: Props) {
    return <div className={`centered-stack ${className}`}>{children}</div>;
}
