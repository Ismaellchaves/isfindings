import { supabase } from "@/integrations/supabase/client";
import { Produto } from "@/lib/tipos";

// Database representation
export type DBProduct = {
  id: string;
  name: string;
  price: number;
  old_price?: number | null;
  image_url?: string | null;
  category: string;
  description?: string | null;
  colors?: string[] | null;
  sizes?: string[] | null;
  link?: string | null;
  published_at?: string | null;
  status?: "ativo" | "inativo" | null;
  gender?: "masculino" | "feminino" | "unissex" | null;
  created_at?: string | null;
  updated_at?: string | null;
};

function toProduto(db: DBProduct): Produto {
  return {
    id: db.id,
    nome: db.name,
    preco: Number(db.price),
    precoAntigo: db.old_price ?? undefined,
    imagem: db.image_url ?? "",
    categoria: db.category,
    descricao: db.description ?? "",
    cores: db.colors ?? undefined,
    tamanhos: db.sizes ?? undefined,
    link: db.link ?? undefined,
    data_publicacao: db.published_at ?? undefined,
    status: (db.status as Produto["status"]) ?? "ativo",
    genero: (db.gender as Produto["genero"]) ?? "unissex",
  };
}

function fromProduto(p: Produto): Partial<DBProduct> {
  return {
    name: p.nome,
    price: p.preco,
    old_price: p.precoAntigo,
    image_url: p.imagem,
    category: p.categoria,
    description: p.descricao,
    colors: p.cores,
    sizes: p.tamanhos,
    link: p.link,
    published_at: p.data_publicacao ?? new Date().toISOString(),
    status: (p.status as DBProduct["status"]) ?? "ativo",
    gender: (p.genero as DBProduct["gender"]) ?? "unissex",
  };
}

export async function listProducts(): Promise<Produto[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("published_at", { ascending: false });
  if (error) throw error;
  return (data as DBProduct[]).map(toProduto);
}

export async function getProductById(id: string): Promise<Produto | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data ? toProduto(data as DBProduct) : null;
}

export async function createProduct(input: Omit<Produto, "id">): Promise<Produto> {
  const toInsert = fromProduto(input as Produto);
  const { data, error } = await supabase
    .from("products")
    .insert(toInsert as any)
    .select("*")
    .single();
  if (error) throw error;
  return toProduto(data as DBProduct);
}

export async function updateProduct(id: string, input: Partial<Produto>): Promise<Produto> {
  const toUpdate = fromProduto(input as Produto);
  const { data, error } = await supabase
    .from("products")
    .update(toUpdate as any)
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw error;
  return toProduto(data as DBProduct);
}

export async function deleteProduct(id: string): Promise<void> {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);
  if (error) throw error;
}
