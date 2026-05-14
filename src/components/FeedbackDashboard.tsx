"use client";

import { useMemo, useState } from "react";
import type { FeedbackItem, Sentiment } from "@/lib/data";
import SearchBar from "./SearchBar";
import SentimentFilter from "./SentimentFilter";
import FeedbackCard from "./FeedbackCard";

type FilterValue = Sentiment | "All";

export default function FeedbackDashboard({
  data,
}: {
  data: FeedbackItem[];
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterValue>("All");

  const counts = useMemo<Record<FilterValue, number>>(
    () => ({
      All: data.length,
      Positive: data.filter((d) => d.sentiment === "Positive").length,
      Neutral: data.filter((d) => d.sentiment === "Neutral").length,
      Negative: data.filter((d) => d.sentiment === "Negative").length,
    }),
    [data],
  );

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data.filter((item) => {
      if (filter !== "All" && item.sentiment !== filter) return false;
      if (!q) return true;
      return (
        item.customer_name.toLowerCase().includes(q) ||
        item.feedback_text.toLowerCase().includes(q)
      );
    });
  }, [data, query, filter]);

  return (
    <>
      <div className="summary" aria-label="Response summary">
        <div className="summary__card">
          <span className="num">{counts.All}</span>
          <span className="lbl">
            <span className="dot" />
            Total responses
          </span>
        </div>
        <div className="summary__card pos">
          <span className="num">{counts.Positive}</span>
          <span className="lbl">
            <span className="dot" />
            Positive
          </span>
        </div>
        <div className="summary__card neu">
          <span className="num">{counts.Neutral}</span>
          <span className="lbl">
            <span className="dot" />
            Neutral
          </span>
        </div>
        <div className="summary__card neg">
          <span className="num">{counts.Negative}</span>
          <span className="lbl">
            <span className="dot" />
            Negative
          </span>
        </div>
      </div>

      <div className="controls">
        <SearchBar value={query} onChange={setQuery} />
        <SentimentFilter
          active={filter}
          counts={counts}
          onFilter={setFilter}
        />
      </div>

      <p className="result-count">
        {matches.length === 0
          ? "No matching responses"
          : `Showing ${matches.length} of ${data.length} responses`}
      </p>

      <section className="feed">
        {matches.length === 0 ? (
          <div className="empty">
            <h3>No matches found</h3>
            <p>Try a different search term or clear the filter.</p>
          </div>
        ) : (
          matches.map((item) => (
            <FeedbackCard key={item.id} item={item} query={query} />
          ))
        )}
      </section>
    </>
  );
}
