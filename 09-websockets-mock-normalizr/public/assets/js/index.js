const socket = io();

//carga de productos:

document.getElementById("products-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("product-title").value;
  const price = document.getElementById("product-price").value;
  const thumbnail = document.getElementById("product-image").value;
  const stock = document.getElementById("product-stock").value;
  const description = document.getElementById("product-description").value;

  const newProduct = {
    title: title,
    price: price,
    thumbnail: thumbnail,
    stock: stock,
    description: description,
  };

  socket.emit("new-product", newProduct);

  title = "";
  price = "";
  thumbnail = "";
  stock = "";
  description = "";
});

//vista de Productos

const renderProducts = (products) => {
  console.log(products);
  let hayProductos = true;
  if (!products[0]) hayProductos = false;
  const productsHtml = `
    {{#if hayProductos}}
    <table>
      <thead >
        <tr>
          <th >Nombre</th>
          <th >Precio</th>
          <th >Descripción</th>
          <th >Imagen</th>
          <th >Stock</th>
        </tr>
      </thead>
      <tbody>
        {{#each products}}
          <tr>
            <th>{{this.title}}</th>
            <td>{{this.price}}</td>
            <td>{{this.description}}</td>
            <td ><img  src={{this.thumbnail}}/></td>
            <td>{{this.stock}}</td>
          </tr>
        {{/each}}
      </tbody>
    </table>
  {{else}}
    <h2>No hay productos</h2>
  {{/if}}`;
  const template = Handlebars.compile(productsHtml);
  const html = template({ products, hayProductos });
  document.getElementById("list-container").innerHTML = html;
};

socket.on("products", (products) => {
  renderProducts(products);
});

//mensajes

const renderMessages = (messages) => {
  const chatHtml = `
    {{#each messages}}
          <div>
            <span style = "color:green">{{this.email}} </span>[<span style="color:red">{{this.time}}</span>]: <span>{{this.message}}</span>
          </div>
    {{/each}}
    `;
  const template = Handlebars.compile(chatHtml);
  const html = template({ messages });
  document.getElementById("chat-container").innerHTML = html;
};

socket.on("messages", (messages) => {
  const { denormalizedMessages, optimizationPercentage } =
    denormalizeMensajes(messages);
  renderMessages(denormalizedMessages);
  renderOptimization(optimizationPercentage);
});

document.getElementById("message-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("message-email").value;
  const message = document.getElementById("message-content").value;
  const time = new Date().toLocaleString();

  const newMessage = {
    author: {
      id: chatNombre.value,
      email: email,
      time: time,
      name: /* nombre || */ "nombreDefault",
      lastname: /* apellido || */ "apellidoDefault",
      age: /* edad || */ 99,
      alias: /* alias || */ "aliasDefault",
      avatar: /* avatar || */ "avatarDefault",
    },
    text: message.value,
  };

  socket.emit("new-message", newMessage);

  message.value = "";
});

function denormalizeMensajes(objMessages) {
  const author = new normalizr.schema.Entity("author");

  const message = new normalizr.schema.Entity(
    "message",
    { author: author },
    { idAttribute: "_id" }
  );

  const schemaMessages = new normalizr.schema.Entity("messages", {
    objMessages: [message],
  });

  const denormalized = normalizr.denormalize(
    objMessages.result,
    schemaMessages,
    objMessages.entities
  );

  const normalizedLength = JSON.stringify(objMessages).length;
  const denormalizedLenght = JSON.stringify(denormalized).length;
  const optimizationPercentage = (
    100 -
    (normalizedLength * 100) / denormalizedLenght
  ).toFixed(2);

  const denormalizedMessages = denormalized.messages.map(
    (message) => message._doc
  );

  return { denormalizedMessages, optimizationPercentage };
}

function renderOptimization(optimization) {
  const optimizationContainer = document.getElementById(
    "optimization-container"
  );
  optimizationContainer.innerHTML += `<b>${optimization}%</b>`;
}
