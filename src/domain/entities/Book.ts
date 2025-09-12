export class Book {
  public readonly id: string
  public readonly title: string
  public readonly author: string
  public readonly isbn: string

  constructor(title: string, author: string, isbn: string, id?: string) {
    this.title = title
    this.author = author
    this.isbn = isbn
    this.id = id || this.generateId()
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 7)
  }
}
