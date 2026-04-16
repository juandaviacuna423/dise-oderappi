const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Store = require('./models/Store');
const Product = require('./models/Product');
const connectDB = require('./config/db');
require('dotenv').config();

const seedDatabase = async () => {
  try {
    await connectDB();
    // Crear usuario admin
    let admin = await User.findOne({ email: 'admin@rappi.com' });
    if (!admin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      admin = new User({
        nombre: 'Admin',
        email: 'admin@rappi.com',
        password: hashedPassword,
        rol: 'admin'
      });
      await admin.save();
      console.log('Usuario admin creado');
    }

    // Crear tiendas de ejemplo
    const stores = [
      {
        nombre: 'Restaurante El Sabor',
        descripcion: 'Comida tradicional mexicana',
        categoria: 'restaurante',
        imagen: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
        ubicacion: 'Centro',
        propietario: admin._id
      },
      {
        nombre: 'Pizzeria Bella Italia',
        descripcion: 'Auténtica pizza italiana artesanal',
        categoria: 'restaurante',
        imagen: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
        ubicacion: 'Zona Norte',
        propietario: admin._id
      },
      {
        nombre: 'Sushi Express',
        descripcion: 'Sushi fresco y rolls creativos',
        categoria: 'restaurante',
        imagen: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400',
        ubicacion: 'Centro',
        propietario: admin._id
      },
      {
        nombre: 'Burger King',
        descripcion: 'Hamburguesas y comida rápida americana',
        categoria: 'restaurante',
        imagen: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
        ubicacion: 'Zona Sur',
        propietario: admin._id
      },
      {
        nombre: 'Café Paradiso',
        descripcion: 'Café gourmet y pastelería artesanal',
        categoria: 'restaurante',
        imagen: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400',
        ubicacion: 'Centro',
        propietario: admin._id
      },
      {
        nombre: 'Supermercado Express',
        descripcion: 'Todo lo que necesitas',
        categoria: 'supermercado',
        imagen: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
        ubicacion: 'Zona Norte',
        propietario: admin._id
      },
      {
        nombre: 'Mega Super',
        descripcion: 'Supermercado con los mejores precios',
        categoria: 'supermercado',
        imagen: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=400',
        ubicacion: 'Centro',
        propietario: admin._id
      },
      {
        nombre: 'Tienda Orgánica Verde',
        descripcion: 'Productos orgánicos y naturales',
        categoria: 'supermercado',
        imagen: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400',
        ubicacion: 'Zona Norte',
        propietario: admin._id
      },
      {
        nombre: 'Farmacia Salud',
        descripcion: 'Medicamentos y cuidado personal',
        categoria: 'farmacia',
        imagen: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
        ubicacion: 'Centro',
        propietario: admin._id
      },
      {
        nombre: 'Farmacia del Pueblo',
        descripcion: 'Atención médica y farmacéutica',
        categoria: 'farmacia',
        imagen: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
        ubicacion: 'Zona Sur',
        propietario: admin._id
      },
      {
        nombre: 'Oxxo Express',
        descripcion: 'Tienda de conveniencia 24 horas',
        categoria: 'otros',
        imagen: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400',
        ubicacion: 'Centro',
        propietario: admin._id
      },
      {
        nombre: 'Seven Eleven',
        descripcion: 'Snacks, bebidas y artículos varios',
        categoria: 'otros',
        imagen: 'https://images.unsplash.com/photo-1556909114-4c36e03f3b3f?w=400',
        ubicacion: 'Zona Norte',
        propietario: admin._id
      }
    ];

    const createdStores = [];
    for (const storeData of stores) {
      const storeExists = await Store.findOne({ nombre: storeData.nombre });
      if (!storeExists) {
        const store = new Store(storeData);
        await store.save();
        createdStores.push(store);
        console.log(`Tienda creada: ${store.nombre}`);
      } else {
        createdStores.push(storeExists);
      }
    }

    // Crear productos para cada tienda
    const products = [
      // Restaurante El Sabor (0)
      [
        { nombre: 'Tacos al Pastor', descripcion: 'Tacos tradicionales con piña', precio: 45, imagen: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300', stock: 50 },
        { nombre: 'Enchiladas Verdes', descripcion: 'Enchiladas con salsa verde', precio: 65, imagen: 'https://images.unsplash.com/photo-1532634721-9e064e5e6e6a?w=300', stock: 30 },
        { nombre: 'Quesadillas', descripcion: 'Quesadillas de queso con guacamole', precio: 35, imagen: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=300', stock: 40 },
        { nombre: 'Pozole Rojo', descripcion: 'Sopa tradicional de maíz', precio: 55, imagen: 'https://images.unsplash.com/photo-1541599468348-e96984315621?w=300', stock: 25 },
        { nombre: 'Chiles Rellenos', descripcion: 'Chiles poblanos rellenos de queso', precio: 75, imagen: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=300', stock: 20 },
        { nombre: 'Agua Fresca de Horchata', descripcion: 'Bebida refrescante de arroz', precio: 25, imagen: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?w=300', stock: 60 },
        { nombre: 'Tostadas Crujientes', descripcion: 'Tostadas con guacamole y jamon', precio: 38, imagen: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=300', stock: 35 },
        { nombre: 'Burrito de Carne', descripcion: 'Burrito con carne molida y arroz', precio: 52, imagen: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300', stock: 30 },
        { nombre: 'Elote Desgranado', descripcion: 'Elote con mayonesa y queso', precio: 28, imagen: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=300', stock: 45 },
        { nombre: 'Molcajete de Camarones', descripcion: 'Camarones al ajillo con pepitas', precio: 95, imagen: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300', stock: 15 },
        { nombre: 'Sopa de Tortilla', descripcion: 'Sopa con crispy tortilla strips', precio: 48, imagen: 'https://images.unsplash.com/photo-1541599468348-e96984315621?w=300', stock: 40 },
        { nombre: 'Carne Asada Plato', descripcion: 'Carne asada con cebolla y cilantro', precio: 85, imagen: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=300', stock: 20 },
        { nombre: 'Flautas Doradas', descripcion: 'Flautas crujientes de pollo', precio: 42, imagen: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=300', stock: 35 },
        { nombre: 'Tamales de Rajas', descripcion: 'Tamales con rajas y queso', precio: 32, imagen: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300', stock: 50 },
        { nombre: 'Guacamole Casero', descripcion: 'Guacamole fresco hecho al momento', precio: 35, imagen: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=300', stock: 60 },
        { nombre: 'Agua de Jamaica', descripcion: 'Bebida natural refrescante', precio: 18, imagen: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?w=300', stock: 80 },
        { nombre: 'Churros con Chocolate', descripcion: 'Churros crujientes y chocolate caliente', precio: 32, imagen: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300', stock: 40 },
        { nombre: 'Flan Napolitano', descripcion: 'Flan casero estilo mexicano', precio: 28, imagen: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=300', stock: 45 },
        { nombre: 'Michelada', descripcion: 'Cerveza con especias y limón', precio: 42, imagen: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=300', stock: 35 }
      ],
      // Pizzeria Bella Italia (1)
      [
        { nombre: 'Pizza Margherita', descripcion: 'Pizza clásica con mozzarella y albahaca', precio: 120, imagen: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300', stock: 40 },
        { nombre: 'Pizza Pepperoni', descripcion: 'Pizza con pepperoni y queso extra', precio: 140, imagen: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300', stock: 35 },
        { nombre: 'Pizza Cuatro Quesos', descripcion: 'Pizza con cuatro tipos de queso', precio: 150, imagen: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300', stock: 30 },
        { nombre: 'Calzone', descripcion: 'Pizza doblada con ricotta y jamón', precio: 95, imagen: 'https://images.unsplash.com/photo-1571066811602-716837d681de?w=300', stock: 25 },
        { nombre: 'Lasagna', descripcion: 'Pasta al horno con carne y queso', precio: 110, imagen: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=300', stock: 20 },
        { nombre: 'Tiramisu', descripcion: 'Postre italiano con café y mascarpone', precio: 65, imagen: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300', stock: 45 },
        { nombre: 'Pizza BBQ Chicken', descripcion: 'Pizza con pollo BBQ y cebolla', precio: 135, imagen: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300', stock: 32 },
        { nombre: 'Pasta Carbonara', descripcion: 'Pasta italiana con jamon y huevo', precio: 125, imagen: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=300', stock: 25 },
        { nombre: 'Risotto de Hongos', descripcion: 'Risotto cremoso con champiñones', precio: 128, imagen: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=300', stock: 20 },
        { nombre: 'Pizza Vegetariana', descripcion: 'Pizza con vegetales asados', precio: 115, imagen: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300', stock: 38 },
        { nombre: 'Bruschetta', descripcion: 'Pan tostado con tomate y herbabuena', precio: 48, imagen: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300', stock: 50 },
        { nombre: 'Calamares Fritos', descripcion: 'Calamares crujientes con limón', precio: 92, imagen: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300', stock: 18 },
        { nombre: 'Panna Cotta', descripcion: 'Postre italiano cremoso', precio: 58, imagen: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=300', stock: 40 },
        { nombre: 'Focaccia', descripcion: 'Pan italiano con aceite y hierbas', precio: 35, imagen: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300', stock: 55 },
        { nombre: 'Pizza Hawaiana', descripcion: 'Pizza con piña y jamón', precio: 130, imagen: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300', stock: 35 }
      ],
      // Sushi Express (2)
      [
        { nombre: 'Sushi California Roll', descripcion: 'Roll con aguacate, pepino y cangrejo', precio: 85, imagen: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300', stock: 40 },
        { nombre: 'Sashimi de Salmón', descripcion: 'Salmón fresco crudo', precio: 120, imagen: 'https://images.unsplash.com/photo-1535399831218-2c2a0c8c6c2f?w=300', stock: 30 },
        { nombre: 'Tempura de Camarón', descripcion: 'Camarones fritos en tempura', precio: 95, imagen: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=300', stock: 35 },
        { nombre: 'Nigiri de Atún', descripcion: 'Arroz con atún fresco', precio: 110, imagen: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=300', stock: 25 },
        { nombre: 'Ramen de Pollo', descripcion: 'Sopa de fideos con pollo', precio: 75, imagen: 'https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=300', stock: 40 },
        { nombre: 'Mochi de Mango', descripcion: 'Postre japonés de arroz con mango', precio: 45, imagen: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=300', stock: 50 },
        { nombre: 'Edamame', descripcion: 'Vainas de soja cocidas con sal', precio: 38, imagen: 'https://images.unsplash.com/photo-1633631530938-a55a2e2f1f4b?w=300', stock: 55 },
        { nombre: 'Gyoza Frito', descripcion: 'Dumplings japoneses crujientes', precio: 62, imagen: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=300', stock: 45 },
        { nombre: 'Yakitori', descripcion: 'Pollo a la parrilla brocheta', precio: 78, imagen: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300', stock: 32 },
        { nombre: 'Donburi de Ternera', descripcion: 'Tazón con ternera y arroz', precio: 88, imagen: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=300', stock: 25 },
        { nombre: 'Aguacate Roll', descripcion: 'Roll vegetariano con aguacate', precio: 72, imagen: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=300', stock: 48 },
        { nombre: 'Sashimi Mixto', descripcion: 'Variedad de pescados frescos', precio: 145, imagen: 'https://images.unsplash.com/photo-1535399831218-2c2a0c8c6c2f?w=300', stock: 20 },
        { nombre: 'Tuna Tataki', descripcion: 'Atún sellado a la parrilla', precio: 110, imagen: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=300', stock: 22 },
        { nombre: 'Miso Soup', descripcion: 'Sopa tradicional con tofu', precio: 35, imagen: 'https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=300', stock: 60 },
        { nombre: 'Sake', descripcion: 'Bebida alcohólica japonesa', precio: 65, imagen: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=300', stock: 40 }
      ],
      // Burger King (3)
      [
        { nombre: 'Whopper', descripcion: 'Hamburguesa clásica con todos los ingredientes', precio: 85, imagen: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300', stock: 60 },
        { nombre: 'Big King', descripcion: 'Doble carne con salsa especial', precio: 95, imagen: 'https://images.unsplash.com/photo-1551782450-17144efb5723?w=300', stock: 50 },
        { nombre: 'Chicken Fries', descripcion: 'Tiras de pollo crujientes', precio: 65, imagen: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=300', stock: 45 },
        { nombre: 'Onion Rings', descripcion: 'Aros de cebolla fritos', precio: 45, imagen: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=300', stock: 55 },
        { nombre: 'Coca Cola', descripcion: 'Refresco de cola 500ml', precio: 25, imagen: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=300', stock: 100 },
        { nombre: 'Sundae de Chocolate', descripcion: 'Helado con salsa de chocolate', precio: 35, imagen: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300', stock: 40 },
        { nombre: 'Whopper Doble', descripcion: 'Doble Whopper con piña', precio: 125, imagen: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300', stock: 35 },
        { nombre: 'Empanada de Carne', descripcion: 'Empanada crujiente rellena', precio: 42, imagen: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=300', stock: 50 },
        { nombre: 'Papas Medianas', descripcion: 'Papas fritas crujientes', precio: 28, imagen: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=300', stock: 70 },
        { nombre: 'Ensalada de Pollo', descripcion: 'Ensalada fresca con pollo gratis', precio: 78, imagen: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300', stock: 25 },
        { nombre: 'Sándwich de Pavo', descripcion: 'Pavo fresco con lechuga', precio: 72, imagen: 'https://images.unsplash.com/photo-1550507992-eb63ffee0847?w=300', stock: 32 },
        { nombre: 'Sprite Familiar', descripcion: 'Bebida gaseosa dos litros', precio: 42, imagen: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=300', stock: 45 },
        { nombre: 'Pastel de Chocolate', descripcion: 'Pastel artesanal de chocolate', precio: 48, imagen: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300', stock: 30 },
        { nombre: 'Corona Extra', descripcion: 'Cerveza mexicana', precio: 35, imagen: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=300', stock: 40 },
        { nombre: 'Nuggets (10 piezas)', descripcion: 'Nuggets de pollo crujientes', precio: 52, imagen: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=300', stock: 55 }
      ],
      // Café Paradiso (4)
      [
        { nombre: 'Café Americano', descripcion: 'Café negro intenso', precio: 35, imagen: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300', stock: 80 },
        { nombre: 'Cappuccino', descripcion: 'Café con leche espumosa', precio: 45, imagen: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=300', stock: 70 },
        { nombre: 'Croissant', descripcion: 'Panadería francesa recién horneada', precio: 25, imagen: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300', stock: 60 },
        { nombre: 'Tarta de Manzana', descripcion: 'Tarta casera con manzana', precio: 55, imagen: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300', stock: 30 },
        { nombre: 'Smoothie de Frutas', descripcion: 'Batido de frutas frescas', precio: 40, imagen: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=300', stock: 50 },
        { nombre: 'Muffin de Chocolate', descripcion: 'Muffin con chispas de chocolate', precio: 30, imagen: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=300', stock: 45 },
        { nombre: 'Latte Caramelo', descripcion: 'Latte con sirope de caramelo', precio: 48, imagen: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=300', stock: 50 },
        { nombre: 'Pastel de Queso', descripcion: 'Cheesecake casero', precio: 65, imagen: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=300', stock: 25 },
        { nombre: 'Espresso Doble', descripcion: 'Dos shots de espresso puro', precio: 32, imagen: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300', stock: 55 },
        { nombre: 'Bagel con Queso Crema', descripcion: 'Bagel tostado con cream cheese', precio: 38, imagen: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300', stock: 40 },
        { nombre: 'Macchiato', descripcion: 'Espresso manchado con leche', precio: 42, imagen: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=300', stock: 45 },
        { nombre: 'Brownie Casero', descripcion: 'Brownie de chocolate frito', precio: 35, imagen: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300', stock: 35 },
        { nombre: 'Iced Coffee', descripcion: 'Café helado refrescante', precio: 38, imagen: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300', stock: 50 },
        { nombre: 'Scone con Mermelada', descripcion: 'Scone con mermelada de frutas', precio: 32, imagen: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300', stock: 45 },
        { nombre: 'Jugo Naranja Natural', descripcion: 'Jugo recién exprimido', precio: 32, imagen: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=300', stock: 55 }
      ],
      // Supermercado Express (5)
      [
        { nombre: 'Leche Entera', descripcion: 'Leche fresca pasteurizada', precio: 25, imagen: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300', stock: 100 },
        { nombre: 'Pan Integral', descripcion: 'Pan de trigo integral', precio: 15, imagen: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300', stock: 80 },
        { nombre: 'Manzanas Rojas', descripcion: 'Manzanas frescas', precio: 12, imagen: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300', stock: 60 },
        { nombre: 'Huevos Orgánicos', descripcion: 'Huevos de gallinas libres', precio: 35, imagen: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300', stock: 75 },
        { nombre: 'Queso Cheddar', descripcion: 'Queso cheddar madurado', precio: 85, imagen: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=300', stock: 40 },
        { nombre: 'Yogurt Griego', descripcion: 'Yogurt natural sin azúcar', precio: 28, imagen: 'https://images.unsplash.com/photo-1571212515407-de5f27c6369d?w=300', stock: 65 },
        { nombre: 'Café Molido', descripcion: 'Café 100% arábica', precio: 45, imagen: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300', stock: 50 },
        { nombre: 'Aceite de Oliva', descripcion: 'Aceite de oliva extra virgen', precio: 65, imagen: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300', stock: 35 },
        { nombre: 'Pollos Frescos', descripcion: 'Pollo fresco premium', precio: 48, imagen: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=300', stock: 30 },
        { nombre: 'Carne Molida', descripcion: 'Carne de res recién molida', precio: 52, imagen: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=300', stock: 25 },
        { nombre: 'Tomates Cherry', descripcion: 'Tomates pequeños y dulces', precio: 18, imagen: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300', stock: 50 },
        { nombre: 'Lechuga Romana', descripcion: 'Lechuga fresca para ensaladas', precio: 12, imagen: 'https://images.unsplash.com/photo-1540742022b3c3a7d5da7e003ba6c0bc0efb5a55?w=300', stock: 60 },
        { nombre: 'Leche Descremada', descripcion: 'Leche baja en grasa', precio: 22, imagen: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300', stock: 70 },
        { nombre: 'Jamón de Pavo', descripcion: 'Jamón procesado de pavo', precio: 42, imagen: 'https://images.unsplash.com/photo-1599599810684-e498b6e9b7b9?w=300', stock: 35 },
        { nombre: 'Cereal Integral', descripcion: 'Cereal de trigo integral', precio: 32, imagen: 'https://images.unsplash.com/photo-1638522187380-5d19b7c26fec?w=300', stock: 45 }
      ],
      // Mega Super (6)
      [
        { nombre: 'Arroz Integral', descripcion: 'Arroz orgánico 1kg', precio: 18, imagen: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=300', stock: 120 },
        { nombre: 'Pasta Espagueti', descripcion: 'Pasta italiana 500g', precio: 12, imagen: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=300', stock: 90 },
        { nombre: 'Atún en Agua', descripcion: 'Atún enlatado bajo en sodio', precio: 22, imagen: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300', stock: 85 },
        { nombre: 'Galletas de Avena', descripcion: 'Galletas saludables', precio: 15, imagen: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300', stock: 70 },
        { nombre: 'Jabón Líquido', descripcion: 'Jabón antibacterial', precio: 28, imagen: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300', stock: 60 },
        { nombre: 'Detergente', descripcion: 'Detergente para ropa', precio: 35, imagen: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300', stock: 45 },
        { nombre: 'Papel Higiénico', descripcion: 'Paquete de 12 rollos', precio: 42, imagen: 'https://images.unsplash.com/photo-1585435557343-3b092031e2bb?w=300', stock: 55 },
        { nombre: 'Shampoo', descripcion: 'Shampoo para cabello normal', precio: 38, imagen: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300', stock: 40 },
        { nombre: 'Frijoles Negros', descripcion: 'Lata de frijoles negros', precio: 14, imagen: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300', stock: 75 },
        { nombre: 'Maíz Enlatado', descripcion: 'Maíz dulce en lata', precio: 11, imagen: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300', stock: 80 },
        { nombre: 'Aceite Vegetal', descripcion: 'Aceite para cocinar 1L', precio: 28, imagen: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300', stock: 60 },
        { nombre: 'Sal de Mesa', descripcion: 'Sal refinada 500g', precio: 8, imagen: 'https://images.unsplash.com/photo-1599599810694-b664fe655f91?w=300', stock: 100 },
        { nombre: 'Azúcar Blanca', descripcion: 'Azúcar refinada 1kg', precio: 16, imagen: 'https://images.unsplash.com/photo-1599599810694-b664fe655f91?w=300', stock: 90 },
        { nombre: 'Leche en Polvo', descripcion: 'Leche en polvo instantánea', precio: 32, imagen: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300', stock: 50 },
        { nombre: 'Harina de Trigo', descripcion: 'Harina de trigo 1kg', precio: 12, imagen: 'https://images.unsplash.com/photo-1609164534419-4e4e0a283a58?w=300', stock: 65 }
      ],
      // Tienda Orgánica Verde (7)
      [
        { nombre: 'Quinoa Orgánica', descripcion: 'Quinoa certificada orgánica', precio: 45, imagen: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=300', stock: 60 },
        { nombre: 'Miel Pura', descripcion: 'Miel de abeja natural', precio: 55, imagen: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=300', stock: 40 },
        { nombre: 'Té Verde', descripcion: 'Té verde orgánico', precio: 32, imagen: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300', stock: 75 },
        { nombre: 'Almendras', descripcion: 'Almendras crudas orgánicas', precio: 85, imagen: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=300', stock: 35 },
        { nombre: 'Aguacate Hass', descripcion: 'Aguacates frescos orgánicos', precio: 8, imagen: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=300', stock: 80 },
        { nombre: 'Leche de Almendra', descripcion: 'Leche vegetal sin azúcar', precio: 28, imagen: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300', stock: 50 },
        { nombre: 'Proteína de Soya', descripcion: 'Suplemento proteico natural', precio: 95, imagen: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300', stock: 25 },
        { nombre: 'Aceite de Coco', descripcion: 'Aceite de coco virgen', precio: 42, imagen: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300', stock: 45 },
        { nombre: 'Garbanzos Orgánicos', descripcion: 'Garbanzos secos orgánicos', precio: 28, imagen: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300', stock: 50 },
        { nombre: 'Lentejas Rojas', descripcion: 'Lentejas secas rojas', precio: 22, imagen: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300', stock: 60 },
        { nombre: 'Nueces de Castilla', descripcion: 'Nueces crudas orgánicas', precio: 72, imagen: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=300', stock: 35 },
        { nombre: 'Miel de Manuka', descripcion: 'Miel premium de Manuka', precio: 95, imagen: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=300', stock: 20 },
        { nombre: 'Chía Orgánica', descripcion: 'Semillas de chía', precio: 35, imagen: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300', stock: 45 },
        { nombre: 'Lino Molido', descripcion: 'Linaza molida fresca', precio: 28, imagen: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300', stock: 40 },
        { nombre: 'Yogur Natural Orgánico', descripcion: 'Yogur sin azúcar agregado', precio: 38, imagen: 'https://images.unsplash.com/photo-1571212515407-de5f27c6369d?w=300', stock: 50 }
      ],
      // Farmacia Salud (8)
      [
        { nombre: 'Paracetamol 500mg', descripcion: 'Analgésico y antipirético', precio: 8, imagen: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300', stock: 200 },
        { nombre: 'Vitamina C', descripcion: 'Suplemento vitamínico', precio: 45, imagen: 'https://images.unsplash.com/photo-1550572017-edd951aa8ca9?w=300', stock: 150 },
        { nombre: 'Crema Hidratante', descripcion: 'Crema para piel seca', precio: 85, imagen: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300', stock: 75 },
        { nombre: 'Ibuprofeno 400mg', descripcion: 'Antiinflamatorio no esteroideo', precio: 12, imagen: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300', stock: 180 },
        { nombre: 'Omega 3', descripcion: 'Ácidos grasos esenciales', precio: 65, imagen: 'https://images.unsplash.com/photo-1550572017-edd951aa8ca9?w=300', stock: 90 },
        { nombre: 'Protector Solar', descripcion: 'FPS 50 protección total', precio: 95, imagen: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300', stock: 60 },
        { nombre: 'Mascarillas N95', descripcion: 'Paquete de 10 unidades', precio: 120, imagen: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300', stock: 40 },
        { nombre: 'Alcohol en Gel', descripcion: 'Gel antibacterial 500ml', precio: 25, imagen: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300', stock: 85 },
        { nombre: 'Vaselina Pura', descripcion: 'Vaselina para labios y piel', precio: 15, imagen: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300', stock: 100 },
        { nombre: 'Antiácido', descripcion: 'Tabletas antiácidas', precio: 18, imagen: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300', stock: 70 },
        { nombre: 'Multivitamínico', descripcion: 'Complejo multivitamínico', precio: 48, imagen: 'https://images.unsplash.com/photo-1550572017-edd951aa8ca9?w=300', stock: 85 },
        { nombre: 'Loción Corporal', descripcion: 'Loción hidratante cuerpo', precio: 62, imagen: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300', stock: 60 },
        { nombre: 'Pastillas para la Tos', descripcion: 'Caramelos medicados', precio: 22, imagen: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300', stock: 75 },
        { nombre: 'Pomada Antihongos', descripcion: 'Tratamiento antimicótico', precio: 32, imagen: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300', stock: 55 },
        { nombre: 'Apósito Estéril', descripcion: 'Paquete de apósitos', precio: 28, imagen: 'https://images.unsplash.com/photo-1585435557343-3b092031e2bb?w=300', stock: 60 }
      ],
      // Farmacia del Pueblo (9)
      [
        { nombre: 'Aspirina', descripcion: 'Analgésico cardiovascular', precio: 15, imagen: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300', stock: 160 },
        { nombre: 'Termómetro Digital', descripcion: 'Termómetro infrarrojo', precio: 85, imagen: 'https://images.unsplash.com/photo-1585435557343-3b092031e2bb?w=300', stock: 45 },
        { nombre: 'Venda Elástica', descripcion: 'Venda de compresión', precio: 35, imagen: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300', stock: 70 },
        { nombre: 'Suero Oral', descripcion: 'Rehidratante electrolítico', precio: 18, imagen: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300', stock: 120 },
        { nombre: 'Pastillas para la Garganta', descripcion: 'Pastillas con mentol', precio: 28, imagen: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300', stock: 95 },
        { nombre: 'Crema Antibiótica', descripcion: 'Crema para heridas', precio: 42, imagen: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300', stock: 55 },
        { nombre: 'Gotas para los Oídos', descripcion: 'Gotas descongestionantes', precio: 38, imagen: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300', stock: 40 },
        { nombre: 'Suplemento de Hierro', descripcion: 'Tabletas de hierro', precio: 55, imagen: 'https://images.unsplash.com/photo-1550572017-edd951aa8ca9?w=300', stock: 65 },
        { nombre: 'Colutorio Bucal', descripcion: 'Enjuague bucal antiséptico', precio: 32, imagen: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300', stock: 50 },
        { nombre: 'Lentes de Contacto', descripcion: 'Solución para lentes', precio: 45, imagen: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300', stock: 35 },
        { nombre: 'Toallitas Antisépticas', descripcion: 'Paquete de 30 toallitas', precio: 22, imagen: 'https://images.unsplash.com/photo-1585435557343-3b092031e2bb?w=300', stock: 70 },
        { nombre: 'Algodón', descripcion: 'Paquete de algodón', precio: 12, imagen: 'https://images.unsplash.com/photo-1585435557343-3b092031e2bb?w=300', stock: 90 },
        { nombre: 'Gasa Estéril', descripcion: 'Paquete de gasa esterilizada', precio: 18, imagen: 'https://images.unsplash.com/photo-1585435557343-3b092031e2bb?w=300', stock: 60 },
        { nombre: 'Cinta Vendaje', descripcion: 'Cinta para vendajes', precio: 15, imagen: 'https://images.unsplash.com/photo-1585435557343-3b092031e2bb?w=300', stock: 75 },
        { nombre: 'Gotitas Antihistamínicas', descripcion: 'Para alergias y conjuntivitis', precio: 35, imagen: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300', stock: 45 }
      ],
      // Oxxo Express (10)
      [
        { nombre: 'Coca Cola 600ml', descripcion: 'Refresco de cola', precio: 18, imagen: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=300', stock: 150 },
        { nombre: 'Sabritas Original', descripcion: 'Papas fritas clásicas', precio: 15, imagen: 'https://images.unsplash.com/photo-1566479179810-16cced8c6fd4?w=300', stock: 120 },
        { nombre: 'Galletas Oreo', descripcion: 'Galletas con crema', precio: 22, imagen: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300', stock: 90 },
        { nombre: 'Agua Ciel 1L', descripcion: 'Agua purificada', precio: 12, imagen: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?w=300', stock: 200 },
        { nombre: 'Chicles Trident', descripcion: 'Chicles sin azúcar', precio: 8, imagen: 'https://images.unsplash.com/photo-1582053433976-25c00369fc93?w=300', stock: 180 },
        { nombre: 'Baterías AA', descripcion: 'Paquete de 4 baterías', precio: 35, imagen: 'https://images.unsplash.com/photo-1585435557343-3b092031e2bb?w=300', stock: 60 },
        { nombre: 'Cigarrillos Marlboro', descripcion: 'Cigarrillos light', precio: 65, imagen: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=300', stock: 40 },
        { nombre: 'Leche Condensada', descripcion: 'Lata de leche condensada', precio: 28, imagen: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300', stock: 75 },
        { nombre: 'Café Soluble', descripcion: 'Café instantáneo', precio: 32, imagen: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300', stock: 55 },
        { nombre: 'Sopa Instantánea', descripcion: 'Sopa de fideo y pollo', precio: 12, imagen: 'https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=300', stock: 100 },
        { nombre: 'Pilas AAA', descripcion: 'Paquete de pilas', precio: 28, imagen: 'https://images.unsplash.com/photo-1585435557343-3b092031e2bb?w=300', stock: 70 },
        { nombre: 'Snickers', descripcion: 'Barra de chocolate con nueces', precio: 18, imagen: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=300', stock: 140 },
        { nombre: 'Doritos', descripcion: 'Chips de queso', precio: 16, imagen: 'https://images.unsplash.com/photo-1566479179810-16cced8c6fd4?w=300', stock: 130 },
        { nombre: 'Jugo Tampico', descripcion: 'Jugo natural de frutas', precio: 15, imagen: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=300', stock: 85 },
        { nombre: 'Encendedor', descripcion: 'Encendedor desechable', precio: 5, imagen: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=300', stock: 200 }
      ],
      // Seven Eleven (11)
      [
        { nombre: 'Slurpee', descripcion: 'Bebida helada de frutas', precio: 25, imagen: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?w=300', stock: 100 },
        { nombre: 'Hot Dog', descripcion: 'Hot dog con mostaza y catsup', precio: 35, imagen: 'https://images.unsplash.com/photo-1551782450-17144efb5723?w=300', stock: 80 },
        { nombre: 'Donas Glaseadas', descripcion: 'Donas con glaseado de vainilla', precio: 18, imagen: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300', stock: 70 },
        { nombre: 'Café Grande', descripcion: 'Café americano grande', precio: 28, imagen: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300', stock: 90 },
        { nombre: 'Sándwich de Jamón', descripcion: 'Sándwich con jamón y queso', precio: 42, imagen: 'https://images.unsplash.com/photo-1550507992-eb63ffee0847?w=300', stock: 50 },
        { nombre: 'Helado Sundae', descripcion: 'Helado con toppings', precio: 38, imagen: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300', stock: 45 },
        { nombre: 'Nachos con Queso', descripcion: 'Nachos con queso fundido', precio: 32, imagen: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=300', stock: 60 },
        { nombre: 'Barra de Chocolate', descripcion: 'Chocolate con almendras', precio: 15, imagen: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=300', stock: 110 },
        { nombre: 'Café Capuchino', descripcion: 'Cappuccino cremoso', precio: 32, imagen: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=300', stock: 75 },
        { nombre: 'Empanada de Atún', descripcion: 'Empanada rellena con atún', precio: 28, imagen: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=300', stock: 55 },
        { nombre: 'Galleta de Chocolate', descripcion: 'Galleta chips de chocolate', precio: 12, imagen: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300', stock: 120 },
        { nombre: 'Agua Purificada', descripcion: 'Botella de agua 600ml', precio: 10, imagen: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?w=300', stock: 180 },
        { nombre: 'Té Helado', descripcion: 'Té helado natural', precio: 22, imagen: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300', stock: 90 },
        { nombre: 'Sándwich de Pavo', descripcion: 'Sándwich con pavo y queso', precio: 45, imagen: 'https://images.unsplash.com/photo-1550507992-eb63ffee0847?w=300', stock: 40 },
        { nombre: 'Muffin Blueberry', descripcion: 'Muffin de blueberry', precio: 22, imagen: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=300', stock: 65 }
      ]
    ];

    for (let i = 0; i < createdStores.length; i++) {
      const store = createdStores[i];
      const storeProducts = products[i];

      for (const productData of storeProducts) {
        const productExists = await Product.findOne({
          nombre: productData.nombre,
          tienda: store._id
        });

        if (!productExists) {
          const product = new Product({
            ...productData,
            tienda: store._id
          });
          await product.save();
          console.log(`Producto creado: ${product.nombre} en ${store.nombre}`);
        }
      }
    }

    console.log('Base de datos poblada exitosamente');
  } catch (error) {
    console.error('Error poblando base de datos:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Ejecutar solo si se llama directamente
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;