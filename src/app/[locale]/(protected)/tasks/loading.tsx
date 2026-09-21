import { useTranslations } from "next-intl";

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  const t = useTranslations("common");

  return (
    <main
      className="flex min-h-screen items-center justify-center px-4 py-6 md:px-6 md:py-10"
      aria-busy="true"
      aria-label={t("loading")}
    >
      <div className="w-full max-w-5xl">
        <div className="rounded-3xl border bg-card">
          {/* Header */}
          <div className="grid grid-cols-1 gap-4 px-6 py-6 md:grid-cols-3 md:items-center">
            <div className="hidden md:block" />

            <Skeleton
              className="mx-auto h-10 w-48 md:h-14 md:w-64"
              aria-hidden="true"
            />

            <div className="hidden md:block" />
          </div>

          {/* Content */}
          <div className="px-3 md:px-6">
            {/* Task Filters */}
            <div
              className="mb-4 flex items-center justify-center gap-2"
              aria-hidden="true"
            >
              <Skeleton className="h-9 w-16 rounded-md" />
              <Skeleton className="h-9 w-20 rounded-md" />
              <Skeleton className="h-9 w-24 rounded-md" />
            </div>

            {/* Task List */}
            <div
              className="h-87 space-y-2 overflow-hidden px-1 md:h-106 md:px-4"
              aria-hidden="true"
            >
              {/* Task Skeleton */}
              <div className="my-1 flex min-h-50 w-full flex-col justify-center gap-6 rounded-xl border p-6">
                <div className="flex items-start gap-4">
                  <Skeleton className="h-6 w-21 shrink-0 rounded-full" />

                  <div className="flex min-w-0 flex-1 flex-col gap-3">
                    <Skeleton className="h-6 w-3/5" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-4/5" />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Skeleton className="size-9 rounded-full" />
                  <Skeleton className="size-9 rounded-full" />
                  <Skeleton className="size-9 rounded-full" />
                </div>
              </div>

              {/* Task Skeleton */}
              <div className="my-1 flex min-h-50 w-full flex-col justify-center gap-6 rounded-xl border p-6">
                <div className="flex items-start gap-4">
                  <Skeleton className="h-6 w-21 shrink-0 rounded-full" />

                  <div className="flex min-w-0 flex-1 flex-col gap-3">
                    <Skeleton className="h-6 w-2/5" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-3/4" />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Skeleton className="size-9 rounded-full" />
                  <Skeleton className="size-9 rounded-full" />
                  <Skeleton className="size-9 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Add Task */}
          <div className="flex w-full justify-center px-6 pb-1 pt-4">
            <Skeleton className="h-11 w-full md:w-50" aria-hidden="true" />
          </div>
        </div>
      </div>
    </main>
  );
}
