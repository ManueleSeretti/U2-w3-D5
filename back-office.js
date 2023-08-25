const idPhone = new URLSearchParams(window.location.search).get("IdPhone");
const URL = idPhone
  ? "https://striveschool-api.herokuapp.com/api/product/" + idPhone
  : "https://striveschool-api.herokuapp.com/api/product/";
window.onload = async () => {
  const btn = document.getElementById("btn");
  const resetBtn = document.getElementById("reset-btn");
  resetBtn.onclick = reset;
  const deleteBtn = document.getElementById("delete-btn");
  deleteBtn.onclick = deletePhone;
  if (idPhone) {
    const resp = await fetch(URL, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4NTdjMWMwMzRmZjAwMTQwM2Y0ZjEiLCJpYXQiOjE2OTI5NDg0MTcsImV4cCI6MTY5NDE1ODAxN30.EQWch_R8eD87k-4LsVV7Iq-_7aJGPswBBj-VuMTqVuE",
      },
    });
    if (resp.ok) {
      const { name, description, brand, imageUrl, price } = await resp.json();

      document.getElementById("name").value = name;
      document.getElementById("description").value = description;
      document.getElementById("brand").value = brand;
      document.getElementById("url").value = imageUrl;
      document.getElementById("price").value = price;

      btn.innerText = "Modifica";

      deleteBtn.classList.remove("d-none");
    }
  }
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const newPhone = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    brand: document.getElementById("brand").value,
    imageUrl: document.getElementById("url").value,
    price: parseInt(document.getElementById("price").value),
  };

  try {
    const resp = await fetch(URL, {
      method: idPhone ? "PUT" : "POST",
      body: JSON.stringify(newPhone),
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4NTgwZGMwMzRmZjAwMTQwM2Y0ZjMiLCJpYXQiOjE2OTI5NDg0OTMsImV4cCI6MTY5NDE1ODA5M30.xy9xQ3OljR7iv_RyYszLPu3XO3yOkNKJ95lrcQAErTE",
      },
    });
    const phone = await resp.json();
    if (idPhone) {
      alert("Il prodotto con id " + phone._id + " e' stato modificato.");
    } else {
      alert("Il prodotto con id" + phone._id + "e' stato creato con successo ");
      document.getElementById("name").value = "";
      document.getElementById("description").value = "";
      document.getElementById("brand").value = "";
      document.getElementById("price").value = "";
      document.getElementById("url").value = "";
    }
  } catch (error) {
    console.log(error.message);
  }
};

const deletePhone = async () => {
  const accepted = confirm("sei sicuro di volerlo cancellare?");
  if (accepted) {
    const resp = await fetch(URL, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4NTdjMWMwMzRmZjAwMTQwM2Y0ZjEiLCJpYXQiOjE2OTI5NDg0MTcsImV4cCI6MTY5NDE1ODAxN30.EQWch_R8eD87k-4LsVV7Iq-_7aJGPswBBj-VuMTqVuE",
      },
    });

    const phone = await resp.json();
    alert("hai eliminato il prodotto con id: " + phone._id);
    window.location.assign("./index.html");
  } else {
    alert("operazione annullata");
  }
};

const reset = () => {
  const conferma = confirm("sei sicuro di volerlo cancellare tutti i campi?");
  if (conferma) {
    document.getElementById("name").value = "";
    document.getElementById("description").value = "";
    document.getElementById("brand").value = "";
    document.getElementById("price").value = "";
    document.getElementById("url").value = "";
    alert("i campi sono stati resettati");
  }
};
