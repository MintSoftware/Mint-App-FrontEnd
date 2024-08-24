import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Label } from "@/components/ui/label";
import { mostraTodosEstadosBrasileiros } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function MenuInicial() {
  return (
    <div className="p-2 space-y-2 text-muted-foreground"> 
      <div className="flex flex-col items-center">
        <img src="/logo.png" alt="Logo" className="w-20 h-17 mx-6 my-6" /> 
      </div>
      <div className=" p-2 rounded-lg shadow-md "> 
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
          <div className="relative">
          <Label className="absolute top-5 z-20">Filtros</Label>
            <AccordionTrigger><div>     </div></AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col space-y-2">
                <Input type="text" placeholder="Pesquisa por nome" className="border border-muted/40 text-sm" /> 
                <div className="space-y-1">
                  <Label className="text-sm font-bold">Data</Label> 
                  <Input type="date" placeholder="Date" className="border border-muted/40 text-sm" /> 
                  <div className="flex space-x-2">
                    <div className="flex items-center space-x-2">
                      <Label className="text-sm font-bold">Hora inicio</Label>
                      <Input id="inicio" type="time" value="00:00" className="time-input ml-2 w-1/2" />
                    </div>
                    <div className="flex items-center space-x-2 m-2">
                      <Label className="text-sm font-bold">Hora fim</Label>
                      <Input id="fim" type="time" value="00:00" className="time-input ml-2 w-1/2" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                    <Select>
                      <SelectTrigger className="border border-muted/40 text-sm">
                        <SelectValue placeholder="Escolha um estado" />
                      </SelectTrigger>
                      <SelectContent className="border border-muted/40 text-sm">
                        {mostraTodosEstadosBrasileiros().map((estado) => (
                          <SelectItem key={estado} value={estado}>{estado}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input type="text" placeholder="Escolha uma Cidade" className="border border-muted/40 text-sm" /> 
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-medium">Sports</Label> 
                    <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
                      <div className="flex items-center space-x-1">
                        <Checkbox id="volei" className="border border-muted/40" />
                        <Label htmlFor="volei" className="text-xs">Volei</Label> 
                      </div>
                      <div className="flex items-center space-x-1">
                        <Checkbox id="futsal" className="border border-muted/40" />
                        <Label htmlFor="futsal" className="text-xs">Futsal</Label> 
                      </div>
                      <div className="flex items-center space-x-1">
                        <Checkbox id="beach-tennis" className="border border-muted/40" />
                        <Label htmlFor="beach-tennis" className="text-xs">Beach Tennis</Label> 
                      </div>
                      <div className="flex items-center space-x-1">
                        <Checkbox id="futebol-society" className="border border-muted/40" />
                        <Label htmlFor="futebol-society" className="text-xs">Futebol Society</Label> 
                      </div>
                      <div className="flex items-center space-x-1">
                        <Checkbox id="volei-de-praia" className="border border-muted/40" />
                        <Label htmlFor="volei-de-praia" className="text-xs">Tênis</Label> 
                      </div>
                      <div className="flex items-center space-x-1">
                        <Checkbox id="tenis" className="border border-muted/40" />
                        <Label htmlFor="tenis" className="text-xs">Basquete</Label> 
                      </div>
                      <div className="flex items-center space-x-1 mb-5">
                        <Checkbox id="basquete" className="border border-muted/40" />
                        <Label htmlFor="basquete" className="text-xs text-w">Volêi de Praia</Label> 
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Button className="w-full">Pesquisar</Button>
            </AccordionContent>
            </div>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="space-y-2">
        <Label className="text-sm">Lugares baseado nas suas ultimas pesquisas</Label> 
        <Carousel className="w-full">
          <CarouselContent>
            <CarouselItem className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <div className="p-1">
                <div className="rounded-lg overflow-hidden border">
                  <div className="aspect-w-16 aspect-h-9 p-3 rounded">
                    <img src="/abandonado.png" alt="Location 1" className="w-full h-32 object-cover mb-2" /> 
                  </div>
                  <div className="flex flex-col items-center">
                    <Label className="text-x font-bold m-0.5">Bar do Zé</Label> 
                    <Label className="text-xs m-0.5">Criciúma, SC</Label> 
                    <Label className="text-xs font-bold m-0.5">R$150,00</Label> 
                  </div>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <div className="p-1">
                <div className=" rounded-lg overflow-hidden border">
                  <div className="aspect-w-16 aspect-h-9 p-3 rounded">
                    <img src="/forever_alone.png" alt="Location 1" className="w-full h-32 object-cover mb-2" /> 
                  </div>
                  <div className="flex flex-col items-center">
                    <Label className="text-x font-bold m-0.5">Presidio Santa Augusta1</Label> 
                    <Label className="text-xs m-0.5">Criciúma, SC</Label> 
                    <Label className="text-xs font-bold m-0.5">R$ 110,00</Label> 
                  </div>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <div className="p-1">
                <div className=" rounded-lg overflow-hidden border">
                  <div className="aspect-w-16 aspect-h-9 p-3 rounded">
                    <img src="/quadra_arlivre.png" alt="Location 1" className="w-full h-32 object-cover mb-2" /> 
                  </div>
                  <div className="flex flex-col items-center">
                    <Label className="text-x font-bold m-0.5">Arranca a Sola</Label> 
                    <Label className="text-xs m-0.5">Meleiro, SC</Label> 
                    <Label className="text-xs font-bold m-0.5">R$ 180,00</Label> 
                  </div>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
      <div>
        <Label className="text-sm">Ultimas Reservas</Label> 
        <Carousel className="w-full">
          <CarouselContent>
            <CarouselItem className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <div className="p-1">
                <div className=" rounded-lg overflow-hidden border">
                  <div className="aspect-w-16 aspect-h-9 p-3 rounded">
                    <img src="/quadra_boa.png" alt="Location 1" className="w-full h-32 object-cover mb-2" /> 
                  </div>
                  <div className="flex flex-col items-center">
                    <Label className="text-x font-bold m-0.5">Quadra do Leme</Label> 
                    <Label className="text-xs m-0.5">Criciúma, SC</Label> 
                    <Label className="text-xs font-bold m-0.5">R$ 310,00</Label> 
                  </div>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <div className="p-1">
                <div className=" rounded-lg overflow-hidden border">
                  <div className="aspect-w-16 aspect-h-9 p-3 rounded">
                    <img src="/quadra_campo.png" alt="Location 1" className="w-full h-32 object-cover mb-2" /> 
                  </div>
                  <div className="flex flex-col items-center">
                  <Label className="text-x font-bold s m-0.5"> Quadra dos Enzo</Label> 
                    <Label className="text-xs m-0.5">Criciúma, SC</Label>
                    <Label className="text-xs font-bold m-0.5">R$ 30,00</Label> 
                  </div>
                </div>
              </div> 
            </CarouselItem>
            <CarouselItem className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <div className="p-1">
                <div className=" rounded-lg overflow-hidden border">
                  <div className="aspect-w-16 aspect-h-9 p-3 rounded">
                    <img src="/quadra_arlivre.png" alt="Location 1" className="w-full h-32 object-cover mb-2" /> 
                  </div>
                  <div className="flex flex-col items-center">
                    <Label className="text-x font-bold s m-0.5"> Matagal Dois</Label> 
                    <Label className="text-xs m-0.5">Criciúma, SC</Label> 
                    <Label className="text-xs font-bold m-0.5">R$ 6.000,00</Label> 
                  </div>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}