// OKLCH Color Names Dictionary
// Keys are "ToneName-HueName" (e.g. "Neon-Rose", "Mist-Sky").
// Special Hue: "Neutral" for achromatic colors (e.g. "Mist-Neutral").
// Updated to match OKLCH color wheel (Red ~29°, Blue ~264°, etc.)

export const CREATIVE_NAMES: Record<string, string> = {
  // ============================================
  // ACHROMATIC (Neutral) - No Hue
  // ============================================
  "Neon-Neutral": "White Pulse",
  "Vivid-Neutral": "Silver Flash",
  "Deep-Neutral": "Obsidian",
  "Pale-Neutral": "Swan Feather",
  "Light-Neutral": "Platinum",
  "Mute-Neutral": "Steel",
  "Dark-Neutral": "Charcoal",
  "Mist-Neutral": "Silence",
  "Fog-Neutral": "Winter Breath",
  "Ash-Neutral": "Urban Ghost",
  "Shadow-Neutral": "Void",

  // ============================================
  // REDS & PINKS (0° - 40° OKLCH)
  // ============================================

  // --- CRIMSON (0° - Deep Pink/Red) ---
  "Neon-Crimson": "Electric Cherry",
  "Vivid-Crimson": "Dragon Fruit",
  "Deep-Crimson": "Blood Moon",
  "Pale-Crimson": "Cotton Candy",
  "Light-Crimson": "Strawberry Milk",
  "Mute-Crimson": "Dusty Pink",
  "Dark-Crimson": "Dried Rose",
  "Mist-Crimson": "First Blush",
  "Fog-Crimson": "Pink Haze",
  "Ash-Crimson": "Faded Wine",
  "Shadow-Crimson": "Black Cherry",

  // --- ROSE (15° - Rose Pink) ---
  "Neon-Rose": "Neon Flamingo",
  "Vivid-Rose": "Passion Fruit",
  "Deep-Rose": "Velvet Rose",
  "Pale-Rose": "First Love",
  "Light-Rose": "Candy Floss",
  "Mute-Rose": "Antique Rose",
  "Dark-Rose": "Dried Petals",
  "Mist-Rose": "Angel's Breath",
  "Fog-Rose": "Morning Haze",
  "Ash-Rose": "Old Lace",
  "Shadow-Rose": "Secret Garden",

  // --- SCARLET (25° - True Red) ---
  "Neon-Scarlet": "Laser Red",
  "Vivid-Scarlet": "Fire Engine",
  "Deep-Scarlet": "Crimson Tide",
  "Pale-Scarlet": "Coral Pink",
  "Light-Scarlet": "Salmon",
  "Mute-Scarlet": "Brick Dust",
  "Dark-Scarlet": "Maroon",
  "Mist-Scarlet": "Blush Mist",
  "Fog-Scarlet": "Rose Fog",
  "Ash-Scarlet": "Terracotta",
  "Shadow-Scarlet": "Oxblood",

  // --- VERMILION (35° - Red-Orange) ---
  "Neon-Vermilion": "Neon Orange",
  "Vivid-Vermilion": "Tomato",
  "Deep-Vermilion": "Burnt Sienna",
  "Pale-Vermilion": "Peach Sorbet",
  "Light-Vermilion": "Cantaloupe",
  "Mute-Vermilion": "Rust",
  "Dark-Vermilion": "Mahogany",
  "Mist-Vermilion": "Sunset Glow",
  "Fog-Vermilion": "Dusty Coral",
  "Ash-Vermilion": "Clay Pot",
  "Shadow-Vermilion": "Burnt Umber",

  // ============================================
  // ORANGES (40° - 70° OKLCH)
  // ============================================

  // --- TANGERINE (45° - Orange) ---
  "Neon-Tangerine": "Electric Orange",
  "Vivid-Tangerine": "Juicy Orange",
  "Deep-Tangerine": "Copper",
  "Pale-Tangerine": "Creamsicle",
  "Light-Tangerine": "Mango",
  "Mute-Tangerine": "Pumpkin Spice",
  "Dark-Tangerine": "Cinnamon",
  "Mist-Tangerine": "Apricot Mist",
  "Fog-Tangerine": "Sandy Beach",
  "Ash-Tangerine": "Bronze",
  "Shadow-Tangerine": "Espresso",

  // --- AMBER (55° - Deep Orange) ---
  "Neon-Amber": "High Voltage",
  "Vivid-Amber": "Marigold",
  "Deep-Amber": "Amber Stone",
  "Pale-Amber": "Vanilla Cream",
  "Light-Amber": "Buttercream",
  "Mute-Amber": "Caramel",
  "Dark-Amber": "Brown Sugar",
  "Mist-Amber": "Warm Sand",
  "Fog-Amber": "Wheat Field",
  "Ash-Amber": "Old Brass",
  "Shadow-Amber": "Dark Honey",

  // --- APRICOT (65° - Yellow-Orange) ---
  "Neon-Apricot": "Laser Lemon",
  "Vivid-Apricot": "Sunflower",
  "Deep-Apricot": "Mustard",
  "Pale-Apricot": "Champagne",
  "Light-Apricot": "Pale Gold",
  "Mute-Apricot": "Dijon",
  "Dark-Apricot": "Raw Umber",
  "Mist-Apricot": "Morning Light",
  "Fog-Apricot": "Straw Hat",
  "Ash-Apricot": "Antique Gold",
  "Shadow-Apricot": "Walnut",

  // ============================================
  // YELLOWS & GOLDS (70° - 120° OKLCH)
  // ============================================

  // --- HONEY (75° - Golden Yellow) ---
  "Neon-Honey": "Cyber Yellow",
  "Vivid-Honey": "Golden Sun",
  "Deep-Honey": "Honey Bee",
  "Pale-Honey": "Lemon Chiffon",
  "Light-Honey": "Butter",
  "Mute-Honey": "Old Gold",
  "Dark-Honey": "Bronze Age",
  "Mist-Honey": "Moonbeam",
  "Fog-Honey": "Parchment",
  "Ash-Honey": "Khaki",
  "Shadow-Honey": "Olive Brown",

  // --- MARIGOLD (90° - Yellow) ---
  "Neon-Marigold": "Electric Yellow",
  "Vivid-Marigold": "Dandelion",
  "Deep-Marigold": "Curry",
  "Pale-Marigold": "Cream",
  "Light-Marigold": "Banana",
  "Mute-Marigold": "Sand Dune",
  "Dark-Marigold": "Olive Oil",
  "Mist-Marigold": "Ivory",
  "Fog-Marigold": "Linen",
  "Ash-Marigold": "Taupe",
  "Shadow-Marigold": "Dark Olive",

  // --- LEMON (105° - Bright Yellow) ---
  "Neon-Lemon": "Highlighter",
  "Vivid-Lemon": "Chartreuse",
  "Deep-Lemon": "Olive",
  "Pale-Lemon": "Pale Lime",
  "Light-Lemon": "Spring Bud",
  "Mute-Lemon": "Sage",
  "Dark-Lemon": "Army Green",
  "Mist-Lemon": "Celery",
  "Fog-Lemon": "Pale Sage",
  "Ash-Lemon": "Moss",
  "Shadow-Lemon": "Forest Floor",

  // ============================================
  // GREENS (120° - 160° OKLCH)
  // ============================================

  // --- LIME (120° - Yellow-Green) ---
  "Neon-Lime": "Electric Lime",
  "Vivid-Lime": "Lime Soda",
  "Deep-Lime": "Avocado",
  "Pale-Lime": "Mint Cream",
  "Light-Lime": "Pistachio",
  "Mute-Lime": "Fern",
  "Dark-Lime": "Hunter",
  "Mist-Lime": "Morning Dew",
  "Fog-Lime": "Sea Foam",
  "Ash-Lime": "Eucalyptus",
  "Shadow-Lime": "Deep Forest",

  // --- SPROUT (135° - True Green) ---
  "Neon-Sprout": "Neon Green",
  "Vivid-Sprout": "Spring Grass",
  "Deep-Sprout": "Emerald",
  "Pale-Sprout": "Mint",
  "Light-Sprout": "Spearmint",
  "Mute-Sprout": "Sage Green",
  "Dark-Sprout": "Pine",
  "Mist-Sprout": "Morning Meadow",
  "Fog-Sprout": "Seafoam",
  "Ash-Sprout": "Olive Drab",
  "Shadow-Sprout": "Evergreen",

  // --- JADE (150° - Blue-Green) ---
  "Neon-Jade": "Electric Jade",
  "Vivid-Jade": "Jade Stone",
  "Deep-Jade": "Malachite",
  "Pale-Jade": "Seafoam",
  "Light-Jade": "Mint Tea",
  "Mute-Jade": "Verdigris",
  "Dark-Jade": "Dark Teal",
  "Mist-Jade": "Sea Glass",
  "Fog-Jade": "Pale Jade",
  "Ash-Jade": "Patina",
  "Shadow-Jade": "Deep Sea",

  // ============================================
  // TEALS & CYANS (160° - 210° OKLCH)
  // ============================================

  // --- TEAL (165° - Teal) ---
  "Neon-Teal": "Cyber Teal",
  "Vivid-Teal": "Tropical Ocean",
  "Deep-Teal": "Deep Teal",
  "Pale-Teal": "Aqua Milk",
  "Light-Teal": "Pool Water",
  "Mute-Teal": "Eucalyptus Blue",
  "Dark-Teal": "Dark Cyan",
  "Mist-Teal": "Morning Pool",
  "Fog-Teal": "Teal Mist",
  "Ash-Teal": "Slate Teal",
  "Shadow-Teal": "Abyss",

  // --- AQUA (180° - Cyan-like) ---
  "Neon-Aqua": "Electric Aqua",
  "Vivid-Aqua": "Caribbean",
  "Deep-Aqua": "Ocean Deep",
  "Pale-Aqua": "Ice Blue",
  "Light-Aqua": "Powder Blue",
  "Mute-Aqua": "Blue Gray",
  "Dark-Aqua": "Petrol",
  "Mist-Aqua": "Arctic Mist",
  "Fog-Aqua": "Winter Lake",
  "Ash-Aqua": "Slate Blue",
  "Shadow-Aqua": "Midnight Ocean",

  // --- TURQUOISE (195° - True Cyan) ---
  "Neon-Turquoise": "Neon Cyan",
  "Vivid-Turquoise": "Turquoise Stone",
  "Deep-Turquoise": "Persian Blue",
  "Pale-Turquoise": "Robin's Egg",
  "Light-Turquoise": "Sky Pool",
  "Mute-Turquoise": "Dusty Blue",
  "Dark-Turquoise": "Deep Ocean",
  "Mist-Turquoise": "Clear Sky",
  "Fog-Turquoise": "Morning Mist",
  "Ash-Turquoise": "Storm Blue",
  "Shadow-Turquoise": "Twilight Sea",

  // ============================================
  // BLUES (210° - 280° OKLCH)
  // ============================================

  // --- SKY (210° - Light Blue) ---
  "Neon-Sky": "Electric Blue",
  "Vivid-Sky": "Cerulean",
  "Deep-Sky": "Denim",
  "Pale-Sky": "Baby Blue",
  "Light-Sky": "Clear Sky",
  "Mute-Sky": "Dusty Sky",
  "Dark-Sky": "Navy",
  "Mist-Sky": "Cloud Nine",
  "Fog-Sky": "Blue Fog",
  "Ash-Sky": "Overcast",
  "Shadow-Sky": "Dusk",

  // --- AZURE (225° - Sky Blue) ---
  "Neon-Azure": "Cyber Blue",
  "Vivid-Azure": "Azure Sea",
  "Deep-Azure": "Royal Blue",
  "Pale-Azure": "Ice Crystal",
  "Light-Azure": "Cornflower",
  "Mute-Azure": "Periwinkle",
  "Dark-Azure": "Midnight Blue",
  "Mist-Azure": "Blue Pearl",
  "Fog-Azure": "Misty Blue",
  "Ash-Azure": "Slate",
  "Shadow-Azure": "Midnight",

  // --- COBALT (240° - Medium Blue) ---
  "Neon-Cobalt": "Electric Cobalt",
  "Vivid-Cobalt": "Cobalt Blue",
  "Deep-Cobalt": "Prussian Blue",
  "Pale-Cobalt": "Bluebell",
  "Light-Cobalt": "Forget-Me-Not",
  "Mute-Cobalt": "Dusty Cobalt",
  "Dark-Cobalt": "Dark Navy",
  "Mist-Cobalt": "Blue Dream",
  "Fog-Cobalt": "Blue Haze",
  "Ash-Cobalt": "Blue Steel",
  "Shadow-Cobalt": "Deep Night",

  // --- SAPPHIRE (255° - True Blue) ---
  "Neon-Sapphire": "Laser Blue",
  "Vivid-Sapphire": "Sapphire Stone",
  "Deep-Sapphire": "Deep Sapphire",
  "Pale-Sapphire": "Moonstone",
  "Light-Sapphire": "Periwinkle Blue",
  "Mute-Sapphire": "Thistle Blue",
  "Dark-Sapphire": "Dark Sapphire",
  "Mist-Sapphire": "Starlight",
  "Fog-Sapphire": "Twilight Haze",
  "Ash-Sapphire": "Storm Cloud",
  "Shadow-Sapphire": "Abyss Blue",

  // --- INDIGO (270° - Deep Blue) ---
  "Neon-Indigo": "Electric Indigo",
  "Vivid-Indigo": "Indigo Night",
  "Deep-Indigo": "Midnight Indigo",
  "Pale-Indigo": "Wisteria",
  "Light-Indigo": "Iris Blue",
  "Mute-Indigo": "Dusty Indigo",
  "Dark-Indigo": "Dark Indigo",
  "Mist-Indigo": "Dreams",
  "Fog-Indigo": "Night Fog",
  "Ash-Indigo": "Charcoal Blue",
  "Shadow-Indigo": "Deep Space",

  // ============================================
  // VIOLETS & PURPLES (280° - 320° OKLCH)
  // ============================================

  // --- VIOLET (280° - Blue-Violet) ---
  "Neon-Violet": "Ultraviolet",
  "Vivid-Violet": "Violet Storm",
  "Deep-Violet": "Royal Purple",
  "Pale-Violet": "Lavender Blush",
  "Light-Violet": "Soft Violet",
  "Mute-Violet": "Dusty Violet",
  "Dark-Violet": "Deep Violet",
  "Mist-Violet": "Violet Mist",
  "Fog-Violet": "Purple Haze",
  "Ash-Violet": "Plum Gray",
  "Shadow-Violet": "Nightshade",

  // --- LAVENDER (290° - Light Purple) --- #ADA8F9 maps here!
  "Neon-Lavender": "Electric Lavender",
  "Vivid-Lavender": "Bright Lavender",
  "Deep-Lavender": "Lavender Purple",
  "Pale-Lavender": "Lavender Cream",
  "Light-Lavender": "Lavender",
  "Mute-Lavender": "Dusty Lavender",
  "Dark-Lavender": "Dark Lavender",
  "Mist-Lavender": "Lavender Mist",
  "Fog-Lavender": "Pale Twilight",
  "Ash-Lavender": "Lavender Gray",
  "Shadow-Lavender": "Twilight Shade",

  // --- AMETHYST (305° - Purple) ---
  "Neon-Amethyst": "Neon Purple",
  "Vivid-Amethyst": "Amethyst Stone",
  "Deep-Amethyst": "Deep Amethyst",
  "Pale-Amethyst": "Pale Plum",
  "Light-Amethyst": "Light Plum",
  "Mute-Amethyst": "Dusty Purple",
  "Dark-Amethyst": "Dark Plum",
  "Mist-Amethyst": "Purple Dream",
  "Fog-Amethyst": "Mauve Mist",
  "Ash-Amethyst": "Purple Ash",
  "Shadow-Amethyst": "Eggplant",

  // ============================================
  // MAGENTAS & PINKS (320° - 360° OKLCH)
  // ============================================

  // --- ORCHID (320° - Magenta-Purple) ---
  "Neon-Orchid": "Electric Orchid",
  "Vivid-Orchid": "Wild Orchid",
  "Deep-Orchid": "Deep Orchid",
  "Pale-Orchid": "Orchid Pink",
  "Light-Orchid": "Soft Orchid",
  "Mute-Orchid": "Dusty Orchid",
  "Dark-Orchid": "Dark Orchid",
  "Mist-Orchid": "Orchid Mist",
  "Fog-Orchid": "Orchid Haze",
  "Ash-Orchid": "Orchid Gray",
  "Shadow-Orchid": "Deep Magenta",

  // --- FUCHSIA (335° - True Magenta) ---
  "Neon-Fuchsia": "Hot Pink",
  "Vivid-Fuchsia": "Fuchsia",
  "Deep-Fuchsia": "Magenta",
  "Pale-Fuchsia": "Pink Lemonade",
  "Light-Fuchsia": "Bubble Gum",
  "Mute-Fuchsia": "Dusty Pink",
  "Dark-Fuchsia": "Dark Magenta",
  "Mist-Fuchsia": "Pink Mist",
  "Fog-Fuchsia": "Rose Quartz",
  "Ash-Fuchsia": "Mauve",
  "Shadow-Fuchsia": "Mulberry",

  // --- CERISE (350° - Pink-Magenta) ---
  "Neon-Cerise": "Neon Pink",
  "Vivid-Cerise": "Cerise",
  "Deep-Cerise": "Raspberry",
  "Pale-Cerise": "Cherry Blossom",
  "Light-Cerise": "Pink Rose",
  "Mute-Cerise": "Dusty Rose",
  "Dark-Cerise": "Burgundy",
  "Mist-Cerise": "Pink Cloud",
  "Fog-Cerise": "Blush Fog",
  "Ash-Cerise": "Rose Ash",
  "Shadow-Cerise": "Wine",
};
