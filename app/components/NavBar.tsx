"use client";
import { Box, IconButton, Link as NextLink, Flex } from "@chakra-ui/react";
// import { usePathname } from "next/navigation";
import React from "react";
import { FiBookmark, FiRss, FiUser, FiBookOpen } from "react-icons/fi";

const navLinks = [
  {
    name: "Profile",
    path: "/profile",
    icon: <FiUser size={40} />,
    bgColor: "blue",
  },
  {
    name: "Saves",
    path: "/saves",
    icon: <FiBookmark size={40} />,
    bgColor: "red",
  },
  { name: "Feed", path: "/feed", icon: <FiRss size={40} />, bgColor: "green" },
  {
    name: "Lessons",
    path: "/lessons",
    icon: <FiBookOpen size={40} />,
    bgColor: "blue",
  },
] as const;

export default function NavBar() {
  // const path = usePathname();
  return (
    <Box px={5} boxShadow="lg" width="100%" py={15} position="fixed" bottom={0} zIndex={2} bg={"#f5f5f5"}>
      <Flex h={16} alignItems="center" justifyContent="space-around">
        {navLinks.map((navLink) => (
          <NextLink key={navLink.name} href={navLink.path}>
            <IconButton
              variant="link"
              aria-label={navLink.name}
              icon={navLink.icon}
              size="lg"
              _hover={{ transform: "scale(1.25)" }}
              color={"black"}
            />
          </NextLink>
        ))}
      </Flex>
    </Box>
  );
};
