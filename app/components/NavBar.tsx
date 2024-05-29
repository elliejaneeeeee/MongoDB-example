"use client";
import { Box, IconButton, Flex, Grid } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FiBookmark, FiRss, FiUser, FiBookOpen } from "react-icons/fi";

const navLinks = [
    {
        name: "Profile",
        path: "/profile",
        icon: <FiUser size={40} />,
        activeColor: "yellow.100",
    },
    {
        name: "Saves",
        path: "/saves",
        icon: <FiBookmark size={40} />,
        activeColor: "purple.100",
    },
    {
        name: "Feed",
        path: "/feed",
        icon: <FiRss size={40} />,
        activeColor: "pink.100",
    },
    {
        name: "Lessons",
        path: "/lessons",
        icon: <FiBookOpen size={40} />,
        activeColor: "blue.100",
    },
] as const;

export default function Navbar() {
    const path = usePathname();
    const router = useRouter();
    const [activePath, setActivePath] = useState(path);

    useEffect(() => {
        setActivePath(path);
    }, [path]);

    const handleNavClick = (newPath: string) => {
        setActivePath(newPath);
        router.push(newPath);
    };

    return (
        <Box
            boxShadow="lg"
            width="100%"
            position="fixed"
            bottom={0}
            zIndex={1000}
            bg="white"
        >
            <Grid
                templateColumns="repeat(4, 1fr)"
                height="16"
                textAlign="center"
            >
                {navLinks.map((navLink) => (
                    <Box
                        key={navLink.name}
                        as="a"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        bg={
                            navLink.path === path ||
                            (navLink.name === "Lessons" &&
                                path.startsWith("/flashcards"))
                                ? navLink.activeColor
                                : "transparent"
                        }
                        transition="background-color 0.3s"
                        height="100%"
                        onClick={() => handleNavClick(navLink.path)}
                    >
                        <IconButton
                            variant="ghost"
                            aria-label={navLink.name}
                            icon={navLink.icon}
                            size="lg"
                            _hover={{ transform: "scale(1.25)" }}
                            bg="transparent"
                            color="black"
                        />
                    </Box>
                ))}
            </Grid>
        </Box>
    );
}
