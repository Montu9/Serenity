import { useGetAllCaretakersQuery } from "@/app/api/features/shelter/shelterApiSlice";
import { CardSkeleton, LoadingError, NothingHere } from "@/components";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { BsPersonFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa6";
import { useParams } from "react-router-dom";

export const CaretakerCards = () => {
    const { shelterUuid } = useParams();
    const [women, setWomen] = useState<number>(0);
    const [men, setMen] = useState<number>(0);
    const [other, setOther] = useState<number>(0);
    const [admin, setAdmin] = useState<number>(0);
    const [caretakers, setCaretakers] = useState<number>(0);

    const { data, isLoading, isSuccess, isError } = useGetAllCaretakersQuery({ shelterUuid: shelterUuid || "" });

    useEffect(() => {
        setWomen(data ? data.reduce((count, caretaker) => (caretaker.gender === "Female" ? count + 1 : count), 0) : 0);
        setMen(data ? data.reduce((count, caretaker) => (caretaker.gender === "Male" ? count + 1 : count), 0) : 0);
        setOther(data ? data.reduce((count, caretaker) => (caretaker.gender === "Other" ? count + 1 : count), 0) : 0);
        setAdmin(data ? data.reduce((count, caretaker) => (caretaker.role === "ADMIN" ? count + 1 : count), 0) : 0);
        setCaretakers(
            data ? data.reduce((count, caretaker) => (caretaker.role === "CARETAKER" ? count + 1 : count), 0) : 0
        );
    }, [data]);

    let content = <CardSkeleton />;
    if (isLoading) {
        content = <CardSkeleton />;
    } else if (isSuccess) {
        content = data ? (
            <>
                <div>
                    <Card className="flex flex-col h-full justify-center items-center">
                        <CardHeader></CardHeader>
                        <CardContent>
                            <div className="flex justify-center items-center">
                                <BsPersonFill size={64} />
                                <h1 className=" text-4xl">{data?.length ? data.length : 0}</h1>
                            </div>
                        </CardContent>
                        <CardFooter className="uppercase flex items-center font-bold justify-center">
                            members
                        </CardFooter>
                    </Card>
                </div>
                <div className="grid grid-cols-2 grid-rows-2 gap-4">
                    <Card>
                        <CardHeader></CardHeader>
                        <CardContent className="text-2xl flex justify-center items-center">{women}</CardContent>
                        <CardFooter className="uppercase flex items-center font-bold justify-center">women</CardFooter>
                    </Card>
                    <Card>
                        <CardHeader></CardHeader>
                        <CardContent className="text-2xl flex justify-center items-center">{men}</CardContent>
                        <CardFooter className="uppercase flex items-center font-bold justify-center">men</CardFooter>
                    </Card>
                    <Card>
                        <CardHeader></CardHeader>
                        <CardContent className="text-2xl flex justify-center items-center">{other}</CardContent>
                        <CardFooter className="uppercase flex items-center font-bold justify-center">other</CardFooter>
                    </Card>
                    <Card>
                        <CardHeader></CardHeader>
                        <CardContent className="text-2xl flex justify-center items-center">{admin}</CardContent>
                        <CardFooter className="uppercase flex items-center font-bold justify-center">admins</CardFooter>
                    </Card>
                </div>
                <div>
                    <Card className="flex flex-col h-full justify-center items-center">
                        <CardHeader></CardHeader>
                        <CardContent>
                            <div className="flex justify-center items-center">
                                <FaUsers size={64} />
                                <h1 className=" text-4xl">{caretakers}</h1>
                            </div>
                        </CardContent>
                        <CardFooter className="uppercase flex items-center font-bold justify-center">
                            caretakers
                        </CardFooter>
                    </Card>
                </div>
            </>
        ) : (
            <NothingHere />
        );
    } else if (isError) {
        content = <LoadingError />;
    }

    return content;
};
