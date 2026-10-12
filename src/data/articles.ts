import { Article, CommentItem } from '../types';

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'hero-saudi-yemen',
    headline: 'Saudi and Yemeni Airports Are Hit in New Round of Strikes',
    deck: 'At least one person was killed in the Saudi capital, Riyadh, kingdom authorities said. The Houthis said Saudi aircraft hit the Yemeni capital’s airport.',
    section: 'World',
    kicker: 'Middle East Conflict',
    author: 'Vivian Nereim and Ben Hubbard',
    date: 'Oct. 11, 2026',
    readTime: '3 MIN READ',
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
    imageLocation: 'Riyadh, Saudi Arabia',
    imageDate: 'Oct. 11',
    imageCaption: 'Saudi Arabia hosted an energy summit on the same day Saudi and Yemeni were hit',
    isHero: true,
    hasAudio: true,
    audioDuration: '04:15',
    commentCount: 142,
    bodyParagraphs: [
      'RIYADH, Saudi Arabia — A coordinated flurry of air and missile strikes struck airports in Saudi Arabia and Yemen early Monday, signaling a volatile escalation that shattered weeks of tentative diplomatic calm across the Arabian Peninsula.',
      'Kingdom officials confirmed that projectile fragments impacted near King Khalid International Airport on the outskirts of Riyadh, killing at least one ground operations worker and injuring five others. Commercial departures were briefly paused before military air defense interceptors secured the airspace.',
      'Hours earlier, Houthi military representatives in Sana, Yemen’s capital, reported that fighter jets belonging to the Saudi-led coalition conducted repeated sorties against airbase infrastructure adjacent to Sana International Airport.',
      'The strikes unfolded on the very morning that international business leaders and energy ministers convened in Riyadh for a premier clean technology and petro-transition symposium, highlighting the vulnerability of the kingdom’s ambitious economic diversification programs to regional crossfire.',
      'International diplomats in Geneva urged immediate de-escalation, noting that upcoming United Nations-mediated talks were intended to extend the landmark maritime and cargo truce established earlier this year.',
      '“We cannot afford another downward spiral when regional economies are already contending with global headwinds,” said Martin Griffiths, the U.N. humanitarian chief. “Both sides must prioritize civilian infrastructure and return to the negotiating table.”'
    ],
    tags: ['Saudi Arabia', 'Yemen', 'Middle East', 'Geopolitics', 'Houthis']
  },
  {
    id: 'israeli-election',
    headline: 'An Israeli Election Like No Other',
    deck: 'With prime ministers shifting rapidly, voters head to polling places for the fifth time in four years with familiar political divisions deepening.',
    section: 'World',
    kicker: 'The World • Analysis',
    author: 'Patrick Kingsley',
    date: 'Oct. 11, 2026',
    readTime: '7 MIN READ',
    imageUrl: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=1000&q=80',
    hasAudio: true,
    audioDuration: '31:42',
    commentCount: 54,
    bodyParagraphs: [
      'JERUSALEM — The campaign posters covering Jerusalem bus stops and Tel Aviv highway billboards feel strikingly familiar, yet the exhaustion amongst the electorate is entirely unprecedented.',
      'For the fifth time in four years, Israeli citizens are casting ballots in a national election dominated by the polarizing shadow of Benjamin Netanyahu and the complex coalition mathematics required to govern a fractured nation.',
      'Political analysts observe that ideological differences over traditional domestic policies have largely been eclipsed by referendums on institutional norms, judicial independence, and personal loyalty.',
      '“The continuous cycle of elections has transformed temporary electioneering into permanent governing reality,” said Tamar Hermann, a senior research fellow at the Israel Democracy Institute. “Every vote is framed as an existential crossroads.”',
      'Turnout figures in early voting precincts indicated strong engagement in both conservative strongholds and progressive metropolitan hubs, setting up an agonizingly narrow tally when poll stations close late Tuesday evening.'
    ],
    tags: ['Israel', 'Middle East', 'Elections', 'Politics']
  },
  {
    id: 'saudi-houthi-ambitions',
    headline: 'Saudi Arabia Has Few Options as Houthis Aim at Heart of Its Ambitions',
    deck: 'Efforts to transform the petrostate depend on peace, but attacks on infrastructure threaten massive global investments and new tourist megaprojects.',
    section: 'World',
    kicker: 'The World • Analysis',
    author: 'Vivian Nereim',
    date: 'Oct. 11, 2026',
    readTime: '6 MIN READ',
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80',
    hasAudio: false,
    commentCount: 38,
    bodyParagraphs: [
      'RIYADH, Saudi Arabia — Crown Prince Mohammed bin Salman’s Vision 2030 blueprint envisions futuristic mountain ski resorts in Neom, luxury Red Sea archipelagos, and financial districts that rival Dubai and Singapore.',
      'Yet all of those multi-billion dollar dreams presuppose one essential foundation: an unshakeable perception of regional safety and predictable air corridors for foreign executives and tourists.',
      'The renewed strikes against civilian logistics assets present Riyadh with a difficult dilemma. A heavy military retaliation risks destroying hard-won regional rapprochement accords, while showing restraint may be perceived by domestic critics as vulnerability.',
      '“The Saudi leadership is acutely aware that international capital is timid,” explained Neil Quilliam, an associate fellow at Chatham House. “One headline about intercepted drones near an airport damages tourism projections that take years to nurture.”'
    ],
    tags: ['Saudi Arabia', 'Economy', 'Middle East', 'Vision 2030']
  },
  {
    id: 'texas-talarico',
    headline: 'On Texas TikTok, It’s All About Talarico',
    deck: 'A state representative is finding a massive viral following by discussing religion, democracy and public education.',
    section: 'Politics',
    kicker: 'U.S. Midterms Coverage',
    author: 'J. David Goodman',
    date: 'Oct. 11, 2026',
    readTime: '5 MIN READ',
    imageUrl: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1000&q=80',
    commentCount: 89,
    bodyParagraphs: [
      'AUSTIN, Tex. — In a state capitol known for fiery partisan rhetoric and grandstanding committee marathons, James Talarico has carved out an unlikely digital following by speaking in gentle, measured, and pastoral tones.',
      'Clips of the 35-year-old Democratic state representative, former public school teacher, and current seminary student grilling ideological opponents during committee hearings on school vouchers have racked up tens of millions of views across TikTok and Instagram.',
      'His videos rarely feature the typical political attack style. Instead, he quotes scripture to challenge Christian nationalism, questions textbook censorship with calm socratic queries, and defends rural public school funding.',
      '“People across the political spectrum are hungry for substance over spectacle,” Mr. Talarico said in an interview in his Capitol office. “When you speak truth with grace, people stop scrolling and actually listen.”'
    ],
    tags: ['Texas', 'TikTok', 'Politics', 'Education', 'Social Media']
  },
  {
    id: 'sc-senate-debate',
    headline: '5 Takeaways From the South Carolina Senate Debate',
    deck: 'Candidates traded sharp barbs over inflation, abortion rights and national security in their sole scheduled broadcast.',
    section: 'Politics',
    kicker: 'U.S. Midterms Coverage',
    author: 'Maya King',
    date: 'Oct. 11, 2026',
    readTime: '4 MIN READ',
    imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1000&q=80',
    commentCount: 71,
    bodyParagraphs: [
      'COLUMBIA, S.C. — In an hour-long exchange that was by turns blistering and intensely personal, the contenders in South Carolina’s marquee Senate contest met for their only televised debate ahead of next month’s vote.',
      'Here are five key takeaways from the broadcast:',
      '1. Economic Pressures Dominated the Opening Rounds: Both candidates attempted to pin blame for grocery and housing costs on opposing national leadership, sparring sharply over federal spending bills.',
      '2. Clash Over Reproductive Freedoms: The debate revealed stark contrasts on federal abortion limits, with each candidate targeting suburban moderate voters who could sway the outcome.',
      '3. Foreign Policy Splits: Disagreements over continued defense appropriations for overseas allies highlighted generational shifts within both parties.',
      '4. Focus on Infrastructure and Port Investment: Local matters, particularly federal funding for Charleston’s deepwater shipping channels, provided rare moments of bipartisan agreement.',
      '5. The Closing Pitches: Both candidates concluded with contrasting visions for South Carolina’s economic trajectory over the coming decade.'
    ],
    tags: ['Senate', 'South Carolina', 'Debate', 'Midterms', 'Elections']
  },
  {
    id: 'great-read-wilderness',
    headline: 'He Went Out on an Epic Wilderness Adventure. Only His Dogs Came Back.',
    deck: 'In the remote boreal forest of northern Manitoba, a survivalist set off into the subarctic wilderness. Months later, a mystery remains frozen in time.',
    section: 'The Great Read',
    kicker: 'The Great Read',
    author: 'Dan Bilefsky',
    date: 'Oct. 11, 2026',
    readTime: '12 MIN READ',
    imageUrl: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80',
    isGreatRead: true,
    hasAudio: true,
    audioDuration: '18:40',
    commentCount: 312,
    bodyParagraphs: [
      'CHURCHILL, Manitoba — When Julien Bouchard packed his handmade wooden sled and hitched his four Siberian huskies on a blustery November dawn, the thermometer in town hovered at minus 28 degrees Celsius.',
      'He carried a satellite tracker, ninety days of dehydrated pemmican, a canvas prospector tent, and a notebook filled with hand-drawn maps of the Seal River basin, one of North America’s last truly untouched wild corridors.',
      'He told friends at the local trading post that he intended to spend the deep winter living as the early fur trappers had, testing human resilience against the unforgiving subarctic night.',
      'In mid-February, thirty miles outside the nearest settlement, an indigenous ranger patrol spotted two emaciated dogs curled near the edge of a frozen lake. Within forty-eight hours, the remaining pair trotted out of the tree line into a snowmobile camp.',
      'All four animals were thin but alive. Their harnesses had been neatly sliced with a sharp hunting knife, an unmistakable sign of deliberate release. But of Julien Bouchard himself, not a single footprint or shell casing has ever been found.',
      'Search and rescue teams with scent dogs and thermal infrared drones combed the frozen muskeg for twelve weeks before spring melt forced an end to operations. As the snow receded, park rangers discovered his sled lashed between two spruce trees, fully intact with supplies, untouched provisions, and his journal — its final entry dated January 4, simply reading: “The wind has ceased. Something is walking on the ice.”'
    ],
    tags: ['Wilderness', 'Adventure', 'Mystery', 'Canada', 'Longform']
  },
  {
    id: 'opinion-krugman',
    headline: 'Why the Global Inflation Wave May Crest Faster Than We Think',
    deck: 'Supply chain friction and shipping container backlogs are resolving far quicker than central bank pessimists anticipated.',
    section: 'Opinion',
    kicker: 'Paul Krugman',
    author: 'Paul Krugman',
    date: 'Oct. 11, 2026',
    readTime: '5 MIN READ',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1000&q=80',
    commentCount: 204,
    bodyParagraphs: [
      'For the past eighteen months, economic doom-saying has been the default tone across cable news and financial conferences. Pundits proclaimed that decades of low inflation had permanently evaporated, replaced by an intractable wage-price spiral.',
      'Yet if you look past headline anxiety to freight shipping spot rates, wholesale fertilizer costs, and global semiconductor inventory levels, the data paints an entirely different picture.',
      'The pandemic-era distortion in consumer purchasing — where households abruptly pivoted from buying services to hoarding durable manufactured goods — has swung back to historical equilibrium.',
      'Central banks will take credit when price indicators normalize, but the true hero of this story is the relentless resilience of global logistics workers and industrial supply chains retooling at breakneck speed.'
    ],
    tags: ['Opinion', 'Economics', 'Inflation', 'Federal Reserve']
  },
  {
    id: 'opinion-dowd',
    headline: 'The High-Stakes Theater of American Midterms',
    deck: 'Between manufactured outrage, stump speech choreographies, and digital ad wars, voters are looking for genuine leadership.',
    section: 'Opinion',
    kicker: 'Maureen Dowd',
    author: 'Maureen Dowd',
    date: 'Oct. 11, 2026',
    readTime: '4 MIN READ',
    imageUrl: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=1000&q=80',
    commentCount: 165,
    bodyParagraphs: [
      'WASHINGTON — Autumn in Washington brings cooler breezes, changing foliage along the Potomac, and the unmistakable stench of desperate political panic.',
      'With control of Capitol Hill hanging on a razor’s edge, consultants are burning through nine-figure war chests to convince suburban swing voters that their opponents are either dangerous zealots or feckless cowards.',
      'Walking through campaign rallies across three battleground states this week, what struck me was not the volume of the applause lines, but the quiet weariness in the eyes of voters standing in the overflow lines.',
      'Americans are not asking for rhetorical perfection or slick television spots. They want leaders who can talk about their grocery bills, their kids’ classrooms, and their healthcare without consulting a focus group script every twelve seconds.'
    ],
    tags: ['Opinion', 'Washington', 'Elections', 'Politics']
  },
  {
    id: 'business-ai-chips',
    headline: 'Next-Gen Silicon Architectures Shake Up the Server Room',
    deck: 'Cloud providers are racing to deploy custom inference processors that slash data center power consumption by nearly half.',
    section: 'Business',
    kicker: 'Business & Tech',
    author: 'Cade Metz',
    date: 'Oct. 11, 2026',
    readTime: '6 MIN READ',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80',
    commentCount: 92,
    bodyParagraphs: [
      'SAN FRANCISCO — The insatiable electricity appetite of advanced computing clusters has forced tech giants into an aggressive hardware pivot.',
      'At an engineering summit in Silicon Valley, top cloud infrastructure architects unveiled modular silicon dies designed specifically for transformer inference at sub-100-watt power envelopes.',
      'With grid operators in Northern Virginia and Ireland warning of interconnection bottlenecks, power efficiency has supplanted raw floating-point speed as the ultimate competitive metric in modern computing.'
    ],
    tags: ['Technology', 'AI', 'Silicon', 'Energy', 'Cloud']
  },
  {
    id: 'cooking-autumn-soup',
    headline: 'The Secret to Rich French Onion Soup Without Hours of Stirring',
    deck: 'A chef’s ingenious oven caramelization method delivers deep mahogany depth with practically hands-off simplicity.',
    section: 'Cooking',
    kicker: 'NYT Cooking',
    author: 'Melissa Clark',
    date: 'Oct. 11, 2026',
    readTime: '5 MIN READ',
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1000&q=80',
    commentCount: 420,
    bodyParagraphs: [
      'Few dishes evoke comforting warmth quite like a crock of French onion soup blanketed in bubbly, toasted Gruyère cheese.',
      'Yet standing over a hot stovetop for 75 minutes, stirring incessantly to prevent thinly sliced yellow onions from scorching, is rarely anyone’s idea of a relaxing weeknight.',
      'The solution? Transferring four pounds of butter-tossed sliced onions into a heavy Dutch oven, baking them uncovered at 400 degrees with occasional tossing, and finishing them with a splash of dry sherry and rich beef consommé.',
      'The result is a silky, intensely savory broth with caramel sweet notes that rivals the finest Parisian bistros.'
    ],
    tags: ['Cooking', 'Recipes', 'French', 'Autumn', 'Dinner']
  }
];

