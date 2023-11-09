import SignInForm from "@/modules/auth/sign-in/sign-in-form";

const SignIn = () => {
   return (
      <div className="absolute inset-0 grid w-full place-items-center">
         <SignInForm />
      </div>
   );
};

export default SignIn;
