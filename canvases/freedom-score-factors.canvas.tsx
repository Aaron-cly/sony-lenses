import { Card, CardBody, CardHeader, Grid, H1, H2, Pill, Stack, Stat, Table, Text } from "cursor/canvas";

const factors = [
  {
    factor: "Kids",
    role: "Hard lock",
    how: "Headcount + monthly cost + city/school lock",
    weight: "Highest",
    cuttable: "No",
    note: "Money is the smaller part. You cannot ethically quit this. Younger kids and private school raise the lock; public school + family help lower it.",
  },
  {
    factor: "Wife / partner",
    role: "Conditional lock",
    how: "Their income and whether they depend on yours",
    weight: "High only if dependent",
    cuttable: "No",
    note: "A dual-income partner is often freeing. A partner on your paycheck is a lock. Do not add points just for being married.",
  },
  {
    factor: "Mortgage",
    role: "Hard lock",
    how: "% of take-home + exit friction",
    weight: "High",
    cuttable: "Expensive",
    note: "Monthly payment plus illiquidity. Stamp duty, agent fees, and market risk make this harder to drop than rent. A paid-off home is the opposite of a trap.",
  },
  {
    factor: "House rent",
    role: "Cashflow load",
    how: "% of take-home",
    weight: "Medium",
    cuttable: "Yes, by moving",
    note: "Hits leftover cash every month, but you can downsize or leave the city. Score it as burn, not as a life sentence.",
  },
  {
    factor: "Car loan",
    role: "Debt lock",
    how: "Payment + being underwater on a depreciating asset",
    weight: "Medium",
    cuttable: "Sort of, by selling",
    note: "Trap is worse if the car is status, not transport. A paid-off cheap car barely moves the score.",
  },
  {
    factor: "Other loans",
    role: "Debt lock",
    how: "Payment + interest rate + how stuck the principal is",
    weight: "Medium–high",
    cuttable: "Slowly",
    note: "Credit cards and personal loans are a tighter leash than a cheap mortgage. Student loans vary: income-contingent is less trapping than a fixed bill.",
  },
  {
    factor: "Spending",
    role: "Soft lock",
    how: "% of take-home that is lifestyle baseline",
    weight: "Medium",
    cuttable: "Yes, painfully",
    note: "Dining, helper, clothes, weekends. Often larger than loans. Easy to underestimate because it feels like 'normal life', not a bill.",
  },
  {
    factor: "Expensive hobbies",
    role: "Soft lock",
    how: "Cash drain + identity ('I need the job to fund who I am')",
    weight: "Low–medium",
    cuttable: "Yes",
    note: "Gear, golf, diving, watches, motorsport. Small on the spreadsheet, loud in the story people tell themselves about why they cannot leave.",
  },
  {
    factor: "Subscriptions",
    role: "Signal, not the trap",
    how: "Monthly total",
    weight: "Low",
    cuttable: "Easiest",
    note: "Rarely what keeps you employed. Useful as a first lever and a lifestyle-inflation tell, not as a major score input.",
  },
];

const missing = [
  {
    factor: "Take-home income",
    why: "Denominator. $20k mortgage on $200k is slack. On $40k it is a cage.",
  },
  {
    factor: "Liquid savings",
    why: "Runway in months. Home equity and unvested stock do not pay next month's rent.",
  },
  {
    factor: "Essential burn vs total burn",
    why: "Kids + housing + debt still exist after you cancel Netflix. Score both 'life as now' and 'life if I cut the optional stuff'.",
  },
  {
    factor: "Employer glue",
    why: "Unvested RSUs, bonus clawbacks, health insurance, MPF vesting, visa. These trap high earners even with a clean personal budget.",
  },
  {
    factor: "Skill portability",
    why: "A niche internal title is a quieter lock than a car loan. Can you get paid similar money somewhere else, or freelance?",
  },
];

const profiles = [
  {
    name: "Lean renter",
    setup: "Solid salary, cheap rent, no kids, 12 months cash",
    score: "High 70s–90s",
    why: "Low hard locks. Could quit and figure it out.",
  },
  {
    name: "Golden handcuffs",
    setup: "Huge pay, huge mortgage, lifestyle to match, some savings",
    score: "40s–60s",
    why: "Looks rich. Cannot drop the burn without a smaller life.",
  },
  {
    name: "House-poor family",
    setup: "Average pay, 2 kids, dependent partner, mortgage, thin savings",
    score: "Teens–30s",
    why: "People locks plus housing. The job is the life-support machine.",
  },
  {
    name: "High-burn single",
    setup: "Good pay, no kids, rent, car, hobbies and spending eat the rest",
    score: "50s–70s after cuts, 30s–40s as-is",
    why: "Trapped by taste, not by dependents. Optionality is high if they actually cut.",
  },
];

