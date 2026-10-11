import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Landing() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main style={styles.page}>

      {/* ── HERO ── */}
      <div style={styles.hero}>

        <div style={styles.heroGlow} />

        <div style={styles.topRule}>
          <div style={styles.ruleLine} />
          <span style={styles.ruleText}>Est. Since the Dawn of Time</span>
          <div style={styles.ruleLine} />
        </div>

        {/* Logo — large and prominent */}
        <div style={styles.logoWrap}>
          <img
            src="/history-robot-logo.webp"
            alt="History Robot"
            style={styles.logo}
          />
        </div>

        <div style={styles.tagline}>
          <p style={styles.taglineLabel}>The World's Greatest Minds Await</p>
          <h1 style={styles.heroLine}>
            Don't just read about history.<br />
            <span style={styles.heroAccent}>Talk to it.</span>
          </h1>
          <p style={styles.heroSub}>What would Napoleon say? Ask him.</p>
        </div>

        <div style={styles.ctaRow}>
          <button
            style={styles.btnPrimary}
            onClick={() => router.push("/app")}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
          >
            Meet the Characters
          </button>
          <button
            style={styles.btnSecondary}
            onClick={() => document.getElementById("how").scrollIntoView({ behavior: "smooth" })}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#c9a84c"; e.currentTarget.style.color = "#e8c96a"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)"; e.currentTarget.style.color = "#c9a84c"; }}
          >
            How It Works
          </button>
        </div>

        <div style={styles.scrollHint}>
          <span style={styles.scrollText}>Explore</span>
          <div style={styles.scrollLine} />
        </div>
      </div>

      {/* ── ORNAMENT ── */}
      <div style={styles.ornament}>
        <div style={styles.ornamentLine} />
        <div style={styles.ornamentDiamond} />
        <span style={styles.ornamentText}>Free Characters</span>
        <div style={styles.ornamentDiamond} />
        <div style={styles.ornamentLine} />
      </div>

      {/* ── FREE FIGURES ── */}
      <div style={styles.section}>
        <p style={{...styles.sectionLabel, fontSize: 13, color: "rgba(201,168,76,0.9)"}}>Start Your Journey</p>
        <h2 style={styles.sectionTitle}>Chat for <em style={styles.em}>Free</em> Today</h2>
        <p style={styles.sectionSub}>Begin with three of history's most iconic figures — no account required.</p>

        <div style={styles.figureGrid}>
          {[
            { name: "Albert Einstein", img: "/figures/einstein.jpg" },
            { name: "Cleopatra", img: "/figures/cleopatra.jpg" },
            { name: "Abraham Lincoln", img: "/figures/lincoln.jpg" },
          ].map((f) => (
            <div
              key={f.name}
              style={styles.figureCard}
              onClick={() => router.push("/app")}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.borderColor = "rgba(201,168,76,0.6)";
                e.currentTarget.querySelector(".hoverCta").style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(201,168,76,0.2)";
                e.currentTarget.querySelector(".hoverCta").style.opacity = "0";
              }}
            >
              <img src={f.img} alt={f.name} style={styles.figureImg} />
              <div style={styles.figureOverlay}>
                <div style={styles.figureName}>{f.name}</div>
                <div style={styles.figureBadge}>Free to Chat</div>
              </div>
              <div className="hoverCta" style={styles.figureHover}>
                <span style={styles.figureHoverText}>Start Chatting</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── QUOTE ── */}
      <div style={styles.quoteStrip}>
        <blockquote style={styles.quote}>
          "Imagination is more important than knowledge."
        </blockquote>
        <p style={styles.quoteAttrib}>— Albert Einstein, waiting for your question</p>
      </div>

      {/* ── HOW IT WORKS ── */}
      <div id="how" style={styles.howSection}>
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>How It <em style={styles.em}>Works</em></h2>
          <p style={styles.sectionSub}>Three steps to your first conversation across the centuries.</p>

          <div style={styles.steps}>
            {[
              { num: "I", title: "Choose a Figure", desc: "Browse 150+ historical figures spanning 3,000 years of human history." },
              { num: "II", title: "Ask Anything", desc: "Ask about their life, decisions, secrets, regrets — anything you've ever wondered." },
              { num: "III", title: "Read Their Words", desc: "Each figure responds in authentic character, with their own personality and perspective." },
            ].map((s, i) => (
              <div key={s.num} style={{ ...styles.step, position: "relative" }}>
                <div style={styles.stepNum}>{s.num}</div>
                <div style={styles.stepTitle}>{s.title}</div>
                <p style={styles.stepDesc}>{s.desc}</p>
                {i < 2 && <div style={styles.stepArrow}>→</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PREMIUM ── */}
      <div style={{ ...styles.section, textAlign: "center" }}>
        <p style={{...styles.sectionLabel, fontSize: 13, color: "rgba(201,168,76,0.9)"}}>Unlock the Archives</p>
        <h2 style={styles.sectionTitle}>Go <em style={styles.em}>Premium</em></h2>
        <p style={styles.sectionSub}>The full roster of history's most fascinating minds, unlocked.</p>

        <div style={styles.premiumBox}>
          <div style={styles.premiumTopLine} />
          <div style={styles.premiumCount}>150+</div>
          <div style={styles.premiumCountLabel}>Historical Figures & Counting</div>
          <ul style={styles.premiumList}>
            {[
              "Kings, queens and emperors across every era",
              "Scientists, artists, writers and composers",
              "Warriors, explorers and sporting legends",
              "Villains & Rogues for the brave",
              "New figures added every week",
              "Unlimited conversations",
            ].map((item) => (
              <li key={item} style={styles.premiumItem}>
                <span style={styles.premiumIcon}>✦</span> {item}
              </li>
            ))}
          </ul>
          <button
            style={styles.btnPrimary}
            onClick={() => router.push("/app")}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
          >
            Upgrade to Premium
          </button>
        </div>
      </div>

      {/* ── COMING SOON ── */}
      <div style={styles.comingSoon}>
        <div style={styles.comingSoonInner}>
          <p style={styles.comingSoonLabel}>Coming Soon</p>
          <h2 style={styles.comingSoonTitle}>Dinner Party Mode</h2>
          <p style={styles.comingSoonDesc}>
            Put Napoleon, Cleopatra and Einstein in the same room.<br />
            <em>See what happens.</em>
          </p>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer style={styles.footer}>
        <img src="/history-robot-logo.webp" alt="History Robot" style={styles.footerLogo} />
        <p style={styles.disclaimer}>
          History Robot presents historical figures for educational and entertainment purposes only.
          All conversations are AI-generated and do not represent the actual views, statements or beliefs
          of any historical person. Inclusion of any figure does not represent endorsement of their views,
          actions or commercial affiliation.
        </p>
        <p style={styles.copyright}>© 2026 History Robot — All Rights Reserved</p>
      </footer>

      <style jsx global>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { margin: 0; background: #0a0908; }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        .hoverCta { opacity: 0; transition: opacity 0.3s ease; }
      `}</style>
    </main>
  );
}

const styles = {
  page: {
    background: "#0a0908",
    color: "#f0e8d8",
    fontFamily: "Georgia, 'Times New Roman', serif",
    overflowX: "hidden",
  },
  hero: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 20px 100px",
    position: "relative",
    overflow: "hidden",
  },
  heroGlow: {
    position: "absolute",
    top: 0, left: "50%",
    transform: "translateX(-50%)",
    width: 800, height: 800,
    background: "radial-gradient(ellipse at center, rgba(79,179,255,0.07) 0%, rgba(201,168,76,0.04) 40%, transparent 70%)",
    pointerEvents: "none",
  },
  topRule: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    marginBottom: 48,
  },
  ruleLine: {
    width: 60, height: 1,
    background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.4))",
  },
  ruleText: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 13,
    letterSpacing: 4,
    color: "rgba(201,168,76,0.85)",
    textTransform: "uppercase",
  },
  logoWrap: {
    width: "min(460px, 88vw)",
    marginBottom: 8,
  },
  logo: {
    width: "100%",
    height: "auto",
    display: "block",
    filter: "drop-shadow(0 0 40px rgba(79,179,255,0.25)) drop-shadow(0 20px 60px rgba(0,0,0,0.8))",
    borderRadius: 12,
  },
  tagline: {
    textAlign: "center",
    marginTop: 40,
  },
  taglineLabel: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 14,
    letterSpacing: 5,
    color: "rgba(201,168,76,0.95)",
    textTransform: "uppercase",
    marginBottom: 16,
  },
  heroLine: {
    fontSize: "clamp(28px, 5vw, 56px)",
    fontStyle: "italic",
    fontWeight: 400,
    lineHeight: 1.2,
    color: "#f0e8d8",
    marginBottom: 16,
    textAlign: "center",
  },
  heroAccent: {
    color: "#4fb3ff",
    fontStyle: "normal",
    textShadow: "0 0 30px rgba(79,179,255,0.4)",
  },
  heroSub: {
    fontSize: "clamp(15px, 2vw, 20px)",
    fontStyle: "italic",
    color: "rgba(240,232,216,0.6)",
    textAlign: "center",
  },
  ctaRow: {
    display: "flex",
    gap: 16,
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 40,
  },
  btnPrimary: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 12,
    letterSpacing: 3,
    textTransform: "uppercase",
    color: "#0a0908",
    background: "linear-gradient(135deg, #e8c96a, #c9a84c)",
    border: "none",
    padding: "16px 36px",
    cursor: "pointer",
    clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
    transition: "opacity 0.3s ease",
    fontWeight: 700,
  },
  btnSecondary: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 12,
    letterSpacing: 3,
    textTransform: "uppercase",
    color: "#c9a84c",
    background: "transparent",
    border: "1px solid rgba(201,168,76,0.4)",
    padding: "16px 36px",
    cursor: "pointer",
    clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
    transition: "all 0.3s ease",
  },
  scrollHint: {
    position: "absolute",
    bottom: 32,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  },
  scrollText: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 9,
    letterSpacing: 4,
    color: "rgba(201,168,76,0.4)",
    textTransform: "uppercase",
  },
  scrollLine: {
    width: 1, height: 40,
    background: "linear-gradient(to bottom, rgba(201,168,76,0.4), transparent)",
    animation: "scrollPulse 2s ease-in-out infinite",
  },
  ornament: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    padding: "0 40px",
    margin: "20px 0",
  },
  ornamentLine: {
    flex: 1,
    maxWidth: 200,
    height: 1,
    background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.2))",
  },
  ornamentDiamond: {
    width: 6, height: 6,
    background: "rgba(201,168,76,0.4)",
    transform: "rotate(45deg)",
  },
  ornamentText: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 13,
    letterSpacing: 4,
    color: "rgba(201,168,76,0.9)",
    textTransform: "uppercase",
  },
  section: {
    padding: "80px 20px",
    maxWidth: 1100,
    margin: "0 auto",
  },
  sectionLabel: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 10,
    letterSpacing: 5,
    color: "rgba(201,168,76,0.8)",
    textTransform: "uppercase",
    marginBottom: 16,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: "clamp(26px, 4vw, 42px)",
    fontWeight: 400,
    color: "#f0e8d8",
    marginBottom: 12,
    textAlign: "center",
  },
  em: {
    fontStyle: "italic",
    color: "#c9a84c",
  },
  sectionSub: {
    fontSize: "clamp(15px, 2vw, 18px)",
    fontStyle: "italic",
    color: "rgba(240,232,216,0.6)",
    maxWidth: 560,
    margin: "0 auto 60px",
    lineHeight: 1.7,
    textAlign: "center",
  },
  figureGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 24,
    maxWidth: 780,
    margin: "0 auto",
  },
  figureCard: {
    position: "relative",
    background: "#1c1814",
    border: "1px solid rgba(201,168,76,0.2)",
    overflow: "hidden",
    cursor: "pointer",
    transition: "all 0.4s ease",
    aspectRatio: "3/4",
  },
  figureImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "top",
    display: "block",
    filter: "sepia(20%) contrast(1.05)",
  },
  figureOverlay: {
    position: "absolute",
    bottom: 0, left: 0, right: 0,
    padding: "40px 16px 16px",
    background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
  },
  figureName: {
    fontSize: 18,
    fontWeight: 700,
    color: "#f0e8d8",
    marginBottom: 6,
  },
  figureBadge: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 9,
    letterSpacing: 3,
    textTransform: "uppercase",
    color: "#4fb3ff",
    background: "rgba(79,179,255,0.12)",
    border: "1px solid rgba(79,179,255,0.3)",
    padding: "3px 10px",
    display: "inline-block",
  },
  figureHover: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(0,0,0,0.2)",
  },
  figureHoverText: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 11,
    letterSpacing: 3,
    textTransform: "uppercase",
    color: "#c9a84c",
    background: "rgba(10,9,8,0.85)",
    border: "1px solid rgba(201,168,76,0.4)",
    padding: "10px 20px",
  },
  quoteStrip: {
    padding: "60px 20px",
    textAlign: "center",
    borderTop: "1px solid rgba(201,168,76,0.08)",
    borderBottom: "1px solid rgba(201,168,76,0.08)",
  },
  quote: {
    fontSize: "clamp(20px, 3.5vw, 36px)",
    fontStyle: "italic",
    color: "#f0e8d8",
    maxWidth: 700,
    margin: "0 auto 16px",
    lineHeight: 1.4,
  },
  quoteAttrib: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 11,
    letterSpacing: 4,
    color: "rgba(201,168,76,0.75)",
    textTransform: "uppercase",
  },
  howSection: {
    background: "#141210",
    borderTop: "1px solid rgba(201,168,76,0.1)",
    borderBottom: "1px solid rgba(201,168,76,0.1)",
  },
  steps: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 48,
    maxWidth: 800,
    margin: "0 auto",
  },
  step: { textAlign: "center" },
  stepNum: {
    fontSize: 48,
    fontWeight: 700,
    color: "rgba(201,168,76,0.15)",
    lineHeight: 1,
    marginBottom: 16,
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
  },
  stepTitle: {
    fontSize: 20,
    color: "#f0e8d8",
    marginBottom: 10,
  },
  stepDesc: {
    fontSize: 15,
    fontStyle: "italic",
    color: "rgba(240,232,216,0.55)",
    lineHeight: 1.7,
  },
  stepArrow: {
    position: "absolute",
    top: 24, right: -24,
    color: "rgba(201,168,76,0.3)",
    fontSize: 20,
  },
  premiumBox: {
    background: "#1c1814",
    border: "1px solid rgba(201,168,76,0.2)",
    padding: "60px 40px",
    maxWidth: 700,
    margin: "0 auto",
    position: "relative",
    textAlign: "center",
  },
  premiumTopLine: {
    position: "absolute",
    top: 0, left: 0, right: 0,
    height: 2,
    background: "linear-gradient(90deg, transparent, #c9a84c, transparent)",
  },
  premiumCount: {
    fontSize: "clamp(48px, 8vw, 80px)",
    fontWeight: 700,
    color: "#c9a84c",
    lineHeight: 1,
    marginBottom: 8,
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
  },
  premiumCountLabel: {
    fontSize: 17,
    fontStyle: "italic",
    color: "rgba(240,232,216,0.55)",
    marginBottom: 32,
  },
  premiumList: {
    listStyle: "none",
    marginBottom: 40,
    textAlign: "left",
    maxWidth: 400,
    margin: "0 auto 40px",
  },
  premiumItem: {
    fontSize: 18,
    fontStyle: "italic",
    color: "#f0e8d8",
    padding: "10px 0",
    borderBottom: "1px solid rgba(201,168,76,0.08)",
  },
  premiumIcon: {
    color: "#c9a84c",
    fontSize: 13,
  },
  comingSoon: {
    padding: "80px 20px",
    textAlign: "center",
    background: "linear-gradient(135deg, rgba(201,168,76,0.06) 0%, rgba(79,179,255,0.04) 100%)",
    borderTop: "1px solid rgba(201,168,76,0.15)",
    borderBottom: "1px solid rgba(201,168,76,0.15)",
  },
  comingSoonInner: {
    maxWidth: 600,
    margin: "0 auto",
  },
  comingSoonLabel: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 13,
    letterSpacing: 5,
    color: "#4fb3ff",
    textTransform: "uppercase",
    marginBottom: 16,
  },
  comingSoonTitle: {
    fontSize: "clamp(28px, 4vw, 44px)",
    fontWeight: 400,
    fontStyle: "italic",
    color: "#f0e8d8",
    marginBottom: 16,
  },
  comingSoonDesc: {
    fontSize: "clamp(16px, 2vw, 20px)",
    color: "rgba(240,232,216,0.6)",
    lineHeight: 1.7,
  },
  footer: {
    background: "#141210",
    borderTop: "1px solid rgba(201,168,76,0.1)",
    padding: "40px 20px",
    textAlign: "center",
  },
  footerLogo: {
    width: 80,
    height: "auto",
    opacity: 0.4,
    borderRadius: 6,
    marginBottom: 16,
  },
  disclaimer: {
    fontSize: 15,
    fontStyle: "italic",
    color: "rgba(240,232,216,0.65)",
    maxWidth: 680,
    margin: "0 auto 20px",
    lineHeight: 1.7,
  },
  copyright: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 10,
    letterSpacing: 3,
    color: "rgba(201,168,76,0.3)",
    textTransform: "uppercase",
  },
};