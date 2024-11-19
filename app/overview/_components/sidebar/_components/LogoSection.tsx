import { CircleDotDashedIcon } from 'lucide-react';

const LogoSection = () => (
  <div className="mb-4 h-24">
    <div className="h-full flex flex-col justify-between">
      <div className="flex flex-col gap-1">
        <CircleDotDashedIcon size={34} className="text-primary-foreground" />
        <h1 className="text-xl font-semibold text-primary-foreground">Sentinal</h1>
      </div>
      <div className="w-full my-2">
        <hr className="border-primary-foreground border" />
      </div>
    </div>
  </div>
);

export default LogoSection;