import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FaHandsWash } from "react-icons/fa";

export const CleaningPanel = () => {
    return (
        <Card className="w-full">
            <CardHeader className="flex items-center justify-center">
                <CardTitle className="text-2xl">
                    <FaHandsWash />
                </CardTitle>
                <CardDescription>Clean</CardDescription>
            </CardHeader>
        </Card>
    );
};
