# Prueba Técnica PokeApi - Ofipol
## Autor: Francisco Belando 
Se pide una aplicación que use la PokeApi® en la que se cumplan los siguientes requisitos:
- Mostrar lista de Pokémon
- Mostrar información detallada del mismo
- Búsqueda de pokémon por nombre
- Recomendar una comida para el Pokémon desde TheMealDB®
- Diseño responsive

## Tecnologías usadas: ✔
- Next.js
- Tailwind CSS, Material Tailwind

## Estructura: Pages 📖
### Vista principal index.jsx:
![alt text](https://i.gyazo.com/694d20b98399746d3532333fae6d20af.png)
- Configurado para mostrar en http://localhost:3000/
- Sección Marquee en el Header 
- Barra de búsqueda por nombre con errores 
- Listado de pokemon con componente Accordion para poder plegarlo 
- Botones de navegación hacia la siguiente página o la anterior

### Vista detalle [name].jsx:
![alt text](https://i.gyazo.com/5978dc1fabd6f65a8bbc68201d3d3f5e.png)
- Configurado para mostrar en http://localhost:3000/name
- Sección Marquee en el Header, dice el nombre del Pokemon
- Botón para volver a la vista principal
### Vista detalle [name].jsx - Parte 2:
![alt_text](https://i.gyazo.com/ca599bababeec5ada40626d86fc3a054.png)
- Estadísticas y habilidades del pokémon
- Listado de movimientos del pokemon con componente Accordion para plegarlo
- Información de la comida recomendada para el pokemon

## Estructura: Componentes ⚙
### Búsqueda index.jsx:
![alt_text](https://i.gyazo.com/74bec1e68a67b4ab6b7b39cd2c875c61.png)
- Búsqueda por nombre, el cual tiene que ser exacto
- Si el resultado no coincide salta un mensaje de error
- Si no se busca nada el botón queda inutilizado

## Elementos utilizados 🛠
### Hooks React
- de Estado y de efecto: useState y useEffect, Fragment
### Next.js
- getServerSideProps para el fetch de los datos
- Axios para la petición a (TheMealDB)

## Componentes TailWindCSS 🎨
- Card: Header y Body para la vista detallada del pokemon
- Alert: para la alerta en el mensaje de error del buscador
- Button: para los diferentes botones utilizados
- Input: para la barra de búsqueda
- Accordion: Header y Body para desplegar contenido que ocupa mucho espacio en pantalla
- Typography: estilos para ciertos elementos

## Mejoras a realizar y fallos conocidos: 📌
- Botones de vista previa y siguiente no muestran correctamente los datos 
- Mejora estética de la parte del detalle

### Ha sido una experiencia enriquecedora en la que seguiré trabajando, si te ha gustado deja tu feedback y muchas gracias!! ✨
