import { Book } from '../../entities/Book.js'

// Méthode pour lister tous les livres
export interface ListBooksInputPort {
  execute(): Promise<Book[]>
}
