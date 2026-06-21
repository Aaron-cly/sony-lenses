import { Button, Card, CardBody, CardHeader, Grid, H1, H2, Pill, Row, Stack, Stat, Table, Text, useCanvasState } from "cursor/canvas";

const zooms = [
  {
    lens: "Tamron 20-40mm f/2.8 Di III VXD",
    weight: "365g",
    price: "HK$5,250*",
    role: "Light hiking wide-normal",
    fit: "Best weight/value for your UWA-led landscape style; short at 40mm.",
    tier: "Shortlist",
  },
  {
    lens: "Sony FE 20-70mm f/4 G",
    weight: "488g",
    price: "HK$6,380*",
    role: "Best one-lens landscape travel",
    fit: "Most convenient range; f/4 is fine for daylight landscapes.",
    tier: "Shortlist",
  },
  {
    lens: "Samyang AF 14-24mm f/2.8 FE",
    weight: "445g",
    price: "HK$6,980*",
    role: "Light UWA f/2.8 astro zoom",
    fit: "Highly praised compact 14-24 with front filters; strongest new challenger to carrying a separate UWA prime.",
    tier: "Shortlist",
  },
  {
    lens: "Tamron 17-50mm f/4 Di III VXD",
    weight: "460g",
    price: "HK$4,560*",
    role: "Wide-to-normal hiking zoom",
    fit: "Unique 17-50mm range, internal zoom, and good trail practicality; needs a faster prime for serious astro.",
    tier: "Shortlist",
  },
  {
    lens: "Sony FE 24-50mm f/2.8 G",
    weight: "440g",
    price: "HK$6,680",
    role: "Compact Sony f/2.8 normal zoom",
    fit: "Great handling and 50mm native; less landscape-friendly than 20mm-start zooms.",
    tier: "Shortlist",
  },
  {
    lens: "Sony FE 16-25mm f/2.8 G",
    weight: "409g",
    price: "HK$7,570",
    role: "All-Sony wide zoom",
    fit: "Excellent if skipping the 16mm prime; overlaps too much if you buy SEL16F18G.",
    tier: "Conditional",
  },
  {
    lens: "Sigma 28-70mm f/2.8 DG DN C",
    weight: "470g",
    price: "HK$5,850",
    role: "Compact f/2.8 travel/people zoom",
    fit: "Works if 16mm prime covers UWA; 16-28mm gap is the landscape concern.",
    tier: "Conditional",
  },
  {
    lens: "Tamron 25-200mm f/2.8-5.6 G2",
    weight: "575g",
    price: "HK$6,980",
    role: "Modern all-in-one travel zoom",
    fit: "Praised successor to the 28-200; good if you want one daylight lens from wide-ish landscapes to tele details.",
    tier: "Conditional",
  },
  {
    lens: "Sigma 20-200mm f/3.5-6.3 DG C",
    weight: "540g",
    price: "TBD (US$899*)",
    role: "Ultra-wide all-in-one zoom",
    fit: "Very compelling 20-200mm range in 540g; slower than Tamron but starts wider for landscape.",
    tier: "Conditional",
  },
  {
    lens: "Sony FE PZ 16-35mm f/4 G",
    weight: "353g",
    price: "HK$6,820",
    role: "Light all-Sony wide landscape zoom",
    fit: "Very light and wide; slower for astro and short for travel detail.",
    tier: "Alternative",
  },
  {
    lens: "Sony FE 16-35mm f/2.8 GM II",
    weight: "547g",
    price: "HK$12,250",
    role: "Premium wide landscape zoom",
    fit: "Best wide zoom experience; expensive and less aligned with your weight priority.",
    tier: "Premium",
  },
  {
    lens: "Tamron 17-28mm f/2.8 Di III RXD",
    weight: "420g",
    price: "HK$6,280*",
    role: "Budget wide f/2.8 zoom",
    fit: "Good value wide option; range overlaps a 16mm astro prime heavily.",
    tier: "Alternative",
  },
  {
    lens: "Tamron 16-30mm f/2.8 Di III VXD G2",
    weight: "440g",
    price: "HK$7,100",
    role: "Modern wide f/2.8 zoom",
    fit: "Interesting new wide zoom; still overlaps a 16mm prime heavily.",
    tier: "Alternative",
  },
  {
    lens: "Sigma 16-28mm f/2.8 DG DN C",
    weight: "450g",
    price: "HK$6,150*",
    role: "Compact wide f/2.8 zoom",
    fit: "Nice wide zoom, but not ideal beside a 16mm prime.",
    tier: "Alternative",
  },
  {
    lens: "Tamron 28-75mm f/2.8 Di III VXD G2",
    weight: "540g",
    price: "HK$5,480",
    role: "Value f/2.8 standard zoom",
    fit: "Good people/travel lens; heavier than Sigma 28-70 and starts at 28mm.",
    tier: "Travel",
  },
  {
    lens: "Sony FE 24-105mm f/4 G OSS",
    weight: "663g",
    price: "HK$4,900",
    role: "Long-range travel zoom",
    fit: "Great range/value; heavier and older, less appealing for trail weight.",
    tier: "Travel",
  },
  {
    lens: "Sigma 24-70mm f/2.8 DG DN II Art",
    weight: "745g",
    price: "HK$7,600",
    role: "Value pro standard zoom",
    fit: "Strong IQ/value; too heavy for your mountain-weight priority.",
    tier: "Heavy",
  },
  {
    lens: "Sony FE 24-70mm f/2.8 GM II",
    weight: "695g",
    price: "HK$10,900",
    role: "Premium pro standard zoom",
    fit: "Excellent lens; weight/cost are hard to justify for your landscape use.",
    tier: "Heavy",
  },
  {
    lens: "Sony FE 28-60mm f/4-5.6",
    weight: "167g",
    price: "HK$940*",
    role: "Tiny daylight kit zoom",
    fit: "Very light, but not the A7CR landscape/IQ lens I would build around.",
    tier: "Tiny",
  },
];

