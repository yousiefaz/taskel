import UserMenu from "@/components/layout/UserMenu";
import AppNavbarNavigation from "./AppNavbarNavigation";
import Logo from "./Logo";

type AppNavbarProps = {
  locale: string;
};

export default function AppNavbar({ locale }: AppNavbarProps) {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        <AppNavbarNavigation />

        <div className="flex items-center gap-2">
          <UserMenu locale={locale} />
        </div>
      </div>
    </header>
  );
}
