import { FC } from 'react';

import withSuspense from '@/hocs/withSuspense';

type Route = {
    path: string;
    title: string;
    Component: FC;
};

// When tabs are clicked and the page is rendered, they stay in memory here in routes[].Component
const routes: Route[] = [
    {
        path: '/profile',
        title: 'Profile',
        Component: withSuspense(() => import('@/pages/Profile')),
    },
];

export default routes;
