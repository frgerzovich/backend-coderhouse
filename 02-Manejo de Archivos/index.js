const fs = require("fs");
class Container {
  constructor(fileName) {
    this.fileName = fileName;
    this.filePath = `./${fileName}`;
    this.encoding = "utf-8";
    this.fileContent = [];
    this.currentId = 1;

    return new Promise((resolve, reject) => {
      fs.promises
        .readFile(this.filePath, this.encoding)
        .then((data) => {
          console.log("El archivo ya existe. Se cargaron sus datos.");
          this.fileContent = JSON.parse(data);
          this.currentId = this.fileContent.length
            ? this.fileContent[this.fileContent.length - 1].id + 1
            : 1;
          resolve(this);
        })
        .catch((err) => {
          console.log(err);
          fs.writeFileSync(this.filePath, "[]");
          console.log("El archivo ha sido creado.");
          resolve(this);
        });
    });
  }

  async save(newObject) {
    try {
      newObject.id = this.currentId;
      this.fileContent.push(newObject);
      await fs.promises.writeFile(
        this.filePath,
        JSON.stringify(this.fileContent)
      );
      this.currentId++;
      return console.log(
        `El elemento con id: ${newObject.id} ha sido guardado correctamente.`
      );
    } catch (error) {
      return console.log(
        `Se produjo el siguiente error: ${error}. Intente otra vez.`
      );
    }
  }

  getById(id) {
    const element = this.fileContent.find((item) => {
      return item.id === id;
    });
    if (!element) {
      console.log(`No existe ningún objeto con el id ${id}`);
    } else {
      console.log(element);
      return element;
    }
  }

  getAll() {
    console.log(this.fileContent);
    return this.fileContent;
  }

  async deleteById(id) {
    try {
      const elementToDelete = this.fileContent.find((item) => {
        return item.id === id;
      });
      if (!elementToDelete) {
        return console.log(`No existe ningún objeto con el id ${id}`);
      }
      this.fileContent = this.fileContent.filter((item) => {
        return item.id !== id;
      });
      await fs.promises.writeFile(
        this.filePath,
        JSON.stringify(this.fileContent)
      );
      console.log(`El elemento con id: ${id} ha sido eliminado correctamente.`);
    } catch (error) {
      console.log("Ocurrió un error eliminando el elemento.");
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(this.filePath, "[]");
      console.log(`Se han eliminado todos los elementos.`);
      this.fileContent = [];
    } catch (error) {
      console.log("Ocurrió un error eliminando los elementos.");
    }
  }
}

new Container("productos.txt").then(async (cont) => {
  let container = cont;
  await container.save({
    title: "La chica a la orilla del mar (tomo único)",
    price: 1000,
  });
  await container.save({ title: "One Piece tomo 222562156", price: 700 });
  await container.save({ title: "Figura de acción Miku Hatsune", price: 6500 });

  container.getById(1);
  container.getAll();
  await container.deleteById(2);
  container.getAll();
  await container.deleteAll();
  container.getAll();
});
