import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Label } from "@/components/ui/label";
import { mostraTodosEstadosBrasileiros } from "@/lib/utils";

export default function MenuInicial() {
  return (
    <div className="p-2 space-y-2 text-gray-900"> {/* Ajuste para padding menor */}
      <div className="flex flex-col items-center">
      <img src="/logo.png" alt="Logo" className="w-20 h-17 mx- 6 my-6" /> {/* Ajuste para tamanho menor */}
      </div>
      <div className="bg-white p-2 rounded-lg shadow-md border border-black"> {/* Ajuste para padding menor */}
        <div className="flex flex-col space-y-2">
          <Label className="text-sm font-bold">Filtros</Label> {/* Ajuste para fonte menor */}
          <div className="space-y-1">
          <Label className="text-sm font-bold">Data</Label> {/* Ajuste para fonte menor */}
            <Input type="date" placeholder="Date" className="border border-black text-sm" /> {/* Ajuste para fonte menor */}
            <div className="grid grid-cols-6 gap-1">
            <Label htmlFor="inicio" className="text-right">Início</Label>
            <Input id="inicio" type="time" value="00:00" className="time-input" />
            </div>
              <div className="grid grid-cols-5 gap-2">
                <Label htmlFor="fim" className="text-right">Fim</Label>
                <Input id="fim" type="time" value="00:00" className="time-input" />
              </div>
            <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
            <Select>
                <SelectTrigger className="border border-black text-sm">
                  <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent className="border border-black text-sm">
                  {mostraTodosEstadosBrasileiros().map((estado) => (
                    <SelectItem key={estado} value={estado}>{estado}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input type="text" placeholder="City" className="border border-black text-sm" /> {/* Ajuste para fonte menor */}
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-medium">Sports</Label> {/* Ajuste para fonte menor */}
              <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
                <div className="flex items-center space-x-1">
                  <Checkbox id="volei" className="border border-black" />
                  <Label htmlFor="volei" className="text-xs">Volei</Label> {/* Ajuste para fonte menor */}
                </div>
                <div className="flex items-center space-x-1">
                  <Checkbox id="futsal" className="border border-black" />
                  <Label htmlFor="futsal" className="text-xs">Futsal</Label> {/* Ajuste para fonte menor */}
                </div>
                <div className="flex items-center space-x-1">
                  <Checkbox id="beach-tennis" className="border border-black" />
                  <Label htmlFor="beach-tennis" className="text-xs">Beach Tennis</Label> {/* Ajuste para fonte menor */}
                </div>
                <div className="flex items-center space-x-1">
                  <Checkbox id="futebol-society" className="border border-black" />
                  <Label htmlFor="futebol-society" className="text-xs">Futebol Society</Label> {/* Ajuste para fonte menor */}
                </div>
                <div className="flex items-center space-x-1">
                  <Checkbox id="volei-de-praia" className="border border-black" />
                  <Label htmlFor="volei-de-praia" className="text-xs">Tênis</Label> {/* Ajuste para fonte menor */}
                </div>
                <div className="flex items-center space-x-1">
                  <Checkbox id="tenis" className="border border-black" />
                  <Label htmlFor="tenis" className="text-xs">Basquete</Label> {/* Ajuste para fonte menor */}
                </div>
                <div className="flex items-center space-x-1">
                  <Checkbox id="basquete" className="border border-black" />
                  <Label htmlFor="basquete" className="text-xs">Volêi de Praia</Label> {/* Ajuste para fonte menor */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <Label className="text-sm font-bold text-white">Photos</Label> {/* Ajuste para fonte menor */}
        <Carousel className="w-full">
          <CarouselContent>
            <CarouselItem className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <div className="p-1">
                <div className="bg-white rounded-lg overflow-hidden border border-black">
                  <div className="aspect-w-16 aspect-h-9">
                    <img src="/abandonado.png" alt="Location 1" className="w-full h-32 object-cover mb-2" /> {/* Ajuste para tamanho menor */}
                  </div>
                  <div className="mt-1 p-1">
                    <Label className="text-xs text-gray-600">Bar do Zé</Label> {/* Ajuste para fonte menor */}
                    <Label className="text-xs text-gray-600">Criciúma, SC</Label> {/* Ajuste para fonte menor */}
                    <Label className="text-xs font-bold">R$ 150,00</Label> {/* Ajuste para fonte menor */}
                  </div>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <div className="p-1">
                <div className="bg-white rounded-lg overflow-hidden border border-black">
                  <div className="aspect-w-16 aspect-h-9">
                    <img src="/forever_alone.png" alt="Location 1" className="w-full h-32 object-cover mb-2" /> {/* Ajuste para tamanho menor */}
                  </div>
                  <div className="mt-1 p-1">
                    <Label className="text-xs text-gray-600">Presidio Santa Augusta1</Label> {/* Ajuste para fonte menor */}
                    <Label className="text-xs text-gray-600">Criciúma, SC</Label> {/* Ajuste para fonte menor */}
                    <Label className="text-xs font-bold">R$ 110,00</Label> {/* Ajuste para fonte menor */}
                  </div>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <div className="p-1">
                <div className="bg-white rounded-lg overflow-hidden border border-black">
                  <div className="aspect-w-16 aspect-h-9">
                    <img src="/quadra_arlivre.png" alt="Location 1" className="w-full h-32 object-cover mb-2" /> {/* Ajuste para tamanho menor */}
                  </div>
                  <div className="mt-1 p-1">
                    <Label className="text-xs text-gray-600">Arranca a Sola</Label> {/* Ajuste para fonte menor */}
                    <Label className="text-xs text-gray-600">Meleiro, SC</Label> {/* Ajuste para fonte menor */}
                    <Label className="text-xs font-bold">R$ 180,00</Label> {/* Ajuste para fonte menor */}
                  </div>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="text-xs">Previous</CarouselPrevious> {/* Ajuste para fonte menor */}
          <CarouselNext className="text-xs">Next</CarouselNext> {/* Ajuste para fonte menor */}
        </Carousel>
      </div>
      <div>
      <Label className="text-sm font-bold text-white">Ultimas Reservas</Label> {/* Ajuste para fonte menor */}
        <Carousel className="w-full">
          <CarouselContent>
            <CarouselItem className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <div className="p-1">
                <div className="bg-white rounded-lg overflow-hidden border border-black">
                  <div className="aspect-w-16 aspect-h-9">
                    <img src="/quadra_boa.png" alt="Location 1" className="w-full h-32 object-cover mb-2" /> {/* Ajuste para tamanho menor */}
                  </div>
                  <div className="mt-1 p-1">
                    <Label className="text-xs font-medium text-white">Arena Rio Maina</Label> {/* Ajuste para fonte menor */}
                    <Label className="text-xs text-gray-600">Court 01</Label> {/* Ajuste para fonte menor */}
                    <Label className="text-xs text-gray-600">Criciúma, SC</Label> {/* Ajuste para fonte menor */}
                    <Label className="text-xs font-bold">R$ 110,00</Label> {/* Ajuste para fonte menor */}
                  </div>
              </div>
              </div>
            </CarouselItem>
            <CarouselItem className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <div className="p-1">
                <div className="bg-white rounded-lg overflow-hidden border border-black">
                  <div className="aspect-w-16 aspect-h-9">
                    <img src="/quadra_campo.png" alt="Location 1" className="w-full h-32 object-cover mb-2" /> {/* Ajuste para tamanho menor */}
                  </div>
                  <div className="mt-1 p-1">
                    <Label className="text-xs font-medium text-white">Arena Rio Maina</Label> {/* Ajuste para fonte menor */}
                    <Label className="text-xs text-gray-600">Court 01</Label> {/* Ajuste para fonte menor */}
                    <Label className="text-xs text-gray-600">Criciúma, SC</Label> {/* Ajuste para fonte menor */}
                    <Label className="text-xs font-bold">R$ 110,00</Label> {/* Ajuste para fonte menor */}
                  </div>
                </div>
              </div> 
            </CarouselItem>
            <CarouselItem className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <div className="p-1">
                <div className="bg-white rounded-lg overflow-hidden border border-black">
                  <div className="aspect-w-16 aspect-h-9">
                    <img src="/quadra_arlivre.png" alt="Location 1" className="w-full h-32 object-cover mb-2" /> {/* Ajuste para tamanho menor */}
                  </div>
                  <div className="mt-1 p-1">
                    <Label className="text-xs font-medium text-white">Arena Rio Maina</Label> {/* Ajuste para fonte menor */}
                    <Label className="text-xs text-gray-600">Court 01</Label> {/* Ajuste para fonte menor */}
                    <Label className="text-xs text-gray-600">Criciúma, SC</Label> {/* Ajuste para fonte menor */}
                    <Label className="text-xs font-bold">R$ 110,00</Label> {/* Ajuste para fonte menor */}
                  </div>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="text-xs">Previous</CarouselPrevious> {/* Ajuste para fonte menor */}
          <CarouselNext className="text-xs">Next</CarouselNext> {/* Ajuste para fonte menor */}
        </Carousel>
      </div>
    </div>
  );
}