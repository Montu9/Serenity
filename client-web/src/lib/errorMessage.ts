import ServerValidationError from "@/types/ServerValidationError";

const getErrorMessage = (error: unknown): string => {
    let message: string = "";

    if (error instanceof Error) {
        message = error.message;
    } else if (error && typeof error === "object" && "status" in error) {
        switch (error.status) {
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

            default:
                message = "Unknown Error";
                break;
        }
    } else if (error && typeof error === "object" && "data" in error) {
        if (error.data && Array.isArray(error.data)) {
            error.data.forEach((element: ServerValidationError) => {
                if (element.constraints && Array.isArray(element.constraints)) {
                    message += element.constraints.join("\n ");
                }
            });
        }
    }

    return message;
};

export default getErrorMessage;
