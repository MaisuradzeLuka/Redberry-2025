import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import { Dialog, DialogTrigger } from "../ui/dialog";
import AgentModal from "../forms/AgentModal";

const Navbar = () => {
  return (
    <nav className=" flex justify-between items-center max-w-[1920px] mx-auto px-[120px] py-8">
      <Link href="/">
        <Image src="/logo.png" alt="page logo" width={160} height={40} />
      </Link>

      <div>
        <Dialog>
          <DialogTrigger className="text-[16px] px-5 py-3 border rounded-md border-primaryPurple mr-10">
            თანამშრომლის შექმნა
          </DialogTrigger>

          <AgentModal />
        </Dialog>

        <Button classname="border-primaryPurple bg-primaryPurple  text-white">
          <Link href="/addTask">+ შექმენით ახალი დავალება</Link>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
