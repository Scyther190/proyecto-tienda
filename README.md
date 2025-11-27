# Tienda Online - Backend Node.js + MySQL

API REST completa desarrollada con:
- Node.js + Express
- MySQL (mysql2/promise)
- Estructura profesional: routes → controllers → db
- CRUD completo de productos, usuarios y clientes
- Sistema de ventas con detalle y control de stock automático

## Endpoints principales

| Método | Ruta                        | Descripción                    |
|--------|-----------------------------|--------------------------------|
| GET    | `/api/productos`            | Listar productos               |
| POST   | `/api/productos`            | Crear producto                 |
| POST   | `/api/usuarios`             | Registrar usuario              |
| POST   | `/api/clientes`             | Registrar cliente              |
| POST   | `/api/ventas`               | Crear venta completa + restar stock |

## Tecnologías usadas
- Express.js
- MySQL2 con async/await
- Estructura MVC limpia
- Control de errores y validaciones

¡Proyecto 100% funcional y listo para producción!