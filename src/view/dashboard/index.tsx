import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Label } from "@/components/ui/label";

export default function Component() {
  return (
    <div className="p-4 space-y-4 text-gray-900"> {/* Fundo preto claro */}
      <div className="flex flex-col items-center">
        <img src="/placeholder.svg" alt="Logo" className="w-16 h-16" />
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md border border-black"> {/* Filtros com fundo branco e contorno preto */}
        <div className="flex flex-col space-y-4">
          <Label className="text-lg font-bold">Filters</Label>
          <div className="space-y-2">
            <Input type="date" placeholder="Date" className="border border-black" />
            <div className="grid grid-cols-2 gap-2">
              <Input type="time" placeholder="Start Time" className="border border-black" />
              <Input type="time" placeholder="End Time" className="border border-black" />
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <Input type="text" placeholder="City" className="border border-black" />
              <Select>
                <SelectTrigger className="border border-black">
                  <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent className="border border-black">
                  <SelectItem value="SC">SC</SelectItem>
                  <SelectItem value="SP">SP</SelectItem>
                  <SelectItem value="RJ">RJ</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Sports</Label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="volei" className="border border-black" />
                  <Label htmlFor="volei">Volleyball</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="futsal" className="border border-black" />
                  <Label htmlFor="futsal">Futsal</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="beach-tennis" className="border border-black" />
                  <Label htmlFor="beach-tennis">Beach Tennis</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="futebol-society" className="border border-black" />
                  <Label htmlFor="futebol-society">Soccer</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="futevolei" className="border border-black" />
                  <Label htmlFor="futevolei">Footvolley</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="volei-de-praia" className="border border-black" />
                  <Label htmlFor="volei-de-praia">Beach Volleyball</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="tenis" className="border border-black" />
                  <Label htmlFor="tenis">Tennis</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="basquete" className="border border-black" />
                  <Label htmlFor="basquete">Basketball</Label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <Label className="text-lg font-bold text-white">Photos</Label>
        <Carousel className="w-full">
          <CarouselContent>
            <CarouselItem className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <div className="p-1">
                <div className="bg-white rounded-lg overflow-hidden border border-black">
                  <div className="aspect-w-16 aspect-h-9">
                    <img src="/abandonado.png" alt="Location 1" className="w-full h-48 object-cover mb-4" />
                  </div>
                  <div className="mt-2 p-2">
                    <Label className="text-sm font-medium text-white">Arena Rio Maina</Label>
                    <Label className="text-sm text-gray-600">Court 01</Label>
                    <Label className="text-sm text-gray-600">Criciúma, SC</Label>
                    <Label className="text-sm font-bold">R$ 110,00</Label>
                  </div>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <div className="p-1">
                <div className="bg-white rounded-lg overflow-hidden border border-black">
                  <div className="aspect-w-16 aspect-h-9">
                  <img src="/forever_alone.png" alt="Location 1" className="w-full h-48 object-cover mb-4" />
                  </div>
                  <div className="mt-2 p-2">
                    <Label className="text-sm font-medium">Arena Criciúma</Label>
                    <Label className="text-sm text-gray-600">Outdoor Court 01</Label>
                    <Label className="text-sm text-gray-600">Criciúma, SC</Label>
                    <Label className="text-sm font-bold">R$ 80,00</Label>
                  </div>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <div className="p-1">
                <div className="bg-white rounded-lg overflow-hidden border border-black">
                  <div className="aspect-w-16 aspect-h-9">
                  <img src="/quadra_arlivre.png" alt="Location 1" className="w-full h-48 object-cover mb-4" />
                  </div>
                  <div className="mt-2 p-2">
                    <Label className="text-sm font-medium">VeraCruz</Label>
                    <Label className="text-sm text-gray-600">Futsal Court</Label>
                    <Label className="text-sm text-gray-600">Criciúma, SC</Label>
                    <Label className="text-sm font-bold">R$ 100,00</Label>
                  </div>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="space-y-4">
        <Label className="text-lg font-bold text-white">Latest Bookings</Label>
        <Carousel className="w-full">
          <CarouselContent>
            <CarouselItem className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <div className="p-1">
                <div className="bg-white rounded-lg overflow-hidden border border-black">
                  <div className="aspect-w-16 aspect-h-9">
                  <img src="/quadra_boa.png" alt="Location 1" className="w-full h-48 object-cover mb-4" />
                  </div>
                  <div className="mt-2 p-2">
                    <Label className="text-sm text-gray-600">Date: 09/12/2023</Label>
                    <Label className="text-sm text-gray-600">Time: 2pm - 3pm</Label>
                    <Label className="text-sm font-medium">Arena Rio Maina</Label>
                    <Label className="text-sm text-gray-600">Court 01</Label>
                    <Label className="text-sm text-gray-600">Criciúma, SC</Label>
                    <Label className="text-sm font-bold">R$ 110,00</Label>
                  </div>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <div className="p-1">
                <div className="bg-white rounded-lg overflow-hidden border border-black">
                  <div className="aspect-w-16 aspect-h-9">
                    <img src="/quadra_campo.png" alt="Booking 2" className="w-full h-40 object-cover" style={{ aspectRatio: "1/1", objectFit: "cover" }} />
                  </div>
                  <div className="mt-2 p-2">
                    <Label className="text-sm text-gray-600">Date: 09/11/2023</Label>
                    <Label className="text-sm text-gray-600">Time: 4pm - 5pm</Label>
                    <Label className="text-sm font-medium">Resenha da Bola</Label>
                    <Label className="text-sm text-gray-600">Covered Court 01</Label>
                    <Label className="text-sm text-gray-600">Criciúma, SC</Label>
                    <Label className="text-sm font-bold">R$ 100,00</Label>
                  </div>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <div className="p-1">
                <div className="bg-white rounded-lg overflow-hidden border border-black">
                  <div className="aspect-w-16 aspect-h-9">
                    <img src="/placeholder.svg" alt="Booking 3" className="w-full h-40 object-cover" style={{ aspectRatio: "1/1", objectFit: "cover" }} />
                  </div>
                  <div className="mt-2 p-2">
                    <Label className="text-sm text-gray-600">Date: 09/10/2023</Label>
                    <Label className="text-sm text-gray-600">Time: 6pm - 7pm</Label>
                    <Label className="text-sm font-medium">Parque da Prefa</Label>
                    <Label className="text-sm text-gray-600">Basketball Court</Label>
                    <Label className="text-sm text-gray-600">Criciúma, SC</Label>
                    <Label className="text-sm font-bold">R$ 25,00</Label>
                  </div>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
           