// Source of truth for the 22 questions + 6 personas from content.pdf.
// Pushed to Sanity by `pnpm seed`.

export type Persona = {
  slug: string;
  name: string;
  title: string;
  initials: string;
  gradient: string;
  voice: string;
  verified: boolean;
};

export type Answer = {
  personaSlug: string;
  upvotes: number;
  body: string[];
};

export type Question = {
  slug: string;
  topic: string;
  topicColor: string;
  title: string;
  askedBy: string;
  viewCount: number;
  postedAgo: string;
  answers: Answer[];
};

export type TrendingItem = {
  question: string;
  topic: string;
  views: string;
  postedAgo: string;
};

export const personas: Persona[] = [
  {
    slug: "priya",
    name: "Dr. Priya Iyer",
    title: "Genetic counsellor · 11 years",
    initials: "PI",
    gradient: "linear-gradient(135deg, #2F8C5C, #1F6B43)",
    voice:
      'Warm, structured, explains the mechanism then the meaning. Often starts with "Great question, this comes up a lot in clinic."',
    verified: true,
  },
  {
    slug: "arjun",
    name: "Arjun Mehta",
    title: "PhD candidate in population genetics, IISc",
    initials: "AM",
    gradient: "linear-gradient(135deg, #6F61E8, #4E40C2)",
    voice:
      'Enthusiastic, slightly nerdy, will reference a specific paper. Tends to add "this is more complicated than it sounds -- let me explain why."',
    verified: true,
  },
  {
    slug: "sunita",
    name: "Sunita Rao",
    title: "Patient and genealogy hobbyist · 18 tests taken",
    initials: "SR",
    gradient: "linear-gradient(135deg, #C76842, #9C4A2C)",
    voice:
      "Lived-experience answerer. Speaks from doing 18 ancestry tests and surfacing two surprise half-siblings. Funny, candid, practical.",
    verified: false,
  },
  {
    slug: "ravi",
    name: "Dr. Ravi Krishnan",
    title: "Practising oncologist",
    initials: "RK",
    gradient: "linear-gradient(135deg, #15605D, #0E4D4B)",
    voice:
      "Clinical, measured, careful with words. Always notes when a question needs in-person consultation.",
    verified: true,
  },
  {
    slug: "maya",
    name: "Maya Subramaniam",
    title: "Science journalist",
    initials: "MS",
    gradient: "linear-gradient(135deg, #B66B16, #8B4F0E)",
    voice:
      'Explains the consensus and the controversy. Comfortable saying "the field hasn\'t settled on this." Cites studies in passing.',
    verified: true,
  },
  {
    slug: "kabir",
    name: "Kabir Ahmed",
    title: "Bioinformatics engineer",
    initials: "KA",
    gradient: "linear-gradient(135deg, #C73C70, #9A2855)",
    voice:
      'Practical, sometimes contrarian, often points out where the data is messier than the marketing suggests. Tends to start with "Quick reality check."',
    verified: false,
  },
];

export const topicColors: Record<string, string> = {
  Inheritance: "var(--c-teal-light)",
  Ancestry: "var(--c-amber)",
  "Genetic testing": "var(--c-rust)",
  "Disease risk": "var(--c-rose)",
  Twins: "var(--c-violet)",
  "Genealogy surprises": "var(--c-violet)",
  "Got my results": "var(--c-rust)",
  "Pop culture & science": "var(--c-rust)",
  "Pregnancy & children": "var(--c-rose)",
  Ethics: "var(--ink-2)",
  "Wild science": "var(--c-forest)",
};

