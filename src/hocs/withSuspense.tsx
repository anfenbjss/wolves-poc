import { ComponentType, Suspense, lazy } from 'react';

import Loading from '@/components/Loading';

type LazyComponent = () => Promise<{ default: ComponentType<object> }>;

export default function withSuspense(child: LazyComponent) {
    const Component = lazy(child);

    return function () {
        return (
            <Suspense fallback={<Loading />}>
                <Component />
            </Suspense>
        );
    };
}
