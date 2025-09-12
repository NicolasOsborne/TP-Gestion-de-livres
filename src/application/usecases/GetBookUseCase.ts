import { Book } from '../../domain/entities/Book.js'
import type { GetBookInputPort } from '../../domain/boundaries/input/GetBookInputPort.js'
import type { BookRepositoryPort } from '../../domain/boundaries/output/BookRepositoryPort.js'

export class GetBookUseCase implements GetBookInputPort {
  private readonly bookRepository: BookRepositoryPort

  constructor(bookRepository: BookRepositoryPort) {
    this.bookRepository = bookRepository
  }

  async execute(id: string): Promise<Book | null> {
    return await this.bookRepository.findById(id)
  }
}
