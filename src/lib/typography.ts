import type { ReactNode } from "react";

const SHORT_THREE_WORD_TAIL = 18;

function protectStringTail(value: string): string {
  const match = value.match(/(\S+)\s+(\S+)\s+(\S+)(\s*)$/);
  if (!match) return value;

  const [, thirdLast, secondLast, last, trailingSpace] = match;
  const threeWordTail = `${thirdLast} ${secondLast} ${last}`;
  const protectedTail = threeWordTail.length <= SHORT_THREE_WORD_TAIL
    ? `${thirdLast}\u00a0${secondLast}\u00a0${last}`
    : `${thirdLast} ${secondLast}\u00a0${last}`;

  return `${value.slice(0, match.index)}${protectedTail}${trailingSpace}`;
}

/** Keep a short final phrase together without making long headings overflow. */
export function widowSafe(children: ReactNode): ReactNode {
  if (typeof children === "string") return protectStringTail(children);
  if (!Array.isArray(children)) return children;

  const result = [...children];
  for (let i = result.length - 1; i >= 0; i -= 1) {
    if (result[i] === null || result[i] === undefined || result[i] === false) continue;
    result[i] = widowSafe(result[i]);
    break;
  }
  return result;
}
