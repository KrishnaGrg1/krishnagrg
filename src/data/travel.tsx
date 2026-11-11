import type { ReactNode } from "react"

export interface Photo {
  src: string
  alt: string
  caption?: string
}

export interface Video {
  src: string
  poster: string
}
export interface ItineraryDay {
  day: string // "Day 1"
  title: string // "Pokhara → Nayapul → Ulleri"
  altitude?: string // "2,020 m"
  detail?: string // a sentence or two about the day
}

export interface Trek {
  slug: string
  title: string
  region: string
  /** e.g. "2024" - optional, shown if set */
  year?: string
  /** e.g. "4,130 m" - optional, double-check against your own trip */
  altitude?: string
  /** One or two lines in your own words about the trip */
  note: string
  facts?: string[]
  // e.g. facts: ["5 days", "Oct–Nov", "Moderate"]
  /**
   * Optional hero video. When set, it replaces the big main photo and ALL
   * photos go into the strip below.
   * Files live in public/travel/<slug>/, e.g.
   *   video: { src: "/travel/mardi-himal/hero.mp4", poster: "/travel/mardi-himal/hero.webp" }
   */
  video?: { src: string; poster: string }[]
  photos: Photo[]
  content?: ReactNode
  itinerary?: ItineraryDay[]
}

/**
 * Builds the photo list for a trek from files named 1.webp, 2.webp, ...
 * inside public/travel/<slug>/.
 *
 * Example: gallery("poon-hill", 6) expects
 *   public/travel/poon-hill/1.webp ... 6.webp
 *
 * Start with count = 0 and raise it as you add photos.
 */
function gallery(slug: string, title: string, count: number): Photo[] {
  return Array.from({ length: count }, (_, i) => ({
    src: `/travel/${slug}/${i + 1}.jpg`,
    alt: `${title}, photo ${i + 1}`,
  }))
}

