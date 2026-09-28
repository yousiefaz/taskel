import SignUpForm from "@/components/auth/SignUpForm";
import PageContainer from "@/components/layout/PageContainer";

export default function SignUp() {
  return (
    <PageContainer>
      <div className="mx-auto w-full max-w-md">
        <SignUpForm />
      </div>
    </PageContainer>
  );
}
