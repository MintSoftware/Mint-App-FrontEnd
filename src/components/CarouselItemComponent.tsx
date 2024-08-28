
import { Label } from "@/components/ui/label";
import { CarouselItem } from "./ui/carousel";

interface CarouselItemComponentProps {
  imageSrc: string;
  title: string;
  location: string;
  price: string;
}

const CarouselItemComponent = ({ imageSrc, title, location, price }: CarouselItemComponentProps) => (
  <CarouselItem className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
    <div className="p-1">
      <div className="rounded-lg overflow-hidden border">
        <div className="aspect-w-16 aspect-h-9 p-3 rounded">
          <img src={imageSrc} alt={title} className="w-full h-32 object-cover mb-2" />
        </div>
        <div className="flex flex-col items-center">
          <Label className="text-x font-bold m-0.5">{title}</Label>
          <Label className="text-xs m-0.5">{location}</Label>
          <Label className="text-xs font-bold m-0.5">{price}</Label>
        </div>
      </div>
    </div>
  </CarouselItem>
);

export default CarouselItemComponent;
