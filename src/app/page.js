import Image from "next/image";
import { CreateModalPacient } from "./components/pacient/createModal";
import { PacientTable } from "./components/pacient/pacientTable";

export default function Home() {
  return (
    <div>
      <div className="actions py-4 p-2 flex justify-center">
        <CreateModalPacient method={"create"} />
      </div>
      <div className="flex justify-center items-center mr-[30px]">
        <PacientTable />
      </div>
    </div>
  );
}
