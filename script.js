const url="https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json"
let json="";
function getJson(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((response) => resolve(response.json()))
        .catch((error) => reject(error));
    });
  }
let row=document.getElementById("menu")
  let load= (i)=>{
      json[i].products.forEach(object => {
        let card = document.createElement('div');
        card.className = 'card';
        card.style="width: 18rem;"
        let cardBody = document.createElement('div');
        cardBody.className = 'card-body';
        let cardTitle=document.createElement("h5")
        cardTitle.className = 'card-title';
        cardTitle.innerText=object.name
        cardBody.appendChild(cardTitle)
        let cardImage=document.createElement('img')
        cardImage.src=object.image
        cardImage.className="card-img-top" 
        cardBody.appendChild(cardImage)
        let cardDescription = document.createElement('p');
        cardDescription.innerText=object.description
        cardBody.appendChild(cardDescription)
        let cardBtn=document.createElement("button")
        cardBtn.innerText="add to cart"
        cardBody.appendChild(cardBtn)
        card.appendChild(cardBody);
        row.appendChild(card);
      });
  }

  function main() {
    getJson(url).then((data) => {
        json=data
        load(0)
    });
  }

  main();