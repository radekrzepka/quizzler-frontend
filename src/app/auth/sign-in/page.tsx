import SignInForm from "@/modules/auth/sign-in/sign-in-form";
import { FC } from "react";

const SignIn: FC = () => {
   return (
      <div className="mt-20 grid w-full place-items-center lg:mt-0 lg:h-[100vh]">
         <SignInForm />
      </div>
   );
};

export default SignIn;
