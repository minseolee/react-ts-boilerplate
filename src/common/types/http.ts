const HTTP_METHOD = Object.freeze({
    GET: 'GET',
    POST: 'POST'
} as const);
const RES_STATUS = Object.freeze({
    OK: 200,
    UNAUTH: 401
} as const);

type HttpMethod = typeof HTTP_METHOD[keyof typeof HTTP_METHOD];

export {
    HTTP_METHOD,
    RES_STATUS
};

export type {
    HttpMethod
};