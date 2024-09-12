import { ChevronDown, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from '@/components/ui/label'
import { pageViewModel } from './pageViewModel'




export default function MobileReservationApp() {
  const {
    selectedLocation,
    sports,
    availableLocations,
    recommendedLocations,
    handleLocationClick,
} = pageViewModel();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="p-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              <div className="flex items-center">
                <Search className="mr-2 h-4 w-4" />
                Filtros
              </div>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Nome</label>
                <Input id="name" type="text" placeholder="Nome do local" />
              </div>
              <div>
                <label htmlFor="date" className="block text-sm font-medium mb-1">Data</label>
                <Input id="date" type="date" />
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label htmlFor="startTime" className="block text-sm font-medium mb-1">Hora Início</label>
                  <Input id="startTime" type="time" />
                </div>
                <div className="flex-1">
                  <label htmlFor="endTime" className="block text-sm font-medium mb-1">Hora Fim</label>
                  <Input id="endTime" type="time" />
                </div>
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium mb-1">Estado</label>
                <Input id="state" type="text" placeholder="Estado" />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium mb-1">Cidade</label>
                <Input id="city" type="text" placeholder="Cidade" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Esportes</label>
                <div className="grid grid-cols-2 gap-2">
                  {sports.map((sport) => (
                    <div key={sport.id} className="flex items-center space-x-2">
                      <Checkbox id={sport.id} />
                      <label htmlFor={sport.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {sport.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <Button className="w-full">Aplicar Filtros</Button>
            </div>
          </PopoverContent>
        </Popover>

        <h2 className="text-xl font-bold mb-4 mt-6">Locais Disponíveis</h2>
        <Carousel className="w-full max-w-xs mx-auto mb-8">
        <CarouselContent className='gap-2 '>
            {availableLocations.map((location) => (
              <CarouselItem key={location.id} className=" bg-emerald-500 basis-4/5  border rounded-xl">
                <div className="p-2 ">
                  <div 
                    className="flex aspect-square items-center justify-center p-2 cursor-pointer"
                    onClick={() => handleLocationClick(location)}
                  >
                    <img src={location.image} alt={location.name} className="rounded-lg object-cover w-full h-full" />
                  </div>
                  <h3 className="text-center mt-2 font-semibold ">{location.name}</h3>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <h2 className="text-xl font-bold mb-4">Locais Recomendados</h2>
        <Carousel className="w-full max-w-xs mx-auto">
          <CarouselContent className='gap-2'>
            {recommendedLocations.map((location) => (
              <CarouselItem key={location.id} className="basis-4/5 bg-emerald-500 border rounded-xl">
                <div className="p-1">
                  <div 
                    className="flex aspect-square items-center justify-center p-2 cursor-pointer"
                    onClick={() => handleLocationClick(location)}
                  >
                    <img src={location.image} alt={location.name} className="rounded-lg object-cover w-full h-full" />
                  </div>
                  <h3 className="text-center mt-2 font-semibold">{location.name}</h3>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </main>

      <Dialog open={!!selectedLocation} onOpenChange={() => handleLocationClick(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedLocation?.name}</DialogTitle>
            <DialogDescription>{selectedLocation?.description}</DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <Carousel className="w-full max-w-xs mx-auto ">
              <CarouselContent className=''>
                {selectedLocation?.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <img src={image} alt={`${selectedLocation.name} - Imagem ${index + 1}`} className="rounded-lg object-cover w-full h-48" />
                  </CarouselItem> 
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
          <div className="mt-4 space-y-2">
            <div className=''>
              <Label >Endereço: {selectedLocation?.address}</Label>
            </div>
            <div className=''>
              <Label className='font-bold'>Valor Hora: </Label>
              <Label className=''>{selectedLocation?.price}</Label>
            </div>
            <div className=''>
              <Label className='font-bold'>Características : </Label>
              <Label className=''>{selectedLocation?.price}</Label>
            </div>            
          </div>
          <Button className="w-full mt-4" onClick={() => handleLocationClick(null)}>Fechar</Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}