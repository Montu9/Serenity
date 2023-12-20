import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FaWalking } from "react-icons/fa";

export const WalkPanel = () => {
    return (
        <Card className="w-full">
            <CardHeader className="flex items-center justify-center">
                <CardTitle className="text-2xl">
                    <FaWalking />
                </CardTitle>
                <CardDescription>Walk</CardDescription>
            </CardHeader>
        </Card>
    );
};
