const emailInput = document.getElementById("email");
const waitlistPanel = document.getElementById("waitlist-panel");
const feedbackForm = document.getElementById("feedback-form");
const successCard = document.getElementById("success-card");
const successCopy = document.getElementById("success-copy");
const resetFormButton = document.getElementById("reset-form");
const submitButton = feedbackForm?.querySelector('button[type="submit"]') || null;
const formError = document.getElementById("form-error");
const useCaseSelect = document.getElementById("use-case");
const useCaseOtherInput = document.getElementById("use-case-other");
const deviceTypeSelect = document.getElementById("device-type");
const modelSelect = document.getElementById("device-model");
const modelOtherInput = document.getElementById("device-model-other");
const countryInput = document.getElementById("country");
const contactForm = document.getElementById("contact-form");
const contactSuccessCard = document.getElementById("contact-success-card");
const contactResetFormButton = document.getElementById("contact-reset-form");
const contactSubmitButton = contactForm?.querySelector('button[type="submit"]') || null;
const contactFormError = document.getElementById("contact-form-error");
const priorityInputs = Array.from(document.querySelectorAll('input[name="priority"]'));
const priorityOtherInput = document.getElementById("priority-other");
const priorityOtherToggle =
  priorityInputs.find((input) => input.value === "other") || null;
const priorityError = document.getElementById("priority-error");
const langButtons = Array.from(document.querySelectorAll(".lang-button"));
const i18nTextElements = Array.from(document.querySelectorAll("[data-i18n]"));
const i18nHtmlElements = Array.from(document.querySelectorAll("[data-i18n-html]"));
const i18nPlaceholderElements = Array.from(document.querySelectorAll("[data-i18n-placeholder]"));
const metaDescription = document.querySelector('meta[name="description"]');
const canonicalLink = document.getElementById("canonical-link");
const ogTitle = document.getElementById("og-title");
const ogDescription = document.getElementById("og-description");
const ogUrl = document.getElementById("og-url");
const ogLocale = document.getElementById("og-locale");
const twitterTitle = document.getElementById("twitter-title");
const twitterDescription = document.getElementById("twitter-description");
const heroSection = document.querySelector(".hero-section");

const LANGUAGE_KEY = "cooling-case-language";
const PRIORITY_LIMIT = 3;
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const COUNTRY_LOOKUP_ENDPOINT = "https://api.country.is/";
const SITE_URL = "https://cryomanta.com/";
const ADS_CONVERSION_SEND_TO = "AW-17891805169/lQvpCLbz_ZgcEPGPvdNC";
const ADS_CONVERSION_VALUE = 1.0;
const ADS_CONVERSION_CURRENCY = "CHF";
const WHATSAPP_HOST_PATTERN = /(^|\.)whatsapp\.com$/i;
const WHATSAPP_MESSAGE_SIGNATURE = "Viele Gr\u00FCsse, Max Mustermann";
const mobileScrollMedia = window.matchMedia("(max-width: 720px)");
const reducedMotionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
const MOBILE_STAGE_DEFINITIONS = [
  {
    sectionSelector: ".pricing-section",
    itemSelectors: [".pricing-grid .price-card"],
    revealStarts: [0.06, 0.14, 0.22, 0.3],
    exitStart: 0.9,
    exitRange: 0.12,
  },
  {
    sectionSelector: ".purpose-section",
    itemSelectors: [".info-card"],
  },
  {
    sectionSelector: ".feedback-section",
    itemSelectors: [".feedback-aside", ".form-shell"],
    revealStarts: [0.08, 0.2],
    exitStart: 0.9,
    exitRange: 0.12,
  },
  {
    sectionSelector: ".faq-section",
    itemSelectors: [".faq-item"],
  },
];
const OTHER_OPTION_VALUE = "other";
// Based on the latest 2026-available sell-through and bestseller data as of April 23, 2026.
const DEVICE_MODELS_BY_TYPE = {
  iPhone: [
    "iPhone 16",
    "iPhone 17 Pro Max",
    "iPhone 17",
    "iPhone 16 Pro Max",
    "iPhone 17 Pro",
    "iPhone 16 Pro",
    "iPhone 16e",
    "iPhone 15",
    "iPhone 15 Pro Max",
    "iPhone 14",
  ],
  "Android phone": [
    "Samsung Galaxy A56",
    "Samsung Galaxy A36",
    "Samsung Galaxy A16 5G",
    "Samsung Galaxy A07",
    "Samsung Galaxy A06",
    "Xiaomi Redmi A5",
    "Xiaomi Redmi 14C",
    "Samsung Galaxy S25",
    "Samsung Galaxy S25 Ultra",
    "Motorola Moto G15",
  ],
  iPad: [
    "iPad 11-inch (A16)",
    "iPad Air 11-inch (M4)",
    "iPad Air 11-inch (M3)",
    "iPad Pro 13-inch (M5)",
    "iPad Pro 11-inch (M5)",
    "iPad mini (A17 Pro)",
    "iPad Air 13-inch (M4)",
    "iPad (10th gen)",
    "iPad Pro 11-inch (M4)",
    "iPad Air 11-inch (M2)",
  ],
  "Android tablet": [
    "Samsung Galaxy Tab A11+",
    "Samsung Galaxy Tab A9+",
    "Samsung Galaxy Tab S10 Lite",
    "Samsung Galaxy Tab S10 FE",
    "Samsung Galaxy Tab S10+",
    "Samsung Galaxy Tab S10 Ultra",
    "Samsung Galaxy Tab S11 Ultra",
    "Samsung Galaxy Tab S11",
    "Lenovo Tab One",
    "Samsung Galaxy Tab S9 FE+",
  ],
  "tablet PC": [
    "HP OmniBook X Flip 14",
    "HP OmniBook X Flip 16",
    "Dell Inspiron 14 2-in-1",
    "Lenovo Yoga 7i 2-in-1",
    "Lenovo Yoga 7 2-in-1",
    "Lenovo Yoga Book 9i",
    "Samsung Galaxy Book5 Pro 360",
    "Dell Plus 14 2-in-1",
    "Dell 16 Plus 2-in-1",
    "LG gram Pro 2-in-1 16",
  ],
  laptop: [
    "MacBook Air 13-inch",
    "HP 14 Laptop",
    "Acer Aspire 3 15.6-inch",
    "Dell Inspiron 15",
    "HP Chromebook 14",
    "HP Pavilion 15.6-inch",
    "Lenovo IdeaPad 3i Chromebook",
    "Lenovo IdeaPad 1 15.6-inch",
    "MacBook Air 15-inch",
    "MacBook Pro 14-inch",
  ],
};
const COUNTRY_CODES = [
  "AF", "AL", "DZ", "AD", "AO", "AG", "AR", "AM", "AU", "AT", "AZ", "BS",
  "BH", "BD", "BB", "BY", "BE", "BZ", "BJ", "BT", "BO", "BA", "BW", "BR",
  "BN", "BG", "BF", "BI", "CV", "KH", "CM", "CA", "CF", "TD", "CL", "CN",
  "CO", "KM", "CG", "CD", "CR", "CI", "HR", "CU", "CY", "CZ", "DK", "DJ",
  "DM", "DO", "EC", "EG", "SV", "GQ", "ER", "EE", "SZ", "ET", "FJ", "FI",
  "FR", "GA", "GM", "GE", "DE", "GH", "GR", "GD", "GT", "GN", "GW", "GY",
  "HT", "HN", "HU", "IS", "IN", "ID", "IR", "IQ", "IE", "IL", "IT", "JM",
  "JP", "JO", "KZ", "KE", "KI", "KP", "KR", "KW", "KG", "LA", "LV", "LB",
  "LS", "LR", "LY", "LI", "LT", "LU", "MG", "MW", "MY", "MV", "ML", "MT",
  "MH", "MR", "MU", "MX", "FM", "MD", "MC", "MN", "ME", "MA", "MZ", "MM",
  "NA", "NR", "NP", "NL", "NZ", "NI", "NE", "NG", "MK", "NO", "OM", "PK",
  "PW", "PS", "PA", "PG", "PY", "PE", "PH", "PL", "PT", "QA", "RO", "RU",
  "RW", "KN", "LC", "VC", "WS", "SM", "ST", "SA", "SN", "RS", "SC", "SL",
  "SG", "SK", "SI", "SB", "SO", "ZA", "SS", "ES", "LK", "SD", "SR", "SE",
  "CH", "SY", "TW", "TJ", "TZ", "TH", "TL", "TG", "TO", "TT", "TN", "TR",
  "TM", "TV", "UG", "UA", "AE", "GB", "US", "UY", "UZ", "VU", "VA", "VE",
  "VN", "YE", "ZM", "ZW",
];
let currentLanguage = "en";
let lastSubmissionHadEmail = null;
let detectedCountryCode = "";
let lastAutofilledCountryCode = "";
let priorityValidationActive = false;
let mobileScrollStages = [];
let mobileScrollActive = false;
let mobileScrollFrame = 0;

