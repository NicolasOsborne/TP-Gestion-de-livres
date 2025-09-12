import { Book } from '../../entities/Book.js'

// Méthodes pour présenter les résultats des use cases
export interface BookOutputPort {
  presentBooks(books: Book[]): void
  presentBook(book: Book | null): void
  presentError(message: string): void
}
