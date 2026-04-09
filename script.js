const emailInput = document.getElementById("email");
const waitlistPanel = document.getElementById("waitlist-panel");
const consentInput = document.getElementById("consent");
const feedbackForm = document.getElementById("feedback-form");
const successCard = document.getElementById("success-card");
const successCopy = document.getElementById("success-copy");
const resetFormButton = document.getElementById("reset-form");
const submitButton = feedbackForm?.querySelector('button[type="submit"]') || null;
const formError = document.getElementById("form-error");
const contactForm = document.getElementById("contact-form");
const contactSuccessCard = document.getElementById("contact-success-card");
const contactResetFormButton = document.getElementById("contact-reset-form");
const contactSubmitButton = contactForm?.querySelector('button[type="submit"]') || null;
const contactFormError = document.getElementById("contact-form-error");
const priorityInputs = Array.from(document.querySelectorAll('input[name="priority"]'));
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

const LANGUAGE_KEY = "cooling-case-language";
const PRIORITY_LIMIT = 3;
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const SITE_URL = "https://cryomanta.com/";
const ADS_CONVERSION_SEND_TO = "AW-17891805169/lQvpCLbz_ZgcEPGPvdNC";
const ADS_CONVERSION_VALUE = 1.0;
const ADS_CONVERSION_CURRENCY = "CHF";
const mobileScrollMedia = window.matchMedia("(max-width: 720px)");
const reducedMotionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
const MOBILE_STAGE_DEFINITIONS = [
  {
    sectionSelector: ".pricing-section",
    itemSelectors: [".price-card"],
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
  {
    sectionSelector: ".site-footer",
    itemSelectors: [".legal-panel"],
    exitStart: 0.92,
    exitRange: 0.1,
  },
];
const heroSection = document.querySelector(".hero-section");
const heroShell = heroSection?.querySelector(".hero-shell") || null;

let currentLanguage = "en";
let lastSubmissionHadEmail = null;
let mobileScrollStages = [];
let mobileScrollActive = false;
let mobileScrollFrame = 0;
let mobileHeroStageActive = false;

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
    heroTitle: "Keep your phone cool in extreme heat.",
    heroText:
      "A premium cooling case concept for pilots, drone operators, field work, gaming, and other sun-exposed situations where heat, glare, throttling, and shutdown risk can interrupt the job.",
    heroPoint1: "Robust enough for harsh outdoor heat and sustained device load",
    heroPoint2: "Affordable enough to stay realistic for everyday field use",
    heroPoint3: "Impeccable in fit, feel and reliability under pressure",
    heroCtaPrimary: "Join waitlist &amp; save CHF 15>",
    heroCtaSecondary: "Give feedback",
    heroNote: "Concept only. Under development. Stay tuned, we keep you posted.",
    pricingLabel: "Indicative pricing",
    pricingTitle: "Reference pricing for the first production batch.",
    pricingNote: "Non-binding concept prices. Final pricing may change.",
    pricePhones: "Smartphone | Standard",
    priceTablets: "Tablet | Standard",
    priceRuggedPhones: "Smartphone | Armored",
    priceRuggedTablets: "Tablet | Armored",
    developmentLabel: "Under development",
    developmentTitle: "Stay tuned. We keep you posted.",
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
    feedbackLabel: "Feedback, waitlist and contact",
    feedbackTitle: "Stay tuned. We keep you posted.",
    feedbackText:
      "Tell us where overheating gets in the way and which design tradeoffs matter most. If you add an email address, the waitlist flow will reveal the <strong>CHF 15</strong> first-batch incentive and the consent checkbox for updates.",
    stressTitle: "Typical stress cases",
    stress1: "Direct sun on cockpit glass or controller screens",
    stress2: "Brightness throttling and reduced performance during active use",
    stress3: "Shutdown risk when charging, navigating, recording, or gaming outdoors",
    stress4: "Very hot screen surfaces after direct sun exposure",
    emailLabel: "Email",
    emailOptional: "(optional)",
    emailPlaceholder: "name@example.com",
    emailHelp: "Leave blank if you only want to share product feedback.",
    useCaseLabel: "Main use case",
    selectOne: "Select one",
    useAviation: "Aviation",
    useDrone: "Drone operations",
    useField: "Field work",
    useGaming: "Gaming",
    useOther: "Other",
    deviceTypeLabel: "Device type",
    deviceIphone: "iPhone",
    deviceAndroidPhone: "Android phone",
    deviceIpad: "iPad",
    deviceAndroidTablet: "Android tablet",
    deviceTabletPc: "Tablet PC",
    deviceLaptop: "Laptop",
    removeAfterLabel: "Will you remove the cooling case after every usage?",
    removeYes: "Yes",
    removeNo: "No",
    removeDepends: "Depends on the situation",
    priorityLegend: "Feature priorities",
    priorityHelp: "Choose up to 3.",
    priorityCooling: "better cooling performance",
    priorityNoise: "lower noise",
    prioritySlim: "slimmer size",
    priorityProtection: "stronger protection",
    priorityBattery: "cooling without external supply",
    priorityMount: "mount compatibility",
    priorityColor: "color customisation",
    priorityError: "Choose up to 3 feature priorities.",
    problemLabel: "Why do you want to solve overheating in your setup?",
    problemPlaceholder:
      "Tell us what happens today, why it matters, and what would improve your use case.",
    waitlistNote: "Waitlist users receive <strong>CHF 15</strong> off the first production batch.",
    consentText:
      "I agree to receive Cryomanta email updates about development and release timing.",
    submitButton: "Send feedback",
    submitSending: "Sending...",
    formDisclaimer: "Feedback and waitlist flow only. No checkout and no live ordering.",
    formError: "There was a problem sending the form. Please try again.",
    successLabel: "Thanks",
    successTitle: "Your message has been sent.",
    successBodyDefault:
      "Thanks for sharing your feedback. We will use incoming responses to refine the concept during development.",
    successBodyEmail:
      "Thanks for joining the waitlist. If you opted in, you may receive development updates and CHF 15 off the first production batch.",
    successBodyNoEmail:
      "Thanks for your feedback. If you want updates later, you can submit the form again with your email address.",
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
    faq6Answer: "Not yet, we are working on the prototype. We keep you posted.",
    footerNote: "Visuals are concept renders. Stay tuned, we keep you posted.",
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
      "This website presents the Cryomanta concept and processes feedback or waitlist submissions. If you use the form, submitted data can include your email address, use case, device type, selected priorities and your message. Form submissions are processed via Web3Forms and delivered to the configured inbox. We use submitted data only to answer enquiries, manage the waitlist and support product development. The selected language is stored locally in your browser so the page can remember your preference. You may request information, correction or deletion of submitted personal data by sending a new message through the contact form and referencing the email address used for the original submission.",
    legalTitle: "Legal notice",
    legalBody:
      "<strong>Responsible:</strong> Nicola Gurpinar, Switzerland.<br><strong>Contact:</strong> via the contact form on this page.<br>This website is a concept landing page for Cryomanta. Content is provided for general information about the project status and may change during development. Liability for external links and third-party services remains with their respective operators.",
  },
  de: {
    pageTitle: "Eiskalt Cooling Case | Konzept für extreme Hitze",
    pageDescription:
      "Eiskalt Cooling Case ist ein in der Schweiz gefertigtes Konzept, um Smartphones und Tablets bei grosser Hitze, Blendung und dauerhafter Last nutzbar zu halten.",
    headerSummary: "Schweizer Cooling-Case-Konzept fÃ¼r zuverlÃ¤ssige Smartphones und Tablets bei extremer Hitze.",
    navConcept: "Konzept",
    navFeedback: "Feedback",
    navFaq: "FAQ",
    heroEyebrow: "Hergestellt in der Schweiz",
    heroStatus:
      '<span class="hero-status-state">In Entwicklung</span><span aria-hidden="true">&middot;</span><span class="hero-status-release">Geplante Freigabe: Ende 2026</span>',
    heroTitle: "Halte dein Handy kühl bei extremer Hitze.",
    heroText:
      "Ein hochwertiges Cooling-Case-Konzept für Piloten, Drohnenoperatoren, Ausseneinsätze, Gaming und andere sonnenexponierte Situationen, in denen Hitze, Blendung, Leistungsdrosselung und Abschaltrisiko stören.",
    heroPoint1: "Robust genug für grosse Hitze im Freien und dauerhafte Gerätelast",
    heroPoint2: "Erschwinglich genug für reale Einsätze im Alltag und im Feld",
    heroPoint3: "Makellos in Passform, Haptik und Zuverlässigkeit unter Belastung",
    heroCtaPrimary: "Warteliste &amp; <strong>CHF 15</strong> sparen",
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
      "Cooling Case befindet sich noch in Entwicklung. Diese Seite erklärt das Konzept, sammelt Feedback zu Überhitzungsproblemen und hilft bei der Priorisierung der ersten Produktionscharge.",
    devCard1Title: "Robust",
    devCard1Text:
      "Ausgelegt für direkte Sonne, dauerhafte Last und härtere Outdoor-Bedingungen.",
    devCard2Title: "Erschwinglich",
    devCard2Text:
      "Ziel ist ein realistischer Preis für Piloten, Feldarbeit und anspruchsvolle Alltagsnutzung.",
    devCard3Title: "Makellos",
    devCard3Text:
      "Entwickelt für saubere Passform, sicheren Griff, haltbare Materialien und ein hochwertiges Ergebnis.",
    feedbackLabel: "Feedback, Warteliste und Kontakt",
    feedbackTitle: "Hilf, die erste Version zu formen.",
    feedbackText:
      "Sag uns, wo Überhitzung stört und welche Designabwägungen am wichtigsten sind. Wenn du eine E-Mail angibst, erscheint der Hinweis auf <strong>CHF 15 Rabatt</strong> für die erste Charge samt Einwilligung für Updates.",
    stressTitle: "Typische Belastungsszenarien",
    stress1: "Direkte Sonne auf Cockpitglas oder Controller-Bildschirme",
    stress2: "Helligkeitsdrosselung und weniger Leistung während der Nutzung",
    stress3: "Abschaltrisiko beim Laden, Navigieren, Aufzeichnen oder Gaming im Freien",
    emailLabel: "E-Mail",
    emailOptional: "(optional)",
    emailPlaceholder: "name@beispiel.ch",
    emailHelp: "Leer lassen, wenn du nur Produktfeedback geben möchtest.",
    useCaseLabel: "Hauptanwendung",
    selectOne: "Bitte wählen",
    useAviation: "Luftfahrt",
    useDrone: "Drohnenbetrieb",
    useField: "Ausseneinsatz",
    useGaming: "Gaming",
    useOther: "Andere",
    deviceTypeLabel: "Gerätetyp",
    deviceIphone: "iPhone",
    deviceAndroidPhone: "Android-Handy",
    deviceIpad: "iPad",
    deviceAndroidTablet: "Android-Tablet",
    deviceTabletPc: "Tablet-PC",
    deviceLaptop: "Laptop",
    priorityLegend: "Prioritäten",
    priorityHelp: "Bis zu 3 wählen.",
    priorityCooling: "bessere Kühlleistung",
    priorityNoise: "weniger Geräusch",
    prioritySlim: "schlankere Bauform",
    priorityWeight: "geringeres Gewicht",
    priorityGrip: "besserer Halt",
    priorityProtection: "stärkerer Schutz",
    priorityBattery: "bessere Batterieeffizienz",
    priorityOutdoor: "Outdoor- und Sonnenlicht-Tauglichkeit",
    priorityMount: "Mount-Kompatibilität",
    priorityError: "Bitte höchstens 3 Prioritäten wählen.",
    problemLabel: "Welches Überhitzungsproblem soll dieses Produkt für dich lösen?",
    problemPlaceholder:
      "Beschreibe Hitze, Blendung, Leistungsdrosselung, Abdunkeln, Abschalten oder ein Mounting-Problem.",
    waitlistNote: "Wartelisten-Nutzer erhalten CHF 15 Rabatt auf die erste Produktionscharge.",
    consentText:
      "Ich bin einverstanden, E-Mail-Updates zu Entwicklung und Freigabe von Cooling Case zu erhalten.",
    submitButton: "Feedback senden",
    submitSending: "Wird gesendet...",
    formDisclaimer: "Nur Feedback- und Wartelistenablauf. Kein Checkout und keine Live-Bestellung.",
    formError: "Beim Senden des Formulars ist ein Problem aufgetreten. Bitte versuche es erneut.",
    successLabel: "Danke",
    successTitle: "Deine Nachricht wurde gesendet.",
    successBodyDefault:
      "Danke für dein Feedback. Eingehende Rückmeldungen helfen, das Konzept während der Entwicklung zu verfeinern.",
    successBodyEmail:
      "Danke für deine Wartelisten-Anmeldung. Mit Einwilligung kannst du Entwicklungsupdates und CHF 15 Rabatt auf die erste Produktionscharge erhalten.",
    successBodyNoEmail:
      "Danke für dein Feedback. Wenn du später Updates möchtest, kannst du das Formular erneut mit deiner E-Mail ausfüllen.",
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
      "Diese Website präsentiert das Cooling-Case-Konzept und verarbeitet Feedback- oder Wartelistenanfragen. Bei Nutzung des Formulars können insbesondere E-Mail-Adresse, Einsatzbereich, Gerätetyp, gewählte Prioritäten und Nachricht übermittelt werden. Formularanfragen werden über Web3Forms verarbeitet und an das konfigurierte Postfach zugestellt. Die übermittelten Daten werden ausschliesslich zur Beantwortung von Anfragen, zur Verwaltung der Warteliste und zur Unterstützung der Produktentwicklung verwendet. Die gewählte Sprache wird lokal im Browser gespeichert, damit die Seite deine Präferenz behalten kann. Du kannst Auskunft, Berichtigung oder Löschung deiner übermittelten Daten verlangen, indem du das Kontaktformular erneut nutzt und die zuvor verwendete E-Mail-Adresse nennst.",
    legalTitle: "Impressum",
    legalBody:
      "<strong>Verantwortlich:</strong> Nicola Gurpinar, Schweiz.<br><strong>Kontakt:</strong> über das Kontaktformular auf dieser Seite.<br>Diese Website ist eine Konzept-Landingpage für Eiskalt Cooling Case. Inhalte dienen der allgemeinen Information zum Projektstand und können sich während der Entwicklung ändern. Für externe Links und Dienste Dritter sind ausschliesslich deren Betreiber verantwortlich.",
  },
};

