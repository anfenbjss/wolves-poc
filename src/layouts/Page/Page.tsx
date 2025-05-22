import { Key } from 'react-aria-components';

import routes from '@/routes';

type Props = {
    loadedPages: Set<Key>;
    selectedPageId: Key;
};

export default function Page({ loadedPages, selectedPageId }: Props) {
    return (
        <div>
            {routes.map(({ Component }, index) => {
                const pageId = 'page-' + index;

                return loadedPages.has(pageId) ? (
                    <div
                        key={index}
                        style={{
                            display:
                                selectedPageId === pageId ? 'block' : 'none',
                        }}
                    >
                        <Component />
                    </div>
                ) : null;
            })}
        </div>
    );
}
