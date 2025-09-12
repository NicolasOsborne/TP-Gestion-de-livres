import type { AddBookInputPort } from '../../../domain/boundaries/input/AddBookInputPort.js'
import type { ListBooksInputPort } from '../../../domain/boundaries/input/ListBooksInputPort.js'
import type { GetBookInputPort } from '../../../domain/boundaries/input/GetBookInputPort.js'
import type { BookOutputPort } from '../../../domain/boundaries/output/BookOutputPort.js'

// Le contrôleur qui gère les interactions de l'utilisateur
export class BookController {
  constructor(
    private readonly addBookUseCase: AddBookInputPort,
    private readonly listBooksUseCase: ListBooksInputPort,
    private readonly getBookUseCase: GetBookInputPort,
    private readonly bookPresenter: BookOutputPort
  ) {}

  async addBook(title: string, author: string, isbn: string): Promise<void> {
    try {
      const book = await this.addBookUseCase.execute(title, author, isbn)
      this.bookPresenter.presentBook(book)
    } catch (error) {
      console.error(error)
      this.bookPresenter.presentError(
        "Impossible d'ajouter le livre. Veuillez vérifier les données."
      )
    }
  }

  async listBooks(): Promise<void> {
    try {
      const books = await this.listBooksUseCase.execute()
      this.bookPresenter.presentBooks(books)
    } catch (error) {
      console.error(error)
      this.bookPresenter.presentError(
        "Impossible d'afficher la liste des livres."
      )
    }
  }

  async getBook(id: string): Promise<void> {
    try {
      const book = await this.getBookUseCase.execute(id)
      this.bookPresenter.presentBook(book)
    } catch (error) {
      console.error(error)
      this.bookPresenter.presentError(
        "Impossible de trouver le livre. Assurez-vous que l'ID est correct."
      )
    }
  }
}
