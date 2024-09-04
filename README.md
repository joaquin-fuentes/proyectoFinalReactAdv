# Bienvenidos a SGE - Sistema de gestión educativa
<img src="https://github.com/joaquin-fuentes/proyectoFinalReactAdv/blob/dev/src/assets/imagenes/logo-sge-circle.png"></img>

> Nuestro sitio web ofrece una experiencia intuitiva para gestionar el control académico de manera efectiva. Permite a los usuarios interactuar con el sistema de diferentes formas según su rol. 

## Tabla de contenidos
* [Información del proyecto](#informacion)
* [Tecnologías utilizadas](#tecnologias)
* [Integrantes del equipo](#integrantes)

## Información del proyecto <a name="informacion"></a> 
  
  ### Descripción
  Este sistema de gestión académica está diseñado para facilitar la administración de usuarios, materias, cursos, asistencia y novedades de una institución educativa de nivel secundario. Los usuarios pueden iniciar sesión con diferentes roles que definen sus permisos y funcionalidades disponibles:

- **Administrador**: Acceso completo. Puede registrar nuevos usuarios, materias, cursos, horarios, gestionar la asistencia y novedades del sitio.
- **Alumno**: Acceso solo de visualización. Puede ver datos pero no editar ni eliminar.
- **Docente**: Acceso parcial. Puede modificar datos de asistencia y usar un formulario de contacto.
  
  ### Deploy: 
  
  ### ¿Cómo se hace una copia de esté proyecto?
  - Copiar la siguiente URL: https://github.com/joaquin-fuentes/proyectoFinalReactAdv
  - Abre la terminal en tu sistema operativo (puedes usar Git Bash en Windows, Terminal en macOS, o cualquier terminal en sistemas basados en Linux).
  - Usa el comando "cd" para cambiar al directorio en el que deseas almacenar el proyecto.
  - Utiliza el comando git clone seguido de la URL que copiaste anteriormente.
  - Presiona Enter y se descargará automáticamente el repositorio en tu máquina local.
  - Instalar dependencias: npm install
  - Utilizar el proyecto desde: npm run dev
  - Para poder levantar la api con la base de datos es necesario seguir los siguientes pasos:
  - En la carpeta raiz del proyecto crear un archivo ".env" y agregar el siguiente contenido
        VITE_API_USUARIO = http://localhost:3000/usuarios
        VITE_API_MATERIA = http://localhost:3000/materias
        VITE_API_CURSO= http://localhost:3000/cursos
        VITE_API_NOVEDAD = http://localhost:3000/novedades
        VITE_API_ASISTENCIA = http://localhost:3000/asistencias
  - Luego en la terminal, debe acceder a la carpeta del proyecto e introducir el siguiente comando: json-server --watch db.json (esto iniciara una api de manera local y podrá interactuar desde el front con el archivo db.json donde se encuentra nuestra base de datos).
  - Si aún no tiene instalado json-server es necesario ingresar a la terminal e ingresar el siguiente comando: npm i json-server

  ### ¿Cómo se ve nuestro proyecto?
  ### Página principal:
  - La página de inicio presenta una interfaz de login donde los usuarios pueden ingresar como Administrador, Alumno o Docente.
    
    <img src="https://github.com/joaquin-fuentes/proyectoFinalReactAdv/blob/dev/src/assets/img-README.md/captura-login.png"></img>

### Página de administración:

- El administrador tiene acceso a una interfaz completa para gestionar usuarios, materias, cursos, horarios, asistencia y novedades. A continuación se presenta una vista de ejemplo del menú del Administrador:

  <img src="https://github.com/joaquin-fuentes/proyectoFinalReactAdv/blob/dev/src/assets/img-README.md/captura-perfilAdmin.png"></img>
  
## Roles y permisos 

### Administrador
- **Vista:** Accede a una interfaz completa de administración.
- **Menú y opciones:**
  - Registro de nuevos usuarios (alumnos, docentes).
  - Gestión de materias, cursos y horarios.
  - Visualización y edición de asistencia.
  - Gestión de novedades del sitio.
  - Administrar usuarios: ver, editar y eliminar cuentas.

### Alumno
- **Vista:** Accede a una interfaz de visualización de datos.
- **Menú y opciones:**
  - Visualización de materias, cursos y horarios.
  - Consulta de asistencia y novedades.
  - Formulario de contacto para consultas.
  - No tiene opciones para editar ni eliminar datos.

### Docente
- **Vista:** Accede a una interfaz parcial con funcionalidades limitadas.
- **Menú y opciones:**
  - Modificación de datos de asistencia.
  - Consulta de materias, cursos y horarios.
  - Formulario de contacto para consultas.
  - No tiene acceso para gestionar usuarios o materias.

## Otras páginas del sitio:

### Error 404: 
Todos los botones que no cumplan una función específica se redireccionan a este sitio.

## Tecnologías utilizadas <a name="tecnologias"></a>

<img alt="html" src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img alt="css" src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
<img alt="Bootstrap" src="https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white">
<img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E">
<img alt="React" src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"/>

## Integrantes del equipo <a name="integrantes"></a>
- Andres Santamarina: https://github.com/AndresSantamarina | https://www.linkedin.com/in/andr%C3%A9s-eduardo-santamarina/
- Facundo Alejo Herrera: https://github.com/alejoh12 | https://www.linkedin.com/in/facundo-alejo-herrera-47965417b/
- Georgina Costilla: https://github.com/georginacostilla | https://www.linkedin.com/in/georgina-costilla/
- Joaquin Fuentes: https://github.com/joaquin-fuentes | https://www.linkedin.com/in/joaqu%C3%ADn-fuentes/
- Juan Toranzos: https://github.com/juantoranzos | https://www.linkedin.com/in/juan-toranzos-b46b77253/
