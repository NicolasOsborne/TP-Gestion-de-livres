import type { BookOutputPort } from '../../../domain/boundaries/output/BookOutputPort.js'
import { Book } from '../../../domain/entities/Book.js'

// Ce présentateur gère l'affichage des résultats des use cases en mettant à jour le DOM
export class BookDomPresenter implements BookOutputPort {
  private readonly resultsContainer: HTMLElement

  constructor(resultsElementId: string) {
    const resultsElement = document.getElementById(resultsElementId)
    if (!resultsElement) {
      throw new Error(`Element with ID '${resultsElementId}' not found.`)
    }
    this.resultsContainer = resultsElement
  }

  private clearResults(): void {
    this.resultsContainer.innerHTML = ''
  }

  presentBooks(books: Book[]): void {
    this.clearResults()
    if (books.length === 0) {
      this.resultsContainer.innerHTML = `<p>Aucun livre trouvé.</p>`
      return
    }

    const listHtml = books
      .map(
        (book) => `
            <div>
               <strong>Titre:</strong> ${book.title}<br>
               <strong>Auteur:</strong> ${book.author}<br>
               <strong>ISBN:</strong> ${book.isbn}<br>
               <strong>ID:</strong> ${book.id}
            </div>
         `
      )
      .join('')

    this.resultsContainer.innerHTML = listHtml
  }

  presentBook(book: Book | null): void {
    this.clearResults()
    if (!book) {
      this.resultsContainer.innerHTML = `<p>Livre non trouvé.</p>`
    } else {
      this.resultsContainer.innerHTML = `
         <h4>Détails du livre :</h4>
         <p><strong>Titre:</strong> ${book.title}</p>
         <p><strong>Auteur:</strong> ${book.author}</p>
         <p><strong>ISBN:</strong> ${book.isbn}</p>
         <p><strong>ID:</strong> ${book.id}</p>
      `
    }
  }

  presentError(message: string): void {
    this.clearResults()
    this.resultsContainer.innerHTML = `<p style="color: red;">Erreur: ${message}</p>`
  }
}
