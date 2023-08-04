import { FC, ReactNode } from "react";

interface ErrorMessageProps {
   children: ReactNode;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ children }) => {
   return <p className="ml-2 text-xs text-red-500">{children}</p>;
};

export default ErrorMessage;
