import { Book } from '../../entities/Book.js'

// Méthodes nécessaires pour la persistance des livres
export interface BookRepositoryPort {
  save(book: Book): Promise<void>
  findAll(): Promise<Book[]>
  findById(id: string): Promise<Book | null>
}
