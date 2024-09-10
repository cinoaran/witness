import { getMemberByUserId } from "@/app/actions/membersActions";
import { notFound } from "next/navigation";
import React from "react";

const MemberPage = async ({ params }: { params: { userId: string } }) => {
  const memberByUserId = await getMemberByUserId(params.userId);
  if (!memberByUserId) return notFound();

  const { description } = memberByUserId || {};

  return (
    <div className="text-md z-10 rounded-md bg-white/30 p-4">
      {description && (
        <div className="flex flex-col gap-5">
          <h2 className="text-xl">About Me</h2>
          <p>
            {description}
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat
            voluptate animi sit assumenda sapiente libero, accusamus deleniti!
            Aspernatur, suscipit iure distinctio pariatur deleniti veritatis
            quisquam ullam similique fugit alias officia sapiente quam eligendi
            consequuntur, ipsa porro aperiam obcaecati totam quis odio impedit!
            Optio nisi sapiente, assumenda totam asperiores dolores tempora
            inventore vero praesentium ratione nemo velit ducimus laboriosam
            repudiandae repellat veritatis facilis eius alias deserunt culpa
            sint. Eum excepturi reprehenderit mollitia atque animi cupiditate
            optio quas doloribus facere adipisci necessitatibus iure
            perspiciatis provident, non dolorum molestias! Nulla voluptatibus
            illo accusamus odit neque blanditiis, enim sequi ex, corrupti soluta
            placeat nam!Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Quaerat voluptate animi sit assumenda sapiente libero,
            accusamus deleniti! Aspernatur, suscipit iure distinctio pariatur
            deleniti veritatis quisquam ullam similique fugit alias officia
            sapiente quam eligendi consequuntur, ipsa porro aperiam obcaecati
            totam quis odio impedit! Optio nisi sapiente, assumenda totam
            asperiores dolores tempora inventore vero praesentium ratione nemo
            velit ducimus laboriosam repudiandae repellat veritatis facilis eius
            alias deserunt culpa sint. Eum excepturi reprehenderit mollitia
            atque animi cupiditate optio quas doloribus facere adipisci
            necessitatibus iure perspiciatis provident, non dolorum molestias!
            Nulla voluptatibus illo accusamus odit neque blanditiis, enim sequi
            ex, corrupti soluta placeat nam! Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Quaerat voluptate animi sit assumenda
            sapiente libero, accusamus deleniti! Aspernatur, suscipit iure
            distinctio pariatur deleniti veritatis quisquam ullam similique
            fugit alias officia sapiente quam eligendi consequuntur, ipsa porro
            aperiam obcaecati totam quis odio impedit! Optio nisi sapiente,
            assumenda totam asperiores dolores tempora inventore vero
            praesentium ratione nemo velit ducimus laboriosam repudiandae
            repellat veritatis facilis eius alias deserunt culpa sint. Eum
            excepturi reprehenderit mollitia atque animi cupiditate optio quas
            doloribus facere adipisci necessitatibus iure perspiciatis
            provident, non dolorum molestias! Nulla voluptatibus illo accusamus
            odit neque blanditiis, enim sequi ex, corrupti soluta placeat nam!
          </p>
        </div>
      )}
    </div>
  );
};

export default MemberPage;
