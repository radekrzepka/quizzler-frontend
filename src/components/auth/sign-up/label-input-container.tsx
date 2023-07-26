import { FC, ReactNode } from "react";

interface LabelInputContainerProps {
   children: ReactNode;
}

const LabelInputContainer: FC<LabelInputContainerProps> = ({ children }) => {
   return (
      <div className="mb-3 grid grid-cols-1 gap-4 md:grid-cols-2">
         {children}
      </div>
   );
};

export default LabelInputContainer;
