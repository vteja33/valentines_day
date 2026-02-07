import { useState, useRef, useCallback } from "react";
import teddyImage from "./assets/teddy_proposing.png"; 


const LOVE_MESSAGES = [
  "Are you sure? 🥺",
  "Mujhse pyaar nahi karti?... 💕",
  "Pretty please? 🌹",
  "Babiluuuuuu! 🥺",
  "Try clicking Yes instead! 💖",
  "Acha Maan Jao Abhi! 🦋",
  "The universe says Yes! ✨",
  "Wrong button, dodo! 🥰",
  "Oh mennu kehndi na na na na! 💗",
  "Sachi muchi? 👉👈",
  "Baby Girl meri ban jao! 🥰",
  "Mujhe Apna Banana Hai! 💘",
  "I promise to love you forever! 🌸",
  "Tere bina jeena mushkil hai! 💞",
];

const ACCEPTED_MESSAGES = [
  "Meri Baby Maan Gayi! 💖",
  "I am the Luckiest Guy! 🥰",
  "Best Valentine's Day ever! 🌹",
  "My heart is doing backflips! 💕",
];

const FloatingHeart = ({ style }) => (
  <div
    style={{
      position: "fixed",
      fontSize: style.size || "24px",
      opacity: 0.15,
      pointerEvents: "none",
      animation: `floatUp ${style.duration || 12}s linear infinite`,
      animationDelay: style.delay || "0s",
      left: style.left,
      bottom: "-50px",
      zIndex: 0,
      ...style,
    }}
  >
    {style.emoji || "♥"}
  </div>
);

const Sparkle = ({ x, y }) => (
  <div
    style={{
      position: "fixed",
      left: x,
      top: y,
      pointerEvents: "none",
      zIndex: 100,
      animation: "sparkle 0.6s ease-out forwards",
    }}
  >
    ✨
  </div>
);

