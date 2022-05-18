import React from "react";

type ListItemProps = {
  className?: string;
};

const ListItem: React.FC<ListItemProps> = ({ className, children }) => {
  return <li className={`py-3 ${className}`}>{children}</li>;
};

export default ListItem;
