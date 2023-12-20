import { useGetUserScheltersQuery } from "@/app/api/features/user/userApiSlice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FaShieldAlt } from "react-icons/fa";
import { PiPersonArmsSpreadBold } from "react-icons/pi";
import { Link } from "react-router-dom";

export const UserShelterList = () => {
    const { data, isLoading, isSuccess, isError, error } = useGetUserScheltersQuery();
    let content;
    if (isLoading) {
        content = <div>Loading...</div>;
    } else if (isSuccess) {
        content = (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {data.map((shelter, i) => {
                    return (
                        <Card key={i} className="flex flex-col">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    <div className="flex flex-row items-center justify-between space-x-1">
                                        <h2 className="capitalize">{shelter.role.name.toLocaleLowerCase()}</h2>
                                    </div>
                                </CardTitle>
                                {shelter.role.name === "ADMIN" ? <FaShieldAlt /> : <PiPersonArmsSpreadBold />}
                            </CardHeader>
                            <CardContent className="flex-1">
                                <div className="text-2xl font-bold">{shelter.shelter.name}</div>
                                <p className="text-xs text-muted-foreground">{shelter.shelter.description}</p>
                            </CardContent>
                            <CardFooter className="grid gap-4 lg:grid-cols-2">
                                <Button asChild>
                                    <Link to={`/panel/${shelter.shelter.uuid}`}>Caretaker Panel</Link>
                                </Button>
                                {shelter.role.name === "ADMIN" ? (
                                    <Button variant="outline" asChild>
                                        <Link to={`/dashboard/${shelter.shelter.uuid}`}>Admin Dashboard</Link>
                                    </Button>
                                ) : (
                                    ""
                                )}
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
        );
    } else if (isError) {
        content = <p>{JSON.stringify(error)}</p>;
    }
    return content;
};