translations.de.headerSummary =
  "Schweizer Cooling f\u00FCr Smartphones und Tablets bei extremer Hitze.";
translations.de.pageTitle =
  "Cryomanta | K\u00FChlung f\u00FCr Handy und Tablet bei extremer Hitze";
translations.de.pageDescription =
  "Cryomanta ist ein Schweizer Cooling-Case-Konzept f\u00FCr Smartphones und Tablets bei extremer Hitze, Blendung, Drosselung und Abschaltrisiko im Ausseneinsatz.";
translations.de.pricingNote =
  "Unverbindliche Konzeptpreise. Endg\u00FCltige Preise k\u00F6nnen sich \u00E4ndern.";
translations.de.heroTitle =
  "Handy k\u00FChl bei extremer Hitze.";
translations.de.heroNote =
  "Nur Konzept. In Entwicklung. Bleib dran, wir halten dich auf dem Laufenden.";
translations.de.developmentTitle =
  "Bleib dran. Wir halten dich auf dem Laufenden.";
translations.de.developmentText =
  "Cryomanta ist im Prototyping. Wir verfeinern Einsatzbereiche, K\u00FChlrichtung und Passform vor der ersten Produktionscharge und halten dich \u00FCber die Entwicklung auf dem Laufenden.";
translations.de.feedbackTitle =
  "Bleib dran. Wir halten dich auf dem Laufenden.";
