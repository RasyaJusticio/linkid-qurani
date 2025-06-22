import { IS_IN_IFRAME } from '@/constants/global';
import { EventsHandlerProvider } from '@/context/EventsHandler';
import { postMessage } from '@/utils/postMessage';
import { router } from '@inertiajs/react';
import React, { useEffect } from 'react';
import IFrameGuard from './iframe-guard';

type AppWrapperProps = {
    children?: React.ReactNode;
};

const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
    useEffect(() => {
        const removeOnPageSuccess = router.on('success', (event) => {
            if (IS_IN_IFRAME) {
                postMessage('POST', 'route_change', { path: event.detail.page.url });
            }
        });

        return () => {
            removeOnPageSuccess();
        };
    }, []);

    if (IS_IN_IFRAME) {
        return (
            <IFrameGuard>
                <EventsHandlerProvider>{children}</EventsHandlerProvider>
            </IFrameGuard>
        );
    } else {
        return <EventsHandlerProvider>{children}</EventsHandlerProvider>;
    }
};

export default AppWrapper;
