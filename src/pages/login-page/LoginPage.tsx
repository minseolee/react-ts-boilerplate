import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import APP_ROUTE from "../../_app/config/route";

import S from './LoginPage.module.css';

import type { GFC } from "../../common/types/fc";


const LoginPage: GFC = ({ connector }) => {
    const [account, setAccount] = useState({
        accountID: '', password: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const eventKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                handleLogin();
            }
        };

        window.addEventListener('keydown', eventKeyDown);

        return () => {
            window.removeEventListener('keydown', eventKeyDown);
        };
    }, [account]);

    const handleChangeId = (e: any) => {
        setAccount((prev) => ({
            ...prev,
            accountID: e.target.value
        }));
    };

    const handleChangePw = (e: any) => {
        setAccount((prev) => ({
            ...prev,
            password: e.target.value
        }));
    };

    const handleLogin = () => {
        if (!connector) return;

        void (async () => {
            try {
                // TODO:: type interface on login
                const response = await connector.login<any, any>(account);

                if(response.accountID) {
                    navigate(APP_ROUTE.MAIN);
                }
                localStorage.setItem('accountType', response.accountType);
            } catch (e) {
                console.error(e);
            }
        })();
    };

    return (
        <div className={S['container']}>
            <span className={'mb-4'}>ASDF<br/><b className={'bold'}>ZXCV QWER</b></span>
            <input onChange={handleChangeId} placeholder={'ID'} />
            <input onChange={handleChangePw} placeholder={'Password'} type={'password'} />
            <div className={S['btn-area']}>
                <button className={S['login-btn']} onClick={handleLogin}
                >Login</button>
            </div>
        </div>
    );
};

export default LoginPage;