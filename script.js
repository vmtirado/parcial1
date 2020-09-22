const url =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";
let json = "";
function getJson(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => resolve(response.json()))
      .catch((error) => reject(error));
  });
}
let carrito = [];
let load = (i) => {
  let title = document.getElementById("title");
  title.textContent = json[i].name;
  let row = document.getElementById("menu");
  let div = document.createElement("div");
  div.id = "menu";
  div.className = "row";
  json[i].products.forEach((object) => {
    let card = document.createElement("div");
    card.className = "card";
    card.style = "width: 18rem;";
    let cardBody = document.createElement("div");
    cardBody.className = "card-body";
    let cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.innerText = object.name;
    cardBody.appendChild(cardTitle);
    let cardImage = document.createElement("img");
    cardImage.src = object.image;
    cardImage.className = "card-img-top";
    cardBody.appendChild(cardImage);
    let cardDescription = document.createElement("p");
    cardDescription.innerText = object.description;
    cardBody.appendChild(cardDescription);
    let cardPrice = document.createElement("p");
    cardPrice.className = "font-weight-bold";
    cardPrice.innerText = "$"+object.price;
    cardBody.appendChild(cardPrice)
    let cardBtn = document.createElement("button");
    cardBtn.innerText = "Add to cart";
    cardBtn.className = "btn btn-dark";
    cardBtn.addEventListener("click", () => {
      let obj = {
        name: object.name,
        description: object.description,
        image: object.image,
        price: object.price,
        cant: 1,
      };

      if (carrito.filter((e) => e.name === object.name).length === 1) {
        let product = carrito.find((o) => {
          return o.name === object.name;
        });
        product.cant += 1;
      } else {
        carrito.push(obj);
      }
      let numItems = document.getElementById("numItems");
      numItems.innerText = carrito.length;
      
    });
    cardBody.appendChild(cardBtn);
    card.appendChild(cardBody);
    div.appendChild(card);
  });
  row.replaceWith(div);
};

let displayTable = () => {
  let table = document.createElement("table");
  table.className = "table table-striped";
  let thead = document.createElement("thead");
  let th1 = document.createElement("th");
  th1.innerText = "Item";
  let th2 = document.createElement("th");
  th2.innerText = "Qty.";
  let th3 = document.createElement("th");
  th3.innerText = "Description";
  let th4 = document.createElement("th");
  th4.innerText = "Unit price";
  let th5 = document.createElement("th");
  th5.innerText = "Ammount";
  thead.appendChild(th1);
  thead.appendChild(th2);
  thead.appendChild(th3);
  thead.appendChild(th4);
  thead.appendChild(th5);
  table.appendChild(thead);

  let row = document.getElementById("menu");
  let div = document.createElement("div");
  div.id = "menu";
  let i = 1;
  let tbody = document.createElement("tbody");
  let price=0
  carrito.forEach((obj) => {
    tr = document.createElement("tr");
    let td1 = document.createElement("td");
    td1.innerText = i;
    let td2 = document.createElement("td");
    td2.innerText = obj.cant;
    let td3 = document.createElement("td");
    td3.innerText = obj.name;
    let td4 = document.createElement("td");
    td4.innerText = obj.price;
    let td5 = document.createElement("td");
    td5.innerText = parseFloat(obj.price) * parseFloat(obj.cant);
    price+=parseFloat(obj.price) * parseFloat(obj.cant);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  div.appendChild(table);
  let innerdiv=document.createElement("div")
  innerdiv.className="row"

  let priceLabel=document.createElement("p")
  priceLabel.innerText="Total: $"+price
  let rightdiv=document.createElement("div")
  rightdiv.className="float-right"
  let btnCancel=document.createElement("button")
  btnCancel.innerText="Cancel"
  btnCancel.className="btn cancel"
  btnCancel.addEventListener("click",cancel)

  let btnConfirm=document.createElement("button")
  btnConfirm.innerText="Confirm Order"
  btnConfirm.className="btn confirm"
  btnConfirm.addEventListener("click",confirmOrder)
  rightdiv.appendChild(btnCancel)
  rightdiv.appendChild(btnConfirm)


  div.appendChild(rightdiv)
  div.appendChild(priceLabel)
  
  row.replaceWith(div);
};


function confirmOrder(){
  console.log(carrito)
  carrito=[]
  displayTable()
}
function cancel(){
  $("#myModal").modal();
}

let handleCancelOrder=document.getElementById("cancelOrder")
handleCancelOrder.addEventListener("click",()=>{
  carrito=[]
  displayTable()
});
let deleteTable=()=>{
  carrtio=[]
  displayTable()
}



function main() {
  getJson(url).then((data) => {
    json = data;
    //console.log(json);
    load(0);
  });
}

main();

let cart = document.getElementById("cart");
cart.addEventListener("click", () => {
  let title = document.getElementById("title");
  title.innerText = "Order detail";
  displayTable();
});
