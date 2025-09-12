// URL de base de l'API
const API_URL = 'http://localhost:3000'

/**
 * Affiche un message dans la zone de résultats.
 * @param {string} message Le message à afficher.
 * @param {boolean} isError Indique si le message est une erreur.
 */
function displayMessage(message, isError = false) {
  const resultsContent = document.getElementById('resultsContent')
  if (resultsContent) {
    resultsContent.innerHTML = `<pre style="color: ${
      isError ? 'red' : 'inherit'
    };">${message}</pre>`
  }
}

/**
 * Affiche la liste des livres dans le DOM.
 * @param {Array} books La liste des livres à afficher.
 */
function displayBooks(books) {
  const resultsContent = document.getElementById('resultsContent')
  if (!resultsContent) return

  if (books.length === 0) {
    displayMessage('Aucun livre trouvé.')
    return
  }

  const listHtml = books
    .map((book) => {
      return `
         <div>
            <strong>Titre:</strong> ${book.title}<br>
            <strong>Auteur:</strong> ${book.author}<br>
            <strong>ISBN:</strong> ${book.isbn}<br>
            <strong>ID:</strong> ${book.id}
         </div>
      `
    })
    .join('')

  resultsContent.innerHTML = listHtml
}

document.addEventListener('DOMContentLoaded', () => {
  const addBookForm = document.getElementById('addBookForm')
  addBookForm.addEventListener('submit', async (event) => {
    event.preventDefault()

    const title = document.getElementById('add-title').value
    const author = document.getElementById('add-author').value
    const isbn = document.getElementById('add-isbn').value

    try {
      const response = await fetch(`${API_URL}/books`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author, isbn }),
      })

      if (response.ok) {
        const newBook = await response.json()
        displayMessage(`Livre ajouté avec succès : ${newBook.title}`)
        addBookForm.reset()
      } else {
        const error = await response.json()
        displayMessage(`Erreur : ${error.error}`, true)
      }
    } catch (error) {
      displayMessage(`Erreur de connexion : ${error.message}`, true)
    }
  })

  const listBooksButton = document.getElementById('listBooksButton')
  listBooksButton.addEventListener('click', async () => {
    try {
      const response = await fetch(`${API_URL}/books`)
      if (response.ok) {
        const books = await response.json()
        displayBooks(books)
      } else {
        const error = await response.json()
        displayMessage(`Erreur : ${error.error}`, true)
      }
    } catch (error) {
      displayMessage(`Erreur de connexion : ${error.message}`, true)
    }
  })

  const getBookForm = document.getElementById('getBookForm')
  getBookForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    const id = document.getElementById('search-id').value

    try {
      const response = await fetch(`${API_URL}/books/${id}`)
      if (response.ok) {
        const book = await response.json()
        displayBooks([book])
      } else {
        const error = await response.json()
        displayMessage(`Erreur : ${error.error}`, true)
      }
    } catch (error) {
      displayMessage(`Erreur de connexion : ${error.message}`, true)
    }
  })
})
