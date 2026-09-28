import SignInForm from "@/components/auth/SignInForm";
import PageContainer from "@/components/layout/PageContainer";

export default function SignIn() {
  return (
    <PageContainer>
      <div className="mx-auto w-full max-w-md">
        <SignInForm />
      </div>
    </PageContainer>
  );
}
