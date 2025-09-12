import { Book } from '../../entities/Book.js'

export interface ListBooksInputPort {
  execute(): Promise<Book[]>
}
