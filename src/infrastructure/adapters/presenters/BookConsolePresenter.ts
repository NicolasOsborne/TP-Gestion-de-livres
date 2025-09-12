import type { BookOutputPort } from '../../../domain/boundaries/output/BookOutputPort.js'
import { Book } from '../../../domain/entities/Book.js'

// Ce présentateur gère l'affichage des résultats des use cases (dans la console)
export class BookConsolePresenter implements BookOutputPort {
  presentBooks(books: Book[]): void {
    console.log('--- Liste des livres ---')
    if (books.length === 0) {
      console.log('Aucun livre trouvé.')
      return
    }
    books.forEach((book) => {
      console.log(
        `ID: ${book.id}, Titre: "${book.title}", Auteur: "${book.author}", ISBN: ${book.isbn}`
      )
    })
    console.log('-----------------------')
  }

  presentBook(book: Book | null): void {
    console.log('--- Détails du livre ---')
    if (!book) {
      console.log('Livre non trouvé.')
    } else {
      console.log(
        `ID: ${book.id}, Titre: "${book.title}", Auteur: "${book.author}", ISBN: ${book.isbn}`
      )
    }
    console.log('------------------------')
  }

  presentError(message: string): void {
    console.error(`Erreur: ${message}`)
  }
}
