import { FC } from "react";

interface InfoCardProps {
  title: string;
}

const InfoCard: FC<InfoCardProps> = ({ title, children }) => {
  return (
    <div className="p-8 w-full lg:w-1/2 bg-white border shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-slate-900">{title}</h3>
      </div>
      {children}
    </div>
  );
};

export default InfoCard;
