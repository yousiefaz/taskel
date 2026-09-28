import { useTranslations } from "next-intl";

export default function Logo() {
  const t = useTranslations("common");
  return (
    <h1 className="text-3xl font-bold" aria-label={t("brand")}>
      Taskel
    </h1>
  );
}
