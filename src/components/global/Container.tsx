import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface ContainerProps extends React.HTMLProps<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({
  className = "",
  children,
  ...props
}) => {
  return (
    <div {...props} className={cn("max-w-[1352px] mx-auto px-4", className)}>
      {children}
    </div>
  );
};

export default Container;
