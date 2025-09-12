import { Book } from '../../entities/Book.js'

export interface GetBookInputPort {
  execute(id: string): Promise<Book | null>
}
