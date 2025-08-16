interface DestinationType {
    id: number;
    name: string;
    image : string;
    title : string;
    description : string;
    price : number;
    rating : number;
    reviews : number;
    location : string;
    amenities : string[];
    activities : string[];
    location_images : string[];
}

interface Destination {
    id: string;
    name: string;
    image: string;
    title: string;
    description: string;
    price: number;
    rating: number;
    reviews: number;
    location: string;
    amenities: string[];
    activities: string[];
    location_images: string[];
    createdAt?: Date;
    updatedAt?: Date;
  }

export type { DestinationType, Destination };