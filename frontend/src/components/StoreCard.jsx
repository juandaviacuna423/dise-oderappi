import { useNavigate } from 'react-router-dom';

export const StoreCard = ({ store }) => {
  const navigate = useNavigate();
  const categoriaEmoji = {
    restaurante: '🍽️',
    supermercado: '🛒',
    farmacia: '💊',
    otros: '🏪'
  };
  
  return (
    <button
      onClick={() => navigate(`/store/${store._id}`)}
      className="group rounded-2xl bg-white overflow-hidden text-left transition duration-300 hover:-translate-y-2 hover:shadow-2xl border border-slate-100"
    >
      <div className="relative overflow-hidden h-48">
        <img
          src={store.imagen || 'https://via.placeholder.com/400x250'}
          alt={store.nombre}
          className="h-full w-full object-cover group-hover:scale-110 transition duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition" />
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm text-xl">
            {categoriaEmoji[store.categoria] || '📦'}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <div className="inline-flex rounded-full bg-[#FF6B35]/10 px-3 py-1 text-xs font-bold text-[#FF6B35] mb-3">
          {store.categoria.charAt(0).toUpperCase() + store.categoria.slice(1)}
        </div>
        
        <h2 className="text-lg font-bold text-slate-900 line-clamp-2 mb-2">{store.nombre}</h2>
        <p className="text-sm text-slate-600 line-clamp-2 mb-4">
          {store.descripcion || 'Sin descripción disponible.'}
        </p>
        
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <span className="text-xs font-semibold text-slate-500 uppercase">Ver tienda</span>
          <span className="text-lg group-hover:translate-x-1 transition">→</span>
        </div>
      </div>
    </button>
  );
};
