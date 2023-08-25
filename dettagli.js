const URL = "https://striveschool-api.herokuapp.com/api/product/";
const idPhone = new URLSearchParams(window.location.search).get("IdPhone");

window.onload = async () => {
  try {
    const response = await fetch(URL + idPhone, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4NTdjMWMwMzRmZjAwMTQwM2Y0ZjEiLCJpYXQiOjE2OTI5NDg0MTcsImV4cCI6MTY5NDE1ODAxN30.EQWch_R8eD87k-4LsVV7Iq-_7aJGPswBBj-VuMTqVuE",
      },
    });

    const phone = await response.json();

    const row = document.getElementById("row");
    row.innerText = "";
    const col = document.createElement("div");
    col.className = "col-3";

    col.innerHTML = `        <div class="card"">
    <img src="${phone.imageUrl}" class="card-img-top img-fluid" alt="...">
    <div class="card-body">
      <h5 class="card-title">${phone.brand},${phone.name}</h5>
      <p class="card-text">tipo:${phone.description} </p>
      <p class="card-text">prezzo:${phone.price} € </p>
      <p class="card-text">ID:${phone._id} </p>
      
      <a href="./back-office.html?IdPhone=${phone._id}" class="btn btn-primary">Modifica</a>
    </div>
  </div>
  `;
    row.appendChild(col);
  } catch (error) {
    console.log(error);
  }
};
