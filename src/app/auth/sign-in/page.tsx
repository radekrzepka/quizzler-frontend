import SignInForm from "@/modules/auth/sign-in/sign-in-form";
import { FC } from "react";

const SignIn: FC = () => {
   return (
      <div className="grid w-full place-items-center absolute inset-0">
         <SignInForm />
      </div>
   );
};

export default SignIn;
