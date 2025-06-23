import { IS_IN_IFRAME } from '@/constants/global';
import React from 'react';

type IFrameGuardProps = {
    children: React.ReactNode;
};

const APP_ENV = import.meta.env.VITE_ENV ?? 'DEV';

const isInsideIFrame = IS_IN_IFRAME || APP_ENV === 'DEV';

if (!isInsideIFrame) {
    window.location.replace(route('redirect'));
}

const IFrameGuard: React.FC<IFrameGuardProps> = ({ children }) => {
    if (!isInsideIFrame) {
        return <></>;
    }

    return <>{children}</>;
};

export default IFrameGuard;
