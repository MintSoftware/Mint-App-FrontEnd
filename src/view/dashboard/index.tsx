import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {  SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Link } from "react-router-dom"
import { Label } from "@/components/ui/label"

export default function MenuInicial() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Seção do Carrossel */}
            <section className="relative h-[500px] overflow-hidden">
                <div className="absolute inset-0 w-full h-full">
                    <Carousel className="w-full h-full">
                        <CarouselContent>
                            <CarouselItem>
                                <img src="/placeholder.svg" alt="Quadra de Futebol" className="w-full h-full object-cover" />
                            </CarouselItem>
                            <CarouselItem>
                                <img src="/placeholder.svg" alt="Quadra de Futebol" className="w-full h-full object-cover" />
                            </CarouselItem>
                            <CarouselItem>
                                <img src="/placeholder.svg" alt="Quadra de Futebol" className="w-full h-full object-cover" />
                            </CarouselItem>
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
                <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center text-white">
                    <div className="absolute top-4 right-4">
                        <Avatar className="relative overflow-visible">
                            <span className="absolute -right-1 -top-0 flex h-3 w-3 rounded-full bg-green-600" />
                            <AvatarImage src="/placeholder-user.jpg" alt="@jaredpalmer" />
                            <AvatarFallback>JP</AvatarFallback>
                        </Avatar>
                    </div>
                    <Label className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                        Alugue as Melhores Quadras de Futebol
                    </Label>
                    <Label className="mt-3 text-xl sm:mt-5 sm:text-2xl">
                        Encontre e reserve a quadra de futebol perfeita para seu próximo jogo ou evento.
                    </Label>
                    <div className="mt-5 sm:mt-8">
                        <Link
                            to="#"
                            className="inline-flex items-center justify-center px-4 py-2 text-base font-medium rounded-md shadow-sm text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                            Reserve Agora
                        </Link>
                    </div>
                </div>
            </section>

            {/* Filtros */}
            <div className="bg-gray-100 p-4 lg:p-8">
                <Label className="text-2xl font-bold mb-4">Filtrar Quadras</Label>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="location" className="block text-gray-700 font-medium mb-2">
                            Localização
                        </label>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione a localização" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="downtown">Centro</SelectItem>
                            <SelectItem value="uptown">Zona Alta</SelectItem>
                            <SelectItem value="suburban">Subúrbio</SelectItem>
                        </SelectContent>
                    </div>
                    <div>
                        <label htmlFor="size" className="block text-gray-700 font-medium mb-2">
                            Tamanho da Quadra
                        </label>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione o tamanho" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="small">Pequena</SelectItem>
                            <SelectItem value="medium">Média</SelectItem>
                            <SelectItem value="large">Grande</SelectItem>
                        </SelectContent>
                    </div>
                    <div>
                        <Label htmlFor="amenities" className="block text-gray-700 font-medium mb-2">
                            Comodidades
                        </Label>
                        <div className="space-y-2">
                            <Checkbox id="lights" value="lights">Iluminação</Checkbox>
                            <Checkbox id="showers" value="showers">Chuveiros</Checkbox>
                            <Checkbox id="scoreboard" value="scoreboard">Placar</Checkbox>
                        </div>
                    </div>
                    <Button className="w-full">Aplicar Filtros</Button>
                </div>
            </div>

            {/* Quadras Disponíveis */}
            <div className="flex-1 p-4 lg:p-8">
                <Label className="text-2xl font-bold mb-4">Quadras Disponíveis</Label>
                <Carousel className="w-full">
                    <CarouselContent>
                        <CarouselItem>
                            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                                <img src="/placeholder.svg" alt="Quadra 1" className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <Label className="text-xl font-bold mb-2">Quadra 1</Label>
                                    <Label className="text-gray-500 mb-4">Localização no Centro</Label>
                                    <Link
                                        to="#"
                                        className="inline-flex items-center justify-center px-4 py-2 text-base font-medium rounded-md shadow-sm text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                    >
                                        Reserve Agora
                                    </Link>
                                </div>
                            </div>
                        </CarouselItem>
                        <CarouselItem>
                            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                                <img src="/placeholder.svg" alt="Quadra 2" className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <Label className="text-xl font-bold mb-2">Quadra 2</Label>
                                    <Label className="text-gray-500 mb-4">Localização na Zona Alta</Label>
                                    <Link
                                        to="#"
                                        className="inline-flex items-center justify-center px-4 py-2 text-base font-medium rounded-md shadow-sm text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                    >
                                        Reserve Agora
                                    </Link>
                                </div>
                            </div>
                        </CarouselItem>
                        <CarouselItem>
                            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                                <img src="/placeholder.svg" alt="Quadra 3" className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <Label className="text-xl font-bold mb-2">Quadra 3</Label>
                                    <Label className="text-gray-500 mb-4">Localização no Subúrbio</Label>
                                    <Link
                                        to="#"
                                        className="inline-flex items-center justify-center px-4 py-2 text-base font-medium rounded-md shadow-sm text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                    >
                                        Reserve Agora
                                    </Link>
                                </div>
                            </div>
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>

            {/* Quadras Reservadas */}
            <div className="flex-1 p-4 lg:p-8">
                <Label className="text-2xl font-bold mb-4">Quadras Reservadas</Label>
                <Carousel className="w-full">
                    <CarouselContent>
                        <CarouselItem>
                            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                                <img src="/placeholder.svg" alt="Quadra 4" className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <Label className="text-xl font-bold mb-2">Quadra 4</Label>
                                    <Label className="text-gray-500 mb-4">Localização no Centro</Label>
                                    <Link
                                        to="#"
                                        className="inline-flex items-center justify-center px-4 py-2 text-base font-medium rounded-md shadow-sm text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                    >
                                        Ver Detalhes
                                    </Link>
                                </div>
                            </div>
                        </CarouselItem>
                        <CarouselItem>
                            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                                <img src="/placeholder.svg" alt="Quadra 5" className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <Label className="text-xl font-bold mb-2">Quadra 5</Label>
                                    <Label className="text-gray-500 mb-4">Localização na Zona Alta</Label>
                                    <Link
                                        to="#"
                                        className="inline-flex items-center justify-center px-4 py-2 text-base font-medium rounded-md shadow-sm text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                    >
                                        Ver Detalhes
                                    </Link>
                                </div>
                            </div>
                        </CarouselItem>
                        <CarouselItem>
                            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                                <img src="/placeholder.svg" alt="Quadra 6" className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <Label className="text-xl font-bold mb-2">Quadra 6</Label>
                                    <Label className="text-gray-500 mb-4">Localização no Subúrbio</Label>
                                    <Link
                                        to="#"
                                        className="inline-flex items-center justify-center px-4 py-2 text-base font-medium rounded-md shadow-sm text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                    >
                                        Ver Detalhes
                                    </Link>
                                </div>
                            </div>
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>'
            <div>
              <label htmlFor="size" className="block text-gray-700 font-medium mb-2">
                Tamanho da Quadra
              </label>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tamanho" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Pequena</SelectItem>
                  <SelectItem value="medium">Média</SelectItem>
                  <SelectItem value="large">Grande</SelectItem>
                </SelectContent>
            </div>
            <div>
              <label htmlFor="amenities" className="block text-gray-700 font-medium mb-2">
                Comodidades
              </label>
              <div className="space-y-2">
                <Checkbox value="lights">Iluminação</Checkbox>
                <Checkbox value="showers">Chuveiros</Checkbox>
                <Checkbox value="scoreboard">Placar</Checkbox>
              </div>
            </div>
            <Button className="w-full">Aplicar Filtros</Button>
          </div>
        </div>
        <div className="flex-1 p-4 lg:p-8">
          <h2 className="text-2xl font-bold mb-4">Quadras Disponíveis</h2>
          <Carousel className="w-full">
            <CarouselContent>
              <CarouselItem>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img src="/placeholder.svg" alt="Quadra 1" className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2">Quadra 1</h3>
                    <p className="text-gray-500 mb-4">Localização no Centro</p>
                    <Link
                      to="#"
                      className="inline-flex items-center justify-center px-4 py-2 text-base font-medium rounded-md shadow-sm text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      Reserve Agora
                    </Link>
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img src="/placeholder.svg" alt="Quadra 2" className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2">Quadra 2</h3>
                    <p className="text-gray-500 mb-4">Localização na Zona Alta</p>
                    <Link
                      to="#"
                      className="inline-flex items-center justify-center px-4 py-2 text-base font-medium rounded-md shadow-sm text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      Reserve Agora
                    </Link>
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img src="/placeholder.svg" alt="Quadra 3" className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2">Quadra 3</h3>
                    <p className="text-gray-500 mb-4">Localização no Subúrbio</p>
                    <Link
                      to="#"
                      className="inline-flex items-center justify-center px-4 py-2 text-base font-medium rounded-md shadow-sm text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      Reserve Agora
                    </Link>
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div className="flex-1 p-4 lg:p-8">
          <h2 className="text-2xl font-bold mb-4">Quadras Reservadas</h2>
          <Carousel className="w-full">
            <CarouselContent>
              <CarouselItem>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img src="/placeholder.svg" alt="Quadra 4" className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2">Quadra 4</h3>
                    <p className="text-gray-500 mb-4">Localização no Centro</p>
                    <Link
                      to="#"
                      className="inline-flex items-center justify-center px-4 py-2 text-base font-medium rounded-md shadow-sm text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      Ver Detalhes
                    </Link>
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img src="/placeholder.svg" alt="Quadra 5" className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2">Quadra 5</h3>
                    <p className="text-gray-500 mb-4">Localização na Zona Alta</p>
                    <Link
                      to="#"
                      className="inline-flex items-center justify-center px-4 py-2 text-base font-medium rounded-md shadow-sm text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      Ver Detalhes
                    </Link>
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img src="/placeholder.svg" alt="Quadra 6" className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2">Quadra 6</h3>
                    <p className="text-gray-500 mb-4">Localização no Subúrbio</p>
                    <Link
                      to="#"
                      className="inline-flex items-center justify-center px-4 py-2 text-base font-medium rounded-md shadow-sm text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      Ver Detalhes
                    </Link>
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
    )
}

