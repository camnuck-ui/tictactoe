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

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill name="Intro scene" style={{ fontFamily }}>
      <Journey step={0} flyIn maskTop={470} maskBottom={720} />

      <AbsoluteFill
        name="Content"
        style={{
          opacity: interpolate(frame, [durationInFrames - 36, durationInFrames - 18], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >

      <Interactive.Div
        name="Front Door title"
        style={{
          position: "absolute",
          top: 110,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 84,
          fontWeight: 800,
          letterSpacing: "-0.025em",
          color: "#8cc0f4",
          opacity: interpolate(frame, [30, 52], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [30, 52], ["-80px 0px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        Front Door + Traffic Manager
      </Interactive.Div>

      <Interactive.Div
        name="Compared with"
        style={{
          position: "absolute",
          top: 220,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 44,
          fontWeight: 400,
          color: "#98a5b3",
          opacity: interpolate(frame, [48, 66], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        compared with
      </Interactive.Div>

      <Interactive.Div
        name="GSLB title"
        style={{
          position: "absolute",
          top: 290,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 84,
          fontWeight: 800,
          letterSpacing: "-0.025em",
          color: "#7fd7a8",
          opacity: interpolate(frame, [60, 82], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [60, 82], ["80px 0px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        3rd Party GSLB
      </Interactive.Div>

      <Interactive.Div
        name="Lede first sentence"
        style={{
          position: "absolute",
          top: 790,
          left: 260,
          right: 260,
          textAlign: "center",
          fontSize: 38,
          lineHeight: 1.4,
          fontWeight: 500,
          color: "#e7ecf1",
          opacity: interpolate(frame, [100, 118], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        A side-by-side view of the two options discussed in the Microsoft workshop.
      </Interactive.Div>

      <Interactive.Div
        name="Lede second sentence"
        style={{
          position: "absolute",
          top: 910,
          left: 260,
          right: 260,
          textAlign: "center",
          fontSize: 38,
          lineHeight: 1.4,
          fontWeight: 500,
          color: "#e7ecf1",
          opacity: interpolate(frame, [190, 208], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        Front Door and Traffic Manager do two different jobs, while 3rd Party GSLB does one of them.
      </Interactive.Div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
