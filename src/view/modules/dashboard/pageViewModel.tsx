import { useState } from 'react'

type Location = {
    id: number
    name: string
    image: string
    description: string
    address: string
    price: string
    images: string[]
  }
  
export function pageViewModel() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null); 

  const sports = [
    { id: 'futebol', label: 'Futebol' },
    { id: 'volei', label: 'Vôlei' },
    { id: 'basquete', label: 'Basquete' },
    { id: 'tenis', label: 'Tênis' },
  ]

  const availableLocations = [
    { 
      id: 1, 
      name: 'Quadra Poliesportiva', 
      image: '/quadra_campo.png?height=300&width=400',
      description: 'Quadra versátil para diversos esportes',
      address: 'Rua das Flores, 123',
      price: 'R$ 50/hora',
      images: [
        '/quadra_campo.png?height=300&width=400',
        '/quadra_campo.png?height=300&width=400',
        '/quadra_campo.png?height=300&width=400',
      ]
    },
    {   
      id: 2, 
      name: 'Campo de Futebol', 
      image: '/fute.png?height=300&width=400',
      description: 'Campo oficial para partidas de futebol',
      address: 'Av. dos Esportes, 456',
      price: 'R$ 80/hora',
      images: [
        '/fute.png.jpg?height=300&width=400',
        '/fute.png?height=300&width=400',
        '/fute.png?height=300&width=400',
      ]
    },
    { 
      id: 3, 
      name: 'Quadra de futebol de salão', 
      image: '/campo.png?height=300&width=400',
      description: 'Quadra profissional de tênis',
      address: 'Praça da Raquete, 789',
      price: 'R$ 60/hora',
      images: [
        '/campo.png?height=300&width=400',
        '/campo.png?height=300&width=400',
        '/campo.png?height=300&width=400',
      ]
    },
    { 
      id: 4, 
      name: 'Ginásio Coberto', 
      image: '/quadra_azul.png?height=200&width=300',
      description: 'Espaço coberto para eventos esportivos',
      address: 'Rua do Ginásio, 1010',
      price: 'R$ 100/hora',
      images: [
        '/quadra_azul.png?height=200&width=300',
        '/quadra_azul.png?height=200&width=300',
        '/quadra_azul.png?height=200&width=300',
      ]
    },
  ]

  const recommendedLocations = [
    { 
      id: 5, 
      name: 'Ginásio Coberto', 
      image: '/TENIS.png?height=200&width=300',
      description: 'Espaço coberto para eventos esportivos',
      address: 'Rua do Ginásio, 1010',
      price: 'R$ 100/hora',
      images: [
        '/TENIS.png?height=200&width=300',
        '/TENIS.png?height=200&width=300',
        '/TENIS.png?height=200&width=300',
      ]
    },
    { 
      id: 6, 
      name: 'Ginásio Coberto', 
      image: '/beach_tenis.png?height=200&width=300',
      description: 'Espaço coberto para eventos esportivos',
      address: 'Rua do Ginásio, 1010',
      price: 'R$ 100/hora',
      images: [
        '/beach_tenis.png?height=200&width=300',
        '/beach_tenis.png?height=200&width=300',
        '/beach_tenis.png?height=200&width=300',
      ]
    },
  ]

  const handleLocationClick = (location: any) => {
    setSelectedLocation(location)
  }

  

  return {
    selectedLocation,
    
    sports,
    availableLocations,
    recommendedLocations,
    handleLocationClick,
  }
}
