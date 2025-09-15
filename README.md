# 🛒 Sistema de Gestión de Productos y Usuarios (TypeScript)

Este proyecto implementa un sistema de gestión de **usuarios y productos** para una tienda en línea, escrito en **TypeScript puro**.  
Incluye definición de tipos, clases, funciones, manejo de promesas, template literals y funciones auxiliares para trabajar con productos.

---

## 🚀 Funcionalidades principales

- **Usuarios (`Usuario`)**:  
  - Nombre, edad, email, rol (`cliente` o `administrador`) y estado activo/inactivo.
  - Validación de edad > 0 y email válido.
  - 80% de probabilidad de estar activo si no se especifica.

- **Productos (`Producto` y `ProductoClass`)**:  
  - Nombre, precio, descuento, stock y categoría.  
  - Validación de precios y stock >= 0.  
  - Descuento opcional, aleatorio entre 0–20%.  
  - Métodos:
    - `calcularPrecioFinal()` → aplica descuento.  
    - `actualizarStock(cantidad)` → actualiza y retorna stock restante.

- **Simulación de compra (`simularCompra`)**:  
  - Procesa la compra en 2 segundos.  
  - Rechaza si el usuario no está activo.  
  - Crea un **recibo detallado** con productos comprados, totales y productos agotados.

- **Funciones extra**:
  - `resumenUsuarioYProductos()` → muestra usuario + productos con precios finales.  
  - `filtrarProductosPorCategoria()` → filtra por categoría.  
  - `ordenarProductosPorPrecio()` → ordena productos asc/desc.  
  - `calcularValorInventario()` → calcula valor total del inventario.


