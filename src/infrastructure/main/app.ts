import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { JsonBookRepositoryAdapter } from '../adapters/repositories/JsonBookRepositoryAdapter.js'
import { AddBookUseCase } from '../../application/usecases/AddBookUseCase.js'
import { ListBooksUseCase } from '../../application/usecases/ListBooksUseCase.js'
import { GetBookUseCase } from '../../application/usecases/GetBookUseCase.js'

async function bootstrap() {
  const app = express()
  const PORT = 3000

  app.use(bodyParser.json())
  app.use(cors())

  const bookRepository = await JsonBookRepositoryAdapter.createAndLoad()
  const addBookUseCase = new AddBookUseCase(bookRepository)
  const listBooksUseCase = new ListBooksUseCase(bookRepository)
  const getBookUseCase = new GetBookUseCase(bookRepository)

  app.listen(PORT, () => {
    console.log(`Le serveur de l'API est démarré sur http://localhost:${PORT}`)
  })

  app.post('/books', async (req, res) => {
    try {
      const { title, author, isbn } = req.body
      const newBook = await addBookUseCase.execute(title, author, isbn)
      res.status(201).json(newBook)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "Impossible d'ajouter le livre." })
    }
  })

  app.get('/books', async (req, res) => {
    try {
      const books = await listBooksUseCase.execute()
      res.status(200).json(books)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Impossible de lister les livres.' })
    }
  })

  app.get('/books/:id', async (req, res) => {
    try {
      const { id } = req.params
      const book = await getBookUseCase.execute(id)
      if (book) {
        res.status(200).json(book)
      } else {
        res.status(404).json({ error: 'Livre non trouvé.' })
      }
    } catch (error) {
      console.error(error)
      res
        .status(500)
        .json({ error: 'Erreur lors de la récupération du livre.' })
    }
  })
}

bootstrap().catch(console.error)
