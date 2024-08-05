"use client";

import { Button, Card, CardBody, Divider } from "@nextui-org/react";
import { BiSolidCommentError } from "react-icons/bi";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section>
      <Card className="mx-auto h-[auto] max-w-7xl">
        <CardBody className="w-full">
          <div className="pt-10 text-center font-semibold text-gray-950/50">
            <h3 className="block text-2xl">
              " Uuuups something went wrong !!! "
            </h3>
            <h2 className="mx-auto my-20 flex w-[max-content] items-center gap-10 rounded-lg bg-red-500 px-5 text-xl text-white">
              <BiSolidCommentError
                size={30}
                className="mx-auto my-10 text-white"
              />
              {error.message}
            </h2>
          </div>
          <Divider />
          <div className="my-10 text-center font-semibold text-white">
            <Button size="lg" color="danger" onClick={() => reset()}>
              try again
            </Button>
          </div>
        </CardBody>
      </Card>
    </section>
  );
}
