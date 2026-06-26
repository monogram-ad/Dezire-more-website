import { useState, useRef, useEffect } from "react";

const STORE_INFO = {
  name: "Dezire More",
  tagline: "Ethnic Elegance. Modern You.",
  shipping: "Free shipping on orders above ₹1699",
  exchange: "7-day exchange policy",
  delivery: "5–7 working days",
  contact: "Use the Contact Us page for order queries",
  categories: ["Sarees", "Kurtas", "Lehengas", "Co-ords", "Dress Materials", "Ready to Wear", "Western Apparels"],
  occasions: {
    wedding: ["Lehengas", "Silk Sarees", "Heavy Embroidered Sarees"],
    mehendi: ["Co-ords", "Kurtas", "Dress Materials"],
    casual: ["Kurtas", "Ready to Wear", "Western Apparels"],
    festive: ["Sarees", "Lehengas", "Co-ords"],
    office: ["Kurtas", "Dress Materials", "Ready to Wear"],
    party: ["Western Apparels", "Co-ords", "Lehengas"],
  },
};

const getBotReply = (message) => {
  const msg = message.toLowerCase().trim();

  // Greetings
  if (/^(hi|hello|hey|hii|helo|namaste|good morning|good evening|good afternoon)/.test(msg)) {
    return `Namaste! 🙏 Welcome to *Dezire More* — Ethnic Elegance. Modern You.\n\nI'm your personal style assistant! I can help you with:\n• Finding the perfect outfit for any occasion\n• Product categories & collections\n• Shipping & exchange info\n• Size guidance\n\nWhat are you looking for today? 😊`;
  }

  // Wedding
  if (/wedding|bridal|bride|shaadi|shadi/.test(msg)) {
    return `💍 *Wedding Collection*\n\nFor weddings, our top picks are:\n• *Lehengas* — Heavy embroidered bridal lehengas\n• *Silk Sarees* — Kanjivaram, Banarasi & more\n• *Embroidered Sarees* — Perfect for bride's family\n\nWe have stunning options for the bride, bridesmaids, and family!\n\n👉 Check our *Lehengas* and *Sarees* sections on the website.`;
  }

  // Mehendi / Haldi
  if (/mehendi|mehndi|haldi|sangeet/.test(msg)) {
    return `🌸 *Mehendi & Sangeet Outfits*\n\nFor these fun functions, we recommend:\n• *Co-ords* — Trendy & comfortable\n• *Kurtas* — Flowy & festive\n• *Dress Materials* — Stitch it your way!\n\nPastel and bright colours work beautifully for these occasions 🌈\n\n👉 Visit the *Co-ords* or *Kurtas* section to explore!`;
  }

  // Festive / Diwali / Puja
  if (/festive|diwali|puja|navratri|durga|festival|eid|onam/.test(msg)) {
    return `🪔 *Festive Collection*\n\nFor festivals, our bestsellers are:\n• *Sarees* — Classic silk & chiffon sarees\n• *Lehengas* — Festive lehengas with mirror work\n• *Co-ords* — Modern festive sets\n\nFestivals deserve something special — browse our *New Arrivals* for the latest festive drops! ✨`;
  }

  // Casual / Daily wear
  if (/casual|daily|everyday|office|work|college/.test(msg)) {
    return `👗 *Everyday & Office Wear*\n\nFor daily or office wear, we suggest:\n• *Kurtas* — Light, comfortable & elegant\n• *Dress Materials* — Get custom stitched!\n• *Ready to Wear* — Just wear & go!\n• *Western Apparels* — For a modern look\n\nAll designed to keep you stylish without any fuss 😊`;
  }

  // Party / Night out
  if (/party|night out|birthday|date|club/.test(msg)) {
    return `🎉 *Party Wear*\n\nStand out at every party with:\n• *Western Apparels* — Trendy & bold\n• *Co-ords* — Chic matching sets\n• *Lehengas* — Indo-western party lehengas\n\nYou'll be the best dressed in the room! 💃`;
  }

  // Sarees
  if (/saree|sari|sarees/.test(msg)) {
    return `🥻 *Our Saree Collection*\n\nWe have a gorgeous range of sarees:\n• Banarasi Silk\n• Chiffon Sarees\n• Organza Silk\n• Embroidered Sarees\n• Printed Sarees\n\nAvailable in a wide range of colours — Red, Blue, Black, White, Yellow & more!\n\n👉 Visit the *Sarees* section to explore the full collection.`;
  }

  // Lehengas
  if (/lehenga|lehnga|lehngas/.test(msg)) {
    return `👘 *Our Lehenga Collection*\n\nOur lehengas are perfect for:\n• Bridal & Wedding functions\n• Festive occasions\n• Sangeet & Mehendi\n\nHeavy embroidery, mirror work, and modern cuts — all available!\n\n👉 Visit the *Lehengas* section to see all options.`;
  }

  // Kurtas
  if (/kurta|kurti|kurtas/.test(msg)) {
    return `👚 *Our Kurta Collection*\n\nLight, elegant, and perfect for any occasion:\n• Casual daily wear kurtas\n• Festive embroidered kurtas\n• Office-friendly styles\n\nAvailable in multiple fabrics and sizes!\n\n👉 Visit the *Kurtas* section to browse.`;
  }

  // Co-ords
  if (/coord|co-ord|coords|co ord|set/.test(msg)) {
    return `✨ *Co-ord Sets*\n\nOur Co-ord sets are super trendy right now! Perfect for:\n• Mehendi & Sangeet\n• Casual outings\n• Birthday parties\n\nMatching top & bottom sets that look effortlessly put together 💫\n\n👉 Visit the *Co-ords* section to shop!`;
  }

  // Shipping
  if (/ship|shipping|delivery|deliver|courier|dispatch/.test(msg)) {
    return `🚚 *Shipping Info*\n\n• *Free shipping* on orders above ₹1699\n• Standard delivery: *5–7 working days*\n• Orders are dispatched within 1–2 business days\n• You'll receive a tracking link once your order ships\n\nFor any order-related queries, reach us via the *Contact Us* page! 📦`;
  }

  // Exchange / Return
  if (/exchange|return|refund|replace|policy/.test(msg)) {
    return `🔄 *Exchange Policy*\n\n• We offer a *7-day exchange policy* from delivery date\n• Items must be unused, unwashed, and with original tags\n• Sale items are not eligible for exchange\n• We do *not* offer refunds — exchange only\n\nTo initiate an exchange, contact us via the *Contact Us* page with your order details! 😊`;
  }

  // Size / Size guide
  if (/size|sizing|fit|measurement|small|medium|large|xl/.test(msg)) {
    return `📏 *Size Guide*\n\nWe offer sizes from S to XXL on most products. Some items are *Free Size*.\n\nFor a perfect fit:\n• Check the size chart on each product page\n• Visit our *Size Guide* page on the website\n• When in doubt, size up!\n\nNeed help with a specific product's sizing? Just ask! 😊`;
  }

  // Discount / Sale / Offer
  if (/discount|sale|offer|coupon|code|promo|deal/.test(msg)) {
    return `🏷️ *Offers & Discounts*\n\n• Use code *DEZIRE10* for extra savings!\n• Check our *Sale* section for discounted items — up to 40% off!\n• Free shipping on orders above ₹1699\n• New collection drops regularly — follow us for early access!\n\n👉 Visit the *Sale* section on the website to grab deals! 🎉`;
  }

  // New arrivals
  if (/new|latest|new arrival|new collection|recent/.test(msg)) {
    return `🌟 *New Arrivals*\n\nFresh styles just dropped at Dezire More! Our new arrivals include:\n• New sarees & lehengas\n• Trending co-ord sets\n• Festive collection pieces\n\n👉 Visit the *New Arrivals* section to see what's new! We add new styles regularly ✨`;
  }

  // Bestsellers
  if (/bestseller|best seller|popular|trending|top/.test(msg)) {
    return `🔥 *Bestsellers*\n\nOur most loved pieces right now:\n• Silk & embroidered sarees\n• Bridal lehengas\n• Festive co-ord sets\n• Printed kurtas\n\n👉 Visit the *Bestsellers* section to shop our most popular styles! 💕`;
  }

  // Contact
  if (/contact|help|support|query|question|problem|issue|reach/.test(msg)) {
    return `📞 *Contact Us*\n\nWe're here to help! For any queries:\n• Visit our *Contact Us* page on the website\n• We respond within 24 hours\n• For order issues, keep your order ID handy\n\nYou can also find us on Instagram for quick replies! 💬`;
  }

  // Payment
  if (/pay|payment|upi|card|cod|cash on delivery|online/.test(msg)) {
    return `💳 *Payment Options*\n\nWe accept:\n• UPI (GPay, PhonePe, Paytm)\n• Credit & Debit Cards\n• Net Banking\n• Cash on Delivery (select areas)\n\nAll payments are 100% secure! 🔒`;
  }

  // Fabric questions
  if (/fabric|material|silk|cotton|chiffon|georgette|organza/.test(msg)) {
    return `🧵 *Fabric Guide*\n\n• *Silk* — Rich, heavy, perfect for weddings\n• *Chiffon* — Light, flowy, great for casual wear\n• *Organza* — Sheer & elegant, festive favourite\n• *Cotton* — Comfortable for daily wear\n• *Georgette* — Soft drape, versatile for any occasion\n\nNeed help picking the right fabric for your occasion? Tell me where you're going! 😊`;
  }

  // Colours
  if (/color|colour|red|blue|green|pink|yellow|white|black|gold/.test(msg)) {
    return `🎨 *Colour Collections*\n\nWe have a wide range of colours across all our products:\n• *Reds & Pinks* — Perfect for weddings & festivals\n• *Blues & Greens* — Great for casual & festive\n• *Whites & Creams* — Elegant everyday choices\n• *Blacks & Golds* — Stunning for parties\n\nTell me your favourite colour and occasion — I'll suggest the perfect category! 😊`;
  }

  // Thank you
  if (/thank|thanks|thankyou|thank you|helpful/.test(msg)) {
    return `You're so welcome! 😊🙏\n\nHappy shopping at *Dezire More*! May you find the perfect outfit that makes you feel like royalty 👑\n\nIs there anything else I can help you with?`;
  }

  // Bye
  if (/bye|goodbye|see you|ok bye|cya/.test(msg)) {
    return `Thank you for visiting *Dezire More*! 🙏\n\nHappy shopping — looking forward to seeing you in our collections! 👗✨`;
  }

  // Default fallback
  return `I'm not sure I understood that 😊\n\nI can help you with:\n• 👗 *Outfit suggestions* for any occasion\n• 🥻 *Product categories* — Sarees, Lehengas, Kurtas & more\n• 🚚 *Shipping & delivery* info\n• 🔄 *Exchange policy*\n• 🏷️ *Offers & discounts*\n• 📏 *Size guidance*\n\nTry asking something like:\n*"What should I wear for a wedding?"* or *"Tell me about your sarees"* 😊`;
};

