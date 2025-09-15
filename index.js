"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcularValorInventario = exports.ordenarProductosPorPrecio = exports.filtrarProductosPorCategoria = exports.simularCompra = exports.resumenUsuarioYProductos = exports.crearProducto = exports.crearUsuario = void 0;
class ProductoClass {
    constructor({ nombre, precio, descuento, stock, categoria }) {
        this.calcularPrecioFinal = () => {
            const precioConDescuento = this.precio * (1 - this.descuento / 100);
            return Math.round(precioConDescuento * 100) / 100;
        };
        this.nombre = nombre;
        this.precio = precio;
        this.descuento = descuento;
        this.stock = stock;
        this.categoria = categoria;
    }
    actualizarStock(cantidad) {
        if (!Number.isFinite(cantidad) || cantidad < 0) {
            throw new Error("La cantidad debe ser un número >= 0");
        }
        this.stock = Math.max(0, this.stock - cantidad);
        return this.stock;
    }
}
const validarEmail = (email) => {
    const re = /^\S+@\S+\.\S+$/;
    return re.test(email);
};
const crearUsuario = (nombre, edad, email, rol, activo) => {
    if (!nombre || typeof nombre !== "string") {
        throw new Error("Nombre inválido");
    }
    if (!Number.isFinite(edad) || edad <= 0) {
        throw new Error("Edad inválida, debe ser > 0");
    }
    if (!validarEmail(email)) {
        throw new Error("Email inválido");
    }
    const activoFinal = typeof activo === "boolean" ? activo : Math.random() < 0.8;
    return { nombre, edad, email, rol, activo: activoFinal };
};
exports.crearUsuario = crearUsuario;
const crearProducto = (nombre, precio, categoria, stock, descuento) => {
    if (!nombre || typeof nombre !== "string") {
        throw new Error("Nombre de producto inválido");
    }
    if (!Number.isFinite(precio) || precio < 0) {
        throw new Error("Precio inválido, debe ser >= 0");
    }
    if (!Number.isFinite(stock) || stock < 0) {
        throw new Error("Stock inválido, debe ser >= 0");
    }
    const descuentoFinal = typeof descuento === "number" ? Math.max(0, Math.min(100, Math.round(descuento))) : Math.floor(Math.random() * 21); // 0..20
    return new ProductoClass({ nombre, precio, descuento: descuentoFinal, stock, categoria });
};
exports.crearProducto = crearProducto;
const resumenUsuarioYProductos = (usuario, productos) => {
    const { nombre, email, rol } = usuario;
    const header = `Usuario registrado: ${nombre} (Email: ${email}) - Rol: ${rol}\n`;
    const productosTxt = productos.length === 0
        ? "No hay productos asociados.\n"
        : productos
            .map((p) => {
            const precioFinal = p.calcularPrecioFinal();
            return `- ${p.nombre} | Categoría: ${p.categoria} | Precio final: $${Math.round(precioFinal).toLocaleString("es-CO")} COP | Stock: ${p.stock}`;
        })
            .join("\n") + "\n";
    return header + productosTxt;
};
exports.resumenUsuarioYProductos = resumenUsuarioYProductos;
const simularCompra = async (usuario, productos) => {
    // esperar ~2000ms
    await new Promise((res) => setTimeout(res, 2000));
    const { nombre: nombreUsuario, email, rol, activo } = usuario;
    if (!activo) {
        throw new Error("Usuario no activo. Compra rechazada.");
    }
    const items = [];
    const agotados = [];
    let total = 0;
    for (const prod of productos) {
        const { nombre: prodNombre } = prod;
        const precioUnitario = prod.calcularPrecioFinal();
        if (prod.stock > 0) {
            prod.actualizarStock(1);
            const subtotal = Math.round(precioUnitario * 100) / 100;
            items.push({ nombre: prodNombre, precioUnitario, cantidad: 1, subtotal });
            total += subtotal;
        }
        else {
            agotados.push(prodNombre);
        }
    }
    total = Math.round(total * 100) / 100;
    return {
        usuario: { nombre: nombreUsuario, email, rol },
        items,
        total,
        agotados,
    };
};
exports.simularCompra = simularCompra;
const filtrarProductosPorCategoria = (productos, categoria) => {
    return productos.filter((p) => p.categoria === categoria);
};
exports.filtrarProductosPorCategoria = filtrarProductosPorCategoria;
const ordenarProductosPorPrecio = (productos, asc = true) => {
    return [...productos].sort((a, b) => {
        return asc ? a.calcularPrecioFinal() - b.calcularPrecioFinal() : b.calcularPrecioFinal() - a.calcularPrecioFinal();
    });
};
exports.ordenarProductosPorPrecio = ordenarProductosPorPrecio;
const calcularValorInventario = (productos) => {
    const total = productos.reduce((acc, p) => acc + p.calcularPrecioFinal() * p.stock, 0);
    return Math.round(total * 100) / 100;
};
exports.calcularValorInventario = calcularValorInventario;
// -------------------- Ejemplo de uso (manteniendo tu usuario y precios COP) --------------------
const usuario1 = (0, exports.crearUsuario)("el viejo martin", 40, "martinvacile@pca.edu.co", "administrador");
const producto1 = (0, exports.crearProducto)("CPU", 1200000, "Electrónica", 5, 10);
const producto2 = (0, exports.crearProducto)("Teclado", 80000, "Accesorios", 0);
const producto3 = (0, exports.crearProducto)("Mouse Gamer", 150000, "Accesorios", 10, 15);
const producto4 = (0, exports.crearProducto)("Monitor 24 pulgadas", 900000, "Electrónica", 3, 20);
console.log((0, exports.resumenUsuarioYProductos)(usuario1, [producto1, producto2, producto3, producto4]));
console.log(`Producto: ${producto1.nombre}, Precio Final: $${Math.round(producto1.calcularPrecioFinal()).toLocaleString("es-CO")} COP`);
(0, exports.simularCompra)(usuario1, [producto1, producto2, producto3, producto4])
    .then((recibo) => {
    console.log("\n--- Recibo ---");
    console.log(`Usuario: ${recibo.usuario.nombre} (${recibo.usuario.email})`);
    recibo.items.forEach((it) => {
        console.log(`- ${it.nombre}: $${Math.round(it.precioUnitario).toLocaleString("es-CO")} COP x${it.cantidad} => $${Math.round(it.subtotal).toLocaleString("es-CO")} COP`);
    });
    console.log(`Total: $${Math.round(recibo.total).toLocaleString("es-CO")} COP`);
    if (recibo.agotados.length) {
        console.log("Productos agotados:", recibo.agotados.join(", "));
    }
})
    .catch((err) => console.error("Compra fallida:", err.message || err));
