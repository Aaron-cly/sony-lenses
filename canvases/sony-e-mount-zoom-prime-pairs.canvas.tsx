import { Button, Card, CardBody, CardHeader, Grid, H1, H2, Pill, Row, Stack, Stat, Table, Text, useCanvasState } from "cursor/canvas";

const a7crWeight = 515;

const prime16IQ = "16G: sharp center wide-open, decent corners by f/2.8-4, low coma — solid astro prime.";
const prime50IQ = "50G: sharp across the frame at f/2.5, clean rendering, minor LoCA — clean daily prime.";

const pairs = [
  {
    zoom: "Tamron 20-40mm f/2.8",
    zoomWeight: 365,
    zoomPrice: 5250,
    prime: "Sony FE 16mm f/1.8 G",
    primeWeight: 304,
    primePrice: 6490,
    usage: "Best lightweight mountain + astro pairing. 16mm handles your Samyang-style UWA/astro work; Tamron covers hiking scenes from wide to normal.",
    iqNotes: `Zoom: excellent center; uniquely uniform 20mm corners at f/2.8; 40mm corners need f/5.6; low CA; mild magenta/cyan in backlit edges. ${prime16IQ}`,
    tier: "Best fit",
  },
  {
    zoom: "Sony FE 20-70mm f/4 G",
    zoomWeight: 488,
    zoomPrice: 6380,
    prime: "Sony FE 16mm f/1.8 G",
    primeWeight: 304,
    primePrice: 6490,
    usage: "Best convenience kit. 20-70 is the daytime do-everything lens; 16mm covers serious astro and dramatic UWA.",
    iqNotes: `Zoom: very sharp center across range, corners clean by f/5.6, low distortion for the range, well-controlled CA. ${prime16IQ}`,
    tier: "Most versatile",
  },
  {
    zoom: "Samyang AF 14-24mm f/2.8 FE",
    zoomWeight: 445,
    zoomPrice: 6980,
    prime: "Sony FE 50mm f/2.5 G",
    primeWeight: 174,
    primePrice: 4590,
    usage: "Strong compact UWA zoom kit. Samyang covers wide landscape and occasional astro; 50mm adds your classic normal-lens daily/detail role.",
    iqNotes: `Zoom: sharp center, respectable corners by f/4; moderate edge astigmatism/coma — astro-usable but not coma-free; heavy profile distortion. ${prime50IQ}`,
    tier: "UWA zoom",
  },
  {
    zoom: "Tamron 17-50mm f/4",
    zoomWeight: 460,
    zoomPrice: 4560,
    prime: "Sony FE 16mm f/1.8 G",
    primeWeight: 304,
    primePrice: 6490,
    usage: "Wide-to-normal hiking zoom plus true astro prime. Practical range, but more overlap with 16mm than the Tamron 20-40 pairing.",
    iqNotes: `Zoom: sharp center across range; 17mm corners soft at f/4, clean by f/5.6-8; low CA; moderate but correctable distortion. ${prime16IQ}`,
    tier: "Practical",
  },
  {
    zoom: "Sony FE 24-50mm f/2.8 G",
    zoomWeight: 440,
    zoomPrice: 6680,
    prime: "Sony FE 16mm f/1.8 G",
    primeWeight: 304,
    primePrice: 6490,
    usage: "Compact all-Sony f/2.8 kit. Good if you want native 50mm and Sony controls, but 16-24mm gap matters for landscapes.",
    iqNotes: `Zoom: excellent center wide-open; 24mm corners soft (mandatory distortion correction stretches edges); strong lateral CA; LoCA at 50mm; ~1 stop vignetting at 50mm f/2.8; great flare resistance. ${prime16IQ}`,
    tier: "Good",
  },
  {
    zoom: "Sigma 28-70mm f/2.8 DG DN C",
    zoomWeight: 470,
    zoomPrice: 5850,
    prime: "Sony FE 16mm f/1.8 G",
    primeWeight: 304,
    primePrice: 6490,
    usage: "Better for travel, people, food, and details than pure hiking. The 16-28mm gap is the main landscape compromise.",
    iqNotes: `Zoom: sharp center, decent corners by f/4; low distortion and CA for a compact f/2.8 standard zoom; pleasant bokeh. ${prime16IQ}`,
    tier: "Travel",
  },
  {
    zoom: "Tamron 25-200mm f/2.8-5.6 G2",
    zoomWeight: 575,
    zoomPrice: 6980,
    prime: "Sony FE 16mm f/1.8 G",
    primeWeight: 304,
    primePrice: 6490,
    usage: "All-in-one daylight travel zoom plus dedicated UWA/astro prime. Very capable, but heavier than your wide-focused hiking kits.",
    iqNotes: `Zoom: very sharp center at 25-70mm, softer corners 100-200mm; expected superzoom CA at extremes; heavy reliance on profile correction. ${prime16IQ}`,
    tier: "All-in-one",
  },
  {
    zoom: "Sigma 20-200mm f/3.5-6.3 DG C",
    zoomWeight: 540,
    zoomPrice: 0,
    prime: "Sony FE 16mm f/1.8 G",
    primeWeight: 304,
    primePrice: 6490,
    usage: "Most interesting superzoom range for landscapes because it starts at 20mm. Price is pending HK confirmation, and astro still belongs to the 16mm prime.",
    iqNotes: `Zoom: early reports show acceptable center across range, softer corners and CA at extremes; requires profile correction; weakest at 200mm. ${prime16IQ}`,
    tier: "All-in-one",
  },
  {
    zoom: "Sony FE 16-25mm f/2.8 G",
    zoomWeight: 409,
    zoomPrice: 7570,
    prime: "Sony FE 50mm f/2.5 G",
    primeWeight: 174,
    primePrice: 4590,
    usage: "Lightest serious two-lens Sony kit here. Great landscape + daily split; astro is usable at 16mm f/2.8, not as strong as f/1.8.",
    iqNotes: `Zoom: very sharp center wide-open including 16mm corners; low distortion for the class; minor CA — strongest compact UWA-zoom IQ. ${prime50IQ}`,
    tier: "Light Sony",
  },
  {
    zoom: "Sony FE PZ 16-35mm f/4 G",
    zoomWeight: 353,
    zoomPrice: 6820,
    prime: "Sony FE 16mm f/1.8 G",
    primeWeight: 304,
    primePrice: 6490,
    usage: "Very light wide zoom plus real astro prime. Strong if you want all-Sony and low weight, but less normal/tele reach.",
    iqNotes: `Zoom: good sharpness across range, corners cleaner stopped down; heavy in-camera distortion correction; mild CA. ${prime16IQ}`,
    tier: "Wide-light",
  },
  {
    zoom: "Sony FE 16-35mm f/2.8 GM II",
    zoomWeight: 547,
    zoomPrice: 12250,
    prime: "Sony FE 50mm f/2.5 G",
    primeWeight: 174,
    primePrice: 4590,
    usage: "Premium mountain wide zoom plus tiny daily 50. Excellent IQ, but costly and heavier than your stated priority suggests.",
    iqNotes: `Zoom: GM-class — excellent edge-to-edge sharpness wide-open, low coma (top astro zoom IQ), very low CA, smooth rendering. ${prime50IQ}`,
    tier: "Premium",
  },
  {
    zoom: "Tamron 17-28mm f/2.8",
    zoomWeight: 420,
    zoomPrice: 6280,
    prime: "Sony FE 50mm f/2.5 G",
    primeWeight: 174,
    primePrice: 4590,
    usage: "Budget wide f/2.8 plus daily 50. Similar concept to 16-25G + 50, but less Sony-native and less refined.",
    iqNotes: `Zoom: very sharp center; corners catch up by f/5.6; low distortion; clean CA — strong value IQ but less even than Sony 16-25G. ${prime50IQ}`,
    tier: "Budget wide",
  },
  {
    zoom: "Tamron 16-30mm f/2.8 G2",
    zoomWeight: 440,
    zoomPrice: 7100,
    prime: "Sony FE 50mm f/2.5 G",
    primeWeight: 174,
    primePrice: 4590,
    usage: "Modern wide f/2.8 plus compact 50. Good range, but less compelling if you specifically want the 16mm f/1.8 for astro.",
    iqNotes: `Zoom: improved over predecessor; sharp across frame at f/2.8; acceptable but not coma-free for casual astro; low CA. ${prime50IQ}`,
    tier: "Wide",
  },
  {
    zoom: "Sigma 16-28mm f/2.8 DG DN C",
    zoomWeight: 450,
    zoomPrice: 6150,
    prime: "Sony FE 50mm f/2.5 G",
    primeWeight: 174,
    primePrice: 4590,
    usage: "Wide landscape zoom plus classic 50. Reasonable, but not as light as Sony 16-25G and not as astro-capable as 16mm f/1.8.",
    iqNotes: `Zoom: sharp center, decent corners by f/4; low CA; compact, clean rendering — competent but not standout. ${prime50IQ}`,
    tier: "Wide",
  },
  {
    zoom: "Tamron 28-75mm f/2.8 G2",
    zoomWeight: 540,
    zoomPrice: 5480,
    prime: "Sony FE 16mm f/1.8 G",
    primeWeight: 304,
    primePrice: 6490,
    usage: "Travel/people-oriented standard zoom plus astro prime. More reach than you likely need on mountain trails.",
    iqNotes: `Zoom: excellent sharpness wide-open across the frame; low CA; pleasing rendering — strong standard-zoom IQ for its price. ${prime16IQ}`,
    tier: "Travel",
  },
  {
    zoom: "Sony FE 24-105mm f/4 G OSS",
    zoomWeight: 663,
    zoomPrice: 4900,
    prime: "Sony FE 16mm f/1.8 G",
    primeWeight: 304,
    primePrice: 6490,
    usage: "Big range plus astro prime. Good value, but the total carry weight is not ideal for your hiking-first use.",
    iqNotes: `Zoom: very good sharpness across range; mild distortion; classic G workhorse rendering; OSS adds handheld margin. ${prime16IQ}`,
    tier: "Heavy",
  },
  {
    zoom: "Sigma 24-70mm f/2.8 DG DN II Art",
    zoomWeight: 745,
    zoomPrice: 7600,
    prime: "Sony FE 16mm f/1.8 G",
    primeWeight: 304,
    primePrice: 6490,
    usage: "High-IQ standard f/2.8 plus astro prime. Too heavy for the lightweight trail kit you described.",
    iqNotes: `Zoom: near GM-class — excellent sharpness wide-open across frame, very low CA, clean bokeh. ${prime16IQ}`,
    tier: "Heavy",
  },
  {
    zoom: "Sony FE 24-70mm f/2.8 GM II",
    zoomWeight: 695,
    zoomPrice: 10900,
    prime: "Sony FE 16mm f/1.8 G",
    primeWeight: 304,
    primePrice: 6490,
    usage: "Excellent pro travel/event kit plus astro prime. Very expensive and not optimized for your UWA landscape bias.",
    iqNotes: `Zoom: reference-class IQ — sharp edge-to-edge at f/2.8, excellent CA/distortion control, smooth bokeh, top flare resistance. ${prime16IQ}`,
    tier: "Heavy",
  },
  {
    zoom: "Sony FE 28-60mm f/4-5.6",
    zoomWeight: 167,
    zoomPrice: 940,
    prime: "Sony FE 16mm f/1.8 G",
    primeWeight: 304,
    primePrice: 6490,
    usage: "Ultra-light budget zoom plus proper UWA/astro prime. Weight is excellent, but the zoom is the weak IQ/experience link.",
    iqNotes: `Zoom: decent center, soft corners, heavy in-camera distortion correction, modest contrast — weakest IQ in this list. ${prime16IQ}`,
    tier: "Tiny",
  },
];

