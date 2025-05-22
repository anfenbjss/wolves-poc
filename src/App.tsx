import { useEffect, useState } from 'react';
import { Key } from 'react-aria-components';

import * as XLSX from 'xlsx';

import manifest from '@/../manifest.json';
import withErrorBoundary from '@/hocs/withErrorBoundary';

import Page from './layouts/Page';
import TopBar from './layouts/TopBar';

function App() {
    const [selectedTabId, setSelectedTabId] = useState<Key>('page-0');
    const [loadedPages, setLoadedPages] = useState<Set<Key>>(
        new Set(['page-0']),
    );

    useEffect(() => {
        console.log(navigator.language);
        readXLSXFromAsset();
    }, []);

    async function readXLSXFromAsset() {
        const response = await fetch('/data.xlsx');
        const arrayBuffer = await response.arrayBuffer();

        const data = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
            defval: '',
        });
        console.log(jsonData);
    }

    const onTabChange = (key: Key) => {
        setSelectedTabId(key);
        setLoadedPages((prev) => new Set(prev).add(key));
    };

    return (
        <>
            <title>{manifest.name}</title>
            <TopBar selectedTabId={selectedTabId} onTabChange={onTabChange} />
            <Page loadedPages={loadedPages} selectedPageId={selectedTabId} />
        </>
    );
}

const AppWithErrorBoundary = withErrorBoundary(App);
export default AppWithErrorBoundary;
