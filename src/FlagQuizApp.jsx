import React, { useState, useEffect, useCallback, useMemo } from 'react';

// Flag database with all country information - 20 flags with design categories
const flagDatabase = {
  flags: [
    // EUROPE
    {
      id: "GR", code: "gr", name: { en: "Greece", el: "Ελλάδα" }, continent: "Europe",
      aspectRatio: "2:3", adoptionDate: "1978-12-22", designPattern: "Striped with canton and cross",
      designCategories: [
        { id: 15, broader: "Geometric", specific: "Stripes", description: { en: "9 horizontal bi-color stripes with a canton", el: "9 οριζόντιες δίχρωμες λωρίδες με canton" } },
        { id: 45, broader: "Geometric", specific: "Crosses", description: { en: "Greek cross in the canton", el: "Ελληνικός σταυρός στο canton" } }
      ],
      colors: [
        { name: { en: "Blue", el: "Μπλε" }, hex: "#0D5EAF", percentage: 55, symbolism: { en: "Sky and sea", el: "Ουρανός και θάλασσα" } },
        { name: { en: "White", el: "Λευκό" }, hex: "#FFFFFF", percentage: 45, symbolism: { en: "Purity", el: "Αγνότητα" } }
      ],
      geometry: { stripes: { count: 9, orientation: "horizontal" }, stars: null, canton: { present: true } },
      symbols: { text: null },
      symbolism: { en: "9 stripes for 'Freedom or Death' syllables", el: "9 λωρίδες για τις συλλαβές του 'Ελευθερία ή Θάνατος'" },
      funFacts: [
        { en: "Called 'Γαλανόλευκη' (Blue-White) in Greek", el: "Ονομάζεται 'Γαλανόλευκη'" },
        { en: "The cross represents Greek Orthodox Christianity", el: "Ο σταυρός αντιπροσωπεύει την Ελληνική Ορθοδοξία" },
        { en: "One of the oldest flags still in use today", el: "Μία από τις παλαιότερες σημαίες που χρησιμοποιούνται σήμερα" }
      ]
    },
    {
      id: "DE", code: "de", name: { en: "Germany", el: "Γερμανία" }, continent: "Europe",
      aspectRatio: "3:5", adoptionDate: "1949-05-23", designPattern: "Horizontal triband",
      designCategories: [
        { id: 18, broader: "Geometric", specific: "Stripes", description: { en: "Three horizontal tri-color stripes — equal", el: "Τρεις ίσες οριζόντιες τρίχρωμες λωρίδες" } }
      ],
      colors: [
        { name: { en: "Black", el: "Μαύρο" }, hex: "#000000", percentage: 33.33, symbolism: { en: "Determination", el: "Αποφασιστικότητα" } },
        { name: { en: "Red", el: "Κόκκινο" }, hex: "#DD0000", percentage: 33.33, symbolism: { en: "Bravery", el: "Γενναιότητα" } },
        { name: { en: "Gold", el: "Χρυσό" }, hex: "#FFCC00", percentage: 33.34, symbolism: { en: "Freedom", el: "Ελευθερία" } }
      ],
      geometry: { stripes: { count: 3, orientation: "horizontal" }, stars: null, canton: null },
      symbols: { text: null },
      symbolism: { en: "Colors from 19th century unification movement", el: "Χρώματα από το κίνημα ενοποίησης του 19ου αιώνα" },
      funFacts: [
        { en: "Banned during the Nazi era (1933-1945)", el: "Απαγορεύτηκε κατά τη ναζιστική περίοδο (1933-1945)" },
        { en: "Colors inspired by uniforms of Lützow Free Corps", el: "Τα χρώματα εμπνεύστηκαν από τις στολές του Lützow Free Corps" },
        { en: "The design dates back to 1848 Frankfurt Parliament", el: "Ο σχεδιασμός χρονολογείται από το Κοινοβούλιο της Φρανκφούρτης το 1848" }
      ]
    },
    {
      id: "FR", code: "fr", name: { en: "France", el: "Γαλλία" }, continent: "Europe",
      aspectRatio: "2:3", adoptionDate: "1794-02-15", designPattern: "Vertical tricolor",
      designCategories: [
        { id: 30, broader: "Geometric", specific: "Stripes", description: { en: "Three vertical tri-color stripes — equal", el: "Τρεις ίσες κάθετες τρίχρωμες λωρίδες" } }
      ],
      colors: [
        { name: { en: "Blue", el: "Μπλε" }, hex: "#0055A4", percentage: 33.33, symbolism: { en: "Freedom", el: "Ελευθερία" } },
        { name: { en: "White", el: "Λευκό" }, hex: "#FFFFFF", percentage: 33.33, symbolism: { en: "Equality", el: "Ισότητα" } },
        { name: { en: "Red", el: "Κόκκινο" }, hex: "#EF4135", percentage: 33.34, symbolism: { en: "Fraternity", el: "Αδελφοσύνη" } }
      ],
      geometry: { stripes: { count: 3, orientation: "vertical" }, stars: null, canton: null },
      symbols: { text: null },
      symbolism: { en: "Colors represent Liberty, Equality, Fraternity", el: "Τα χρώματα αντιπροσωπεύουν Ελευθερία, Ισότητα, Αδελφοσύνη" },
      funFacts: [
        { en: "Known as 'Le Tricolore' (The Tricolor)", el: "Γνωστή ως 'Le Tricolore' (Η Τρικολόρ)" },
        { en: "Inspired many other national flags worldwide", el: "Ενέπνευσε πολλές άλλες εθνικές σημαίες παγκοσμίως" },
        { en: "Blue and red are traditional colors of Paris", el: "Το μπλε και το κόκκινο είναι τα παραδοσιακά χρώματα του Παρισιού" }
      ]
    },
    {
      id: "IT", code: "it", name: { en: "Italy", el: "Ιταλία" }, continent: "Europe",
      aspectRatio: "2:3", adoptionDate: "1948-01-01", designPattern: "Vertical tricolor",
      designCategories: [
        { id: 30, broader: "Geometric", specific: "Stripes", description: { en: "Three vertical tri-color stripes — equal", el: "Τρεις ίσες κάθετες τρίχρωμες λωρίδες" } }
      ],
      colors: [
        { name: { en: "Green", el: "Πράσινο" }, hex: "#009246", percentage: 33.33, symbolism: { en: "Hope", el: "Ελπίδα" } },
        { name: { en: "White", el: "Λευκό" }, hex: "#FFFFFF", percentage: 33.33, symbolism: { en: "Faith", el: "Πίστη" } },
        { name: { en: "Red", el: "Κόκκινο" }, hex: "#CE2B37", percentage: 33.34, symbolism: { en: "Charity", el: "Αγάπη" } }
      ],
      geometry: { stripes: { count: 3, orientation: "vertical" }, stars: null, canton: null },
      symbols: { text: null },
      symbolism: { en: "Green for hope, white for faith, red for charity", el: "Πράσινο για ελπίδα, λευκό για πίστη, κόκκινο για αγάπη" },
      funFacts: [
        { en: "Known as 'Il Tricolore' (The Tricolor)", el: "Γνωστή ως 'Il Tricolore' (Η Τρικολόρ)" },
        { en: "First adopted by the Cispadane Republic in 1797", el: "Πρώτη υιοθετήθηκε από την Κισπαδάνη Δημοκρατία το 1797" },
        { en: "Inspired by the French flag during Napoleon's campaign", el: "Εμπνεύστηκε από τη γαλλική σημαία κατά την εκστρατεία του Ναπολέοντα" }
      ]
    },
    {
      id: "GB", code: "gb", name: { en: "United Kingdom", el: "Ηνωμένο Βασίλειο" }, continent: "Europe",
      aspectRatio: "1:2", adoptionDate: "1801-01-01", designPattern: "Union Jack - superimposed crosses",
      designCategories: [
        { id: 43, broader: "Geometric", specific: "Crosses", description: { en: "Upright and diagonal centred crosses", el: "Κεντρικοί σταυροί κάθετοι και διαγώνιοι" } },
        { id: 38, broader: "Geometric", specific: "Crosses", description: { en: "Saint George's Cross", el: "Σταυρός του Αγίου Γεωργίου" } },
        { id: 42, broader: "Geometric", specific: "Crosses", description: { en: "Diagonal cross / Saltire", el: "Διαγώνιος σταυρός / Saltire" } }
      ],
      colors: [
        { name: { en: "Blue", el: "Μπλε" }, hex: "#012169", percentage: 50, symbolism: { en: "Scotland", el: "Σκωτία" } },
        { name: { en: "Red", el: "Κόκκινο" }, hex: "#C8102E", percentage: 30, symbolism: { en: "England & N. Ireland", el: "Αγγλία & Β. Ιρλανδία" } },
        { name: { en: "White", el: "Λευκό" }, hex: "#FFFFFF", percentage: 20, symbolism: { en: "Peace", el: "Ειρήνη" } }
      ],
      geometry: { stripes: null, stars: null, canton: null },
      symbols: { text: null },
      symbolism: { en: "Combination of England, Scotland, and Ireland crosses", el: "Συνδυασμός σταυρών Αγγλίας, Σκωτίας και Ιρλανδίας" },
      funFacts: [
        { en: "Called 'Union Jack' or 'Union Flag'", el: "Ονομάζεται 'Union Jack' ή 'Union Flag'" },
        { en: "The Welsh dragon is not represented in the flag", el: "Ο δράκος της Ουαλίας δεν απεικονίζεται στη σημαία" },
        { en: "Combines three different national flags into one", el: "Συνδυάζει τρεις διαφορετικές εθνικές σημαίες σε μία" }
      ]
    },
    {
      id: "SE", code: "se", name: { en: "Sweden", el: "Σουηδία" }, continent: "Europe",
      aspectRatio: "5:8", adoptionDate: "1906-06-22", designPattern: "Nordic Cross",
      designCategories: [
        { id: 39, broader: "Geometric", specific: "Crosses", description: { en: "Nordic Cross in two colors", el: "Σκανδιναβικός Σταυρός σε δύο χρώματα" } }
      ],
      colors: [
        { name: { en: "Blue", el: "Μπλε" }, hex: "#006AA7", percentage: 65, symbolism: { en: "Loyalty", el: "Αφοσίωση" } },
        { name: { en: "Yellow", el: "Κίτρινο" }, hex: "#FECC00", percentage: 35, symbolism: { en: "Generosity", el: "Γενναιοδωρία" } }
      ],
      geometry: { stripes: null, stars: null, canton: null },
      symbols: { text: null },
      symbolism: { en: "Yellow cross on blue represents Swedish monarchy", el: "Ο κίτρινος σταυρός σε μπλε αντιπροσωπεύει τη σουηδική μοναρχία" },
      funFacts: [
        { en: "One of the oldest flags still in use (since 16th century)", el: "Μία από τις παλαιότερες σημαίες σε χρήση (από τον 16ο αιώνα)" },
        { en: "Colors may represent the Swedish coat of arms", el: "Τα χρώματα μπορεί να αντιπροσωπεύουν το εθνόσημο της Σουηδίας" },
        { en: "The Nordic Cross design is off-center towards the hoist", el: "Ο Σκανδιναβικός Σταυρός είναι εκτός κέντρου προς το κοντάρι" }
      ]
    },

    // ASIA
    {
      id: "JP", code: "jp", name: { en: "Japan", el: "Ιαπωνία" }, continent: "Asia",
      aspectRatio: "2:3", adoptionDate: "1999-08-13", designPattern: "Charged (circle)",
      designCategories: [
        { id: 31, broader: "Geometric", specific: "Circles", description: { en: "One circle in center", el: "Ένας κύκλος στο κέντρο" } },
        { id: 54, broader: "Symbols", specific: "Sun", description: { en: "Sun", el: "Ήλιος" } }
      ],
      colors: [
        { name: { en: "White", el: "Λευκό" }, hex: "#FFFFFF", percentage: 81, symbolism: { en: "Purity", el: "Αγνότητα" } },
        { name: { en: "Red", el: "Κόκκινο" }, hex: "#BC002D", percentage: 19, symbolism: { en: "The sun", el: "Ο ήλιος" } }
      ],
      geometry: { stripes: null, stars: null, canton: null },
      symbols: { text: null },
      symbolism: { en: "Land of the Rising Sun", el: "Χώρα του Ανατέλλοντος Ηλίου" },
      funFacts: [
        { en: "One of the simplest national flags in the world", el: "Μία από τις πιο απλές εθνικές σημαίες στον κόσμο" },
        { en: "Called 'Nisshōki' (日章旗) meaning 'sun-mark flag'", el: "Ονομάζεται 'Nisshōki' (日章旗) που σημαίνει 'σημαία με σήμα ηλίου'" },
        { en: "The red disc is called 'Hinomaru' (circle of the sun)", el: "Ο κόκκινος δίσκος ονομάζεται 'Hinomaru' (κύκλος του ήλιου)" }
      ]
    },
    {
      id: "TR", code: "tr", name: { en: "Turkey", el: "Τουρκία" }, continent: "Asia",
      aspectRatio: "2:3", adoptionDate: "1936-05-29", designPattern: "Charged (crescent and star)",
      designCategories: [
        { id: 57, broader: "Symbols", specific: "Crescent, Star", description: { en: "Crescent Moon and Star - facing the fly", el: "Ημισέληνος και Αστέρι - προς την άκρη" } }
      ],
      colors: [
        { name: { en: "Red", el: "Κόκκινο" }, hex: "#E30A17", percentage: 85, symbolism: { en: "Blood of martyrs", el: "Αίμα μαρτύρων" } },
        { name: { en: "White", el: "Λευκό" }, hex: "#FFFFFF", percentage: 15, symbolism: { en: "Peace", el: "Ειρήνη" } }
      ],
      geometry: { stripes: null, stars: { count: 1, points: 5 }, canton: null },
      symbols: { text: null },
      symbolism: { en: "Star and crescent from Ottoman heritage", el: "Αστέρι και ημισέληνος από οθωμανική κληρονομιά" },
      funFacts: [
        { en: "Called 'Ay Yıldız' (Moon Star) in Turkish", el: "Ονομάζεται 'Ay Yıldız' (Αστέρι Φεγγαριού) στα τουρκικά" },
        { en: "Legend says the reflection of stars in blood inspired it", el: "Ο μύθος λέει ότι η αντανάκλαση αστεριών στο αίμα την ενέπνευσε" },
        { en: "One of the oldest national flag designs still in use", el: "Ένας από τους παλαιότερους σχεδιασμούς εθνικής σημαίας σε χρήση" }
      ]
    },
    {
      id: "IN", code: "in", name: { en: "India", el: "Ινδία" }, continent: "Asia",
      aspectRatio: "2:3", adoptionDate: "1947-07-22", designPattern: "Horizontal triband with wheel",
      designCategories: [
        { id: 18, broader: "Geometric", specific: "Stripes", description: { en: "Three horizontal tri-color stripes — equal", el: "Τρεις ίσες οριζόντιες τρίχρωμες λωρίδες" } },
        { id: 105, broader: "Symbols", specific: "Tool, instrument, device, or book", description: { en: "Ashoka Chakra or a wheel of Dharma", el: "Τσάκρα Ασόκα ή τροχός του Ντάρμα" } }
      ],
      colors: [
        { name: { en: "Saffron", el: "Κροκί" }, hex: "#FF9933", percentage: 33.33, symbolism: { en: "Courage", el: "Θάρρος" } },
        { name: { en: "White", el: "Λευκό" }, hex: "#FFFFFF", percentage: 33.33, symbolism: { en: "Peace", el: "Ειρήνη" } },
        { name: { en: "Green", el: "Πράσινο" }, hex: "#138808", percentage: 33.34, symbolism: { en: "Faith", el: "Πίστη" } }
      ],
      geometry: { stripes: { count: 3, orientation: "horizontal" }, stars: null, shapes: [{ name: "Ashoka Chakra", spokes: 24 }], canton: null },
      symbols: { text: null },
      symbolism: { en: "Ashoka Chakra - wheel of dharma with 24 spokes", el: "Τροχός Ashoka - τροχός του dharma με 24 ακτίνες" },
      funFacts: [
        { en: "24 spokes represent 24 hours of the day", el: "Οι 24 ακτίνες αντιπροσωπεύουν τις 24 ώρες της ημέρας" },
        { en: "Called 'Tiranga' (Tricolor) in Hindi", el: "Ονομάζεται 'Tiranga' (Τρικολόρ) στα Χίντι" },
        { en: "The Ashoka Chakra is from the Lion Capital of Ashoka", el: "Η Τσάκρα Ασόκα είναι από το Κιονόκρανο Λέοντα του Ασόκα" }
      ]
    },
    {
      id: "CN", code: "cn", name: { en: "China", el: "Κίνα" }, continent: "Asia",
      aspectRatio: "2:3", adoptionDate: "1949-09-27", designPattern: "Red field with stars",
      designCategories: [
        { id: 82, broader: "Symbols", specific: "Stars", description: { en: "4 unequal five-pointed stars", el: "4 άνισα πεντάκτινα αστέρια" } }
      ],
      colors: [
        { name: { en: "Red", el: "Κόκκινο" }, hex: "#DE2910", percentage: 90, symbolism: { en: "Revolution", el: "Επανάσταση" } },
        { name: { en: "Yellow", el: "Κίτρινο" }, hex: "#FFDE00", percentage: 10, symbolism: { en: "Golden future", el: "Χρυσό μέλλον" } }
      ],
      geometry: { stripes: null, stars: { count: 5, points: 5 }, canton: null },
      symbols: { text: null },
      symbolism: { en: "Large star = Communist Party, 4 small = social classes", el: "Μεγάλο αστέρι = Κομμουνιστικό Κόμμα, 4 μικρά = κοινωνικές τάξεις" },
      funFacts: [
        { en: "Called 'Wǔxīng Hóngqí' (Five-starred Red Flag)", el: "Ονομάζεται 'Wǔxīng Hóngqí' (Κόκκινη Σημαία με Πέντε Αστέρια)" },
        { en: "Designed by Zeng Liansong, an economist", el: "Σχεδιάστηκε από τον Zeng Liansong, έναν οικονομολόγο" },
        { en: "Selected from nearly 3,000 entries in a national contest", el: "Επιλέχθηκε από σχεδόν 3.000 συμμετοχές σε εθνικό διαγωνισμό" }
      ]
    },
    {
      id: "KR", code: "kr", name: { en: "South Korea", el: "Νότια Κορέα" }, continent: "Asia",
      aspectRatio: "2:3", adoptionDate: "1949-10-15", designPattern: "Taegeuk with trigrams",
      designCategories: [
        { id: 31, broader: "Geometric", specific: "Circles", description: { en: "One circle in center", el: "Ένας κύκλος στο κέντρο" } },
        { id: 111, broader: "Symbols", specific: "Other", description: { en: "Taegeuk and four black trigrams", el: "Taegeuk και τέσσερα μαύρα τρίγραμμα" } }
      ],
      colors: [
        { name: { en: "White", el: "Λευκό" }, hex: "#FFFFFF", percentage: 70, symbolism: { en: "Peace and purity", el: "Ειρήνη και αγνότητα" } },
        { name: { en: "Red", el: "Κόκκινο" }, hex: "#C60C30", percentage: 10, symbolism: { en: "Positive cosmic forces", el: "Θετικές κοσμικές δυνάμεις" } },
        { name: { en: "Blue", el: "Μπλε" }, hex: "#003478", percentage: 10, symbolism: { en: "Negative cosmic forces", el: "Αρνητικές κοσμικές δυνάμεις" } },
        { name: { en: "Black", el: "Μαύρο" }, hex: "#000000", percentage: 10, symbolism: { en: "Vigilance", el: "Επαγρύπνηση" } }
      ],
      geometry: { stripes: null, stars: null, canton: null },
      symbols: { text: null },
      symbolism: { en: "Taegeuk represents balance, trigrams represent elements", el: "Το Taegeuk αντιπροσωπεύει ισορροπία, τα τρίγραμμα τα στοιχεία" },
      funFacts: [
        { en: "Called 'Taegeukgi' (태극기) in Korean", el: "Ονομάζεται 'Taegeukgi' (태극기) στα κορεατικά" },
        { en: "The four trigrams represent heaven, earth, water, and fire", el: "Τα τέσσερα τρίγραμμα αντιπροσωπεύουν ουρανό, γη, νερό και φωτιά" },
        { en: "White symbolizes 'baedal minjok' (white-clothed people)", el: "Το λευκό συμβολίζει τον 'baedal minjok' (ντυμένοι στα λευκά)" }
      ]
    },

    // NORTH AMERICA
    {
      id: "US", code: "us", name: { en: "United States", el: "ΗΠΑ" }, continent: "North America",
      aspectRatio: "10:19", adoptionDate: "1960-07-04", designPattern: "Striped with canton",
      designCategories: [
        { id: 93, broader: "Geometric, Symbols", specific: "Stars, Stripes", description: { en: "Stars and alternating stripes", el: "Αστέρια και εναλλασσόμενες λωρίδες" } },
        { id: 65, broader: "Symbols", specific: "Stars", description: { en: "50 equal five-pointed stars", el: "50 ίσα πεντάκτινα αστέρια" } },
        { id: 117, broader: "Structure", specific: "Structure", description: { en: "Canton — upper left quarter", el: "Canton — επάνω αριστερό τέταρτο" } }
      ],
      colors: [
        { name: { en: "Red", el: "Κόκκινο" }, hex: "#B22234", percentage: 41, symbolism: { en: "Valor", el: "Ανδρεία" } },
        { name: { en: "White", el: "Λευκό" }, hex: "#FFFFFF", percentage: 41, symbolism: { en: "Purity", el: "Αγνότητα" } },
        { name: { en: "Blue", el: "Μπλε" }, hex: "#3C3B6E", percentage: 18, symbolism: { en: "Justice", el: "Δικαιοσύνη" } }
      ],
      geometry: { stripes: { count: 13, orientation: "horizontal" }, stars: { count: 50, points: 5 }, canton: { present: true } },
      symbols: { text: null },
      symbolism: { en: "50 stars for states, 13 stripes for original colonies", el: "50 αστέρια για πολιτείες, 13 λωρίδες για αρχικές αποικίες" },
      funFacts: [
        { en: "Current design by 17-year-old Robert G. Heft as school project", el: "Σχεδιάστηκε από τον 17χρονο Robert G. Heft ως σχολική εργασία" },
        { en: "Called 'Stars and Stripes' or 'Old Glory'", el: "Ονομάζεται 'Stars and Stripes' ή 'Old Glory'" },
        { en: "Has been modified 27 times since 1777", el: "Έχει τροποποιηθεί 27 φορές από το 1777" }
      ]
    },
    {
      id: "CA", code: "ca", name: { en: "Canada", el: "Καναδάς" }, continent: "North America",
      aspectRatio: "1:2", adoptionDate: "1965-02-15", designPattern: "Vertical triband with leaf",
      designCategories: [
        { id: 29, broader: "Geometric", specific: "Stripes", description: { en: "Three vertical bi-color stripes — unequal", el: "Τρεις άνισες κάθετες δίχρωμες λωρίδες" } },
        { id: 35, broader: "Symbols", specific: "Other", description: { en: "Mobile charge — National emblem / seal", el: "Κινητό σύμβολο — Εθνικό έμβλημα" } },
        { id: 52, broader: "Symbols", specific: "Plants", description: { en: "Maple leaf", el: "Φύλλο σφενδάμου" } }
      ],
      colors: [
        { name: { en: "Red", el: "Κόκκινο" }, hex: "#FF0000", percentage: 50, symbolism: { en: "Sacrifice", el: "Θυσία" } },
        { name: { en: "White", el: "Λευκό" }, hex: "#FFFFFF", percentage: 50, symbolism: { en: "Peace", el: "Ειρήνη" } }
      ],
      geometry: { stripes: { count: 3, orientation: "vertical" }, stars: null, canton: null },
      symbols: { text: null },
      symbolism: { en: "Maple leaf - national symbol of Canada", el: "Φύλλο σφενδάμου - εθνικό σύμβολο του Καναδά" },
      funFacts: [
        { en: "Maple leaf has exactly 11 points", el: "Το φύλλο σφενδάμου έχει ακριβώς 11 ακτίνες" },
        { en: "Called 'The Maple Leaf' or 'l'Unifolié'", el: "Ονομάζεται 'The Maple Leaf' ή 'l'Unifolié'" },
        { en: "February 15 is celebrated as National Flag of Canada Day", el: "Η 15η Φεβρουαρίου γιορτάζεται ως Ημέρα Εθνικής Σημαίας Καναδά" }
      ]
    },
    {
      id: "MX", code: "mx", name: { en: "Mexico", el: "Μεξικό" }, continent: "North America",
      aspectRatio: "4:7", adoptionDate: "1968-09-16", designPattern: "Vertical tricolor with emblem",
      designCategories: [
        { id: 30, broader: "Geometric", specific: "Stripes", description: { en: "Three vertical tri-color stripes — equal", el: "Τρεις ίσες κάθετες τρίχρωμες λωρίδες" } },
        { id: 35, broader: "Symbols", specific: "Other", description: { en: "Mobile charge — National emblem / seal", el: "Κινητό σύμβολο — Εθνικό έμβλημα" } },
        { id: 48, broader: "Symbols", specific: "Animals", description: { en: "Eagles and hawks", el: "Αετοί και γεράκια" } }
      ],
      colors: [
        { name: { en: "Green", el: "Πράσινο" }, hex: "#006847", percentage: 33.33, symbolism: { en: "Hope", el: "Ελπίδα" } },
        { name: { en: "White", el: "Λευκό" }, hex: "#FFFFFF", percentage: 33.33, symbolism: { en: "Unity", el: "Ενότητα" } },
        { name: { en: "Red", el: "Κόκκινο" }, hex: "#CE1126", percentage: 33.34, symbolism: { en: "Blood of heroes", el: "Αίμα ηρώων" } }
      ],
      geometry: { stripes: { count: 3, orientation: "vertical" }, stars: null, canton: null },
      symbols: { text: null },
      symbolism: { en: "Eagle eating a snake on cactus - Aztec legend", el: "Αετός τρώει φίδι σε κάκτο - Αζτέκικος μύθος" },
      funFacts: [
        { en: "Coat of arms based on Aztec legend of founding Tenochtitlan", el: "Το εθνόσημο βασίζεται σε αζτέκικο μύθο ίδρυσης της Τενοτσιτλάν" },
        { en: "Eagle represents the Aztec god Huitzilopochtli", el: "Ο αετός αντιπροσωπεύει τον αζτέκικο θεό Huitzilopochtli" },
        { en: "September 16 is Flag Day (Día de la Bandera)", el: "Η 16η Σεπτεμβρίου είναι Ημέρα της Σημαίας" }
      ]
    },

    // SOUTH AMERICA
    {
      id: "BR", code: "br", name: { en: "Brazil", el: "Βραζιλία" }, continent: "South America",
      aspectRatio: "7:10", adoptionDate: "1992-05-11", designPattern: "Charged (rhombus)",
      designCategories: [
        { id: 31, broader: "Geometric", specific: "Circles", description: { en: "One circle in center (celestial globe)", el: "Ένας κύκλος στο κέντρο (ουράνια σφαίρα)" } },
        { id: 113, broader: "Text", specific: "Text", description: { en: "Motto", el: "Σύνθημα" } },
        { id: 95, broader: "Symbols", specific: "Stars", description: { en: "Stars in southern cross pattern", el: "Αστέρια σε μοτίβο νότιου σταυρού" } }
      ],
      colors: [
        { name: { en: "Green", el: "Πράσινο" }, hex: "#009739", percentage: 55, symbolism: { en: "Forests", el: "Δάση" } },
        { name: { en: "Yellow", el: "Κίτρινο" }, hex: "#FEDD00", percentage: 28, symbolism: { en: "Gold", el: "Χρυσός" } },
        { name: { en: "Blue", el: "Μπλε" }, hex: "#002776", percentage: 12, symbolism: { en: "Sky", el: "Ουρανός" } },
        { name: { en: "White", el: "Λευκό" }, hex: "#FFFFFF", percentage: 5, symbolism: { en: "Peace", el: "Ειρήνη" } }
      ],
      geometry: { stripes: null, stars: { count: 27, points: 5 }, canton: null },
      symbols: { text: { content: "ORDEM E PROGRESSO", meaning: { en: "Order and Progress", el: "Τάξη και Πρόοδος" } } },
      symbolism: { en: "Stars show sky at moment of Republic's proclamation", el: "Τα αστέρια δείχνουν τον ουρανό κατά την ανακήρυξη της Δημοκρατίας" },
      funFacts: [
        { en: "One of few national flags with a motto inscribed", el: "Μία από τις λίγες σημαίες με εγγεγραμμένο σύνθημα" },
        { en: "27 stars represent 26 states plus Federal District", el: "27 αστέρια αντιπροσωπεύουν 26 πολιτείες και την Ομοσπονδιακή Περιφέρεια" },
        { en: "The celestial globe shows the sky over Rio on Nov 15, 1889", el: "Η ουράνια σφαίρα δείχνει τον ουρανό πάνω από το Ρίο στις 15 Νοε 1889" }
      ]
    },
    {
      id: "AR", code: "ar", name: { en: "Argentina", el: "Αργεντινή" }, continent: "South America",
      aspectRatio: "5:8", adoptionDate: "1818-07-20", designPattern: "Horizontal triband with sun",
      designCategories: [
        { id: 10, broader: "Geometric", specific: "Stripes", description: { en: "Three horizontal bi-color stripes — equal", el: "Τρεις ίσες οριζόντιες δίχρωμες λωρίδες" } },
        { id: 54, broader: "Symbols", specific: "Sun", description: { en: "Sun (Sun of May)", el: "Ήλιος (Ήλιος του Μαΐου)" } }
      ],
      colors: [
        { name: { en: "Light Blue", el: "Γαλάζιο" }, hex: "#74ACDF", percentage: 67, symbolism: { en: "Sky", el: "Ουρανός" } },
        { name: { en: "White", el: "Λευκό" }, hex: "#FFFFFF", percentage: 28, symbolism: { en: "Silver", el: "Ασήμι" } },
        { name: { en: "Yellow", el: "Κίτρινο" }, hex: "#F6B40E", percentage: 5, symbolism: { en: "Sun", el: "Ήλιος" } }
      ],
      geometry: { stripes: { count: 3, orientation: "horizontal" }, stars: null, canton: null },
      symbols: { text: null },
      symbolism: { en: "Sun of May commemorates independence", el: "Ο Ήλιος του Μαΐου τιμά την ανεξαρτησία" },
      funFacts: [
        { en: "Sun of May has a human face (Inti, Incan sun god)", el: "Ο Ήλιος του Μαΐου έχει ανθρώπινο πρόσωπο (Inti, θεός ήλιου Ίνκα)" },
        { en: "Created by Manuel Belgrano in 1812", el: "Δημιουργήθηκε από τον Manuel Belgrano το 1812" },
        { en: "The sun has 32 rays (16 straight, 16 wavy)", el: "Ο ήλιος έχει 32 ακτίνες (16 ευθείες, 16 κυματιστές)" }
      ]
    },

    // AFRICA
    {
      id: "ZA", code: "za", name: { en: "South Africa", el: "Νότια Αφρική" }, continent: "Africa",
      aspectRatio: "2:3", adoptionDate: "1994-04-27", designPattern: "Y-shaped pall",
      designCategories: [
        { id: 119, broader: "Structure", specific: "Triangle", description: { en: "Triangle(s) on hoist — pall", el: "Τρίγωνο(α) στο κοντάρι — pall" } }
      ],
      colors: [
        { name: { en: "Red", el: "Κόκκινο" }, hex: "#DE3831", percentage: 18, symbolism: { en: "Blood", el: "Αίμα" } },
        { name: { en: "Blue", el: "Μπλε" }, hex: "#002395", percentage: 18, symbolism: { en: "Sky", el: "Ουρανός" } },
        { name: { en: "Green", el: "Πράσινο" }, hex: "#007A4D", percentage: 28, symbolism: { en: "Land", el: "Γη" } },
        { name: { en: "Yellow", el: "Κίτρινο" }, hex: "#FFB612", percentage: 8, symbolism: { en: "Gold", el: "Χρυσός" } },
        { name: { en: "Black", el: "Μαύρο" }, hex: "#000000", percentage: 10, symbolism: { en: "People", el: "Λαός" } },
        { name: { en: "White", el: "Λευκό" }, hex: "#FFFFFF", percentage: 18, symbolism: { en: "Peace", el: "Ειρήνη" } }
      ],
      geometry: { stripes: null, stars: null, canton: null },
      symbols: { text: null },
      symbolism: { en: "Y-shape symbolizes convergence and unity", el: "Το σχήμα Υ συμβολίζει σύγκλιση και ενότητα" },
      funFacts: [
        { en: "One of only two 6-color national flags (with South Sudan)", el: "Μία από τις δύο μόνο εθνικές σημαίες με 6 χρώματα" },
        { en: "Designed by Frederick Brownell in just one week", el: "Σχεδιάστηκε από τον Frederick Brownell σε μόλις μία εβδομάδα" },
        { en: "Adopted on first post-apartheid election day", el: "Υιοθετήθηκε την πρώτη ημέρα εκλογών μετά το απαρτχάιντ" }
      ]
    },
    {
      id: "EG", code: "eg", name: { en: "Egypt", el: "Αίγυπτος" }, continent: "Africa",
      aspectRatio: "2:3", adoptionDate: "1984-10-04", designPattern: "Horizontal triband with emblem",
      designCategories: [
        { id: 18, broader: "Geometric", specific: "Stripes", description: { en: "Three horizontal tri-color stripes — equal", el: "Τρεις ίσες οριζόντιες τρίχρωμες λωρίδες" } },
        { id: 48, broader: "Symbols", specific: "Animals", description: { en: "Eagles and hawks (Eagle of Saladin)", el: "Αετοί και γεράκια (Αετός του Σαλαντίν)" } }
      ],
      colors: [
        { name: { en: "Red", el: "Κόκκινο" }, hex: "#CE1126", percentage: 33.33, symbolism: { en: "Revolution", el: "Επανάσταση" } },
        { name: { en: "White", el: "Λευκό" }, hex: "#FFFFFF", percentage: 33.33, symbolism: { en: "Bright future", el: "Φωτεινό μέλλον" } },
        { name: { en: "Black", el: "Μαύρο" }, hex: "#000000", percentage: 33.34, symbolism: { en: "Dark past", el: "Σκοτεινό παρελθόν" } }
      ],
      geometry: { stripes: { count: 3, orientation: "horizontal" }, stars: null, canton: null },
      symbols: { text: null },
      symbolism: { en: "Pan-Arab colors with Eagle of Saladin emblem", el: "Παναραβικά χρώματα με έμβλημα Αετός του Σαλαντίν" },
      funFacts: [
        { en: "Eagle of Saladin dates back to 12th century", el: "Ο Αετός του Σαλαντίν χρονολογείται από τον 12ο αιώνα" },
        { en: "Part of the Pan-Arab flag family", el: "Μέρος της οικογένειας παναραβικών σημαιών" },
        { en: "The eagle holds a scroll with Egypt's official name", el: "Ο αετός κρατά πάπυρο με το επίσημο όνομα της Αιγύπτου" }
      ]
    },
    {
      id: "NG", code: "ng", name: { en: "Nigeria", el: "Νιγηρία" }, continent: "Africa",
      aspectRatio: "1:2", adoptionDate: "1960-10-01", designPattern: "Vertical triband",
      designCategories: [
        { id: 28, broader: "Geometric", specific: "Stripes", description: { en: "Three vertical bi-color stripes — equal", el: "Τρεις ίσες κάθετες δίχρωμες λωρίδες" } }
      ],
      colors: [
        { name: { en: "Green", el: "Πράσινο" }, hex: "#008751", percentage: 67, symbolism: { en: "Agriculture", el: "Γεωργία" } },
        { name: { en: "White", el: "Λευκό" }, hex: "#FFFFFF", percentage: 33, symbolism: { en: "Peace", el: "Ειρήνη" } }
      ],
      geometry: { stripes: { count: 3, orientation: "vertical" }, stars: null, canton: null },
      symbols: { text: null },
      symbolism: { en: "Green for agriculture, white for peace and unity", el: "Πράσινο για γεωργία, λευκό για ειρήνη και ενότητα" },
      funFacts: [
        { en: "Designed by Michael Taiwo Akinkunmi, a student", el: "Σχεδιάστηκε από τον φοιτητή Michael Taiwo Akinkunmi" },
        { en: "Originally had a red sun which was later removed", el: "Αρχικά είχε κόκκινο ήλιο που αργότερα αφαιρέθηκε" },
        { en: "The simplest design among African flags", el: "Ο πιο απλός σχεδιασμός μεταξύ των αφρικανικών σημαιών" }
      ]
    },

    // OCEANIA
    {
      id: "AU", code: "au", name: { en: "Australia", el: "Αυστραλία" }, continent: "Oceania",
      aspectRatio: "1:2", adoptionDate: "1954-04-14", designPattern: "Blue Ensign with stars",
      designCategories: [
        { id: 44, broader: "Symbols", specific: "Union Jack", description: { en: "The Union Jack in the canton", el: "Το Union Jack στο canton" } },
        { id: 95, broader: "Symbols", specific: "Stars", description: { en: "Stars in southern cross pattern", el: "Αστέρια σε μοτίβο νότιου σταυρού" } },
        { id: 87, broader: "Symbols", specific: "Stars", description: { en: "One seven-pointed star (Commonwealth Star)", el: "Ένα επτάκτινο αστέρι (Αστέρι της Κοινοπολιτείας)" } }
      ],
      colors: [
        { name: { en: "Blue", el: "Μπλε" }, hex: "#00008B", percentage: 70, symbolism: { en: "Seas", el: "Θάλασσες" } },
        { name: { en: "White", el: "Λευκό" }, hex: "#FFFFFF", percentage: 18, symbolism: { en: "Purity", el: "Αγνότητα" } },
        { name: { en: "Red", el: "Κόκκινο" }, hex: "#FF0000", percentage: 12, symbolism: { en: "British heritage", el: "Βρετανική κληρονομιά" } }
      ],
      geometry: { stripes: null, stars: { count: 6, points: 7 }, canton: { present: true } },
      symbols: { text: null },
      symbolism: { en: "Southern Cross constellation + Commonwealth Star", el: "Αστερισμός Νότιος Σταυρός + Αστέρι Κοινοπολιτείας" },
      funFacts: [
        { en: "Chosen from 32,823 designs in a national competition", el: "Επιλέχθηκε από 32.823 σχέδια σε εθνικό διαγωνισμό" },
        { en: "Commonwealth Star has 7 points (6 states + territories)", el: "Το Αστέρι Κοινοπολιτείας έχει 7 ακτίνες (6 πολιτείες + εδάφη)" },
        { en: "September 3 is Australian National Flag Day", el: "Η 3η Σεπτεμβρίου είναι Ημέρα Εθνικής Σημαίας Αυστραλίας" }
      ]
    },
    {
      id: "NZ", code: "nz", name: { en: "New Zealand", el: "Νέα Ζηλανδία" }, continent: "Oceania",
      aspectRatio: "1:2", adoptionDate: "1902-06-12", designPattern: "Blue Ensign with Southern Cross",
      designCategories: [
        { id: 44, broader: "Symbols", specific: "Union Jack", description: { en: "The Union Jack in the canton", el: "Το Union Jack στο canton" } },
        { id: 95, broader: "Symbols", specific: "Stars", description: { en: "Stars in southern cross pattern", el: "Αστέρια σε μοτίβο νότιου σταυρού" } }
      ],
      colors: [
        { name: { en: "Blue", el: "Μπλε" }, hex: "#00247D", percentage: 70, symbolism: { en: "Pacific Ocean", el: "Ειρηνικός Ωκεανός" } },
        { name: { en: "Red", el: "Κόκκινο" }, hex: "#CC142B", percentage: 20, symbolism: { en: "Sacrifice", el: "Θυσία" } },
        { name: { en: "White", el: "Λευκό" }, hex: "#FFFFFF", percentage: 10, symbolism: { en: "Purity", el: "Αγνότητα" } }
      ],
      geometry: { stripes: null, stars: { count: 4, points: 5 }, canton: { present: true } },
      symbols: { text: null },
      symbolism: { en: "Four red stars of the Southern Cross constellation", el: "Τέσσερα κόκκινα αστέρια του αστερισμού Νότιος Σταυρός" },
      funFacts: [
        { en: "Stars are red with white borders, unlike Australia's white stars", el: "Τα αστέρια είναι κόκκινα με λευκό περίγραμμα, σε αντίθεση με τα λευκά της Αυστραλίας" },
        { en: "A 2016 referendum kept the current flag design", el: "Ένα δημοψήφισμα το 2016 διατήρησε τον τρέχοντα σχεδιασμό" },
        { en: "Called 'Te Kara' in Māori", el: "Ονομάζεται 'Te Kara' στα Μαορί" }
      ]
    }
  ]
};

