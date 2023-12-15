import AutocompleteSerach from "@/components/search/autocomplete-serach";
import classNames from "classnames";

interface SerachPanelProps {
   className?: string;
}

const SerachPanel = ({ className }: SerachPanelProps) => {
   return (
      <div className={classNames("mt-2 w-full flex-grow", className)}>
         <AutocompleteSerach />
      </div>
   );
};

export default SerachPanel;
