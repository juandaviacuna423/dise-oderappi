import { useCart } from '../context/CartContext';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="group rounded-2xl bg-white overflow-hidden border border-slate-100 transition duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative overflow-hidden h-40">
        <img
          src={product.imagen || 'https://via.placeholder.com/400x250'}
          alt={product.nombre}
          className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
        />
        {product.stock < 5 && (
          <div className="absolute top-3 right-3 bg-[#EF4444] text-white text-xs font-bold px-3 py-1 rounded-full">
            Poco stock
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-base font-bold text-slate-900 line-clamp-2 mb-1 h-12 flex items-start">
          {product.nombre}
        </h3>
        <p className="text-sm text-slate-600 line-clamp-1 mb-3">{product.descripcion}</p>
        
        <div className="flex items-end justify-between gap-3">
          <div>
            <span className="text-2xl font-bold text-[#FF6B35]">
              ${product.precio.toLocaleString()}
            </span>
            <p className="text-xs text-slate-500 mt-1">Stock: {product.stock}</p>
          </div>
          
          <button
            onClick={() => addToCart({ 
              productoId: product._id, 
              nombre: product.nombre, 
              precio: product.precio,
              imagen: product.imagen,
              descripcion: product.descripcion
            })}
            disabled={product.stock === 0}
            className="px-4 py-2 rounded-lg bg-[#FF6B35] text-white font-semibold text-sm hover:bg-[#F04C1F] transition disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            + Agregar
          </button>
        </div>
      </div>
    </div>
  );
};
