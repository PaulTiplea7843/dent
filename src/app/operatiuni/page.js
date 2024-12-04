import Image from "next/image";
import { CreateModalOperatiuni } from "../components/operatiuni/createModal";
import { OperatiuniTable } from "../components/operatiuni/table";

export default function Operatiuni() {
  return (
    <div>
      <div className="actions py-4 p-2 flex justify-center">
        <CreateModalOperatiuni method={"create"} />
      </div>
      <div className="flex justify-center items-center mr-[30px]">
        <OperatiuniTable />
      </div>
    </div>
  );
}
