import { useEffect, useState } from 'react';
import toast, { Toaster } from "react-hot-toast";
import { Routes, Route, useNavigate } from "react-router-dom";

import BottomSheet from "../components/bottom-sheet/BottomSheet";
import Header from "../components/header/Header";
import Loader from "../components/loader/Loader";
import { BSProvider } from "../contexts/bottom-sheet";
import { LoaderProvider } from "../contexts/loader";
import Connector from "../instances/Connector";
import LoginPage from "../pages/login-page/LoginPage";
import MainPage from "../pages/main-page/MainPage";

import S from './App.module.css';
import APP_ROUTE from "./config/route";
import Wrapper from "./modules/wrapper/Wrapper";



function App() {
    const [login, setLogin] = useState<boolean>(() => {
        // return localStorage.getItem('login') === 'true';
        return true;
    });

    const [connector, setConnector] = useState<Connector>(new Connector(setLogin));
    const navigator = useNavigate();


    useEffect(() => {
        if (!connector) setConnector(new Connector(setLogin));
    }, []);

    useEffect(() => {
        if (!login && window.location.pathname !== APP_ROUTE.LOGIN) {
            toast('⚠️ Unauthorized');
            navigator(APP_ROUTE.LOGIN);
            return;
        }

        if (login && window.location.pathname === APP_ROUTE.LOGIN) {
            toast(`✅ Successfully signed in`);
            navigator(APP_ROUTE.MAIN);
            return;
        }
    }, [login]);
    
    return (
        <LoaderProvider>
            <BSProvider>
                <div className={"App"}>
                    <Toaster />
                    <Wrapper connector={connector}>
                        {
                            login && <Header connector={connector} />
                        }
                        <article className={S['page-container']}>
                            <Routes>
                                <Route path={APP_ROUTE.MAIN} element={<MainPage connector={connector} />} />
                                <Route path={APP_ROUTE.LOGIN} element={<LoginPage connector={connector} />} />
                            </Routes>
                        </article>
                    </Wrapper>
                </div>
                <Loader />
                <BottomSheet />
            </BSProvider>
        </LoaderProvider>
    );
}

export default App;
