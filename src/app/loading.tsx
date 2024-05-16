import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="h-full">
      <div className="flex flex-col w-56 fixed inset-y-0 z-50">
        <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm space-y-4 px-3">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
        </div>
      </div>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10 md:pl-60 p-6">
        <div>
          <Skeleton className="h-[300px] w-full" />
          <div className="pt-2 space-y-3">
            <Skeleton className="h-6 w-full" />
            <div className="mr-10">
              <Skeleton className="h-6 w-full" />
            </div>
            <Skeleton className="h-6 w-full" />
          </div>
        </div>
        <div>
          <Skeleton className="h-[300px] w-full" />
          <div className="pt-2 space-y-3">
            <Skeleton className="h-6 w-full" />
            <div className="mr-10">
              <Skeleton className="h-6 w-full" />
            </div>
            <Skeleton className="h-6 w-full" />
          </div>
        </div>
        <div>
          <Skeleton className="h-[300px] w-full" />
          <div className="pt-2 space-y-3">
            <Skeleton className="h-6 w-full" />
            <div className="mr-10">
              <Skeleton className="h-6 w-full" />
            </div>
            <Skeleton className="h-6 w-full" />
          </div>
        </div>
        <div>
          <Skeleton className="h-[300px] w-full" />
          <div className="pt-2 space-y-3">
            <Skeleton className="h-6 w-full" />
            <div className="mr-10">
              <Skeleton className="h-6 w-full" />
            </div>
            <Skeleton className="h-6 w-full" />
          </div>
        </div>
        <div>
          <Skeleton className="h-[300px] w-full" />
          <div className="pt-2 space-y-3">
            <Skeleton className="h-6 w-full" />
            <div className="mr-10">
              <Skeleton className="h-6 w-full" />
            </div>
            <Skeleton className="h-6 w-full" />
          </div>
        </div>
        <div>
          <Skeleton className="h-[300px] w-full" />
          <div className="pt-2 space-y-3">
            <Skeleton className="h-6 w-full" />
            <div className="mr-10">
              <Skeleton className="h-6 w-full" />
            </div>
            <Skeleton className="h-6 w-full" />
          </div>
        </div>
        <div>
          <Skeleton className="h-[300px] w-full" />
          <div className="pt-2 space-y-3">
            <Skeleton className="h-6 w-full" />
            <div className="mr-10">
              <Skeleton className="h-6 w-full" />
            </div>
            <Skeleton className="h-6 w-full" />
          </div>
        </div>
        <div>
          <Skeleton className="h-[300px] w-full" />
          <div className="pt-2 space-y-3">
            <Skeleton className="h-6 w-full" />
            <div className="mr-10">
              <Skeleton className="h-6 w-full" />
            </div>
            <Skeleton className="h-6 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
