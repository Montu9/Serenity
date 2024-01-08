import missingPageImg from "@/assets/svg/5.svg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Missing = () => {
    return (
        <div className="h-full w-full min-h-screen min-w-screen flex items-center justify-center">
            <div className="container relative lg:h-fit lg:min-h-[700px] flex-col items-center justify-center grid h-full min-h-screen lg:w-10/12 lg:grid-cols-2 lg:px-0">
                <div className="relative hidden h-full flex-col p-10 text-white dark:border-r lg:flex">
                    <div
                        className="absolute inset-0  bg-cover bg-center rounded-xl"
                        style={{ backgroundImage: `url(${missingPageImg})` }}
                    />
                </div>
                <div>
                    <h1 className="scroll-m-20 text-8xl font-extrabold tracking-tight lg:text-9xl flex-1">#404</h1>
                    <p className="max-w-2xl mb-4 text-base text-justify text-muted-foreground md:text-lg leading-7">
                        Oops! It seems like the page you're looking for is missing. Don't worry, here are a few things
                        you can try:
                        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                            <li>
                                <p className="leading-7 [&:not(:first-child)]:mt-6">
                                    Check the URL for any typos or errors.
                                </p>
                            </li>
                            <li>
                                <p className="leading-7 [&:not(:first-child)]:mt-6">
                                    Go back to the homepage and navigate from there.
                                </p>
                            </li>
                            <li>
                                <p className="leading-7 [&:not(:first-child)]:mt-6">
                                    Contact our support team for assistance.
                                </p>
                            </li>
                        </ul>
                        We apologize for the inconvenience.
                    </p>

                    <Link to="/" className="w-full md:w-max">
                        <Button type="button" className="px-8 py-6 w-full md:w-max">
                            Back to safety
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
