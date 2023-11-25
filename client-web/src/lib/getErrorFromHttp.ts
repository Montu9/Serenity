export const getErrorFromHTTP = (
    httpErrorCode: number | "FETCH_ERROR" | "PARSING_ERROR" | "TIMEOUT_ERROR" | "CUSTOM_ERROR"
) => {
    let message: string;
    switch (httpErrorCode) {
        case 400:
            message = "Bad Request";
            break;
        case 401:
            message = "Unauthorized";
            break;
        case 403:
            message = "Forbidden";
            break;
        case 404:
            message = "Not Found";
            break;
        case 409:
            message = "Already Exists";
            break;
        case 500:
            message = "Internal Server Error";
            break;
        case 503:
            message = "Service Unavailable";
            break;
        case "FETCH_ERROR":
            message = "Error while fetching data";
            break;
        case "PARSING_ERROR":
            message = "Error while parsing data";
            break;
        case "TIMEOUT_ERROR":
            message = "Server is not responding correctly";
            break;
        case "CUSTOM_ERROR":
            message = "Unknown error while fetching data";
            break;
        default:
            message = "Unknown Error";
            break;
    }
    return message;
};
