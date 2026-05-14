import type { FeedbackItem } from "@/lib/data";

const avatarColor = (name: string): string => {
  const n = (name.charCodeAt(0) || 0) % 6 + 1;
  return `c${n}`;
};

const initials = (name: string): string =>
  name
    .split(" ")
    .map((p) => p[0] ?? "")
    .join("")
    .toUpperCase()
    .slice(0, 2);

const fmtDate = (iso: string): string => {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const escapeHtml = (s: string): string =>
  s.replace(
    /[&<>"]/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
      })[c] ?? c,
  );

const highlight = (text: string, q: string): { __html: string } => {
  const safe = escapeHtml(text);
  const term = q.trim();
  if (!term) return { __html: safe };
  const re = new RegExp(
    `(${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "gi",
  );
  return { __html: safe.replace(re, "<mark>$1</mark>") };
};

const pillClassFor = (s: FeedbackItem["sentiment"]) =>
  s === "Positive" ? "pos" : s === "Negative" ? "neg" : "neu";

export default function FeedbackCard({
  item,
  query,
}: {
  item: FeedbackItem;
  query: string;
}) {
  return (
    <article className="row">
      <div className={`av ${avatarColor(item.customer_name)}`}>
        {initials(item.customer_name)}
      </div>
      <div>
        <div className="row__head">
          <span className="row__name">{item.customer_name}</span>
          <span className="row__sep" />
          <span className="row__meta">{fmtDate(item.date)}</span>
        </div>
        <p
          className="row__text"
          dangerouslySetInnerHTML={highlight(item.feedback_text, query)}
        />
      </div>
      <span className={`pill ${pillClassFor(item.sentiment)}`}>
        {item.sentiment}
      </span>
    </article>
  );
}
