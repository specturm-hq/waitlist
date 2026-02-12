export const TRANSITIONS = {
    light: {
        ease: [0.23, 1, 0.32, 1] as const, // easeOutQuint
        duration: 0.8,
    },
    dark: {
        ease: [0.87, 0, 0.13, 1] as const, // easeInOutExpo
        duration: 1.2,
    },
    spring: {
        stiffness: 100,
        damping: 20,
        mass: 1,
    },
};

export const VARIANTS = {
    fadeIn: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    },
    slideUp: {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    },
    scaleIn: {
        hidden: { scale: 0.9, opacity: 0 },
        visible: { scale: 1, opacity: 1 },
    },
};
