import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Transition, motion, useAnimation } from "framer-motion";

interface CarouselProps {
  children: React.ReactNode[];
  gap?: number;
  transition?: Transition;
  childWidth: number;
}

const Carousel: React.FC<CarouselProps> = ({
  childWidth,
  children,
  gap = 15,
  transition = { duration: 0.2, ease: "easeOut" },
}) => {
  const totalWidth = (childWidth + gap) * children.length;

  const animationControls = useAnimation();

  return (
    <Box width="100%">
      <motion.div
        initial={{ x: 0 }}
        animate={animationControls}
        transition={transition}
        drag="x"
        dragConstraints={{
          left: -(totalWidth - childWidth),
          right: gap,
        }}
      >
        <Flex align="start" gap={`${gap}px`}>
          {children}
        </Flex>
      </motion.div>
    </Box>
  );
};

export default Carousel;
