import LoadingScreen from "@/pages/(public)/loading";
import React, { useMemo, useState } from "react";

interface IProps {
    header: boolean;
    footer: boolean;
    setHeader: (header: boolean) => void;
    setFooter: (footer: boolean) => void;
    startLoading: () => void;              // Added
    stopLoading: () => void;                // Added
    isLoading: boolean;                     // Added
}

export const LayoutContext = React.createContext<IProps>({} as IProps);

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
    const [header, setHeader] = useState<boolean>(true);
    const [footer, setFooter] = useState<boolean>(true);

    const [loadingCount, setLoadingCount] = useState<number>(0);

    // These functions control loading state (for multiple parallel actions)
    const startLoading = () => setLoadingCount((count) => count + 1);
    const stopLoading = () => setLoadingCount((count) => Math.max(0, count - 1));
    const isLoading = loadingCount > 0;

    const value: IProps = useMemo(() => {
        return {
            footer,
            header,
            setFooter,
            setHeader,
            startLoading,
            stopLoading,
            isLoading,
        };
    }, [footer, header, loadingCount]);

    return (
        <LayoutContext.Provider value={value}>
            <div style={{ position: 'relative' }}>
                {children}
                {isLoading && <LoadingScreen style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: '100%' }} />}
            </div>
        </LayoutContext.Provider>
    );
};

export const useLayout = () => React.useContext(LayoutContext);
