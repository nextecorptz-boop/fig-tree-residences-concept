/**
 * Homepage copy.
 *
 * Every factual claim here traces to docs/CONTENT_DATABASE.md — the brochure and
 * the property's own live site. The voice is new; the facts are not invented.
 * Distances, the 43 m² room size, the amenity list and the opening date are all
 * the client's own published claims.
 *
 * Two things are deliberately absent: prices (the property publishes none
 * anywhere) and guest quotations (no verifiable review text exists in this
 * project — see lib/content/testimonials.ts).
 */

export const hero = {
  eyebrow: "Msasani Peninsula · Dar es Salaam",
  line1: "A garden",
  line2: "kept quietly",
  standfirst:
    "Thirteen Yacht Club Road. Behind the gate, a fig tree older than the building, and twenty-four apartments that have learned to keep their voices down.",
  quote: "The pursuit, even of the best things, ought to be calm and tranquil.",
  quoteAttribution: "Marcus Tullius Cicero",
  scrollCue: "Enter the garden",
};

export const welcome = {
  label: "01 — The Garden",
  headline: "Masaki is loud.\nThis is the part that isn't.",
  body: [
    "The peninsula moves quickly. Traffic on Chole Road, the yacht club filling up by six, the Slipway on a Saturday. Fig Tree sits four hundred paces from all of it and hears almost none of it.",
    "What you notice first is the tree. It was here before the building, and the building was designed around it rather than through it — which tells you most of what you need to know about how this place is run.",
  ],
  stats: [
    { value: "24", label: "Serviced apartments" },
    { value: "43m²", label: "Every room, minimum" },
    { value: "2018", label: "Doors opened" },
    { value: "200m", label: "To the yacht club" },
  ],
};

export const rooms = {
  label: "02 — The Apartments",
  headline: "Room enough to stay a season",
  standfirst:
    "Every apartment is non-smoking, serviced daily, and built to the same 43 square metres — a queen bed, a sofa bed, a full kitchenette, and a balcony with something green in front of it.",
  features: [
    "Queen bed and sofa beds",
    "Private bathroom with rain shower",
    "Fully equipped kitchenette",
    "Kettle, toaster and coffee press",
    "Desk with office chair",
    "Sitting area with private balcony",
    "Free high-speed WiFi",
    "Flat-screen TV with satellite channels",
    "Daily housekeeping",
    "Laundry facilities available",
  ],
  cards: [
    {
      key: "bedroom-arch-palm" as const,
      name: "The Arched Studio",
      note: "Palm-carved headboard, morning light from the east.",
    },
    {
      key: "bedroom-white-arch" as const,
      name: "The White Room",
      note: "Softest of the set. Linen, timber, and very little else.",
    },
    {
      key: "bedroom-arch-green" as const,
      name: "The Green Room",
      note: "Same carved headboard, a cooler palette next door.",
    },
    {
      key: "bedroom-classic-lighthouse" as const,
      name: "Classic Residence",
      note: "The property's original finish, toward the garden's older trees.",
    },
    {
      key: "kitchenette-bar" as const,
      name: "The Kitchenette",
      note: "Cook for yourself. We will do the shopping if you would rather not.",
    },
    {
      key: "living-balcony" as const,
      name: "The Balcony",
      note: "Where most guests end up, most evenings.",
    },
    {
      key: "bathroom-full-view" as const,
      name: "The Bathroom",
      note: "Rain shower, in every apartment.",
    },
    {
      key: "bedroom-classic-attic" as const,
      name: "The Top Floor",
      note: "A quieter room, set under the roofline.",
    },
  ],
};

export const gym = {
  label: "04a — The Gym",
  headline: "Indoor, before the pool",
  body: "Cardio, free weights, and a mat for the mornings that need it — the one indoor amenity most guests never plan for and end up using anyway.",
};

export const reception = {
  label: "The Arrival",
  headline: "Where the day starts and ends",
  body: "A small, warm room rather than a lobby — the desk for check-in, and a lounge for the ten minutes before a taxi arrives.",
};

export const businessFacilities = {
  label: "Business Facilities",
  headline: "A small room, for small meetings",
  body: "The property keeps a private meeting room for guests who need one — the brochure lists it alongside the pool and the gym as a standing amenity.",
  note: "No photograph of this room exists yet in the property's asset library. This section will carry one the day a real photograph is taken.",
};

export const garden = {
  label: "03 — The Grounds",
  headline: "You may never\nsee another guest",
  body: "The property's own words, and they are not a boast — they are the plan. Extensive gardens, quiet recesses, a barbecue area, and a living wall that takes two people a week to keep. The premises are reserved exclusively for guests.",
  pull: "Slowing down is the amenity.",
};

export const pool = {
  label: "04 — Pool & Wellness",
  headline: "Water, shade, and nowhere to be",
  body: "An outdoor pool under the canopy, an indoor and outdoor gym, and the kind of afternoon where the only decision is which end of the garden to read in.",
  items: [
    { name: "Swimming pool", note: "Outdoor, shaded by mature canopy" },
    { name: "Indoor & outdoor gym", note: "Cardio, free weights, mats" },
    { name: "BBQ area", note: "In the gardens, with quiet recesses" },
    { name: "Conference room", note: "For small private meetings" },
  ],
};

export const dining = {
  label: "05 — Dining",
  headline: "The roof, at six",
  body: "The rooftop restaurant and bar looks over the bay and the yacht club, and it is the one part of Fig Tree that does not whisper. String lights, a sundowner, and the Indian Ocean going gold.",
  detail:
    "Or stay in. The kitchenettes are full-sized, and there is a shopping service for when you would rather cook.",
};

export const masaki = {
  label: "06 — The Peninsula",
  headline: "Everything, four minutes away",
  standfirst:
    "Fig Tree sits in Leopard Cove Bay, on the Msasani Peninsula. These are the property's own measured distances.",
  // `short` is what the map draws; `name` is what the list reads. Truncating the
  // long names on the map with an ellipsis looked like a rendering fault.
  // Positions are schematic — they show relationships, not survey coordinates.
  places: [
    { name: "Dar es Salaam Yacht Club", short: "Yacht Club", distance: "200 m", x: 26, y: 68, note: "Just down the road" },
    { name: "SALI International Hospital", short: "SALI Hospital", distance: "100 m", x: 63, y: 62, note: "With pharmacy" },
    { name: "Aga Khan Clinic", short: "Aga Khan Clinic", distance: "500 m", x: 78, y: 46, note: "" },
    { name: "Convenience & grocery shops", short: "Grocery shops", distance: "800 m", x: 40, y: 28, note: "" },
    { name: "The Slipway Waterfront", short: "The Slipway", distance: "800 m – 1 km", x: 15, y: 38, note: "Shops and restaurants" },
    { name: "Sea Cliff Village", short: "Sea Cliff", distance: "1 km", x: 86, y: 18, note: "Restaurants" },
    { name: "International schools", short: "Int. schools", distance: "1 – 2 km", x: 62, y: 9, note: "DIA and IST Upper School" },
  ],
};

export const stories = {
  label: "07 — Guest Stories",
  headline: "In their words",
};

export const booking = {
  label: "08 — Reservations",
  headline: "Stay a week.\nStay a year.",
  body: "Fig Tree takes both short and long stays, and rates for longer stays are set by conversation rather than by a table. Tell us the dates and we will come back to you the same day.",
};

export const departure = {
  line: "I never want to leave",
  body: "Most guests say some version of it on the way out. We have started taking it as the brief.",
};
