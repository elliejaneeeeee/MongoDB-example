import React, { useMemo } from "react";
import { IconButton } from "@chakra-ui/react";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";

interface CarouselChevronButtonProps {
  orientation: "left" | "right";
  ariaLabel?: string;
  onClick: () => void;
  isDisabled?: boolean;
}

const CarouselChevronButton: React.FC<CarouselChevronButtonProps> = ({ ariaLabel, isDisabled = false, onClick }) => {
  const props = useMemo(
    () => ({
      variant: "no-fill",
      sx: { shadow: "none" },
      _hover: isDisabled ? {} : { transform: "scale(1.5)" },
      _active: { transform: "scale(1)" },
    }),
    [isDisabled]
  );

  return (
    <IconButton
      {...props}
      aria-label={ariaLabel ?? ""}
      icon={<FiArrowRight />}
      onClick={onClick}
      isDisabled={isDisabled}
    />
  );
};

export default CarouselChevronButton;
