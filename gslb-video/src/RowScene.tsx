import React from "react";
import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { fontFamily } from "./fonts";
import { Journey } from "./Journey";

export type RowSceneProps = {
  step: number;
  group: string;
  position: string;
  title: string;
  note: string;
  lean: "azure" | "f5" | "even";
  a: string;
  b: string;
  fontSize: number;
};

const READ_CPS = 25;
const TRAVEL = 36;

const splitParagraphs = (text: string) =>
  text
    .split("\n\n")
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

const Paragraphs: React.FC<{
  paragraphs: string[];
  starts: number[];
  fontSize: number;
}> = ({ paragraphs, starts, fontSize }) => {
  const frame = useCurrentFrame();
  return (
    <>
      {paragraphs.map((p, i) => (
        <div
          key={i}
          style={{
            fontSize,
            lineHeight: 1.38,
            fontWeight: 500,
            color: "#e7ecf1",
            marginBottom: 22,
            opacity: interpolate(frame, [starts[i], starts[i] + 16], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(
              frame,
              [starts[i], starts[i] + 16],
              ["0px 16px", "0px 0px"],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              },
            ),
          }}
        >
          {p}
        </div>
      ))}
    </>
  );
};

export const RowScene: React.FC<RowSceneProps> = ({
  step,
  group,
  position,
  title,
  note,
  lean,
  a,
  b,
  fontSize,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const pa = splitParagraphs(a);
  const pb = splitParagraphs(b);
  const count = Math.max(pa.length, pb.length);

  // Paragraph n appears on both cards once the viewer has had time to read the earlier ones
  const FIRST = 34;
  const starts: number[] = [];
  let chars = 0;
  for (let i = 0; i < count; i++) {
    starts.push(FIRST + Math.round((chars / READ_CPS) * fps));
    chars += (pa[i]?.length ?? 0) + (pb[i]?.length ?? 0);
  }

  const chipAt = durationInFrames - TRAVEL - 66;
  const leaveAt = durationInFrames - TRAVEL;

  const winA = lean === "azure";
  const winB = lean === "f5";
  const verdict = interpolate(frame, [chipAt, chipAt + 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const enter = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const leave = interpolate(frame, [leaveAt, leaveAt + 18], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cardsEnter = interpolate(frame, [8, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const chipStyle =
    lean === "azure"
      ? { background: "#13283f", color: "#8cc0f4", border: "#5aa2ec", label: "Leans Azure" }
      : lean === "f5"
        ? { background: "#12301f", color: "#7fd7a8", border: "#4cc38a", label: "Leans 3rd Party GSLB" }
        : { background: "#222c37", color: "#98a5b3", border: "#98a5b3", label: "Even" };

  return (
    <AbsoluteFill name="Row scene" style={{ fontFamily }}>
      <Journey step={step} />

      <AbsoluteFill name="Content" style={{ opacity: leave }}>
        <Interactive.Div
          name="Group label"
          style={{
            position: "absolute",
            top: 52,
            left: 0,
            right: 0,
            textAlign: "center",
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#98a5b3",
            opacity: enter,
          }}
        >
          {group} · Point {position}
        </Interactive.Div>

        <Interactive.Div
          name="Row title"
          style={{
            position: "absolute",
            top: 92,
            left: 0,
            right: 0,
            textAlign: "center",
            fontSize: 62,
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: "#ffffff",
            opacity: enter,
            translate: interpolate(frame, [0, 18], ["0px 18px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        >
          {title}
        </Interactive.Div>

        {note !== "" ? (
          <Interactive.Div
            name="Row note"
            style={{
              position: "absolute",
              top: 176,
              left: 200,
              right: 200,
              textAlign: "center",
              fontSize: 28,
              lineHeight: 1.35,
              fontWeight: 400,
              fontStyle: "italic",
              color: "#b4bfcb",
              opacity: interpolate(frame, [10, 28], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            {note}
          </Interactive.Div>
        ) : null}

        <Interactive.Div
          name="Front Door card"
          style={{
            position: "absolute",
            top: 290,
            left: 110,
            width: 740,
            height: 630,
            boxSizing: "border-box",
            padding: "30px 36px",
            borderRadius: 22,
            background: "rgba(14, 32, 54, 0.9)",
            border: "2px solid #3b6ea5",
            overflow: "hidden",
            opacity: cardsEnter * (1 - (winB ? 0.3 * verdict : 0)),
            translate: interpolate(frame, [8, 30], ["0px 26px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        >
          <Interactive.Div
            name="Front Door glow"
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 20,
              border: "3px solid #8cc0f4",
              boxShadow: "inset 0 0 60px rgba(90,162,236,0.28), 0 0 50px rgba(90,162,236,0.5)",
              opacity: winA ? verdict : 0,
            }}
          />
          <div
            style={{
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#8cc0f4",
              paddingBottom: 18,
              marginBottom: 22,
              borderBottom: "1px solid rgba(140,192,244,0.35)",
            }}
          >
            ● Front Door + Traffic Manager
          </div>
          <Paragraphs paragraphs={pa} starts={starts} fontSize={fontSize} />
        </Interactive.Div>

        <Interactive.Div
          name="3rd Party GSLB card"
          style={{
            position: "absolute",
            top: 290,
            left: 1070,
            width: 740,
            height: 630,
            boxSizing: "border-box",
            padding: "30px 36px",
            borderRadius: 22,
            background: "rgba(14, 44, 32, 0.9)",
            border: "2px solid #2f8c62",
            overflow: "hidden",
            opacity: cardsEnter * (1 - (winA ? 0.3 * verdict : 0)),
            translate: interpolate(frame, [8, 30], ["0px 26px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        >
          <Interactive.Div
            name="GSLB glow"
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 20,
              border: "3px solid #7fd7a8",
              boxShadow: "inset 0 0 60px rgba(76,195,138,0.28), 0 0 50px rgba(76,195,138,0.5)",
              opacity: winB ? verdict : 0,
            }}
          />
          <div
            style={{
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#7fd7a8",
              paddingBottom: 18,
              marginBottom: 22,
              borderBottom: "1px solid rgba(127,215,168,0.35)",
            }}
          >
            ● 3rd Party GSLB
          </div>
          <Paragraphs paragraphs={pb} starts={starts} fontSize={fontSize} />
        </Interactive.Div>

        <Interactive.Div
          name="Verdict chip"
          style={{
            position: "absolute",
            top: 952,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            opacity: verdict,
            scale: interpolate(frame, [chipAt, chipAt + 14], [0.85, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              output: "perceptual-scale",
            }),
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "10px 30px",
              borderRadius: 999,
              fontSize: 32,
              fontWeight: 700,
              background: chipStyle.background,
              color: chipStyle.color,
              border: `2px solid ${chipStyle.border}`,
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 7,
                background: chipStyle.color,
              }}
            />
            {chipStyle.label}
          </div>
        </Interactive.Div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