translations.de.feedbackText =
  "Sag uns, wo \u00DCberhitzung st\u00F6rt und welche Designabw\u00E4gungen am wichtigsten sind. Wenn du eine E-Mail angibst, erscheint der Hinweis auf <strong>CHF 15</strong> f\u00FCr die erste Charge samt Einwilligung f\u00FCr Updates.";
translations.de.stress4 =
  "Sehr heisse Displayoberfl\u00E4chen nach direkter Sonneneinstrahlung";
translations.de.removeAfterLabel =
  "Wirst du das Cooling Case nach jeder Nutzung wieder entfernen?";
translations.de.removeYes = "Ja";
translations.de.removeNo = "Nein";
translations.de.removeDepends = "Kommt auf die Situation an";
translations.de.priorityBattery =
  "K\u00FChlung ohne externe Stromversorgung";
translations.de.priorityColor = "Farbindividualisierung";
translations.de.problemLabel =
  "Warum willst du \u00DCberhitzung in deinem Setup l\u00F6sen?";
translations.de.problemPlaceholder =
  "Erz\u00E4hl uns, was heute passiert, warum es wichtig ist und was deinen Einsatz verbessern w\u00FCrde.";
translations.de.waitlistNote =
  "Wartelisten-Nutzer erhalten <strong>CHF 15</strong> Rabatt auf die erste Produktionscharge.";
