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
![alt text](https://i.gyazo.com/cfec4aa9df2bde1ce42bc82440347ebe.png)
- Configurado para mostrar en http://localhost:3000/
- Sección Marquee en el Header 
- Barra de búsqueda por nombre con errores 
- Listado de pokemon con componente Accordion para poder plegarlo 
- Botones de navegación hacia la siguiente página o la anterior(Working on it)

### Vista detalle [name].jsx:
![alt text](https://i.gyazo.com/759dfcbf9fb6c8a3c2f305ec516e1348.png)
- Configurado para mostrar en http://localhost:3000/name
- Sección Marquee en el Header, dice el nombre del Pokemon
- Botones para volver a la vista principal y para movernos al pokemon anterior/siguiente
### Vista detalle [name].jsx - Parte 2:
![alt_text](https://i.gyazo.com/2fd5ca13c22fc35e1ce9f9fc26a792a7.png)
- Estadísticas y habilidades del pokémon
- Listado de movimientos del pokemon con componente Accordion para plegarlo
- Información de la comida recomendada para el pokemon
- Botones para volver a la vista principal y para movernos al pokemon anterior/siguiente

## Estructura: Componentes ⚙
### Búsqueda index.jsx:
![alt_text](https://i.gyazo.com/fdd4427ce321f2162f90cd45b8b3a4f8.png)
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
- Mejora estética de la página detalle

### Deja tu feedback para seguir mejorando y gracias!! ✨
