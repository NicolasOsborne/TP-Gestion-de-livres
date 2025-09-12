import { Book } from '../../entities/Book.js'

export interface BookRepositoryPort {
  save(book: Book): Promise<void>
  findAll(): Promise<Book[]>
  findById(id: string): Promise<Book | null>
}
