import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Plus, Image, User } from 'lucide-react';

interface Note {
  id: string;
  author: string;
  content: string;
  createdAt: Date;
  images?: string[];
}

interface NotesSectionProps {
  dealId: string;
}

const NotesSection = ({ dealId }: NotesSectionProps) => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      author: 'John Smith',
      content: 'Initial contact made with the client. They seem very interested in our services and want to schedule a follow-up meeting next week.',
      createdAt: new Date('2024-01-15'),
    },
    {
      id: '2', 
      author: 'Sarah Johnson',
      content: 'Follow-up meeting completed. Client has approved the proposal and is ready to move forward. Need to prepare contracts.',
      createdAt: new Date('2024-01-22'),
    }
  ]);
  
  const [newNote, setNewNote] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const handleAddNote = () => {
    if (!newNote.trim() || !authorName.trim()) return;
    
    const note: Note = {
      id: Date.now().toString(),
      author: authorName,
      content: newNote,
      createdAt: new Date(),
    };
    
    setNotes([note, ...notes]);
    setNewNote('');
    setAuthorName('');
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <Card className="bg-card border-border h-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-card-foreground flex items-center">
          <MessageSquare className="w-5 h-5 mr-2" />
          Deal Notes
          <Badge variant="secondary" className="ml-2">
            {notes.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add New Note Form */}
        <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
          <Input
            placeholder="Your name"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="bg-background"
          />
          <Textarea
            placeholder="Add a note..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="bg-background min-h-[80px]"
          />
          <div className="flex justify-between items-center">
            <Button variant="outline" size="sm" disabled>
              <Image className="w-4 h-4 mr-2" />
              Add Image
            </Button>
            <Button onClick={handleAddNote} size="sm" disabled={!newNote.trim() || !authorName.trim()}>
              <Plus className="w-4 h-4 mr-2" />
              Add Note
            </Button>
          </div>
        </div>

        {/* Notes List */}
        <div className="space-y-3 max-h-[600px] overflow-y-auto">
          {notes.map((note) => (
            <Dialog key={note.id}>
              <DialogTrigger asChild>
                <div className="p-4 bg-background border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium text-sm text-card-foreground">{note.author}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{formatDate(note.createdAt)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-3">{note.content}</p>
                  {note.content.length > 150 && (
                    <p className="text-xs text-primary mt-1">Click to read more...</p>
                  )}
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span>{note.author}</span>
                    <span className="text-sm font-normal text-muted-foreground">
                      • {formatDate(note.createdAt)}
                    </span>
                  </DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                  <p className="text-foreground whitespace-pre-wrap">{note.content}</p>
                  {note.images && note.images.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      {note.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Attachment ${index + 1}`}
                          className="rounded-lg border border-border"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NotesSection;