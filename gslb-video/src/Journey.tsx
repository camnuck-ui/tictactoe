import React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

// World-space distance between two consecutive stations (one station per scene)
export const PITCH = 900;
export const LAST_STEP = 16;

const CX = 960;
const SHIP_Y = 540;
const TRAVEL_FRAMES = 36;

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const smooth = (v: number) => {
  const t = clamp01(v);
  return t * t * (3 - 2 * t);
};
// 0 at the launch point, 1 once the two routes have fully split
const spread = (wy: number) => smooth((wy + 800) / 800);

// x position of a route at a given world y. side -1 = Front Door (blue), +1 = GSLB (green)
const pathX = (wy: number, side: -1 | 1) =>
  CX +
  side * 52 * spread(wy) +
  17 * spread(wy) * Math.sin(wy / 170 + (side === -1 ? 0 : 2.2));

const buildPath = (from: number, to: number, side: -1 | 1, camY: number) => {
  let d = "";
  for (let wy = from; wy <= to; wy += 20) {
    d += `${d === "" ? "M" : "L"} ${pathX(wy, side).toFixed(1)} ${(wy - camY + SHIP_Y).toFixed(1)} `;
  }
  return d;
};

type JourneyProps = {
  step: number;
  flyIn?: boolean;
  travel?: boolean;
  maskTop?: number;
  maskBottom?: number;
  fadeOutAt?: number;
};

export const Journey: React.FC<JourneyProps> = ({
  step,
  flyIn = false,
  travel = true,
  maskTop = 320,
  maskBottom = 910,
  fadeOutAt,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const camAt = (f: number) => {
    const arrive = flyIn
      ? interpolate(f, [0, 90], [-800, 0], {
          easing: Easing.bezier(0.16, 1, 0.3, 1),
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 0;
    const leave = travel
      ? interpolate(f, [durationInFrames - TRAVEL_FRAMES, durationInFrames], [0, PITCH], {
          easing: Easing.bezier(0.65, 0, 0.35, 1),
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 0;
    return step * PITCH + arrive + leave;
  };

  const camY = camAt(frame);
  const speed = Math.abs(camY - camAt(frame - 1));
  const flame = 10 + 90 * Math.min(1, speed / 28);

  const pulseStart = flyIn ? 90 : 0;
  const pulse = interpolate(frame, [pulseStart, pulseStart + 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const layerOpacity =
    fadeOutAt === undefined
      ? 1
      : interpolate(frame, [fadeOutAt, fadeOutAt + 24], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

  const firstStation = Math.max(0, Math.floor((camY - 700) / PITCH));
  const lastStation = Math.min(LAST_STEP, Math.ceil((camY + 700) / PITCH));
  const stations: number[] = [];
  for (let k = firstStation; k <= lastStation; k++) stations.push(k);

  const routes = [
    { side: -1 as const, color: "#5aa2ec", ink: "#8cc0f4" },
    { side: 1 as const, color: "#4cc38a", ink: "#7fd7a8" },
  ];

  const mask = `linear-gradient(to bottom, transparent ${maskTop - 70}px, black ${maskTop}px, black ${maskBottom}px, transparent ${maskBottom + 50}px)`;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: layerOpacity,
        maskImage: mask,
        WebkitMaskImage: mask,
      }}
    >
      <svg width={1920} height={1080} viewBox="0 0 1920 1080">
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
        </defs>

        {/* Launch star where the two routes split */}
        {camY < 400 ? (
          <g transform={`translate(${CX} ${-800 - camY + SHIP_Y})`}>
            <circle r={30} fill="#9cc4ff" opacity={0.35} filter="url(#glow)" />
            <circle r={9} fill="#ffffff" />
          </g>
        ) : null}

        {routes.map(({ side, color, ink }) => {
          const past = buildPath(camY - 700, camY, side, camY);
          const future = buildPath(camY, camY + 700, side, camY);
          const shipX = pathX(camY, side);
          const dx = pathX(camY + 4, side) - pathX(camY - 4, side);
          const angle = (Math.atan2(-dx, 8) * 180) / Math.PI;
          return (
            <g key={side}>
              <path d={past} stroke={color} strokeWidth={14} fill="none" opacity={0.5} filter="url(#glow)" />
              <path d={past} stroke={ink} strokeWidth={4} fill="none" strokeLinecap="round" />
              <path
                d={future}
                stroke={color}
                strokeWidth={4}
                fill="none"
                strokeLinecap="round"
                strokeDasharray="1 14"
                opacity={0.7}
              />

              {stations.map((k) => {
                const wy = k * PITCH;
                const sy = wy - camY + SHIP_Y;
                const visited = wy < camY - 4;
                return (
                  <g key={k} transform={`translate(${pathX(wy, side)} ${sy})`}>
                    <circle r={30} fill="none" stroke={color} strokeWidth={6} opacity={0.35} filter="url(#glow)" />
                    <circle
                      r={30}
                      fill={visited ? color : "#070a1c"}
                      fillOpacity={visited ? 0.25 : 0.8}
                      stroke={ink}
                      strokeWidth={3}
                    />
                    <circle r={7} fill={ink} />
                  </g>
                );
              })}

              {/* Arrival pulse */}
              {pulse > 0 && pulse < 1 ? (
                <circle
                  cx={shipX}
                  cy={SHIP_Y}
                  r={30 + 70 * pulse}
                  fill="none"
                  stroke={ink}
                  strokeWidth={3}
                  opacity={(1 - pulse) * 0.8}
                />
              ) : null}

              {/* Ship */}
              <g transform={`translate(${shipX} ${SHIP_Y}) rotate(${angle})`}>
                <path
                  d={`M -6 -6 L 0 ${-6 - flame} L 6 -6 Z`}
                  fill={ink}
                  opacity={0.75}
                  filter="url(#glow)"
                />
                <path d="M 0 17 L 11 -9 L 0 -3 L -11 -9 Z" fill="#ffffff" />
                <path d="M 0 17 L 11 -9 L 0 -3 L -11 -9 Z" fill={color} opacity={0.35} filter="url(#glow)" />
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
