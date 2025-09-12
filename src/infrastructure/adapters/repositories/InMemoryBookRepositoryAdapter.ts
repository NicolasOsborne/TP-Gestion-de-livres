import type { BookRepositoryPort } from '../../../domain/boundaries/output/BookRepositoryPort.js'
import { Book } from '../../../domain/entities/Book.js'

export class InMemoryBookRepositoryAdapter implements BookRepositoryPort {
  private books: Book[] = []

  async save(book: Book): Promise<void> {
    const existingBookIndex = this.books.findIndex((b) => b.id === book.id)

    if (existingBookIndex > -1) {
      this.books[existingBookIndex] = book
    } else {
      this.books.push(book)
    }
    console.log(`Livre "${book.title}" sauvegardé en mémoire.`)
  }

  async findAll(): Promise<Book[]> {
    return this.books
  }

  async findById(id: string): Promise<Book | null> {
    return this.books.find((book) => book.id === id) || null
  }
}
