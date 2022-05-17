import { FC } from "react";

interface InfoCardProps {
  title: string;
}

const InfoCard: FC<InfoCardProps> = ({ title, children }) => {
  return (
    <div className="py-8 w-full bg-white border rounded-lg">
      <div className="px-8 flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      </div>
      {children}
    </div>
  );
};

export default InfoCard;
