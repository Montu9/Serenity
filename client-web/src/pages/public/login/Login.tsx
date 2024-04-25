import loginImg from "@/assets/images/login.png";
import paperClip from "@/assets/images/paper_clip.png";
import logo from "@/assets/svg/logo.svg";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Link } from "react-router-dom";
import LoginForm from "./components/LoginForm";

export const Login = () => {
    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <Card className="container relative lg:h-fit lg:min-h-[700px] flex-col items-center justify-center grid h-screen lg:w-10/12 lg:grid-cols-2 lg:px-0">
                <div className="relative hidden h-full flex-col p-10 text-white dark:border-r lg:flex">
                    <div
                        className="absolute inset-0 bg-zinc-900 bg-cover bg-center rounded-xl"
                        style={{ backgroundImage: `url(${loginImg})` }}
                    />
                    <Link to="/">
                        <div className="relative z-20 flex items-center text-lg font-medium drop-shadow-[0_35px_35px_rgba(0,0,0,1)]">
                            <img src={logo} alt="logo" className="h-20 w-20 rounded-full" />
                            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl p-4">
                                Serenity
                            </h1>
                        </div>
                    </Link>
                </div>

                <div className="relative lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center items-center">
                            <Link to="/">
                                <img
                                    src={logo}
                                    alt="logo"
                                    className="h-20 w-20 rounded-full lg:hidden"
                                />
                            </Link>
                            <h1 className="text-3xl font-semibold tracking-tight">Sign in</h1>
                            <p className="text-sm text-muted-foreground text-justify">
                                To sign in, please enter your registered email and password. Ensure
                                the information provided is accurate to access your account
                                securely.
                            </p>
                            <Popover defaultOpen={true}>
                                <PopoverTrigger asChild>
                                    <Button variant="outline">Demo credentials</Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-1/2">
                                    <div className="flex flex-col mx-auto justify-center content-center gap-2">
                                        <img
                                            src={paperClip}
                                            alt="paperClip"
                                            className="w-1/2 mx-auto"
                                        />
                                        <h4 className="font-medium leading-none">
                                            Demo credentials
                                        </h4>
                                        <p className="text-sm text-muted-foreground">
                                            This is just a demo to demonstrate the capabilities of
                                            the system. Use these credentials to log in.
                                        </p>
                                        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                                            kuziora.karolx@gmail.com
                                        </code>
                                        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                                            Password1234$
                                        </code>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="grid gap-6">
                            <LoginForm />
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-muted-foreground">
                                        Don't have an account?
                                    </span>
                                </div>
                            </div>
                            <Link to="/register" className="w-full">
                                <Button variant="outline" type="button" className="w-full">
                                    Create Account
                                </Button>
                            </Link>
                        </div>
                        <p className="px-8 text-center text-sm text-muted-foreground">
                            By clicking continue, you agree to our{" "}
                            <Link
                                to="/terms-of-service"
                                className="underline underline-offset-4 hover:text-primary">
                                Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link
                                to="/privacy-policy"
                                className="underline underline-offset-4 hover:text-primary">
                                Privacy Policy
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
};
