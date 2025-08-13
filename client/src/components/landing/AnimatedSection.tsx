import { ReactNode } from "react";
import { Fade, Slide, Grow } from "@mui/material";
import { useInView } from "react-intersection-observer";

type AnimatedSectionProps = {
  children: ReactNode;
  animation?: "fade" | "slideUp" | "grow";
  timeout?: number;
  direction?: "left" | "right" | "up" | "down";
};

const AnimatedSection = ({
  children,
  animation = "slideUp",
  timeout = 1000,
  direction = "up",
}: AnimatedSectionProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const AnimationComponent = {
    fade: Fade,
    slideUp: Slide,
    grow: Grow,
  }[animation];

  const animationProps = animation === "slideUp" ? { direction } : {};

  return (
    <div ref={ref}>
      <AnimationComponent in={inView} timeout={timeout} {...animationProps}>
        <div>{children}</div>
      </AnimationComponent>
    </div>
  );
};

export default AnimatedSection;
