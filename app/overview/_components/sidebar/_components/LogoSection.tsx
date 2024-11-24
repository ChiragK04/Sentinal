import { CircleDotDashedIcon } from 'lucide-react';
import Image from 'next/image';

const LogoSection = () => (
  <div className="mb-4 h-24">
    <div className="h-full flex flex-col justify-between">
      <div className="flex flex-col gap-1">
        <CircleDotDashedIcon className=' h-8 w-8'/>
        {/* <div className="h-24 w-24 flex">
          <Image
            src="/logo.png"
            alt="Logo"
            width={34}
            height={34}
            className="text-primary-foreground w-full h-full"
          />
        </div> */}
        <h1 className="text-rxl font-semibold text-primary-foreground">Sentinal</h1>
      </div>
      <div className="w-full my-2">
        <hr className="border-primary-foreground border" />
      </div>
    </div>
  </div>
);

export default LogoSection;
