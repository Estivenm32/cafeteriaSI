															Prueba Tecnica Konecta
															

# Descripción 

Este proyecto se realiza con el fin de dar solución a la necesidad de un software para una cafeteria 
que permita almacenar y gestionar el inventario de sus productos. El sistemas permite la creación de
productos, la edición de los productos, la eliminación de productos y listar todos los productos
registrados en el sistema.

Adicionalmente cuenta con un módulo que permite realizar la venta de un producto, el cual se 
mostrar en una lista desplegable con los productos disponibles para la venta,si no hay stock no se 
debe mostrar el producto, y un campo para digitar la cantidad a vender. El software  actualiza el campo de
stock restando la cantidad del producto vendido y registrar en una tabla la venta realizada.

Este Proyecto se realizó con el fin de cumplir el siguiente requerimiento: Evaluar  habilidades y conocimientos

# Requisitos previos

>Tener instalada una versión de Node js en mi caso tengo la versión (22.11.0)
>Tener instalada una versión de MySQL Workbench en mi caso la versión (8.0 CE)


# Pasos para ejecutar el proyecto 

>Descargar el proyecto "cafeteriaSI"
>Dentro del proyecto se encuenta una carpeta llamada "DB" donde se encuenta la base de datos del proyecto, la base de datos 
debe ser ejecutada de forma local en el gestor de MySQL:

	Despues de importar la base de datos en MySQL Workbench, aplicar las siguientes consultas en un Query para visualizar los datos:
	
	SELECT * FROM cafeteria.products;
	SELECT * FROM cafeteria.sales;
	
>Abrir el proyecto "cafeteriaSI" en un editor de código, puede utilizar Visual Studio Code. 
>En la carpeta backend\config abrir el archivo db.js y verificar que la conexión de la base de datos MySQL sean las mismas que las credenciales configuradas en tu MySQL Workbench:

	user: 'root', 
	password: 'tu_contraseña' - "ejemplo: 12345 o root"
  
>En la terminal del Visual Studio Code o en CMD(Si lo ejecutas en cmd debe ser como Administrador), ubicarse en la carpeta  "backend"  Y ejecutar el comando "npm start" y debe mostrar:

	> backend@1.0.0 start
	> node server.js

	Server running on http://localhost:5000
	Database connected!
	
	Nota: en caso de que no se realice la conexión de forma correcta, debe verificar que las credenciales del archvibo db.js esten correctas.
	
>En una nueva terminal de Visual Studio Code o en CMD(Si lo ejecutas en cmd debe ser como Administrador) ubicarse en la carpeta "frontend"  Y ejecutar el comando "npm run dev" el proyecto se debe ver en
http://localhost:5173/ o en el puerto local que le indique.

# Tecnologias:

>React
>Javascript
>Node js
>Express
>MySQL
>Tailwind


La comunicación entre frontend y backend se realizo atraves de api rest

# Créditos

Estiven Mampira
