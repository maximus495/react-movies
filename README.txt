Requisitos para el curso de React:

Para aprobar el curso de React Fundamentales, debes completar la asignación informada al inicio. Puedes encontrar el diseño aquí: [Link a Figma](https://www.figma.com/file/YTiqOVNpUPkbaXS2u0bsYL/Curso-React-Js?type=design&node-id=0-1&t=Q3braqdgu8mdPuxz-0)

La API a utilizar para la asignación será la Movie Database API: [Link a la API](https://developer.themoviedb.org/reference/movie-details)

La asignación consta de dos vistas: "Login" y "Listado de películas."

**Login (vista pública):**

- Debe replicar el diseño de Figma, utilizando colores y estilos similares.
- Contendrá 3 inputs: email (validado como email válido), password (mínimo 7 caracteres) y checkbox de condiciones. (todos los inputs son requeridos)
- El botón "Crear cuenta" estará inhabilitado hasta que se cumplan todas las condiciones.
- Al completar el formulario correctamente, el botón "Crear cuenta" llamará al EP: [guest_session](https://api.themoviedb.org/3/authentication/guest_session/new)
- El EP devolverá un token que habilitará la vista del "Listado de películas" y se redireccionará automáticamente a ella.

**Notas de login:**

- No es necesario crear un usuario en esta API, ya que la intención de esta página es solo obtener el token y hacer las validaciones, pero si uds utilizan otro método de la API de películas el cual utilice un usuario real, deberá de facilitar las credenciales de dicho usuario para poder hacer la prueba del login.

**Listado de películas (vista privada):**

- Ruta privada, accesible sólo después de haber obtenido el token en la vista "Login."
- Incluirá un selector de tópicos: Now Playing, Popular, Top Rated, Upcoming (cada uno con su EP correspondiente). cada botón se debe resaltar al momento de ser seleccionado por el usuario. (Como estado por default deberá de estar seleccionada la vista de now playing)
- Al pasar el mouse sobre el cartel de películas, se mostrarán los detalles: título, año de salida, géneros, descripción, rating, duración (opcional, solo si la API la proporciona).
- Paginación como se muestra en el diseño (si la paginación se encuentra en la primera página, la flecha de la izq deberá de estar deshabilitada y si la paginación se encuentra en la última página la flecha de la derecha deberá de estar deshabilitada)

**Notas:**

- Puedes usar Next.js o React.js para desarrollar la aplicación.
- Se permite el uso de librerías de diseño como Bootstrap, AntD, Material Design, Chakra-UI, entre otros, para facilitar la construcción de la aplicación.