// Get unique continents from flags
const continents = [...new Set(flagDatabase.flags.map(f => f.continent))].sort();

// Flag component using flag-icons library
const FlagImage = ({ code, width = 120 }) => {
  const height = Math.round(width * 0.75);
  return (
    <span
      className={`fi fi-${code}`}
      style={{
        display: 'inline-block',
        width: width,
        height: height,
        borderRadius: 8,
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    />
  );
};

export default function FlagQuizApp() {
  const [screen, setScreen] = useState('menu');
  const [lang, setLang] = useState('el');
  const [diff, setDiff] = useState('easy');
  const [conts, setConts] = useState(['all']);
  const [curQ, setCurQ] = useState(null);
  const [curF, setCurF] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);
  const [total, setTotal] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [sel, setSel] = useState(null);
  const [show, setShow] = useState(false);
  const [time, setTime] = useState(30);
  const [active, setActive] = useState(false);
  const [learnF, setLearnF] = useState(null);
  const [scores, setScores] = useState([]);
  const [confetti, setConfetti] = useState(false);
  // New states for continent selection
  const [selectingContinent, setSelectingContinent] = useState(false);
  const [selectedContinent, setSelectedContinent] = useState(null);
  const [nextAction, setNextAction] = useState(null); // 'quiz' or 'learn'

  const flags = useMemo(() => flagDatabase.flags.filter(f => conts.includes('all') || conts.includes(f.continent)), [conts]);
  const shuffle = arr => { const a = [...arr]; for(let i = a.length-1; i > 0; i--){ const j = Math.floor(Math.random()*(i+1)); [a[i],a[j]] = [a[j],a[i]]; } return a; };
  const numOpts = (c, p) => shuffle([c, ...p.filter(x => x !== c)].slice(0, 4));

  // Get flags by continent
  const getFlagsByContinent = (continent) => {
    if (continent === 'all') return flagDatabase.flags;
    return flagDatabase.flags.filter(f => f.continent === continent);
  };

  const genQ = useCallback((f) => {
    const qs = [];
    if (f.geometry?.stars?.count) qs.push({ q: lang === 'el' ? `Πόσα αστέρια έχει η σημαία ${f.name.el};` : `How many stars on ${f.name.en}'s flag?`, a: f.geometry.stars.count, o: numOpts(f.geometry.stars.count, [1, 5, 6, 7, 13, 27, 50]), d: 'easy' });
    if (f.geometry?.stars?.points) qs.push({ q: lang === 'el' ? `Πόσες ακτίνες ανά αστέρι;` : `Points per star?`, a: f.geometry.stars.points, o: numOpts(f.geometry.stars.points, [4, 5, 6, 7, 8]), d: 'medium' });
    if (f.geometry?.stripes) { qs.push({ q: lang === 'el' ? `Πόσες λωρίδες;` : `How many stripes?`, a: f.geometry.stripes.count, o: numOpts(f.geometry.stripes.count, [3, 5, 7, 9, 11, 13]), d: 'easy' }); qs.push({ q: lang === 'el' ? `Οριζόντιες ή κάθετες;` : `Horizontal or vertical?`, a: lang === 'el' ? (f.geometry.stripes.orientation === 'horizontal' ? 'Οριζόντιες' : 'Κάθετες') : f.geometry.stripes.orientation.charAt(0).toUpperCase() + f.geometry.stripes.orientation.slice(1), o: lang === 'el' ? ['Οριζόντιες', 'Κάθετες'] : ['Horizontal', 'Vertical'], d: 'easy' }); }
    if (f.colors?.length) { const dom = [...f.colors].sort((a, b) => b.percentage - a.percentage)[0]; qs.push({ q: lang === 'el' ? `Κυρίαρχο χρώμα;` : `Dominant color?`, a: dom.name[lang], o: shuffle(f.colors.map(c => c.name[lang])), d: 'medium' }); qs.push({ q: lang === 'el' ? `Πόσα χρώματα;` : `How many colors?`, a: f.colors.length, o: numOpts(f.colors.length, [2, 3, 4, 5, 6]), d: 'easy' }); }
    if (f.geometry?.canton !== undefined) qs.push({ q: lang === 'el' ? `Έχει canton;` : `Has canton?`, a: lang === 'el' ? (f.geometry.canton?.present ? 'Ναι' : 'Όχι') : (f.geometry.canton?.present ? 'Yes' : 'No'), o: lang === 'el' ? ['Ναι', 'Όχι'] : ['Yes', 'No'], d: 'medium' });
    qs.push({ q: lang === 'el' ? `Αναλογία διαστάσεων;` : `Aspect ratio?`, a: f.aspectRatio, o: shuffle(['1:2', '2:3', '3:5', '7:10', '10:19'].filter(r => r !== f.aspectRatio).slice(0, 3).concat([f.aspectRatio])), d: 'hard' });
    if (f.symbols?.text) qs.push({ q: lang === 'el' ? `Κείμενο στη σημαία;` : `Text on flag?`, a: f.symbols.text.content, o: shuffle([f.symbols.text.content, 'E PLURIBUS UNUM', 'LIBERTY', 'UNITY']), d: 'hard' });
    if (f.geometry?.shapes?.find(s => s.name === 'Ashoka Chakra')) qs.push({ q: lang === 'el' ? `Ακτίνες Τροχού Ashoka;` : `Ashoka Chakra spokes?`, a: 24, o: numOpts(24, [12, 18, 20, 24, 32]), d: 'hard' });
    const filt = qs.filter(x => diff === 'easy' ? x.d === 'easy' : diff === 'medium' ? x.d !== 'hard' : true);
    return filt.length ? filt[Math.floor(Math.random() * filt.length)] : qs[0];
  }, [lang, diff]);

  const next = useCallback(() => {
    const activeFlags = selectedContinent === 'all' ? flagDatabase.flags : getFlagsByContinent(selectedContinent);
    const f = activeFlags[Math.floor(Math.random() * activeFlags.length)];
    setCurF(f);
    setCurQ(genQ(f));
    setSel(null);
    setShow(false);
    setTime(diff === 'easy' ? 30 : diff === 'medium' ? 25 : 20);
    setActive(true);
  }, [genQ, diff, selectedContinent]);

  const startQuiz = useCallback((continent) => {
    setSelectedContinent(continent);
    setSelectingContinent(false);
    setScore(0);
    setStreak(0);
    setTotal(0);
    setCorrect(0);
    // Delayed next to ensure selectedContinent is set
    setTimeout(() => {
      const activeFlags = continent === 'all' ? flagDatabase.flags : getFlagsByContinent(continent);
      const f = activeFlags[Math.floor(Math.random() * activeFlags.length)];
      setCurF(f);
      setCurQ(genQ(f));
      setSel(null);
      setShow(false);
      setTime(diff === 'easy' ? 30 : diff === 'medium' ? 25 : 20);
      setActive(true);
      setScreen('quiz');
    }, 0);
  }, [genQ, diff]);

  const handleStartClick = () => {
    setNextAction('quiz');
    setSelectingContinent(true);
    setScreen('continentSelect');
  };

  const handleLearnClick = () => {
    setNextAction('learn');
    setSelectingContinent(true);
    setScreen('continentSelect');
  };

  const handleContinentSelect = (continent) => {
    setSelectedContinent(continent);
    if (nextAction === 'quiz') {
      startQuiz(continent);
    } else {
      setScreen('learn');
      setLearnF(null);
    }
    setSelectingContinent(false);
  };

  useEffect(() => {
    if (active && time > 0) {
      const t = setTimeout(() => setTime(x => x - 1), 1000);
      return () => clearTimeout(t);
    } else if (time === 0 && active) {
      answer(null);
    }
  }, [time, active]);

  const answer = (a) => {
    setActive(false);
    setSel(a);
    setShow(true);
    setTotal(x => x + 1);
    const ok = a !== null && a === curQ.a;
    if (ok) {
      setScore(s => s + (diff === 'easy' ? 10 : diff === 'medium' ? 20 : 30) + Math.floor(time / 2));
      setStreak(s => s + 1);
      setBest(b => Math.max(b, streak + 1));
      setCorrect(c => c + 1);
      if ((streak + 1) % 5 === 0) {
        setConfetti(true);
        setTimeout(() => setConfetti(false), 2000);
      }
    } else {
      setStreak(0);
    }
  };

  const end = () => {
    setScores(p => [...p, { score, correct, total, date: new Date().toLocaleDateString(), diff }].sort((a, b) => b.score - a.score).slice(0, 10));
    setScreen('results');
  };

  const t = {
    en: { title: 'Flag Master', sub: 'Test your flag knowledge', start: 'Start', learn: 'Learn', board: 'Scores', set: 'Settings', diff: 'Difficulty', easy: 'Easy', med: 'Medium', hard: 'Hard', cont: 'Continents', all: 'All', next: 'Next', finish: 'Finish', score: 'Score', streak: 'Streak', ok: 'Correct!', no: 'Wrong', up: "Time's up!", ans: 'Answer', res: 'Results', acc: 'Accuracy', best: 'Best', again: 'Again', back: 'Back', fact: 'Fun Facts', sym: 'Symbolism', col: 'Colors', date: 'Adopted', ratio: 'Ratio', design: 'Design', selectCont: 'Select Continent', designCat: 'Design Categories', broader: 'Type', specific: 'Specific' },
    el: { title: 'Flag Master', sub: 'Δοκίμασε τις γνώσεις σου', start: 'Έναρξη', learn: 'Μάθηση', board: 'Βαθμοί', set: 'Ρυθμίσεις', diff: 'Δυσκολία', easy: 'Εύκολο', med: 'Μέτριο', hard: 'Δύσκολο', cont: 'Ήπειροι', all: 'Όλες', next: 'Επόμενη', finish: 'Τέλος', score: 'Βαθμοί', streak: 'Σερί', ok: 'Σωστό!', no: 'Λάθος', up: 'Χρόνος!', ans: 'Απάντηση', res: 'Αποτελέσματα', acc: 'Ακρίβεια', best: 'Καλύτερο', again: 'Ξανά', back: 'Πίσω', fact: 'Fun Facts', sym: 'Συμβολισμός', col: 'Χρώματα', date: 'Υιοθέτηση', ratio: 'Αναλογία', design: 'Σχεδιασμός', selectCont: 'Επιλογή Ηπείρου', designCat: 'Κατηγορίες Σχεδιασμού', broader: 'Τύπος', specific: 'Ειδικός' }
  }[lang];

  // Continent translations
  const contNames = {
    en: { 'Africa': 'Africa', 'Asia': 'Asia', 'Europe': 'Europe', 'North America': 'North America', 'South America': 'South America', 'Oceania': 'Oceania', 'all': 'All Continents' },
    el: { 'Africa': 'Αφρική', 'Asia': 'Ασία', 'Europe': 'Ευρώπη', 'North America': 'Βόρεια Αμερική', 'South America': 'Νότια Αμερική', 'Oceania': 'Ωκεανία', 'all': 'Όλες οι Ήπειροι' }
  };

  // Continent emojis
  const contEmojis = {
    'Africa': '🌍', 'Asia': '🌏', 'Europe': '🇪🇺', 'North America': '🌎', 'South America': '🌎', 'Oceania': '🌏', 'all': '🌐'
  };

  const sty = {
    app: { minHeight: '100vh', background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)', fontFamily: 'system-ui', color: '#fff', padding: 20 },
    btn: { padding: '12px 24px', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: 'pointer' },
    btnP: { background: 'linear-gradient(135deg, #667eea, #764ba2)', color: '#fff' },
    btnS: { background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' },
    card: { background: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: 20 }
  };

  // Get flags for learn screen based on selected continent
  const learnFlags = selectedContinent === 'all' ? flagDatabase.flags : getFlagsByContinent(selectedContinent);

  return (
    <div style={sty.app}>
      <style>{`
        @keyframes confettiFall{to{transform:translateY(100vh) rotate(720deg);opacity:0}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.6}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes pop{0%{transform:scale(1)}50%{transform:scale(1.05)}100%{transform:scale(1)}}
        @keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}
      `}</style>

      {confetti && (
        <div style={{position:'fixed',top:0,left:0,width:'100%',height:'100%',pointerEvents:'none',zIndex:1000}}>
          {[...Array(50)].map((_,i) => (
            <div
              key={i}
              style={{
                position:'absolute',
                width:10,
                height:10,
                top:-10,
                left:`${Math.random()*100}%`,
                background:['#FF6B6B','#4ECDC4','#45B7D1','#96CEB4','#FFEAA7'][i%5],
                animation:`confettiFall 3s ease-out forwards`,
                animationDelay:`${Math.random()*0.5}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Menu Screen */}
      {screen === 'menu' && (
        <div style={{maxWidth:420,margin:'0 auto',textAlign:'center',paddingTop:50}}>
          <div style={{fontSize:64,animation:'float 3s ease-in-out infinite'}}>🌍</div>
          <h1 style={{fontSize:48,background:'linear-gradient(135deg,#667eea,#764ba2,#f093fb)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',marginBottom:8}}>{t.title}</h1>
          <p style={{color:'rgba(255,255,255,0.7)',marginBottom:30}}>{t.sub}</p>
          <div style={{display:'flex',gap:8,justifyContent:'center',marginBottom:30}}>
            {['en','el'].map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{...sty.btn, background: lang === l ? 'linear-gradient(135deg,#667eea,#764ba2)' : 'rgba(255,255,255,0.1)'}}
              >
                {l === 'en' ? 'EN' : 'ΕΛ'}
              </button>
            ))}
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            <button onClick={handleStartClick} style={{...sty.btn,...sty.btnP,fontSize:18}}>🎯 {t.start}</button>
            <button onClick={handleLearnClick} style={{...sty.btn,...sty.btnS}}>📚 {t.learn}</button>
            <button onClick={() => setScreen('board')} style={{...sty.btn,...sty.btnS}}>🏆 {t.board}</button>
            <button onClick={() => setScreen('set')} style={{...sty.btn,...sty.btnS}}>⚙️ {t.set}</button>
          </div>
          <div style={{display:'flex',gap:12,justifyContent:'center',marginTop:40,flexWrap:'wrap'}}>
            {flagDatabase.flags.slice(0,5).map(f => <FlagImage key={f.id} code={f.code} width={70} />)}
          </div>
        </div>
      )}

      {/* Continent Selection Screen */}
      {screen === 'continentSelect' && (
        <div style={{maxWidth:600,margin:'0 auto',paddingTop:30}}>
          <button onClick={() => setScreen('menu')} style={{...sty.btn,...sty.btnS,marginBottom:20}}>← {t.back}</button>
          <h2 style={{textAlign:'center',marginBottom:30}}>🌍 {t.selectCont}</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))',gap:16}}>
            {/* All option first */}
            <div
              onClick={() => handleContinentSelect('all')}
              style={{
                ...sty.card,
                textAlign:'center',
                cursor:'pointer',
                padding:24,
                background: 'linear-gradient(135deg,rgba(102,126,234,0.3),rgba(118,75,162,0.3))',
                border: '2px solid rgba(102,126,234,0.5)',
                transition: 'transform 0.2s'
              }}
            >
              <div style={{fontSize:48,marginBottom:12}}>{contEmojis['all']}</div>
              <div style={{fontSize:16,fontWeight:600}}>{contNames[lang]['all']}</div>
              <div style={{fontSize:13,color:'rgba(255,255,255,0.6)',marginTop:8}}>{flagDatabase.flags.length} {lang === 'el' ? 'σημαίες' : 'flags'}</div>
            </div>
            {/* Individual continents */}
            {continents.map(cont => {
              const flagCount = getFlagsByContinent(cont).length;
              return (
                <div
                  key={cont}
                  onClick={() => handleContinentSelect(cont)}
                  style={{
                    ...sty.card,
                    textAlign:'center',
                    cursor:'pointer',
                    padding:24,
                    transition: 'transform 0.2s'
                  }}
                >
                  <div style={{fontSize:48,marginBottom:12}}>{contEmojis[cont]}</div>
                  <div style={{fontSize:16,fontWeight:600}}>{contNames[lang][cont]}</div>
                  <div style={{fontSize:13,color:'rgba(255,255,255,0.6)',marginTop:8}}>{flagCount} {lang === 'el' ? 'σημαίες' : 'flags'}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Settings Screen */}
      {screen === 'set' && (
        <div style={{maxWidth:500,margin:'0 auto'}}>
          <button onClick={() => setScreen('menu')} style={{...sty.btn,...sty.btnS,marginBottom:20}}>← {t.back}</button>
          <h2 style={{textAlign:'center',marginBottom:30}}>⚙️ {t.set}</h2>
          <div style={{...sty.card,marginBottom:20}}>
            <h3 style={{marginBottom:15}}>{t.diff}</h3>
            <div style={{display:'flex',gap:10}}>
              {[['easy','#4CAF50'],['medium','#FF9800'],['hard','#F44336']].map(([d,col]) => (
                <button
                  key={d}
                  onClick={() => setDiff(d)}
                  style={{
                    flex:1,
                    padding:16,
                    border:`2px solid ${diff === d ? col : 'rgba(255,255,255,0.2)'}`,
                    borderRadius:12,
                    background: diff === d ? `${col}33` : 'rgba(255,255,255,0.05)',
                    color:'#fff',
                    cursor:'pointer'
                  }}
                >
                  {t[d === 'medium' ? 'med' : d]}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quiz Screen */}
      {screen === 'quiz' && curF && curQ && (
        <div style={{maxWidth:540,margin:'0 auto'}}>
          <div style={{display:'flex',justifyContent:'space-around',marginBottom:20}}>
            {[[t.score,score],[t.streak,`${streak > 0 ? '🔥' : ''}${streak}`],['Q',total+1]].map(([l,v],i) => (
              <div key={i} style={{textAlign:'center'}}>
                <div style={{fontSize:11,color:'rgba(255,255,255,0.6)',textTransform:'uppercase'}}>{l}</div>
                <div style={{fontSize:26,fontWeight:700,color: i === 1 && streak > 0 ? '#FF6B6B' : '#fff'}}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{height:8,background:'rgba(255,255,255,0.1)',borderRadius:4,marginBottom:30,position:'relative'}}>
            <div style={{
              height:'100%',
              width:`${(time/(diff === 'easy' ? 30 : diff === 'medium' ? 25 : 20))*100}%`,
              background: time <= 5 ? 'linear-gradient(90deg,#F44336,#FF5722)' : 'linear-gradient(90deg,#4CAF50,#8BC34A)',
              borderRadius:4,
              transition:'width 1s linear',
              animation: time <= 5 ? 'pulse .5s infinite' : 'none'
            }}/>
            <span style={{position:'absolute',right:0,top:-24,fontSize:14}}>{time}s</span>
          </div>
          <div style={{textAlign:'center',marginBottom:25,display:'flex',flexDirection:'column',alignItems:'center'}}>
            <FlagImage code={curF.code} width={300} />
            <div style={{marginTop:12,fontSize:22,fontWeight:600}}>{curF.name[lang]}</div>
          </div>
          <p style={{textAlign:'center',fontSize:18,marginBottom:24}}>{curQ.q}</p>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
            {curQ.o.map((opt,i) => {
              const ok = opt === curQ.a;
              const isSel = sel === opt;
              let bg = 'rgba(255,255,255,0.05)';
              let bord = 'rgba(255,255,255,0.2)';
              let anim = '';
              if (show) {
                if (ok) {
                  bg = 'rgba(76,175,80,0.4)';
                  bord = '#4CAF50';
                  anim = 'pop .4s';
                } else if (isSel) {
                  bg = 'rgba(244,67,54,0.4)';
                  bord = '#F44336';
                  anim = 'shake .4s';
                }
              }
              return (
                <button
                  key={i}
                  onClick={() => !show && answer(opt)}
                  disabled={show}
                  style={{
                    padding:16,
                    border:`2px solid ${bord}`,
                    borderRadius:12,
                    background:bg,
                    color:'#fff',
                    fontSize:15,
                    cursor: show ? 'default' : 'pointer',
                    animation:anim
                  }}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          {show && (
            <div style={{
              marginTop:24,
              padding:20,
              borderRadius:12,
              textAlign:'center',
              background: sel && sel === curQ.a ? 'rgba(76,175,80,0.2)' : 'rgba(244,67,54,0.2)',
              border:`1px solid ${sel && sel === curQ.a ? 'rgba(76,175,80,0.5)' : 'rgba(244,67,54,0.5)'}`
            }}>
              <p style={{fontSize:20,marginBottom:8}}>
                {sel === null ? `⏰ ${t.up}` : sel === curQ.a ? `✨ ${t.ok}` : `❌ ${t.no}`}
              </p>
              {(sel === null || sel !== curQ.a) && <p>{t.ans}: <strong>{curQ.a}</strong></p>}
            </div>
          )}
          {show && (
            <div style={{display:'flex',gap:12,justifyContent:'center',marginTop:24}}>
              <button onClick={next} style={{...sty.btn,...sty.btnP}}>{t.next}</button>
              <button onClick={end} style={{...sty.btn,...sty.btnS}}>{t.finish}</button>
            </div>
          )}
        </div>
      )}

      {/* Results Screen */}
      {screen === 'results' && (
        <div style={{maxWidth:420,margin:'0 auto',textAlign:'center',paddingTop:40}}>
          <h2 style={{marginBottom:30}}>🎉 {t.res}</h2>
          <div style={{...sty.card,padding:40,marginBottom:30}}>
            <div style={{fontSize:72,fontWeight:700,background:'linear-gradient(135deg,#667eea,#764ba2,#f093fb)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>{score}</div>
            <div style={{fontSize:18,color:'rgba(255,255,255,0.6)',marginBottom:30}}>{t.score}</div>
            <div style={{display:'flex',justifyContent:'space-around'}}>
              {[[`${correct}/${total}`,t.ok],[`${total ? Math.round(correct/total*100) : 0}%`,t.acc],[`🔥${best}`,t.best]].map(([v,l],i) => (
                <div key={i}>
                  <div style={{fontSize:28,fontWeight:700}}>{v}</div>
                  <div style={{fontSize:13,color:'rgba(255,255,255,0.6)'}}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{display:'flex',gap:12,justifyContent:'center'}}>
            <button onClick={handleStartClick} style={{...sty.btn,...sty.btnP}}>{t.again}</button>
            <button onClick={() => setScreen('menu')} style={{...sty.btn,...sty.btnS}}>{t.back}</button>
          </div>
        </div>
      )}

      {/* Learn Screen */}
      {screen === 'learn' && (
        <div style={{maxWidth:800,margin:'0 auto'}}>
          <button onClick={() => {setScreen('menu'); setLearnF(null); setSelectedContinent(null);}} style={{...sty.btn,...sty.btnS,marginBottom:20}}>← {t.back}</button>
          <h2 style={{textAlign:'center',marginBottom:10}}>📚 {t.learn}</h2>
          {selectedContinent && (
            <p style={{textAlign:'center',color:'rgba(255,255,255,0.6)',marginBottom:20}}>
              {contEmojis[selectedContinent]} {contNames[lang][selectedContinent]}
            </p>
          )}
          {!learnF ? (
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(150px,1fr))',gap:16}}>
              {learnFlags.map(f => (
                <div
                  key={f.id}
                  onClick={() => setLearnF(f)}
                  style={{...sty.card,textAlign:'center',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',padding:16}}
                >
                  <FlagImage code={f.code} width={120} />
                  <div style={{marginTop:10,fontSize:14}}>{f.name[lang]}</div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <button onClick={() => setLearnF(null)} style={{...sty.btn,...sty.btnS,marginBottom:20,fontSize:14,padding:'8px 16px'}}>← {t.back}</button>
              <div style={{textAlign:'center',marginBottom:30,display:'flex',flexDirection:'column',alignItems:'center'}}>
                <FlagImage code={learnF.code} width={340} />
                <h3 style={{marginTop:16,fontSize:32}}>{learnF.name[lang]}</h3>
                <p style={{color:'rgba(255,255,255,0.6)'}}>{contEmojis[learnF.continent]} {contNames[lang][learnF.continent]}</p>
              </div>
              <div style={{display:'grid',gap:16}}>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
                  <div style={sty.card}>
                    <h4 style={{marginBottom:8,color:'rgba(255,255,255,0.7)',fontSize:14}}>📐 {t.ratio}</h4>
                    <p style={{fontSize:20,fontWeight:600}}>{learnF.aspectRatio}</p>
                  </div>
                  <div style={sty.card}>
                    <h4 style={{marginBottom:8,color:'rgba(255,255,255,0.7)',fontSize:14}}>📅 {t.date}</h4>
                    <p style={{fontSize:20,fontWeight:600}}>{learnF.adoptionDate}</p>
                  </div>
                </div>
                <div style={sty.card}>
                  <h4 style={{marginBottom:8,color:'rgba(255,255,255,0.7)',fontSize:14}}>🎨 {t.design}</h4>
                  <p>{learnF.designPattern}</p>
                </div>

                {/* Design Categories Section */}
                {learnF.designCategories?.length > 0 && (
                  <div style={{...sty.card,background:'linear-gradient(135deg,rgba(45,136,255,0.15),rgba(0,212,255,0.15))',border:'1px solid rgba(45,136,255,0.3)'}}>
                    <h4 style={{marginBottom:12,color:'rgba(255,255,255,0.9)',fontSize:14}}>📊 {t.designCat}</h4>
                    {learnF.designCategories.map((cat,i) => (
                      <div key={i} style={{marginBottom: i < learnF.designCategories.length - 1 ? 12 : 0,padding:12,background:'rgba(0,0,0,0.2)',borderRadius:8}}>
                        <div style={{display:'flex',gap:8,marginBottom:6,flexWrap:'wrap'}}>
                          <span style={{background:'rgba(102,126,234,0.4)',padding:'4px 10px',borderRadius:12,fontSize:12}}>
                            {t.broader}: {cat.broader}
                          </span>
                          <span style={{background:'rgba(118,75,162,0.4)',padding:'4px 10px',borderRadius:12,fontSize:12}}>
                            {t.specific}: {cat.specific}
                          </span>
                        </div>
                        <p style={{fontSize:13,color:'rgba(255,255,255,0.8)',margin:0}}>{cat.description[lang]}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div style={sty.card}>
                  <h4 style={{marginBottom:12,color:'rgba(255,255,255,0.7)',fontSize:14}}>🎨 {t.col}</h4>
                  {learnF.colors.map((c,i) => (
                    <div key={i} style={{display:'flex',alignItems:'center',gap:12,marginBottom:12}}>
                      <div style={{width:40,height:40,borderRadius:8,background:c.hex,border:'2px solid rgba(255,255,255,0.2)',flexShrink:0}}/>
                      <div>
                        <div style={{fontWeight:600}}>{c.name[lang]} ({c.percentage}%)</div>
                        <div style={{fontSize:13,color:'rgba(255,255,255,0.6)'}}>{c.symbolism[lang]}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={sty.card}>
                  <h4 style={{marginBottom:10,color:'rgba(255,255,255,0.7)',fontSize:14}}>📖 {t.sym}</h4>
                  <p style={{lineHeight:1.7}}>{learnF.symbolism[lang]}</p>
                </div>
                {learnF.funFacts?.length > 0 && (
                  <div style={{...sty.card,background:'linear-gradient(135deg,rgba(102,126,234,0.2),rgba(118,75,162,0.2))',border:'1px solid rgba(102,126,234,0.3)'}}>
                    <h4 style={{marginBottom:12,fontSize:14}}>💡 {t.fact}</h4>
                    {learnF.funFacts.map((f,i) => (
                      <p key={i} style={{lineHeight:1.6,marginBottom: i < learnF.funFacts.length - 1 ? 10 : 0}}>• {f[lang]}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Leaderboard Screen */}
      {screen === 'board' && (
        <div style={{maxWidth:500,margin:'0 auto'}}>
          <button onClick={() => setScreen('menu')} style={{...sty.btn,...sty.btnS,marginBottom:20}}>← {t.back}</button>
          <h2 style={{textAlign:'center',marginBottom:30}}>🏆 {t.board}</h2>
          {scores.length === 0 ? (
            <div style={{textAlign:'center',padding:50,color:'rgba(255,255,255,0.5)'}}>
              <div style={{fontSize:48,marginBottom:16}}>🎮</div>
              <p>{lang === 'el' ? 'Παίξε ένα quiz!' : 'Play a quiz!'}</p>
            </div>
          ) : (
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              {scores.map((s,i) => (
                <div
                  key={i}
                  style={{
                    display:'flex',
                    alignItems:'center',
                    gap:16,
                    padding:'16px 20px',
                    background: i < 3 ? `linear-gradient(135deg,${['rgba(255,215,0,0.15)','rgba(192,192,192,0.15)','rgba(205,127,50,0.15)'][i]},transparent)` : 'rgba(255,255,255,0.05)',
                    borderRadius:12
                  }}
                >
                  <span style={{fontSize:24,width:45,textAlign:'center'}}>{['🥇','🥈','🥉'][i] || `#${i+1}`}</span>
                  <span style={{fontSize:26,fontWeight:700}}>{s.score}</span>
                  <span style={{flex:1,color:'rgba(255,255,255,0.6)',fontSize:14}}>{s.correct}/{s.total}</span>
                  <span style={{fontSize:13,color:'rgba(255,255,255,0.4)'}}>{s.date}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