const formatMessage = (text) => {
  return text
    .replace(/\*(.*?)\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br/>");
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(true);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: `Namaste! 🙏 Welcome to *Dezire More*!\n\nI'm your personal style assistant. Ask me anything — outfit suggestions, shipping info, exchange policy, or just browse our collections!\n\nHow can I help you today? 😊`,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [unread, setUnread] = useState(1);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setUnread(0);
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen, messages]);

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg = {
      from: "user",
      text: trimmed,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const reply = getBotReply(trimmed);
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
      setIsTyping(false);
    }, 900);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickReplies = [
    "Wedding outfit?",
    "Saree collection",
    "Shipping info",
    "Exchange policy",
    "New arrivals",
    "Discount codes",
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Jost:wght@300;400;500&display=swap');

        .dz-chat-bubble {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 12px;
        }

        .dz-chat-toggle {
          width: 62px;
          height: 62px;
          border-radius: 50%;
          background: linear-gradient(135deg, #c9a84c, #e8c97a, #b8922e);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(201,168,76,0.5);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          position: relative;
        }

        .dz-chat-toggle:hover {
          transform: scale(1.07);
          box-shadow: 0 6px 28px rgba(201,168,76,0.65);
        }

        .dz-chat-toggle svg {
          width: 28px;
          height: 28px;
          color: #fff;
        }

        .dz-greeting-bubble {
          position: absolute;
          bottom: 74px;
          right: 0;
          background: #fff;
          border: 1px solid #ede7d9;
          border-radius: 16px;
          border-bottom-right-radius: 4px;
          padding: 10px 14px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.12);
          white-space: nowrap;
          animation: dz-fadeIn 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .dz-greeting-bubble::after {
          content: '';
          position: absolute;
          bottom: -8px;
          right: 18px;
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 8px solid #fff;
        }

        .dz-greeting-bubble p {
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          color: #2c3a2e;
          margin: 0;
          font-weight: 500;
        }

        .dz-greeting-bubble span {
          font-size: 18px;
        }

        .dz-greeting-close {
          background: #f0ebe0;
          border: none;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 10px;
          color: #8a7a5a;
          flex-shrink: 0;
          margin-left: 4px;
        }

        @keyframes dz-fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .dz-unread-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background: #c9a84c;
          color: #fff;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          font-size: 11px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Jost', sans-serif;
          border: 2px solid #fff;
        }

        .dz-chat-window {
          width: 360px;
          height: 520px;
          background: #faf9f6;
          border-radius: 20px;
          box-shadow: 0 12px 48px rgba(0,0,0,0.15);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: dz-slideUp 0.25s ease;
          border: 1px solid #e8e0d0;
        }

        @keyframes dz-slideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .dz-chat-header {
          background: linear-gradient(135deg, #2c4a3e, #3d6655);
          padding: 16px 18px;
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }

        .dz-chat-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #c9a84c, #e8c97a);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
          border: 2px solid rgba(255,255,255,0.2);
        }

        .dz-chat-header-info h4 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 16px;
          font-weight: 600;
          color: #fff;
          margin: 0;
          letter-spacing: 0.3px;
        }

        .dz-chat-header-info p {
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          color: rgba(255,255,255,0.7);
          margin: 2px 0 0;
          letter-spacing: 0.5px;
        }

        .dz-online-dot {
          width: 8px;
          height: 8px;
          background: #7ddc9a;
          border-radius: 50%;
          display: inline-block;
          margin-right: 5px;
          animation: dz-pulse 2s infinite;
        }

        @keyframes dz-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .dz-chat-close {
          margin-left: auto;
          background: rgba(255,255,255,0.15);
          border: none;
          cursor: pointer;
          color: #fff;
          border-radius: 50%;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }

        .dz-chat-close:hover {
          background: rgba(255,255,255,0.25);
        }

        .dz-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px 14px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          scroll-behavior: smooth;
        }

        .dz-messages::-webkit-scrollbar {
          width: 4px;
        }
        .dz-messages::-webkit-scrollbar-track { background: transparent; }
        .dz-messages::-webkit-scrollbar-thumb {
          background: #d4c9b0;
          border-radius: 4px;
        }

        .dz-msg {
          display: flex;
          gap: 8px;
          max-width: 88%;
        }

        .dz-msg.bot { align-self: flex-start; }
        .dz-msg.user { align-self: flex-end; flex-direction: row-reverse; }

        .dz-msg-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, #c9a84c, #e8c97a);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          flex-shrink: 0;
          align-self: flex-end;
        }

        .dz-msg-content {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .dz-msg-bubble {
          padding: 10px 14px;
          border-radius: 16px;
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          line-height: 1.6;
          word-break: break-word;
        }

        .dz-msg.bot .dz-msg-bubble {
          background: #fff;
          color: #2c3a2e;
          border-bottom-left-radius: 4px;
          border: 1px solid #ede7d9;
          box-shadow: 0 1px 4px rgba(0,0,0,0.05);
        }

        .dz-msg.user .dz-msg-bubble {
          background: linear-gradient(135deg, #2c4a3e, #3d6655);
          color: #fff;
          border-bottom-right-radius: 4px;
        }

        .dz-msg-time {
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          color: #b0a890;
          padding: 0 4px;
        }

        .dz-msg.user .dz-msg-time {
          text-align: right;
        }

        .dz-typing {
          display: flex;
          gap: 8px;
          align-self: flex-start;
          align-items: center;
        }

        .dz-typing-bubble {
          background: #fff;
          border: 1px solid #ede7d9;
          border-radius: 16px;
          border-bottom-left-radius: 4px;
          padding: 10px 14px;
          display: flex;
          gap: 4px;
          align-items: center;
        }

        .dz-typing-dot {
          width: 7px;
          height: 7px;
          background: #c9a84c;
          border-radius: 50%;
          animation: dz-bounce 1.2s infinite;
        }

        .dz-typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .dz-typing-dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes dz-bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }

        .dz-quick-replies {
          padding: 8px 14px;
          display: flex;
          gap: 6px;
          overflow-x: auto;
          flex-shrink: 0;
          border-top: 1px solid #ede7d9;
          background: #faf9f6;
        }

        .dz-quick-replies::-webkit-scrollbar { display: none; }

        .dz-quick-btn {
          white-space: nowrap;
          padding: 5px 12px;
          border-radius: 20px;
          border: 1px solid #c9a84c;
          background: transparent;
          color: #8a6f2e;
          font-family: 'Jost', sans-serif;
          font-size: 11.5px;
          cursor: pointer;
          transition: all 0.2s;
          flex-shrink: 0;
        }

        .dz-quick-btn:hover {
          background: #c9a84c;
          color: #fff;
        }

        .dz-chat-input-area {
          padding: 10px 14px 14px;
          display: flex;
          gap: 8px;
          border-top: 1px solid #ede7d9;
          background: #fff;
          flex-shrink: 0;
        }

        .dz-chat-input {
          flex: 1;
          border: 1px solid #ddd6c8;
          border-radius: 24px;
          padding: 9px 16px;
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          color: #2c3a2e;
          background: #faf9f6;
          outline: none;
          transition: border-color 0.2s;
          resize: none;
        }

        .dz-chat-input:focus {
          border-color: #c9a84c;
        }

        .dz-chat-input::placeholder {
          color: #b0a890;
        }

        .dz-send-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: linear-gradient(135deg, #2c4a3e, #4a7c68);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform 0.2s, box-shadow 0.2s;
          align-self: flex-end;
        }

        .dz-send-btn:hover {
          transform: scale(1.08);
          box-shadow: 0 3px 12px rgba(44,74,62,0.3);
        }

        .dz-send-btn svg {
          width: 16px;
          height: 16px;
          color: #fff;
        }

        @media (max-width: 420px) {
          .dz-chat-window {
            width: calc(100vw - 24px);
            height: 70vh;
            bottom: 90px;
            right: 12px;
          }
          .dz-chat-bubble {
            bottom: 16px;
            right: 16px;
          }
        }
      `}</style>

      <div className="dz-chat-bubble">
        {isOpen && (
          <div className="dz-chat-window">
            {/* Header */}
            <div className="dz-chat-header">
              <div className="dz-chat-avatar">🥻</div>
              <div className="dz-chat-header-info">
                <h4>Dezire More</h4>
                <p>
                  <span className="dz-online-dot" />
                  Style Assistant · Always here
                </p>
              </div>
              <button className="dz-chat-close" onClick={() => setIsOpen(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="dz-messages">
              {messages.map((msg, i) => (
                <div key={i} className={`dz-msg ${msg.from}`}>
                  {msg.from === "bot" && (
                    <div className="dz-msg-avatar">🥻</div>
                  )}
                  <div className="dz-msg-content">
                    <div
                      className="dz-msg-bubble"
                      dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}
                    />
                    <span className="dz-msg-time">{msg.time}</span>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="dz-typing">
                  <div className="dz-msg-avatar">🥻</div>
                  <div className="dz-typing-bubble">
                    <div className="dz-typing-dot" />
                    <div className="dz-typing-dot" />
                    <div className="dz-typing-dot" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <div className="dz-quick-replies">
              {quickReplies.map((qr, i) => (
                <button
                  key={i}
                  className="dz-quick-btn"
                  onClick={() => {
                    setInput(qr);
                    setTimeout(() => {
                      const userMsg = {
                        from: "user",
                        text: qr,
                        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                      };
                      setMessages((prev) => [...prev, userMsg]);
                      setInput("");
                      setIsTyping(true);
                      setTimeout(() => {
                        const reply = getBotReply(qr);
                        setMessages((prev) => [
                          ...prev,
                          {
                            from: "bot",
                            text: reply,
                            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                          },
                        ]);
                        setIsTyping(false);
                      }, 900);
                    }, 0);
                  }}
                >
                  {qr}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="dz-chat-input-area">
              <input
                className="dz-chat-input"
                placeholder="Ask me anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
              />
              <button className="dz-send-btn" onClick={sendMessage}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Greeting Bubble */}
        {!isOpen && showGreeting && (
          <div className="dz-greeting-bubble">
            <span>👗</span>
            <p>Hi! I'm your style assistant.<br/>How can I help you?</p>
            <button className="dz-greeting-close" onClick={(e) => { e.stopPropagation(); setShowGreeting(false); }}>✕</button>
          </div>
        )}

        {/* Toggle Button */}
        <button className="dz-chat-toggle" onClick={() => { setIsOpen(!isOpen); setShowGreeting(false); }}>
          {isOpen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
            </svg>
          )}
          {!isOpen && unread > 0 && (
            <span className="dz-unread-badge">{unread}</span>
          )}
        </button>
      </div>
    </>
  );
}