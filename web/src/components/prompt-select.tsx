import { Snowflake, Flame, Wand2 } from 'lucide-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Slider } from './ui/slider';
import { useEffect, useState } from 'react';
import { api } from '@/lib/axios';

interface Prompt {
  id: string;
  title: string;
  template: string;
}

interface PromptSelectProps {
  onPromptSelected: (template: string) => void;
}

export function PromptSelect({ onPromptSelected }: PromptSelectProps) {
  const [prompts, setPrompts] = useState<Prompt[]>([]);

  useEffect(() => {
    api.get('/prompts').then(({ data }) => setPrompts(data));
  }, []);

  function handlePromptSelected(id: string) {
    const selectedPrompt = prompts.find((p) => p.id == id);

    if (!selectedPrompt) return;

    onPromptSelected(selectedPrompt.template);
  }

  return (
    <div className="space-y-2">
      <Label>Prompt</Label>
      <Select onValueChange={handlePromptSelected}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione um prompt..." />
        </SelectTrigger>
        <SelectContent>
          {prompts.map((prompt) => (
            <SelectItem key={prompt.id} value={prompt.id}>
              {prompt.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
