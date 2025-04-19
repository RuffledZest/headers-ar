/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SplitType from "split-type"
import Lenis from "lenis"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Icon components
const MusicIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
  </svg>
)

const MovieIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" />
  </svg>
)

const GhostIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C7.03 2 3 6.03 3 11v8h6v-2h6v2h6v-8c0-4.97-4.03-9-9-9zm-3 8c-.83 0-1.5-.67-1.5-1.5S8.17 7 9 7s1.5.67 1.5 1.5S9.83 10 9 10zm6 0c-.83 0-1.5-.67-1.5-1.5S14.17 7 15 7s1.5.67 1.5 1.5S15.83 10 15 10z" />
  </svg>
)

const ShoppingIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm0 10c-2.76 0-5-2.24-5-5h2c0 1.66 1.34 3 3 3s3-1.34 3-3h2c0 2.76-2.24 5-5 5z" />
  </svg>
)

const TshirtIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.94 5.82L19.19 3.5 12 7.77 4.81 3.5 2.06 5.82 4.4 9.39 2 14h2v6h16v-6h2l-2.4-4.61 2.34-3.57zM16 18H8v-4h8v4z" />
  </svg>
)

export default function AnimatedHeader() {
  // Refs for DOM elements
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const iconsContainerRef = useRef<HTMLDivElement>(null)
  const finalTextRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)

  // Refs for icons
  const iconRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ]

  // Icons data with their colors and shapes
  const icons = [
    { Icon: MusicIcon, color: "#8B5CF6", shape: "circle" },
    { Icon: MovieIcon, color: "#10B981", shape: "square" },
    { Icon: GhostIcon, color: "#F97316", shape: "hexagon" },
    { Icon: ShoppingIcon, color: "#FBBF24", shape: "square" },
    { Icon: TshirtIcon, color: "#3B82F6", shape: "circle" },
  ]

  useEffect(() => {
    // Initialize smooth scrolling with Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    })

    // Integrate Lenis with requestAnimationFrame
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Split text for character animations
    if (titleRef.current) {
      const splitTitle = new SplitType(titleRef.current, { types: "chars" })
      const chars = splitTitle.chars || []

      // Initial animation for title characters - now coming from bottom with spring effect
      gsap.fromTo(
        chars,
        {
          opacity: 0,
          y: 200,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.03,
          duration: 1.2,
          ease: "elastic.out(1, 0.5)",
          delay: 0.3,
        },
      )
    }

    // Initial fade-in animations
    gsap.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 1.5, ease: "power3.out" },
    )

    gsap.fromTo(
      buttonRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 1.7, ease: "power3.out" },
    )

    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, delay: 1.2, ease: "power3.out" },
    )

    // Set initial state for icons container
    gsap.set(iconsContainerRef.current, {
      position: "relative",
      bottom: 0,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: "240px",
    })

    // Initial animation for icons - now aligned horizontally with space-between
    iconRefs.forEach((iconRef, index) => {
      if (iconRef.current) {
        // Set initial positions - horizontally aligned with larger size
        gsap.set(iconRef.current, {
          position: "relative",
          display: "inline-block",
          margin: "0",
          width: "200px", // Increased size
          height: "200px", // Increased size
          scale: 1,
          opacity: 0,
        })

        // Fade in icons
        gsap.to(iconRef.current, {
          opacity: 1,
          duration: 0.8,
          delay: 1.8 + index * 0.1,
          ease: "power2.out",
        })

        // Remove blinking animation
      }
    })

    // Header scroll animation
    if (headerRef.current && containerRef.current) {
      // Create a timeline for the header transformation
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=3000", // Increased for more precise control
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      })

      // Header background change
      headerTl.to(headerRef.current, {
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        backdropFilter: "blur(10px)",
        height: "80px",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        duration: 0.3,
      }, "start")

      // Title animation - move up and fade out
      if (titleRef.current) {
        headerTl.to(
          titleRef.current,
          {
            opacity: 0,
            y: -100,
            duration: 0.5,
            ease: "power2.in",
          },
          "start"
        )
      }

      // Hide subtitle and button
      headerTl.to(
        [subtitleRef.current, buttonRef.current],
        {
          opacity: 0,
          y: -50,
          duration: 0.3,
        },
        "start"
      )

      // Phase 1: Move icons to center in a wave-like sequence (one after another)
      iconRefs.forEach((iconRef, index) => {
        headerTl.to(
          iconRef.current,
          {
            y: "-30vh", // Move upward to center of viewport
            duration: 0.5,
            ease: "elastic.out(1, 0.3)", // Springy movement
          },
          `moveToCenter+=${index * 0.1}` // Staggered timing for wave effect
        )
      })

      // Phase 2: After all icons reach center, THEN shrink them with further scrolling
      iconRefs.forEach((iconRef) => {
        headerTl.to(
          iconRef.current,
          {
            scale: 0.5, // Shrink to half size
            duration: 0.4,
            ease: "power2.inOut",
          },
          "shrinkIcons"
        )
      })

      // Phase 3: Change background to light theme AFTER icons shrink
      headerTl.to(
        containerRef.current,
        {
          backgroundColor: "#f9f9f9",
          duration: 0.5,
        },
        "backgroundChange"
      )

      // Prepare text elements for sliding animation
      const textElements = finalTextRef.current ? finalTextRef.current.querySelectorAll("div") : []
      
      // Set initial state for text divs - invisible by matching background color
      gsap.set(textElements, {
        opacity: 0,
        x: (_, i) => i % 2 === 0 ? -300 : 300, // Text comes from alternating sides
        color: "#f9f9f9", // Initially same as background (invisible)
      })
      
      // Phase 4: Move icons to their final positions between text
      
      // Get specific references to the text divs
      const textDivs = Array.from(textElements);
      
      // Custom positioning for each icon based on the text it needs to accompany
      
      // First icon - next to "That" before "must-see movie"
      if (iconRefs[0].current) {
        headerTl.to(
          iconRefs[0].current,
          {
            x: 140, // Move right 
            y: "-15vh", // Keep in the upper part
            scale: 0.6,
            duration: 0.7,
            ease: "power1.out",
          },
          "positionIcons"
        )
      }
      
      // Second icon - between "Your top" and "interests"
      if (iconRefs[1].current) {
        headerTl.to(
          iconRefs[1].current,
          {
            x: -120,
            y: "5vh", // Move down for the second row
            scale: 0.6,
            duration: 0.7,
            ease: "power1.out",
          },
          "positionIcons"
        )
      }
      
      // Third icon - between lines
      if (iconRefs[2].current) {
        headerTl.to(
          iconRefs[2].current,
          {
            x: 0,
            y: "10vh", // Move down for the third row
            scale: 0.6,
            duration: 0.7,
            ease: "power1.out",
          },
          "positionIcons"
        )
      }
      
      // Fourth icon - before "habits"
      if (iconRefs[3].current) {
        headerTl.to(
          iconRefs[3].current,
          {
            x: 120,
            y: "10vh", // Same row as third
            scale: 0.6,
            duration: 0.7,
            ease: "power1.out",
          },
          "positionIcons"
        )
      }
      
      // Fifth icon - left of "Songs"
      if (iconRefs[4].current) {
        headerTl.to(
          iconRefs[4].current,
          {
            x: -170,
            y: "-25vh", // Move up
            scale: 0.6,
            duration: 0.7,
            ease: "power1.out",
          },
          "positionIcons"
        )
      }
      
      // Animate text sliding in and changing color
      textDivs.forEach((textDiv, i) => {
        // Text slides in from alternating sides
        headerTl.to(
          textDiv,
          {
            opacity: 1,
            x: 0,
            color: "#121212", // Change from background color to visible black
            duration: 0.8,
            ease: "power2.out",
          },
          `textReveal+=${i * 0.1}` // Staggered for a better effect
        )
      })

      // Final phase - hide original icons container after all positioning is done
      headerTl.to(
        iconsContainerRef.current,
        {
          opacity: 0,
          duration: 0.3,
        },
        "finalReveal"
      )
      
      headerTl.to(
        finalTextRef.current,
        {
          opacity: 1,
          duration: 0.5,
        },
        "finalReveal"
      )

      // Set up the proper sequence of animations
      headerTl.addLabel("start", 0);
      headerTl.addLabel("moveToCenter", 0.2); // First move icons to center
      headerTl.addLabel("shrinkIcons", 0.5);  // Then shrink them
      headerTl.addLabel("backgroundChange", 0.7); // Then change background
      headerTl.addLabel("positionIcons", 0.9); // Position icons into text
      headerTl.addLabel("textReveal", 1.1); // Then reveal text
      headerTl.addLabel("finalReveal", 1.5);
    }

    // Clean up
    return () => {
      lenis.destroy()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      gsap.killTweensOf("*")
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        minHeight: "300vh",
        width: "100%",
        backgroundColor: "#121212",
        overflow: "hidden",
        transition: "background-color 0.5s ease",
      }}
    >
      {/* Navigation */}
      <div
        ref={headerRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100px",
          zIndex: 50,
          backgroundColor: "rgba(0, 0, 0, 0)",
          transition: "background-color 0.3s ease, height 0.3s ease",
        }}
      >
        <div
          ref={navRef}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "20px 24px",
            height: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                backgroundColor: "#FF5733",
              }}
            >
              <span style={{ color: "white", fontWeight: "bold" }}>N</span>
            </div>
            <div style={{ marginLeft: "16px", display: "flex", gap: "16px" }}>
              <button
                style={{
                  padding: "8px 16px",
                  borderRadius: "9999px",
                  fontSize: "14px",
                  fontWeight: "500",
                  backgroundColor: "#333",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Project
              </button>
              <button
                style={{
                  padding: "8px 16px",
                  borderRadius: "9999px",
                  fontSize: "14px",
                  fontWeight: "500",
                  backgroundColor: "transparent",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Navigators
              </button>
              <button
                style={{
                  padding: "8px 16px",
                  borderRadius: "9999px",
                  fontSize: "14px",
                  fontWeight: "500",
                  backgroundColor: "transparent",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Rewards
              </button>
              <button
                style={{
                  padding: "8px 16px",
                  borderRadius: "9999px",
                  fontSize: "14px",
                  fontWeight: "500",
                  backgroundColor: "transparent",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                FAQ
              </button>
            </div>
          </div>
          <button
            style={{
              padding: "8px 24px",
              borderRadius: "9999px",
              fontSize: "14px",
              fontWeight: "500",
              backgroundColor: "#4ADE80",
              color: "black",
              border: "none",
              cursor: "pointer",
            }}
          >
            Launch Game
          </button>
        </div>
      </div>

      {/* First section - Title and icons */}
      <div
        style={{
          position: "relative",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "80px",
            position: "relative",
          }}
        >
          <h1
            ref={titleRef}
            style={{
              fontSize: "7rem",
              fontWeight: "900",
              letterSpacing: "-0.02em",
              color: "white",
              marginBottom: "32px",
              position: "relative",
              width: "100%",
              textAlign: "center",
            }}
          >
            Your data runs
            <br />
            the world
          </h1>
          <p
            ref={subtitleRef}
            style={{
              fontSize: "1.25rem",
              color: "white",
              opacity: 0,
            }}
          >
            Start earning from it today.
          </p>
          <button
            ref={buttonRef}
            style={{
              marginTop: "32px",
              padding: "12px 32px",
              borderRadius: "9999px",
              backgroundColor: "#4ADE80",
              color: "black",
              display: "inline-flex",
              alignItems: "center",
              border: "none",
              cursor: "pointer",
              opacity: 0,
            }}
          >
            <span style={{ marginRight: "8px" }}>🌈</span>
            Download Rewards Extension
          </button>
        </div>

        {/* Icons container - now a flex layout */}
        <div
          ref={iconsContainerRef}
          style={{
            position: "relative",
            gap: "20px",
            width: "100%",
            maxWidth: "1200px",
            height: "240px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
          }}
        >
          {icons.map((icon, index) => {
            const { Icon, color, shape } = icon
            let shapeStyle = {}

            if (shape === "circle") {
              shapeStyle = {
                borderRadius: "50%",
              }
            } else if (shape === "square") {
              shapeStyle = {
                borderRadius: "16px",
              }
            } else if (shape === "hexagon") {
              shapeStyle = {
                clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
              }
            }

            return (
              <div
                key={index}
                ref={iconRefs[index]}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "120px",
                  height: "120px",
                  backgroundColor: color,
                  margin: "0",
                  ...shapeStyle,
                }}
              >
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                    color: "black",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    
                    borderRadius: "50%",
                    margin: "0",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <Icon />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Final section - Text with integrated icons */}
      <div
        style={{
          position: "relative",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              marginBottom: "64px",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "500",
                color: "#121212",
              }}
            >
              Here's a fun fact:
              <br />
              Today, you are the product
            </h2>
          </div>

          <div
            ref={finalTextRef}
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              fontSize: "3.75rem",
              fontWeight: "900",
              lineHeight: "1.2",
              opacity: 0,
              transform: "translateY(30px)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ color: "#121212" }}>Your favorite</span>
              <div style={{ display: "inline-block", margin: "0 16px" }}>
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    backgroundColor: "#8B5CF6",
                  }}
                >
                  <div style={{ width: "40px", height: "40px", color: "black" }}>
                    <MusicIcon />
                  </div>
                </div>
              </div>
              <span style={{ color: "#121212" }}>songs.</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", marginTop: "16px" }}>
              <span style={{ color: "#121212" }}>That</span>
              <div style={{ display: "inline-block", margin: "0 16px" }}>
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "16px",
                    backgroundColor: "#10B981",
                  }}
                >
                  <div style={{ width: "40px", height: "40px", color: "black" }}>
                    <MovieIcon />
                  </div>
                </div>
              </div>
              <span style={{ color: "#121212" }}>must-see movie.</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", marginTop: "16px" }}>
              <span style={{ color: "#121212" }}>Your top</span>
              <div style={{ display: "inline-block", margin: "0 16px" }}>
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                    backgroundColor: "#F97316",
                  }}
                >
                  <div style={{ width: "40px", height: "40px", color: "black" }}>
                    <GhostIcon />
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", marginTop: "16px" }}>
              <div style={{ display: "inline-block", marginRight: "16px" }}>
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "16px",
                    backgroundColor: "#FBBF24",
                  }}
                >
                  <div style={{ width: "40px", height: "40px", color: "black" }}>
                    <ShoppingIcon />
                  </div>
                </div>
              </div>
              <div style={{ display: "inline-block", marginRight: "16px" }}>
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    backgroundColor: "#3B82F6",
                  }}
                >
                  <div style={{ width: "40px", height: "40px", color: "black" }}>
                    <TshirtIcon />
                  </div>
                </div>
              </div>
              <span style={{ color: "#121212" }}>habits.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating action button */}
      <div
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 50,
        }}
      >
        <div style={{ position: "relative" }}>
          <button
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              backgroundColor: "#FF5733",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            <span>🔔</span>
          </button>
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              backgroundColor: "black",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "10px",
            }}
          >
            Off
          </div>
        </div>
      </div>
    </div>
  )
}
