
import React, { useState } from "react";
import { Link } from "react-router";

const colors = {
  dark: "#171512",
  darkSoft: "#25211C",
  cream: "#F8F3EA",
  beige: "#E9DFD0",
  gold: "#C89B5D",
  goldLight: "#E3C58E",
  white: "#FFFFFF",
  muted: "#8F887F",
};

const dishes = [
  {
    name: "Truffle Pasta",
    description: "Handmade pasta, black truffle, parmesan & cream",
    price: "$24",
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Grilled Salmon",
    description: "Atlantic salmon, herbs, lemon butter & seasonal greens",
    price: "$29",
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Signature Steak",
    description: "Premium grilled beef, roasted vegetables & red wine jus",
    price: "$38",
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=85",
  },
];

const gallery = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=900&q=85",
];

function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    ["Menu", "#menu"],
    ["About", "#about"],
    ["Gallery", "#gallery"],
   
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(23,21,18,0.94)",
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid rgba(255,255,255,0.08)`,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <a
          href="#home"
          className="flex items-center gap-3"
          style={{ textDecoration: "none" }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              border: `1px solid ${colors.gold}`,
              color: colors.gold,
              fontFamily: "serif",
              fontSize: "1.1rem",
            }}
          >
            R
          </div>

          <div>
            <div
              style={{
                color: colors.white,
                fontFamily: "Georgia, serif",
                fontSize: "1.25rem",
                letterSpacing: "0.04em",
              }}
            >
              RÊVE
            </div>

            <div
              style={{
                color: colors.gold,
                fontSize: "0.55rem",
                letterSpacing: "0.3em",
              }}
            >
              RESTAURANT
            </div>
          </div>
        </a>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              style={{
                color: "#ddd5ca",
                textDecoration: "none",
                fontSize: "0.9rem",
                transition: "0.2s",
              }}
            >
              {label}
            </a>
          ))}

          <Link
            to="/signup"
            className="px-5 py-3"
            style={{
              background: colors.gold,
              color: colors.dark,
              textDecoration: "none",
              fontSize: "0.85rem",
              fontWeight: 600,
              borderRadius: "2px",
            }}
          >
            Sign In
          </Link>
        </nav>

        {/* Mobile button */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          style={{
            background: "none",
            border: "none",
            color: colors.white,
            fontSize: "1.7rem",
          }}
        >
          {open ? "×" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden px-6 pb-6 flex flex-col gap-5"
          style={{ background: colors.dark }}
        >
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              style={{
                color: colors.white,
                textDecoration: "none",
              }}
            >
              {label}
            </a>
          ))}

          <Link
            to="/signin"
            style={{
              background: colors.gold,
              color: colors.dark,
              padding: "0.8rem",
              textAlign: "center",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Sign In
          </Link>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center relative overflow-hidden"
      style={{ background: colors.dark }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(23,21,18,0.95) 0%, rgba(23,21,18,0.75) 45%, rgba(23,21,18,0.25) 100%), url('https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1800&q=90')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-32 w-full">
        <div className="max-w-2xl">

          <div
            className="flex items-center gap-3 mb-6"
            style={{
              color: colors.gold,
              fontSize: "0.75rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
            }}
          >
            <span style={{ width: 40, height: 1, background: colors.gold }} />
            Fine dining · Est. 2015
          </div>

          <h1
            style={{
              fontFamily: "Georgia, serif",
              color: colors.white,
              fontSize: "clamp(3.2rem, 7vw, 6.5rem)",
              lineHeight: 0.95,
              fontWeight: 400,
              marginBottom: "2rem",
            }}
          >
            Taste the
            <br />
            <span
              style={{
                color: colors.goldLight,
                fontStyle: "italic",
              }}
            >
              extraordinary.
            </span>
          </h1>

          <p
            style={{
              color: "#ddd5ca",
              fontSize: "1.05rem",
              lineHeight: 1.8,
              maxWidth: "550px",
              marginBottom: "2rem",
            }}
          >
            A modern dining experience where seasonal ingredients,
            thoughtful cooking and warm hospitality come together.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#menu"
              className="px-7 py-4"
              style={{
                background: colors.gold,
                color: colors.dark,
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Explore Our Menu
            </a>

            <a
              href="#contact"
              className="px-7 py-4"
              style={{
                border: "1px solid rgba(255,255,255,0.5)",
                color: colors.white,
                textDecoration: "none",
              }}
            >
              Find Us →
            </a>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-4 mt-10">
            <div style={{ color: colors.gold, fontSize: "1rem" }}>
              ★★★★★
            </div>

            <div
              style={{
                color: "#c9c1b7",
                fontSize: "0.8rem",
              }}
            >
              4.9 / 5 · 1,200+ happy guests
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{
          color: "#aaa29a",
          fontSize: "0.65rem",
          letterSpacing: "0.2em",
        }}
      >
        SCROLL TO DISCOVER
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section
      id="about"
      className="py-24"
      style={{ background: colors.cream }}
    >
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        <div>
          <p
            style={{
              color: colors.gold,
              fontSize: "0.7rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            Our Philosophy
          </p>

          <h2
            style={{
              fontFamily: "Georgia, serif",
              color: colors.dark,
              fontSize: "clamp(2.3rem, 5vw, 4rem)",
              fontWeight: 400,
              lineHeight: 1.1,
              marginBottom: "1.5rem",
            }}
          >
            Simple ingredients.
            <br />
            <i>Beautifully prepared.</i>
          </h2>

          <p
            style={{
              color: "#625b54",
              lineHeight: 1.9,
              maxWidth: "540px",
            }}
          >
            We believe great food doesn't need to be complicated.
            Our kitchen celebrates fresh seasonal produce, local
            suppliers and recipes inspired by classic European cooking.
          </p>

          <a
            href="#contact"
            style={{
              display: "inline-block",
              marginTop: "2rem",
              color: colors.dark,
              borderBottom: `1px solid ${colors.gold}`,
              paddingBottom: "0.4rem",
              textDecoration: "none",
              fontSize: "0.9rem",
            }}
          >
            Discover our story →
          </a>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=700&q=85"
            className="w-full h-72 object-cover mt-10"
            alt="Restaurant interior"
          />

          <img
            src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=700&q=85"
            className="w-full h-72 object-cover"
            alt="Restaurant dining"
          />
        </div>
      </div>
    </section>
  );
}

function FeaturedDishes() {
  return (
    <section
      id="menu"
      className="py-24"
      style={{ background: colors.dark }}
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <p
            style={{
              color: colors.gold,
              fontSize: "0.7rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              marginBottom: "0.8rem",
            }}
          >
            From Our Kitchen
          </p>

          <h2
            style={{
              color: colors.white,
              fontFamily: "Georgia, serif",
              fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
              fontWeight: 400,
            }}
          >
            Signature dishes
          </h2>

          <p
            style={{
              color: colors.muted,
              marginTop: "1rem",
            }}
          >
            A few favourites from our seasonal menu.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-7">
          {dishes.map((dish) => (
            <article
              key={dish.name}
              style={{
                background: colors.darkSoft,
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div className="overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              <div className="p-6">
                <div className="flex justify-between gap-4">
                  <h3
                    style={{
                      color: colors.white,
                      fontFamily: "Georgia, serif",
                      fontSize: "1.35rem",
                      fontWeight: 400,
                    }}
                  >
                    {dish.name}
                  </h3>

                  <span
                    style={{
                      color: colors.gold,
                      fontWeight: 600,
                    }}
                  >
                    {dish.price}
                  </span>
                </div>

                <p
                  style={{
                    color: colors.muted,
                    fontSize: "0.85rem",
                    lineHeight: 1.6,
                    marginTop: "0.7rem",
                  }}
                >
                  {dish.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#contact"
            className="inline-block px-7 py-4"
            style={{
              border: `1px solid ${colors.gold}`,
              color: colors.gold,
              textDecoration: "none",
              fontSize: "0.9rem",
            }}
          >
            View Full Menu
          </a>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section
      className="py-24"
      style={{ background: colors.beige }}
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-3 gap-12 text-center">

          <div>
            <div
              style={{
                fontSize: "2.2rem",
                marginBottom: "1rem",
              }}
            >
              ✦
            </div>

            <h3
              style={{
                fontFamily: "Georgia, serif",
                color: colors.dark,
                fontSize: "1.4rem",
                fontWeight: 400,
              }}
            >
              Seasonal Ingredients
            </h3>

            <p
              style={{
                color: "#70675e",
                fontSize: "0.9rem",
                lineHeight: 1.7,
                marginTop: "0.7rem",
              }}
            >
              Our menu changes with the seasons so every plate
              tastes fresh and exciting.
            </p>
          </div>

          <div>
            <div
              style={{
                fontSize: "2.2rem",
                marginBottom: "1rem",
              }}
            >
              ♨
            </div>

            <h3
              style={{
                fontFamily: "Georgia, serif",
                color: colors.dark,
                fontSize: "1.4rem",
                fontWeight: 400,
              }}
            >
              Crafted With Care
            </h3>

            <p
              style={{
                color: "#70675e",
                fontSize: "0.9rem",
                lineHeight: 1.7,
                marginTop: "0.7rem",
              }}
            >
              Every dish is prepared to order by our passionate
              kitchen team.
            </p>
          </div>

          <div>
            <div
              style={{
                fontSize: "2.2rem",
                marginBottom: "1rem",
              }}
            >
              ♡
            </div>

            <h3
              style={{
                fontFamily: "Georgia, serif",
                color: colors.dark,
                fontSize: "1.4rem",
                fontWeight: 400,
              }}
            >
              Warm Hospitality
            </h3>

            <p
              style={{
                color: "#70675e",
                fontSize: "0.9rem",
                lineHeight: 1.7,
                marginTop: "0.7rem",
              }}
            >
              Come for dinner, stay for the atmosphere and
              leave with memories.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section
      id="gallery"
      className="py-24"
      style={{ background: colors.cream }}
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex justify-between items-end mb-10">
          <div>
            <p
              style={{
                color: colors.gold,
                fontSize: "0.7rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
              }}
            >
              Inside Rêve
            </p>

            <h2
              style={{
                color: colors.dark,
                fontFamily: "Georgia, serif",
                fontSize: "2.7rem",
                fontWeight: 400,
                marginTop: "0.6rem",
              }}
            >
              The experience
            </h2>
          </div>

          <span
            className="hidden md:block"
            style={{
              color: "#82796f",
              fontSize: "0.8rem",
            }}
          >
            @reve.restaurant
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {gallery.map((image, index) => (
            <img
              key={image}
              src={image}
              alt={`Restaurant gallery ${index + 1}`}
              className="w-full object-cover"
              style={{
                height: index % 2 === 0 ? "380px" : "300px",
                marginTop: index % 2 === 0 ? "0" : "40px",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonial() {
  return (
    <section
      className="py-24"
      style={{ background: colors.dark }}
    >
      <div className="max-w-3xl mx-auto px-6 text-center">

        <div
          style={{
            color: colors.gold,
            fontSize: "1rem",
            letterSpacing: "0.2em",
          }}
        >
          ★★★★★
        </div>

        <blockquote
          style={{
            color: colors.white,
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            lineHeight: 1.35,
            fontWeight: 400,
            margin: "2rem 0",
          }}
        >
          “An unforgettable evening. Beautiful food, beautiful
          atmosphere and genuinely wonderful service.”
        </blockquote>

        <p
          style={{
            color: colors.gold,
            fontSize: "0.75rem",
            letterSpacing: "0.2em",
          }}
        >
          — EMMA WILLIAMS
        </p>
      </div>
    </section>
  );
}


function Footer() {
  return (
    <footer
      style={{
        background: "#a3a09a",
        borderTop: "1px solid #131212",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="flex flex-col md:flex-row justify-between gap-10">

          <div>
            <h2
              style={{
                color: colors.black,
                fontFamily: "Georgia, serif",
                fontSize: "1.6rem",
              }}
            >
              RÊVE
            </h2>

            <p
              style={{
                color: colors.black,
                fontSize: "0.9rem",
                marginTop: "0.5rem",
              }}
            >
              Fine dining. Beautiful moments.
            </p>
          </div>

          <div className="flex gap-8">
            <a
              href="#menu"
              style={{ color: colors.black, textDecoration: "none" }}
            >
              Menu
            </a>

            <a
              href="#about"
              style={{ color: colors.black, textDecoration: "none" }}
            >
              About
            </a>

            <a
              href="#gallery"
              style={{ color: colors.black, textDecoration: "none" }}
            >
              Gallery
            </a>

           
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid #746b61",
            marginTop: "3rem",
            paddingTop: "1.5rem",
            color: "#2e281f",
            fontSize: "0.7rem",
          }}
        >
          © 2026 Rêve Restaurant. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div
      style={{
        background: colors.cream,
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <Navbar />
      <Hero />
      <Intro />
      <FeaturedDishes />
      <Experience />
      <Gallery />
      <Testimonial />
      <Footer />
    </div>
  );
}

