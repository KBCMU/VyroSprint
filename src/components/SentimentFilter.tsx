"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import type { Sentiment } from "@/lib/data";

type FilterValue = Sentiment | "All";

const filters: { value: FilterValue; label: string }[] = [
  { value: "All", label: "All" },
  { value: "Positive", label: "Positive" },
  { value: "Neutral", label: "Neutral" },
  { value: "Negative", label: "Negative" },
];

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function SentimentFilter({
  active,
  counts,
  onFilter,
}: {
  active: FilterValue;
  counts: Record<FilterValue, number>;
  onFilter: (value: FilterValue) => void;
}) {
  const segRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const hasMountedRef = useRef(false);

  const moveIndicator = (animated: boolean) => {
    const seg = segRef.current;
    const ind = indicatorRef.current;
    if (!seg || !ind) return;
    const activeBtn = seg.querySelector(
      "button.is-active",
    ) as HTMLButtonElement | null;
    if (!activeBtn) return;
    if (!animated) ind.classList.add("no-anim");
    ind.style.width = `${activeBtn.offsetWidth}px`;
    ind.style.height = `${activeBtn.offsetHeight}px`;
    ind.style.transform = `translate(${activeBtn.offsetLeft}px, ${activeBtn.offsetTop}px)`;
    if (!animated) {
      requestAnimationFrame(() =>
        requestAnimationFrame(() => ind.classList.remove("no-anim")),
      );
    }
  };

  useIsoLayoutEffect(() => {
    moveIndicator(hasMountedRef.current);
    hasMountedRef.current = true;
  }, [active]);

  useEffect(() => {
    const onResize = () => moveIndicator(false);
    window.addEventListener("resize", onResize);
    if (
      typeof document !== "undefined" &&
      document.fonts &&
      document.fonts.ready
    ) {
      document.fonts.ready.then(() => moveIndicator(false));
    }
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div
      className="seg"
      role="group"
      aria-label="Filter by sentiment"
      ref={segRef}
    >
      <div className="seg__indicator no-anim" ref={indicatorRef} />
      {filters.map((f) => (
        <button
          key={f.value}
          type="button"
          onClick={() => onFilter(f.value)}
          className={active === f.value ? "is-active" : ""}
          aria-pressed={active === f.value}
        >
          {f.label} <span className="count">{counts[f.value]}</span>
        </button>
      ))}
    </div>
  );
}
