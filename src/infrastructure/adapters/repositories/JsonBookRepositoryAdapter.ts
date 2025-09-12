import type { BookRepositoryPort } from '../../../domain/boundaries/output/BookRepositoryPort.js'
import { Book } from '../../../domain/entities/Book.js'
import { promises as fs } from 'fs'
import path from 'path'

// Adaptateur de persistance qui stocke les livres dans un fichier JSON.
export class JsonBookRepositoryAdapter implements BookRepositoryPort {
  private readonly filePath = path.resolve('data', 'books.json')
  private books: Book[] = []

  public static async createAndLoad(): Promise<JsonBookRepositoryAdapter> {
    const adapter = new JsonBookRepositoryAdapter()
    await adapter.loadBooks()
    return adapter
  }

  private async loadBooks(): Promise<void> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8')

      if (data === '') {
        console.log(
          "Fichier 'books.json' vide, initialisation d'un nouveau repository."
        )
        this.books = []
        return
      }

      const rawBooks = JSON.parse(data)
      this.books = rawBooks.map(
        (book: any) => new Book(book.title, book.author, book.isbn, book.id)
      )
      console.log('Livres chargés avec succès depuis le fichier JSON.')
    } catch (error) {
      if (
        error instanceof Error &&
        ((error as any).code === 'ENOENT' || error.name === 'SyntaxError')
      ) {
        console.log(
          "Fichier 'books.json' non trouvé ou invalide, initialisation d'un nouveau repository."
        )
        this.books = []
        try {
          await fs.mkdir(path.dirname(this.filePath), { recursive: true })
        } catch (mkdirError) {
          console.error(
            "Erreur lors de la création du répertoire 'data':",
            mkdirError
          )
        }
      } else {
        throw error
      }
    }
  }

  private async saveBooks(): Promise<void> {
    try {
      await fs.writeFile(
        this.filePath,
        JSON.stringify(this.books, null, 2),
        'utf-8'
      )
      console.log('Livres sauvegardés dans le fichier JSON.')
    } catch (error) {
      console.error('Erreur lors de la sauvegarde dans le fichier JSON:', error)
    }
  }

  async save(book: Book): Promise<void> {
    const existingBookIndex = this.books.findIndex((b) => b.id === book.id)

    if (existingBookIndex > -1) {
      this.books[existingBookIndex] = book
    } else {
      this.books.push(book)
    }
    await this.saveBooks()
  }

  async findAll(): Promise<Book[]> {
    return this.books
  }

  async findById(id: string): Promise<Book | null> {
    return this.books.find((book) => book.id === id) || null
  }
}
