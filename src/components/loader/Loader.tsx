import { useContext } from "react";

import { LoaderContext } from "../../contexts/loader";

import S from './Loader.module.css';

import type { FC } from "react";

const Loader: FC = () => {
    const { isLoading } = useContext(LoaderContext);

    return (
        isLoading ? (
            <div className={S.loaderContainer}>
                <div className={S.loaderText}>Loading</div>
                <div className={S.loader}>
                    <div className={S.loaderBar}></div>
                </div>
            </div>
        ) : null
    );
};

export default Loader;