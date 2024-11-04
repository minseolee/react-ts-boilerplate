import React, { createContext, useEffect, useState } from "react";

import logger from "../../common/utils/logger";

import type { FC, ReactNode } from "react";

interface LoaderContextType {
	isLoading: boolean;
	setIsLoading: (d: boolean) => void;
}

const LoaderContext = createContext<LoaderContextType>({
    isLoading: false,
    setIsLoading: (d) => { return d; },
});

interface Props { children: ReactNode; }
const LoaderProvider: FC<Props> = ({ children }) => {
    const [bln, setBln] = useState<LoaderContextType['isLoading']>(false);

    useEffect(() => {
        logger('GLOBAL LoaderProvider: ', bln);
    } ,[bln]);

    const setIsLoading = (b: boolean) => {
        setBln(b);
    };

    return (
        <LoaderContext.Provider
            value={{
                isLoading: bln,
                setIsLoading,
            }}
        >
            { children }
        </LoaderContext.Provider>
    );
};

export { LoaderProvider, LoaderContext };
