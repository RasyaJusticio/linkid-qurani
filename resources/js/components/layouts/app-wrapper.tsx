import { EventsHandlerProvider } from '@/context/EventsHandler';
import React, { useEffect } from 'react';
import IFrameGuard from './iframe-guard';
import { router } from '@inertiajs/react';
import { postMessage } from '@/utils/postMessage';

type AppWrapperProps = {
    children?: React.ReactNode;
};

const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
    useEffect(() => {
        const removeOnPageSuccess = router.on('success', (event) => {
            console.log(event.detail.page.url);
            postMessage('POST', 'route_change', { path: event.detail.page.url });
        });

        return () => {
            removeOnPageSuccess();
        }
    }, []);

    return (
        <IFrameGuard>
            <EventsHandlerProvider>{children}</EventsHandlerProvider>
        </IFrameGuard>
    );
};

export default AppWrapper;
