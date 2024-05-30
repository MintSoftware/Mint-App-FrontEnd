import { useState } from 'react';
import { Input } from './input';

export default function InputCPForCNPJ() {
  const [value, setValue] = useState('');

  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    let { value } = event.target;
    value = value.replace(/\D/g, '');

    if (value.length <= 11) {
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } else {
      value = value.replace(/^(\d{2})(\d)/, '$1.$2');
      value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
      value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
      value = value.replace(/(\d{4})(\d)/, '$1-$2');
    }

    setValue(value);
  };

  return (
    <Input id="cpf-cnpj" placeholder="CPF ou CNPJ" required value={value} onChange={handleChange} />
  );
}
