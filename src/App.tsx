import { useEffect, useState } from 'react';
import { Key, Radio, RadioGroup } from 'react-aria-components';

import * as XLSX from 'xlsx';

import manifest from '@/../manifest.json';
import withErrorBoundary from '@/hocs/withErrorBoundary';
import '@/styles/react-aria/RadioGroup.css';

import './App.css';
import Page from './layouts/Page';
import TopBar from './layouts/TopBar';

type Sheet = {
    name: string;
    rows: unknown[];
};

function App() {
    const [selectedTabId, setSelectedTabId] = useState<Key>('page-0');
    const [loadedPages, setLoadedPages] = useState<Set<Key>>(
        new Set(['page-0']),
    );
    const [sheets, setSheets] = useState<Sheet[]>([]);
    const [lastModifiedDate, setLastModifiedDate] = useState<string | null>(
        null,
    );
    //const [isRtl, setIsRtl] = useState(false);

    useEffect(() => {
        async function readXLSXFromAsset() {
            const response = await fetch('/wolves-poc/data.xlsx');
            const arrayBuffer = await response.arrayBuffer();

            const data = new Uint8Array(arrayBuffer);
            const workbook = XLSX.read(data, { type: 'array' });

            setSheets([]);

            workbook.SheetNames.map((name) => {
                const sheet = workbook.Sheets[name];
                const json = XLSX.utils.sheet_to_json(sheet, {
                    defval: '',
                });
                setSheets((prev) => [
                    ...prev,
                    {
                        name,
                        rows: json,
                    },
                ]);
            });

            console.log(sheets);
        }

        console.log(navigator.language);
        readXLSXFromAsset();
    }, []);

    useEffect(() => {
        fetch('/wolves-poc/data.xlsx', {
            method: 'HEAD',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const lastModified = response.headers.get('Last-Modified');
                console.log('Last Modified Date:', lastModified);
                setLastModifiedDate(lastModified);
            })
            .catch((error) => {
                console.error('Error fetching file metadata:', error);
            });
    }, []);

    const onTabChange = (key: Key) => {
        setSelectedTabId(key);
        setLoadedPages((prev) => new Set(prev).add(key));
    };

    return (
        <>
            <title>{manifest.name}</title>
            {/* <TopBar selectedTabId={selectedTabId} onTabChange={onTabChange} />
            <Page loadedPages={loadedPages} selectedPageId={selectedTabId} /> */}

            <h3 className="last-modified">data.xlsx Last Modified:</h3>
            <p className="last-modified">{lastModifiedDate}</p>

            {/* <div className="language-direction">
                <h2>Language Direction</h2>
                <RadioGroup
                    value={isRtl.toString()}
                    onChange={(val) => setIsRtl(val === 'true')}
                    aria-label="Language Direction"
                >
                    <Radio value="false">LTR</Radio>
                    <Radio value="true">RTL</Radio>
                </RadioGroup>
            </div> */}

            {sheets.map((sheet, index) => (
                <div key={index}>
                    <h3>{sheet.name}</h3>
                    <table>
                        <thead>
                            <tr>
                                {sheet.rows &&
                                    Object.keys(sheet.rows[0]).map((key) => (
                                        <th key={key}>{key}</th>
                                    ))}
                            </tr>
                        </thead>
                        <tbody>
                            {sheet.rows &&
                                sheet.rows.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {Object.values(row).map(
                                            (value, colIndex) => {
                                                const isRtl =
                                                    Object.keys(sheet.rows[0])[
                                                        colIndex
                                                    ] == 'he';

                                                return (
                                                    <td
                                                        key={colIndex}
                                                        dir={
                                                            isRtl
                                                                ? 'rtl'
                                                                : 'ltr'
                                                        }
                                                        style={{
                                                            minWidth:
                                                                index > 0 &&
                                                                colIndex < 2
                                                                    ? '30px'
                                                                    : '',
                                                        }}
                                                    >
                                                        {value}
                                                    </td>
                                                );
                                            },
                                        )}
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </>
    );
}

const AppWithErrorBoundary = withErrorBoundary(App);
export default AppWithErrorBoundary;
