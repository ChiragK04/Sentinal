import AssistantCard from './AssistantCard';

type Assistant = {
  astId: string;
  astName: string;
  gptModel: string;
  astFiles: string[];
  astTools: string[];
  updatedAt: string;
};

type Props = {
  assistants: Assistant[];
  onAssistantClick: (astId: string) => void;
};

export default function AssistantList({ assistants, onAssistantClick }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {assistants.map((assistant) => (
        <AssistantCard
          key={assistant.astId}
          assistant={assistant}
          onClick={onAssistantClick}
        />
      ))}
    </div>
  );
}