export default function FreedomScoreFactors() {
  return (
    <Stack gap={18} style={{ padding: 20 }}>
      <Stack gap={6}>
        <H1>Freedom Score — what actually goes into it</H1>
        <Text tone="secondary">
          Brainstorm only. The score is not “how expensive is your life”. It is “how badly does your life
          collapse if the corporate paycheck stops on Friday”.
        </Text>
      </Stack>

      <Grid columns={3} gap={12}>
        <Stat label="Score meaning" value="Quit-readiness" tone="info" />
        <Stat label="Do not do" value="Sum raw dollars" tone="warning" />
        <Stat label="Heaviest lock" value="Kids, then mortgage" tone="danger" />
      </Grid>

      <Card size="lg">
        <CardHeader trailing={<Pill tone="warning">Core idea</Pill>}>Two different cages</CardHeader>
        <CardBody>
          <Text>
            Kids, a dependent partner, and a mortgage are hard locks: you cannot cut them without hurting
            people or paying a brutal exit cost. Rent, spending, hobbies, and subscriptions are soft locks:
            they drain cash, but they are reversible. A high earner with soft locks is less trapped than a
            median earner with two kids — even if the high earner spends more.
          </Text>
          <Text>
            Every dollar factor should be scored as a share of take-home, not as a headline number.
            Then multiply by how reversible it is. Without income and liquid savings in the model, the
            rest of the list is just a shopping receipt.
          </Text>
        </CardBody>
      </Card>

      <Stack gap={8}>
        <H2>Four pillars</H2>
        <Grid columns={2} gap={12}>
          <Card>
            <CardHeader trailing={<Pill>30%</Pill>}>1. Runway</CardHeader>
            <CardBody>
              <Text>
                Liquid savings ÷ monthly essential burn. Zero months is panic. Six months is a job hunt.
                Twelve-plus is actual optionality. Count cash and cash-like only.
              </Text>
            </CardBody>
          </Card>
          <Card>
            <CardHeader trailing={<Pill>25%</Pill>}>2. Cashflow slack</CardHeader>
            <CardBody>
              <Text>
                (Take-home − all outflows) ÷ take-home. This is where rent, mortgage, loans, spending,
                hobbies, and subs all enter — as burn, not as equal “trap points”.
              </Text>
            </CardBody>
          </Card>
          <Card>
            <CardHeader trailing={<Pill>30%</Pill>}>3. Hard lock-in</CardHeader>
            <CardBody>
              <Text>
                Kids (count, age, school), dependent partner, mortgage exit friction, non-negotiable debt.
                This pillar is why two households with the same leftover cash can have very different
                freedom.
              </Text>
            </CardBody>
          </Card>
          <Card>
            <CardHeader trailing={<Pill>15%</Pill>}>4. Optionality</CardHeader>
            <CardBody>
              <Text>
                Share of spend that is cuttable. If most of the burn is hobbies and restaurants, you can
                buy freedom with a smaller life. If most of it is kids + mortgage, cutting Netflix does
                nothing.
              </Text>
            </CardBody>
          </Card>
        </Grid>
      </Stack>

      <Stack gap={8}>
        <H2>Your list, ranked by how much it should move the score</H2>
        <Table
          headers={["Factor", "Role", "How it enters", "Weight", "Cuttable?", "Scoring note"]}
          rows={factors.map((item) => [
            item.factor,
            item.role,
            item.how,
            item.weight,
            item.cuttable,
            item.note,
          ])}
          rowTone={factors.map((item) => {
            if (item.weight === "Highest" || item.weight === "High") return "danger" as const;
            if (item.weight === "Medium–high" || item.weight === "Medium") return "warning" as const;
            return "info" as const;
          })}
          columnAlign={["left", "left", "left", "center", "center", "left"]}
          striped
          stickyHeader
        />
      </Stack>

      <Stack gap={8}>
        <H2>Missing inputs — the score is incomplete without these</H2>
        <Table
          headers={["Add this", "Why"]}
          rows={missing.map((item) => [item.factor, item.why])}
          striped
        />
      </Stack>

      <Card size="lg">
        <CardHeader trailing={<Pill tone="info">Partner rule</Pill>}>Wife is not a round number</CardHeader>
        <CardBody>
          <Text>
            Treat partner as three states, not a checkbox: no partner / dual income / depends on your
            paycheck. Dual income can raise freedom (a second adult can cover a sabbatical). Dependent
            partner plus kids is the strongest civilian lock besides a giant mortgage. Optional extra:
            would they support a cheaper life, or is the current lifestyle a joint identity?
          </Text>
        </CardBody>
      </Card>

      <Stack gap={8}>
        <H2>Worked intuition</H2>
        <Table
          headers={["Profile", "Setup", "Ballpark score", "Why"]}
          rows={profiles.map((item) => [item.name, item.setup, item.score, item.why])}
          rowTone={["success", "warning", "danger", "info"]}
          striped
        />
      </Stack>

      <Card size="lg">
        <CardHeader trailing={<Pill tone="neutral">Bands</Pill>}>What the number should mean</CardHeader>
        <CardBody>
          <Text>80–100 Untethered — you could walk out and keep the people you are responsible for afloat.</Text>
          <Text>60–79 Loose chains — one focused year of cuts or savings from actually free.</Text>
          <Text>40–59 Golden handcuffs — paid well, owned quietly. The job funds a life you would hate to shrink.</Text>
          <Text>20–39 Corporate hostage — the paycheck is the leash. Quitting is a family crisis.</Text>
          <Text>0–19 Indentured — the machine cannot stop. Something structural has to give first (housing, debt, or dependents’ costs).</Text>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>If this becomes an app later</CardHeader>
        <CardBody>
          <Text>
            Ask for take-home and liquid savings first. Then the list you already have. Show two scores:
            life-as-now vs life-if-I-cut-the-optional-layer. Rank “what is cuffing you” by hard-lock
            weight, and “what would free you fastest” by cuttable dollars. That second list is the
            product: subscriptions and hobbies at the top, kids at the bottom.
          </Text>
        </CardBody>
      </Card>
    </Stack>
  );
}
