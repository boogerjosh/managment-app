import clsx from "clsx";
import { ReactNode } from "react";

type GlassPaneProps = {
  children: ReactNode;
  className: string;
}

const GlassPane: React.FC<GlassPaneProps> = ({ children, className }) => {
  return (
    <div
      className={clsx(
        "glass rounded-xl border-solid border-2 border-gray-200",
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassPane;
