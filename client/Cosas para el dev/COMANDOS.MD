Para correr el repo con cambios en caliente:

    >> ng serve --open

Para hacer el deploy para producción:

    >> npm run build

Comando para resetar el servidor apache para node dentro de un ssh del servidor hosting
    >> pkill -9 Passenger

Comando para inicializar el proyecto
    >> firebase init

    {
        "hosting": {
            "site": "evaluadorp",
            "public": "public",
            ...
        }
    }
Comando para el despliegue en firebase
    >> npm run build
    >> firebase deploy --only hosting:evaluadorp

Project Console: https://console.firebase.google.com/project/evaluacion-da17e/overview
Hosting URL: https://evaluador.web.app