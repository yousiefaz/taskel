import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageContainer({
  children,
  className,
}: PageContainerProps) {
  return (
    <main
      className={cn("w-full px-4 py-10 sm:px-6 sm:py-12 lg:px-8", className)}
    >
      {children}
    </main>
  );
}
