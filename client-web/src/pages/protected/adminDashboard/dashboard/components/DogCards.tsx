import { useGetAllDogsQuery } from "@/app/api/features/shelter/shelterApiSlice";
import { CardSkeleton, LoadingError, NothingHere } from "@/components";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { BsPersonFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface ChartData {
    dogStatus: string;
    female: number;
    male: number;
}

export const DogCards = () => {
    const { shelterUuid } = useParams();
    const [dogs, setDogs] = useState<number>(0);
    const [occurence, setOccurence] = useState<[] | ChartData[]>([]);
    const { data, isLoading, isSuccess, isError } = useGetAllDogsQuery({ shelterUuid: shelterUuid || "" });

    useEffect(() => {
        setDogs(data ? data.length : 0);
        const dogOccurrenceMap = data
            ? Object.values(
                  data.reduce(
                      (occurrenceMap, dog) => {
                          const dogStatus = dog.dogStatus;
                          const gender = dog.gender;

                          if (!occurrenceMap[dogStatus]) {
                              occurrenceMap[dogStatus] = { dogStatus, female: 0, male: 0 };
                          }

                          if (gender === "FEMALE") {
                              occurrenceMap[dogStatus].female++;
                          } else if (gender === "MALE") {
                              occurrenceMap[dogStatus].male++;
                          }

                          return occurrenceMap;
                      },
                      {} as Record<string, { dogStatus: string; female: number; male: number }>
                  )
              )
            : [];
        setOccurence(dogOccurrenceMap);
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
                                <h1 className=" text-6xl">{dogs}</h1>
                            </div>
                        </CardContent>
                        <CardFooter className="uppercase flex items-center font-bold justify-center">dogs</CardFooter>
                    </Card>
                </div>
                <div className="col-span-2">
                    <Card className="flex flex-col h-full justify-center items-center">
                        <CardHeader>Dog status</CardHeader>
                        <CardContent className="h-[300px] min-w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    width={500}
                                    height={300}
                                    data={occurence}
                                    margin={{
                                        top: 20,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="dogStatus" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="female" stackId="a" fill="#8884d8" />
                                    <Bar dataKey="male" stackId="a" fill="#82ca9d" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
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
