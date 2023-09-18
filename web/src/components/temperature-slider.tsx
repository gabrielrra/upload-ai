import { Flame, Snowflake } from 'lucide-react';
import { Label } from './ui/label';
import { Slider } from './ui/slider';

interface TemperatureSliderProps {
  onSetTemperature: (value: number) => void;
  value: number;
}

export function TemperatureSlider({
  onSetTemperature,
  value
}: TemperatureSliderProps) {
  return (
    <div className="space-y-4">
      <Label>Temperatura</Label>

      <div className="flex space-x-4">
        <Snowflake className="w-4 h-4 text-indigo-700" />
        <Slider
          min={0}
          max={1}
          step={0.1}
          value={[value]}
          onValueChange={([v]) => onSetTemperature(v)}
          className="flex-1"
        />
        <Flame className={`w-4 h-4 text-orange-700 `} />
      </div>

      <span className="block text-xs text-muted-foreground italic leading-relaxed">
        Valores mais altos deixam os resultados mais criativos, porém com
        possíveis erros
      </span>
    </div>
  );
}
