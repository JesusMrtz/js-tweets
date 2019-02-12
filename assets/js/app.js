// Variables a utilizar
const listaTweets = document.querySelector("#lista-tweets");

// EventListener
eventListener();

function eventListener() {
    //Se envia del formulario
    document.querySelector("#formulario").addEventListener("submit", agregarTweet);

    // Borrar tweets
    listaTweets.addEventListener("click", borrarTweet);

    // Contenido cargado
    document.addEventListener("DOMContentLoaded", cargarLocalStorage);
}

// Funciones

// Añadir tweet del formulario
function agregarTweet(e) {
    e.preventDefault();

    // Leer el valor del text area
    tweet = document.querySelector("#tweet").value;

    // Crear el boton de eliminar
    const borrarTweet = document.createElement("a");
    borrarTweet.textContent = "X";
    borrarTweet.classList = "borrar-tweet";

    // Crear elemento y añadirle el contenido a la lista
    const li = document.createElement("li");
    li.textContent = tweet;

    // Anadiendo boton y li 
    li.appendChild(borrarTweet);
    listaTweets.appendChild(li);

    // Añadir al localStorage
    agregarTweetLocalStorage(tweet);
}

// Elimina el tweet del DOM
function borrarTweet(e) {
    e.preventDefault();
    if (e.target.classList.contains("borrar-tweet")) {
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.textContent);
    }
}

// Mostrar datos de localStorage en la lista
function cargarLocalStorage() {
    let tweets = obtenerTweetsLocalStorage();

    tweets.forEach(tweet => {
        // Crear el boton de eliminar
        const borrarTweet = document.createElement("a");
        borrarTweet.textContent = "X";
        borrarTweet.classList = "borrar-tweet";

        // Crear elemento y añadirle el contenido a la lista
        const li = document.createElement("li");
        li.textContent = tweet;

        // Anadiendo boton y li 
        li.appendChild(borrarTweet);
        listaTweets.appendChild(li);
    });
}

// Agregar el tweet de localStorage
function agregarTweetLocalStorage(tweet) {
    let tweets = obtenerTweetsLocalStorage();

    // Añadir el nuevo tweet
    tweets.push(tweet);
    // Agregar al localStorage
    localStorage.setItem("tweets", JSON.stringify(tweets));
}

function obtenerTweetsLocalStorage() {
    let tweets;

    // Revisamos los valores de localStorage
    if (localStorage.getItem("tweets") == null) {
        tweets = [];
    } else {
        tweets = JSON.parse(localStorage.getItem("tweets"));
    }
    return tweets;
}

// Eliminar tweet del localStorage
function borrarTweetLocalStorage(tweet) {
    let tweets = obtenerTweetsLocalStorage();
    // Elimina la "X" del Tweet
    let borrarTweet = tweet.substring(0, tweet.length - 1);

    tweets.forEach((tweet, index) => {
        if (borrarTweet == tweet) {
            tweets.splice(index, 1);
        }
    });
    localStorage.setItem("tweets", JSON.stringify(tweets));

}