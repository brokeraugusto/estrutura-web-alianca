
import { useState } from 'react';

export const usePhoneMask = (initialValue: string = '') => {
  const [value, setValue] = useState(initialValue);

  const formatPhone = (input: string) => {
    // Remove todos os caracteres não numéricos
    const numbers = input.replace(/\D/g, '');
    
    // Limita a 11 dígitos
    const limitedNumbers = numbers.substring(0, 11);
    
    // Aplica a máscara (XX) X XXXX-XXXX
    if (limitedNumbers.length <= 2) {
      return limitedNumbers;
    } else if (limitedNumbers.length <= 3) {
      return `(${limitedNumbers.substring(0, 2)}) ${limitedNumbers.substring(2)}`;
    } else if (limitedNumbers.length <= 7) {
      return `(${limitedNumbers.substring(0, 2)}) ${limitedNumbers.substring(2, 3)} ${limitedNumbers.substring(3)}`;
    } else {
      return `(${limitedNumbers.substring(0, 2)}) ${limitedNumbers.substring(2, 3)} ${limitedNumbers.substring(3, 7)}-${limitedNumbers.substring(7)}`;
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPhone(event.target.value);
    setValue(formattedValue);
  };

  return {
    value,
    onChange: handleChange,
    setValue
  };
};
