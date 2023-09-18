import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

interface TranscriptionDialogProps {
  transcription: string;
}

export function TranscriptionDialog({
  transcription,
}: TranscriptionDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link">Ver transcrição</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transcrição gerada por IA</DialogTitle>
          <DialogDescription>{transcription}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
