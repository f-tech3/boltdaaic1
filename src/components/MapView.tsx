import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEventStore } from '../store/eventStore';
import 'leaflet/dist/leaflet.css';
import { Calendar, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import L from 'leaflet';

// Fix for default marker icons in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Geocoding cache to avoid repeated API calls
const geocodeCache: Record<string, [number, number]> = {
  'Las Vegas, Nevada, USA': [36.1699, -115.1398],
  'London, United Kingdom': [51.5074, -0.1278],
  'Orlando, Florida, USA': [28.5383, -81.3792],
  'Minneapolis, Minnesota, USA': [44.9778, -93.2650],
  'Austin, Texas, USA': [30.2672, -97.7431],
  'Santa Clara, California, USA': [37.3541, -121.9552],
  'New York City, New York, USA': [40.7128, -74.0060],
};

export const MapView: React.FC = () => {
  const { events, selectedTags, searchQuery } = useEventStore();

  const filteredEvents = events.filter((event) => {
    const matchesTags =
      selectedTags.length === 0 ||
      event.tags.some((tag) => selectedTags.includes(tag));

    const matchesSearch = searchQuery === '' ||
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (event.location_name?.toLowerCase() || '').includes(searchQuery.toLowerCase());

    return matchesTags && matchesSearch && event.location_address;
  });

  const eventsWithCoordinates = filteredEvents.filter(
    (event) => event.location_address && geocodeCache[event.location_address]
  );

  if (eventsWithCoordinates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[600px] text-center px-4">
        <MapPin className="w-12 h-12 text-slate-300 mb-4" />
        <h3 className="text-lg font-medium text-slate-900 mb-2">No events with locations found</h3>
        <p className="text-slate-500 max-w-md">
          Try adjusting your filters or search criteria to find events with location information.
        </p>
      </div>
    );
  }

  // Calculate map bounds
  const coordinates = eventsWithCoordinates.map(
    (event) => geocodeCache[event.location_address!]
  );
  const bounds = L.latLngBounds(coordinates.map((coord) => L.latLng(coord[0], coord[1])));

  return (
    <div className="p-8">
      <div className="h-[600px] rounded-2xl overflow-hidden shadow-lg">
        <MapContainer
          bounds={bounds}
          zoom={4}
          className="h-full w-full"
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {eventsWithCoordinates.map((event) => {
            const coordinates = geocodeCache[event.location_address!];
            return (
              <Marker key={event.id} position={coordinates}>
                <Popup className="rounded-lg">
                  <div className="p-2">
                    <h3 className="font-medium text-slate-900 mb-2">{event.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
                      <MapPin className="w-4 h-4 text-brand-500" />
                      <span>{event.location_address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Calendar className="w-4 h-4 text-brand-500" />
                      <span>{format(new Date(event.start_date), 'MMM d, yyyy')}</span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
};