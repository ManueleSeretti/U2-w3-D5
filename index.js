const URL = "https://striveschool-api.herokuapp.com/api/product/";

const getData = async () => {
  try {
    const resp = await fetch(URL, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4NTgwZGMwMzRmZjAwMTQwM2Y0ZjMiLCJpYXQiOjE2OTI5NDg0OTMsImV4cCI6MTY5NDE1ODA5M30.xy9xQ3OljR7iv_RyYszLPu3XO3yOkNKJ95lrcQAErTE",
      },
    });
    const phones = await resp.json();
    console.log(phones);
    const row = document.getElementById("row");
    row.innerText = "";
    phones.forEach((phone) => {
      const col = document.createElement("div");
      col.className = "col-md-4 col-lg-3 my-4";
      col.innerHTML = `        <div class="card"">
      <img src="${phone.imageUrl}" class="card-img-top" alt="...">
      <div class="card-body">
      <h5 class="card-title">${phone.brand},${phone.name}</h5>
      <p class="card-text">tipo:${phone.description} </p>
      <p class="card-text">prezzo:${phone.price} €</p>
        <a href="./dettagli.html?IdPhone=${phone._id}" class="btn btn-outline-success">Dettagli</a>
        <a href="./back-office.html?IdPhone=${phone._id}" class="btn btn-outline-warning">Modifica</a>
      </div>
    </div>
    `;
      row.appendChild(col);
    });
  } catch (error) {
    console.log(error.message);
  }
};
getData();
