import clsx from "clsx";
import { ReactNode } from "react";

type CardProps = {
  className?: string;
  children: ReactNode;
};

const Card = ({ className, children }: CardProps) => {
  return (
    <div
      className={clsx(
        "rounded-3xl px-10 py-4 h-full bg-white",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
