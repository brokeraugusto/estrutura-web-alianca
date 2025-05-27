
import React from 'react';
import { Menu, X } from 'lucide-react';
import { useAppSettings } from '@/contexts/AppSettingsContext';
import { Button } from '@/components/ui/button';

interface MobileMenuButtonProps {
  isMenuOpen: boolean;
  onClick: () => void;
}

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({ isMenuOpen, onClick }) => {
  const { settings } = useAppSettings();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="md:hidden hover:bg-gray-100"
      style={{ color: settings.primaryColor }}
      onClick={onClick}
      aria-label="Menu"
    >
      {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
    </Button>
  );
};

export default MobileMenuButton;
