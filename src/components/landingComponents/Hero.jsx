import React from "react";
import CustomButton from "../shared/CustomButton";

const Hero = () => {
  return (
    <section className="relative top-20">
      <div className="h-[90vh] overflow-hidden flex items-center">
        <img src="images/hero.jpg" alt="Wanderwise hero" className="w-full"/>
      </div>

      <div className="bg-black opacity-60 h-[90vh] w-full absolute top-0"></div>

      <div className="absolute top-0">
        <div className="w-1/2 mx-auto mt-40 text-center">
          <h1 className="text-5xl text-white font-bold">
            Plan your trip with Wanderwise
          </h1>
          <p className="text-xl text-white font-medium my-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque repellat quibusdam voluptates sint ipsa. Laboriosam eligendi dolorem repellat rerum fugit cum sit molestias ipsam obcaecati quasi? Ab ex neque hic.
          </p>

          <div className="flex justify-center">
            <CustomButton text="Get Started" link="/login" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
