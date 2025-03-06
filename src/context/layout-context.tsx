import LoadingScreen from "@/pages/(public)/loading";
import React, { useMemo, useState } from "react";

interface IProps {
    header : boolean
    footer : boolean
    setHeader : (header : boolean) => void
    setFooter : (footer : boolean) => void
}

export const LayoutContext = React.createContext<IProps>({} as IProps);

export const LayoutProvider = ({ children } : { children: React.ReactNode }) => {
    const [header, setHeader] = useState<boolean>(true);
    const [footer, setFooter] = useState<boolean>(true);
    const [loading, setLoading] = useState(true);

    const changeHeader = (header : boolean) => {
        setHeader(header);
    }

    const changeFooter = (footer : boolean) => {
        setFooter(footer);
    }


    const value: IProps = useMemo(() => {
        return {
            footer : footer,
            header : header,
            setFooter : changeFooter,
            setHeader : changeHeader
        };
    }, [footer, header, changeFooter, changeHeader]);


    return (
        <LayoutContext.Provider value={value}>
            {children}
        </LayoutContext.Provider>
    );
};

export const useLayout = () => React.useContext(LayoutContext);