export const treks: Trek[] = [
  {
    slug: "annapurna-base-camp",
    video: [
      {
        src: "/travel/annapurna-base-camp/1.MOV",
        poster: "",
      },
      {
        src: "/travel/annapurna-base-camp/2.MOV",
        poster: "",
      },
    ],
    title: "Annapurna Base Camp",
    region: "Annapurna, Nepal",
    altitude: "4,130 m",
    year: "2024 & 2025",
    note: "I've made the journey to Annapurna Base Camp twice — first with my friends in October 2024, and again with my relatives in December 2025. The same mountains, the same trails, but two different experiences and countless memories along the way.",

    photos: gallery("annapurna-base-camp", "Annapurna Base Camp", 15),

    content: (
      <article>
        <p>
          Some places are worth visiting more than once, and Annapurna Base Camp
          is definitely one of them. I've completed this trek twice — my first
          journey was in October 2024 with my friends, and the second was in
          December 2025 with my relatives.
        </p>

        <p>
          Both trips followed the same five-day route, but each gave me a
          different experience. What I enjoyed most was the mountain scenery
          throughout the journey. Walking through the trails, passing small
          villages, and gradually getting closer to the Himalayas made every day
          special.
        </p>

        <p>
          The October trip had clearer weather, which made the mountain views
          even more enjoyable. In December, the experience was different. The
          temperatures were much colder, but that didn't make the journey any
          less memorable. Experiencing the same destination in two different
          seasons was something I really appreciated.
        </p>

        <p>
          One thing I love about trekking is that the destination isn't the only
          thing that matters. The conversations along the trail, the people
          you're travelling with, the little challenges, and the views you come
          across unexpectedly are all part of the experience.
        </p>

        <p>
          Here's how I completed the five-day Annapurna Base Camp journey, from
          Pokhara and back.
        </p>
        <p>
          Having completed this trek twice, I can say that Annapurna Base Camp
          is a place I'd happily visit again. The mountains, the changing
          landscapes, and the experience of sharing the journey with different
          people make it special every time. Two trips, two different seasons,
          and memories I'll always carry with me.
        </p>
      </article>
    ),

    itinerary: [
      {
        day: "Day 1",
        title: "Pokhara → Jhinu Danda → Chhomrong → Upper Sinuwa",
        detail:
          "The journey started with a drive from Pokhara to Jhinu Danda, where we began our trek. From there, we followed the mountain trails, crossed suspension bridges, and made our way towards Chhomrong. After passing through the village, we continued along the stone steps and uphill trails towards Upper Sinuwa. It was the beginning of five days in the mountains, and the excitement of the journey made every step worthwhile.",
      },
      {
        day: "Day 2",
        title: "Upper Sinuwa → Bamboo → Dovan → Himalaya → Deurali",
        detail:
          "We continued deeper into the Annapurna Sanctuary, passing through Bamboo, Dovan, and Himalaya. The trail took us through dense forests, waterfalls, rocky paths, and beautiful mountain surroundings. As we gained altitude, the air became colder and the landscape gradually changed. After a long day of walking, we finally reached Deurali, where we stopped for the night.",
      },
      {
        day: "Day 3",
        title: "Deurali → Machhapuchhre Base Camp → Annapurna Base Camp",
        altitude: "4,130 m",
        detail:
          "The day we had been looking forward to the most. Leaving Deurali, we continued towards Machhapuchhre Base Camp (MBC). The landscape gradually opened up, revealing incredible views of the surrounding Himalayan peaks. From MBC, we continued towards Annapurna Base Camp. Reaching 4,130 metres and finally standing among those massive mountains was one of the highlights of the entire journey. We spent the night at ABC, surrounded by the Himalayas.",
      },
      {
        day: "Day 4",
        title: "Annapurna Base Camp → MBC → Deurali → Bamboo → Lower Sinuwa",
        detail:
          "After spending time at Annapurna Base Camp, we started our return journey. We retraced our steps through Machhapuchhre Base Camp, Deurali, Himalaya, Dovan, and Bamboo before continuing towards Lower Sinuwa. It was a long day of descending, but seeing the familiar trails from a different direction made the journey interesting. By the end of the day, we had made it to Lower Sinuwa.",
      },
      {
        day: "Day 5",
        title: "Lower Sinuwa → Chhomrong → Jhinu Danda → Pokhara",
        detail:
          "The final day of the trek began with our descent from Lower Sinuwa towards Chhomrong and Jhinu Danda. After reaching Jhinu Danda, we took a jeep or local transport back to Pokhara. Just like that, our five-day Annapurna Base Camp adventure came to an end. We returned with tired legs, plenty of photographs, and memories that made the entire journey worthwhile.",
      },
    ],
  },
  // {
  //   slug: "mardi-himal",
  //   title: "Mardi Himal",
  //   region: "Annapurna, Nepal",
  //   note: "Write one or two lines here about what this trek was like for you.",
  //   photos: gallery("mardi-himal", "Mardi Himal", 0),
  // },
  // {
  //   slug: "khoke-danda",
  //   title: "Khoke Danda",
  //   region: "Annapurna, Nepal",
  //   note: "Write one or two lines here about what this trek was like for you.",
  //   photos: gallery("khoke-danda", "Khoke Danda", 0),
  // },

  {
    slug: "kori",
    title: "Kori",
    region: "Sikles, Kaski, Nepal",
    year: "2025",
    note: "A four-day journey to Kori in December 2025 with my relatives. From the peaceful village of Sikles to dense forest trails and breathtaking mountain views, this trek became special not just because of the scenery, but because of the people we met and the memories we made along the way.",

    photos: gallery("kori", "Kori", 17),
    video: [
      {
        src: "/travel/kori/1.mov",
        poster: "",
      },
      {
        src: "/travel/kori/2.mov",
        poster: "",
      },
      {
        src: "/travel/kori/3.mov",
        poster: "",
      },
      {
        src: "/travel/kori/4.mov",
        poster: "",
      },
      {
        src: "/travel/kori/5.mov",
        poster: "",
      },
    ],
    content: (
      <article>
        <p>
          Kori was one of my most memorable trekking experiences of 2025. I went
          there in early December with my relatives, including my sisters and
          aunt.
        </p>

        <p>
          Since some of my relatives found it difficult to carry their bags
          throughout the journey, we hired a porter to help carry our luggage.
          It made the journey a little easier for them, although the trails were
          still quite challenging.
        </p>

        <p>
          One thing that really stood out to me throughout this trek was the
          people we met along the way. I found them incredibly humble, kind, and
          innocent. Their simple way of living and welcoming nature left a
          lasting impression on me.
        </p>

        <p>
          The journey had its ups and downs. We walked through dense forests,
          crossed suspension bridges, enjoyed beautiful mountain views, and
          finally reached Kori. The sunset and mountain scenery there were
          something I won't easily forget.
        </p>

        <p>
          We spent four days exploring the area, enjoying the views, taking
          photographs, singing and dancing together. By the time we returned to
          Pokhara, we had collected so many beautiful memories that a part of me
          didn't even want the journey to end.
        </p>
      </article>
    ),

    itinerary: [
      {
        day: "Day 1",
        title: "Pokhara → Sikles → Tasa",
        detail:
          "Started early from Pokhara and reached Sikles at around 9 AM. After having dal bhat and masu for lunch, we rested for a while before starting the trek towards Tasa. The initial section was relatively easy, mostly downhill. However, after crossing a suspension bridge, the trail became a challenging uphill climb. It was manageable for me, but quite difficult for my relatives. After taking our time along the trail, we finally reached Tasa around 6 PM.",
      },
      {
        day: "Day 2",
        title: "Tasa → Dense Forest Trails → Kori",
        detail:
          "Woke up early, had breakfast, took some photographs, and started our journey towards Kori. Much of the trail passed through dense forests, making it a physically demanding day, especially for my relatives, who needed frequent breaks. Once we came out of the forest, we were rewarded with beautiful views of the surrounding hills and mountains. Around midday, we stopped for lunch using the food we had packed from Pokhara. We eventually reached Kori at around 4 PM, freshened up, and enjoyed an incredible sunset over the mountains. The evening became even more memorable as we spent time singing and dancing together.",
      },
      {
        day: "Day 3",
        title: "Kori → Sikles",
        detail:
          "Woke up early to enjoy the sunrise and the beautiful mountain views one more time. After breakfast and taking some photographs, we started our return journey towards Sikles. My relatives were already exhausted from the previous two days of trekking, so the journey was particularly challenging for them. Along the way, we met members of the Annapurna Conservation Area Project (ACAP). We eventually reached a suspension bridge at around 6 PM, when it was already dark. The ACAP members helped arrange a jeep for us, and we travelled back to Sikles, freshened up, and rested after a long day.",
      },
      {
        day: "Day 4",
        title: "Exploring Sikles → Pokhara",
        detail:
          "Woke up early, took some photographs, and spent time exploring the beautiful village of Sikles. After enjoying the peaceful surroundings and reflecting on the journey, we hired a jeep and returned to Pokhara. Even though the trek was over, I honestly didn't feel like leaving. The mountain scenery, the kindness of the people we met, and the memories we created together made this a journey I will always remember.",
      },
    ],
  },

  // {
  //   slug: "poon-hill-ghorepani",
  //   title: "Poon Hill and Ghorepani",
  //   region: "Annapurna, Nepal",
  //   altitude: "3,210 m",
  //   note: "Write one or two lines here about what this trek was like for you.",
  //   photos: gallery("poon-hill-ghorepani", "Poon Hill and Ghorepani", 0),
  // },
  // {
  //   slug: "australian-base-camp",
  //   title: "Australian Base Camp",
  //   region: "Kaski, Nepal",
  //   note: "Write one or two lines here about what this trek was like for you.",
  //   photos: gallery("australian-base-camp", "Australian Base Camp", 0),
  // },
]
