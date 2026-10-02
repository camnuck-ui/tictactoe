import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { IntroScene } from "./IntroScene";
import { LayersScene } from "./LayersScene";
import { OutroScene } from "./OutroScene";
import { RowScene } from "./RowScene";
import { Space } from "./Space";

export const GslbComparison: React.FC = () => {
  return (
    <AbsoluteFill name="Video">
      <Space />
      <Series>
      <Series.Sequence name="Intro" durationInFrames={390}>
        <IntroScene />
      </Series.Sequence>
      <Series.Sequence name="Layers" durationInFrames={345}>
        <LayersScene />
      </Series.Sequence>
      <Series.Sequence name={"Architecture 1 · What it does"} durationInFrames={520}>
        <RowScene
          step={2}
          group={"Architecture"}
          position={"1 of 5"}
          title={"What it does"}
          note={""}
          lean={"f5"}
          a={"Front Door is a proxy on Microsoft's global edge: users connect to it, and it connects to your app. Traffic Manager only answers DNS lookups.\n\nUsing with this would by-pass our zero-trust principle with Zscaler."}
          b={"Answers DNS lookups with the address of the healthy site. Users then connect straight to the app."}
          fontSize={38}
        />
      </Series.Sequence>
      <Series.Sequence name={"Architecture 2 · The proxy layer (WAF, TLS, app delivery)"} durationInFrames={505}>
        <RowScene
          step={3}
          group={"Architecture"}
          position={"2 of 5"}
          title={"The proxy layer (WAF, TLS, app delivery)"}
          note={"Open question: does the 3rd Party GSLB quote include anything beyond DNS-based load balancing, or is the proxy/WAF layer left entirely to Zscaler?"}
          lean={"f5"}
          a={"Included. Front Door provides WAF, TLS and DDoS protection at Microsoft's global edge.\n\nThis would by-pass our zero-trust principle."}
          b={"GSLB covers the DNS side and Zscaler will cover the security aspects (maintains our zero-trust principle)"}
          fontSize={38}
        />
      </Series.Sequence>
      <Series.Sequence name={"Architecture 3 · Where the routing \"brain\" runs"} durationInFrames={630}>
        <RowScene
          step={4}
          group={"Architecture"}
          position={"3 of 5"}
          title={"Where the routing \"brain\" runs"}
          note={"Open question: where would the 3rd Party GSLB instances run?"}
          lean={"f5"}
          a={"Inside Azure, as a global Microsoft service. An Azure edge problem is also a routing problem, as the October 2025 Front Door outages showed.\n\nIf we have multi-cloud and front door goes down, then we are down entirely."}
          b={"GSLB instances you deploy and run yourselves. Only independent of Azure if at least one instance runs outside Azure.\n\nThis will meet multi-cloud architecture."}
          fontSize={38}
        />
      </Series.Sequence>
      <Series.Sequence name={"Architecture 4 · Routing to AWS (multi-cloud) or on-premises"} durationInFrames={300}>
        <RowScene
          step={5}
          group={"Architecture"}
          position={"4 of 5"}
          title={"Routing to AWS (multi-cloud) or on-premises"}
          note={""}
          lean={"f5"}
          a={"Yes, for public endpoints. No, for private ones."}
          b={"Yes, public or private, anywhere it can health-check."}
          fontSize={38}
        />
      </Series.Sequence>
      <Series.Sequence name={"Architecture 5 · Service-to-service after failover"} durationInFrames={340}>
        <RowScene
          step={6}
          group={"Architecture"}
          position={"5 of 5"}
          title={"Service-to-service after failover"}
          note={""}
          lean={"f5"}
          a={"Front Door isn't built for this. Traffic Manager only works for services that use public DNS names."}
          b={"Supported. Services keep using the same internal names."}
          fontSize={38}
        />
      </Series.Sequence>
      <Series.Sequence name={"Security 1 · Security model"} durationInFrames={480}>
        <RowScene
          step={7}
          group={"Security"}
          position={"1 of 2"}
          title={"Security model"}
          note={"Depends on whether the app is internet-facing or private."}
          lean={"f5"}
          a={"The app is reachable from the internet, protected by WAF and DDoS protection. Users reach the app first, then authenticate. Breaks our ZScaler Zero Trust principle"}
          b={"Doesn't change how exposed the app is: ZPA stays the front gate. Adds no WAF of its own."}
          fontSize={38}
        />
      </Series.Sequence>
      <Series.Sequence name={"Security 2 · Incidents and patching"} durationInFrames={665}>
        <RowScene
          step={8}
          group={"Security"}
          position={"2 of 2"}
          title={"Incidents and patching"}
          note={"Each option has a documented incident on its record, just of a different kind."}
          lean={"even"}
          a={"Microsoft runs and patches the service, so you can't fall behind. When it fails, you wait: Front Door had global outages in October 2025.\n\nLess control to find workarounds if an outage occurred, also more services to try to change (e.g. WAF, Front, DDoS Door etc.)"}
          b={"Your team patches it, sometimes urgently.\n\nIf something goes wrong, with this solution. We would have complete control of a workaround."}
          fontSize={36}
        />
      </Series.Sequence>
      <Series.Sequence name={"Resilience 1 · Health checks"} durationInFrames={340}>
        <RowScene
          step={9}
          group={"Resilience"}
          position={"1 of 3"}
          title={"Health checks"}
          note={""}
          lean={"f5"}
          a={"Basic: HTTP, HTTPS or TCP against one path. Only as smart as the app's health endpoint."}
          b={"Rich: multiple checks per app, dependency rules and scripted checks."}
          fontSize={38}
        />
      </Series.Sequence>
      <Series.Sequence name={"Resilience 2 · Whole region down vs one app down"} durationInFrames={395}>
        <RowScene
          step={10}
          group={"Resilience"}
          position={"2 of 3"}
          title={"Whole region down vs one app down"}
          note={""}
          lean={"f5"}
          a={"Possible if each app has a health endpoint that also checks its database and dependencies."}
          b={"Possible through GSLB configuration, without changing app code.\n\nThis is a simpler solution if a region goes down"}
          fontSize={38}
        />
      </Series.Sequence>
      <Series.Sequence name={"Resilience 3 · Failback"} durationInFrames={300}>
        <RowScene
          step={11}
          group={"Resilience"}
          position={"3 of 3"}
          title={"Failback"}
          note={""}
          lean={"even"}
          a={"Automatic once healthy. Manual control means disabling endpoints by hand."}
          b={"Automatic or manual, set per check."}
          fontSize={38}
        />
      </Series.Sequence>
      <Series.Sequence name={"Operations and commercial 1 · Operational Considerations"} durationInFrames={520}>
        <RowScene
          step={12}
          group={"Operations and commercial"}
          position={"1 of 4"}
          title={"Operational Considerations"}
          note={""}
          lean={"even"}
          a={"Fully managed. No patching, supported by the Terraform azurerm provider.\n\nA higher operational burden for the team"}
          b={"Your team owns it: at least two instances in different sites kept in sync, licensing, upgrades, patching and DNS delegation from the firm's DNS.\n\nGLSB have less config to understand and change"}
          fontSize={38}
        />
      </Series.Sequence>
      <Series.Sequence name={"Operations and commercial 2 · Procurement"} durationInFrames={300}>
        <RowScene
          step={13}
          group={"Operations and commercial"}
          position={"2 of 4"}
          title={"Procurement"}
          note={""}
          lean={"azure"}
          a={"Existing Microsoft agreement."}
          b={"New vendor, contract and support arrangement."}
          fontSize={38}
        />
      </Series.Sequence>
      <Series.Sequence name={"Operations and commercial 3 · Cost shape"} durationInFrames={410}>
        <RowScene
          step={14}
          group={"Operations and commercial"}
          position={"3 of 4"}
          title={"Cost shape"}
          note={""}
          lean={"f5"}
          a={"Grows with traffic: per request, per DNS query and per health check."}
          b={"Mostly fixed: licences and support, VM compute for each instance, and engineering time to run it. The engineering time won't show up on a quote."}
          fontSize={38}
        />
      </Series.Sequence>
      <Series.Sequence name={"Operations and commercial 4 · Lock-in"} durationInFrames={300}>
        <RowScene
          step={15}
          group={"Operations and commercial"}
          position={"4 of 4"}
          title={"Lock-in"}
          note={""}
          lean={"even"}
          a={"Configuration is Azure-specific.\n\nCan spin up and stop if factors change"}
          b={"GSLB, works across clouds."}
          fontSize={38}
        />
      </Series.Sequence>
      <Series.Sequence name="Outro" durationInFrames={1200}>
        <OutroScene />
      </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
