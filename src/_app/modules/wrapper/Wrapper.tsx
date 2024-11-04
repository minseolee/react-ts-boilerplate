import { useContext } from "react";

import { BSContext } from "../../../contexts/bottom-sheet";
import { LoaderContext } from "../../../contexts/loader";

import S from './Wrapper.module.css';

import type { GFCWithProp } from "../../../common/types/fc";
import type { ReactNode } from "react";


interface Props { children: ReactNode; }

// NEEDED TO USE CONTEXTS
const Wrapper: GFCWithProp<Props> = ({ connector, children }) => {
    const { bSElement } = useContext(BSContext);
    const { isLoading } = useContext(LoaderContext);

    return (
        <div className={bSElement || isLoading ? S['opct'] : ''}>
            {children}
        </div>
    );
};

export default Wrapper;
