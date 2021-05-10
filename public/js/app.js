const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const message = document.querySelector("#weather-message");

//message.textContent = "";

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  message.textContent = "Loading...";
  const location = search.value;
  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          message.textContent = data.error;
        } else {
          message.textContent = data.weatherCondition;
        }
      });
    }
  );
});