const translations = {
  en: {
    pageTitle: "Cryomanta | Phone & Tablet Cooling for Extreme Heat",
    pageDescription:
      "Cryomanta is a Swiss cooling case concept for phones and tablets in extreme heat, built for glare, throttling, shutdown risk and harsh outdoor use.",
    headerSummary: "Swiss cooling for phones and tablets in extreme heat.",
    navConcept: "Concept",
    navFeedback: "Feedback",
    navFaq: "FAQ",
    heroEyebrow: "Made in Switzerland",
    heroStatus:
      '<span class="hero-status-state">Under development</span><span aria-hidden="true">&middot;</span><span class="hero-status-release">Planned release: end of 2026</span>',
    heroTitle:
      'Keep your phone<span class="hero-title-break"></span>cool in extreme<span class="hero-title-break"></span>heat.',
    heroText:
      "A premium cooling case concept for pilots, drone operators, field work, gaming, and other sun-exposed situations where heat, glare, throttling, and shutdown risk can interrupt the job.",
    heroPoint1: "Robust enough for harsh outdoor heat and sustained device load",
    heroPoint2: "Affordable enough to stay realistic for everyday field use",
    heroPoint3: "Impeccable in fit, feel and reliability under pressure",
    heroCtaPrimary: "Join waitlist - CHF 15 off",
    heroCtaSecondary: "Give feedback",
    heroNote: "Concept only. Under development.",
    pricingLabel: "Indicative pricing",
    pricingTitle: "Reference pricing for the first production batch.",
    pricingNote: "Non-binding concept prices. Final pricing may change.",
    pricePhones: "Smartphone | Standard",
    priceTablets: "Tablet | Standard",
    priceRuggedPhones: "Smartphone | Armored",
    priceRuggedTablets: "Tablet | Armored",
    developmentLabel: "Under development",
    developmentTitle: "Development before the first batch.",
    developmentText:
      "Cryomanta is in prototyping. We are refining use cases, cooling direction and fit before the first production batch, and we will keep you posted as development progresses.",
    devCard1Title: "Robust",
    devCard1Text:
      "Designed to stay dependable under direct sun, sustained load and rougher outdoor handling.",
    devCard2Title: "Affordable",
    devCard2Text:
      "Targeted to remain realistic for pilots, field operators and demanding daily use cases.",
    devCard3Title: "Impeccable",
    devCard3Text:
      "Built around clean fit, confident grip, durable materials and a premium end result.",
    feedbackLabel: "Feedback, CHF 15 discount and contact",
    feedbackTitle: "Join the waitlist and get CHF 15 / $18 off.",
    feedbackText:
      "Tell us where overheating gets in the way and which design tradeoffs matter most. Your email is required so we can send your <strong>CHF 15</strong> first-batch discount, and we will send exactly one email: the one that contains the discount.",
    stressTitle: "Typical stress cases",
    stress1: "Direct sun on cockpit glass or controller screens",
    stress2: "Brightness throttling and reduced performance during active use",
    stress3: "Shutdown risk when charging, navigating, recording, or gaming outdoors",
    stress4: "Very hot screen surfaces after direct sun exposure",
    emailLabel: "Email required to get CHF 15 off",
    feedbackEmailOptional: "(required)",
    emailOptional: "(required)",
    emailPlaceholder: "name@example.com",
    emailHelp:
      "Enter your email so we can send your CHF 15 discount. We will send exactly one email: the one with your discount.",
    useCaseLabel: "Main use case",
    selectOne: "Select one",
    useGeneral: "General use",
    useMovies: "Watching movies",
    useStreaming: "Streaming",
    useGaming: "Gaming",
    useDrone: "Flying a drone",
    useFilming: "Filming",
    useVfr: "Flying VFR",
    useOther: "Other",
    useCaseOtherPlaceholder: "Describe your use case",
    deviceTypeLabel: "Device type",
    deviceIphone: "iPhone",
    deviceAndroidPhone: "Android phone",
    deviceIpad: "iPad",
    deviceAndroidTablet: "Android tablet",
    deviceTabletPc: "Tablet PC",
    deviceLaptop: "Laptop",
    modelLabel: "Model",
    modelSelectDeviceType: "Select device type first",
    modelOtherPlaceholder: "Enter your model",
    countryLabel: "Country",
    removeAfterLabel: "Would you leave the case on permanently if it was thin enough (5mm extra thickness)?",
    removeYes: "Yes",
    removeNo: "No",
    removeDepends: "Depends on the situation",
    priceComfortLabel: "Would you feel comfortable paying CHF 69 / $85 for a smartphone cooling case?",
    priceComfortYes: "Yes",
    priceComfortMaybe: "Maybe",
    priceComfortNo: "No",
    priorityLegend: "Feature priorities",
    priorityHelp: "Choose 1 to 3.",
    priorityCooling: "extreme cooling performance",
    priorityNoise: "very low noise",
    prioritySlim: "slim case",
    priorityWeight: "lightweight",
    priorityGrip: "better grip",
    priorityProtection: "enhanced phone protection / padding",
    priorityBattery: "cooling without external supply",
    priorityMount: "mag safe ring in the back",
    priorityOtherPlaceholder: "Describe another priority",
    priorityError: "Choose 1 to 3 feature priorities.",
    problemLabel: "Why do you want to solve overheating in your setup?",
    problemPlaceholder:
      "Please describe a situation how overheating occured. This will give me input for the design of the case. What activities on the phone (streaming, gaming, flying a drone, filming), how did you hold the phone (vertically or with both hands), were you at home or outside, screen exposed to the sun. Thanks a lot",
    waitlistNote:
      "Your email is only used for one email: the message that contains your <strong>CHF 15</strong> discount.",
    submitButton: "Send feedback",
    submitSending: "Sending...",
    formDisclaimer:
      "Email is required so we can send the discount. No checkout and no live ordering.",
    formError: "There was a problem sending the form. Please try again.",
    successLabel: "Thanks",
    successTitle: "Your message has been sent.",
    successBodyDefault:
      "Thanks for sharing your feedback. We will use incoming responses to refine the concept during development.",
    successBodyEmail:
      "Thanks for your feedback. We will send exactly one email: the one with your CHF 15 discount.",
    successBodyNoEmail:
      "Thanks for your feedback. You can submit again later with your email if you want the CHF 15 discount.",
    resetButton: "Send another response",
    faqLabel: "FAQ",
    faqTitle: "Straight answers for an early concept.",
    faq1Question: "What is the current state?",
    faq1Answer: "Prototyping.",
    faq2Question: "Will there be iPad support?",
    faq2Answer: "Yes, planned.",
    faq3Question: "Which devices will it support?",
    faq3Answer: "Major phones and tablets.",
    faq4Question: "What technology will be used?",
    faq4Answer:
      "Current development focuses on fan cooling with directed airflow. Depending on the use case, vented concepts or water-evaporative cooling for extreme scenarios may also be explored.",
    faq5Question: "Is this available now?",
    faq5Answer: "Not yet. Under development, planned release end of 2026.",
    faq6Question: "Is this already for sale?",
    faq6Answer: "Not yet, we are working on the prototype.",
    footerNote: "Visuals are concept renders. Product under development.",
    contactTitle: "Contact",
    contactIntro:
      "Use this form for direct questions about development, compatibility or the project timeline.",
    contactNameLabel: "Name",
    contactNamePlaceholder: "Your name",
    contactEmailLabel: "Email",
    contactEmailPlaceholder: "name@example.com",
    contactMessageLabel: "Message",
    contactMessagePlaceholder: "Write your question here.",
    contactButton: "Send message",
    contactSubmitting: "Sending...",
    contactDisclaimer: "Direct contact only. No live ordering.",
    contactError: "There was a problem sending the message. Please try again.",
    contactSuccessLabel: "Thanks",
    contactSuccessTitle: "Your message has been sent.",
    contactSuccessBody:
      "Thanks for reaching out. We will review your message and reply if needed.",
    contactResetButton: "Send another message",
    privacyTitle: "Privacy policy",
    privacyBody:
      "<strong>Controller:</strong> Nicola Gurpinar, R\u00F6merstrasse 69, 8404 Winterthur, Switzerland, <a href=\"mailto:info@cryomanta.com\">info@cryomanta.com</a>.<br><br>This website is operated for the Cryomanta project. If you use the forms on this website, submitted data can include your name, email address, use case, device type, selected priorities and message. Form submissions are processed via Web3Forms and forwarded to <a href=\"mailto:info@cryomanta.com\">info@cryomanta.com</a> to answer enquiries, manage the waitlist and support product development.<br><br>This website also uses Google Analytics and Google Ads conversion tracking to measure traffic and campaign performance. These services can process usage data, browser and device data, approximate location, page interactions and cookie or similar identifiers. Because these services are operated by third parties, data may also be processed outside Switzerland. The selected language is stored locally in your browser so the page can remember your preference.<br><br>Data is processed only for operating the website, communication, waitlist handling, product development and performance measurement. Personal data is retained only as long as reasonably necessary for these purposes or to comply with legal obligations. You may request information, correction or deletion of your personal data by contacting <a href=\"mailto:info@cryomanta.com\">info@cryomanta.com</a>. Third-party providers process data under their own terms and privacy policies.",
    legalTitle: "Legal notice",
    legalBody:
      "<strong>Responsible for this website:</strong><br>Nicola Gurpinar<br>R\u00F6merstrasse 69<br>8404 Winterthur<br>Switzerland<br><br><strong>Email:</strong> <a href=\"mailto:info@cryomanta.com\">info@cryomanta.com</a><br><strong>Project:</strong> Cryomanta<br><br>This website is a concept landing page for Cryomanta. Content is provided for general information about the project and may change during development. No offer in the legal sense is made on this page, and no direct sale is concluded through this website. Despite careful review, no guarantee is given for completeness, accuracy or currentness. Liability for external links and third-party services remains with their respective operators. Unless otherwise stated, all content on this website is provided for the Cryomanta project.",
  },
  de: {
    pageTitle: "Eiskalt Kühlhülle | Konzept für extreme Hitze",
    pageDescription:
      "Eiskalt Kühlhülle ist ein in der Schweiz gefertigtes Konzept, um Smartphones und Tablets bei grosser Hitze, Blendung und dauerhafter Last nutzbar zu halten.",
    headerSummary: "Schweizer Kühlhüllen-Konzept fÃ¼r zuverlÃ¤ssige Smartphones und Tablets bei extremer Hitze.",
    navConcept: "Konzept",
    navFeedback: "Feedback",
    navFaq: "FAQ",
    heroEyebrow: "Hergestellt in der Schweiz",
    heroStatus:
      '<span class="hero-status-state">In Entwicklung</span><span aria-hidden="true">&middot;</span><span class="hero-status-release">Geplante Freigabe: Ende 2026</span>',
    heroTitle:
      'Dein Handy bleibt<span class="hero-title-break"></span>k\u00FChl, auch bei<span class="hero-title-break"></span>extremer Hitze.',
    heroText:
      "Ein hochwertiges Kühlhüllen-Konzept für Piloten, Drohnenoperatoren, Ausseneinsätze, Gaming und andere sonnenexponierte Situationen, in denen Hitze, Blendung, Leistungsdrosselung und Abschaltrisiko stören.",
    heroPoint1: "Robust genug für grosse Hitze im Freien und dauerhafte Gerätelast",
    heroPoint2: "Erschwinglich genug für reale Einsätze im Alltag und im Feld",
    heroPoint3: "Makellos in Passform, Haptik und Zuverlässigkeit unter Belastung",
    heroCtaPrimary: "Warteliste - CHF 15 Rabatt",
    heroCtaSecondary: "Feedback geben",
    heroNote: "Nur Konzept. In Entwicklung. Aktuell nicht im Verkauf.",
    pricingLabel: "Richtpreise",
    pricingTitle: "Referenzpreise für die erste Produktionscharge.",
    pricePhones: "Smartphone | Standard",
    priceTablets: "Tablet | Standard",
    priceRuggedPhones: "Smartphone | Gepanzert",
    priceRuggedTablets: "Tablet | Gepanzert",
    developmentLabel: "In Entwicklung",
    developmentTitle: "Entwicklung vor der Produktion.",
    developmentText:
      "Die Kühlhülle befindet sich noch in Entwicklung. Diese Seite erklärt das Konzept, sammelt Feedback zu Überhitzungsproblemen und hilft bei der Priorisierung der ersten Produktionscharge.",
    devCard1Title: "Robust",
    devCard1Text:
      "Ausgelegt für direkte Sonne, dauerhafte Last und härtere Outdoor-Bedingungen.",
    devCard2Title: "Erschwinglich",
    devCard2Text:
      "Ziel ist ein realistischer Preis für Piloten, Feldarbeit und anspruchsvolle Alltagsnutzung.",
    devCard3Title: "Makellos",
    devCard3Text:
      "Entwickelt für saubere Passform, sicheren Griff, haltbare Materialien und ein hochwertiges Ergebnis.",
    feedbackLabel: "Feedback, CHF 15 Rabatt und Kontakt",
    feedbackTitle: "Auf die Warteliste und CHF 15 / $18 Rabatt sichern.",
    feedbackText:
      "Sag uns, wo Überhitzung stört und welche Designabwägungen am wichtigsten sind. Deine E-Mail ist erforderlich, damit wir dir den <strong>CHF 15 Rabatt</strong> für die erste Charge senden können. Wir senden genau eine E-Mail: die mit dem Rabatt.",
    stressTitle: "Typische Belastungsszenarien",
    stress1: "Direkte Sonne auf Cockpitglas oder Controller-Bildschirme",
    stress2: "Helligkeitsdrosselung und weniger Leistung während der Nutzung",
    stress3: "Abschaltrisiko beim Laden, Navigieren, Aufzeichnen oder Gaming im Freien",
    emailLabel: "E-Mail für CHF 15 Rabatt erforderlich",
    feedbackEmailOptional: "(erforderlich)",
    emailOptional: "(erforderlich)",
    emailPlaceholder: "name@beispiel.ch",
    emailHelp:
      "Trage deine E-Mail ein, damit wir dir den CHF 15 Rabatt senden können. Wir senden genau eine E-Mail: die mit deinem Rabatt.",
    useCaseLabel: "Hauptanwendung",
    selectOne: "Bitte wählen",
    useGeneral: "Allgemeine Nutzung",
    useMovies: "Filme schauen",
    useStreaming: "Streaming",
    useGaming: "Gaming",
    useDrone: "Drohnenflug",
    useFilming: "Filmen",
    useVfr: "VFR-Flug",
    useOther: "Andere",
    useCaseOtherPlaceholder: "Beschreibe deinen Einsatzbereich",
    modelLabel: "Modell",
    modelSelectDeviceType: "Zuerst Ger\u00E4tetyp w\u00E4hlen",
    modelOtherPlaceholder: "Modell eingeben",
    countryLabel: "Land",
    deviceTypeLabel: "Gerätetyp",
    deviceIphone: "iPhone",
    deviceAndroidPhone: "Android-Handy",
    deviceIpad: "iPad",
    deviceAndroidTablet: "Android-Tablet",
    deviceTabletPc: "Tablet-PC",
    deviceLaptop: "Laptop",
    priorityLegend: "Prioritäten",
    priorityHelp: "1 bis 3 wählen.",
    priorityCooling: "bessere Kühlleistung",
    priorityNoise: "weniger Geräusch",
    prioritySlim: "schlankere Bauform",
    priorityWeight: "geringeres Gewicht",
    priorityGrip: "besserer Halt",
    priorityProtection: "stärkerer Schutz",
    priorityBattery: "bessere Batterieeffizienz",
    priorityOtherPlaceholder: "Andere Priorit\u00E4t beschreiben",
    priorityOutdoor: "Outdoor- und Sonnenlicht-Tauglichkeit",
    priorityMount: "Mount-Kompatibilität",
    priorityError: "Bitte 1 bis 3 Prioritäten wählen.",
    problemLabel: "Welches Überhitzungsproblem soll dieses Produkt für dich lösen?",
    problemPlaceholder:
      "Bitte beschreibe eine Situation, in der \u00DCberhitzung aufgetreten ist. Das gibt mir Input f\u00FCr das Design der H\u00FClle. Welche Aktivit\u00E4ten auf dem Handy hast du gemacht (Streaming, Gaming, Drohne fliegen, Filmen), wie hast du das Handy gehalten (vertikal oder mit beiden H\u00E4nden), warst du zu Hause oder draussen, war der Bildschirm der Sonne ausgesetzt. Vielen Dank.",
    waitlistNote:
      "Deine E-Mail wird nur für eine einzige Nachricht verwendet: die E-Mail mit deinem <strong>CHF 15 Rabatt</strong>.",
    submitButton: "Feedback senden",
    submitSending: "Wird gesendet...",
    formDisclaimer:
      "E-Mail ist erforderlich, damit wir den Rabatt senden können. Kein Checkout und keine Live-Bestellung.",
    formError: "Beim Senden des Formulars ist ein Problem aufgetreten. Bitte versuche es erneut.",
    successLabel: "Danke",
    successTitle: "Deine Nachricht wurde gesendet.",
    successBodyDefault:
      "Danke für dein Feedback. Eingehende Rückmeldungen helfen, das Konzept während der Entwicklung zu verfeinern.",
    successBodyEmail:
      "Danke für dein Feedback. Wir senden genau eine E-Mail: die mit deinem CHF 15 Rabatt.",
    successBodyNoEmail:
      "Danke für dein Feedback. Du kannst das Formular später erneut mit deiner E-Mail senden, wenn du den CHF 15 Rabatt möchtest.",
    resetButton: "Weitere Antwort senden",
    faqLabel: "FAQ",
    faqTitle: "Klare Antworten für ein frühes Konzept.",
    faq1Question: "Ist das bereits verfügbar?",
    faq1Answer: "Noch nicht. In Entwicklung, geplante Freigabe Ende 2026.",
    faq2Question: "Wird es iPad-Unterstützung geben?",
    faq2Answer: "Ja, ist vorgesehen.",
    faq3Question: "Welche Geräte werden unterstützt?",
    faq3Answer: "Wichtige Smartphones und Tablets.",
    faq4Question: "Ist das Produkt schon im Verkauf?",
    faq4Answer: "Nein. Diese Seite dient nur für Interesse und Feedback.",
    footerNote: "Visuals sind Konzept-Renderings. Das Produkt befindet sich in Entwicklung.",
    contactTitle: "Kontakt",
    contactIntro:
      "Nutze dieses Formular für direkte Fragen zu Entwicklung, Kompatibilität oder Projektzeitplan.",
    contactNameLabel: "Name",
    contactNamePlaceholder: "Dein Name",
    contactEmailLabel: "E-Mail",
    contactEmailPlaceholder: "name@beispiel.ch",
    contactMessageLabel: "Nachricht",
    contactMessagePlaceholder: "Schreibe deine Frage hier.",
    contactButton: "Nachricht senden",
    contactSubmitting: "Wird gesendet...",
    contactDisclaimer: "Nur direkte Kontaktaufnahme. Keine Live-Bestellung.",
    contactError:
      "Beim Senden der Nachricht ist ein Problem aufgetreten. Bitte versuche es erneut.",
    contactSuccessLabel: "Danke",
    contactSuccessTitle: "Deine Nachricht wurde gesendet.",
    contactSuccessBody: "Danke für deine Nachricht. Wir prüfen sie und antworten bei Bedarf.",
    contactResetButton: "Weitere Nachricht senden",
    privacyTitle: "Datenschutz",
    privacyBody:
      "Diese Website präsentiert das Kühlhüllen-Konzept und verarbeitet Feedback- oder Wartelistenanfragen. Bei Nutzung des Formulars können insbesondere E-Mail-Adresse, Einsatzbereich, Gerätetyp, gewählte Prioritäten und Nachricht übermittelt werden. Formularanfragen werden über Web3Forms verarbeitet und an das konfigurierte Postfach zugestellt. Die übermittelten Daten werden ausschliesslich zur Beantwortung von Anfragen, zur Verwaltung der Warteliste und zur Unterstützung der Produktentwicklung verwendet. Die gewählte Sprache wird lokal im Browser gespeichert, damit die Seite deine Präferenz behalten kann. Du kannst Auskunft, Berichtigung oder Löschung deiner übermittelten Daten verlangen, indem du das Kontaktformular erneut nutzt und die zuvor verwendete E-Mail-Adresse nennst.",
    legalTitle: "Impressum",
    legalBody:
      "<strong>Verantwortlich:</strong> Nicola Gurpinar, Schweiz.<br><strong>Kontakt:</strong> über das Kontaktformular auf dieser Seite.<br>Diese Website ist eine Konzept-Landingpage für Eiskalt Kühlhülle. Inhalte dienen der allgemeinen Information zum Projektstand und können sich während der Entwicklung ändern. Für externe Links und Dienste Dritter sind ausschliesslich deren Betreiber verantwortlich.",
  },
};

