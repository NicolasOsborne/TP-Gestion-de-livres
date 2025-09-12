import { Book } from '../../entities/Book.js'

export interface BookOutputPort {
  presentBooks(books: Book[]): void
  presentBook(book: Book | null): void
  presentError(message: string): void
}
