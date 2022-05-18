import React from "react";

type ListProps = {
  className?: string;
};

const List: React.FC<ListProps> = ({ className, children }) => {
  return <ul className={`${className}`}>{children}</ul>;
};

export default List;