translations.de.headerSummary =
  "Schweizer K\u00FChlh\u00FCllen f\u00FCr Smartphones und Tablets bei extremer Hitze.";
translations.de.pageTitle =
  "Cryomanta | K\u00FChlung f\u00FCr Handy und Tablet bei extremer Hitze";
translations.de.pageDescription =
  "Cryomanta ist ein Schweizer K\u00FChlh\u00FCllen-Konzept f\u00FCr Smartphones und Tablets bei extremer Hitze, Blendung, Drosselung und Abschaltrisiko im Ausseneinsatz.";
translations.de.heroText =
  "Ein hochwertiges K\u00FChlh\u00FCllen-Konzept f\u00FCr Piloten, Drohnenoperatoren, Ausseneins\u00E4tze, Gaming und andere sonnenexponierte Situationen, in denen Hitze, Blendung, Leistungsdrosselung und Abschaltrisiko st\u00F6ren.";
translations.de.pricingNote =
  "Unverbindliche Konzeptpreise. Endg\u00FCltige Preise k\u00F6nnen sich \u00E4ndern.";
translations.de.heroTitle =
  'Dein Handy bleibt<span class="hero-title-break"></span>k\u00FChl, auch bei<span class="hero-title-break"></span>extremer Hitze.';
translations.de.heroNote =
  "Nur Konzept. In Entwicklung.";
