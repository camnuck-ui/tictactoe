import { Composition, Folder } from "remotion";
import { GslbComparison } from "./Video";
import { IntroScene } from "./IntroScene";
import { LayersScene } from "./LayersScene";
import { OutroScene } from "./OutroScene";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="GslbComparison"
        component={GslbComparison}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={7940}
      />
      <Folder name="Scenes">
        <Composition
          id="Intro"
          component={IntroScene}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={390}
        />
        <Composition
          id="Layers"
          component={LayersScene}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={345}
        />
        <Composition
          id="Outro"
          component={OutroScene}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={1200}
        />
      </Folder>
    </>
  );
};
