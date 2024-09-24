'use client'
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { getAllAssistants } from '@/lib/api';
import { UserCircle2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Assistant = {
  userId: string;
  astId: string;
  astName: string;
  astInstruction: string;
  gptModel: string;
  astFiles: string[];
  astTools: string[];
  createdAt: string;
  updatedAt: string;
};

export default function AssistantsPage() {
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchAssistants = async () => {
    try {
      const response = await getAllAssistants();
      setAssistants(response.data);
      setLoading(false);
    } catch (error: any) {
      console.error('Error fetching assistants:', error.message);
      setError('Failed to load assistants. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssistants();
  }, []);

  const handleCardClick = (astId: string) => {
    router.push(`/overview/dashbored/thread/${astId}`);
  };

  if (loading) {
    return <p>Loading assistants...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {assistants.map((assistant) => (
          <Card
            key={assistant.astId}
            className="hover:shadow-md transition-shadow duration-150"
            onClick={() => handleCardClick(assistant.astId)}
          >
            <CardHeader>
              <div className='flex justify-between'>
                <div className="flex items-center gap-2">
                  <UserCircle2Icon size={32} strokeWidth={1.4} className="text-primary" />
                  <div>
                    <h2 className="text-base font-semibold text-gray-800 leading-none">{assistant.astName}</h2>
                    <p className="text-xs text-gray-600 leading-none">{assistant.astId}</p>
                  </div>
                </div>
                <div>
                  <Badge>{assistant.gptModel}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <hr className='my-1' />
              <p className='text-xs text-gray-700 mb-1'>Tools Used</p>
              <div className="flex gap-2 py-1">
                {assistant.astTools && assistant.astTools.length > 0 ? assistant.astTools.map(tool => (
                  <p key={tool} className="text-xs text-muted-foreground bg-muted p-1 rounded-sm">
                    {tool}
                  </p>
                )) : <p className="text-xs text-muted-foreground bg-muted p-1 rounded-sm">No tools</p>}
              </div>
              <hr className='my-1' />
              <p className='text-xs text-gray-700 mb-1'>Docs Used</p>
              <div className="flex gap-2 py-1">
                {assistant.astFiles && assistant.astFiles.length > 0 ? assistant.astFiles.map(file => (
                  <p key={file} className="text-xs text-muted-foreground bg-muted p-1 rounded-sm">
                    {file}
                  </p>
                )) : <p className="text-xs text-muted-foreground bg-muted p-1 rounded-sm">No files</p>}
              </div>
              <p className="text-xs text-gray-500 text-right">
                <strong>Updated:</strong> {new Date(assistant.updatedAt).toLocaleString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}