translations.de.developmentTitle =
  "Entwicklung vor der ersten Charge.";
translations.de.developmentText =
  "Cryomanta ist im Prototyping. Wir verfeinern Einsatzbereiche, K\u00FChlrichtung und Passform vor der ersten Produktionscharge und halten dich \u00FCber die Entwicklung auf dem Laufenden.";
translations.de.feedbackTitle =
  "Auf die Warteliste und CHF 15 / $18 Rabatt sichern.";
translations.de.feedbackText =
  "Sag uns, wo \u00DCberhitzung st\u00F6rt und welche Designabw\u00E4gungen am wichtigsten sind. Deine E-Mail ist erforderlich, damit wir dir den <strong>CHF 15 Rabatt</strong> f\u00FCr die erste Charge senden k\u00F6nnen. Wir senden genau eine E-Mail: die mit dem Rabatt.";
translations.de.stress4 =
  "Sehr heisse Displayoberfl\u00E4chen nach direkter Sonneneinstrahlung";
translations.de.removeAfterLabel =
  "W\u00FCrdest du die H\u00FClle dauerhaft am Ger\u00E4t lassen, wenn sie d\u00FCnn genug ist (5 mm zus\u00E4tzliche Dicke)?";
translations.de.removeYes = "Ja";
translations.de.removeNo = "Nein";
translations.de.removeDepends = "Kommt auf die Situation an";
translations.de.priceComfortLabel =
  "W\u00FCrdest du dich wohl dabei f\u00FChlen, CHF 69 / $85 f\u00FCr eine Smartphone-K\u00FChlh\u00FClle zu bezahlen?";
translations.de.priceComfortYes = "Ja";
translations.de.priceComfortMaybe = "Vielleicht";
translations.de.priceComfortNo = "Nein";
translations.de.priorityCooling = "extreme K\u00FChlleistung";
translations.de.priorityNoise = "sehr leise";
translations.de.prioritySlim = "schlanke H\u00FClle";
translations.de.priorityWeight = "leicht";
translations.de.priorityGrip = "besserer Halt";
translations.de.priorityProtection = "verbesserter Schutz / Polsterung";
translations.de.priorityBattery =
  "K\u00FChlung ohne externe Stromversorgung";
translations.de.priorityMount = "MagSafe-Ring auf der R\u00FCckseite";
translations.de.problemLabel =
  "Warum willst du \u00DCberhitzung in deinem Setup l\u00F6sen?";
