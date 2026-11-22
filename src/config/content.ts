import { RootConfig } from "@/types/content";

export const content: RootConfig = {
  meta: {
    title: "A Little Step Forward — For You",
    description: "An interactive love letter and sincere apology.",
    senderName: "Tumara Ashhhh",
    recipientName: "Meri Nikkuuu",
    locale: "en",
  },

  personal: {
    compliments: [
      "Your laugh is genuinely the brightest part of my day.",
      "The kindness and grace you show to everyone inspires me.",
      "How deeply passionate and caring you are about the things you love.",
      "Your warmth turns any place into home.",
    ],
    insideJokes: [
      "[INSIDE JOKE 1: That time we couldn't stop laughing at...]",
      "[INSIDE JOKE 2: Our secret nickname or code phrase]",
    ],
    thingsSheLoves: [
      "[HER FAVORITE THING 1: e.g., Warm matcha lattes on rainy mornings]",
      "[HER FAVORITE THING 2: e.g., Fresh flowers and handwritten notes]",
      "[HER FAVORITE THING 3: e.g., Late-night spontaneous drives]",
    ],
    sharedPlaces: [
      "[OUR SPECIAL SPOT 1: That quiet bench by the park]",
      "[OUR SPECIAL SPOT 2: The little cafe where we stayed for hours]",
    ],
  },

  envelope: {
    waxSealColor: "#C9796A",
    ribbonColor: "#F472B6",
    envelopeColor: "#FFF8F0",
    greetingText: "A little note I made just for you...",
    openButtonLabel: "Open Something Special",
  },

  letter: {
    greeting: "My dearest NIKKUUUUU,",
    paragraphs: [
      "I wanted to create something quiet and intentional to tell you how truly sorry I am. Words in a passing conversation don't always carry the weight and sincerity of what I feel inside, and you deserve more than hurried excuses.",
      "I know mene tume hurt kiya, and seeing you upset because of something I did or said weighs so heavily on my heart. You mean so much to me, and preserving the gentleness and trust between us is something I never want to take for granted never ever.",
      "I am not asking to erase what happened with a single gesture, but I genuinely want to understand, listen, and grow together. I hope this little space brings a soft smile to your face and shows you how precious you are to me.",
      "I Love you so much meri nikku...",
    ],
    signature: "With all my love and my dil, Tumara ASH",
    postscript:
      "P.S. There is a little surprise waiting for you if you look closely along the way...",
  },

  wheel: {
    spinButtonLabel: "Spin for a Smile",
    segments: [
      {
        id: "compliment",
        label: "A True Thought",
        type: "compliment",
        color: "#FDDDE6",
        emoji: "✨",
        resultTitle: "Something I Adore About You",
        resultDescription:
          "Your patience and understanding are qualities I deeply admire. You make the world gentler simply by being in it.",
      },
      {
        id: "hug",
        label: "Warmest Hug",
        type: "hug",
        color: "#C4B5FD",
        emoji: "🫂",
        resultTitle: "Redeemable Anytime",
        resultDescription:
          "One long, silent, comforting hug where you don't have to say a single word. Valid whenever you need it.",
      },
      {
        id: "reason",
        label: "Why You Matter",
        type: "reason",
        color: "#FFCBA4",
        emoji: "🌸",
        resultTitle: "Why You Are Irreplaceable",
        resultDescription:
          "Because you understand parts of me that nobody else does, and you have always given me room to be myself.",
      },
      {
        id: "challenge",
        label: "Peace Treaty",
        type: "challenge",
        color: "#FFF8F0",
        emoji: "🕊️",
        resultTitle: "A Gentle Challenge",
        resultDescription:
          "Let me cook your favorite meal (or order your comfort takeout) while you relax completely.",
      },
      {
        id: "romantic",
        label: "A Sweet Promise",
        type: "romantic",
        color: "#FBB6CE",
        emoji: "💌",
        resultTitle: "My Commitment",
        resultDescription:
          "To listen before reacting, to hold your hand when things get hard, and to never let anger linger into tomorrow.",
      },
      {
        id: "kiss",
        label: "Gentle Forehead Kiss",
        type: "kiss",
        color: "#E9D5FF",
        emoji: "💋",
        resultTitle: "Pure Affection",
        resultDescription:
          "A gentle forehead kiss to remind you that you are protected, valued, and deeply cherished.",
      },
      {
        id: "memory",
        label: "Golden Memory",
        type: "memory",
        color: "#F9E2AF",
        emoji: "🕯️",
        resultTitle: "That One Beautiful Evening",
        resultDescription:
          "Remember when we sat together and lost track of time? I want to build a lifetime of evenings like that with you.",
      },
      {
        id: "surprise",
        label: "Your Choice",
        type: "surprise",
        color: "#FED7AA",
        emoji: "🎁",
        resultTitle: "Wildcard For You",
        resultDescription:
          "You get to decide anything you want us to do next — no questions asked, just fun.",
      },
    ],
    resultTiers: [
      {
        minScore: 0,
        maxScore: 10,
        title: "Spun with Love",
        message:
          "No matter where the wheel lands, the thought is always for you.",
      },
    ],
  },

  quiz: {
    title: "How Well Do You Know Me?",
    subtitle:
      "A playful check-in (don't worry, there are no wrong answers in love)",
    questions: [
      {
        id: "q1",
        question: "When I know I've messed up, what is my immediate instinct?",
        options: [
          { text: "Get quiet and think about how to fix it", isCorrect: true },
          { text: "Try to act cool like nothing happened", isCorrect: false },
          { text: "Cook a peace offering meal", isCorrect: false },
          { text: "Search Google for advice", isCorrect: false },
        ],
        funFeedbackCorrect:
          "You know me too well! I get quiet because I am kicking myself inside.",
        funFeedbackWrong:
          "Haha, close! But really I just get quiet trying to find the right words.",
      },
      {
        id: "q2",
        question:
          "What is my favorite thing to do after a long, exhausting week?",
        options: [
          {
            text: "Curl up beside you in silence or watching something cozy",
            isCorrect: true,
          },
          { text: "Go to a crowded loud party", isCorrect: false },
          { text: "Organize the closet by color", isCorrect: false },
          { text: "Scroll through spreadsheets", isCorrect: false },
        ],
        funFeedbackCorrect:
          "Spot on. Peace with you is the only recharge I ever need.",
        funFeedbackWrong: "Definitely not! Being cozy with you always wins.",
      },
      {
        id: "q3",
        question:
          "What is the fastest way to make me smile even on a gloomy day?",
        options: [
          {
            text: "Your goofy laugh and sending me silly photos",
            isCorrect: true,
          },
          { text: "Talking about tax returns", isCorrect: false },
          { text: "A lecture on morning workouts", isCorrect: false },
          { text: "Traffic updates", isCorrect: false },
        ],
        funFeedbackCorrect: "Nothing beats your silly smiles, honestly.",
        funFeedbackWrong: "Nope! It is always your laugh.",
      },
      {
        id: "q4",
        question:
          "If I could promise you one thing every single day, what would it be?",
        options: [
          {
            text: "To always hear you out and treat your feelings with tenderness",
            isCorrect: true,
          },
          {
            text: "To become a certified master chef overnight",
            isCorrect: false,
          },
          { text: "To never lose my car keys again", isCorrect: false },
          { text: "To wake up at 4 AM every day", isCorrect: false },
        ],
        funFeedbackCorrect:
          "Always. Your feelings will always matter most to me.",
        funFeedbackWrong:
          "While keys are tricky, your heart is what I really promise to protect.",
      },
    ],
    resultTiers: [
      {
        minScore: 0,
        maxScore: 2,
        title: "Room to Learn!",
        message:
          "That just gives us a reason to spend more cozy hours talking and laughing together.",
      },
      {
        minScore: 3,
        maxScore: 4,
        title: "Soul Connection!",
        message:
          "You read me like an open book. Thank you for knowing my heart so well.",
      },
    ],
  },

  thisOrThat: {
    title: "This or That",
    subtitle: "Which comfort would you choose right now?",
    pairs: [
      {
        id: "p1",
        question: "Our ideal low-key evening together:",
        optionA: {
          label: "Stargazing / Night Drive with music",
          emoji: "🌌",
          isPreferred: true,
        },
        optionB: {
          label: "Warm blanket, hot chocolate & movies",
          emoji: "☕",
          isPreferred: false,
        },
        revealMessage: "Both sound heavenly as long as I am with you.",
      },
      {
        id: "p2",
        question: "The best kind of peaceful apology gesture:",
        optionA: {
          label: "A sincere letter & favorite sweet treats",
          emoji: "🍰",
          isPreferred: true,
        },
        optionB: {
          label: "A quiet long walk holding hands",
          emoji: "🌿",
          isPreferred: false,
        },
        revealMessage: "Why not both? You deserve the world.",
      },
      {
        id: "p3",
        question: "When we take our next trip together:",
        optionA: {
          label: "Cozy cabin in misty hills",
          emoji: "🏔️",
          isPreferred: true,
        },
        optionB: {
          label: "Sunny beach with warm sunset waves",
          emoji: "🌊",
          isPreferred: false,
        },
        revealMessage: "Any destination is magical when we're side by side.",
      },
    ],
    resultTiers: [
      {
        minScore: 0,
        maxScore: 3,
        title: "Perfect Taste!",
        message: "Whatever you pick, my favorite choice will always be you.",
      },
    ],
  },

  usQuiz: {
    title: "How Much Do You Know About Us?",
    subtitle: "Little milestones and memories that mean everything to me",
    questions: [
      {
        id: "u1",
        question:
          "What was the exact moment I realized you were truly someone special?",
        answer:
          "When you laughed so freely and made me feel completely at home.",
        hint: "It was early on, during one of our first long conversations.",
        category: "Memories",
      },
      {
        id: "u2",
        question: "What is our favorite unspoken ritual?",
        answer: "Checking in on each other before going to sleep.",
        hint: "Something we do every single night.",
        category: "Rituals",
      },
      {
        id: "u3",
        question:
          "What is the one thing we always end up doing when we are together?",
        answer:
          "Losing all track of time while talking about everything and nothing.",
        category: "Moments",
      },
    ],
    resultTiers: [
      {
        minScore: 0,
        maxScore: 3,
        title: "Our Beautiful Story",
        message: "Every chapter we write together is my favorite part of life.",
      },
    ],
  },

  sweetCards: {
    title: "Notes From My Heart",
    subtitle: "Har ak card ko tap krna jaan mene piche apne dil ke thoughts like tumare liye",
    cards: [
      {
        id: "c1",
        title: "Meri Safe place ho tum",
        message:
          "Jab bhi mere sath kuch bura hota , m direct tumare pas ata sb btane and mera dil akdm light hojata , fir tumari god m nini milti.",
        backMessage:
          "Tum meri Freefire ki safe zone ho baby jo meri health shi rkhti",
        color: "rose",
        isFlippable: true,
        emoji: "🌸",
      },
      {
        id: "c2",
        title: "You are my inner strength",
        message:
          "Tumare hone se mujhe ak life support milta nikku",
        backMessage:
          "Tum meri medicate jesi ho , jese hi mujhe hurt milta tum usko heal krdeti",
        color: "blush",
        isFlippable: true,
        emoji: "✨",
      },
      {
        id: "c3",
        title: "A Little Sincerity",
        message:
          "I know I am imperfect and dumb sometimes, but my love for you is steadfast baby.",
        backMessage:
          "hamesa patience rkhne ke liye THANK you baby and for teaching me how to love better.",
        color: "lavender",
        isFlippable: true,
        emoji: "🤍",
      },
      {
        id: "c4",
        title: "Our Shared Future",
        message: "My love Every tomorrow looks brighter because I hope you are in it.",
        backMessage:
          "I look forward to all the quiet breakfasts, laughs, and adventures ahead.",
        color: "peach",
        isFlippable: true,
        emoji: "🌅",
      },
    ],
  },

  memories: {
    title: "Our Memory Lane",
    subtitle: "Snapshots of moments that made my heart flutter",
    photos: [
      {
        id: "m1",
        src: "/photos/20251229_213708.jpg",
        alt: "A sweet memory together",
        caption: "Hamara sath m snack timeeee sham ka",
        isPolaroid: true,
      },
      {
        id: "m2",
        src: "/photos/20251229_230354.jpg",
        alt: "A quiet golden hour",
        caption: "Ranchi m hamara vo movie time",
        isPolaroid: true,
      },
      {
        id: "m3",
        src: "/photos/20250419_112805.jpg",
        alt: "The time we can't forget",
        caption: "Bilaspur m hamari night",
        isPolaroid: true,
      },
      {
        id: "m4",
        src: "/photos/20251231_111917.jpg",
        alt: "Our Outfit matching",
        caption: "Ranchi m hamara combo",
        isPolaroid: true,
      },
    ],
    timeline: [
      {
        id: "t1",
        date: "[MILESTONE 1]",
        title: "Kaha sb start hua...",
        description: "Mera or tumara FREE FIRE game m milna , #NIKASH",
        emoji: "🌱",
      },
      {
        id: "t2",
        date: "[MILESTONE 2]",
        title: "Then hamari journey together",
        description:
          "Our first meetup jamshedpur, our diwali, fir tumara birthday or tumse milne ana etc",
        emoji: "🗺️",
      },
      {
        id: "t3",
        date: "Today & Tomorrow",
        title: "Taking A Step Forward",
        description: "And guess what we are still together no matter what and this is important for us nikku",
        emoji: "🤝",
      },
    ],
  },

  heartGame: {
    duration: 35,
    spawnRate: 2,
    targetScore: 18,
    goldenHeartChance: 0.15,
    resultTiers: [
      {
        minScore: 0,
        maxScore: 12,
        title: "Sweet Effort!",
        message:
          "You caught my heart regardless of the score. It was always yours anyway!",
      },
      {
        minScore: 13,
        maxScore: 24,
        title: "Heart Collector!",
        message: "Impressive reflexes! You caught so many love notes.",
      },
      {
        minScore: 25,
        maxScore: 100,
        title: "Heart Champion!",
        message: "Flawless! You have captured every ounce of love in the room.",
      },
    ],
  },

  finale: {
    apologyMessage: [
      "Meri Nikku Mai tumse boht jada pyar krta hu tum mere sath hoti ho tb jese lgta bs yehi chahiye baki sb krluga life m",
      "I know jaan mene tume boht dukh pahuchaya hai hurt kiya hai I can't forgive myself ever too",
      "But tume m sure krdu baby nai hoga esa kbhi bhi ab m hamesa tumse heart or mind control rkh ke baat kruga kbhi esa wesa ni boluga kbhi bhi ni , please apne Ash ko last bar maaf krdena pls my nikku...",
      "Ak tumhi ho jaan jo sirf mera hai , jisse m kuch bhi share kr skta hu, kuch bhi baat kr skta hu, sirf tum ho meri baby",
      "Tum meri dost, GF, bestfriend sb ho everything",
      "Mai bs chahta tum khush rho nikku",
      "I Love you so much nikku",
      "Your Ash Loves you very much ❤️❤️",
    ],
    promises: [
      "I promise jb bhi tum merese kuch share krogi m akdm patience se sb smjhuga pura without reacting early or disturbing in between",
      "I promise kabhi esa kuch ni kruga jisse tum hurt ho nikku mere kaarn (IK bolne ka ni but please sunlo mujhe)",
      "I promise hamesa tumara sath duga hr life phase , are isi kaarn to bhgwan ne mujhe tumare pas bheja, Han bhgwan ne mujhme thoda defect krdiya mere m hurt krdeta hu but I love you so much from bottom of my heart",
    ],
    bridgeQuestion: "Lets take a little step forward together?",
    responseOptions: [
      {
        id: "talk",
        label: "Let's talk (Adha maaf ki bs (me: 😔))",
        emoji: "☕",
        reply:
          "I would love nothing more. I am ready to listen whenever you feel comfortable.",
      },
      {
        id: "forgive",
        label: "I forgive you",
        emoji: "🤍",
        reply:
          "Thank you from the bottom of my heart. I LOve my piggy so muchhhhhh",
      },
    ],
    closingMessage:
      "Thank you for being you. You are loved, cherished, and respected always.",
  },

  secretHeart: {
    enabled: true,
    hint: "Look closely near the wax seal or delicate botanical petals...",
    message:
      "You found the secret heart! ✨ Just like this hidden note, my love for you is tucked into all the little quiet corners of every day.",
    revealDelay: 2500,
  },

  audio: {
    enabled: true,
    bgMusic: [
      {
        id: "main-theme",
        src: "/audio/music.mp3",
        loop: true,
        volume: 0.25,
      },
    ],
    sfx: {
      chime: "/audio/heart.mpeg",
      correct: "/audio/correct.mpeg",
      wrong: "/audio/sfx-wrong.mp3",
      heartPop: "/audio/heart.mpeg",
      pageFlip: "/audio/flip.mpeg",
      sealCrack: "/audio/env-open.mpeg",
      confetti: "/audio/heart.mpeg",
      finalChime: "/audio/heart.mpeg",
    },
  },

  features: {
    cursorTrail: true,
    floatingHearts: true,
    filmGrain: true,
    parallelPreload: true,
    persistProgress: true,
    debugMode: false,
  },
};