const defaultOrder = zooms.map((item) => item.lens);

function toneForTier(item: (typeof zooms)[number]) {
  if (item.tier === "Shortlist") return "success" as const;
  if (item.tier === "Conditional") return "info" as const;
  if (item.tier === "Heavy") return "warning" as const;
  return undefined;
}

export default function SonyEMountZoomShortlist() {
  const [order, setOrder] = useCanvasState<string[]>("zoom-order", defaultOrder);
  const orderedZooms = [
    ...order.map((lens) => zooms.find((item) => item.lens === lens)).filter((item): item is (typeof zooms)[number] => Boolean(item)),
    ...zooms.filter((item) => !order.includes(item.lens)),
  ];

  const moveRow = (index: number, direction: -1 | 1) => {
    const next = [...orderedZooms.map((item) => item.lens)];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setOrder(next);
  };

  const rows = orderedZooms.map((item, index) => [
    <Row gap={4} key={`${item.lens}-move`}>
      <Button variant="ghost" disabled={index === 0} onClick={() => moveRow(index, -1)}>
        Up
      </Button>
      <Button variant="ghost" disabled={index === orderedZooms.length - 1} onClick={() => moveRow(index, 1)}>
        Down
      </Button>
    </Row>,
    item.lens,
    item.weight,
    item.price,
    item.role,
    item.fit,
    item.tier,
  ]);

  const rowTone = orderedZooms.map(toneForTier);

  return (
    <Stack gap={18} style={{ padding: 20 }}>
      <Stack gap={6}>
        <H1>Sony E-Mount Zoom Shortlist</H1>
        <Text tone="secondary">
          Full-frame zoom options discussed for an A7CR landscape, hiking, travel, and astro-adjacent kit.
          Prices aim to use the lower price of the Price.com.hk 行貨 range found from web snippets on Jun 21, 2026.
          Asterisked entries need live confirmation because the snippet did not expose a clear 行貨 / 水貨 split.
        </Text>
      </Stack>

      <Grid columns={3} gap={12}>
        <Stat label="Best Fit" value="Tamron 20-40" tone="success" />
        <Stat label="Best UWA Zoom" value="Samyang 14-24" tone="info" />
        <Stat label="Best One-Lens" value="Sony 20-70G" tone="neutral" />
      </Grid>

      <Card size="lg">
        <CardHeader trailing={<Pill tone="success">Recommended</Pill>}>Recommendation for your priorities</CardHeader>
        <CardBody>
          <Text>
            If you are also buying the Sony 16mm f/1.8 G for ultra-wide and astro, the most aligned zoom is the Tamron 20-40mm f/2.8:
            it is light, inexpensive, and keeps the kit focused on the focal lengths where your best landscape work already happens.
          </Text>
          <Text>
            Pick the Sony 20-70mm f/4 G instead if you want fewer lens changes and care about 50-70mm mountain details, travel, and compression.
            The Samyang 14-24mm f/2.8 is the strongest new option if you want one compact ultra-wide zoom to cover both daytime landscape and occasional astro.
          </Text>
          <Row gap={8}>
            <Button variant="secondary" onClick={() => setOrder(defaultOrder)}>
              Reset row order
            </Button>
            <Text tone="secondary" size="small">
              Use the Up and Down controls in the table to reorder lenses. The order is saved in this canvas.
            </Text>
          </Row>
        </CardBody>
      </Card>

      <Stack gap={8}>
        <H2>Zoom Options</H2>
        <Table
          headers={["Move", "Lens", "Weight", "行貨入門價", "Role", "Usage fit", "Tier"]}
          rows={rows}
          rowTone={rowTone}
          columnAlign={["left", "left", "right", "right", "left", "left", "center"]}
          striped
          stickyHeader
        />
      </Stack>
    </Stack>
  );
}
