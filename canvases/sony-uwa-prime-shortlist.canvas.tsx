import { Card, CardBody, CardHeader, Grid, H1, H2, Pill, Stack, Stat, Table, Text } from "cursor/canvas";

const primes = [
  {
    lens: "Sony FE 16mm f/1.8 G",
    weight: "304g",
    price: "HK$5,940-6,490",
    filter: "67mm",
    focus: "AF",
    role: "Best overall companion",
    fit: "Most balanced choice for a 20-ish zoom: wider than 20mm, strong astro, light, Sony-native, and front-filter friendly.",
    tier: "Best fit",
  },
  {
    lens: "Sony FE 14mm f/1.8 GM",
    weight: "460g",
    price: "HK$8,790",
    filter: "Rear gel",
    focus: "AF",
    role: "Best premium astro",
    fit: "Wider and more dramatic than 16mm with excellent astro reputation, but more specialized and no normal front filters.",
    tier: "Premium",
  },
  {
    lens: "Viltrox AF 16mm f/1.8 FE",
    weight: "550g",
    price: "HK$3,610-3,799",
    filter: "77mm",
    focus: "AF",
    role: "Best value 16mm",
    fit: "Highly regarded optically and much cheaper than Sony, but significantly heavier for mountain carry.",
    tier: "Value",
  },
  {
    lens: "Sony FE 20mm f/1.8 G",
    weight: "373g",
    price: "HK$5,420",
    filter: "67mm",
    focus: "AF",
    role: "Best 20mm prime",
    fit: "Excellent lens, but overlaps heavily with Tamron 20-40 or Sony 20-70; choose only if you love 20mm astro.",
    tier: "Overlap",
  },
  {
    lens: "Laowa 15mm f/2 Zero-D",
    weight: "500g",
    price: "HK$5,200",
    filter: "72mm",
    focus: "MF",
    role: "Manual astro/landscape",
    fit: "Interesting wide manual-focus option with low distortion and front filters, but less convenient than Sony AF for travel.",
    tier: "Manual",
  },
];

const rows = primes.map((item) => [
  item.lens,
  item.weight,
  item.price,
  item.filter,
  item.focus,
  item.role,
  item.fit,
  item.tier,
]);

const rowTone = primes.map((item) => {
  if (item.tier === "Best fit") return "success" as const;
  if (item.tier === "Value") return "info" as const;
  if (item.tier === "Premium") return "warning" as const;
  return undefined;
});

export default function SonyUwaPrimeShortlist() {
  return (
    <Stack gap={18} style={{ padding: 20 }}>
      <Stack gap={6}>
        <H1>UWA Prime Shortlist</H1>
        <Text tone="secondary">
          Ultra-wide prime options to complement a 20-ish zoom such as Tamron 20-40mm f/2.8 or Sony 20-70mm f/4 G.
          Prices are Hong Kong retail references found from current web snippets and should be checked live before purchase.
        </Text>
      </Stack>

      <Grid columns={3} gap={12}>
        <Stat label="Best Fit" value="Sony 16mm G" tone="success" />
        <Stat label="Best Astro" value="Sony 14mm GM" tone="warning" />
        <Stat label="Best Value" value="Viltrox 16mm" tone="info" />
      </Grid>

      <Card size="lg">
        <CardHeader trailing={<Pill tone="success">Recommendation</Pill>}>For your 20-ish zoom plan</CardHeader>
        <CardBody>
          <Text>
            If you start with Tamron 20-40mm f/2.8 or Sony 20-70mm f/4 G, the cleanest later UWA prime is Sony FE 16mm f/1.8 G.
            It adds a real focal-length difference, improves astro meaningfully, and stays aligned with your mountain weight priority.
          </Text>
          <Text>
            Sony 20mm f/1.8 G is excellent but less complementary because your zoom already starts at 20mm.
            Sony 14mm f/1.8 GM is the premium choice if you decide you want a more extreme night-sky look.
          </Text>
        </CardBody>
      </Card>

      <Stack gap={8}>
        <H2>Prime Options</H2>
        <Table
          headers={["Lens", "Weight", "HK price", "Filter", "Focus", "Role", "Usage fit", "Tier"]}
          rows={rows}
          rowTone={rowTone}
          columnAlign={["left", "right", "right", "center", "center", "left", "left", "center"]}
          striped
          stickyHeader
        />
      </Stack>
    </Stack>
  );
}
