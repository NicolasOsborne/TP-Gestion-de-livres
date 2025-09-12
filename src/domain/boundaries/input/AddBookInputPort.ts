import type { Book } from '../../entities/Book.js'

export interface AddBookInputPort {
  execute(title: string, author: string, isbn: string): Promise<Book>
}
