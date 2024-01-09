import { getErrorFromHTTP } from "@/lib/getErrorFromHttp";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useEffect, useState } from "react";

interface RetrivedError {
    status?: string;
    statusCode?: number;
    message?: string;
    error?: string;
    data?: [{ property: string; constraints: string[] }];
}

interface ErrorSchema {
    property: string;
    constraints: string[];
}

const useFetchError = (error: FetchBaseQueryError | SerializedError | undefined) => {
    const [errorData, setErrorData] = useState<ErrorSchema[] | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        setErrorMessage(null);
        setErrorData(null);

        // Check for FetchBaseQueryError
        if (error && "data" in error && error.data) {
            const retrivedError = error.data as RetrivedError;
            // Class validator error handler
            if (retrivedError?.status && retrivedError.status === "fail") {
                if (retrivedError?.data) {
                    setErrorData(retrivedError.data);
                } else {
                    setErrorData([{ property: "", constraints: [] }]);
                }
            }

            // NestJs Error message handler
            if (retrivedError?.message) {
                setErrorMessage(retrivedError.message);
            } else if (retrivedError?.statusCode) {
                setErrorMessage(getErrorFromHTTP(retrivedError.statusCode));
            }

            // Prisma and others
        } else if (error && "status" in error && error.status) {
            setErrorMessage(getErrorFromHTTP(error.status));
        } else if (error && error !== null && error !== undefined) {
            setErrorMessage("Something went wrong. Try again later.");
        }
    }, [error]);

    return { errorMessage, errorData };
};

export default useFetchError;
