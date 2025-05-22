import { ApplicationInsights } from '@microsoft/applicationinsights-web';

import manifest from '@/../manifest.json';

const appInsights = new ApplicationInsights({
    config: {
        connectionString: import.meta.env.VITE_APP_INSIGHTS_CONN_STRING,
    },
});
appInsights.loadAppInsights();
appInsights.trackPageView({ name: manifest.name }); // Manually call trackPageView to establish the current user/session/pageview

export default appInsights;
