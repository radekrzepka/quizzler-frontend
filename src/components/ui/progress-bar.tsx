import classNames from "classnames";
import { useSpring, animated } from "react-spring";

interface ProgressBarProps {
   min: number;
   max: number;
   className?: string;
}

const ProgressBar = ({ min, max, className }: ProgressBarProps) => {
   const progress = Math.round((min / max) * 100);
   const animation = useSpring({ width: `${progress}%` });

   return (
      <div
         className={classNames(
            "grid grid-cols-[auto_1fr] items-center gap-2",
            className
         )}
      >
         <p className="text-2xl font-bold">{progress} %</p>
         <div className="h-4 rounded-3xl bg-text">
            <animated.div
               style={animation}
               className="h-4 rounded-3xl bg-green-500"
            />
         </div>
      </div>
   );
};

export default ProgressBar;
