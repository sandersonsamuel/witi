import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export function randomUniqueNumbers(
  min: number,
  max: number,
  quantity: number,
): number[] {
  const rangeSize = max - min + 1;

  if (quantity > rangeSize) {
    throw new Error(
      `Não é possível gerar ${quantity} números únicos em um range de tamanho ${rangeSize}`,
    );
  }

  // Passo 1: cria a lista com TODOS os números do range
  const pool: number[] = [];
  for (let n = min; n <= max; n++) {
    pool.push(n);
  }
  // Ex: min=0, max=5 -> pool = [0, 1, 2, 3, 4, 5]

  // Passo 2: embaralha a lista inteira (agora sim, do início ao fim)
  const shuffled = shuffle(pool);

  // Passo 3: pega só os primeiros "quantity" números
  const resultado = shuffled.slice(0, quantity);

  return resultado;
}

// Função separada só pra embaralhar um array (algoritmo de Fisher-Yates)
function shuffle(array: number[]): number[] {
  const copia = [...array]; // trabalha numa cópia, não mexe no array original

  for (let i = copia.length - 1; i > 0; i--) {
    // sorteia uma posição aleatória entre 0 e i
    const j = Math.floor(Math.random() * (i + 1));

    // troca o elemento da posição i com o da posição j
    const temp = copia[i];
    copia[i] = copia[j];
    copia[j] = temp;
  }

  return copia;
}
