import { JsonBookRepositoryAdapter } from '../adapters/repositories/JsonBookRepositoryAdapter.js'
import { BookConsolePresenter } from '../adapters/presenters/BookConsolePresenter.js'
import { BookController } from '../adapters/controllers/BookController.js'
import { AddBookUseCase } from '../../application/usecases/AddBookUseCase.js'
import { ListBooksUseCase } from '../../application/usecases/ListBooksUseCase.js'
import { GetBookUseCase } from '../../application/usecases/GetBookUseCase.js'
import { Book } from '../../domain/entities/Book.js'

async function main() {
  console.log("Démarrage de l'application de gestion de livres...")

  // Étape 1 : Assemblage
  const bookRepository = await JsonBookRepositoryAdapter.createAndLoad()
  const bookPresenter = new BookConsolePresenter()

  const addBookUseCase = new AddBookUseCase(bookRepository)
  const listBooksUseCase = new ListBooksUseCase(bookRepository)
  const getBookUseCase = new GetBookUseCase(bookRepository)

  const bookController = new BookController(
    addBookUseCase,
    listBooksUseCase,
    getBookUseCase,
    bookPresenter
  )

  // Étape 2 : Simulation des interactions utilisateur
  console.log('\n--- Simulation : Ajout de livres ---')
  const book1 = new Book("L'art de la guerre", 'Sun Tzu', '978-2266016145')
  await bookController.addBook(book1.title, book1.author, book1.isbn)

  const book2 = new Book('1984', 'George Orwell', '978-2070368224')
  await bookController.addBook(book2.title, book2.author, book2.isbn)

  console.log('\n--- Simulation : Liste des livres ---')
  await bookController.listBooks()

  // On va chercher le livre de George Orwell, on a besoin de son ID
  console.log("\n--- Simulation : Recherche d'un livre par ID ---")
  const foundBook = (await listBooksUseCase.execute()).find(
    (b) => b.title === '1984'
  )
  if (foundBook) {
    await bookController.getBook(foundBook.id)
  } else {
    bookPresenter.presentError("Livre '1984' non trouvé pour la démonstration.")
  }

  console.log("\n--- Simulation : Recherche d'un livre inexistant ---")
  await bookController.getBook('un-id-qui-n-existe-pas')

  console.log('\nApplication terminée.')
}

main().catch(console.error)
