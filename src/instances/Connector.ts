import { HTTP_METHOD } from "../common/types/http";
import { RES_STATUS } from "../common/types/http";

import { fetchData, fetchRaw, fetchWithHeaders } from "../common/utils/api";

import type { Dispatch, SetStateAction } from "react";


type LoginInstance = Dispatch<SetStateAction<boolean>>;

class Connector {
    private setLoginInstance: LoginInstance;

    constructor(setLogin: LoginInstance) {
        this.setLoginInstance = setLogin;
    }

    async checkSession(status: number) {
        if (status === RES_STATUS.UNAUTH) await this.logout();
    }

    getIsAdmin(): boolean {
        return localStorage.getItem('accountType') === 'Admin';
    }

    async login<REQ, RES>(payload?: any): Promise<RES> {
        const postRequest = await fetchData<REQ, RES>('/user/login/check-account-by-query', HTTP_METHOD.POST, payload);
        if (postRequest.status === RES_STATUS.OK) {
            this.setLoginInstance(true);
            localStorage.setItem('login', 'true');
        }
        return postRequest.json;
    }

    async logout(): Promise<void> {
        this.setLoginInstance(false);
        localStorage.removeItem('login');
        localStorage.removeItem('accountType');
        await fetchData('/user/logout/delete-session', HTTP_METHOD.POST);
        window.location.href = '/login';
    }

    async get<RES>(url: string): Promise<RES> {
        const getRequest = await fetchData<{}, RES>(url, HTTP_METHOD.GET);
        await this.checkSession(getRequest.status);
        return getRequest.json;
    }

    async getRaw(url: string): Promise<Response> {
        const getRawRequest = await fetchRaw(url, HTTP_METHOD.GET);
        await this.checkSession(getRawRequest.status);
        return getRawRequest;
    }
	
    async post<REQ, RES>(url: string, payload?: any): Promise<RES> {
        const postRequest = await fetchData<REQ, RES>(url, HTTP_METHOD.POST, payload);
        await this.checkSession(postRequest.status);
        return postRequest.json;
    }

    async postRaw<REQ, RES>(url: string, payload: any, headers: HeadersInit): Promise<RES> {
        const postRequest = await fetchWithHeaders<REQ, RES>(url, HTTP_METHOD.POST, payload, headers);
        await this.checkSession(postRequest.status);
        return postRequest.json;
    }
}

export default Connector;