translations.de.problemPlaceholder =
  "Bitte beschreibe eine Situation, in der \u00DCberhitzung aufgetreten ist. Das gibt mir Input f\u00FCr das Design der H\u00FClle. Welche Aktivit\u00E4ten auf dem Handy hast du gemacht (Streaming, Gaming, Drohne fliegen, Filmen), wie hast du das Handy gehalten (vertikal oder mit beiden H\u00E4nden), warst du zu Hause oder draussen, war der Bildschirm der Sonne ausgesetzt. Vielen Dank.";
translations.de.waitlistNote =
  "Deine E-Mail wird nur f\u00FCr eine einzige Nachricht verwendet: die E-Mail mit deinem <strong>CHF 15 Rabatt</strong>.";
translations.de.faq1Question = "Wie ist der aktuelle Stand?";
translations.de.faq1Answer = "Prototyping.";
translations.de.faq4Question = "Welche Technologie wird verwendet?";
translations.de.faq4Answer =
  "Der aktuelle Fokus liegt auf L\u00FCfterk\u00FChlung mit gezieltem Luftstrom. Je nach Einsatzfall k\u00F6nnen auch bel\u00FCftete Konzepte oder wasserverdunstende K\u00FChlung f\u00FCr extreme Szenarien gepr\u00FCft werden.";
translations.de.faq5Question = "Ist das bereits verf\u00FCgbar?";
translations.de.faq5Answer =
  "Noch nicht. In Entwicklung, geplante Freigabe Ende 2026.";
translations.de.faq6Question = "Ist das Produkt schon im Verkauf?";
translations.de.faq6Answer =
  "Noch nicht, wir arbeiten am Prototyp.";
translations.de.privacyBody =
  "<strong>Verantwortlicher:</strong> Nicola Gurpinar, R\u00F6merstrasse 69, 8404 Winterthur, Schweiz, <a href=\"mailto:info@cryomanta.com\">info@cryomanta.com</a>.<br><br>Diese Website wird f\u00FCr das Cryomanta-Projekt betrieben. Bei Nutzung der Formulare k\u00F6nnen insbesondere Name, E-Mail-Adresse, Einsatzbereich, Ger\u00E4tetyp, gew\u00E4hlte Priorit\u00E4ten und Nachricht \u00FCbermittelt werden. Formularanfragen werden \u00FCber Web3Forms verarbeitet und an <a href=\"mailto:info@cryomanta.com\">info@cryomanta.com</a> weitergeleitet, um Anfragen zu beantworten, die Warteliste zu verwalten und die Produktentwicklung zu unterst\u00FCtzen.<br><br>Diese Website nutzt ausserdem Google Analytics und Google Ads Conversion Tracking zur Messung von Nutzung und Kampagnenleistung. Dabei k\u00F6nnen Nutzungsdaten, Browser- und Ger\u00E4tedaten, ungef\u00E4hre Standortdaten, Seiteninteraktionen sowie Cookies oder \u00E4hnliche Kennungen verarbeitet werden. Da diese Dienste von Drittanbietern betrieben werden, k\u00F6nnen Daten auch ausserhalb der Schweiz bearbeitet werden. Die gew\u00E4hlte Sprache wird lokal im Browser gespeichert, damit die Seite deine Pr\u00E4ferenz behalten kann.<br><br>Die Bearbeitung erfolgt ausschliesslich f\u00FCr den Betrieb der Website, die Kommunikation, die Warteliste, die Produktentwicklung und die Leistungsmessung. Personendaten werden nur so lange aufbewahrt, wie dies f\u00FCr diese Zwecke erforderlich oder gesetzlich notwendig ist. Du kannst Auskunft, Berichtigung oder L\u00F6schung deiner Personendaten verlangen, indem du <a href=\"mailto:info@cryomanta.com\">info@cryomanta.com</a> kontaktierst. Drittanbieter bearbeiten Daten nach ihren eigenen Nutzungs- und Datenschutzbedingungen.";
translations.de.legalBody =
  "<strong>Verantwortlich f\u00FCr diese Website:</strong><br>Nicola Gurpinar<br>R\u00F6merstrasse 69<br>8404 Winterthur<br>Schweiz<br><br><strong>E-Mail:</strong> <a href=\"mailto:info@cryomanta.com\">info@cryomanta.com</a><br><strong>Projekt:</strong> Cryomanta<br><br>Diese Website ist eine Konzept-Landingpage f\u00FCr Cryomanta. Inhalte dienen der allgemeinen Information zum Projekt und k\u00F6nnen sich w\u00E4hrend der Entwicklung \u00E4ndern. Auf dieser Website wird kein verbindliches Verkaufsangebot abgegeben, und es kommt kein direkter Kaufvertrag \u00FCber diese Seite zustande. Trotz sorgf\u00E4ltiger Pr\u00FCfung wird keine Gew\u00E4hr f\u00FCr Vollst\u00E4ndigkeit, Richtigkeit oder Aktualit\u00E4t \u00FCbernommen. F\u00FCr externe Links und Dienste Dritter sind ausschliesslich deren Betreiber verantwortlich. Soweit nicht anders angegeben, werden die Inhalte dieser Website f\u00FCr das Cryomanta-Projekt bereitgestellt.";
translations.de.footerNote =
  "Visuals sind Konzept-Renderings. Produkt in Entwicklung.";

function getText(key) {
  return translations[currentLanguage][key];
}

function getLeadWorkerEndpoint() {
  return document
    .querySelector('meta[name="lead-worker-endpoint"]')
    ?.getAttribute("content")
    ?.trim() || "";
}

function trackLeadConversion(onComplete) {
  const callback = typeof onComplete === "function" ? onComplete : null;

  if (typeof window.gtag !== "function") {
    callback?.();
    return;
  }

  let completed = false;
  const finish = () => {
    if (completed) {
      return;
    }

    completed = true;
    callback?.();
  };

  window.gtag("event", "conversion", {
    send_to: ADS_CONVERSION_SEND_TO,
    value: ADS_CONVERSION_VALUE,
    currency: ADS_CONVERSION_CURRENCY,
    event_callback: finish,
  });

  window.setTimeout(finish, 700);
}

function sendLeadWorkerEvent(eventName, details = {}) {
  const endpoint = getLeadWorkerEndpoint();

  if (!endpoint) {
    return Promise.resolve(false);
  }

  const payload = {
    event: eventName,
    source: "website",
    language: currentLanguage,
    page_path: window.location.pathname,
    page_url: window.location.href,
    timestamp: new Date().toISOString(),
    ...details,
  };
  const body = JSON.stringify(payload);

  if (typeof navigator.sendBeacon === "function") {
    try {
      const queued = navigator.sendBeacon(
        endpoint,
        new Blob([body], { type: "application/json" }),
      );

      if (queued) {
        return Promise.resolve(true);
      }
    } catch (error) {
      // Fall through to fetch when sendBeacon is unavailable or rejected.
    }
  }

  return fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body,
    keepalive: true,
    mode: "cors",
  })
    .then(() => true)
    .catch(() => false);
}

function isWhatsAppUrl(urlValue) {
  if (!urlValue) {
    return false;
  }

  try {
    const url = new URL(urlValue, window.location.href);
    const protocol = url.protocol.toLowerCase();
    const hostname = url.hostname.toLowerCase();

    return protocol === "whatsapp:" || hostname === "wa.me" || WHATSAPP_HOST_PATTERN.test(hostname);
  } catch (error) {
    return /^whatsapp:\/\//i.test(urlValue) || /wa\.me|whatsapp\.com/i.test(urlValue);
  }
}

