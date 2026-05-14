import { feedbackData } from "@/lib/data";
import FeedbackDashboard from "@/components/FeedbackDashboard";
import Nav from "@/components/Nav";

export default function Home() {
  return (
    <>
      <Nav />
      <span id="top" aria-hidden="true" />

      <main className="page" data-screen-label="Feedback">
        <header className="hero">
          <p className="hero__eyebrow">
            Customer feedback · Internal dashboard
          </p>
          <h1 className="hero__title">
            What our customers
            <br />
            <span className="italic">are saying.</span>
          </h1>
          <p className="hero__sub">
            A calm, searchable view of every response that comes in. Filter
            by sentiment, scan the conversation, and act on what matters.
          </p>
        </header>

        <FeedbackDashboard data={feedbackData} />

        <footer className="foot">
          <div>Lumina · internal feedback tool</div>
          <div>{feedbackData.length} responses · May 10 – May 14, 2026</div>
        </footer>
      </main>
    </>
  );
}