const defaultOrder = pairs.map((item) => `${item.zoom} + ${item.prime}`);

function pairKey(item: (typeof pairs)[number]) {
  return `${item.zoom} + ${item.prime}`;
}

function toneForTier(item: (typeof pairs)[number]) {
  if (item.tier === "Best fit" || item.tier === "Most versatile") return "success" as const;
  if (item.tier === "Good" || item.tier === "Light Sony" || item.tier === "UWA zoom" || item.tier === "Practical") return "info" as const;
  if (item.tier === "Heavy") return "warning" as const;
  return undefined;
}

export default function SonyZoomPrimePairs() {
  const [order, setOrder] = useCanvasState<string[]>("pair-order", defaultOrder);
  const orderedPairs = [
    ...order.map((key) => pairs.find((item) => pairKey(item) === key)).filter((item): item is (typeof pairs)[number] => Boolean(item)),
    ...pairs.filter((item) => !order.includes(pairKey(item))),
  ];

  const moveRow = (index: number, direction: -1 | 1) => {
    const next = orderedPairs.map(pairKey);
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setOrder(next);
  };

  const rows = orderedPairs.map((item, index) => {
    const lensWeight = item.zoomWeight + item.primeWeight;
    const totalWeight = lensWeight + a7crWeight;
    const totalPrice = item.zoomPrice + item.primePrice;

    return [
      <Row gap={4} key={`${pairKey(item)}-move`}>
        <Button variant="ghost" disabled={index === 0} onClick={() => moveRow(index, -1)}>
          Up
        </Button>
        <Button variant="ghost" disabled={index === orderedPairs.length - 1} onClick={() => moveRow(index, 1)}>
          Down
        </Button>
      </Row>,
      item.zoom,
      item.prime,
      `${lensWeight}g`,
      `${totalWeight}g`,
      item.zoomPrice === 0 ? `HK$${item.primePrice.toLocaleString("en-US")} + zoom TBD` : `HK$${totalPrice.toLocaleString("en-US")}`,
      item.usage,
      item.iqNotes,
      item.tier,
    ];
  });

  const rowTone = orderedPairs.map(toneForTier);

  return (
    <Stack gap={18} style={{ padding: 20 }}>
      <Stack gap={6}>
        <H1>Sony Zoom + Prime Pairings</H1>
        <Text tone="secondary">
          Two-lens kits for an A7CR landscape photographer whose strongest work is ultra-wide, who cares about mountain trail weight,
          and who wants the kit to be capable of astro. Prices use 行貨入門價 where available from the previous shortlist and current web snippets.
        </Text>
      </Stack>

      <Grid columns={3} gap={12}>
        <Stat label="My Pick" value="20-40 + 16G" tone="success" />
        <Stat label="Best UWA Zoom Kit" value="14-24 + 50G" tone="info" />
        <Stat label="Most Versatile" value="20-70G + 16G" tone="neutral" />
      </Grid>

      <Card size="lg">
        <CardHeader trailing={<Pill tone="success">Best fit</Pill>}>Recommendation</CardHeader>
        <CardBody>
          <Text>
            For your actual shooting history, I would buy the Tamron 20-40mm f/2.8 plus Sony 16mm f/1.8 G.
            It gives you a true astro/UWA prime, keeps the hiking kit light, and avoids paying weight for long focal lengths you are less likely to use on trail.
          </Text>
          <Text>
            If you want the smoothest one-lens daytime experience, choose Sony 20-70mm f/4 G plus Sony 16mm f/1.8 G instead.
            If you want an all-Sony compact landscape/daily split and can accept weaker astro, Sony 16-25mm f/2.8 G plus Sony 50mm f/2.5 G is the elegant lightweight option.
            If you want to replace the separate ultra-wide prime idea with one astro-capable UWA zoom, the Samyang 14-24mm f/2.8 plus Sony 50mm f/2.5 G is now the most interesting challenger.
          </Text>
          <Row gap={8}>
            <Button variant="secondary" onClick={() => setOrder(defaultOrder)}>
              Reset row order
            </Button>
            <Text tone="secondary" size="small">
              Use the Up and Down controls in the table to reorder pairings. The order is saved in this canvas.
            </Text>
          </Row>
        </CardBody>
      </Card>

      <Stack gap={8}>
        <H2>Calculated Pairings</H2>
        <Table
          headers={["Move", "Zoom", "Paired prime", "Lens weight", "With A7CR", "Total price", "Usage", "IQ notes", "Tier"]}
          rows={rows}
          rowTone={rowTone}
          columnAlign={["left", "left", "left", "right", "right", "right", "left", "left", "center"]}
          striped
          stickyHeader
        />
      </Stack>
    </Stack>
  );
}
