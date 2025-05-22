import { Key, Tab, TabList, Tabs } from 'react-aria-components';

import routes from '@/routes';
import '@/styles/react-aria/Button.css';
import '@/styles/react-aria/Tabs.css';

import './TopBar.css';

type Props = {
    selectedTabId: Key;
    onTabChange: (key: Key) => void;
};

export default function TopBar({ selectedTabId, onTabChange }: Props) {
    return (
        <header className="app-bar">
            <div className="toolbar">
                <div className="toolbar-left">
                    <Tabs
                        selectedKey={selectedTabId}
                        onSelectionChange={onTabChange}
                    >
                        <TabList>
                            {routes.map((tab, index) => (
                                <Tab
                                    id={`page-${index}`}
                                    key={index}
                                    className={'react-aria-Tab top-bar-tab'}
                                >
                                    {tab.title}
                                </Tab>
                            ))}
                        </TabList>
                    </Tabs>
                </div>
                <div className="toolbar-right"></div>
            </div>
        </header>
    );
}
