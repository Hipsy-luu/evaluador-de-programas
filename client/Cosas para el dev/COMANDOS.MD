Para correr el repo con cambios en caliente:

    >> ng serve --open

Para hacer el deploy para produccion:

    >> npm run build

Comando para resetar el servidor apache para node dentro de un ssh del servidor hosting
    >> pkill -9 Passenger

Comando para inicializar el proyecto
    >> firebase init

    {
        "hosting": {
            "site": "evaluador",
            "public": "public",
            ...
        }
    }
Comando para el despliegue en firebase

    >> firebase deploy --only hosting:evaluador

Project Console: https://console.firebase.google.com/project/evaluacion-da17e/overview
Hosting URL: https://evaluador.web.app