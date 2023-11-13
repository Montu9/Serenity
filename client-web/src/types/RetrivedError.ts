interface RetrivedError {
    status?: number;
    data?: [{ property: string; constraints: string[] }];
    message?: string;
}

export default RetrivedError;
