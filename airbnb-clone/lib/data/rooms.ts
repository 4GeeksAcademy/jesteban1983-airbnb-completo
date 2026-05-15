export type Room = {
  id: string;
  title: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  rating: number;
  reviews: number;
  nightlyPrice: number;
  imageUrl: string;
  description: string;
};

export const rooms: Room[] = [
  {
    id: "1",
    title: "Loft panoramico en el centro",
    city: "Madrid",
    country: "Espana",
    lat: 40.4168,
    lng: -3.7038,
    rating: 4.92,
    reviews: 134,
    nightlyPrice: 145,
    imageUrl:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
    description:
      "Loft moderno con cocina completa, balcon y vistas urbanas. Ideal para escapadas de trabajo o fin de semana.",
  },
  {
    id: "2",
    title: "Casa de playa con terraza",
    city: "Valencia",
    country: "Espana",
    lat: 39.4699,
    lng: -0.3763,
    rating: 4.85,
    reviews: 92,
    nightlyPrice: 188,
    imageUrl:
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1600&q=80",
    description:
      "A pasos del mar, con terraza privada, zona de BBQ y espacios amplios para familias.",
  },
  {
    id: "3",
    title: "Cabana de montana premium",
    city: "Granada",
    country: "Espana",
    lat: 37.1773,
    lng: -3.5986,
    rating: 4.97,
    reviews: 201,
    nightlyPrice: 220,
    imageUrl:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1600&q=80",
    description:
      "Refugio de diseno con chimenea, jacuzzi exterior y senderos naturales cercanos.",
  },
];

export function getRoomById(id: string): Room | undefined {
  return rooms.find((room) => room.id === id);
}
