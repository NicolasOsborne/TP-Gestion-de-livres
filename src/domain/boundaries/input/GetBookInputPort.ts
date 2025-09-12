import { Book } from '../../entities/Book.js'

// Méthode pour obtenir un livre par ID
export interface GetBookInputPort {
  execute(id: string): Promise<Book | null>
}
