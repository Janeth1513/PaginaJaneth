//agregar nombre y version de cache
const CACHE_NAME='v1_cache_BRZ_PWA';

//Configuracion de los ficheros 
var urlsToCache= [
    './',
    './css/Css.css',
    '../Img/Logo J 16px.png',
    './Img/Logo J 32px.png',
    './Img/Logo J 64px.png',
    './Img/Logo J 96px.png',
    './Img/Logo J 128px.png',
    './Img/Logo J 192px.png',
    './Img/Logo J 256px.png',
    './Img/Logo J 512px.png',
    './Img/Logo J 1024px.png',
    './img/Jsneth.jpeg',
]

//utilizamos la variable del evento
self.addEventListener("install",e=>{
e.waitUntil
caches.open(CACHE_NAME)
.then(Cache=>{
    //le mandamos los elementos que tenemos en el array
    return cache.addAll(urlsToCache)
    .then(()=>{
        self.skipWaiting();
    })
})
.catch(err=>console.log("No se ha registrado el cache",err))
});

//este evento activar nos permite que la pagina sea offline, osea que permite que se descarge 
self.addEventListener('activate', e =>{
    const cacheWhiteList = [CACHE_NAME];

    //el evento espera a que se termine
    e.waitUntil(
        caches.keys()
        .then(cacheNames=>{
            return Promise.all(
                cacheNames.map(cacheName => {
                if(cacheWhiteList.indexOf(cacheName)== -1)
                {
                    //borrar elementos que no se necesitan
                    return cache.delete(cacheName);
                }
                })
            );
        })
        .then(()=> {
            self.clients.claim(); // se activa el cache en el dispositivo 
        })
    );
})

//verifica que si se tienen los recursos en cache y si no los solicita
self.addEventListener('fetch', e=>{
    e.respondwith(
        caches.match(e.request)
        .then(res => {
            if(res){
                            //devuelvo datos desde ña cache
                return res;
            }
            return fetch(e.request); //se hace la peticion al servidor en caso de que no este disponible en ña cache
        })
    );
});