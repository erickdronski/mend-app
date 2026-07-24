import type { ComponentProps } from "react";
import { Text as NativeText } from "react-native";
import { widowSafe } from "@/lib/typography";

/**
 * Mend's dependency-free text primitive. Native balanced wrapping prevents a
 * single short word or phrase from being stranded on the final line.
 */
export function Text({ children, ...props }: ComponentProps<typeof NativeText>) {
  return (
    <NativeText
      lineBreakStrategyIOS="push-out"
      textBreakStrategy="balanced"
      {...props}
    >
      {widowSafe(children)}
    </NativeText>
  );
}