function buildPercentEncodedQuery(searchParams) {
  const queryEntries = Array.from(searchParams.entries());

  if (!queryEntries.length) {
    return "";
  }

  return queryEntries
    .map(
      ([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    )
    .join("&");
}

function appendWhatsAppSignature(message) {
  const normalizedMessage = typeof message === "string" ? message.trimEnd() : "";

  if (!normalizedMessage) {
    return WHATSAPP_MESSAGE_SIGNATURE;
  }

  if (normalizedMessage.endsWith(WHATSAPP_MESSAGE_SIGNATURE)) {
    return normalizedMessage;
  }

  return `${normalizedMessage}\n\n${WHATSAPP_MESSAGE_SIGNATURE}`;
}

function normalizeWhatsAppUrl(urlValue) {
  if (!urlValue || !isWhatsAppUrl(urlValue)) {
    return urlValue;
  }

  try {
    const url = new URL(urlValue, window.location.href);

    url.searchParams.set(
      "text",
      appendWhatsAppSignature(url.searchParams.get("text") || ""),
    );

    const query = buildPercentEncodedQuery(url.searchParams);

    return `${url.protocol}//${url.host}${url.pathname}${query ? `?${query}` : ""}${url.hash}`;
  } catch (error) {
    if (/([?&]text=)([^&#]*)/i.test(urlValue)) {
      return urlValue.replace(/([?&]text=)([^&#]*)/i, (match, prefix, value) => {
        let decodedValue = value;

        try {
          decodedValue = decodeURIComponent(value.replace(/\+/g, " "));
        } catch (decodeError) {
          decodedValue = value.replace(/\+/g, " ");
        }

        return `${prefix}${encodeURIComponent(appendWhatsAppSignature(decodedValue))}`;
      });
    }

    const hashIndex = urlValue.indexOf("#");
    const baseUrl = hashIndex >= 0 ? urlValue.slice(0, hashIndex) : urlValue;
    const hash = hashIndex >= 0 ? urlValue.slice(hashIndex) : "";
    const separator = baseUrl.includes("?") ? "&" : "?";
    const textParam = `text=${encodeURIComponent(appendWhatsAppSignature(""))}`;

    return `${baseUrl}${separator}${textParam}${hash}`;
  }
}

function normalizeWhatsAppLinks() {
  document.querySelectorAll("a[href]").forEach((link) => {
    const originalHref = link.getAttribute("href") || "";

    if (!isWhatsAppUrl(originalHref)) {
      return;
    }

    const normalizedHref = normalizeWhatsAppUrl(originalHref);

    if (normalizedHref && normalizedHref !== originalHref) {
      link.setAttribute("href", normalizedHref);
    }
  });
}

function getWhatsAppEventDetails(element, href) {
  return {
    channel: "whatsapp",
    href,
    label:
      element?.getAttribute("aria-label")?.trim() ||
      element?.textContent?.trim() ||
      "whatsapp",
  };
}

function trackWhatsAppLead(details = {}, onComplete) {
  const eventDetails =
    details && typeof details === "object"
      ? { channel: "whatsapp", ...details }
      : { channel: "whatsapp" };

  sendLeadWorkerEvent("whatsapp_click", eventDetails);
  trackLeadConversion(onComplete);
}

function handleWhatsAppClick(event) {
  const target = event.target instanceof Element ? event.target : null;
  const link = target?.closest("a[href]") || null;

  if (!link) {
    return;
  }

  const href = link.href || link.getAttribute("href") || "";

  if (!isWhatsAppUrl(href)) {
    return;
  }

  const normalizedHref = normalizeWhatsAppUrl(href) || href;
  const eventDetails = getWhatsAppEventDetails(link, normalizedHref);
  const shouldLeaveNavigationUntouched =
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    link.target === "_blank" ||
    link.hasAttribute("download");

  if (normalizedHref !== href) {
    link.setAttribute("href", normalizedHref);
  }

  if (shouldLeaveNavigationUntouched) {
    trackWhatsAppLead(eventDetails);
    return;
  }

  event.preventDefault();

  let navigated = false;
  const navigateToWhatsApp = () => {
    if (navigated) {
      return;
    }

    navigated = true;
    window.location.assign(normalizedHref);
  };

  trackWhatsAppLead(eventDetails, navigateToWhatsApp);
  window.setTimeout(navigateToWhatsApp, 700);
}

function updateSeoMetadata() {
  const title = getText("pageTitle");
  const description = getText("pageDescription");

  document.title = title;

  if (metaDescription) {
    metaDescription.setAttribute("content", description);
  }

  if (ogTitle) {
    ogTitle.setAttribute("content", title);
  }

  if (ogDescription) {
    ogDescription.setAttribute("content", description);
  }

  if (twitterTitle) {
    twitterTitle.setAttribute("content", title);
  }

  if (twitterDescription) {
    twitterDescription.setAttribute("content", description);
  }

  if (ogLocale) {
    ogLocale.setAttribute("content", currentLanguage === "de" ? "de_CH" : "en_CH");
  }

  if (canonicalLink) {
    canonicalLink.setAttribute("href", SITE_URL);
  }

  if (ogUrl) {
    ogUrl.setAttribute("content", SITE_URL);
  }
}

function updateSuccessBody() {
  if (!successCopy) {
    return;
  }

  if (lastSubmissionHadEmail === true) {
    successCopy.textContent = getText("successBodyEmail");
    return;
  }

  if (lastSubmissionHadEmail === false) {
    successCopy.textContent = getText("successBodyNoEmail");
    return;
  }

  successCopy.textContent = getText("successBodyDefault");
}

function applyTranslations(language) {
  currentLanguage = language;

  document.documentElement.lang = language === "de" ? "de-CH" : "en";
  updateSeoMetadata();

  i18nTextElements.forEach((element) => {
    const key = element.dataset.i18n;

    if (key && Object.prototype.hasOwnProperty.call(translations[currentLanguage], key)) {
      element.textContent = getText(key);
    }
  });

  i18nHtmlElements.forEach((element) => {
    const key = element.dataset.i18nHtml;

    if (key && Object.prototype.hasOwnProperty.call(translations[currentLanguage], key)) {
      element.innerHTML = getText(key);
    }
  });

  i18nPlaceholderElements.forEach((element) => {
    const key = element.dataset.i18nPlaceholder;

    if (key && Object.prototype.hasOwnProperty.call(translations[currentLanguage], key)) {
      element.setAttribute("placeholder", getText(key));
    }
  });

  langButtons.forEach((button) => {
    const isActive = button.dataset.lang === currentLanguage;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  updateSuccessBody();
  updateUseCaseOtherState();
  updatePriorityOtherState();
  updateModelOptions();
  populateCountryOptions();
  applyDetectedCountrySelection();
  validatePriorityLimit();
  requestMobileScrollStageUpdate();

  try {
    window.localStorage.setItem(LANGUAGE_KEY, currentLanguage);
  } catch (error) {
    // Ignore storage issues and keep the page usable.
  }
}

function updateWaitlistState() {
  if (!emailInput || !waitlistPanel) {
    return;
  }

  const hasEmail = emailInput.value.trim().length > 0;
  waitlistPanel.hidden = !hasEmail;

  requestMobileScrollStageUpdate();
}

function getCountryDisplayName(countryCode, language = currentLanguage) {
  const normalizedCode = String(countryCode || "").trim().toUpperCase();

  if (!normalizedCode) {
    return "";
  }

  const locales = language === "de" ? ["de-CH", "de", "en"] : ["en"];

  for (const locale of locales) {
    try {
      const displayNames = new Intl.DisplayNames([locale], { type: "region" });
      const label = String(displayNames.of(normalizedCode) || "").trim();

      if (label) {
        return label;
      }
    } catch (error) {
      // Try the next locale and fall back to the code if needed.
    }
  }

  return normalizedCode;
}

function setOptionText(option, text) {
  const normalizedText = String(text || "");
  option.text = normalizedText;
  option.label = normalizedText;
  option.textContent = normalizedText;
}

function getNavigatorCountryCode() {
  const localeCandidates = [
    ...(Array.isArray(navigator.languages) ? navigator.languages : []),
    navigator.language,
    navigator.userLanguage,
  ];

  for (const locale of localeCandidates) {
    const normalizedLocale = String(locale || "").trim().replace(/_/g, "-");

    if (!normalizedLocale) {
      continue;
    }

    const segments = normalizedLocale.split("-");

    for (let index = 1; index < segments.length; index += 1) {
      const segment = segments[index].trim().toUpperCase();

      if (/^[A-Z]{2}$/.test(segment) && COUNTRY_CODES.includes(segment)) {
        return segment;
      }
    }
  }

  return "";
}

function populateCountryOptions() {
  if (!countryInput) {
    return;
  }

  const currentValue = String(countryInput.value || "").trim().toUpperCase();
  const countryOptions = COUNTRY_CODES
    .map((countryCode) => ({
      countryCode,
      label: getCountryDisplayName(countryCode),
    }))
    .sort((left, right) => left.label.localeCompare(right.label, currentLanguage));

  countryInput.innerHTML = "";

  const placeholderOption = document.createElement("option");
  placeholderOption.value = "";
  setOptionText(placeholderOption, getText("selectOne"));
  countryInput.appendChild(placeholderOption);

  countryOptions.forEach(({ countryCode, label }) => {
    const option = document.createElement("option");
    option.value = countryCode;
    setOptionText(option, label);
    countryInput.appendChild(option);
  });

  if (COUNTRY_CODES.includes(currentValue)) {
    countryInput.value = currentValue;
  }
}

function applyDetectedCountrySelection(force = false) {
  if (!countryInput || !detectedCountryCode) {
    return;
  }

  const currentValue = String(countryInput.value || "").trim().toUpperCase();
  const isAutofilledValue =
    currentValue === "" || currentValue === lastAutofilledCountryCode;

  if (!force && !isAutofilledValue) {
    return;
  }

  countryInput.value = detectedCountryCode;
  lastAutofilledCountryCode = detectedCountryCode;
}

async function prefillCountryFromIp() {
  if (!countryInput) {
    return;
  }

  const navigatorCountryCode = getNavigatorCountryCode();

  if (navigatorCountryCode) {
    detectedCountryCode = navigatorCountryCode;
    applyDetectedCountrySelection();
  }

  try {
    const response = await fetch(COUNTRY_LOOKUP_ENDPOINT, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Country lookup failed with status ${response.status}`);
    }

    const result = await response.json();
    const countryCode = String(result.country || "").trim().toUpperCase();

    if (!countryCode) {
      return;
    }

    detectedCountryCode = countryCode;
    applyDetectedCountrySelection();
  } catch (error) {
    // Ignore lookup issues and leave the field editable.
  }
}

function updateUseCaseOtherState(shouldFocus = false) {
  if (!useCaseSelect || !useCaseOtherInput) {
    return;
  }

  const isOtherSelected = useCaseSelect.value === OTHER_OPTION_VALUE;

  useCaseOtherInput.hidden = !isOtherSelected;
  useCaseOtherInput.disabled = !isOtherSelected;
  useCaseOtherInput.required = isOtherSelected;

  if (!isOtherSelected) {
    useCaseOtherInput.value = "";
  } else if (shouldFocus) {
    useCaseOtherInput.focus();
  }

  requestMobileScrollStageUpdate();
}

function updatePriorityOtherState(shouldFocus = false) {
  if (!priorityOtherInput || !priorityOtherToggle) {
    return;
  }

  const isOtherSelected = priorityOtherToggle.checked;

  priorityOtherInput.hidden = !isOtherSelected;
  priorityOtherInput.disabled = !isOtherSelected;
  priorityOtherInput.required = isOtherSelected;

  if (!isOtherSelected) {
    priorityOtherInput.value = "";
  } else if (shouldFocus) {
    priorityOtherInput.focus();
  }

  requestMobileScrollStageUpdate();
}

function updateModelOtherState(shouldFocus = false) {
  if (!modelSelect || !modelOtherInput) {
    return;
  }

  const isOtherSelected = modelSelect.value === OTHER_OPTION_VALUE;

  modelOtherInput.hidden = !isOtherSelected;
  modelOtherInput.disabled = !isOtherSelected;
  modelOtherInput.required = isOtherSelected;

  if (!isOtherSelected) {
    modelOtherInput.value = "";
  } else if (shouldFocus) {
    modelOtherInput.focus();
  }

  requestMobileScrollStageUpdate();
}

function getModelOptionLabel(model) {
  if (model === OTHER_OPTION_VALUE) {
    return getText("useOther");
  }

  if (currentLanguage !== "de") {
    return model;
  }

  return String(model)
    .replace(/-inch\b/g, "-Zoll")
    .replace(/\binch\b/g, "Zoll");
}

function updateModelOptions() {
  if (!modelSelect) {
    return;
  }

  const deviceType = deviceTypeSelect?.value || "";
  const currentValue = modelSelect.value;
  const models = DEVICE_MODELS_BY_TYPE[deviceType] || [];
  const modelOptions = deviceType ? [...models, OTHER_OPTION_VALUE] : [];
  const placeholder = deviceType ? getText("selectOne") : getText("modelSelectDeviceType");

  modelSelect.innerHTML = "";

  const placeholderOption = document.createElement("option");
  placeholderOption.value = "";
  setOptionText(placeholderOption, placeholder);
  modelSelect.appendChild(placeholderOption);

  modelOptions.forEach((model) => {
    const option = document.createElement("option");
    option.value = model;
    setOptionText(option, getModelOptionLabel(model));
    modelSelect.appendChild(option);
  });

  modelSelect.disabled = modelOptions.length === 0;
  modelSelect.value = modelOptions.includes(currentValue) ? currentValue : "";
  updateModelOtherState();
}

function normalizeFeedbackFormData(formData) {
  const useCase = String(formData.get("useCase") || "").trim();
  const useCaseOther = String(formData.get("useCaseOther") || "").trim();
  const deviceModel = String(formData.get("deviceModel") || "").trim();
  const deviceModelOther = String(formData.get("deviceModelOther") || "").trim();
  const countryCode = String(formData.get("country") || "").trim().toUpperCase();

  if (useCase === OTHER_OPTION_VALUE && useCaseOther) {
    formData.set("useCase", useCaseOther);
  }

  formData.delete("useCaseOther");

  if (deviceModel === OTHER_OPTION_VALUE && deviceModelOther) {
    formData.set("deviceModel", deviceModelOther);
  }

  formData.delete("deviceModelOther");

  if (countryCode) {
    formData.set("country", getCountryDisplayName(countryCode, "en"));
  }

  const priorities = formData.getAll("priority").map((value) => String(value).trim());

  if (priorities.includes(OTHER_OPTION_VALUE)) {
    const priorityOther = String(formData.get("priorityOther") || "").trim();

    formData.delete("priority");

    priorities.forEach((priority) => {
      if (priority && priority !== OTHER_OPTION_VALUE) {
        formData.append("priority", priority);
      }
    });

    if (priorityOther) {
      formData.append("priority", priorityOther);
    }
  }

  formData.delete("priorityOther");
}

function validatePriorityLimit(showError = priorityValidationActive) {
  if (showError) {
    priorityValidationActive = true;
  }

  const checkedCount = priorityInputs.filter((input) => input.checked).length;
  const isValid = checkedCount >= 1 && checkedCount <= PRIORITY_LIMIT;
  const message = isValid ? "" : getText("priorityError");

  priorityInputs.forEach((input) => {
    input.setCustomValidity(message);
  });

  if (priorityError) {
    priorityError.hidden = isValid || !priorityValidationActive;
  }

  return isValid;
}

function clampValue(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function updateHeroMessageSwap() {
  if (!heroSection) {
    return;
  }

  if (!mobileScrollMedia.matches || reducedMotionMedia.matches) {
    heroSection.style.setProperty("--hero-message-progress", "0");
    return;
  }

  const currentScroll = window.scrollY || window.pageYOffset || 0;
  const start = Math.max(0, heroSection.offsetTop + 56);
  const range = Math.max(180, Math.min(300, heroSection.offsetHeight * 0.3));
  const progress = clampValue((currentScroll - start) / range);

  heroSection.style.setProperty("--hero-message-progress", progress.toFixed(3));
}

function clearMobileScrollStages() {
  if (mobileScrollFrame) {
    window.cancelAnimationFrame(mobileScrollFrame);
    mobileScrollFrame = 0;
  }

  mobileScrollStages.forEach(({ section, items }) => {
    section.classList.remove("mobile-scroll-stage");

    items.forEach((item) => {
      item.classList.remove("mobile-scroll-item");
      item.style.removeProperty("--item-opacity");
      item.style.removeProperty("--item-shift");
    });
  });

  mobileScrollStages = [];
  mobileScrollActive = false;
}

function buildMobileScrollStages() {
  clearMobileScrollStages();

  MOBILE_STAGE_DEFINITIONS.forEach(
    ({
      sectionSelector,
      itemSelectors,
      revealStarts,
      revealLength,
      exitStarts,
      exitRanges,
      exitStart,
      exitRange,
    }) => {
    const section = document.querySelector(sectionSelector);

    if (!section) {
      return;
    }

    const seenItems = new Set();
    const items = [];

    itemSelectors.forEach((selector) => {
      section.querySelectorAll(selector).forEach((element) => {
        if (!seenItems.has(element)) {
          seenItems.add(element);
          items.push(element);
        }
      });
    });

    if (!items.length) {
      return;
    }

    section.classList.add("mobile-scroll-stage");

    items.forEach((item) => {
      item.classList.add("mobile-scroll-item");
    });

    mobileScrollStages.push({
      section,
      items,
      revealStarts: Array.isArray(revealStarts) ? revealStarts : null,
      revealLength: typeof revealLength === "number" ? revealLength : 0.18,
      exitStarts: Array.isArray(exitStarts) ? exitStarts : null,
      exitRanges: Array.isArray(exitRanges) ? exitRanges : null,
      exitStart: typeof exitStart === "number" ? exitStart : 0.86,
      exitRange: typeof exitRange === "number" ? exitRange : 0.16,
    });
    },
  );

  mobileScrollActive = mobileScrollStages.length > 0;
}

function updateMobileScrollStages() {
  if (!mobileScrollActive) {
    return;
  }

  const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 1;

  mobileScrollStages.forEach(({ section, items, revealStarts, revealLength, exitStarts, exitRanges, exitStart, exitRange }) => {
    const rect = section.getBoundingClientRect();
    const sectionHeight = Math.max(rect.height, 1);
    const progress = clampValue((viewportHeight - rect.top) / (viewportHeight + sectionHeight));
    const step = items.length > 1 ? 0.46 / (items.length - 1) : 0;

    items.forEach((item, index) => {
      const revealStart = Array.isArray(revealStarts) && typeof revealStarts[index] === "number"
        ? revealStarts[index]
        : 0.05 + index * step;
      const revealEnd = Math.min(revealStart + revealLength, exitStart - 0.05);
      const reveal = clampValue((progress - revealStart) / Math.max(revealEnd - revealStart, 0.001));
      const itemExitStart =
        Array.isArray(exitStarts) && typeof exitStarts[index] === "number"
          ? exitStarts[index]
          : exitStart + index * 0.01;
      const itemExitRange =
        Array.isArray(exitRanges) && typeof exitRanges[index] === "number"
          ? exitRanges[index]
          : exitRange;
      const exit = clampValue((progress - itemExitStart) / itemExitRange);
      const opacity = clampValue(reveal * (1 - exit));
      const shift = exit > 0 ? -18 * exit : 22 * (1 - reveal);

      item.style.setProperty("--item-opacity", opacity.toFixed(3));
      item.style.setProperty("--item-shift", `${shift.toFixed(2)}px`);
    });
  });
}

function requestMobileScrollStageUpdate() {
  if (mobileScrollFrame) {
    return;
  }

  mobileScrollFrame = window.requestAnimationFrame(() => {
    mobileScrollFrame = 0;
    updateHeroMessageSwap();

    if (mobileScrollActive) {
      updateMobileScrollStages();
    }
  });
}

function syncMobileScrollStages() {
  const shouldEnable = mobileScrollMedia.matches && !reducedMotionMedia.matches;

  if (!shouldEnable) {
    clearMobileScrollStages();
    updateHeroMessageSwap();
    return;
  }

  buildMobileScrollStages();
  updateHeroMessageSwap();
  updateMobileScrollStages();
}

async function submitWeb3FormData(formData) {
  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: formData,
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Submission failed");
  }

  return result;
}

function resetPrototypeForm() {
  if (!feedbackForm || !successCard) {
    return;
  }

  feedbackForm.hidden = false;
  successCard.hidden = true;
  feedbackForm.reset();
  lastSubmissionHadEmail = null;
  priorityValidationActive = false;

  if (formError) {
    formError.hidden = true;
  }

  updateWaitlistState();
  updateUseCaseOtherState();
  updatePriorityOtherState();
  updateModelOptions();
  populateCountryOptions();
  applyDetectedCountrySelection(true);
  validatePriorityLimit();
  updateSuccessBody();
  requestMobileScrollStageUpdate();

  if (emailInput) {
    emailInput.focus();
  }
}

function resetContactForm() {
  if (!contactForm || !contactSuccessCard) {
    return;
  }

  contactForm.hidden = false;
  contactSuccessCard.hidden = true;
  contactForm.reset();

  if (contactFormError) {
    contactFormError.hidden = true;
  }

  const contactEmailInput = document.getElementById("contact-email");

  if (contactEmailInput) {
    contactEmailInput.focus();
  }

  requestMobileScrollStageUpdate();
}

if (emailInput) {
  emailInput.addEventListener("input", updateWaitlistState);
  updateWaitlistState();
}

if (useCaseSelect) {
  useCaseSelect.addEventListener("change", () => {
    updateUseCaseOtherState(useCaseSelect.value === OTHER_OPTION_VALUE);
  });
}

if (deviceTypeSelect) {
  deviceTypeSelect.addEventListener("change", updateModelOptions);
}

if (modelSelect) {
  modelSelect.addEventListener("change", () => {
    updateModelOtherState(modelSelect.value === OTHER_OPTION_VALUE);
  });
}

priorityInputs.forEach((input) => {
  input.addEventListener("change", () => {
    validatePriorityLimit(true);
    updatePriorityOtherState(input.value === OTHER_OPTION_VALUE && input.checked);
  });
});

langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyTranslations(button.dataset.lang || "en");
  });
});

if (feedbackForm) {
  feedbackForm.addEventListener("submit", async (event) => {
    const prioritiesValid = validatePriorityLimit(true);

    if (!prioritiesValid || !feedbackForm.reportValidity()) {
      event.preventDefault();
      return;
    }

    event.preventDefault();

    if (formError) {
      formError.hidden = true;
    }

    const formData = new FormData(feedbackForm);
    normalizeFeedbackFormData(formData);
    const email = String(formData.get("email") || "").trim();
    const originalSubmitLabel = submitButton?.textContent || "";

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = getText("submitSending");
    }

    try {
      await submitWeb3FormData(formData);
      trackLeadConversion();

      lastSubmissionHadEmail = email.length > 0;
      updateSuccessBody();
      feedbackForm.hidden = true;
      successCard.hidden = false;
      successCard.focus();
      feedbackForm.reset();
      priorityValidationActive = false;
      updateWaitlistState();
      updateUseCaseOtherState();
      updatePriorityOtherState();
      updateModelOptions();
      populateCountryOptions();
      applyDetectedCountrySelection(true);
      validatePriorityLimit();
      requestMobileScrollStageUpdate();
    } catch (error) {
      if (formError) {
        formError.textContent = getText("formError");
        formError.hidden = false;
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalSubmitLabel || getText("submitButton");
      }
    }
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    if (!contactForm.reportValidity()) {
      event.preventDefault();
      return;
    }

    event.preventDefault();

    if (contactFormError) {
      contactFormError.hidden = true;
    }

    const formData = new FormData(contactForm);
    const originalSubmitLabel = contactSubmitButton?.textContent || "";

    if (contactSubmitButton) {
      contactSubmitButton.disabled = true;
      contactSubmitButton.textContent = getText("contactSubmitting");
    }

    try {
      await submitWeb3FormData(formData);
      trackLeadConversion();

      contactForm.hidden = true;
      contactSuccessCard.hidden = false;
      contactSuccessCard.focus();
      contactForm.reset();
      requestMobileScrollStageUpdate();
    } catch (error) {
      if (contactFormError) {
        contactFormError.textContent = getText("contactError");
        contactFormError.hidden = false;
      }
    } finally {
      if (contactSubmitButton) {
        contactSubmitButton.disabled = false;
        contactSubmitButton.textContent = originalSubmitLabel || getText("contactButton");
      }
    }
  });
}

if (resetFormButton) {
  resetFormButton.addEventListener("click", resetPrototypeForm);
}

if (contactResetFormButton) {
  contactResetFormButton.addEventListener("click", resetContactForm);
}

normalizeWhatsAppLinks();
document.addEventListener("click", handleWhatsAppClick);
window.trackWhatsAppLead = trackWhatsAppLead;

window.addEventListener("scroll", requestMobileScrollStageUpdate, { passive: true });
window.addEventListener("resize", syncMobileScrollStages);

if (typeof mobileScrollMedia.addEventListener === "function") {
  mobileScrollMedia.addEventListener("change", syncMobileScrollStages);
} else if (typeof mobileScrollMedia.addListener === "function") {
  mobileScrollMedia.addListener(syncMobileScrollStages);
}

if (typeof reducedMotionMedia.addEventListener === "function") {
  reducedMotionMedia.addEventListener("change", syncMobileScrollStages);
} else if (typeof reducedMotionMedia.addListener === "function") {
  reducedMotionMedia.addListener(syncMobileScrollStages);
}

document.querySelectorAll(".faq-item, .legal-panel").forEach((element) => {
  element.addEventListener("toggle", requestMobileScrollStageUpdate);
});

let initialLanguage = "en";

try {
  const savedLanguage = window.localStorage.getItem(LANGUAGE_KEY);

  if (savedLanguage === "en" || savedLanguage === "de") {
    initialLanguage = savedLanguage;
  } else if ((navigator.language || "").toLowerCase().startsWith("de")) {
    initialLanguage = "de";
  }
} catch (error) {
  if ((navigator.language || "").toLowerCase().startsWith("de")) {
    initialLanguage = "de";
  }
}

applyTranslations(initialLanguage);
syncMobileScrollStages();
prefillCountryFromIp();
