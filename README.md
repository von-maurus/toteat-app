# ToteatApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.6.

Tareas realizadas en este proyecto de ejemplo:

1) Se crea un proyecto en Angular 10+, se diseña el front end, se diseñan dos modulos, el de trabajadores y ventas y se crean componentes para mostrar la reportabilidad. Se utiliza CSS para los estilos, bootstrap para componentes con estilos y clases y una libreria llamada kuv-table (npm kuv-table) la cual es una tabla que permite mostrar datos y operaciones CRUD de forma rapida y además filtrar. 
2) Se configura el frontend implementando los servicios que se comunican con la API REST desarrollada con NodeJS, MongoDB y ExpressJS.
3) Por el lado del backend, se configura la API REST y las configuraciones del servidor programado usando NodeJS y ExpressJS. En esta parte se considera usar Babel para correr codigo antiguo y nuevo de JS por temas de notaciones. Se configura la conexion con la BD usando Mongoose.
4) La base de datos se sube a Atlas MongoDB utilizando el cluster starter para pruebas (gratuito). 
5) Se deja corriendo el backend dentro de un servidor en Clouding.io, se configura el servidor con mongo, node, pm2 (para gestionar los servicios levantados) y otras configuraciones. Se clona el projecto y se realiza el build de produccion (npm run build -> npm start). 

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
