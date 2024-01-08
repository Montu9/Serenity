import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import homePageImg from "@/assets/images/homePageImg.png";
import logo from "@/assets/svg/logo.svg";
import { Card } from "@/components/ui/card";

export const Home = () => {
    return (
        <div className="h-full w-full min-h-screen min-w-screen flex items-center justify-center">
            <Card className="container relative lg:h-fit lg:min-h-[700px] flex-col items-center justify-center grid h-full min-h-screen lg:w-10/12 lg:grid-cols-2 lg:px-0">
                <div className="relative hidden h-full flex-col p-10 text-white dark:border-r lg:flex">
                    <div
                        className="absolute inset-0 bg-zinc-900 bg-cover bg-center rounded-xl"
                        style={{ backgroundImage: `url(${homePageImg})` }}
                    />
                </div>

                <div className="py-12 px-8 lg:px-12 h-full flex flex-col justify-start space-y-6">
                    <div className="flex flex-col md:flex-row w-full items-center justify-evenly">
                        <Link to="/" className="block lg:order-2">
                            <img src={logo} alt="logo" className="h-40 w-40 rounded-full" />
                        </Link>
                        <div className="w-full lg:order-1">
                            <h1 className="text-left font-black leading-none tracking-tight uppercase text-5xl sm:text-6xl">
                                Serenity
                            </h1>
                            <h2 className="w-4/5 scroll-m-20 uppercase pb-2 text-2xl font-semibold tracking-tight text-muted-foreground mt-0">
                                Management System for your dog shelter.
                            </h2>
                        </div>
                    </div>
                    <div className="">
                        <p className="max-w-2xl mb-4 text-base text-justify text-muted-foreground md:text-lg leading-7">
                            Streamline operations and elevate care with our comprehensive dog shelter management
                            software. Seamlessly medical records, volunteer coordination, and more, all in one intuitive
                            platform designed to simplify and enhance the shelter experience for staff, volunteers, and
                            furry residents alike.
                        </p>
                        <div className="flex flex-col md:flex-row items-center gap-5">
                            <Link to="/register" className="w-full md:w-max">
                                <Button type="button" className="px-8 py-6 w-full md:w-max">
                                    Create Account
                                </Button>
                            </Link>
                            <Link to="/login" className="w-full md:w-max">
                                <Button variant="outline" type="button" className="px-8 py-6 w-full md:w-max">
                                    Sign in
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};
