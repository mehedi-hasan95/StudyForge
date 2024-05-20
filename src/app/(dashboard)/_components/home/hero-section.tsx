import Image from "next/image";

export const HeroSection = () => {
  return (
    <div className="bg-[#2F2D51] relative">
      <div className="max-w-screen-xl mx-auto p-6 grid md:grid-cols-2 gap-8 md:gap-16 justify-between items-center py-16 md:py-20 lg:py-28">
        <div className="space-y-4">
          <h2 className="text-2xl md:text-4xl lg:text-5xl text-white font-bold md:!leading-[4rem]">
            Upgrade your learning Skills & Upgrade your life
          </h2>
          <p className="text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore
            iusto perferendis animi sunt ipsam, quam ea, praesentium, pariatur
            necessitatibus quis delectus quidem odit doloribus unde ad. Deleniti
            ratione itaque magnam repellat dolorem, necessitatibus, porro qui
            totam harum facere voluptate aperiam quidem. Doloribus, repudiandae
            eaque commodi iste accusamus assumenda quasi aperiam, aut at ipsa
            veritatis, optio dignissimos blanditiis consequatur nesciunt.
            Voluptatem harum natus delectus eius nesciunt possimus temporibus
            placeat dolor tenetur.
          </p>
        </div>
        <Image src="/banner.png" alt="StudyForge" height={500} width={500} />
      </div>
    </div>
  );
};
