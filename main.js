//Cargar Service Worker
if ('serviceworker' in navigator) {
    console.log("Puedes usar el service worker");
    //configuracion de SW
    navigator.serviceWorker.register('/sw.js')
        .then(res => console.log("service worker registrado", res))
        .catch(err => console.log("Service worker sin ser registrado", err));

}
else {
    console.log("No se puede usar el service worker");
}