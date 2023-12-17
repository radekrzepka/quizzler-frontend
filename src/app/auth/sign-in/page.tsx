import SignInForm from "@/modules/auth/sign-in/sign-in-form";

const SignIn = () => {
   return (
      <div className="absolute inset-0 grid w-full place-items-center">
         <SignInForm className="w-3/4 rounded-md bg-text p-6 xl:w-1/3" />
      </div>
   );
};

export default SignIn;
