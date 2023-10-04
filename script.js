let submitBtn = document.getElementById("submit-btn");

let generateGif = () => {
  //mostra loader fino a quando non carica i gif
  let loader = document.querySelector(".loader");
  loader.style.display = "block";
  document.querySelector(".wrapper").style.display = "none"; //nasconde i gif

  //prende la value dell'input
  let q = document.getElementById("search-box").value;
  //mostro 9 gif 3-3-3
  let gifCount = 9;
  //genera un offset casuale tra 0 e 100 così ogni volta che si clicca genera gif diverse
  let offset = Math.floor(Math.random() * 100);
  //API URL con offset casuale
  let finalURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}&limit=${gifCount}&offset=${offset}&rating=g&lang=en`;
  //pulisce la pagina
  document.querySelector(".wrapper").innerHTML = "";

  //chiama l'API
  fetch(finalURL)
    .then((resp) => resp.json())
    .then((info) => {
      //console.log(info.data);
      //tutti i dati sono in info.data
      let gifsData = info.data;
      gifsData.forEach((gif) => {
        //Genera un div per ogni gif
        let container = document.createElement("div");
        container.classList.add("container");
        let iframe = document.createElement("img");
        console.log(gif);
        iframe.setAttribute("src", gif.images.downsized_medium.url);
        iframe.onload = () => {
          //se iframe è caricato allora diminuisce il contatore
          gifCount--;
          if (gifCount == 0) {
            //se tutte le gif sono caricate allora nasconde il loader e mostra i gif
            loader.style.display = "none";
            document.querySelector(".wrapper").style.display = "grid";
          }
        };
        container.append(iframe);

        //copy button
        let copyBtn = document.createElement("button");
        copyBtn.innerText = "Copia Link";
        copyBtn.onclick = () => {
          //id del gif
          let copyLink = `https://media4.giphy.com/media/${gif.id}/giphy.mp4`;
          //copia il testo
          navigator.clipboard
            .writeText(copyLink)
            .then(() => {
              alert("GIF copiata");
            })
            .catch(() => {
              //se non funziona il clipboard usa un input temporaneo
              alert("GIF copiata");
              let hiddenInput = document.createElement("input");
              hiddenInput.setAttribute("type", "text");
              document.body.appendChild(hiddenInput);
              hiddenInput.value = copyLink;
              hiddenInput.select();
              document.execCommand("copy");
              document.body.removeChild(hiddenInput);
            });
        };
        container.append(copyBtn);
        document.querySelector(".wrapper").append(container);
      });
    });

  const footer = document.getElementById('footer');

  footer.addEventListener('click', function() {
    window.location.href = 'https://github.com/skerdivelo';
  });
};


//Genera le gif quando si clicca il bottone
submitBtn.addEventListener("click", generateGif);
window.addEventListener("load", generateGif);
