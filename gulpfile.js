const { series, src, dest, watch } = require("gulp");//funciones q importa de node_modules
//la funcion src es donde va a encontrar los archivos de sass
//dest toma la ruta donde estan guardada las cosas
//watch dice q archivos puede q se esten cambiando y ejecute una tarea

const sass = require("gulp-sass");//una funcion
const imagemin = require("gulp-imagemin");//imagen minificada
const notify = require("gulp-notify");//notificacion de las tareas
const webp = require("gulp-webp");//crea archivo webp de las img
const concat = require("gulp-concat");//compila todos los archivos js q creemos en 1 solo

//UTILIDADES CSS
//autoprefixer y postcss nos permiten agregar prefijos
const autoprefixer = require("gulp-autoprefixer");
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");//compila y "nanofica" el css
const sourcemaps = require("gulp-sourcemaps");//conservamos el archivo "original" de css con sus ubicaciones
const dos=[postcss,cssnano];

//UTILIDADES JS
const terser = require("gulp-terser-js");//MINIFICADOR DE JS
const rename = require("gulp-rename");//RENOMBRADOR

//funcion que compila sass
function css(){
    return src("src/scss/styles.scss")//returna la ubicacion del archivo de sass
        .pipe(sourcemaps.init())//inicia el mapa primero
        .pipe( sass())//compila el css
        .pipe(postcss(dos))//minifica el css y agregar prefijos
        .pipe(sourcemaps.write("."))//escribe nuestro propio "mapa"
        .pipe(dest("./build/css"))//ubicacion donde se "compile" sass
        //pipe recibe como argumento una funcion o un paquete importado, nosotros le pasamos sass
    }

/* function minificarCss(){//esto seria una funcion que comprimira nuestro archivo css
    return src("src/scss/styles.scss")
        .pipe(sass({
            outputStyle:"compressed"//es como un objeto que dira la forma en la q se compilara el archivo css, ya sea compressed para que este "comprimido" o "expanded" para que sea mas legible
        }))
        .pipe(dest("./build/css"))
        
} *///ESTA TAREA SE VUELVE "INTUIL" CON CSS Y LAS DEAMS TAREAS

function javascript(){
    return src("src/js/**/*")
        .pipe(sourcemaps.init())//INICIAMOS EL MAPA
        .pipe(concat("bundle.js"))//CONCATENAMOS NUESTROS SCRIPTS JS
        .pipe(terser())//MINIFICAMOS EL JS "CONCATENADO"
        .pipe(sourcemaps.write("."))//CREAMOS EL MAPA "ORIGINAL" DE LOS MAPS
        .pipe(rename({suffix:".min"}))//EL SUFFIX ES UN SUFIJO CON EL "NOMBRE" NUEVO
        .pipe(dest("./build/js"));//LO UBICAMOS YA MINIFICADO
}
function watchArchivos(){
    watch("src/scss/**/*.scss", css)//recibe 2 argumentos, primero lo que tiene que "escuchar", segundo es la tarea que tiene que hacer cuando escuche cambios
    //para q escuche todos los archivos de sass, tenemos q pasarle un *.scss para que escuche "todos"
    //para q encuentre los de las demas carpetas tiene q ser **/*, todos los arch de la 1 carpeta y demas
    watch("src/js/**/*", javascript);//hacemos q "autoguarde" constantemente con watch
}
function imagenes(){
    return src("src/img/**/*")//src es para buscar la ruta y **/* leera todas las carpetas y contenido
        .pipe(imagemin())
        .pipe( dest("./build/img"))//destino donde "dejara las img "
        .pipe(notify( {message:"Imagen Minificada"} ));//esta es una funcion q nos notifica q es lo q esta haciendo
}
function versionWebp(){
    return src("src/img/**/*")
        .pipe(webp())
        .pipe(dest("./build/img"))
        .pipe(notify({message:"Version Webp lista"}));
}

exports.css = css;//exportamos la tarea de compilar
/* exports.minificarCss = minificarCss;//exportamos la tarea de minificar */
exports.watchArchivos = watchArchivos;//exportamos la tarea de watch, es como un guardado "auto"
//cuando exportarmos algo lo mejor es ponerle el mismo nombre para no confundirse
exports.imagenes = imagenes;

exports.default = series(css,javascript, imagenes, versionWebp, watchArchivos);//esta tarea hara 1 cosa a la vez, unicamente escribiendo gulp en la terminal
//aca van las funciones