translations.de.consentText =
  "Ich bin einverstanden, E-Mail-Updates zu Entwicklung und Freigabe von Cryomanta zu erhalten.";
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
  "Noch nicht, wir arbeiten am Prototyp. Wir halten dich auf dem Laufenden.";
translations.de.privacyBody =
  "Diese Website pr\u00E4sentiert das Cryomanta-Konzept und verarbeitet Feedback- oder Wartelistenanfragen. Bei Nutzung des Formulars k\u00F6nnen insbesondere E-Mail-Adresse, Einsatzbereich, Ger\u00E4tetyp, gew\u00E4hlte Priorit\u00E4ten und Nachricht \u00FCbermittelt werden. Formularanfragen werden \u00FCber Web3Forms verarbeitet und an das konfigurierte Postfach zugestellt. Die \u00FCbermittelten Daten werden ausschliesslich zur Beantwortung von Anfragen, zur Verwaltung der Warteliste und zur Unterst\u00FCtzung der Produktentwicklung verwendet. Die gew\u00E4hlte Sprache wird lokal im Browser gespeichert, damit die Seite deine Pr\u00E4ferenz behalten kann. Du kannst Auskunft, Berichtigung oder L\u00F6schung deiner \u00FCbermittelten Daten verlangen, indem du das Kontaktformular erneut nutzt und die zuvor verwendete E-Mail-Adresse nennst.";
