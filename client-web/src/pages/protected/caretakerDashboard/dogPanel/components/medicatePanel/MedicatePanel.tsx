import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FaNotesMedical } from "react-icons/fa";

export const MedicatePanel = () => {
    return (
        <Card>
            <CardHeader className="flex items-center justify-center">
                <CardTitle className="text-2xl">
                    <FaNotesMedical />
                </CardTitle>
                <CardDescription>Meds</CardDescription>
            </CardHeader>
        </Card>
    );
};
