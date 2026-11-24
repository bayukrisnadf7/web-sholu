import { useEffect } from "react";
import "./vendor/scrollcraft/scrollcraft.js";

export function useScrollMotion(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let engine;
    const reset = () => {
      engine?.destroy();
      engine = undefined;
      root.querySelectorAll("[data-sc-parallax]").forEach((element) => {
        element.style.removeProperty("transform");
      });
    };
    const sync = () => {
      reset();
      if (!motion.matches) engine = window.ScrollCraft.mount(root);
    };
    const resize = new ResizeObserver(() => engine?.layout());
    resize.observe(root);
    motion.addEventListener("change", sync);
    sync();
    return () => {
      motion.removeEventListener("change", sync);
      resize.disconnect();
      reset();
    };
  }, [rootRef]);
}
