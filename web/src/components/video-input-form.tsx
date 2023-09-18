import { Check, FileVideo, Upload } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';
import { Label } from './ui/label';
import { ChangeEvent, FormEvent, useMemo, useRef, useState } from 'react';
import { getFFmpeg } from '@/lib/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import { api } from '@/lib/axios';
import { TranscriptionDialog } from './transcription-dialog';

interface VideoInputFormProps {
  onVideoUploaded: (id: string) => void;
}

type status = 'waiting' | 'converting' | 'uploading' | 'generating' | 'success';

const statusMessage: Record<status, string> = {
  waiting: 'Carregar vídeo',
  converting: 'Convertendo para áudio...',
  uploading: 'Salvando o áudio...',
  generating: 'Gerando transcrição...',
  success: 'Arquivo pronto!',
};

export function VideoInputForm({ onVideoUploaded }: VideoInputFormProps) {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [status, setStatus] = useState<status>('waiting');
  const [transcription, setTranscription] = useState<string | undefined>(
    undefined
  );

  const promptInputRef = useRef<HTMLTextAreaElement>(null);

  function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.currentTarget;

    if (!files) return;

    const selectedFile = files[0];
    setVideoFile(selectedFile);
    // convertVideoToAudio(selectedFile)
  }

  async function handleUploadVideo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const prompt = promptInputRef.current?.value;

    if (!videoFile) return;

    setStatus('converting');

    //converter o vídeo em áudio
    const audioFile = await convertVideoToAudio(videoFile);

    setStatus('uploading');

    const requestBody = new FormData();
    requestBody.append('file', audioFile);
    const { data } = await api.post('/videos', requestBody);

    const videoId = data.video.id;

    setStatus('generating');

    const { data: transcriptionData } = await api.post(
      `/videos/${videoId}/transcription`,
      {
        prompt,
      }
    );
    const { transcription } = transcriptionData;
    setTranscription(transcription);

    setStatus('success');
    onVideoUploaded(videoId);
  }

  async function convertVideoToAudio(video: File) {
    console.time('Convert Video');
    console.log('Conversion started...');

    const ffmpeg = await getFFmpeg();

    ffmpeg.writeFile('input.mp4', await fetchFile(video));

    // ffmpeg.on('log', () => console.log('ffmpeg.log'));
    ffmpeg.on('progress', (progress) =>
      console.log(
        'Conversion progress: ',
        (progress.progress * 100).toFixed(2),
        '%',
        '\n',
        ' - Elapsed Time:',
        Math.round(progress.time),
        's'
      )
    );

    await ffmpeg.exec([
      '-i',
      'input.mp4',
      '-map',
      '0:a',
      '-b:a',
      '20k',
      '-acodec',
      'libmp3lame',
      'output.mp3',
    ]);
    const data = await ffmpeg.readFile('output.mp3');

    const audioFile = new File(
      [new Blob([data], { type: 'audio/mpeg' })],
      'audio.mp3',
      { type: 'audio/mpeg' }
    );
    console.log('Conversion ended...');
    console.timeEnd('Convert Video');
    return audioFile;
  }

  const previewURL = useMemo(() => {
    if (!videoFile) return undefined;
    return URL.createObjectURL(videoFile);
  }, [videoFile]);

  return (
    <form className="space-y-6" onSubmit={handleUploadVideo}>
      <label
        htmlFor="video"
        className="border w-full flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/10"
      >
        {videoFile ? (
          <video
            src={previewURL}
            controls={false}
            className="pointer-events-none inset-0"
          ></video>
        ) : (
          <>
            <FileVideo className="w-6 h-6"></FileVideo>
            Selecione um vídeo
          </>
        )}
      </label>
      <input
        type="file"
        id="video"
        accept="vide/mp4"
        className="sr-only"
        onChange={handleFileSelected}
      />

      <Separator />
      <div className="space-y-2">
        <Label htmlFor="transcription-prompt"> Prompt de transcrição </Label>

        <Textarea
          className="h-20 leading-relaxed"
          placeholder="Inclua palavras-chave mencionadas no vídeo, separadas por vírgula (,)"
          ref={promptInputRef}
          disabled={status != 'waiting'}
        />
      </div>

      <Button
        type="submit"
        disabled={status != 'waiting' && videoFile != null}
        data-success={status == 'success'}
        className="w-full data-[success=true]:bg-emerald-400 text-white"
      >
        {statusMessage[status]}
        {status == 'waiting' ? (
          <Upload className="h-4 w-4 ml-2"></Upload>
        ) : status == 'success' ? (
          <Check />
        ) : (
          ''
        )}
      </Button>
      {transcription && <TranscriptionDialog transcription={transcription} />}
    </form>
  );
}
