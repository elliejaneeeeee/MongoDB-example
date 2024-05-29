import React, { useState, useCallback } from "react";
import { Box, HStack, Flex } from "@chakra-ui/react";
import { Transition, motion, useAnimation } from "framer-motion";

interface CarouselProps {
  children: React.ReactNode[];
  gap?: number;
  childWidth: number;
  transition?: Transition;
}

const Carousel: React.FC<CarouselProps> = ({
  children,
  gap = 15,
  transition = { duration: 0.2, ease: "easeOut" },
  childWidth,
}) => {
  const [containerWidth, setContainerWidth] = useState<number | null>(null);

  const containerRef = useCallback((element: HTMLDivElement | null) => {
    if (element) {
      setContainerWidth(element.offsetWidth);
    }
  }, []);

  const totalWidth = (childWidth + gap) * children.length;

  const animationControls = useAnimation();

  return (
    <HStack mt={4} justify="space-between">
      <Box width="100%" overflow="hidden" ref={containerRef}>
        <motion.div
          style={{
            position: "relative",
            width: `${totalWidth}px`,
            left: containerWidth ? `calc(100% - ${containerWidth}px)` : "auto",
          }}
          initial={{ x: 0 }}
          animate={animationControls}
          transition={transition}
          drag="x"
          dragConstraints={{
            left: -(totalWidth - childWidth),
            right: gap,
          }}
        >
          <Flex align="end" gap={`${gap}px`}>
            {children}
          </Flex>
        </motion.div>
      </Box>
    </HStack>
  );
};

export default Carousel;
