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

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill name="Outro scene" style={{ fontFamily }}>
      <Journey step={16} travel={false} fadeOutAt={0} />

      <Interactive.Div
        name="Outro title"
        style={{
          position: "absolute",
          top: 44,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 62,
          fontWeight: 800,
          letterSpacing: "-0.02em",
          color: "#ffffff",
          opacity: interpolate(frame, [0, 20], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        What the decision turns on
      </Interactive.Div>

      <div
        style={{
          position: "absolute",
          top: 150,
          left: 210,
          width: 1500,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
      <Interactive.Div
        name="Factor 1"
        style={{
          boxSizing: "border-box",
          padding: "20px 36px",
          borderRadius: 20,
          background: "rgba(8, 12, 34, 0.9)",
          border: "2px solid #3a4a66",
          opacity: interpolate(frame, [20, 40], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [20, 40], ["0px 24px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        <div style={{ fontSize: 30, fontWeight: 700, color: "#e0a93e", letterSpacing: "0.06em", textTransform: "uppercase" }}>
          1 · How users reach apps
        </div>
        <div style={{ marginTop: 10, fontSize: 34, lineHeight: 1.36, fontWeight: 500, color: "#e7ecf1" }}>
          Today ZPA is the front gate: users authenticate through Zscaler before they can reach anything.{" "}
          <span style={{ color: "#7fd7a8" }}>A 3rd Party GSLB keeps that model intact.</span>{" "}
          <span style={{ color: "#8cc0f4" }}>
            Front Door + Traffic Manager would put a public Microsoft edge in front of the apps instead, which bypasses that zero trust principle.
          </span>
        </div>
      </Interactive.Div>

      <Interactive.Div
        name="Factor 2"
        style={{
          boxSizing: "border-box",
          padding: "20px 36px",
          borderRadius: 20,
          background: "rgba(8, 12, 34, 0.9)",
          border: "2px solid #3a4a66",
          opacity: interpolate(frame, [330, 350], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [330, 350], ["0px 24px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        <div style={{ fontSize: 30, fontWeight: 700, color: "#e0a93e", letterSpacing: "0.06em", textTransform: "uppercase" }}>
          2 · Resilience across clouds
        </div>
        <div style={{ marginTop: 10, fontSize: 34, lineHeight: 1.36, fontWeight: 500, color: "#e7ecf1" }}>
          <span style={{ color: "#8cc0f4" }}>
            Front Door and Traffic Manager run inside Azure, so an Azure edge outage (as in October 2025) becomes a routing outage for every cloud behind it.
          </span>{" "}
          <span style={{ color: "#7fd7a8" }}>
            A 3rd Party GSLB, with at least one instance outside Azure, can route to Azure, AWS or on-premises, public or private.
          </span>
        </div>
      </Interactive.Div>

      <Interactive.Div
        name="Factor 3"
        style={{
          boxSizing: "border-box",
          padding: "20px 36px",
          borderRadius: 20,
          background: "rgba(8, 12, 34, 0.9)",
          border: "2px solid #3a4a66",
          opacity: interpolate(frame, [640, 660], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [640, 660], ["0px 24px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        <div style={{ fontSize: 30, fontWeight: 700, color: "#e0a93e", letterSpacing: "0.06em", textTransform: "uppercase" }}>
          3 · The trade-off is ownership
        </div>
        <div style={{ marginTop: 10, fontSize: 34, lineHeight: 1.36, fontWeight: 500, color: "#e7ecf1" }}>
          <span style={{ color: "#7fd7a8" }}>
            The GSLB option means a new vendor and contract, plus engineering time to run, patch and keep at least two instances in sync, a cost that won't show on the quote.
          </span>{" "}
          <span style={{ color: "#8cc0f4" }}>
            Front Door + Traffic Manager sits under the existing Microsoft agreement.
          </span>
        </div>
      </Interactive.Div>

      </div>

      <Interactive.Div
        name="Verdict"
        style={{
          position: "absolute",
          top: 930,
          left: 210,
          width: 1500,
          textAlign: "center",
          fontSize: 48,
          fontWeight: 800,
          letterSpacing: "-0.01em",
          color: "#7fd7a8",
          opacity: interpolate(frame, [940, 964, durationInFrames - 30, durationInFrames - 6], [0, 1, 1, 0.0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          scale: interpolate(frame, [940, 964], [0.92, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            output: "perceptual-scale",
          }),
        }}
      >
        On balance, the comparison favours a 3rd Party GSLB.
      </Interactive.Div>
    </AbsoluteFill>
  );
};