translations.de.legalBody =
  "<strong>Verantwortlich:</strong> Nicola Gurpinar, Schweiz.<br><strong>Kontakt:</strong> \u00FCber das Kontaktformular auf dieser Seite.<br>Diese Website ist eine Konzept-Landingpage f\u00FCr Cryomanta. Inhalte dienen der allgemeinen Information zum Projektstand und k\u00F6nnen sich w\u00E4hrend der Entwicklung \u00E4ndern. F\u00FCr externe Links und Dienste Dritter sind ausschliesslich deren Betreiber verantwortlich.";
translations.de.footerNote =
  "Visuals sind Konzept-Renderings. Bleib dran, wir halten dich auf dem Laufenden.";

function getText(key) {
  return translations[currentLanguage][key];
}

function trackLeadFormConversion() {
  if (typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", "conversion", {
    send_to: ADS_CONVERSION_SEND_TO,
    value: ADS_CONVERSION_VALUE,
    currency: ADS_CONVERSION_CURRENCY,
  });
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
  validatePriorityLimit();
  requestMobileScrollStageUpdate();

  try {
    window.localStorage.setItem(LANGUAGE_KEY, currentLanguage);
  } catch (error) {
    // Ignore storage issues and keep the page usable.
  }
}

function updateWaitlistState() {
  if (!emailInput || !waitlistPanel || !consentInput) {
    return;
  }

  const hasEmail = emailInput.value.trim().length > 0;
  waitlistPanel.hidden = !hasEmail;
  consentInput.required = hasEmail;

  if (!hasEmail) {
    consentInput.checked = false;
    consentInput.setCustomValidity("");
  }

  requestMobileScrollStageUpdate();
}

function validatePriorityLimit() {
  const checkedCount = priorityInputs.filter((input) => input.checked).length;
  const isValid = checkedCount <= PRIORITY_LIMIT;
  const message = isValid ? "" : getText("priorityError");

  priorityInputs.forEach((input) => {
    input.setCustomValidity(message);
  });

  if (priorityError) {
    priorityError.hidden = isValid;
  }

  return isValid;
}

