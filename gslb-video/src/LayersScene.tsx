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

export const LayersScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const leave = interpolate(frame, [durationInFrames - 36, durationInFrames - 18], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill name="Layers scene" style={{ fontFamily }}>
      <Journey step={1} maskTop={250} maskBottom={930} />

      <AbsoluteFill name="Content" style={{ opacity: leave }}>
        <Interactive.Div
          name="Layers title"
          style={{
            position: "absolute",
            top: 70,
            left: 0,
            right: 0,
            textAlign: "center",
            fontSize: 62,
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: "#ffffff",
            opacity: interpolate(frame, [0, 18], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          Which job each product does
        </Interactive.Div>

        <Interactive.Div
          name="Front Door column header"
          style={{
            position: "absolute",
            top: 175,
            left: 110,
            width: 740,
            textAlign: "center",
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#8cc0f4",
            opacity: interpolate(frame, [8, 26], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          Front Door + Traffic Manager
        </Interactive.Div>
        <Interactive.Div
          name="GSLB column header"
          style={{
            position: "absolute",
            top: 175,
            left: 1070,
            width: 740,
            textAlign: "center",
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#7fd7a8",
            opacity: interpolate(frame, [8, 26], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          3rd Party GSLB
        </Interactive.Div>

        {/* Layer 1: picks the healthy region */}
        <Interactive.Div
          name="Layer 1 label"
          style={{
            position: "absolute",
            top: 238,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            opacity: interpolate(frame, [22, 40], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div
            style={{
              padding: "8px 28px",
              borderRadius: 999,
              background: "rgba(6, 9, 28, 0.92)",
              border: "1px solid #2b3744",
              fontSize: 32,
              fontWeight: 600,
              color: "#e7ecf1",
            }}
          >
            Picks the healthy region (DNS)
          </div>
        </Interactive.Div>

        <Interactive.Div
          name="Layer 1 Front Door box"
          style={{
            position: "absolute",
            top: 310,
            left: 110,
            width: 740,
            height: 160,
            boxSizing: "border-box",
            padding: "0 36px",
            display: "flex",
            alignItems: "center",
            borderRadius: 18,
            background: "rgba(19, 40, 63, 0.92)",
            border: "2.5px solid #5aa2ec",
            fontSize: 42,
            fontWeight: 700,
            lineHeight: 1.25,
            color: "#8cc0f4",
            opacity: interpolate(frame, [34, 54], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(frame, [34, 54], ["0px 24px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        >
          Traffic Manager (backend is public IP address)
        </Interactive.Div>

        <Interactive.Div
          name="Layer 1 GSLB box"
          style={{
            position: "absolute",
            top: 310,
            left: 1070,
            width: 740,
            height: 160,
            boxSizing: "border-box",
            padding: "0 36px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            borderRadius: 18,
            background: "rgba(18, 48, 31, 0.92)",
            border: "2.5px solid #4cc38a",
            color: "#7fd7a8",
            opacity: interpolate(frame, [40, 60], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(frame, [40, 60], ["0px 24px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        >
          <div style={{ fontSize: 42, fontWeight: 700, lineHeight: 1.25 }}>
            Internal GSLB (Self Hosted)
          </div>
          <div style={{ fontSize: 32, fontWeight: 500, lineHeight: 1.3, color: "#c3ecd6" }}>
            Can provide either public or private IP Addresses
          </div>
        </Interactive.Div>

        {/* Layer 2: sits in front of the app */}
        <Interactive.Div
          name="Layer 2 label"
          style={{
            position: "absolute",
            top: 628,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            opacity: interpolate(frame, [150, 168], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div
            style={{
              padding: "8px 28px",
              borderRadius: 999,
              background: "rgba(6, 9, 28, 0.92)",
              border: "1px solid #2b3744",
              fontSize: 32,
              fontWeight: 600,
              color: "#e7ecf1",
            }}
          >
            Sits in front of the app (proxy, WAF, TLS)
          </div>
        </Interactive.Div>

        <Interactive.Div
          name="Layer 2 Front Door box"
          style={{
            position: "absolute",
            top: 700,
            left: 110,
            width: 740,
            height: 160,
            boxSizing: "border-box",
            padding: "0 36px",
            display: "flex",
            alignItems: "center",
            borderRadius: 18,
            background: "rgba(19, 40, 63, 0.92)",
            border: "2.5px solid #5aa2ec",
            fontSize: 42,
            fontWeight: 700,
            color: "#8cc0f4",
            opacity: interpolate(frame, [162, 182], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(frame, [162, 182], ["0px 24px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        >
          Front Door
        </Interactive.Div>

        <Interactive.Div
          name="Layer 2 GSLB gap box"
          style={{
            position: "absolute",
            top: 700,
            left: 1070,
            width: 740,
            height: 160,
            boxSizing: "border-box",
            padding: "0 36px",
            display: "flex",
            alignItems: "center",
            borderRadius: 18,
            background: "rgba(6, 9, 28, 0.55)",
            border: "2.5px dashed #98a5b3",
            fontSize: 34,
            fontWeight: 500,
            lineHeight: 1.3,
            color: "#c4ced8",
            opacity: interpolate(frame, [172, 192], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(frame, [172, 192], ["0px 24px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        >
          Covered by existing zero trust solution - Zscaler
        </Interactive.Div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
