class User {
  constructor(firstName, lastName, books, pets) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.books = books;
    this.pets = pets;
  }
  getName() {
    let fullName = this.firstName + " " + this.lastName;
    return fullName;
  }
  addPet(newPet) {
    this.pets.push(newPet);
  }
  countPets() {
    let petsQuantity = `Tenés ${this.pets.length} mascotas`;
    return petsQuantity;
  }

  addBook(newBook, author) {
    this.books.push({ bookName: newBook, authorName: author });
  }
  getBookNames() {
    let booksNames = this.books.map((book) => book.bookName);
    return booksNames;
  }
}

const newUser = new User(
  "Frany",
  "Rodríguez Gerzovich",
  [
    { bookName: "El Resplandor", authorName: "Stephen King" },
    {
      bookName: "Boquitas Pintadas",
      authorName: "Manuel Puig",
    },
  ],
  ["Haru", "Kali"]
);
console.log("Bienvenidx, " + newUser.getName());
newUser.addPet("Aki");
console.log(newUser.countPets() + ". Sus nombres son " + newUser.pets);
newUser.addBook("Mujeres", "Charles Bukowski");
console.log("Libros en la biblioteca:" + newUser.getBookNames());
