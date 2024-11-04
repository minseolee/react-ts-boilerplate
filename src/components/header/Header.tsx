import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import APP_ROUTE from "../../_app/config/route";

import S from './Header.module.css';

import type { GFC } from "../../common/types/fc";
import type { JSX } from "react";


const DefaultHeader: GFC = ({ connector }) => {
    const handleLogout = () => {
        if (!connector) return;

        void (async () => {
            try {
                await connector.logout();
            } catch (e) {
                console.error(e);
            }
        })();
    };

    return (
        <div className={S['default-container']}>
            <Link to={APP_ROUTE.MAIN}>
                <img src={''} />
            </Link>
            <div className={S['button-area']}>
                <button className={S['button-logout']} onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
};

const Header: GFC = ({ connector }) => {
    const [returnEl, setReturnEl] = useState<JSX.Element>(<></>);
    const location = useLocation();

    useEffect(() => {
        // const { pathname } = location;
        setReturnEl(<DefaultHeader connector={connector} />);
    }, [location]);

    
    return (
        <header className={S['container']}>
            {returnEl}
        </header>
    );
};

export default Header;
