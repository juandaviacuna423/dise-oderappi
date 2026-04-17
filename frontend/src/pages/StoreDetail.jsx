import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';

const StoreDetail = () => {
  const { id } = useParams();
  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [storeRes, productsRes] = await Promise.all([
          fetch(`/api/stores/${id}`),
          fetch(`/api/products/store/${id}`)
        ]);
        
        if (!storeRes.ok || !productsRes.ok) {
          throw new Error('Error al cargar los datos');
        }
        
        const storeData = await storeRes.json();
        const productsData = await productsRes.json();
        
        setStore(storeData);
        setProducts(productsData || []);
      } catch (err) {
        setError(err.message || 'Error al cargar la tienda');
        console.error('StoreDetail fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchData();
    }
  }, [id]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-red-600 mb-4">❌ {error}</p>
          <p className="text-slate-600 mb-6">Vuelve al catálogo e intenta de nuevo.</p>
          <a href="/catalogo" className="px-6 py-2 bg-[#FF6B35] text-white rounded-lg font-bold">
            ← Volver al catálogo
          </a>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-100 to-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-96 bg-slate-300 rounded-2xl"></div>
            <div className="h-8 bg-slate-300 rounded-full w-1/3"></div>
            <div className="grid gap-4 grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-64 bg-slate-300 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-slate-900 mb-4">🏪 Tienda no encontrada</p>
          <p className="text-slate-600">Esta tienda no existe o fue eliminada.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Store Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid gap-8 lg:grid-cols-[320px_1fr] items-start">
            {/* Store Image */}
            <div className="rounded-2xl overflow-hidden shadow-lg h-72">
              <img 
                src={store.imagen || 'https://via.placeholder.com/400x250'} 
                alt={store.nombre} 
                className="h-full w-full object-cover"
              />
            </div>
            
            {/* Store Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="inline-flex rounded-full bg-[#FF6B35]/10 px-4 py-2 text-sm font-bold text-[#FF6B35]">
                  {store.categoria.charAt(0).toUpperCase() + store.categoria.slice(1)}
                </div>
              </div>
              
              <h1 className="text-4xl font-bold text-slate-900 mb-3">{store.nombre}</h1>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                {store.descripcion || 'Sin descripción disponible.'}
              </p>
              
              {/* Quick Info */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Productos</p>
                  <p className="text-2xl font-bold text-slate-900">{products.length}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Categoría</p>
                  <p className="text-2xl font-bold text-[#FF6B35]">📦</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Disponible</p>
                  <p className="text-2xl font-bold text-green-600">✓ Sí</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Productos disponibles</h2>
          <p className="text-slate-600">{products.length} artículos en esta tienda</p>
        </div>
        
        {products.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-2xl font-bold text-slate-900 mb-2">📭 Sin productos</p>
            <p className="text-slate-600">Esta tienda aún no tiene productos disponibles.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreDetail;
