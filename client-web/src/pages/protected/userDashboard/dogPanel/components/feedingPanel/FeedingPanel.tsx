import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GiDogBowl } from "react-icons/gi";

export const FeedingPanel = () => {
    return (
        <Card>
            <CardHeader className="flex items-center justify-center">
                <CardTitle className="text-2xl">
                    <GiDogBowl />
                </CardTitle>
                <CardDescription>Feed</CardDescription>
            </CardHeader>
        </Card>
    );
};