export const questions: Question[] = [
  {
    slug: "if-i-share-50-dna-with-both-my-parents-why-do-i-look-so-much-more-like-one-of-them",
    topic: "Inheritance",
    topicColor: topicColors.Inheritance,
    title: "If I share 50% DNA with both my parents, why do I look so much more like one of them?",
    askedBy: "Ananya R.",
    viewCount: 3400,
    postedAgo: "2 days ago",
    answers: [
      {
        personaSlug: "arjun",
        upvotes: 847,
        body: [
          "This is more interesting than it sounds - let me explain why.",
          'Yes, you got 50% of your DNA from each parent. But "look like" is determined by a small subset of your DNA - maybe a few hundred variants that influence visible facial features, skin tone, hair, eye shape. Which half of each parent\'s DNA you got is random, and the random draw might have given you most of the appearance-relevant variants from one side.',
          "So you can be 50/50 by total DNA and 80/20 by visible-trait DNA. That's not a contradiction. It's exactly what the maths predicts will happen sometimes.",
          "There's also a less obvious factor: dominant versus recessive alleles. If your mother contributed a dominant variant for, say, a strong jawline, and your father contributed a recessive one, you'll show your mother's jawline even though you carry both versions in your DNA. Your kids could still inherit the recessive one and look more like their grandfather.",
          "So: 50/50 in DNA. Highly variable in appearance. Both true.",
        ],
      },
      {
        personaSlug: "priya",
        upvotes: 412,
        body: [
          "Great question, this comes up a lot when families bring babies in.",
          'To add to Arjun\'s answer: people sometimes notice that a child looks like one parent for a few years and then "switches" to looking like the other parent. This is also real. The genes for facial structure express themselves at different rates as the face grows - toddler features are dominated by certain variants, adolescent features by others, and adult features by yet others.',
          "The same child, photographed at 3, 13, and 30, can convincingly look like a different parent in each photo.",
        ],
      },
    ],
  },
  {
    slug: "why-do-identical-twins-sometimes-have-noticeably-different-personalities",
    topic: "Twins",
    topicColor: topicColors.Twins,
    title: "Why do identical twins sometimes have noticeably different personalities?",
    askedBy: "Rohan P.",
    viewCount: 5100,
    postedAgo: "4 days ago",
    answers: [
      {
        personaSlug: "maya",
        upvotes: 1200,
        body: [
          "The short answer: identical genes don't mean identical lives, and personality is shaped by both.",
          'Twin studies have been the workhorse of behavioural genetics for decades. The consensus from large studies (the Minnesota Twin Family Study is the most-cited): personality traits are roughly 40 to 60% heritable. The remaining 40 to 60% is environmental - but here is the crucial bit, most of that environmental variation is "non-shared" environment, not "shared" environment.',
          "What that means in practice: even twins raised in the same household have very different experiences. One twin gets the math teacher who notices her. The other doesn't. One twin breaks an arm at age 9 and develops a cautious streak. The other doesn't. Multiply this by 18 years of childhood and you get two genetically identical people whose personalities diverge in ways that look surprising from the outside.",
          'The field used to assume that "shared environment" (the family) was the big environmental driver. The data forced a revision. Family explains less than people thought. Individual life events explain more.',
        ],
      },
      {
        personaSlug: "kabir",
        upvotes: 508,
        body: [
          "Quick reality check on the genes-aren't-everything point: identical twins also aren't quite genetically identical at the cellular level.",
          "Mutations happen during cell division. By the time twins are adults, each has accumulated hundreds of somatic mutations that the other doesn't carry. These are usually trivial, but they add up. And gene expression - which genes are turned on or off in which cells - diverges significantly through life because of epigenetic changes driven by diet, stress, illness, environment.",
          'So "identical twins" is shorthand. The DNA they were born with was identical. The DNA they\'re walking around with at 40 is close but not the same. And the patterns of gene expression - which is what actually translates DNA into biology - can differ a lot.',
        ],
      },
    ],
  },
  {
    slug: "i-just-got-my-dna-test-back-and-it-says-im-8-italian",
    topic: "Got my results",
    topicColor: topicColors["Got my results"],
    title:
      "I just got my DNA test back and it says I'm 8% Italian. None of my known ancestors are Italian. What's going on?",
    askedBy: "Priyanka G.",
    viewCount: 2800,
    postedAgo: "6 days ago",
    answers: [
      {
        personaSlug: "sunita",
        upvotes: 923,
        body: [
          "Welcome to the club. This happens to a lot of us.",
          "A few possibilities, in rough order of likelihood:",
          'One - the test is wrong in the most boring way. Ancestry estimates have wide confidence intervals, and an "8% Italian" result might be saying "we found a pattern that could be Italian, or could be some other Southern European population, with moderate confidence." Look at the underlying confidence range if the company shows it. Often the same result reads as "0–15% Italian" if you click into the details.',
          "Two - your family tree is incomplete further back than you realise. Most people can name their great-grandparents. Beyond that, things get hazy. An Italian ancestor seven generations ago would contribute roughly 0.8% to your DNA - not exactly 8%, but in the right neighbourhood. Migrations, surname changes, and adoptions further back than three generations are surprisingly common.",
          "Three - the reference panels are imperfect. Some European populations have overlapping DNA signals. Italian, Greek, and Balkan ancestry can look similar to the algorithm. The 8% might be Greek, Balkan, or even broadly Mediterranean.",
          "If you really want to investigate, upload your raw DNA to a different company. If both call you 8% Italian, the signal is probably real. If only one does, it's a quirk of that company's algorithm.",
        ],
      },
      {
        personaSlug: "arjun",
        upvotes: 445,
        body: [
          "Sunita's answer is solid. Adding one more point.",
          'Reference populations are built from people who self-identify as having ancestry from a specific region for several generations. But "Italian" is a relatively recent national identity - for most of European history, what\'s now Italy was a collection of city-states, kingdoms, and shifting populations with significant gene flow from North Africa, the Middle East, the Balkans, and Northern Europe.',
          'What the algorithm calls "Italian" is really "the genetic signature of people whose recent ancestors lived in the geographic area now called Italy." That signature overlaps with several neighbouring signatures. An 8% reading could legitimately be picking up signal from anywhere in that overlap.',
          "Take ancestry percentages as broad strokes, not precise truths.",
        ],
      },
    ],
  },
  {
    slug: "my-grandfather-had-huntingtons-whats-the-chance-i-get-it",
    topic: "Disease risk",
    topicColor: topicColors["Disease risk"],
    title: "My grandfather had Huntington's. What's the chance I get it?",
    askedBy: "Anonymous",
    viewCount: 8700,
    postedAgo: "1 week ago",
    answers: [
      {
        personaSlug: "priya",
        upvotes: 1800,
        body: [
          "I'm sorry you're carrying this question. Let me give you the math, then the harder part.",
          "Huntington's disease is autosomal dominant, which means a person with the affected gene variant has the condition. It is not skipped. If your grandfather had Huntington's, the genetics work like this:",
          "- If your grandfather had Huntington's, he had one copy of the affected gene.",
          "- Each of his children (including your parent) had a 50% chance of inheriting that copy.",
          "- If your parent inherited it, your parent has - or will develop - Huntington's. The condition usually appears between ages 30 and 50, sometimes later.",
          "- If your parent inherited the variant, you have a 50% chance of having it too.",
          'So your risk depends on whether your parent inherited the variant. If your parent is older than 50 and has shown no symptoms, the chance they inherited it is lower than 50% (because they would likely have shown symptoms by now). But "lower than 50%" is not "zero."',
          "The harder part: this is one of the conditions where many people choose not to test, because the result tells you for certain what is or isn't coming, and there is no effective preventive treatment. A genetic counsellor can walk you through what testing would and would not give you, and what the testing process itself looks like. I'd strongly encourage that conversation before you make any decision.",
          "Please be gentle with yourself. This is a heavy thing to think about.",
        ],
      },
      {
        personaSlug: "ravi",
        upvotes: 612,
        body: [
          "I'm not a Huntington's specialist, but I want to add one practical note.",
          "The decision of whether to test for a late-onset, currently incurable condition is one of the most personally weighty calls in clinical genetics. People choose differently. Some want to know so they can plan, have children before symptoms appear, or use IVF with embryo screening to avoid passing it on. Others choose not to know because the uncertainty is more bearable than a confirmed positive.",
          "There is no right answer. There is the right answer for you. Take the time. Talk to people who have been through this.",
        ],
      },
    ],
  },
  {
    slug: "how-can-my-dna-test-say-less-than-1-neanderthal",
    topic: "Ancestry",
    topicColor: topicColors.Ancestry,
    title:
      "How can my DNA test say 'less than 1% Neanderthal' if Neanderthals went extinct 40,000 years ago?",
    askedBy: "Vikram J.",
    viewCount: 4200,
    postedAgo: "2 weeks ago",
    answers: [
      {
        personaSlug: "maya",
        upvotes: 1100,
        body: [
          "Because Neanderthals didn't fully go extinct. They interbred with modern humans, and a small percentage of their DNA is still walking around inside everyone of non-African descent.",
          "When anatomically modern Homo sapiens migrated out of Africa starting around 60,000 years ago, they encountered Neanderthals in the Middle East and Europe. The two groups interbred enough that today, every person of European, Asian, or Indigenous American descent carries between 1% and 4% Neanderthal DNA. (People of fully sub-Saharan African descent carry less, though recent research has shown that back-migration brought small amounts of Neanderthal DNA into some African populations too.)",
          'The "less than 1%" in your report is the fraction of your specific 23 chromosome pairs that matches the Neanderthal reference genome. The fraction varies between individuals - siblings can have noticeably different Neanderthal percentages because of how DNA is shuffled in each generation.',
          "What does Neanderthal DNA actually do in modern humans? Some of it shows up in immune function, some in hair and skin traits, some in pain sensitivity. Some of it is just background. The science of identifying Neanderthal contributions to modern health is genuinely interesting and still developing.",
        ],
      },
      {
        personaSlug: "arjun",
        upvotes: 527,
        body: [
          "Adding a fun fact: Denisovan DNA is the other half of this story.",
          "Denisovans are an extinct human cousin we only learned about in 2010, from a finger bone found in a Siberian cave. They also interbred with modern humans. People of East Asian and Melanesian descent carry small amounts of Denisovan DNA - up to 5% in some Papuan populations.",
          "We have learned almost everything we know about Denisovans from their DNA inside us. There are still no confirmed Denisovan skeletons beyond a handful of bone fragments. They are, in a real sense, ghosts who are mostly visible through their descendants.",
        ],
      },
    ],
  },
  {
    slug: "is-depression-genetic",
    topic: "Disease risk",
    topicColor: topicColors["Disease risk"],
    title: "Is depression genetic?",
    askedBy: "Anonymous",
    viewCount: 9300,
    postedAgo: "3 days ago",
    answers: [
      {
        personaSlug: "priya",
        upvotes: 1600,
        body: [
          'Partially, yes. But "genetic" is doing a lot of work in that question - let me unpack it.',
          "Heritability estimates for major depressive disorder cluster around 35 to 40% based on twin studies. That means roughly 35–40% of the variation in who develops depression versus who doesn't is explained by genetic variation in the population. The remaining 60–65% is environmental - trauma, stress, sleep, social context, medical conditions, life events.",
          'What "genetic" doesn\'t mean here: there is no "depression gene." Hundreds, possibly thousands, of variants each contribute a small amount to risk. A polygenic risk score for depression is real but still has limited predictive value at the individual level - it tells you whether your risk is somewhat above or below average, not whether you\'ll develop depression.',
          "What it does mean: if a parent or sibling has depression, your own risk is approximately 2 to 3 times higher than the general population. That's meaningful. But it is still a much smaller effect than what your life circumstances and access to support will do.",
          "Genetics loads the dice. Environment rolls them.",
        ],
      },
      {
        personaSlug: "maya",
        upvotes: 734,
        body: [
          "One more useful piece of context.",
          'The hunt for "depression genes" had a famously rough decade. Several candidate genes that early studies identified - particularly 5-HTTLPR, the serotonin transporter variant - failed to replicate in larger studies. The field has shifted from looking for individual genes to looking at the cumulative effect of thousands of small-effect variants, which is what polygenic risk scores try to capture.',
          "The current honest summary: depression has a genetic component that is real, complex, distributed across the genome, and not yet useful for personal prediction. The most useful thing to know about your depression risk is still your own history and your family history - not your DNA test.",
        ],
      },
    ],
  },
  {
    slug: "can-my-dog-be-more-genetically-diverse-than-i-am",
    topic: "Wild science",
    topicColor: topicColors["Wild science"],
    title: "Can my dog be more genetically diverse than I am?",
    askedBy: "Tanvi L.",
    viewCount: 3600,
    postedAgo: "5 days ago",
    answers: [
      {
        personaSlug: "arjun",
        upvotes: 1400,
        body: [
          "If your dog is a mutt, almost certainly yes. If your dog is a purebred, almost certainly no.",
          "Modern dog breeds were created mostly in the 19th and 20th centuries by selecting for a small set of physical traits and aggressively inbreeding to fix them. Many breeds today trace back to fewer than a dozen founder dogs. The genetic diversity within a single breed - say, Cavalier King Charles Spaniels, or German Shepherds - is brutally low. Some breeds carry inbreeding coefficients equivalent to first-cousin marriages, in every individual.",
          "A street dog or village mongrel, by contrast, has been mixing freely for generations and is wildly more genetically diverse than its purebred neighbours.",
          "Humans sit in between. Within a single ethnic group, genetic diversity is moderate. But humans as a species are unusually low-diversity for a mammal of our population size - we went through a population bottleneck around 70,000 years ago and the species has expanded from a small founding group since then. There is more genetic variation within a single troop of chimpanzees than within the entire global human population.",
          "So: your indie mutt is probably more genetically diverse than you are. Your friend's purebred Pug almost certainly is not.",
        ],
      },
    ],
  },
  {
    slug: "im-38-and-pregnant-should-i-do-nipt-or-amniocentesis",
    topic: "Pregnancy & children",
    topicColor: topicColors["Pregnancy & children"],
    title: "I'm 38 and pregnant. Should I do NIPT or amniocentesis?",
    askedBy: "Anonymous",
    viewCount: 6500,
    postedAgo: "1 week ago",
    answers: [
      {
        personaSlug: "priya",
        upvotes: 1300,
        body: [
          "For most people, NIPT first, then amniocentesis only if NIPT comes back high-risk.",
          "NIPT (non-invasive prenatal testing) is a blood draw from you, around weeks 10–12 of pregnancy. It analyses fetal DNA fragments in your bloodstream and screens for the most common chromosomal conditions - Down syndrome, Edwards syndrome, Patau syndrome - with very high accuracy. There is no risk to the pregnancy because nothing is being inserted.",
          "Amniocentesis is a needle into the amniotic sac to collect fetal cells directly. It is diagnostic, not just a screen - it can definitively confirm or rule out chromosomal conditions and can also detect smaller genetic variants if you ask for them. The downside: a small miscarriage risk, around 0.1–0.3% in skilled hands.",
          "The typical workflow at 38: NIPT first, around week 10. If results are reassuring (which they will be for the vast majority of patients), you stop there. If NIPT flags a possible issue, follow up with amniocentesis to confirm.",
          "A 38-year-old's baseline risk of Down syndrome at birth is roughly 1 in 175, versus 1 in 1,000 at age 25 - so screening is genuinely informative at your age. But the absolute risk is still well under 1%, and NIPT will tell you with high accuracy where you actually sit.",
          "Talk to your OB about timing and which lab. Some clinics do NIPT routinely for over-35 pregnancies; others wait for you to ask.",
        ],
      },
      {
        personaSlug: "ravi",
        upvotes: 289,
        body: [
          "Just want to add the emotional piece my colleagues sometimes leave out.",
          "If NIPT comes back \"high risk,\" that does not mean diagnosis. It means the screen flagged something and confirmation is needed. The wait between a high-risk NIPT and a confirmed amniocentesis result is hard. Have a plan for who you'll talk to during that window. Don't make any decisions during the waiting period.",
          'I have seen many families through this. The vast majority of "high-risk NIPT" outcomes resolve to healthy babies.',
        ],
      },
    ],
  },
  {
    slug: "what-do-i-do-if-my-dna-test-reveals-my-dad-isnt-my-biological-father",
    topic: "Genealogy surprises",
    topicColor: topicColors["Genealogy surprises"],
    title: "What do I do if my DNA test reveals my dad isn't my biological father?",
    askedBy: "Anonymous",
    viewCount: 12100,
    postedAgo: "4 days ago",
    answers: [
      {
        personaSlug: "sunita",
        upvotes: 2100,
        body: [
          'First: I\'m sorry. This is one of the heaviest discoveries that comes out of consumer DNA testing, and you are not alone - there is a name for what happens when people find out this way (NPE, "Not Parent Expected"), and there are large support communities online specifically for people in your situation.',
          "Practical, in this order:",
          "One - confirm. Sometimes the algorithm gets it wrong, especially for distant relative matches. If you haven't already, contact the company and ask them to re-check the analysis. Upload your raw data to a second company and see if the result holds.",
          "Two - don't act fast. Don't confront your parents the day you get the result. Don't post about it. Don't reach out to potential biological relatives yet. Take a week, minimum.",
          "Three - find your people. The NPE Friends Fellowship, DNA NPE Friends on Facebook, and similar communities are full of people who have lived through exactly what you are going through. They will help you think about timing, what to say, what to expect.",
          "Four - therapy is genuinely useful here, ideally with someone who has worked with genealogy-related family discoveries. This is a long process, not a single conversation.",
          "Five - your dad is still your dad, in every way that matters except the biological one. That doesn't make the biological fact less true, but it also doesn't unmake the relationship. Whatever you decide to do, those things can coexist.",
          "Take care.",
        ],
      },
      {
        personaSlug: "priya",
        upvotes: 1100,
        body: [
          "Echoing Sunita's advice. The single most important thing in the first week: do nothing irreversible.",
          "I have worked with families on this. The discoveries are real, the feelings are real, but the people involved - your parents, your siblings, your possible biological father, his possible other family - are real too. A few quiet weeks of processing before any conversation tends to lead to better outcomes for everyone, including you.",
          "Many genetic counsellors will see you for a standalone consultation on this exact issue. You don't need a referral. Find one in your city.",
        ],
      },
    ],
  },
  {
    slug: "can-two-brown-eyed-parents-have-a-blue-eyed-child",
    topic: "Inheritance",
    topicColor: topicColors.Inheritance,
    title: "Can two brown-eyed parents have a blue-eyed child?",
    askedBy: "Aman B.",
    viewCount: 4400,
    postedAgo: "3 days ago",
    answers: [
      {
        personaSlug: "arjun",
        upvotes: 892,
        body: [
          "Yes, easily. The school version of eye colour genetics is one of the most oversimplified things still taught.",
          "The textbook story - brown is dominant, blue is recessive, two brown-eyed parents can have a blue-eyed child only if both are heterozygous carriers - is roughly right but misses most of the action.",
          "Eye colour is actually polygenic. At least 16 genes are known to contribute, with OCA2 and HERC2 doing most of the work, but TYR, IRF4, SLC24A4, and several others all kick in. A person's eye colour is the result of many variants combining, and the outcome isn't a clean dominant/recessive split.",
          "In practice: two brown-eyed parents can absolutely have a blue-eyed child if both carry the right combination of variants - and this happens fairly often. It can also happen if one parent's brown eyes are due to one set of variants and the other parent's brown eyes are due to a different set, and the child happens to inherit a combination that produces low melanin in the iris.",
          "The reverse - two blue-eyed parents having a brown-eyed child - is rarer but also possible, for similar reasons.",
          "If your Class 10 biology textbook claimed otherwise, your textbook was using a 60-year-old model.",
        ],
      },
    ],
  },
  {
    slug: "is-there-really-a-warrior-gene-that-makes-people-violent",
    topic: "Pop culture & science",
    topicColor: topicColors["Pop culture & science"],
    title: "Is there really a 'warrior gene' that makes people violent?",
    askedBy: "Kavya N.",
    viewCount: 6700,
    postedAgo: "1 week ago",
    answers: [
      {
        personaSlug: "maya",
        upvotes: 1500,
        body: [
          'Short answer: no, not in any useful sense. The "warrior gene" is a media nickname that overstates what the actual science says.',
          "The gene in question is MAO-A (monoamine oxidase A), which codes for an enzyme that breaks down certain neurotransmitters including serotonin and dopamine. A specific low-activity variant - sometimes called MAOA-L - has been associated, in some studies, with slightly higher rates of impulsive aggression, but only in combination with severe childhood maltreatment.",
          "The original 2002 study by Avshalom Caspi and colleagues was important: it suggested that the variant alone didn't predict aggression, but that children with the variant who were also abused showed elevated antisocial behaviour. This was one of the first concrete demonstrations of a gene-by-environment interaction in psychiatry.",
          "What it absolutely does not mean: that carriers of MAOA-L are warriors, violent, or predisposed to crime. About a third of men of European descent carry the variant. The vast majority live unremarkable lives. The pop-science nickname (and a famous 2009 court case where a defendant tried to use it for legal defence) ran far ahead of what the science supports.",
          "The honest summary: a small genetic effect, only visible in extreme environments, dramatically over-marketed in headlines.",
        ],
      },
      {
        personaSlug: "kabir",
        upvotes: 443,
        body: [
          'Quick reality check: this is true of basically every "X gene" media story.',
          'The "infidelity gene," the "happiness gene," the "language gene" (FOXP2 - a real gene with a real role in speech, but again the headlines outran the data). The pattern is consistent. Find a small statistical association in one study, give it a memorable nickname, and the science gets crushed by the metaphor.',
          'When you see "scientists discover gene for [behaviour]," your default should be skepticism. Behaviour is almost never traceable to a single gene. The interesting science is in the complicated, environment-dependent interactions - which doesn\'t fit in a headline.',
        ],
      },
    ],
  },
  {
    slug: "should-i-get-tested-for-brca-if-no-one-in-my-family-has-had-breast-cancer",
    topic: "Disease risk",
    topicColor: topicColors["Disease risk"],
    title: "Should I get tested for BRCA if no one in my family has had breast cancer?",
    askedBy: "Anonymous",
    viewCount: 5800,
    postedAgo: "2 weeks ago",
    answers: [
      {
        personaSlug: "ravi",
        upvotes: 1200,
        body: [
          "For most people without family history, current clinical guidelines do not recommend routine BRCA testing. Here is why.",
          "BRCA1 and BRCA2 variants are present in roughly 1 in 400 people in the general population, but in 1 in 40 people of Ashkenazi Jewish descent and in elevated rates in some other founder populations. Without family history or ethnic risk factor, the prior probability of carrying a pathogenic variant is low. Testing a low-risk population produces a high rate of false positives and inconclusive results that lead to anxiety and follow-up tests without clear benefit.",
          "Where clinical guidelines do recommend testing: family history of breast cancer (particularly before age 50), ovarian cancer at any age, male breast cancer, multiple cancers in the same person, or Ashkenazi Jewish ancestry.",
          "Some people choose to test anyway, on the principle that knowing is better than not. That is a legitimate personal choice. If you do test, do it properly - through a clinical lab with a genetic counsellor, not through a consumer kit that screens only a handful of the thousands of possible BRCA variants. A negative consumer result is not a clean bill of health; it only tells you that you don't carry the small set of variants that test happened to check.",
          "If you have specific reasons for concern that aren't family history - say, you just lost a friend to breast cancer and the question won't leave you - talk to a counsellor. They will help you think through whether testing makes sense for you.",
        ],
      },
      {
        personaSlug: "priya",
        upvotes: 538,
        body: [
          "One small addition. Some people of South Asian descent specifically ask about this because BRCA-positive cases in Indian patients are sometimes the first BRCA-positive case in the family, since family history records often don't go beyond two generations in our communities.",
          "If you are South Asian and aware that detailed multi-generational health history is hard to come by in your family, that's a reasonable thing to mention to a genetic counsellor when discussing whether to test. It doesn't automatically change the recommendation, but it changes the conversation.",
        ],
      },
    ],
  },
  {
    slug: "why-do-some-people-have-an-extra-finger-or-toe-is-it-genetic",
    topic: "Wild science",
    topicColor: topicColors["Wild science"],
    title: "Why do some people have an extra finger or toe - is it genetic?",
    askedBy: "Devika S.",
    viewCount: 3100,
    postedAgo: "6 days ago",
    answers: [
      {
        personaSlug: "arjun",
        upvotes: 672,
        body: [
          "Polydactyly - having extra fingers or toes - is one of the more common minor congenital differences and it is usually genetic.",
          "The most common form is autosomal dominant, meaning a person with the affected gene variant has the trait, and each of their children has a 50% chance of inheriting it. Several genes can cause it, the best-studied being GLI3.",
          "In some families, polydactyly has been passed down for many generations and is treated as a normal family trait. In other cases, it appears as part of a broader syndrome that has additional features. The non-syndromic version (just extra digits, nothing else) is the more common one and is medically uncomplicated - the extra digit is often surgically removed in infancy, more for cosmetic and practical reasons than medical ones.",
          "A few interesting facts. Polydactyly is more common in some populations than others - it occurs at higher rates in some West African and African-American populations than in European-descended populations. The hand is more commonly affected than the foot. The extra digit is usually on the pinky side, not the thumb side.",
          "It is one of the visible reminders that the genetic instructions for limb development are intricate and that small variations in those instructions show up as small variations in our bodies.",
        ],
      },
    ],
  },
  {
    slug: "my-polygenic-risk-score-for-type-2-diabetes-is-in-the-95th-percentile",
    topic: "Got my results",
    topicColor: topicColors["Got my results"],
    title:
      "My polygenic risk score for type 2 diabetes is in the 95th percentile. Do I need to panic?",
    askedBy: "Asher M.",
    viewCount: 4700,
    postedAgo: "4 days ago",
    answers: [
      {
        personaSlug: "priya",
        upvotes: 1400,
        body: [
          "No, but pay attention.",
          "A 95th percentile polygenic risk score for type 2 diabetes does not mean a 95% chance of getting diabetes. It means that out of the population the score was calibrated on, your genetic risk is higher than 95% of people. The translation to absolute lifetime risk depends on the population, the model, and your other risk factors.",
          "For type 2 diabetes specifically, the 95th percentile usually translates to roughly 2 to 3 times the average lifetime risk. If the average risk in your demographic is, say, 25%, your genetic baseline is around 50–60%. That is high, but it is not destiny.",
          "What changes the picture significantly - and this is the part that matters most - is lifestyle. Type 2 diabetes risk responds strongly to body composition, dietary patterns (particularly refined carbohydrate intake), physical activity, and sleep quality. Multiple large studies have shown that lifestyle modification can roughly halve the risk even in people with high genetic susceptibility.",
          "What I'd recommend, in order:",
          "- Get baseline labs: HbA1c, fasting insulin, lipid panel, ApoB if available.",
          "- If you are South Asian: get these earlier than the general recommended age. T2D presents earlier and at lower BMI in our population.",
          "- Don't make major dietary changes based on the genetic score alone; make them based on the labs.",
          "- Re-test every 6–12 months for a few years to see where you actually trend.",
          "The score tells you which dial to pay attention to. The labs tell you whether the dial is moving.",
        ],
      },
    ],
  },
  {
    slug: "how-identical-can-fraternal-twins-be",
    topic: "Twins",
    topicColor: topicColors.Twins,
    title: "How identical can fraternal twins be?",
    askedBy: "Lavanya P.",
    viewCount: 2900,
    postedAgo: "1 week ago",
    answers: [
      {
        personaSlug: "arjun",
        upvotes: 618,
        body: [
          'Fraternal twins share, on average, 50% of their DNA - the same as any pair of siblings. But "on average" hides a wide range.',
          "The actual figure for any specific pair of fraternal twins can range from roughly 38% to 61% shared DNA. This is the same as the range for non-twin siblings, but it gets noticed more in twins because we compare them more carefully.",
          "So at the lower end of the range, fraternal twins can be about as similar to each other as second cousins. At the upper end, they can be almost as similar as half-identical twins (a rare phenomenon where one egg is fertilised by two sperm).",
          "In appearance, fraternal twins can range from looking nothing alike to looking essentially identical at a glance. Same-sex fraternal twins who happen to draw genetically similar combinations sometimes get mistaken for identical twins their whole lives, and only discover the truth from a DNA test.",
          'There is also a rare class - sesquizygotic or "half-identical" twins - where the genetics are between fraternal and identical. Fewer than 10 cases have been documented worldwide. So if your fraternal twins look uncannily alike, the explanation is almost certainly the high-end-of-normal random draw, not the once-in-a-decade special case.',
        ],
      },
    ],
  },
  {
    slug: "do-tall-parents-always-have-tall-children",
    topic: "Wild science",
    topicColor: topicColors["Wild science"],
    title: "Do tall parents always have tall children?",
    askedBy: "Meera J.",
    viewCount: 2500,
    postedAgo: "3 days ago",
    answers: [
      {
        personaSlug: "maya",
        upvotes: 754,
        body: [
          "Statistically tall, yes. Predictably tall, no.",
          'The Galton phenomenon - named after Francis Galton, who first measured it in the 1880s - is called "regression to the mean." Galton found that very tall parents had tall children, but their children tended to be slightly shorter than them on average. Very short parents had short children, but their children tended to be slightly taller than them on average. The next generation drifts back toward the population average.',
          'The reason is statistical. Adult height is influenced by thousands of genetic variants. Tall parents tend to have many of the "tall" variants but not all of them. Their children inherit a random subset and on average regress toward the population mean.',
          "The rule of thumb that paediatricians use: a child's adult height tends to fall within a range called the mid-parental height - average the two parents' heights (adjusted for sex), with a confidence interval of about 8–10 cm on either side. So two parents who are both 180 cm tall will most likely have children in the range of 170 to 190 cm, with the centre of the distribution slightly below 180.",
          "Nutrition and childhood health also play significant roles. A genetically tall child who was malnourished in early childhood may not reach their genetic potential. A genetically average child with excellent nutrition may exceed expectations.",
          "Tall parents tilt the odds. They do not guarantee outcomes.",
        ],
      },
    ],
  },
  {
    slug: "are-aryan-and-dravidian-real-genetic-categories-or-colonial-inventions",
    topic: "Ancestry",
    topicColor: topicColors.Ancestry,
    title: "Are 'Aryan' and 'Dravidian' real genetic categories or colonial inventions?",
    askedBy: "Anonymous",
    viewCount: 11400,
    postedAgo: "5 days ago",
    answers: [
      {
        personaSlug: "arjun",
        upvotes: 2300,
        body: [
          "Both, sort of. The terms are colonial categories that don't map cleanly to biology, but they roughly correspond to real ancestral components that population genetics has identified in South Asians.",
          "Modern South Asian populations are descended from a mix of several ancestral groups. The two largest contributions, identified through extensive ancient DNA research over the last decade (David Reich's lab at Harvard has done much of this work), are usually called:",
          "- Ancestral North Indians (ANI): a population with significant input from Iranian agriculturalists and Steppe pastoralists who entered the subcontinent in waves between about 4500 and 1500 BCE.",
          "- Ancestral South Indians (ASI): a population descended from the earlier hunter-gatherers and agriculturalists of the subcontinent, with deep roots going back tens of thousands of years.",
          "Almost every South Asian population today is a mixture of ANI and ASI in different proportions. Punjabis tend toward more ANI ancestry, Tamils toward more ASI ancestry, but the gradient is continuous and there are no clean lines. Every modern Indian is a mix.",
          'The colonial framing - "Aryan invasion" of Dravidian natives - oversimplifies what was actually a long, complex, multi-wave history of migration, mixing, agriculture, and language change over four thousand years. The genetics broadly supports the existence of two major ancestral components but does not support the cleaner colonial narrative.',
          "The vocabulary is loaded, the underlying genetics is real, and the politics of the topic has interfered with public understanding of the science. This is one of the most active research areas in South Asian genetics right now.",
        ],
      },
      {
        personaSlug: "sunita",
        upvotes: 612,
        body: [
          'Arjun\'s answer is solid. From a non-scientist perspective: if you upload your DNA to enough services, this is one of the most striking parts of the results. Almost every Indian shows up as a continuous gradient - there is no clean "North Indian" or "South Indian" cluster in the data, more like a smooth spectrum.',
          "It is one of those moments when the genetic data quietly contradicts a lot of inherited categories. Worth sitting with.",
        ],
      },
    ],
  },
  {
    slug: "is-there-any-truth-to-asian-glow-being-a-real-genetic-thing",
    topic: "Pop culture & science",
    topicColor: topicColors["Pop culture & science"],
    title: "Is there any truth to 'Asian Glow' being a real genetic thing?",
    askedBy: "Rachit V.",
    viewCount: 4800,
    postedAgo: "1 week ago",
    answers: [
      {
        personaSlug: "ravi",
        upvotes: 1100,
        body: [
          'Yes, this one is well-documented. The "Asian flush" or "Asian glow" is a real genetic phenomenon caused by a variant in the ALDH2 gene.',
          "The mechanism: when your body breaks down alcohol, it first converts ethanol to acetaldehyde (a toxic intermediate), and then converts acetaldehyde to acetate (which is harmless). The second step is performed by an enzyme called aldehyde dehydrogenase 2, encoded by the ALDH2 gene.",
          "Roughly 30 to 50% of people of East Asian descent (Chinese, Japanese, Korean, and others) carry a variant called ALDH2*2, which produces a slower, less functional enzyme. After drinking, acetaldehyde builds up faster than it can be cleared, and the result is facial flushing, increased heart rate, sometimes nausea and headache.",
          "The variant is much rarer in South Asian, European, and African populations, though it does occur.",
          "What is medically important about this is not the flushing itself but the long-term consequence. People who carry ALDH2*2 and continue to drink heavily face significantly elevated risks of esophageal cancer and other alcohol-related cancers, because acetaldehyde is a known carcinogen and they are exposed to it at higher concentrations for longer.",
          "The flush is a warning signal, not a quirk. If you reliably flush from alcohol and you also drink heavily, that combination warrants attention. Cutting back is meaningful preventive medicine.",
        ],
      },
    ],
  },
  {
    slug: "my-23andme-report-says-i-have-reduced-risk-for-alzheimers",
    topic: "Got my results",
    topicColor: topicColors["Got my results"],
    title: "My 23andMe report says I have 'reduced risk' for Alzheimer's. Should I trust that?",
    askedBy: "Anonymous",
    viewCount: 3900,
    postedAgo: "2 weeks ago",
    answers: [
      {
        personaSlug: "kabir",
        upvotes: 812,
        body: [
          "Quick reality check on what 23andMe is actually telling you.",
          "The Alzheimer's report from 23andMe checks two specific variants of the APOE gene - specifically, whether you carry the e4 allele, which is the best-established genetic risk factor for late-onset Alzheimer's. A \"reduced risk\" result means you carry zero copies of e4.",
          'That is genuinely good news - APOE-e4 carriers have meaningfully elevated risk. But "reduced risk" relative to the average is not "no risk." Alzheimer\'s is influenced by many variants, almost all of which the consumer test does not look at, plus a substantial environmental component. The lifetime risk for someone with no APOE-e4 is still around 9–10% (versus 12–15% population average and 30–50% for one e4 copy and significantly higher for two).',
          "So: the report is correct as far as it goes. It is just looking at one variant out of dozens that matter, on a condition where lifestyle and cardiovascular health are major contributors.",
          "What to actually do with this information: nothing dramatic. The general advice for reducing Alzheimer's risk - control blood pressure, manage cardiovascular health, stay socially and cognitively active, exercise regularly, manage hearing loss if it develops - applies to you the same as to everyone else, regardless of what APOE says.",
        ],
      },
      {
        personaSlug: "ravi",
        upvotes: 356,
        body: [
          'Adding from a clinical angle: the bigger problem with Alzheimer\'s APOE testing is on the other side. People who do get the "elevated risk" result sometimes spiral into anxiety about a condition they may not develop and cannot currently prevent in any specific way. This is one of the reasons many genetic counsellors advise people to think carefully before ordering DNA reports that include neurodegenerative conditions. The information is real, but the actionability is limited.',
          'If you\'ve already received a "reduced risk" result and you feel reassured, great. If a friend gets the opposite result and feels worse, that is also a foreseeable outcome of these tests.',
        ],
      },
    ],
  },
  {
    slug: "if-i-take-a-dna-test-can-it-incriminate-a-relative-ive-never-met",
    topic: "Ethics",
    topicColor: topicColors.Ethics,
    title: "If I take a DNA test, can it incriminate a relative I've never met?",
    askedBy: "Anonymous",
    viewCount: 7300,
    postedAgo: "3 days ago",
    answers: [
      {
        personaSlug: "maya",
        upvotes: 1600,
        body: [
          "Yes. This is one of the genuinely unsettling implications of consumer genetic testing, and it has become a real-world thing.",
          "The most famous case is the Golden State Killer, identified in 2018 after decades on the run. Investigators uploaded crime-scene DNA to GEDmatch (a public ancestry database) and identified distant relatives of the killer. From those distant relatives, traditional genealogy work narrowed the search until the killer himself was identified, arrested, and convicted.",
          "The implication: you don't have to take a DNA test for your DNA to be in a searchable database. If a third cousin you have never met takes a test and uploads to a public database, your own DNA is partially identifiable through them.",
          "There are now studies estimating that for most Americans of European descent, enough of their distant relatives have already tested that they could be identified through familial search even if they personally never took a test.",
          'How seriously you should take this depends on what you mean by "incriminate." If you are a person of interest in a serious crime where DNA evidence exists, yes, familial DNA search is a real and growing investigative tool. If you are an ordinary person with no criminal exposure, the practical risk is minimal - but the privacy implications are still worth thinking about.',
          "Different ancestry companies have different policies about cooperation with law enforcement. Some require warrants. Some have open databases. Read the terms before you upload.",
        ],
      },
    ],
  },
  {
    slug: "is-balding-really-inherited-from-the-mothers-side",
    topic: "Inheritance",
    topicColor: topicColors.Inheritance,
    title: "Is balding really inherited from the mother's side?",
    askedBy: "Vikram R.",
    viewCount: 5600,
    postedAgo: "6 days ago",
    answers: [
      {
        personaSlug: "arjun",
        upvotes: 1300,
        body: [
          'Partly. The "look at your mother\'s father" rule of thumb is a real thing but only captures part of the story.',
          "The biggest single genetic contributor to male-pattern baldness is a variant in the androgen receptor gene (AR), which sits on the X chromosome. Men have one X chromosome, inherited from their mother. So a man's androgen receptor variant comes from his mother, and his mother's X chromosomes came from her father (one of them) and her mother (one of them). This is the basis of the old wives' tale.",
          "But baldness is genuinely polygenic. A 2017 study identified more than 200 genetic markers associated with male-pattern baldness, located across many chromosomes - not just the X. Variants on chromosome 20 (near the PAX1/FOXA2 region) have particularly large effects. These can come from either parent.",
          "So the practical picture: looking at your maternal grandfather is informative, but not definitive. A man whose maternal grandfather was bald has somewhat elevated risk. A man whose paternal grandfather and father are both bald also has elevated risk. The two add up.",
          'The "blame your mother" version of the story was based on real biology but oversold the X-chromosome contribution. The full picture is more democratic - and harder to escape.',
        ],
      },
    ],
  },
  {
    slug: "could-i-in-theory-find-a-long-lost-cousin-through-dna-testing-without-their-consent",
    topic: "Wild science",
    topicColor: topicColors["Wild science"],
    title: "Could I, in theory, find a long-lost cousin through DNA testing without their consent?",
    askedBy: "Anonymous",
    viewCount: 4100,
    postedAgo: "1 week ago",
    answers: [
      {
        personaSlug: "sunita",
        upvotes: 1100,
        body: [
          "Yes, very easily, and many people have. The ethics are genuinely complicated.",
          "When you upload your DNA to one of the major ancestry services that offers relative matching, the algorithm automatically searches the entire database for people who share significant DNA with you. If a long-lost cousin has tested with the same company, you will see them as a match - usually with a relationship estimate and the option to send them a message.",
          "This is exactly how thousands of adoption reunions, donor-conceived family discoveries, and surprise siblings have happened. It is also how many family secrets have been involuntarily uncovered, sometimes painfully.",
          "The cousin doesn't have to consent to be found. Their presence in the database is consent to be matched with relatives - that is built into the service. What they can choose is whether to respond to your message and whether to share their family information.",
          "The ethics question that comes up: is it appropriate to reach out to someone who may not know they have a long-lost cousin, when the discovery might disrupt their understanding of their family? Different people answer this differently. Some communities of genealogy users have developed norms - wait a few days, send a brief and gentle first message, don't assume the other person wants the same level of contact you do, accept silence as an answer.",
          "If you are considering reaching out to someone, write the message you would want to receive in their position. That tends to be the right one.",
        ],
      },
    ],
  },
];

export const trending: TrendingItem[] = [
  {
    question: "If I take a DNA test, can it incriminate a relative I've never met?",
    topic: "Ethics",
    views: "7.3k",
    postedAgo: "3 days",
  },
  {
    question: "Is balding really inherited from the mother's side?",
    topic: "Inheritance",
    views: "5.6k",
    postedAgo: "6 days",
  },
  {
    question:
      "My polygenic risk score for type 2 diabetes is in the 95th percentile. Do I need to panic?",
    topic: "Got my results",
    views: "4.7k",
    postedAgo: "4 days",
  },
  {
    question: "Is there really a 'warrior gene' that makes people violent?",
    topic: "Pop culture & science",
    views: "6.7k",
    postedAgo: "1 week",
  },
  {
    question: "Should I get tested for BRCA if no one in my family has had breast cancer?",
    topic: "Disease risk",
    views: "5.8k",
    postedAgo: "2 weeks",
  },
];

export const topics = [
  "Inheritance",
  "Ancestry",
  "Genetic testing",
  "Disease risk",
  "Twins",
  "Genealogy surprises",
  "Got my results",
  "Pop culture & science",
  "Pregnancy & children",
  "Ethics",
  "Wild science",
];
