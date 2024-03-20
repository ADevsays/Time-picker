# ⏰ Time-picker
Time picker creado con React para que sea reutilizable en otros proyectos. 
Es un componente que permite seleccionar hora, minutos y obtener el resultado en el formato de fecha local del usuario. 
Es perfectamente adaptable a otro software.

## 🤔 ¿Cómo usar?

- Primero clona este repo con 
```
git clone https://github.com/ADevsays/Time-picker
```
- Entra al proyecto e instala las dependencias

```
npm install
```
- Testea el componente corriendo con
```
npm run dev
```
- En la carpeta "components" están todos los componentes que necesitan usar. Copíalos en tu proyecto local.
- Para utilizar el time picker únicamente importa el componente TimePicker.jsx en tu aplicación luego de haber copiado el resto de componentes.
- Los estilos son muy importantes para que todo funcione, en el proyecto hay dos hojas de estilos: index.css y Clock.css; Ambos son necesarios, así que también deben ser copiados en el proyecto local.
- Para cambiar la paleta de colores se debe cambiar las variables del archico index.css en su sección ":root"
- En el componente TimePicker se almacenan los datos de la fecha escogida por el usuario. Para poder utilizar la fecha, hacer uso de la función getTimeInLocaleString.


  <small> Construido por Adevsays </small>
  
  
