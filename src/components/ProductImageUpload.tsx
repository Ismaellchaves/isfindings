
import React, { useState, useRef } from 'react';
import { Upload, X, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ProductImageUploadProps {
  imageUrl: string;
  onImageChange: (url: string) => void;
}

const ProductImageUpload: React.FC<ProductImageUploadProps> = ({ imageUrl, onImageChange }) => {
  const [tab, setTab] = useState<string>(imageUrl ? "url" : "upload");
  const [previewImage, setPreviewImage] = useState<string>(imageUrl || '');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleUrlChange = (url: string) => {
    setPreviewImage(url);
    onImageChange(url);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewImage(result);
        onImageChange(result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleRemoveImage = () => {
    setPreviewImage('');
    onImageChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  return (
    <div className="space-y-4">
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="url">URL</TabsTrigger>
          <TabsTrigger value="upload">Upload</TabsTrigger>
        </TabsList>
        
        <TabsContent value="url" className="space-y-4">
          <Input
            type="url"
            placeholder="https://exemplo.com/imagem.jpg"
            value={previewImage}
            onChange={(e) => handleUrlChange(e.target.value)}
          />
        </TabsContent>
        
        <TabsContent value="upload" className="space-y-4">
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-2 text-gray-500" />
                <p className="text-sm text-gray-500">Clique para fazer upload</p>
                <p className="text-xs text-gray-500">PNG, JPG ou JPEG</p>
              </div>
              <input 
                ref={fileInputRef}
                type="file" 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileChange}
              />
            </label>
          </div>
        </TabsContent>
      </Tabs>
      
      {previewImage && (
        <div className="mt-4 relative">
          <div className="absolute top-2 right-2 z-10">
            <Button 
              type="button" 
              variant="destructive" 
              size="icon" 
              className="h-6 w-6 rounded-full" 
              onClick={handleRemoveImage}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
          <div className="flex justify-center border rounded-md overflow-hidden">
            <img
              src={previewImage}
              alt="Preview"
              className="h-48 object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).onerror = null; 
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150';
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImageUpload;
