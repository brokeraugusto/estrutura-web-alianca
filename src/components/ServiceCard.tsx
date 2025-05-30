import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}
const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description
}) => {
  return <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="w-16 h-16 text-white rounded-full flex items-center justify-center mx-auto mb-4 bg-blue-950">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-blueDark">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link to="/servicos" className="text-amber-500 font-medium hover:text-[#ff9000] flex items-center justify-center">
        Saiba mais
        <ChevronRight className="w-4 h-4 ml-1" />
      </Link>
    </div>;
};
export default ServiceCard;