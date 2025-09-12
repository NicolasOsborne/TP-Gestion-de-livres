import type { Book } from '../../entities/Book.js'

// Méthode pour ajouter un livre
export interface AddBookInputPort {
  execute(title: string, author: string, isbn: string): Promise<Book>
}
