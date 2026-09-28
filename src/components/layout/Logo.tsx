import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function Logo() {
  const t = useTranslations("common");
  return (
    <Link href="/" className="text-3xl font-bold" aria-label={t("brand")}>
      Taskel
    </Link>
  );
}
