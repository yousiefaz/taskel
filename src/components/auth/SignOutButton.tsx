import { auth, signOut } from "@/auth";
import { Button } from "../ui/button";

type SignOutButtonProps = {
  locale: string;
};

export default async function SignOutButton({ locale }: SignOutButtonProps) {
  const session = await auth();

  if (!session) {
    return null;  
  }

  return (
    <form
      action={async () => {
        "use server";

        await signOut({
          redirectTo: `/${locale}/sign-in`,
        });
      }}
    >
      <Button
        variant="destructive"
        type="submit"
        className="flex items-center rounded-sm px-2 py-1.5 text-sm text-red-600 outline-none hover:bg-red-50 focus:bg-red-50"
      >
        Sign Out
      </Button>
    </form>
  );
}
