import { Button } from './components/ui/button';
import { Github, Wand2 } from 'lucide-react';
import { Separator } from './components/ui/separator';
import { Textarea } from './components/ui/textarea';
import { VideoInputForm } from './components/video-input-form';
import { PromptSelect } from './components/prompt-select';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './components/ui/select';
import { Label } from './components/ui/label';
import { TemperatureSlider } from './components/temperature-slider';
import { useCompletion } from 'ai/react';

export function App() {
  const [temperature, setTemperature] = useState(0.5);
  const [videoId, setVideoId] = useState<string | null>(null);

  const {
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    completion,
    isLoading,
  } = useCompletion({
    api: 'http://localhost:3000/ai/complete',
    body: {
      videoId,
      temperature,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const canSubmit = !isLoading && videoId != null && input != '';

  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-6 py-4 flex items-center justify-between border-b">
        <h1 className="text-xl font-bold">upload.ai</h1>

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            Desenvolvido por{' '}
            <a
              href="https://www.linkedin.com/in/gabrielrra/"
              className="text-violet-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gabriel Amorim
            </a>
            , no NLW da RocketSeat
          </span>
          <Separator orientation="vertical" className="h-6" />
          <a
            href="https://github.com/gabrielrra"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant={'outline'}>
              <Github className="w-4 h-4 mr-2"></Github>
              Github
            </Button>
          </a>
        </div>
      </div>

      <main className="flex-1 p-6 flex gap-6">
        <div className="flex flex-col flex-1 gap-4">
          <div className="grid grid-rows-2 gap-4 flex-1">
            <Textarea
              placeholder="Inclua o prompt para a IA"
              className="resize-none p-4 leading-relaxed"
              value={input}
              onChange={handleInputChange}
            />
            <Textarea
              placeholder="Resultado gerado pela IA"
              className="resize-none p-4 leading-relaxed"
              readOnly
              value={completion}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Lembre-se: Você pode utilizar a variável{' '}
            <code className="text-violet-400">{'{transcription}'}</code> no seu
            prompt para adicionar o conteúdo da transcrição do vídeo selecionado
          </p>
        </div>
        <aside className="w-80 space-y-6 h-full">
          <VideoInputForm onVideoUploaded={setVideoId} />
          <Separator />

          <form onSubmit={handleSubmit} className="space-y-6">
            <PromptSelect onPromptSelected={setInput} />
            <div className="space-y-2">
              <Label>Modelo</Label>
              <Select defaultValue="gpt3.5" disabled>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt3.5"> GPT 3.5-turbo 16k </SelectItem>
                </SelectContent>
              </Select>
              <span className="block text-xs text-muted-foreground italic">
                Você poderá customizar essa opção em breve
              </span>
            </div>

            <Separator />

            <TemperatureSlider
              onSetTemperature={setTemperature}
              value={temperature}
            />

            <Separator />

            <Button disabled={!canSubmit} type="submit" className="w-full">
              Executar
              <Wand2 className="2-4 h-4 ml-2" />
            </Button>
          </form>
        </aside>
      </main>
    </div>
  );
}
