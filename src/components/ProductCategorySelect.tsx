
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { categorias } from '@/lib/dados';

interface ProductCategorySelectProps {
  value: string;
  onChange: (value: string) => void;
}

const ProductCategorySelect: React.FC<ProductCategorySelectProps> = ({ value, onChange }) => {
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  
  // Get unique category names from the data, ensuring no empty values
  const uniqueCategories = [...new Set(categorias.map(cat => cat.nome))]
    .filter(category => category && category.trim() !== '');
  
  const handleAddCategory = () => {
    if (newCategory.trim()) {
      onChange(newCategory.trim());
      setNewCategory('');
      setIsAddingCategory(false);
    }
  };

  return (
    <div className="space-y-2">
      {!isAddingCategory ? (
        <div className="flex items-center gap-2">
          <Select value={value || "selecione"} onValueChange={onChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent>
              {uniqueCategories.length > 0 ? (
                uniqueCategories.map((cat) => (
                  <SelectItem key={cat} value={cat || "categoria_default"}>{cat}</SelectItem>
                ))
              ) : (
                <SelectItem value="nenhuma-categoria">Nenhuma categoria disponível</SelectItem>
              )}
            </SelectContent>
          </Select>
          <Button 
            type="button" 
            variant="outline" 
            size="icon"
            onClick={() => setIsAddingCategory(true)}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Input
            placeholder="Nova categoria"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <Button 
            type="button" 
            onClick={handleAddCategory}
          >
            Adicionar
          </Button>
          <Button 
            type="button" 
            variant="outline"
            onClick={() => setIsAddingCategory(false)}
          >
            Cancelar
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductCategorySelect;
