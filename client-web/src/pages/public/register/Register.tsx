import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import registerImg from "@/assets/images/register.png";
import logo from "@/assets/svg/logo.svg";
import { Card } from "@/components/ui/card";
import RegisterForm from "./components/RegisterForm";

export const Register = () => {
    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <Card className="container relative lg:h-fit lg:min-h-[700px] flex-col items-center justify-center grid h-screen lg:w-10/12 lg:grid-cols-2 lg:px-0">
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center items-center">
                            <img src={logo} alt="logo" className="h-20 w-20 rounded-full lg:hidden" />
                            <h1 className="text-2xl font-semibold tracking-tight">Sign up</h1>
                            <p className="text-sm text-muted-foreground">
                                Provide all necessary information to create your account
                            </p>
                        </div>
                        <div className="grid gap-6">
                            <RegisterForm />
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-muted-foreground">
                                        Already have an account?
                                    </span>
                                </div>
                            </div>
                            <Link to="/login" className="w-full">
                                <Button variant="outline" type="button" className="w-full">
                                    Sign in
                                </Button>
                            </Link>
                        </div>
                        <p className="px-8 text-center text-sm text-muted-foreground">
                            By clicking continue, you agree to our{" "}
                            <Link to="/terms" className="underline underline-offset-4 hover:text-primary">
                                Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link to="/privacy" className="underline underline-offset-4 hover:text-primary">
                                Privacy Policy
                            </Link>
                            .
                        </p>
                    </div>
                </div>

                <div className="relative hidden h-full flex-col p-10 text-white dark:border-r lg:flex">
                    <div
                        className="absolute inset-0 bg-zinc-900 bg-cover bg-center rounded-xl"
                        style={{ backgroundImage: `url(${registerImg})` }}
                    />
                    <div className="relative z-20 flex items-center text-lg font-medium drop-shadow-[0_35px_35px_rgba(0,0,0,1)]">
                        <img src={logo} alt="logo" className="h-20 w-20 rounded-full" />
                        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl p-4 ">
                            Serenity
                        </h1>
                    </div>
                </div>
            </Card>
        </div>
    );
};
