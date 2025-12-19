const input = document.querySelector("#input-country");
const output = document.querySelector("#output-text");

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const country = input.value.trim();

    if (country !== "") {
      if (output.textContent.length > 0) {
        output.textContent += ", " + country;
      } else {

        output.textContent += country;
      }

      input.value = "";
    }
  }
});
