import { breakpointsTailwind } from '@vueuse/core';

export default function useBreakpoint() {
  const breakpoints = useBreakpoints(breakpointsTailwind);
  const isMobile = breakpoints.smaller('md');
  const isDesktop = breakpoints.greaterOrEqual('md');
  return { isMobile, isDesktop };
}
