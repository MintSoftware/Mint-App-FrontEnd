import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox"; // Assumindo que você tem um componente Checkbox
import { CarouselItem } from "./ui/carousel";

interface CarouselItemComponentProps {
  imageSrc: string;
  title: string;
  location: string;
  price: string;
  additionalInfo?: {
    sports: string;
    characteristics: string;
    hourlyRate: string;
  };
}

const CarouselItemComponent = ({ imageSrc, title, location, price, additionalInfo }: CarouselItemComponentProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);

  // Função para gerar intervalos de horário de 1 hora, de 07:00 até 22:00
  const generateHourlyIntervals = () => {
    const intervals = [];
    for (let hour = 7; hour < 22; hour++) {
      const startTime = `${hour.toString().padStart(2, '0')}:00`;
      const endTime = `${(hour + 1).toString().padStart(2, '0')}:00`;
      intervals.push(`${startTime} - ${endTime}`);
    }
    return intervals;
  };

  // Função para lidar com a seleção de horários
  const handleTimeSelect = (time: string) => {
    setSelectedTimes(prev =>
      prev.includes(time)
        ? prev.filter(t => t !== time)
        : [...prev, time]
    );
  };

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <CarouselItem
      className={`flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 ${isExpanded ? 'lg:w-full' : ''}`}
      onClick={handleClick}
      style={{
        transition: "all 0.3s ease",
        cursor: "pointer",
      }}
    >
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
          {isExpanded && (
            <div className="mt-4 p-2">
              {additionalInfo && (
                <>
                  <p><strong>Esportes:</strong> {additionalInfo.sports}</p>
                  <p><strong>Características:</strong> {additionalInfo.characteristics}</p>
                  <p><strong>Valor por hora:</strong> {additionalInfo.hourlyRate}</p>
                </>
              )}
              {/* Adicionar a lista de horários */}
              <div className="mt-4">
                <p><strong>Horários Disponíveis:</strong></p>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {generateHourlyIntervals().map(time => (
                    <div key={time} className="flex items-center space-x-2">
                      <Checkbox
                        id={time}
                        checked={selectedTimes.includes(time)}
                        onCheckedChange={() => handleTimeSelect(time)}
                      />
                      <Label htmlFor={time}>{time}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </CarouselItem>
  );
};

export default CarouselItemComponent;
