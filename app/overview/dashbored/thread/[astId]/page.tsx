'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getAssistantById, createThread, createChat } from '@/lib/api';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { ActivitySquareIcon, CircleDotDashedIcon, EditIcon, Loader, SendHorizontalIcon, UserCircle2Icon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface Assistant {
  astId: string;
  astName: string;
  astInstruction: string;
  gptModel: string;
  astFiles: {
    fileId: string;
    fileName: string;
    fileSize: number;
    fileType: string;
  }[]; 
  astTools: string[];
  createdAt: string;
  updatedAt: string;
}

interface CreateThreadResponse {
  status: boolean;
  message: string;
  data: {
    thread: {
      id: string;
      created_at: number;
      metadata: any;
      object: string;
      tool_resources: any;
    };
  };
}

export default function AssistantDetailPage() {
  const { astId } = useParams();
  const [assistant, setAssistant] = useState<Assistant | null>(null);
  const [threadTitle, setThreadTitle] = useState('');
  const [threadId, setThreadId] = useState('');
  const [message, setMessage] = useState('');
  const [disable, setDisable] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ text: string; sender: 'user' | 'assistant' }[]>([]); // State for chat messages

  useEffect(() => {
    const fetchAssistant = async () => {
      if (astId) {
        try {
          const response = await getAssistantById(astId as string);
          console.log(response);
          if (response.status) {
            setAssistant(response.data[0]);
          }
        } catch (error) {
          console.error("Error fetching assistant:", error);
        }
      }
    };

    fetchAssistant();
  }, [astId]);

  const handleCreateThread = async () => {
    if (!assistant || !threadTitle) return;

    try {
      if (!threadId) {
        setDisable(true)
        const result: CreateThreadResponse = await createThread(assistant.astId, threadTitle);
        console.log(result);
        if (result.status) {
          setMessage(`Thread created successfully: ${result.data.thread.id}`);
          setThreadId(result.data.thread.id);
        } else {
          setMessage(`Failed to create thread: ${result.message}`);
        }
        setDisable(false)
      } else {
        setDisable(true)
        const images: File[] = [];
        const chatResponse = await createChat(assistant.astId, threadId, threadTitle, images);
        console.log(chatResponse);
        setMessage(`Message sent successfully: ${chatResponse.message}`);

        // Update chat messages state
        setChatMessages(prevMessages => [
          ...prevMessages,
          { text: threadTitle, sender: 'user' },
          { text: chatResponse as string, sender: 'assistant' }
        ]);

        setThreadTitle('');
        setDisable(false)
      }
    } catch (error) {
      setMessage(`Error: ${error}`);
      console.error("Error creating thread or chat:", error);
    }

    setDisable(false)
  };

  if (!assistant) {
    return <p>Assistant not found.</p>;
  }

  return (
    <div className="flex justify-between h-full w-full">
      {/* Assistant Info Section */}
      <Card
        key={assistant.astId}
        className="hover:shadow-md transition-shadow duration-150 basis-3/5"
      >
        <CardHeader>
          <div className='flex justify-between'>
            <div className="flex items-center gap-2">
              <UserCircle2Icon size={32} strokeWidth={1.4} className="text-primary" />
              <div>
                <h2 className="text-base font-semibold text-gray-800 leading-none">{assistant.astName}</h2>
                <p className="text-xs text-gray-600 leading-none hover:text-muted">{assistant.astId}</p>
              </div>
            </div>
            <div className=' flex items-center justify-center gap-2'>
              <Badge>{assistant.gptModel}</Badge>
              <div className=" bg-muted hover:bg-primary hover:text-primary-foreground cursor-pointer border-border border p-1 rounded-sm">
                <EditIcon size={20}/>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <hr className='my-1' />
          <p className='text-xs text-gray-700 mb-1'>Tools Used</p>
          <div className="flex gap-2 py-1">
            {assistant.astTools.length > 0 ? assistant.astTools.map(tool => (
              <p key={tool} className="text-xs text-muted-foreground bg-muted p-1 rounded-sm">
                {tool}
              </p>
            )) : <p className="text-xs text-muted-foreground bg-muted p-1 rounded-sm">No tools</p>}
          </div>
          <hr className='my-1' />
          <p className='text-xs text-gray-700 mb-1'>Docs Used</p>
          <div className="flex gap-2 py-1">
            <div className="flex gap-2 py-1">
              {assistant.astFiles.length > 0 ? assistant.astFiles.map(file => (
                <div key={file.fileId} className="text-xs text-muted-foreground bg-muted p-1 rounded-sm">
                  <p><strong>File Name:</strong> {file.fileName}</p>
                </div>
              )) : <p className="text-xs text-muted-foreground bg-muted p-1 rounded-sm">No files</p>}
            </div>
          </div>
          <p className="text-xs text-gray-500 text-right">
            <strong>Updated:</strong> {new Date(assistant.updatedAt).toLocaleString()}
          </p>
        </CardContent>
      </Card>
      {/* Chat Section */}
      <div className="basis-2/5 px-6 rounded-lg">
        <Card className='w-full h-full rounded-lg flex flex-col'>
          <CardHeader className="p-4 bg-gray-100">
            <div className="flex flex-row items-center gap-2">
              <UserCircle2Icon size={26} strokeWidth={1.4} className="text-green-600" />
              <p className="text-base mt-0 font-medium">{assistant.astName}</p>
            </div>
          </CardHeader>
          <CardContent className='flex-grow overflow-y-scroll p-4 bg-white h-full'>
            <div className="flex flex-col h-full space-y-2">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`p-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-100 self-end' : 'bg-gray-200 self-start'}`}>
                  {msg.text}
                </div>
              ))}
            </div>
          </CardContent>
          <CardContent className='flex items-center justify-center'>
            <div className="relative w-full">
              <Input
                placeholder="Type your message here..."
                className="border rounded-lg w-full"
                value={threadTitle}
                onChange={(e) => setThreadTitle(e.target.value)}
              />
              <button
                onClick={handleCreateThread}
                disabled={disable}
                className="absolute right-[2px] top-1/2 transform -translate-y-1/2 flex items-center justify-center p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                title="Send"
              >
                {!disable ? <SendHorizontalIcon className='h-5 w-5' /> : <Loader className='h-5 w-5 animate-spin'></Loader>}
              </button>
            </div>
          </CardContent>
          <CardFooter className='w-full flex items-center justify-center text-sm p-2 bg-gray-50 gap-2'>
            <CircleDotDashedIcon size={18} />
            <p>Powered by Sentinal</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}