function clampValue(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function setMobileHeroValues({
  textOpacity = 1,
  textShift = 0,
  pointsOpacity = 1,
  pointsShift = 0,
  actionsOpacity = 1,
  actionsShift = 0,
} = {}) {
  if (!heroSection) {
    return;
  }

  heroSection.style.setProperty("--hero-text-opacity", String(textOpacity));
  heroSection.style.setProperty("--hero-text-shift", `${textShift}px`);
  heroSection.style.setProperty("--hero-points-opacity", String(pointsOpacity));
  heroSection.style.setProperty("--hero-points-shift", `${pointsShift}px`);
  heroSection.style.setProperty("--hero-actions-opacity", String(actionsOpacity));
  heroSection.style.setProperty("--hero-actions-shift", `${actionsShift}px`);
}

function clearMobileHeroStage() {
  mobileHeroStageActive = false;

  if (!heroSection) {
    return;
  }

  heroSection.classList.remove("mobile-hero-stage");
  setMobileHeroValues();
}

function updateMobileHeroStage() {
  if (!mobileHeroStageActive || !heroSection || !heroShell) {
    return;
  }

  const sectionRect = heroSection.getBoundingClientRect();
  const scrollRange = Math.max(heroSection.offsetHeight - heroShell.offsetHeight, 1);
  const progress = clampValue(-sectionRect.top / scrollRange);
  const textReveal = clampValue(progress / 0.14);
  const pointsReveal = clampValue((progress - 0.08) / 0.16);
  const actionsReveal = clampValue((progress - 0.18) / 0.18);

  setMobileHeroValues({
    textOpacity: textReveal.toFixed(3),
    textShift: (42 * (1 - textReveal) - 12 * progress).toFixed(2),
    pointsOpacity: pointsReveal.toFixed(3),
    pointsShift: (54 * (1 - pointsReveal) - 16 * progress).toFixed(2),
    actionsOpacity: actionsReveal.toFixed(3),
    actionsShift: (72 * (1 - actionsReveal) - 10 * progress).toFixed(2),
  });
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
  if ((!mobileScrollActive && !mobileHeroStageActive) || mobileScrollFrame) {
    return;
  }

  mobileScrollFrame = window.requestAnimationFrame(() => {
    mobileScrollFrame = 0;
    updateMobileScrollStages();
    updateMobileHeroStage();
  });
}

function syncMobileScrollStages() {
  const shouldEnable = mobileScrollMedia.matches && !reducedMotionMedia.matches;

  if (!shouldEnable) {
    clearMobileScrollStages();
    clearMobileHeroStage();
    return;
  }

  if (heroSection && heroShell) {
    heroSection.classList.add("mobile-hero-stage");
    mobileHeroStageActive = true;
  }

  buildMobileScrollStages();
  updateMobileScrollStages();
  updateMobileHeroStage();
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

  if (formError) {
    formError.hidden = true;
  }

  updateWaitlistState();
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

priorityInputs.forEach((input) => {
  input.addEventListener("change", validatePriorityLimit);
});

langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyTranslations(button.dataset.lang || "en");
  });
});

if (feedbackForm) {
  feedbackForm.addEventListener("submit", async (event) => {
    const prioritiesValid = validatePriorityLimit();

    if (!prioritiesValid || !feedbackForm.reportValidity()) {
      event.preventDefault();
      return;
    }

    event.preventDefault();

    if (formError) {
      formError.hidden = true;
    }

    const formData = new FormData(feedbackForm);
    const email = String(formData.get("email") || "").trim();
    const originalSubmitLabel = submitButton?.textContent || "";

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = getText("submitSending");
    }

    try {
      await submitWeb3FormData(formData);
      trackLeadFormConversion();

      lastSubmissionHadEmail = email.length > 0;
      updateSuccessBody();
      feedbackForm.hidden = true;
      successCard.hidden = false;
      successCard.focus();
      feedbackForm.reset();
      updateWaitlistState();
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
      trackLeadFormConversion();

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
