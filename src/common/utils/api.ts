import type { HttpMethod } from "../types/http";


const DEV_API_URL = '';
const PROD_API_URL = '';

const API_URL = DEV_API_URL;

/**
 * @name fetchData
 * @param url   url for fetch
 * @param method    method for fetch
 * @param payload   payload for fetch
 * @description Returns object with json and status code only.
 */
async function fetchData<REQ, RES> (
    url: string,
    method: HttpMethod,
    payload?: REQ,
): Promise<{ status: number, json: RES }> {
    let response: Response;
    let json: RES;
    let status: number;
	
    try {
        response = await fetch(`${API_URL}/api${url}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(payload)
        });
        status = response.status;
        json = await response.json() as RES;
    } catch (e) {
        console.error(e);
        throw e;
    }

    return { status, json };
}


/**
 * @name fetchRaw
 * @param url   url for fetch
 * @param method    method for fetch
 * @param payload   payload for fetch
 * @description Returns Raw fetched data
 */
async function fetchRaw<REQ, RES> (
    url: string,
    method: HttpMethod,
    payload?: REQ,
): Promise<Response> {
    let response: Response;

    try {
        response = await fetch(`${API_URL}/api${url}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(payload)
        });
    } catch (e) {
        console.error(e);
        throw e;
    }

    return response;
}


/**
 * @name fetchWithHeaders
 * @param url   url for fetch
 * @param method    method for fetch
 * @param payload   payload for fetch
 * @param headers   headers for fetch
 * @description Returns Raw fetched data
 */
async function fetchWithHeaders<REQ, RES> (
    url: string,
    method: HttpMethod,
    payload: REQ,
    headers: HeadersInit
): Promise<{ status: number, json: RES }> {
    let response: Response;
    let json: RES;
    let status: number;

    try {
        const options: RequestInit = {
            method,
            headers,
            credentials: 'include',
        };

        if (payload instanceof FormData) {
            options.body = payload;
            // @ts-ignore
            delete options.headers['Content-Type'];
        } else if (typeof payload === 'object') {
            options.body = JSON.stringify(payload);
            // @ts-ignore
            options.headers['Content-Type'] = 'application/json';
        }

        response = await fetch(`${API_URL}/api${url}`, options);
        status = response.status;
        json = await response.json() as RES;
    } catch (e) {
        console.error(e);
        throw e;
    }

    return { status, json };
}

export { fetchData, fetchRaw, fetchWithHeaders };
