import { FlipWords } from "@/components/aceternity/flip-words";
import { LampComponent } from "@/components/aceternity/lamp";
import { ShieldCheck, Star, User, UserCheck2 } from "lucide-react";
import Image from "next/image";

export const HeroDesc = () => {
  const words = ["Disciplines", "Teachers", "Courses"];
  return (
    <div className="">
      <LampComponent />
      <div className="-mt-72 z-50 relative bg-neutral-950">
        <div className="max-w-screen-xl mx-auto p-6 grid md:grid-cols-2 gap-8 md:gap-16 py-10 md:py-16 lg:py-20 text-white">
          <div className="grid md:grid-cols-2 items-center gap-3">
            <Image
              src="/student1.webp"
              alt=""
              height={300}
              width={300}
              className="rounded-lg"
            />
            <div className="space-y-3">
              <video
                className="max-w-full h-auto rounded-lg shadow-lg"
                muted
                autoPlay
                loop
              >
                <source src="/home.mp4" type="video/mp4" />
              </video>
              <Image
                src="/student2.webp"
                alt=""
                height={300}
                width={300}
                className="rounded-lg"
              />
            </div>
          </div>
          <div className="space-y-8">
            <div className="space-y-3">
              <h4 className="font-medium">FLEXIBLE SUPPORTED LEARNING</h4>
              <div className="text-4xl font-normal">
                Expertise Across All
                <FlipWords className="text-gray-300" words={words} /> <br />
              </div>
              <p className="text-muted-foreground">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
                aliquam sunt ea laudantium aut vitae fugiat optio, asperiores
                illo veritatis, minus neque nobis. Tempore ad sapiente ex
                aspernatur possimus eius.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-x-10 gap-y-5">
              <div>
                <div className="flex gap-2 items-center">
                  <User className="h-8 w-8" />{" "}
                  <p className="text-lg md:text-xl font-bold">120 Students</p>
                </div>
                <p className="py-3 text-muted-foreground">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
              <div>
                <div className="flex gap-2 items-center">
                  <Star className="h-8 w-8" />{" "}
                  <p className="text-lg md:text-xl font-bold">5.0 Rating</p>
                </div>
                <p className="py-3 text-muted-foreground">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
              <div>
                <div className="flex gap-2 items-center">
                  <UserCheck2 className="h-8 w-8" />{" "}
                  <p className="text-lg md:text-xl font-bold">8 Teacher</p>
                </div>
                <p className="py-3 text-muted-foreground">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
              <div>
                <div className="flex gap-2 items-center">
                  <ShieldCheck className="h-8 w-8" />{" "}
                  <p className="text-lg md:text-xl font-bold">
                    100% Satisfaction
                  </p>
                </div>
                <p className="py-3 text-muted-foreground">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
