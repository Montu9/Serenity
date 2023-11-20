import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useGetUserScheltersQuery } from "@/app/api/features/shelter/shelterApiSlice";

export const UserShelterList = () => {
    const { data, isLoading, isSuccess, isError, error } = useGetUserScheltersQuery();

    let content;
    if (isLoading) {
        content = <div>Loading...</div>;
    } else if (isSuccess) {
        content = (
            <div>
                {data.map((shelter, i) => {
                    return (
                        <Card key={i}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    <div className="flex flex-row items-center justify-between space-x-1">
                                        {shelter.role.name === "ADMIN" ? <MdAdminPanelSettings /> : <FaUser />}
                                        <h2>
                                            {shelter.role.name.charAt(0).toUpperCase() +
                                                shelter.role.name.slice(1).toLowerCase()}
                                        </h2>
                                    </div>
                                </CardTitle>
                                {shelter.role.name === "ADMIN" ? <Button>Go to Dashboard</Button> : <div></div>}
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{shelter.Shelter.name}</div>
                                <p className="text-xs text-muted-foreground">{shelter.Shelter.description}</p>
                            </CardContent>
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
