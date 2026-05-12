import React, { useState } from 'react';
import { Camera, Plus, Calendar, Trash2 } from 'lucide-react';

interface MealPhoto {
  id: string;
  url: string;
  date: string;
  time: string;
  mealType: string;
  notes?: string;
}

function ImageWithFallback(props: any) {
  const [didError, setDidError] = useState(false);
  const { src, alt, style, className, ...rest } = props;

  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img 
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==" 
          alt="Error loading image" 
          {...rest} 
          data-original-url={src} 
        />
      </div>
    </div>
  ) : (
    <img 
      src={src} 
      alt={alt} 
      className={className} 
      style={style} 
      {...rest} 
      onError={() => setDidError(true)} 
    />
  );
}

interface PhotoGalleryProps {
  darkMode: boolean;
}

export function PhotoGallery({ darkMode }: PhotoGalleryProps) {
  const [photos, setPhotos] = useState<MealPhoto[]>([
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
      date: '2026-04-13',
      time: '08:30',
      mealType: 'Desayuno',
      notes: 'Tostada de aguacate con huevo'
    },
    {
      id: '2',
      url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
      date: '2026-04-13',
      time: '13:15',
      mealType: 'Almuerzo',
      notes: 'Bowl de ensalada fresca'
    },
    {
      id: '3',
      url: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400',
      date: '2026-04-13',
      time: '17:00',
      mealType: 'Merienda',
      notes: 'Yogurt con frutas'
    },
    {
      id: '4',
      url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400',
      date: '2026-04-12',
      time: '13:00',
      mealType: 'Almuerzo',
      notes: 'Bowl saludable'
    },
    {
      id: '5',
      url: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=400',
      date: '2026-04-12',
      time: '08:15',
      mealType: 'Desayuno',
      notes: 'Pancakes con frutas'
    },
    {
      id: '6',
      url: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400',
      date: '2026-04-11',
      time: '20:00',
      mealType: 'Cena',
      notes: 'Ensalada verde con pollo'
    }
  ]);

  const [selectedPhoto, setSelectedPhoto] = useState<MealPhoto | null>(null);

  const groupPhotosByDate = () => {
    const grouped: { [key: string]: MealPhoto[] } = {};
    photos.forEach(photo => {
      if (!grouped[photo.date]) {
        grouped[photo.date] = [];
      }
      grouped[photo.date].push(photo);
    });
    return grouped;
  };

  const groupedPhotos = groupPhotosByDate();
  const sortedDates = Object.keys(groupedPhotos).sort().reverse();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date('2026-04-13');
    const yesterday = new Date('2026-04-12');
    
    if (date.toDateString() === today.toDateString()) return 'Hoy';
    if (date.toDateString() === yesterday.toDateString()) return 'Ayer';
    
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' });
  };

  const deletePhoto = (id: string) => {
    setPhotos(photos.filter(p => p.id !== id));
    setSelectedPhoto(null);
  };

  const textColor = darkMode ? 'text-white' : 'text-gray-800';
  const textSecondary = darkMode ? 'text-gray-400' : 'text-gray-500';
  const cardBg = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100';

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-full">
            <Camera className="text-white" size={20} />
          </div>
          <h2 className={`text-xl ${textColor}`}>Registro Fotográfico</h2>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-400 to-cyan-500 text-white rounded-xl hover:from-cyan-500 hover:to-cyan-600 transition-all shadow-sm">
          <Plus size={18} />
          <span className="text-sm">Agregar</span>
        </button>
      </div>

      {/* Gallery */}
      <div className="space-y-6">
        {sortedDates.map(date => (
          <div key={date}>
            <div className="flex items-center gap-2 mb-3">
              <Calendar size={16} className={textSecondary} />
              <h3 className={`text-sm ${textColor}`}>{formatDate(date)}</h3>
              <span className={`text-xs ${textSecondary}`}>({groupedPhotos[date].length} fotos)</span>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {groupedPhotos[date].map(photo => (
                <button
                  key={photo.id}
                  onClick={() => setSelectedPhoto(photo)}
                  className="relative aspect-square rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <ImageWithFallback
                    src={photo.url}
                    alt={photo.notes}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <p className="text-white text-xs">{photo.mealType}</p>
                    <p className="text-white/80 text-xs">{photo.time}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {photos.length === 0 && (
        <div className="text-center py-12">
          <div className={`flex items-center justify-center w-16 h-16 ${darkMode ? 'bg-gray-700' : 'bg-gradient-to-br from-cyan-100 to-blue-100'} rounded-full mb-4 mx-auto`}>
            <Camera className={darkMode ? 'text-cyan-400' : 'text-cyan-500'} size={32} />
          </div>
          <p className={`${textSecondary} text-sm`}>Aún no hay fotos registradas</p>
          <p className={`${darkMode ? 'text-gray-500' : 'text-gray-400'} text-xs mt-1`}>Toca el botón + para agregar tu primera comida</p>
        </div>
      )}

      {/* Photo Detail Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className={`${cardBg} rounded-2xl max-w-md w-full overflow-hidden border`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-square">
              <ImageWithFallback
                src={selectedPhoto.url}
                alt={selectedPhoto.notes}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-block px-3 py-1 bg-gradient-to-r from-cyan-400 to-cyan-500 text-white text-xs rounded-full">
                    {selectedPhoto.mealType}
                  </span>
                  <span className={`text-sm ${textSecondary}`}>
                    {selectedPhoto.time}
                  </span>
                </div>
                <p className={textColor}>{selectedPhoto.notes}</p>
                <p className={`text-sm ${textSecondary} mt-1`}>{formatDate(selectedPhoto.date)}</p>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className={`flex-1 px-4 py-3 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} ${textColor} rounded-xl transition-colors`}
                >
                  Cerrar
                </button>
                <button
                  onClick={() => deletePhoto(selectedPhoto.id)}
                  className={`px-4 py-3 ${darkMode ? 'bg-red-900/20 hover:bg-red-900/30' : 'bg-red-100 hover:bg-red-200'} text-red-600 rounded-xl transition-colors flex items-center gap-2`}
                >
                  <Trash2 size={18} />
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}