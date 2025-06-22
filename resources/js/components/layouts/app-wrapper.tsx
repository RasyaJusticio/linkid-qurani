import { EventsHandlerProvider } from '@/context/EventsHandler';
import React from 'react';
import IFrameGuard from './iframe-guard';

type AppWrapperProps = {
    children?: React.ReactNode;
};

const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
    return (
        <IFrameGuard>
            <EventsHandlerProvider>{children}</EventsHandlerProvider>
        </IFrameGuard>
    );
};

export default AppWrapper;
