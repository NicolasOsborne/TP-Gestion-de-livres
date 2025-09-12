import { Book } from '../../domain/entities/Book.js'
import type { AddBookInputPort } from '../../domain/boundaries/input/AddBookInputPort.js'
import type { BookRepositoryPort } from '../../domain/boundaries/output/BookRepositoryPort.js'

export class AddBookUseCase implements AddBookInputPort {
  private readonly bookRepository: BookRepositoryPort

  constructor(bookRepository: BookRepositoryPort) {
    this.bookRepository = bookRepository
  }

  async execute(title: string, author: string, isbn: string): Promise<Book> {
    const newBook = new Book(title, author, isbn)

    await this.bookRepository.save(newBook)

    return newBook
  }
}