export default function ValentineProposal() {
  const [yesScale, setYesScale] = useState(1);
  const [noPosition, setNoPosition] = useState(null);
  const [dodgeCount, setDodgeCount] = useState(0);
  const [message, setMessage] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [sparkles, setSparkles] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const containerRef = useRef(null);
  const noRef = useRef(null);

  const moveNoButton = useCallback(() => {
    if (!containerRef.current) return;
    const container = containerRef.current.getBoundingClientRect();
    const btnW = 120;
    const btnH = 50;
    const padding = 20;

    const maxX = container.width - btnW - padding;
    const maxY = container.height - btnH - padding;

    const newX = Math.random() * maxX + padding;
    const newY = Math.random() * maxY + padding;

    setNoPosition({ x: newX, y: newY });
    setYesScale((prev) => Math.min(prev * 1.3, 4.5));
    setDodgeCount((prev) => prev + 1);
    setMessage(LOVE_MESSAGES[Math.floor(Math.random() * LOVE_MESSAGES.length)]);
  }, []);

  const handleYes = (e) => {
    setAccepted(true);
    setShowConfetti(true);
    setMessage(
      ACCEPTED_MESSAGES[Math.floor(Math.random() * ACCEPTED_MESSAGES.length)]
    );

    // Add sparkle burst
    const newSparkles = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: e.clientX + (Math.random() - 0.5) * 100,
      y: e.clientY + (Math.random() - 0.5) * 100,
    }));
    setSparkles(newSparkles);
    setTimeout(() => setSparkles([]), 1000);
  };

  // Generate floating hearts
  const hearts = Array.from({ length: 15 }, (_, i) => ({
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 12}s`,
    duration: 10 + Math.random() * 8,
    size: `${16 + Math.random() * 28}px`,
    emoji: ["♥", "💕", "💖", "🌸", "✿"][Math.floor(Math.random() * 5)],
  }));

  // Confetti pieces
  const confetti = accepted
    ? Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 2}s`,
        color: ["#ff6b8a", "#ff85a1", "#ffd4e0", "#ff3366", "#ffb3c6", "#f72585", "#b5179e", "#ffc8dd"][
          Math.floor(Math.random() * 8)
        ],
        size: 6 + Math.random() * 8,
        rotation: Math.random() * 360,
        duration: 2 + Math.random() * 3,
      }))
    : [];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Quicksand:wght@400;500;600;700&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        @keyframes floatUp {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.15; }
          90% { opacity: 0.15; }
          100% { transform: translateY(-110vh) rotate(360deg); opacity: 0; }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes gentleBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes sparkle {
          0% { transform: scale(0) rotate(0deg); opacity: 1; }
          50% { transform: scale(1.5) rotate(180deg); opacity: 0.8; }
          100% { transform: scale(0) rotate(360deg); opacity: 0; }
        }

        @keyframes confettiFall {
          0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }

        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          15% { transform: scale(1.15); }
          30% { transform: scale(1); }
          45% { transform: scale(1.1); }
        }

        @keyframes slideMessage {
          from { opacity: 0; transform: translateY(10px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes celebrateScale {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>

      <div
        ref={containerRef}
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          background: accepted
            ? "linear-gradient(135deg, #fff0f3 0%, #ffd6e0 30%, #ffb3c6 60%, #ff85a1 100%)"
            : "linear-gradient(135deg, #fff5f7 0%, #ffe0e6 35%, #ffd1dc 65%, #ffc2d1 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Quicksand', sans-serif",
          transition: "background 1.5s ease",
        }}
      >
        {/* Floating hearts background */}
        {hearts.map((h, i) => (
          <FloatingHeart key={i} style={h} />
        ))}

        {/* Confetti */}
        {confetti.map((c) => (
          <div
            key={c.id}
            style={{
              position: "fixed",
              left: c.left,
              top: 0,
              width: c.size,
              height: c.size * 1.4,
              backgroundColor: c.color,
              borderRadius: "2px",
              animation: `confettiFall ${c.duration}s ease-in ${c.delay} infinite`,
              zIndex: 50,
              transform: `rotate(${c.rotation}deg)`,
            }}
          />
        ))}

        {/* Sparkles */}
        {sparkles.map((s) => (
          <Sparkle key={s.id} x={s.x} y={s.y} />
        ))}

        {/* Main content */}
        {!accepted ? (
          <div
            style={{
              textAlign: "center",
              zIndex: 10,
              padding: "0 24px",
              animation: "fadeInUp 1s ease-out",
            }}
          >
            {/* Big heart icon */}
            <div
              style={{
                fontSize: "72px",
                marginBottom: "16px",
                animation: "heartbeat 1.5s ease-in-out infinite",
                filter: "drop-shadow(0 4px 20px rgba(255, 51, 102, 0.3))",
              }}
            >
              <img 
                src={teddyImage} 
                alt="Teddy bear with heart" 
                style={{
                  width: "250px",
                  height: "250px",
                  objectFit: "contain",
                }}
              />
            </div>

            {/* Title */}
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 700,
                color: "#a4133c",
                marginBottom: "12px",
                lineHeight: 1.2,
                textShadow: "0 2px 10px rgba(164, 19, 60, 0.1)",
              }}
            >
              My Beautiful Chitti, The Love of My Life
            </h1>

            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
                fontWeight: 400,
                fontStyle: "italic",
                color: "#c9184a",
                marginBottom: "48px",
                lineHeight: 1.5,
              }}
            >
              Will you be my Valentine? 🌹
            </p>

            {/* Message bubble */}
            {message && (
              <div
                key={message}
                style={{
                  marginBottom: "32px",
                  padding: "12px 28px",
                  background: "rgba(255, 255, 255, 0.75)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "50px",
                  display: "inline-block",
                  color: "#a4133c",
                  fontSize: "1.05rem",
                  fontWeight: 600,
                  boxShadow: "0 4px 20px rgba(255, 107, 138, 0.15)",
                  animation: "slideMessage 0.4s ease-out",
                  border: "1px solid rgba(255, 179, 198, 0.4)",
                }}
              >
                {message}
              </div>
            )}

            {/* Dodge counter */}
            {dodgeCount > 2 && (
              <p
                style={{
                  marginBottom: "24px",
                  color: "#c9184a",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  opacity: 0.7,
                }}
              >
                The No button ran away {dodgeCount} times... maybe it's a sign? 😏
              </p>
            )}

            {/* YES button */}
            <button
              onClick={handleYes}
              style={{
                padding: "16px 48px",
                fontSize: `${1 * yesScale}rem`,
                fontFamily: "'Quicksand', sans-serif",
                fontWeight: 700,
                color: "#fff",
                background: "linear-gradient(135deg, #ff6b8a, #ff3366, #e91e63)",
                border: "none",
                borderRadius: "60px",
                cursor: "pointer",
                transform: `scale(${yesScale})`,
                transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                boxShadow: `0 ${4 * yesScale}px ${20 * yesScale}px rgba(255, 51, 102, 0.4)`,
                animation: "gentleBounce 2s ease-in-out infinite",
                position: "relative",
                zIndex: 20,
                letterSpacing: "1px",
              }}
              onMouseEnter={(e) => {
                e.target.style.boxShadow = `0 ${6 * yesScale}px ${30 * yesScale}px rgba(255, 51, 102, 0.55)`;
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow = `0 ${4 * yesScale}px ${20 * yesScale}px rgba(255, 51, 102, 0.4)`;
              }}
            >
              Yes! 💖
            </button>

            {/* NO button — positioned absolutely when dodging */}
            <button
              ref={noRef}
              onMouseEnter={moveNoButton}
              onClick={moveNoButton}
              onTouchStart={moveNoButton}
              style={{
                padding: "14px 36px",
                fontSize: "1rem",
                fontFamily: "'Quicksand', sans-serif",
                fontWeight: 600,
                color: "#a4133c",
                background: "rgba(255, 255, 255, 0.7)",
                backdropFilter: "blur(8px)",
                border: "2px solid rgba(255, 179, 198, 0.5)",
                borderRadius: "60px",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                position: noPosition ? "fixed" : "relative",
                left: noPosition ? noPosition.x : "auto",
                top: noPosition ? noPosition.y : "auto",
                marginLeft: noPosition ? 0 : "20px",
                zIndex: 20,
                letterSpacing: "0.5px",
                boxShadow: "0 2px 12px rgba(164, 19, 60, 0.08)",
              }}
            >
              No 😢
            </button>
          </div>
        ) : (
          /* ACCEPTED state */
          <div
            style={{
              textAlign: "center",
              zIndex: 10,
              padding: "0 24px",
              animation: "celebrateScale 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <div
              style={{
                fontSize: "100px",
                marginBottom: "24px",
                animation: "heartbeat 1.2s ease-in-out infinite",
                filter: "drop-shadow(0 8px 30px rgba(255, 51, 102, 0.4))",
              }}
            >
              💕
            </div>

            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                fontWeight: 700,
                background: "linear-gradient(135deg, #a4133c, #ff3366, #ff6b8a, #ff3366, #a4133c)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "shimmer 3s linear infinite",
                marginBottom: "16px",
                lineHeight: 1.1,
              }}
            >
              Yaaay!
            </h1>

            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.2rem, 3vw, 1.6rem)",
                fontStyle: "italic",
                color: "#a4133c",
                marginBottom: "24px",
                lineHeight: 1.6,
              }}
            >
              {message}
            </p>

            {dodgeCount > 0 && (
              <p
                style={{
                  marginTop: "20px",
                  fontSize: "0.85rem",
                  color: "#c9184a",
                  opacity: 0.5,
                  fontWeight: 500,
                }}
              >
                (The No button ran away {dodgeCount} time{dodgeCount > 1 ? "s" : ""} before you gave in 😄)
              </p>
            )}
          </div>
        )}

        {/* Subtle bottom credit */}
        <p
          style={{
            position: "fixed",
            bottom: "16px",
            fontSize: "0.75rem",
            color: "#c9184a",
            opacity: 0.3,
            fontWeight: 500,
            zIndex: 10,
          }}
        >
          Made with ♥
        </p>
      </div>
    </>
  );
}
