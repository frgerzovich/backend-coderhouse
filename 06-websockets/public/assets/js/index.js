const socket = io();

//carga de productos:

document.getElementById("products-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const productTitle = document.getElementById("product-title");
  const productPrice = document.getElementById("product-price");
  const productImage = document.getElementById("product-image");

  const newProduct = {
    title: productTitle.value,
    price: productPrice.value,
    thumbnail: productImage.value,
  };

  socket.emit("new-product", newProduct);

  productTitle.value = "";
  productPrice.value = "";
  productImage.value = "";
});

//vista de Productos

const renderProducts = (products) => {
  let hayProductos = true;
  if (!products[0]) hayProductos = false;
  const productsHtml = `
    {{#if hayProductos}}
    <table>
      <thead >
        <tr>
          <th >Nombre</th>
          <th >Precio</th>
          <th >Imagen</th>
        </tr>
      </thead>
      <tbody>
        {{#each products}}
          <tr>
            <th>{{this.title}}</th>
            <td>{{this.price}}</td>
            <td class="align-middle"><img  src={{this.thumbnail}}/></td>
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
            <span class="fw-bold text-primary">{{this.email}} </span>[<span class="text-danger">{{this.time}}</span>]: <span class="fst-italic">{{this.content}}</span>
          </div>
    {{/each}}
    `;
    const template = Handlebars.compile(chatHtml);
    const html = template({ messages });
    document.getElementById("chat-container").innerHTML = html;
  };
  
  socket.on("messages", (messages) => {
    renderMessages(messages);
  });
  
  document.getElementById("message-form").addEventListener("submit", (e) => {
    e.preventDefault();
  
    const email = document.getElementById("message-email").value;
    const content = document.getElementById("message-content");
    const time = new Date().toLocaleString();
  
    const newMessage = {
      email,
      content: content.value,
      time
    };
  
    socket.emit("new-message", newMessage);
  
    content.value = "";
  });
  