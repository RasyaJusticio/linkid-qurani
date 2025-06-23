import { IS_IN_IFRAME } from "@/constants/global";
import { cn } from "@/utils/cn";
import React from "react";

type AppLayoutProps = {
    children?: React.ReactNode;
    className?: string;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, className }) => {
    return <main className={cn(IS_IN_IFRAME && "mt-[70px]", className)}>
        {children}
    </main>
};

export default AppLayout;
