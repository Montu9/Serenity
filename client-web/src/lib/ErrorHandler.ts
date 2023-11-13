import PrepError from "@/types/PrepError";
import RetrivedError from "@/types/RetrivedError";

export class ErrorHandler {
    constructor(private error: PrepError) {}

    getErrorFromCV(): RetrivedError {
        const errorClassValidator = this.error.data as {
            status?: string;
            data?: [{ property: string; constraints: string[] }];
        };
        if (errorClassValidator?.status === "fail" && errorClassValidator?.data !== undefined) {
            return { status: this.error.status, data: errorClassValidator.data };
        } else {
            return { status: undefined };
        }
    }

    getErrorFromHTTP(): RetrivedError {
        const httpError: RetrivedError = { status: this.error.status, data: undefined };
        switch (this.error.status) {
            case 400:
                httpError.message = "Bad Request";
                break;
            case 401:
                httpError.message = "Unauthorized";
                break;
            case 403:
                httpError.message = "Forbidden";
                break;
            case 404:
                httpError.message = "Not Found";
                break;
            case 409:
                httpError.message = "Already Exists";
                break;
            case 500:
                httpError.message = "Internal Server Error";
                break;
            case 503:
                httpError.message = "Service Unavailable";
                break;
            default:
                httpError.message = "Unknown Error";
                break;
        }
        return httpError;
    }

    getRetrivedError(): RetrivedError {
        if (this.getErrorFromCV().status !== undefined) {
            return this.getErrorFromCV();
        }

        if (this.getErrorFromHTTP().message !== undefined) {
            return this.getErrorFromHTTP();
        }
        return { status: 500, data: undefined, message: "Undefined error" };
    }
}
