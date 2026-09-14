import { useTranslations } from "next-intl";
import { TabsList, TabsTrigger } from "../ui/tabs";

export default function TaskFilter() {
  const t = useTranslations("taskFilter");

  return (
    <div className="mb-1 flex w-full items-center justify-center">
      <TabsList className="gap-2">
        <TabsTrigger value="all">{t("all")}</TabsTrigger>
        <TabsTrigger value="active">{t("active")}</TabsTrigger>
        <TabsTrigger value="completed">{t("completed")}</TabsTrigger>
      </TabsList>
    </div>
  );
}
