import TimeblockTabs from "@/app/(protected)/my-schedule/_components/timeblock-tabs";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { SessionData } from "@/components/calendar/types";
import { checkTutorActivation } from "@/actions/admin-actions";
import { ActivationWrapper } from "@/app/(protected)/my-schedule/_components/activation-wrapper";
import { getScheduleData } from "@/actions/timeblocks";

type SearchParams = {
  tab?: string;
  view?: string;
  month?: string;
};

export default async function TimeblocksPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { userId } = await auth();

  if (!userId) {
    throw notFound();
  }

  const params = await searchParams;
  const isActivated = (await checkTutorActivation(userId)) as boolean;

  const { data } = (await getScheduleData()) as { data: SessionData[] };

  return (
    <div className="flex flex-col flex-1 min-h-0 p-5 space-y-6 w-full h-full">
      <ActivationWrapper isActivated={isActivated} />
      <div className="flex items-center justify-between flex-shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Schedule Planner
          </h1>
          <p className="text-muted-foreground">
            Manage your available teaching slots and recurring schedules
          </p>
        </div>
      </div>
      <TimeblockTabs data={data} initialTab={params.tab} />
    </div>
  );
}
