import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Card } from "../ui/card";

export const LoadingError = () => {
    return (
        <Card className="py-6 px-4 max-w-xs">
            <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight flex-1">Error</h1>
            <p className="max-w-2xl mb-4 text-sm text-justify text-muted-foreground leading-7">
                Oops! Something went wrong while fetching the data from our server. Please check your internet
                connection and try again. If the issue persists, feel free to contact our support team for assistance.
                We apologize for the inconvenience.
            </p>

            <Link to="/" className="w-full md:w-max">
                <Button type="button">
                    <ArrowLeftIcon />
                    Back to safety
                </Button>
            </Link>
        </Card>
    );
};
