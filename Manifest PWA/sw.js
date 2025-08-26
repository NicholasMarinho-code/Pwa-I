if ('serviceWorker' in navigator) {
    console.log("app.js => Vamos registrar o service worker!!!");
    navigator.serviceWorker.register('/service-worker-minimum-to-intall-pwa.js')
        .then(registration => {
            console.log("app.js => Service Worker Registrado com Sucesso");
            console.dir(registration);
        })
        .catch(error => {
            console.log("app.js => Erro ao registrar Service Worker");
            console.dir(error);
        });
}   