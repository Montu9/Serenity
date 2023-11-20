import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import homePageImg from "@/assets/images/homePageImg.png";
import logo from "@/assets/svg/logo.svg";
import { Card } from "@/components/ui/card";

export const Home = () => {
    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <Card className="container relative lg:h-fit lg:min-h-[700px] flex-col items-center justify-center grid h-screen lg:w-10/12 lg:grid-cols-2 lg:px-0">
                <div className="relative hidden h-full flex-col p-10 text-white dark:border-r lg:flex">
                    <div
                        className="absolute inset-0 bg-zinc-900 bg-cover bg-center rounded-xl"
                        style={{ backgroundImage: `url(${homePageImg})` }}
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

                <div className="lg:p-8">
                    <div className="flex flex-col space-y-2 text-center items-center">
                        <Link to="/">
                            <img src={logo} alt="logo" className="h-20 w-20 rounded-full lg:hidden" />
                        </Link>
                    </div>
                    <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl">
                        Serenity management system for your dog shelter.
                    </h1>
                    <p className="max-w-2xl mb-4 text-sm text-muted-foreground md:text-lg xl:text-xl">
                        Streamline operations and elevate care with our comprehensive dog shelter management software.
                        Seamlessly medical records, volunteer coordination, and more, all in one intuitive platform
                        designed to simplify and enhance the shelter experience for staff, volunteers, and furry
                        residents alike.
                    </p>
                    <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                        <Link to="/register">
                            <Button type="button">Create Account</Button>
                        </Link>
                        <Link to="/login">
                            <Button variant="outline" type="button">
                                Sign in
                            </Button>
                        </Link>
                    </div>
                </div>
            </Card>
        </div>
    );
};
