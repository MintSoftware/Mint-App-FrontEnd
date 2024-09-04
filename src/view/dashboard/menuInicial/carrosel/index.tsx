import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import AdditionalInfo from "../modal/informacoesAdicionais";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { CarouselItem } from "@/components/ui/carousel";

interface CarouselItemComponentProps {
  imageSrc: string;
  title: string;
  location: string;
  price: string;
  additionalImages?: string[];
  additionalInfo?: {
    sports: string[];
    characteristics: string[];
    hourlyRate: string;
  };
}

const CarouselItemComponent = ({ imageSrc, title, location, price,  additionalInfo }: CarouselItemComponentProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [accordionOpen, setAccordionOpen] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setAccordionOpen(false);
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTimes((prevSelectedTimes) =>
      prevSelectedTimes.includes(time)
        ? prevSelectedTimes.filter((t) => t !== time)
        : [...prevSelectedTimes, time]
    );
  };

  const handleAccordionToggle = () => {
    setAccordionOpen(!accordionOpen);
    setIsExpanded(true); 
  };

 const generateHourlyIntervals = () => {
    const intervals = [];
    for (let hour = 7; hour < 22; hour++) {
      const startTime = `${hour.toString().padStart(2, '0')}:00`;
      const endTime = `${(hour + 1).toString().padStart(2, '0')}:00`;
      intervals.push(`${startTime} - ${endTime}`);
    }
    return intervals;
  };

  return (
    <>
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

              {!isExpanded && (
                <div className="flex flex-col items-center">
                  <Label className="text-x font-bold m-0.5">{title}</Label>
                  <Label className="text-xs m-0.5">{location}</Label>
                  <Label className="text-xs font-bold m-0.5">{price}</Label>
                </div>
              )}

              {isExpanded && additionalInfo && (
                <div className="mt-4 p-2">
                  <AdditionalInfo
                    sports={additionalInfo.sports}
                    characteristics={additionalInfo.characteristics}
                    hourlyRate={additionalInfo.hourlyRate}
                  />
                </div>
              )}

              {isExpanded && (
                <Accordion type="single" collapsible className="mb-4">
                  <AccordionItem value="horarios" >
                    <AccordionTrigger onClick={handleAccordionToggle}>Horários</AccordionTrigger>
                    <AccordionContent>
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
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}
            </div>
          </div>
        </div>
      </CarouselItem>
    </>
  );
};

export default CarouselItemComponent;
