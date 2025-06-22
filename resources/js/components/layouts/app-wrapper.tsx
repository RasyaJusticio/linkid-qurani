import React from "react";
import IFrameGuard from "./iframe-guard";

type AppWrapperProps = {
    children?: React.ReactNode
};

const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
    return <IFrameGuard>{children}</IFrameGuard>;
}

export default AppWrapper;
