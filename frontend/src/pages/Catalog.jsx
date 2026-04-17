import { useEffect, useMemo, useState } from 'react';
import { StoreCard } from '../components/StoreCard';

const categories = [
  { label: 'Todos', value: 'todos' },
  { label: 'Restaurantes', value: 'restaurante' },
  { label: 'Supermercados', value: 'supermercado' },
  { label: 'Farmacias', value: 'farmacia' }
];

const Catalog = () => {
  const [stores, setStores] = useState([]);
  const [category, setCategory] = useState('todos');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStores = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({ page, categoria: category });
        const response = await fetch(`/api/stores?${params.toString()}`);
        
        if (!response.ok) {
          throw new Error('Error al cargar tiendas');
        }
        
        const data = await response.json();
        setStores(data.data || []);
        setPages(data.pages || 1);
      } catch (err) {
        setError(err.message || 'Error al cargar las tiendas');
        console.error('Catalog fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    loadStores();
  }, [category, page]);

  const filteredStores = useMemo(() => {
    if (!search) return stores;
    return stores.filter((store) => store.nombre.toLowerCase().includes(search.toLowerCase()));
  }, [stores, search]);

  return (
    <div>
      {/* Hero Section */}
      <div className="mb-12 bg-gradient-to-r from-[#FF6B35] to-[#F04C1F] rounded-3xl px-8 py-12 text-white shadow-lg">
        <h1 className="text-4xl sm:text-5xl font-bold mb-3">Descubre tus tiendas favoritas</h1>
        <p className="text-lg opacity-90 mb-6 max-w-2xl">Acceso rápido a restaurantes, supermercados y farmacias. Todo entregado a tu puerta.</p>
        <div className="flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
            ⚡ {stores.length || 0}+ tiendas disponibles
          </span>
          <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
            🚀 Envío rápido
          </span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-6">
        <div className="relative">
          <input
            type="search"
            placeholder="Buscar tienda, restaurante, producto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-6 py-4 rounded-2xl border-2 border-slate-200 focus:border-[#FF6B35] focus:outline-none shadow-sm text-base"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                setCategory(cat.value);
                setPage(1);
              }}
              className={`px-5 py-2.5 rounded-full font-semibold text-sm transition ${
                category === cat.value
                  ? 'bg-[#FF6B35] text-white shadow-md'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-[#FF6B35] hover:text-[#FF6B35]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="animate-pulse rounded-2xl bg-white p-6 h-80" />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">❌</div>
          <h3 className="text-2xl font-semibold text-slate-900 mb-2">{error}</h3>
          <p className="text-slate-600 mb-6">No pudimos cargar las tiendas disponibles</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 rounded-lg bg-[#FF6B35] text-white font-bold hover:bg-[#F04C1F]"
          >
            🔄 Recargar
          </button>
        </div>
      ) : filteredStores.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-2xl font-semibold text-slate-900 mb-2">No encontramos tiendas</h3>
          <p className="text-slate-600">Intenta con otro término de búsqueda o filtro</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredStores.map((store) => (
            <StoreCard key={store._id} store={store} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Catalog;