export const SAMPLE_COMMENTS: Record<string, CommentItem[]> = {
  'israeli-election': [
    {
      id: 'c1',
      author: 'David L.',
      location: 'Tel Aviv',
      timeAgo: '2h ago',
      content: 'The fatigue is palpable across all neighborhoods. People just want stability and public servants focused on education and the cost of living rather than coalition brinkmanship.',
      likes: 42,
      isEditorPick: true
    },
    {
      id: 'c2',
      author: 'Sarah M.',
      location: 'Brooklyn, NY',
      timeAgo: '4h ago',
      content: 'A thoughtful analysis by Kingsley. It captures how democratic institutions can become strained when elections become referendum after referendum on individuals rather than platforms.',
      likes: 29
    },
    {
      id: 'c3',
      author: 'Jonathan K.',
      location: 'Jerusalem',
      timeAgo: '6h ago',
      content: 'Turnout will likely be decisive again. Despite the exhaustion, turnout in Israeli elections has historically remained higher than in many Western democracies.',
      likes: 18,
      isEditorPick: true
    }
  ],
  'hero-saudi-yemen': [
    {
      id: 'c4',
      author: 'Tariq A.',
      location: 'Dubai, UAE',
      timeAgo: '1h ago',
      content: 'Infrastructure security across the Gulf is paramount. Glad to hear civilian aviation resumed quickly, but diplomatic channels need redoubled urgency.',
      likes: 67,
      isEditorPick: true
    },
    {
      id: 'c5',
      author: 'Elena R.',
      location: 'Geneva, Switzerland',
      timeAgo: '3h ago',
      content: 'The human cost on both sides cannot be ignored. Every day without a lasting diplomatic settlement is another day vulnerable communities face tragedy.',
      likes: 35
    }
  ],
  'great-read-wilderness': [
    {
      id: 'c6',
      author: 'Marcus Vance',
      location: 'Whitehorse, Yukon',
      timeAgo: '5h ago',
      content: 'As someone who has mushing experience in the subarctic, releasing the dogs was the ultimate act of respect and care. He knew his own chances were slim and gave his animals the only opportunity to survive.',
      likes: 188,
      isEditorPick: true
    },
    {
      id: 'c7',
      author: 'Claire B.',
      location: 'Montreal',
      timeAgo: '7h ago',
      content: 'Chilling, poetic reporting. The line about the final journal entry gave me goosebumps. Dan Bilefsky is a master storyteller.',
      likes: 94
    }
  ]
};
