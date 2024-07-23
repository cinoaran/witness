import { Button } from "@nextui-org/react";
import Image from "next/image";
import { Fa0, FaUser } from "react-icons/fa6";

export default function Home() {
  return (
    <div>
      <h2>Homepage</h2>
      <Button color="primary">
        <FaUser />
        Button
      </Button>
    </div>
  );
}
