import { Skeleton } from "../ui/skeleton";

export const CardSkeleton = () => {
    return (
        <div className="flex flex-col space-x-4 space-y-4">
            <div className="flex items-center w-full">
                <Skeleton className="h-12 w-12 min-w-12 m-2 rounded-full" />
                <div className="space-y-2 w-8/12">
                    <Skeleton className="h-4 w-4/5" />
                    <Skeleton className="h-4 w-2/5" />
                </div>
            </div>
            <div className="space-y-2 w-full">
                <Skeleton className="h-4 w-10/12" />
                <Skeleton className="h-4 w-7/12" />
                <Skeleton className="h-4 w-8/12" />
            </div>
            <div className="flex flex-row gap-4 justify-end">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-12" />
            </div>
        </div>
    );
};
