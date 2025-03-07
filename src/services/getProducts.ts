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
  )

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return filteredProducts.map(({ matchCount, ...product }) => product);
};
