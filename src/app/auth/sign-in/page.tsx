import SignInForm from "@/modules/auth/sign-in/sign-in-form";
import { FC } from "react";

const SignIn: FC = () => {
   return (
      <div className="grid h-screen w-full place-items-center">
         <SignInForm />
      </div>
   );
};

export default SignIn;
