import { ReactNode } from "react";

interface ErrorMessageProps {
   children: ReactNode;
}

const ErrorMessage = ({ children }: ErrorMessageProps) => {
   return <p className="ml-2 text-xs text-red-500">{children}</p>;
};

export default ErrorMessage;
