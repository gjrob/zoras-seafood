// Fish catalog data for Zora's Market & Kitchen
// Castle Street · Wilmington, NC · Since 1956

export interface Recipe {
  name: string;
  serves: number;
  time: string;
  ingredients: string[];
  steps: string[];
}

export interface Fish {
  id: string;
  name: string;
  localName?: string;           // nickname used at the market
  category: "local-nc" | "offshore" | "deepwater" | "shellfish";
  tags: string[];               // used for filtering chips
  description: string;
  flavorProfile: {
    taste: string;              // e.g. "Mild & sweet"
    texture: string;            // e.g. "Firm, large flake"
    fat: string;                // "Lean" | "Medium" | "Rich"
  };
  seasons: string[];            // peak availability months
  marketWeight?: string;        // typical whole-fish weight at the counter
  recipes?: Recipe[];
}

export const FISH_CATALOG: Fish[] = [
  // ── LOCAL NC ─────────────────────────────────────────────────────────────

  {
    id: "almaco-jack",
    name: "Almaco Jack",
    category: "local-nc",
    tags: ["local-nc", "firm", "grilling"],
    description:
      "A hard-fighting offshore visitor that shows up along the Carolina coast when the water warms. Almaco Jack delivers a clean, assertive flavor that takes bold seasoning without flinching. Prized by chefs for its meaty loins and by anglers for the battle it puts up.",
    flavorProfile: { taste: "Bold & savory", texture: "Firm, moist", fat: "Medium" },
    seasons: ["June", "July", "August", "September"],
    marketWeight: "5–20 lbs",
  },

  {
    id: "bluefish",
    name: "Bluefish",
    category: "local-nc",
    tags: ["local-nc", "bold", "smoking"],
    description:
      "Wilmington locals grew up eating Bluefish straight off the pier. Oily, rich, and unapologetically intense, it's a fish that demands respect — and rewards those who know how to cook it. Best smoked, pickled, or paired with acid to balance its depth.",
    flavorProfile: { taste: "Rich & pronounced", texture: "Soft flake, moist", fat: "Rich" },
    seasons: ["April", "May", "October", "November"],
    marketWeight: "2–10 lbs",
  },

  {
    id: "cobia",
    name: "Cobia",
    localName: "Lemon Fish",
    category: "local-nc",
    tags: ["local-nc", "versatile", "grilling", "sashimi"],
    description:
      "Called Lemon Fish by Wilmington old-timers, Cobia is one of the most versatile fish in Carolina waters. Its firm white flesh handles grilling, roasting, and sashimi with equal grace. Spring and early summer migrations bring the best fish to our counter — thick, clean-cut loins that chefs love.",
    flavorProfile: { taste: "Mild, buttery", texture: "Firm, dense flake", fat: "Medium" },
    seasons: ["April", "May", "June", "July"],
    marketWeight: "20–50 lbs",
  },

  {
    id: "drum-red",
    name: "Red Drum",
    localName: "Redfish / Channel Bass",
    category: "local-nc",
    tags: ["local-nc", "versatile", "blackening"],
    description:
      "The state fish of North Carolina. Red Drum runs the estuaries and nearshore waters around Wilmington year-round and is synonymous with Coastal Carolina cooking — especially Cajun-style blackened redfish. Sweet, mild, and incredibly forgiving on the grill or in a cast iron.",
    flavorProfile: { taste: "Sweet & mild", texture: "Medium flake, moist", fat: "Lean" },
    seasons: ["Year-round", "Peak: September–November"],
    marketWeight: "5–30 lbs",
  },

  {
    id: "drum-black",
    name: "Black Drum",
    category: "local-nc",
    tags: ["local-nc", "hearty"],
    description:
      "Bigger and bolder than its red cousin, Black Drum is a bottom-feeder that earns its living in the Cape Fear estuary. Younger fish under 15 lbs are the sweet spot — mild, slightly shellfish-tasting flesh from a lifetime of eating clams and oysters. Larger fish get stronger; handle them with smoky preparations.",
    flavorProfile: { taste: "Mild, faintly briny", texture: "Firm, coarse flake", fat: "Lean" },
    seasons: ["March", "April", "May", "September", "October"],
    marketWeight: "5–40 lbs",
  },

  {
    id: "flounder",
    name: "Flounder",
    localName: "Fluke / Southern Flounder",
    category: "local-nc",
    tags: ["local-nc", "mild", "pan-fry", "beginner-friendly"],
    description:
      "The quintessential Carolina flatfish. Southern Flounder lurk in the tidal creeks and inlets around Wilmington and hit the counter as whole fish or skinless fillets. Delicate, sweet, and almost foolproof to cook — a perfect blank canvas for lemon butter, crab stuffing, or a light cornmeal crust.",
    flavorProfile: { taste: "Delicate & sweet", texture: "Fine flake, tender", fat: "Lean" },
    seasons: ["May", "June", "September", "October", "November"],
    marketWeight: "1–5 lbs",
  },

  {
    id: "sheepshead",
    name: "Sheepshead",
    localName: "Convict Fish",
    category: "local-nc",
    tags: ["local-nc", "sweet", "shellfish-flavor"],
    description:
      "Named for its uncanny human-like teeth, Sheepshead dines almost exclusively on barnacles, oysters, and crabs — and it shows. The meat carries a subtle shellfish sweetness that surprises first-timers. Locally legendary but underappreciated nationally, which means great value at the counter.",
    flavorProfile: { taste: "Sweet, faintly shellfish", texture: "Firm, fine flake", fat: "Lean" },
    seasons: ["January", "February", "March", "November", "December"],
    marketWeight: "2–8 lbs",
  },

  {
    id: "snapper-vermilion",
    name: "Vermilion Snapper",
    localName: "Beeliners",
    category: "local-nc",
    tags: ["local-nc", "whole-fish", "pan-fry"],
    description:
      "Beeliners are a local favorite — smaller than their Red Snapper cousins but just as flavored. Caught over wrecks and hard bottom within 60 miles of Wilmington, they hit the counter fresh-off-the-boat. Perfect fried whole or pan-roasted with garlic, olive oil, and whatever herb is in season.",
    flavorProfile: { taste: "Sweet & nutty", texture: "Tender, medium flake", fat: "Lean" },
    seasons: ["Year-round", "Peak: Summer"],
    marketWeight: "½–2 lbs",
  },

  {
    id: "spanish-mackerel",
    name: "Spanish Mackerel",
    category: "local-nc",
    tags: ["local-nc", "bold", "grilling", "smoking"],
    description:
      "A seasonal blitz that hits Cape Fear waters every spring and fall. Spanish Mackerel are one of the most overlooked great-eating fish on the East Coast — firm, oily, and loaded with omega-3s. Eaten day-of-catch for the mildest flavor, or hot-smoked for one of the best spreads you'll ever make.",
    flavorProfile: { taste: "Rich, slightly smoky", texture: "Firm, moist", fat: "Rich" },
    seasons: ["April", "May", "September", "October"],
    marketWeight: "1–3 lbs",
  },

  {
    id: "trout-speckled",
    name: "Speckled Sea Trout",
    localName: "Specks / Spotted Weakfish",
    category: "local-nc",
    tags: ["local-nc", "delicate", "pan-fry"],
    description:
      "Wilmington's most beloved inshore fish. Specks have a cult following among local anglers and the cooks who know them. Soft white flesh that melts in the mouth — don't overthink it. Brown butter, lemon, capers, and five minutes in the pan. One of the best fish in the South.",
    flavorProfile: { taste: "Sweet, delicate", texture: "Soft, fine flake", fat: "Lean" },
    seasons: ["Year-round", "Peak: Spring & Fall"],
    marketWeight: "1–4 lbs",
  },

  {
    id: "triggerfish",
    name: "Triggerfish",
    category: "local-nc",
    tags: ["local-nc", "sweet", "ceviche"],
    description:
      "Secretly one of the best-eating fish in the Southeast, Triggerfish is still a well-kept local secret. Its firm white flesh has a clean, almost lobster-like sweetness — great raw in ceviche, lightly sautéed in olive oil, or as a surprise-hit fish taco filling. Ask for it by name; it sells out fast.",
    flavorProfile: { taste: "Clean & sweet", texture: "Firm, large flake", fat: "Lean" },
    seasons: ["June", "July", "August", "September", "October"],
    marketWeight: "1–4 lbs",
  },

  // ── OFFSHORE ─────────────────────────────────────────────────────────────

  {
    id: "mahi-mahi",
    name: "Mahi Mahi",
    localName: "Dolphinfish / Dorado",
    category: "offshore",
    tags: ["offshore", "versatile", "tacos", "grilling"],
    description:
      "The showboat of offshore fishing — vivid green and gold, acrobatic on the line, and delicious on the plate. Mahi run the Gulf Stream off Wilmington in summer, and the fresh-caught loins that come back on the boats are a world apart from anything frozen. Sweet, moist, and forgiving: a crowd-pleaser every time.",
    flavorProfile: { taste: "Mild & sweet", texture: "Firm, large flake", fat: "Lean" },
    seasons: ["May", "June", "July", "August", "September"],
    marketWeight: "5–30 lbs",
  },

  {
    id: "tuna-yellowfin",
    name: "Yellowfin Tuna",
    localName: "Ahi",
    category: "offshore",
    tags: ["offshore", "sashimi", "searing", "premium"],
    description:
      "The Gulf Stream off Cape Hatteras and Wilmington produces outstanding Yellowfin all summer. Sashimi-grade loins come to the counter same-day or next-day from local offshore boats — rosy red, clean, and perfect for slicing raw. Also exceptional seared rare with sesame and soy, or conserved in olive oil.",
    flavorProfile: { taste: "Clean, rich", texture: "Dense, meaty", fat: "Medium" },
    seasons: ["June", "July", "August", "September", "October"],
    marketWeight: "30–150 lbs",
  },

  {
    id: "tuna-bluefin",
    name: "Bluefin Tuna",
    localName: "Giant Bluefin",
    category: "offshore",
    tags: ["offshore", "premium", "sashimi", "ultra-premium"],
    description:
      "The rarest and most celebrated fish we carry. North Carolina's winter Giant Bluefin fishery is world-class — these fish push 600–1,000 lbs and carry extraordinary fat content. When we have it, the otoro and chutoro belly cuts rival anything served in Tokyo. Call ahead; it moves in hours.",
    flavorProfile: { taste: "Rich, buttery, complex", texture: "Silky, dense", fat: "Rich" },
    seasons: ["December", "January", "February"],
    marketWeight: "200–1,000 lbs",
  },

  {
    id: "swordfish",
    name: "Swordfish",
    category: "offshore",
    tags: ["offshore", "steaks", "grilling", "premium"],
    description:
      "Few things match a fresh-cut Swordfish steak on a hot grill. Carolina longline boats targeting swordfish in deep Atlantic water bring back thick, ivory-pink steaks with a dense, meaty texture unlike any other fish. Brush with olive oil, season simply, and let the quality speak. Also spectacular as Swordfish Schnitzel — our signature preparation.",
    flavorProfile: { taste: "Mild, sweet, meaty", texture: "Dense, steak-like", fat: "Medium" },
    seasons: ["May", "June", "July", "August", "September", "October"],
    marketWeight: "50–400 lbs",
  },

  // ── DEEPWATER ────────────────────────────────────────────────────────────

  {
    id: "grouper-gag",
    name: "Gag Grouper",
    localName: "Grey Grouper",
    category: "deepwater",
    tags: ["deepwater", "versatile", "premium", "local-nc"],
    description:
      "The workhorse of the Carolina deepwater fishery. Gag Grouper lives over hard bottom and wrecks from 60 to 300 feet and is caught year-round by Wilmington's commercial fleet. Sweet, clean white flesh with a satisfying firmness that holds up beautifully to roasting, frying, or the steamer bag. If you can only cook one grouper, cook this one.",
    flavorProfile: { taste: "Sweet & clean", texture: "Firm, large flake", fat: "Lean" },
    seasons: ["Year-round", "Peak: Fall–Winter"],
    marketWeight: "5–40 lbs",
    recipes: [
      {
        name: "Roasted Gag Grouper with Lemon Caper Brown Butter",
        serves: 4,
        time: "25 min",
        ingredients: [
          "4 × 6-oz Gag Grouper fillets, skin on",
          "2 tbsp olive oil",
          "Kosher salt & cracked black pepper",
          "4 tbsp unsalted butter",
          "2 tbsp capers, drained",
          "2 tbsp lemon juice",
          "2 tbsp flat-leaf parsley, chopped",
          "Lemon wedges to serve",
        ],
        steps: [
          "Preheat oven to 425°F. Pat fillets dry, season generously with salt and pepper.",
          "Heat olive oil in an oven-safe skillet over high heat until shimmering. Add fillets skin-side down; press gently for 30 seconds.",
          "Transfer pan to oven. Roast 8–10 minutes until flesh is opaque and flakes at the thickest point.",
          "Remove fish; keep warm. Return pan to medium heat, add butter and cook until it turns golden-amber and smells nutty, about 2 minutes.",
          "Off heat, add capers, lemon juice, and parsley. Sauce will sizzle — swirl to combine.",
          "Plate fish skin-side up, spoon brown butter liberally over top. Serve with lemon wedges and a simple green salad.",
        ],
      },
    ],
  },

  {
    id: "grouper-red",
    name: "Red Grouper",
    category: "deepwater",
    tags: ["deepwater", "premium", "versatile"],
    description:
      "Prized by chefs throughout the Gulf and Southeast for its slightly sweeter profile compared to Gag. Red Grouper lives a bit deeper and has a finer, more delicate flake. When it shows up at the counter it tends to move fast — its reputation precedes it in any serious seafood kitchen.",
    flavorProfile: { taste: "Sweet, slightly more delicate than Gag", texture: "Firm, fine flake", fat: "Lean" },
    seasons: ["Year-round"],
    marketWeight: "5–20 lbs",
  },

  {
    id: "tilefish-golden",
    name: "Golden Tilefish",
    category: "deepwater",
    tags: ["deepwater", "premium", "sweetest"],
    description:
      "Pulled from submarine canyon edges in 400–800 feet of water, Golden Tilefish is one of the most beautiful and best-eating fish in the Atlantic. Its diet of shrimp and crabs gives the flesh a sweet, almost lobster-like flavor. Thick fillets or whole fish — buttered and roasted simply, it doesn't need much else.",
    flavorProfile: { taste: "Sweet, shrimp-like", texture: "Firm, moist", fat: "Lean" },
    seasons: ["Year-round"],
    marketWeight: "5–30 lbs",
  },

  {
    id: "snapper-red",
    name: "Red Snapper",
    category: "deepwater",
    tags: ["deepwater", "premium", "whole-fish"],
    description:
      "The most recognized premium snapper in the country. True American Red Snapper from the Gulf or South Atlantic is a different animal from the impostors sold at many fish counters. When we carry it, it's the real thing — certified, day-boat, and priced accordingly. Whole-roasted with herbs is the way.",
    flavorProfile: { taste: "Sweet, nutty, full-flavored", texture: "Firm, large flake", fat: "Lean" },
    seasons: ["Year-round — limited availability"],
    marketWeight: "2–8 lbs",
  },

  // ── SHELLFISH ─────────────────────────────────────────────────────────────

  {
    id: "atlantic-mussels",
    name: "Atlantic Mussels",
    category: "shellfish",
    tags: ["shellfish", "sustainably-farmed", "quick-cook"],
    description:
      "Rope-grown Atlantic Mussels are one of the most sustainable proteins you can put on your table. We source ours from cold, clean waters — plump, briny, and ready in under 10 minutes. The classic: white wine, garlic, butter, and a baguette. The alternative: our sambal-coconut preparation below. Either way, the pot gets scraped clean.",
    flavorProfile: { taste: "Briny & sweet", texture: "Tender, plump", fat: "Lean" },
    seasons: ["Year-round", "Peak: Fall–Winter"],
    marketWeight: "2 lb bags",
    recipes: [
      {
        name: "Sambal-Coconut Steamed Mussels",
        serves: 2,
        time: "15 min",
        ingredients: [
          "2 lbs Atlantic Mussels, scrubbed and debearded",
          "2 tbsp unsalted butter",
          "3 garlic cloves, thinly sliced",
          "1 tbsp fresh ginger, grated",
          "2 tbsp sambal oelek",
          "1 cup coconut milk (full-fat)",
          "½ cup dry white wine",
          "Juice of 1 lime",
          "¼ cup fresh cilantro, roughly chopped",
          "Crusty bread to serve",
        ],
        steps: [
          "Discard any mussels that are cracked or don't close when tapped.",
          "Melt butter in a large pot (with lid) over medium-high heat. Add garlic and ginger, cook 1 minute until fragrant.",
          "Add sambal oelek, stir 30 seconds. Pour in white wine; bring to a boil.",
          "Add mussels in a single layer, pour coconut milk over top, cover tightly.",
          "Steam 4–6 minutes, shaking the pot once, until all mussels have opened. Discard any that stay closed.",
          "Squeeze lime over the pot, scatter cilantro. Serve immediately in deep bowls with plenty of bread for the broth.",
        ],
      },
    ],
  },

  {
    id: "blue-crab",
    name: "Blue Crab",
    localName: "Jimmy / Sook / Peeler",
    category: "shellfish",
    tags: ["shellfish", "local-nc", "steamed", "iconic"],
    description:
      "The blue crab is to Wilmington what lobster is to Maine. Callinectes sapidus — 'beautiful swimmer' — lives in Cape Fear's tidal creeks and is the undisputed king of the summer seafood season. We carry them live, steamed, or picked — plus soft shells in season. Seasoned with Old Bay, steamed over apple cider vinegar, and eaten with newspaper on the table.",
    flavorProfile: { taste: "Sweet, briny, iconic", texture: "Tender, succulent", fat: "Lean" },
    seasons: ["April", "May", "June", "July", "August", "September", "October"],
    marketWeight: "½–¾ lb each",
  },

  {
    id: "oysters-new-river-pirates",
    name: "New River Pirates Oysters",
    localName: "NRP Oysters",
    category: "shellfish",
    tags: ["shellfish", "local-nc", "raw-bar", "sustainably-farmed"],
    description:
      "Grown on the New River just north of Jacksonville, NC, New River Pirates oysters are Zora's house oyster — small to medium with a firm cup, clean brine, and a sweet melon finish that reflects the estuary's mix of fresh and salt water. On the half-shell with our mignonette or plain: either way, they disappear.",
    flavorProfile: { taste: "Clean brine, sweet melon finish", texture: "Firm, cupped", fat: "Lean" },
    seasons: ["September through April (R months)"],
    marketWeight: "Per dozen or bushel",
  },
];

// helper — sorted for the catalog page: local-nc first, then alpha within category
export const SORTED_CATALOG = [...FISH_CATALOG].sort((a, b) => {
  const order = { "local-nc": 0, "shellfish": 1, "offshore": 2, "deepwater": 3 };
  const diff = order[a.category] - order[b.category];
  return diff !== 0 ? diff : a.name.localeCompare(b.name);
});

export const CATEGORY_LABELS: Record<Fish["category"], string> = {
  "local-nc":   "Local NC",
  "offshore":   "Offshore",
  "deepwater":  "Deepwater",
  "shellfish":  "Shellfish & Crabs",
};

export const CATEGORY_COLORS: Record<Fish["category"], { bg: string; text: string; border: string }> = {
  "local-nc":   { bg: "#d4f7e6", text: "#0a5c36", border: "#6ddba5" },
  "offshore":   { bg: "#ddeeff", text: "#0a3060", border: "#6aa8e8" },
  "deepwater":  { bg: "#ede0ff", text: "#3d0a60", border: "#a87ae8" },
  "shellfish":  { bg: "#fff3d4", text: "#5c3a00", border: "#e8bb5a" },
};
