import { Book } from '../../domain/entities/Book.js'
import type { ListBooksInputPort } from '../../domain/boundaries/input/ListBooksInputPort.js'
import type { BookRepositoryPort } from '../../domain/boundaries/output/BookRepositoryPort.js'

export class ListBooksUseCase implements ListBooksInputPort {
  private readonly bookRepository: BookRepositoryPort

  constructor(bookRepository: BookRepositoryPort) {
    this.bookRepository = bookRepository
  }

  async execute(): Promise<Book[]> {
    return await this.bookRepository.findAll()
  }
}
