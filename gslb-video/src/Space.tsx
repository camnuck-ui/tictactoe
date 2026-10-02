import React from "react";
import { AbsoluteFill, random, useCurrentFrame, useVideoConfig } from "remotion";

type Star = {
  x: number;
  y: number;
  r: number;
  speed: number;
  phase: number;
  color: string;
};

const WRAP = 1100;

const STARS: Star[] = new Array(260).fill(0).map((_, i) => {
  const layer = random(`layer-${i}`);
  const tint = random(`tint-${i}`);
  return {
    x: random(`x-${i}`) * 1920,
    y: random(`y-${i}`) * WRAP,
    r:
      layer < 0.6
        ? 0.8 + random(`r-${i}`) * 0.7
        : layer < 0.9
          ? 1.5 + random(`r-${i}`)
          : 2.4 + random(`r-${i}`) * 1.2,
    speed: layer < 0.6 ? 7 : layer < 0.9 ? 16 : 30,
    phase: random(`p-${i}`) * Math.PI * 2,
    color: tint < 0.18 ? "#a9ccff" : tint < 0.3 ? "#ffe6b8" : "#ffffff",
  };
});

// Distant "shooting stars" that cross the sky every few seconds
const STREAK_PERIOD = 390;
const STREAK_LENGTH = 22;

export const Space: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const streakCycle = Math.floor(frame / STREAK_PERIOD);
  const streakFrame = frame % STREAK_PERIOD;
  const streakX = 300 + random(`streak-x-${streakCycle}`) * 1300;
  const streakY = 60 + random(`streak-y-${streakCycle}`) * 400;
  const streakProgress = streakFrame / STREAK_LENGTH;

  return (
    <AbsoluteFill name="Space" style={{ backgroundColor: "#04050d" }}>
      <AbsoluteFill
        name="Deep space gradient"
        style={{
          background:
            "radial-gradient(ellipse at 50% 120%, #14204a 0%, #0a1030 40%, #04050d 80%)",
        }}
      />
      <AbsoluteFill
        name="Nebula violet"
        style={{
          top: -100,
          left: -100,
          right: -100,
          bottom: -100,
          width: "auto",
          height: "auto",
          background:
            "radial-gradient(ellipse 900px 600px at 18% 22%, rgba(120,70,200,0.28), transparent 70%)",
          translate: `${Math.sin(t / 5) * 40}px ${Math.cos(t / 6) * 24}px`,
        }}
      />
      <AbsoluteFill
        name="Nebula teal"
        style={{
          top: -100,
          left: -100,
          right: -100,
          bottom: -100,
          width: "auto",
          height: "auto",
          background:
            "radial-gradient(ellipse 1000px 650px at 85% 78%, rgba(30,160,170,0.22), transparent 70%)",
          translate: `${Math.cos(t / 7) * 50}px ${Math.sin(t / 5) * 30}px`,
        }}
      />
      <AbsoluteFill
        name="Nebula magenta"
        style={{
          top: -100,
          left: -100,
          right: -100,
          bottom: -100,
          width: "auto",
          height: "auto",
          background:
            "radial-gradient(ellipse 700px 500px at 72% 14%, rgba(200,60,140,0.16), transparent 70%)",
          translate: `${Math.sin(t / 6) * 30}px ${Math.sin(t / 8) * 30}px`,
        }}
      />
      <AbsoluteFill
        name="Distant planet"
        style={{
          top: -100,
          left: -100,
          right: -100,
          bottom: -100,
          width: "auto",
          height: "auto",
          background:
            "radial-gradient(circle 330px at 4% 96%, #2b3a78 0%, #172050 55%, rgba(10,14,40,0) 72%)",
          opacity: 0.55,
          translate: `0px ${Math.sin(t / 9) * 8}px`,
        }}
      />
      <AbsoluteFill name="Stars">
        <svg width={1920} height={1080} viewBox="0 0 1920 1080">
          {STARS.map((s, i) => {
            const y = (((s.y - s.speed * t) % WRAP) + WRAP) % WRAP - 10;
            const twinkle = 0.55 + 0.45 * Math.sin(t * (1 + s.speed / 20) + s.phase);
            return (
              <circle
                key={i}
                cx={s.x}
                cy={y}
                r={s.r}
                fill={s.color}
                opacity={twinkle}
              />
            );
          })}
        </svg>
      </AbsoluteFill>
      {streakProgress < 1.6 ? (
        <AbsoluteFill name="Shooting star">
          <svg width={1920} height={1080} viewBox="0 0 1920 1080">
            <defs>
              <linearGradient id="streak" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="1" stopColor="#ffffff" stopOpacity="0.95" />
              </linearGradient>
            </defs>
            <g
              transform={`translate(${streakX + streakProgress * 520} ${streakY + streakProgress * 260}) rotate(26)`}
              opacity={Math.max(0, 1 - Math.abs(streakProgress - 0.8))}
            >
              <rect x={-170} y={-1.5} width={170} height={3} fill="url(#streak)" />
            </g>
          </svg>
        </AbsoluteFill>
      ) : null}
    </AbsoluteFill>
  );
};
