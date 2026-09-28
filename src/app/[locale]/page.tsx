import { Link } from "@/i18n/navigation";

export default function Home() {
  return (
    <Link
      href="/tasks"
      className="flex justify-center items-center text-xl font-bold hover:underline"
    >
      Tasks
    </Link>
  );
}
