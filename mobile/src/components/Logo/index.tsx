import { ReactNode } from "react";
import { SvgProps } from "react-native-svg";

import { Slot } from "@radix-ui/react-slot";

import LogoBlack from "../../assets/logo/classdule-logo-black.svg";
import LogoMonoBlack from "../../assets/logo/classdule-logo-mono-black.svg";
import LogoWhite from "../../assets/logo/classdule-logo-white.svg";
import LogoMonoWhite from "../../assets/logo/classdule-logo-mono-white.svg";

const logoByVariant = new Map<LogoProps["variant"], React.FC<SvgProps>>([
  ["black", LogoBlack],
  ["mono-black", LogoMonoBlack],
  ["white", LogoWhite],
  ["mono-white", LogoMonoWhite],
]);

interface LogoProps {
  variant?: "black" | "mono-black" | "white" | "mono-white";
  size: number;
}

export function Logo({ variant = "mono-white", size }: LogoProps) {
  const Logo = logoByVariant.get(variant);
  return <Logo height={size} width={size} />;
}
