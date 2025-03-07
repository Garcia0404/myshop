export async function fetchData<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export const searchWords = (list: Product[], str: string) => {
  // 1. Separar las palabras de la consulta
  const searchWords = str.toLowerCase().split(/\s+/);

  // 2. Contar coincidencias para cada producto
  const productsWithMatches = list.map((product) => {
    const productName = product.nombre.toLowerCase();
    const matchCount = searchWords.filter((word) =>
      productName.includes(word)
    ).length;

    return {
      ...product,
      matchCount, // Agregar el número de coincidencias al producto
    };
  });

  // 3. Filtrar productos que tengan al menos una coincidencia
  const filteredProducts = productsWithMatches.filter(
    (product) => product.matchCount === searchWords.length
  );

  // 4. Ordenar por el número de coincidencias
  const sortedProducts = filteredProducts.sort(
    (a, b) => b.matchCount - a.matchCount
  );

  // 5. Retornar los productos ordenados y eliminar el campo matchCount
  return sortedProducts.map(({ matchCount, ...product }) => product);
};
