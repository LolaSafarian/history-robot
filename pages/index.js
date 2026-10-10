import { useState, useEffect, useRef } from "react";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "royalty", label: "Royalty & Leaders" },
  { id: "scientists", label: "Scientists & Inventors" },
  { id: "artists", label: "Artists & Writers" },
  { id: "explorers", label: "Explorers & Adventurers" },
  { id: "sports", label: "Sports Legends" },
  { id: "musicians", label: "Musicians & Performers" },
  { id: "philosophers", label: "Philosophers & Thinkers" },
  { id: "wildwest", label: "Wild West" },
  { id: "australian", label: "Australian Legends" },
  { id: "villains", label: "Villains & Rogues", icon: "⚔️" },
];

const ERAS = [
  { id: "all", label: "All Eras" },
  { id: "ancient", label: "Ancient World", desc: "before 500 AD" },
  { id: "medieval", label: "Medieval", desc: "500–1500" },
  { id: "renaissance", label: "Renaissance & Enlightenment", desc: "1500–1800" },
  { id: "c19", label: "19th Century" },
  { id: "early20", label: "Early 20th Century", desc: "1900–1950" },
  { id: "mid20", label: "Mid-Late 20th Century", desc: "1950+" },
];

const FIGURES = [
  { name: "Vivien Leigh", portraitSrc: "/figures/vivien-leigh.jpg", free: true, category: "musicians", era: "early20", questions: ["What was it like filming Gone with the Wind?", "Tell me about your relationship with Laurence Olivier.", "How did you cope with your mental health struggles?"] },
  { name: "Albert Einstein", portraitSrc: "/figures/einstein.jpg", free: true, category: "scientists", era: "early20", questions: ["Explain your theory of relativity in simple terms.", "What was your relationship with your first wife Mileva like?", "Do you believe in God?"] },
  { name: "Abraham Lincoln", portraitSrc: "/figures/lincoln.jpg", free: true, category: "royalty", era: "c19", questions: ["How did you find the courage to abolish slavery?", "What was your relationship with Mary Todd like?", "How did you cope with the losses of the Civil War?"] },
  { name: "Cleopatra", portraitSrc: "/figures/cleopatra.jpg", free: true, category: "royalty", era: "ancient", questions: ["What was your relationship with Julius Caesar really like?", "How did you maintain power in a male-dominated world?", "Tell me about your death - was it really an asp?"] },
  { name: "Marie Curie", portraitSrc: "/figures/marie-curie.jpg", free: true, category: "scientists", era: "early20", questions: ["How did you discover radium?", "What was it like being a woman in science?", "Did you know the radiation was harming you?"] },
  { name: "Queen Elizabeth I", portraitSrc: "/figures/elizabeth-i.jpg", free: false, category: "royalty", era: "renaissance", questions: ["Why did you never marry?", "Tell me about your rivalry with Mary Queen of Scots.", "How did you defeat the Spanish Armada?"] },
  { name: "Queen Victoria", portraitSrc: "/figures/victoria.jpg", free: false, category: "royalty", era: "c19", questions: ["How did you cope with Prince Albert's death?", "What do you think of being called the 'Grandmother of Europe'?", "Tell me about your relationship with John Brown."] },
  { name: "Empress Josephine", portraitSrc: "/figures/josephine.jpg", free: false, category: "royalty", era: "c19", questions: ["What was Napoleon really like as a husband?", "How did you feel when he divorced you?", "Tell me about your life during the Revolution."] },
  { name: "Florence Nightingale", portraitSrc: "/figures/nightingale.jpg", free: false, category: "scientists", era: "c19", questions: ["What horrors did you witness in the Crimean War?", "How did you revolutionize nursing?", "Why did you reject marriage proposals?"] },
  { name: "Amelia Earhart", portraitSrc: "/figures/earhart.jpg", free: false, category: "explorers", era: "early20", questions: ["What really happened on your final flight?", "How did you become interested in aviation?", "What was it like being a female pilot in the 1930s?"] },
  { name: "Jane Austen", portraitSrc: "/figures/austen.jpg", free: false, category: "artists", era: "c19", questions: ["Which of your characters is most like you?", "Why did you never marry?", "How did you observe society so keenly?"] },
  { name: "Charlotte Bronte", portraitSrc: "/figures/charlotte-bronte.jpg", free: false, category: "artists", era: "c19", questions: ["How much of Jane Eyre is autobiographical?", "What was your relationship with your sisters like?", "Tell me about your unrequited love for Constantin Heger."] },
  { name: "Emily Bronte", portraitSrc: "/figures/emily-bronte.jpg", free: false, category: "artists", era: "c19", questions: ["What inspired the darkness of Wuthering Heights?", "Why were you so reclusive?", "Tell me about your bond with the Yorkshire moors."] },
  { name: "Anne Bronte", portraitSrc: "/figures/anne-bronte.jpg", free: false, category: "artists", era: "c19", questions: ["Do you feel overshadowed by your sisters?", "What message did you want to convey in The Tenant of Wildfell Hall?", "Tell me about your time as a governess."] },
  { name: "Branwell Bronte", portraitSrc: "/figures/branwell-bronte.jpg", free: false, category: "artists", era: "c19", questions: ["Why do you think your artistic career failed?", "Tell me about your struggles with addiction.", "What was it like growing up with such talented sisters?"] },
  { name: "Harriet Tubman", portraitSrc: "/figures/tubman.jpg", free: false, category: "royalty", era: "c19", questions: ["How did you find the courage to escape slavery?", "Tell me about your most dangerous rescue mission.", "What kept you going when the risks were so high?"] },
  { name: "Joan of Arc", portraitSrc: "/figures/joan-of-arc.jpg", free: false, category: "royalty", era: "medieval", questions: ["Tell me about your visions from God.", "Were you afraid when you led the army?", "How did you face your execution?"] },
  { name: "Sojourner Truth", portraitSrc: "/figures/sojourner-truth.jpg", free: false, category: "royalty", era: "c19", questions: ["What inspired your famous 'Ain't I a Woman' speech?", "How did you escape slavery?", "What gave you the strength to keep fighting?"] },
  { name: "Ida B. Wells", portraitSrc: "/figures/ida-wells.jpg", free: false, category: "artists", era: "c19", questions: ["What drove you to investigate lynchings?", "How did you face the threats against your life?", "Tell me about founding the NAACP."] },
  { name: "Josephine Baker", portraitSrc: "/figures/josephine-baker.jpg", free: false, category: "musicians", era: "early20", questions: ["What was it like performing in Paris in the 1920s?", "Tell me about your work in the French Resistance.", "Why did you adopt so many children?"] },
  { name: "Hatshepsut", portraitSrc: "/figures/hatshepsut.jpg", free: false, category: "royalty", era: "ancient", questions: ["How did you become pharaoh as a woman?", "Why did you sometimes dress as a man?", "Tell me about your building projects at Deir el-Bahri."] },
  { name: "Ned Kelly", portraitSrc: "/figures/ned-kelly.jpg", free: false, category: "australian", era: "c19", questions: ["Do you consider yourself a hero or a villain?", "Tell me about the Glenrowan siege.", "What was the meaning behind your famous armor?"] },
  { name: "Winston Churchill", portraitSrc: "/figures/churchill.jpg", free: false, category: "royalty", era: "early20", questions: ["How did you rally Britain during the darkest days of WWII?", "Tell me about your 'black dog' depression.", "What was your relationship with Roosevelt like?"] },
  { name: "Leonardo da Vinci", portraitSrc: "/figures/da-vinci.jpg", free: false, category: "artists", era: "renaissance", questions: ["What secrets does the Mona Lisa hold?", "Why did you leave so many projects unfinished?", "Tell me about your flying machine designs."] },
  { name: "Julius Caesar", portraitSrc: "/figures/caesar.jpg", free: false, category: "royalty", era: "ancient", questions: ["Did you expect Brutus to betray you?", "What was your relationship with Cleopatra like?", "How did you conquer Gaul?"] },
  { name: "Mahatma Gandhi", portraitSrc: "/figures/gandhi.jpg", free: false, category: "royalty", era: "early20", questions: ["How did you develop the philosophy of non-violence?", "What was your time in South Africa like?", "Do you have any regrets about your personal life?"] },
  { name: "Frederick Douglass", portraitSrc: "/figures/frederick-douglass.jpg", free: false, category: "royalty", era: "c19", questions: ["How did you teach yourself to read and write?", "What was your escape from slavery like?", "Tell me about your friendship with Abraham Lincoln."] },
  { name: "William Shakespeare", portraitSrc: "/figures/shakespeare.jpg", free: false, category: "artists", era: "renaissance", questions: ["Who was the 'Dark Lady' of your sonnets?", "Which of your plays is your favorite?", "What was it like writing for the Globe Theatre?"] },
  { name: "Charles Darwin", portraitSrc: "/figures/darwin.jpg", free: false, category: "scientists", era: "c19", questions: ["What was your voyage on the Beagle like?", "How did you reconcile evolution with your faith?", "Tell me about your time in the Galapagos."] },
  { name: "Isaac Newton", portraitSrc: "/figures/newton.jpg", free: false, category: "scientists", era: "renaissance", questions: ["Did an apple really fall on your head?", "Tell me about your rivalry with Leibniz.", "Why did you spend so much time on alchemy?"] },
  { name: "Galileo Galilei", portraitSrc: "/figures/galileo.jpg", free: false, category: "scientists", era: "renaissance", questions: ["How did you feel when the Church forced you to recant?", "What did you see through your telescope?", "Tell me about your time under house arrest."] },
  { name: "Thomas Edison", portraitSrc: "/figures/edison.jpg", free: false, category: "scientists", era: "c19", questions: ["How many experiments did it take to perfect the light bulb?", "Tell me about your rivalry with Tesla.", "What was your most important invention?"] },
  { name: "Nikola Tesla", portraitSrc: "/figures/tesla.jpg", free: false, category: "scientists", era: "early20", questions: ["Why do you think AC is superior to DC?", "Tell me about your vision for wireless energy.", "What was your relationship with Edison really like?"] },
  { name: "Sigmund Freud", portraitSrc: "/figures/freud.jpg", free: false, category: "scientists", era: "early20", questions: ["What is the unconscious mind?", "Tell me about your theory of dreams.", "How did you develop psychoanalysis?"] },
  { name: "Vincent van Gogh", portraitSrc: "/figures/van-gogh.jpg", free: false, category: "artists", era: "c19", questions: ["Why did you cut off your ear?", "What inspired Starry Night?", "Tell me about your relationship with your brother Theo."] },
  { name: "Ludwig van Beethoven", portraitSrc: "/figures/beethoven.jpg", free: false, category: "musicians", era: "c19", questions: ["How did you compose music after going deaf?", "Who was your 'Immortal Beloved'?", "Tell me about writing the Ninth Symphony."] },
  { name: "Oscar Wilde", portraitSrc: "/figures/wilde.jpg", free: false, category: "artists", era: "c19", questions: ["Tell me about your time in Reading Gaol.", "What was your relationship with Lord Alfred Douglas like?", "Which of your witticisms is your favorite?"] },
  { name: "Mark Twain", portraitSrc: "/figures/twain.jpg", free: false, category: "artists", era: "c19", questions: ["What inspired Tom Sawyer and Huckleberry Finn?", "Tell me about your time as a riverboat pilot.", "How do you craft your humor?"] },
  { name: "Henry VIII", portraitSrc: "/figures/henry-viii.jpg", free: false, category: "royalty", era: "renaissance", questions: ["Why did you need so many wives?", "Do you regret executing Anne Boleyn?", "How did you justify breaking from Rome?"] },
  { name: "Gough Whitlam", portraitSrc: "/figures/whitlam.jpg", free: false, category: "australian", era: "mid20", questions: ["How did you feel when you were dismissed?", "What achievement are you most proud of?", "Tell me about your 'It's Time' campaign."] },
  { name: "Don Bradman", portraitSrc: "/figures/bradman.jpg", free: false, category: "australian", era: "early20", questions: ["How did you achieve such an incredible batting average?", "Tell me about the Bodyline series.", "What made Australian cricket so special?"] },
  { name: "Banjo Paterson", portraitSrc: "/figures/banjo-paterson.jpg", free: false, category: "australian", era: "c19", questions: ["What inspired you to write Waltzing Matilda?", "Tell me about the Australian bush.", "Who was the Man from Snowy River?"] },
  { name: "Dame Nellie Melba", portraitSrc: "/figures/melba.jpg", free: false, category: "australian", era: "early20", questions: ["What was it like performing at Covent Garden?", "How did Peach Melba get its name?", "Tell me about your rise to fame."] },
  { name: "Shaka Zulu", portraitSrc: "/figures/shaka-zulu.jpg", free: false, category: "royalty", era: "c19", questions: ["How did you revolutionize Zulu warfare?", "Tell me about building the Zulu nation.", "What drove your military ambitions?"] },
  { name: "Kwame Nkrumah", portraitSrc: "/figures/nkrumah.jpg", free: false, category: "royalty", era: "mid20", questions: ["What was it like leading Ghana to independence?", "Tell me about your vision for Pan-Africanism.", "How did you feel about being overthrown?"] },
  { name: "Ibn Sina", portraitSrc: "/figures/ibn-sina.jpg", free: false, category: "philosophers", era: "medieval", questions: ["Tell me about your Canon of Medicine.", "How did you become a physician so young?", "What is your philosophy of the soul?"] },
  { name: "Saladin", portraitSrc: "/figures/saladin.jpg", free: false, category: "royalty", era: "medieval", questions: ["How did you recapture Jerusalem?", "Tell me about your chivalric code.", "What was your relationship with Richard the Lionheart?"] },
  { name: "Anne Boleyn", portraitSrc: "/figures/anne-boleyn.jpg", free: false, category: "royalty", era: "renaissance", questions: ["Were the charges against you true?", "What was Henry VIII really like?", "How did you face your execution?"] },
  { name: "Charles Dickens", portraitSrc: "/figures/dickens.jpg", free: false, category: "artists", era: "c19", questions: ["How did your childhood in the blacking factory shape your writing?", "Tell me about your secret relationship with Ellen Ternan.", "Which character is most like you?"] },
  { name: "Rosa Parks", portraitSrc: "/figures/rosa-parks.jpg", free: false, category: "royalty", era: "mid20", questions: ["What were you thinking when you refused to give up your seat?", "Tell me about the Montgomery Bus Boycott.", "How did you find such courage?"] },
  { name: "Catherine of Aragon", portraitSrc: "/figures/catherine-aragon.jpg", free: false, category: "royalty", era: "renaissance", questions: ["How did you feel when Henry tried to annul your marriage?", "Tell me about your daughter Mary.", "What kept your faith strong through everything?"] },
  { name: "Catherine Howard", portraitSrc: "/figures/katherine-howard.jpg", free: false, category: "royalty", era: "renaissance", questions: ["Do you think you were treated fairly?", "What was your life at court like?", "Were you guilty of the charges against you?"] },
  { name: "Jane Seymour", portraitSrc: "/figures/jane-seymour.jpg", free: false, category: "royalty", era: "renaissance", questions: ["How did you feel giving Henry the son he wanted?", "What was your relationship with the other wives?", "Tell me about your time at court."] },
  { name: "Anne of Cleves", portraitSrc: "/figures/anne-of-cleves.jpg", free: false, category: "royalty", era: "renaissance", questions: ["How did you feel when Henry rejected you?", "Tell me about your comfortable life after the annulment.", "Were you truly as plain as Henry claimed?"] },
  { name: "Catherine Parr", portraitSrc: "/figures/catherine-parr.jpg", free: false, category: "royalty", era: "renaissance", questions: ["How did you survive Henry VIII?", "Tell me about your religious beliefs.", "What was it like caring for his children?"] },
  { name: "Catherine the Great", portraitSrc: "/figures/catherine-great.jpg", free: false, category: "royalty", era: "renaissance", questions: ["How did you seize power from your husband?", "Tell me about your lovers.", "What was your vision for Russia?"] },
  { name: "Jesse Owens", portraitSrc: "/figures/jesse-owens.jpg", free: false, category: "sports", era: "early20", questions: ["What was it like winning gold in Hitler's Berlin?", "How were you treated when you returned to America?", "Tell me about your friendship with Luz Long."] },
  { name: "Babe Ruth", portraitSrc: "/figures/babe-ruth.jpg", free: false, category: "sports", era: "early20", questions: ["Tell me about your famous 'called shot'.", "What was life like growing up in an orphanage?", "How did you become the Sultan of Swat?"] },
  { name: "Michelangelo", portraitSrc: "/figures/michelangelo.jpg", free: false, category: "artists", era: "renaissance", questions: ["What was it like painting the Sistine Chapel ceiling?", "Tell me about sculpting David.", "How did you see yourself - painter or sculptor?"] },
  { name: "Napoleon Bonaparte", portraitSrc: "/figures/napoleon.jpg", free: false, category: "royalty", era: "c19", questions: ["What went wrong in Russia?", "How did you escape from Elba?", "What was your greatest military victory?"] },
  { name: "Marco Polo", portraitSrc: "/figures/marco-polo.jpg", free: false, category: "explorers", era: "medieval", questions: ["What amazed you most about China?", "Did you really meet Kublai Khan?", "What was the hardest part of your journey?"] },
  { name: "Alexander the Great", portraitSrc: "/figures/alexander-great.jpg", free: false, category: "royalty", era: "ancient", questions: ["What drove you to conquer the world?", "Tell me about your relationship with Hephaestion.", "How did you defeat the Persian Empire?"] },
  { name: "Wolfgang Amadeus Mozart", portraitSrc: "/figures/mozart.jpg", free: false, category: "musicians", era: "renaissance", questions: ["What was it like being a child prodigy?", "Tell me about composing the Requiem.", "What was your rivalry with Salieri really like?"] },
  { name: "Mary Queen of Scots", portraitSrc: "/figures/mary-queen-scots.jpg", free: false, category: "royalty", era: "renaissance", questions: ["Were you involved in Darnley's murder?", "Tell me about your imprisonment in England.", "How did you face your execution?"] },
  { name: "Mary Shelley", portraitSrc: "/figures/mary-shelley.jpg", free: false, category: "artists", era: "c19", questions: ["What inspired you to write Frankenstein?", "Tell me about that summer in Geneva.", "How did losing your children affect you?"] },
  { name: "Lord Byron", portraitSrc: "/figures/lord-byron.jpg", free: false, category: "artists", era: "c19", questions: ["Why were you called 'mad, bad, and dangerous to know'?", "Tell me about your scandalous affairs.", "What drew you to fight for Greek independence?"] },
  { name: "Percy Bysshe Shelley", portraitSrc: "/figures/percy-shelley.jpg", free: false, category: "artists", era: "c19", questions: ["What inspired your radical politics?", "Tell me about your relationship with Mary.", "What does it mean to be a Romantic poet?"] },
  { name: "John Polidori", portraitSrc: "/figures/polidori.jpg", free: false, category: "artists", era: "c19", questions: ["What was it like being Byron's physician?", "Tell me about writing The Vampyre.", "How did that summer in Geneva change literature?"] },
  { name: "Mary Wollstonecraft", portraitSrc: "/figures/mary-wollstonecraft.jpg", free: false, category: "philosophers", era: "renaissance", questions: ["What inspired A Vindication of the Rights of Woman?", "Tell me about your revolutionary ideas on education.", "How did society react to your beliefs?"] },
  { name: "Confucius", portraitSrc: "/figures/confucius.jpg", free: false, category: "philosophers", era: "ancient", questions: ["What is the most important virtue?", "Tell me about your concept of the 'gentleman'.", "How should a ruler govern?"] },
  { name: "Genghis Khan", portraitSrc: "/figures/genghis-khan.jpg", free: false, category: "villains", era: "medieval", questions: ["How did you unite the Mongol tribes?", "What was the secret of your military success?", "Do you regret the destruction you caused?"] },
  { name: "Boudicca", portraitSrc: "/figures/boudicca.jpg", free: false, category: "royalty", era: "ancient", questions: ["What drove you to rebel against Rome?", "Tell me about the destruction of Londinium.", "How do you want to be remembered?"] },
  { name: "Aristotle", portraitSrc: "/figures/aristotle.jpg", free: false, category: "philosophers", era: "ancient", questions: ["What did you learn from Plato?", "Tell me about tutoring Alexander the Great.", "What is the purpose of human life?"] },
  { name: "Charlie Chaplin", portraitSrc: "/figures/charlie-chaplin.jpg", free: false, category: "musicians", era: "early20", questions: ["How did you create the Little Tramp character?", "What was your message in The Great Dictator?", "Tell me about being exiled from America."] },
  { name: "Buster Keaton", portraitSrc: "/figures/buster-keaton.jpg", free: false, category: "musicians", era: "early20", questions: ["How did you do those dangerous stunts?", "Why did they call you 'The Great Stone Face'?", "What was your childhood in vaudeville like?"] },
  { name: "Orson Welles", portraitSrc: "/figures/orson-welles.jpg", free: false, category: "musicians", era: "early20", questions: ["What happened with the War of the Worlds broadcast?", "Why do you think Citizen Kane is so celebrated?", "Tell me about your struggles with Hollywood."] },
  { name: "Spencer Tracy", portraitSrc: "/figures/spencer-tracy.jpg", free: false, category: "musicians", era: "early20", questions: ["What was your secret to naturalistic acting?", "Tell me about your relationship with Katharine Hepburn.", "Which of your roles meant the most to you?"] },
  { name: "W.C. Fields", portraitSrc: "/figures/wc-fields.jpg", free: false, category: "musicians", era: "early20", questions: ["How did you develop your comedic persona?", "Is it true you never worked with children or animals?", "Tell me about your vaudeville days."] },
  { name: "Douglas Fairbanks", portraitSrc: "/figures/douglas-fairbanks.jpg", free: false, category: "musicians", era: "early20", questions: ["What was it like being the King of Hollywood?", "Tell me about founding United Artists.", "How did you do your own stunts?"] },
  { name: "Bette Davis", portraitSrc: "/figures/bette-davis.jpg", free: false, category: "musicians", era: "early20", questions: ["What was your feud with Joan Crawford really about?", "Which role challenged you the most?", "How did you fight the studio system?"] },
  { name: "Katharine Hepburn", portraitSrc: "/figures/katharine-hepburn.jpg", free: false, category: "musicians", era: "early20", questions: ["Why did you always wear trousers?", "Tell me about your relationship with Spencer Tracy.", "How did you overcome being labeled 'box office poison'?"] },
  { name: "Greta Garbo", portraitSrc: "/figures/greta-garbo.jpg", free: false, category: "musicians", era: "early20", questions: ["Why did you really want to be alone?", "What made you retire so young?", "Tell me about making the transition to talkies."] },
  { name: "Rita Hayworth", portraitSrc: "/figures/rita-hayworth.jpg", free: false, category: "musicians", era: "early20", questions: ["What was it like being a pin-up during the war?", "Tell me about your marriage to Orson Welles.", "Did you feel trapped by your image?"] },
  { name: "Hedy Lamarr", portraitSrc: "/figures/hedy-lamarr.jpg", free: false, category: "musicians", era: "early20", questions: ["Tell me about inventing frequency-hopping technology.", "How did you balance being a movie star and inventor?", "What was it like fleeing Nazi Europe?"] },
  { name: "Gloria Swanson", portraitSrc: "/figures/gloria-swanson.jpg", free: false, category: "musicians", era: "early20", questions: ["How did you make your comeback in Sunset Boulevard?", "Tell me about the silent film era.", "What was your relationship with Joseph Kennedy?"] },
  { name: "Ava Gardner", portraitSrc: "/figures/ava-gardner.jpg", free: false, category: "musicians", era: "mid20", questions: ["What was your marriage to Frank Sinatra like?", "Tell me about filming in Spain.", "How did you handle being called the world's most beautiful woman?"] },
  { name: "Alfred Hitchcock", portraitSrc: "/figures/alfred-hitchcock.jpg", free: false, category: "musicians", era: "early20", questions: ["Why do you appear in all your films?", "What is the secret to building suspense?", "Tell me about your relationship with your leading ladies."] },
  { name: "Judith Anderson", portraitSrc: "/figures/judith-anderson.jpg", free: false, category: "australian", era: "early20", questions: ["What was it like playing Mrs. Danvers in Rebecca?", "Tell me about your stage career.", "How did you bring Shakespeare to life?"] },
  { name: "Chips Rafferty", portraitSrc: "/figures/chips-rafferty.jpg", free: false, category: "australian", era: "early20", questions: ["How did you become the face of Australian cinema?", "Tell me about filming The Overlanders.", "What does it mean to be a 'fair dinkum Aussie'?"] },
  { name: "Peter Finch", portraitSrc: "/figures/peter-finch.jpg", free: false, category: "australian", era: "mid20", questions: ["What inspired your famous 'mad as hell' speech in Network?", "Tell me about winning the posthumous Oscar.", "How did growing up in Australia shape you?"] },
  { name: "Noel Coward", portraitSrc: "/figures/noel-coward.jpg", free: false, category: "musicians", era: "early20", questions: ["How did you become the Master?", "Tell me about your wit and sophistication.", "What was your secret wartime work?"] },
  { name: "John Gielgud", portraitSrc: "/figures/john-gielgud.jpg", free: false, category: "musicians", era: "early20", questions: ["What makes a great Hamlet?", "Tell me about your rivalry with Olivier.", "How did you survive the scandal of your arrest?"] },
  { name: "Rex Harrison", portraitSrc: "/figures/rex-harrison.jpg", free: false, category: "musicians", era: "mid20", questions: ["How did you master talk-singing in My Fair Lady?", "Tell me about your six marriages.", "What was Henry Higgins really like to play?"] },
  { name: "David Niven", portraitSrc: "/figures/david-niven.jpg", free: false, category: "musicians", era: "early20", questions: ["Tell me about your wartime service.", "What was Hollywood's golden age really like?", "How did you develop your charming persona?"] },
  { name: "Ada Lovelace", portraitSrc: "/figures/ada-lovelace.jpg", free: false, category: "scientists", era: "c19", questions: ["How did you envision the potential of computing?", "Tell me about your work with Charles Babbage.", "What was it like being Byron's daughter?"] },
  { name: "Louis Pasteur", portraitSrc: "/figures/louis-pasteur.jpg", free: false, category: "scientists", era: "c19", questions: ["How did you develop the germ theory?", "Tell me about creating the rabies vaccine.", "What drove your scientific curiosity?"] },
  { name: "Charles Babbage", portraitSrc: "/figures/charles-babbage.jpg", free: false, category: "scientists", era: "c19", questions: ["Why couldn't you complete the Analytical Engine?", "Tell me about your partnership with Ada Lovelace.", "How did you envision the future of computing?"] },
  { name: "Rosalind Franklin", portraitSrc: "/figures/rosalind-franklin.jpg", free: false, category: "scientists", era: "mid20", questions: ["Do you feel your contribution to DNA was overlooked?", "Tell me about Photo 51.", "What was it like being a woman in science?"] },
  { name: "Alan Turing", portraitSrc: "/figures/alan-turing.jpg", free: false, category: "scientists", era: "early20", questions: ["How did you crack the Enigma code?", "Tell me about your vision for artificial intelligence.", "How did you cope with your persecution?"] },
  { name: "Niels Bohr", portraitSrc: "/figures/niels-bohr.jpg", free: false, category: "scientists", era: "early20", questions: ["Explain your model of the atom.", "What were your debates with Einstein like?", "Tell me about escaping Nazi-occupied Denmark."] },
  { name: "Rembrandt", portraitSrc: "/figures/rembrandt.jpg", free: false, category: "artists", era: "renaissance", questions: ["Why did you paint so many self-portraits?", "Tell me about The Night Watch.", "How did you cope with bankruptcy?"] },
  { name: "Johannes Vermeer", portraitSrc: "/figures/vermeer.jpg", free: false, category: "artists", era: "renaissance", questions: ["How did you capture light so perfectly?", "Tell me about the Girl with a Pearl Earring.", "Why did you paint so few works?"] },
  { name: "Auguste Rodin", portraitSrc: "/figures/rodin.jpg", free: false, category: "artists", era: "c19", questions: ["What does The Thinker represent?", "Tell me about your relationship with Camille Claudel.", "How did you revolutionize sculpture?"] },
  { name: "Paul Gauguin", portraitSrc: "/figures/gauguin.jpg", free: false, category: "artists", era: "c19", questions: ["Why did you abandon your family for Tahiti?", "Tell me about your time with Van Gogh.", "What were you searching for in the South Seas?"] },
  { name: "Henri Matisse", portraitSrc: "/figures/matisse.jpg", free: false, category: "artists", era: "early20", questions: ["What is Fauvism?", "How did you continue creating art while bedridden?", "Tell me about your paper cut-outs."] },
  { name: "Mary Cassatt", portraitSrc: "/figures/mary-cassatt.jpg", free: false, category: "artists", era: "c19", questions: ["What was it like being an American woman among the Impressionists?", "Why did you focus on mothers and children?", "Tell me about your friendship with Degas."] },
  { name: "Artemisia Gentileschi", portraitSrc: "/figures/artemisia-gentileschi.jpg", free: false, category: "artists", era: "renaissance", questions: ["How did you become such a powerful painter?", "Tell me about the trial against Tassi.", "What inspired your fierce heroines?"] },
  { name: "Camille Claudel", portraitSrc: "/figures/camille-claudel.jpg", free: false, category: "artists", era: "c19", questions: ["Tell me about your relationship with Rodin.", "How did you develop your unique sculptural style?", "What happened to lead to your institutionalization?"] },
  { name: "Kathe Kollwitz", portraitSrc: "/figures/kathe-kollwitz.jpg", free: false, category: "artists", era: "early20", questions: ["How did losing your son affect your art?", "Tell me about depicting the suffering of the poor.", "What message did you want your art to convey?"] },
  { name: "Jim Thorpe", portraitSrc: "/figures/jim-thorpe.jpg", free: false, category: "sports", era: "early20", questions: ["How did it feel to have your Olympic medals taken away?", "Tell me about being called the greatest athlete.", "What was your Native American heritage like?"] },
  { name: "Babe Didrikson Zaharias", portraitSrc: "/figures/babe-didrikson.jpg", free: false, category: "sports", era: "early20", questions: ["How did you excel at so many sports?", "Tell me about your Olympic triumphs.", "What was it like dominating women's golf?"] },
  { name: "Jack Johnson", portraitSrc: "/figures/jack-johnson.jpg", free: false, category: "sports", era: "early20", questions: ["What was it like being the first Black heavyweight champion?", "How did you handle the racism you faced?", "Tell me about your flamboyant lifestyle."] },
  { name: "Sonja Henie", portraitSrc: "/figures/sonja-henie.jpg", free: false, category: "sports", era: "early20", questions: ["How did you revolutionize figure skating?", "Tell me about your Hollywood career.", "What was it like winning three Olympic golds?"] },
  { name: "Paavo Nurmi", portraitSrc: "/figures/paavo-nurmi.jpg", free: false, category: "sports", era: "early20", questions: ["How did you dominate distance running?", "Tell me about your training methods.", "What was your relationship with the stopwatch?"] },
  { name: "Duke Kahanamoku", portraitSrc: "/figures/duke-kahanamoku.jpg", free: false, category: "sports", era: "early20", questions: ["How did you spread surfing around the world?", "Tell me about your Olympic swimming career.", "What does the aloha spirit mean to you?"] },
  { name: "Peter Norman", portraitSrc: "/figures/peter-norman.jpg", free: false, category: "australian", era: "mid20", questions: ["Why did you wear the human rights badge on the podium?", "How did Australia treat you after the protest?", "Tell me about your friendship with Tommie Smith and John Carlos."] },
  { name: "Satchel Paige", portraitSrc: "/figures/satchel-paige.jpg", free: false, category: "sports", era: "early20", questions: ["What was it like pitching in the Negro Leagues?", "How did it feel to finally reach the majors?", "Tell me your rules for staying young."] },
  { name: "Helene Mayer", portraitSrc: "/figures/helene-mayer.jpg", free: false, category: "sports", era: "early20", questions: ["Why did you compete for Nazi Germany in 1936?", "What was it like being a Jewish athlete?", "Tell me about your fencing career."] },
  { name: "Eric Liddell", portraitSrc: "/figures/eric-liddell.jpg", free: false, category: "sports", era: "early20", questions: ["Why did you refuse to run on Sunday?", "Tell me about winning Olympic gold.", "What led you to become a missionary in China?"] },
  { name: "Les Darcy", portraitSrc: "/figures/les-darcy.jpg", free: false, category: "australian", era: "early20", questions: ["Why were you called the greatest boxer Australia ever produced?", "Tell me about the controversy of leaving Australia.", "What happened in America?"] },
  { name: "Phar Lap", portraitSrc: "/figures/phar-lap.jpg", free: false, category: "australian", era: "early20", questions: ["What made you such a great racehorse?", "Tell me about winning the Melbourne Cup.", "What do you think really happened in America?"] },
  { name: "Enrico Caruso", portraitSrc: "/figures/caruso.jpg", free: false, category: "musicians", era: "early20", questions: ["How did you become the greatest tenor?", "Tell me about recording and gramophone technology.", "What was it like singing at the Met?"] },
  { name: "Louis Armstrong", portraitSrc: "/figures/louis-armstrong.jpg", free: false, category: "musicians", era: "early20", questions: ["How did you develop your revolutionary trumpet style?", "Tell me about growing up in New Orleans.", "What does jazz mean to you?"] },
  { name: "Bessie Smith", portraitSrc: "/figures/bessie-smith.jpg", free: false, category: "musicians", era: "early20", questions: ["What made you the Empress of the Blues?", "Tell me about your powerful voice.", "How did you cope with the racism of the era?"] },
  { name: "Billie Holiday", portraitSrc: "/figures/billie-holiday.jpg", free: false, category: "musicians", era: "early20", questions: ["What was the meaning behind Strange Fruit?", "Tell me about your struggles with addiction.", "How did you develop your unique singing style?"] },
  { name: "Scott Joplin", portraitSrc: "/figures/scott-joplin.jpg", free: false, category: "musicians", era: "early20", questions: ["How did you create ragtime?", "Tell me about composing The Entertainer.", "What happened to your opera Treemonisha?"] },
  { name: "Al Jolson", portraitSrc: "/figures/al-jolson.jpg", free: false, category: "musicians", era: "early20", questions: ["What was it like starring in the first talkie?", "Tell me about your vaudeville career.", "How do you view your legacy regarding blackface?"] },
  { name: "Maurice Chevalier", portraitSrc: "/figures/chevalier.jpg", free: false, category: "musicians", era: "early20", questions: ["What was it like being a French star in Hollywood?", "Tell me about performing during the war years.", "How did you develop your charming persona?"] },
  { name: "Fats Waller", portraitSrc: "/figures/fats-waller.jpg", free: false, category: "musicians", era: "early20", questions: ["How did you develop your stride piano style?", "Tell me about your sense of humor.", "What inspired Ain't Misbehavin'?"] },
  { name: "Marie Antoinette", portraitSrc: "/figures/marie-antoinette.jpg", free: false, category: "royalty", era: "renaissance", questions: ["Did you really say 'Let them eat cake'?", "What was life at Versailles like?", "How did you face the guillotine?"] },
  { name: "King Louis XVI", portraitSrc: "/figures/louis-xvi.jpg", free: false, category: "royalty", era: "renaissance", questions: ["What went wrong with the French Revolution?", "Tell me about your interest in locksmithing.", "How did you face your execution?"] },
  { name: "Tsar Nicholas II", portraitSrc: "/figures/nicholas-ii.jpg", free: false, category: "royalty", era: "early20", questions: ["Do you feel responsible for the fall of the Romanovs?", "Tell me about your son's hemophilia.", "What happened in that basement in Yekaterinburg?"] },
  { name: "Tsarina Alexandra", portraitSrc: "/figures/tsarina-alexandra.jpg", free: false, category: "royalty", era: "early20", questions: ["Why did you trust Rasputin so completely?", "Tell me about caring for Alexei.", "How did you face the end?"] },
  { name: "Rasputin", portraitSrc: "/figures/rasputin.jpg", free: false, category: "villains", era: "early20", questions: ["How did you heal the Tsarevich?", "Tell me about your mysterious powers.", "Is it true you were so hard to kill?"] },
  { name: "Grand Duchess Olga", portraitSrc: "/figures/olga-romanov.jpg", free: false, category: "royalty", era: "early20", questions: ["What was your childhood in the palace like?", "Tell me about your sisters.", "How did you cope with imprisonment?"] },
  { name: "Grand Duchess Tatiana", portraitSrc: "/figures/tatiana-romanov.jpg", free: false, category: "royalty", era: "early20", questions: ["What was it like being the most beautiful Romanov?", "Tell me about nursing wounded soldiers.", "How did you support your family?"] },
  { name: "Grand Duchess Maria", portraitSrc: "/figures/maria-romanov.jpg", free: false, category: "royalty", era: "early20", questions: ["What was your personality like?", "Tell me about life with your siblings.", "Did you try to befriend the guards?"] },
  { name: "Grand Duchess Anastasia", portraitSrc: "/figures/anastasia-romanov.jpg", free: false, category: "royalty", era: "early20", questions: ["What do you think of all the imposters claiming to be you?", "Tell me about being the family prankster.", "What do you remember of that final night?"] },
  { name: "Tsarevich Alexei", portraitSrc: "/figures/alexei-romanov.jpg", free: false, category: "royalty", era: "early20", questions: ["What was it like living with hemophilia?", "Tell me about your relationship with Rasputin.", "What did you dream of becoming?"] },
  { name: "Louis XVII", portraitSrc: "/figures/louis-xvii.jpg", free: false, category: "royalty", era: "renaissance", questions: ["What happened to you in the Temple prison?", "Tell me about your parents.", "Did you really die there, or escape?"] },
  { name: "Tutankhamun", portraitSrc: "/figures/tutankhamun.jpg", free: false, category: "royalty", era: "ancient", questions: ["What was it like becoming pharaoh so young?", "Tell me about your tomb and treasures.", "How did you really die?"] },
  { name: "Robert Dudley", portraitSrc: "/figures/robert-dudley.jpg", free: false, category: "royalty", era: "renaissance", questions: ["Were you truly in love with Elizabeth?", "What happened to your wife Amy?", "Why didn't the Queen ever marry you?"] },
  { name: "Sir Francis Walsingham", portraitSrc: "/figures/walsingham.jpg", free: false, category: "royalty", era: "renaissance", questions: ["How did you build your spy network?", "Tell me about uncovering the Babington Plot.", "What drove your Protestant zeal?"] },
  { name: "John Brown", portraitSrc: "/figures/john-brown.jpg", free: false, category: "royalty", era: "c19", questions: ["What was your relationship with Queen Victoria really like?", "Tell me about life at Balmoral.", "Why did the court resent you so much?"] },
  { name: "Abdul Karim", portraitSrc: "/figures/abdul-karim.jpg", free: false, category: "royalty", era: "c19", questions: ["How did you become Victoria's Munshi?", "Tell me about teaching the Queen Hindustani.", "How did you handle the racism at court?"] },
  { name: "James Cook", portraitSrc: "/figures/james-cook.jpg", free: false, category: "explorers", era: "renaissance", questions: ["What was it like discovering new lands?", "Tell me about your voyages to the Pacific.", "What really happened in Hawaii?"] },
  { name: "Matthew Flinders", portraitSrc: "/figures/matthew-flinders.jpg", free: false, category: "australian", era: "c19", questions: ["How did you circumnavigate Australia?", "Tell me about your cat Trim.", "What was your imprisonment by the French like?"] },
  { name: "William Bligh", portraitSrc: "/figures/william-bligh.jpg", free: false, category: "explorers", era: "renaissance", questions: ["What really caused the mutiny on the Bounty?", "How did you survive the open boat voyage?", "Tell me about the Rum Rebellion in Australia."] },
  { name: "Ernest Shackleton", portraitSrc: "/figures/shackleton.jpg", free: false, category: "explorers", era: "early20", questions: ["How did you keep your men alive after the Endurance sank?", "Tell me about the journey to South Georgia.", "What drove you to explore Antarctica?"] },
  { name: "Francis Drake", portraitSrc: "/figures/francis-drake.jpg", free: false, category: "explorers", era: "renaissance", questions: ["Tell me about circumnavigating the globe.", "How did you defeat the Spanish Armada?", "Were you a hero or a pirate?"] },
  { name: "Roald Amundsen", portraitSrc: "/figures/amundsen.jpg", free: false, category: "explorers", era: "early20", questions: ["How did you beat Scott to the South Pole?", "Tell me about navigating the Northwest Passage.", "What was your rivalry with Scott like?"] },
  { name: "David Livingstone", portraitSrc: "/figures/livingstone.jpg", free: false, category: "explorers", era: "c19", questions: ["What drove you to explore Africa?", "Tell me about being found by Stanley.", "How did you view your missionary work?"] },
  { name: "Henry Hudson", portraitSrc: "/figures/henry-hudson.jpg", free: false, category: "explorers", era: "renaissance", questions: ["What were you searching for in the Arctic?", "Tell me about discovering the Hudson River.", "What happened when your crew mutinied?"] },
  { name: "Hernan Cortes", portraitSrc: "/figures/cortes.jpg", free: false, category: "villains", era: "renaissance", questions: ["How did you conquer the Aztec Empire?", "Do you feel guilt for the destruction you caused?", "What was your relationship with Malinche?"] },
  { name: "Clark Gable", portraitSrc: "/figures/clark-gable.jpg", free: false, category: "musicians", era: "early20", questions: ["What was it like being the King of Hollywood?", "Tell me about filming Gone with the Wind.", "How did losing Carole Lombard affect you?"] },
  { name: "Carole Lombard", portraitSrc: "/figures/carole-lombard.jpg", free: false, category: "musicians", era: "early20", questions: ["What was your marriage to Clark Gable like?", "Tell me about being the queen of screwball comedy.", "What happened on that final flight?"] },
  { name: "T.E. Lawrence", portraitSrc: "/figures/te-lawrence.jpg", free: false, category: "explorers", era: "early20", questions: ["What was the Arab Revolt really like?", "Do you feel you betrayed the Arabs?", "Why did you try to disappear after the war?"] },
  { name: "Leo Tolstoy", portraitSrc: "/figures/tolstoy.jpg", free: false, category: "artists", era: "c19", questions: ["What inspired War and Peace?", "Tell me about your spiritual crisis.", "Why did you renounce your wealth?"] },
  { name: "Fyodor Dostoevsky", portraitSrc: "/figures/dostoevsky.jpg", free: false, category: "artists", era: "c19", questions: ["How did your mock execution change you?", "What inspired Crime and Punishment?", "Tell me about your gambling addiction."] },
  { name: "Victor Hugo", portraitSrc: "/figures/victor-hugo.jpg", free: false, category: "artists", era: "c19", questions: ["What inspired Les Miserables?", "Tell me about your exile from France.", "Why did you fight for the poor and oppressed?"] },
  { name: "Franz Kafka", portraitSrc: "/figures/kafka.jpg", free: false, category: "artists", era: "early20", questions: ["What does The Metamorphosis mean?", "Tell me about your relationship with your father.", "Why did you want your works burned?"] },
  { name: "Alexandre Dumas", portraitSrc: "/figures/dumas.jpg", free: false, category: "artists", era: "c19", questions: ["How did you write so many books?", "Tell me about creating The Three Musketeers.", "What was your heritage and how did it affect you?"] },
  { name: "Socrates", portraitSrc: "/figures/socrates.jpg", free: false, category: "philosophers", era: "ancient", questions: ["Why did you choose death over exile?", "What is the Socratic method?", "Tell me about your relationship with Plato."] },
  { name: "Plato", portraitSrc: "/figures/plato.jpg", free: false, category: "philosophers", era: "ancient", questions: ["What is the world of Forms?", "Tell me about your Academy.", "What did you learn from Socrates?"] },
  { name: "Pythagoras", portraitSrc: "/figures/pythagoras.jpg", free: false, category: "philosophers", era: "ancient", questions: ["Is the theorem really yours?", "Tell me about your mystical beliefs.", "Why was your school so secretive?"] },
  { name: "Archimedes", portraitSrc: "/figures/archimedes.jpg", free: false, category: "scientists", era: "ancient", questions: ["Did you really shout 'Eureka' in the bath?", "Tell me about your war machines.", "How did you discover the lever principle?"] },
  { name: "Hippocrates", portraitSrc: "/figures/hippocrates.jpg", free: false, category: "scientists", era: "ancient", questions: ["What is the Hippocratic Oath?", "How did you approach medicine differently?", "Tell me about the four humors."] },
  { name: "Virginia Woolf", portraitSrc: "/figures/virginia-woolf.jpg", free: false, category: "artists", era: "early20", questions: ["What is stream of consciousness writing?", "Tell me about the Bloomsbury Group.", "How did you cope with your mental illness?"] },
  { name: "George Orwell", portraitSrc: "/figures/george-orwell.jpg", free: false, category: "artists", era: "early20", questions: ["What inspired 1984?", "Tell me about fighting in the Spanish Civil War.", "Is Big Brother watching us now?"] },
  { name: "Arthur Conan Doyle", portraitSrc: "/figures/arthur-conan-doyle.jpg", free: false, category: "artists", era: "c19", questions: ["Why did you try to kill Sherlock Holmes?", "Tell me about your belief in spiritualism.", "How did you create the great detective?"] },
  { name: "H.G. Wells", portraitSrc: "/figures/hg-wells.jpg", free: false, category: "artists", era: "early20", questions: ["How did you envision the future?", "Tell me about writing The War of the Worlds.", "What inspired The Time Machine?"] },
  { name: "Rudyard Kipling", portraitSrc: "/figures/rudyard-kipling.jpg", free: false, category: "artists", era: "c19", questions: ["What inspired The Jungle Book?", "How do you view your colonial writings now?", "Tell me about losing your son in WWI."] },
  { name: "Lewis Carroll", portraitSrc: "/figures/lewis-carroll.jpg", free: false, category: "artists", era: "c19", questions: ["What inspired Alice in Wonderland?", "Tell me about your friendship with Alice Liddell.", "What do the nonsense elements mean?"] },
  { name: "Thomas Hardy", portraitSrc: "/figures/thomas-hardy.jpg", free: false, category: "artists", era: "c19", questions: ["Why are your novels so tragic?", "Tell me about Wessex.", "Why did you stop writing novels?"] },
  { name: "Ernest Hemingway", portraitSrc: "/figures/hemingway.jpg", free: false, category: "artists", era: "early20", questions: ["What shaped your sparse writing style?", "Tell me about your time in Paris.", "How did the wars affect you?"] },
  { name: "Edgar Allan Poe", portraitSrc: "/figures/edgar-allan-poe.jpg", free: false, category: "artists", era: "c19", questions: ["Where did your dark imagination come from?", "Tell me about writing The Raven.", "What really happened in your final days?"] },
  { name: "F. Scott Fitzgerald", portraitSrc: "/figures/fitzgerald.jpg", free: false, category: "artists", era: "early20", questions: ["What was the Jazz Age really like?", "Tell me about your relationship with Zelda.", "Why did you write The Great Gatsby?"] },
  { name: "John Steinbeck", portraitSrc: "/figures/steinbeck.jpg", free: false, category: "artists", era: "early20", questions: ["What inspired The Grapes of Wrath?", "Tell me about the working people of California.", "How did you research your novels?"] },
  { name: "Jack London", portraitSrc: "/figures/jack-london.jpg", free: false, category: "artists", era: "early20", questions: ["What was the Klondike Gold Rush like?", "Tell me about your socialist beliefs.", "How did you become a writer?"] },
  { name: "Louisa May Alcott", portraitSrc: "/figures/louisa-may-alcott.jpg", free: false, category: "artists", era: "c19", questions: ["How much of Little Women is autobiographical?", "Tell me about your work as a Civil War nurse.", "What were your views on women's rights?"] },
  { name: "Laura Ingalls Wilder", portraitSrc: "/figures/laura-ingalls-wilder.jpg", free: false, category: "artists", era: "early20", questions: ["How accurately do your books portray pioneer life?", "Tell me about your childhood on the prairie.", "What was your relationship with Rose like?"] },
  { name: "Helen Keller", portraitSrc: "/figures/helen-keller.jpg", free: false, category: "artists", era: "early20", questions: ["What was it like when you first understood language?", "Tell me about your relationship with Anne Sullivan.", "How did you become an activist?"] },
  { name: "Anne Sullivan", portraitSrc: "/figures/anne-sullivan.jpg", free: false, category: "artists", era: "early20", questions: ["How did you break through to Helen?", "Tell me about your own struggles with blindness.", "What was your teaching method?"] },
  { name: "Martha Gellhorn", portraitSrc: "/figures/martha-gellhorn.jpg", free: false, category: "artists", era: "early20", questions: ["What was it like being a female war correspondent?", "Tell me about your marriage to Hemingway.", "What conflict affected you most?"] },
  { name: "Gertrude Bell", portraitSrc: "/figures/gertrude-bell.jpg", free: false, category: "explorers", era: "early20", questions: ["How did you help create modern Iraq?", "Tell me about your Arabian travels.", "What was your relationship with T.E. Lawrence?"] },
  { name: "Agatha Christie", portraitSrc: "/figures/agatha-christie.jpg", free: false, category: "artists", era: "early20", questions: ["How do you plot your mysteries?", "Tell me about your famous disappearance.", "Who is your favorite detective - Poirot or Marple?"] },
  { name: "George Eliot", portraitSrc: "/figures/george-eliot.jpg", free: false, category: "artists", era: "c19", questions: ["Why did you write under a male name?", "Tell me about your unconventional relationship.", "What inspired Middlemarch?"] },
  { name: "Colette", portraitSrc: "/figures/colette.jpg", free: false, category: "artists", era: "early20", questions: ["Tell me about your scandalous life in Paris.", "How did you break free from Willy?", "What inspired Gigi?"] },
  { name: "Edith Wharton", portraitSrc: "/figures/edith-wharton.jpg", free: false, category: "artists", era: "early20", questions: ["What was New York society really like?", "Tell me about writing The Age of Innocence.", "How did you escape your unhappy marriage?"] },
  { name: "George Sand", portraitSrc: "/figures/george-sand.jpg", free: false, category: "artists", era: "c19", questions: ["Why did you dress as a man?", "Tell me about your affair with Chopin.", "How did you become so prolific?"] },
  { name: "George Washington", portraitSrc: "/figures/george-washington.jpg", free: false, category: "royalty", era: "renaissance", questions: ["How did you decide to step down after two terms?", "What was crossing the Delaware really like?", "Tell me about your teeth."] },
  { name: "Thomas Jefferson", portraitSrc: "/figures/thomas-jefferson.jpg", free: false, category: "royalty", era: "renaissance", questions: ["How do you reconcile writing about liberty while owning slaves?", "Tell me about designing Monticello.", "What was your relationship with Sally Hemings?"] },
  { name: "Theodore Roosevelt", portraitSrc: "/figures/theodore-roosevelt.jpg", free: false, category: "royalty", era: "early20", questions: ["Tell me about leading the Rough Riders.", "How did you survive being shot during a speech?", "What drove your conservation efforts?"] },
  { name: "Franklin D. Roosevelt", portraitSrc: "/figures/franklin-roosevelt.jpg", free: false, category: "royalty", era: "early20", questions: ["How did you lead America through the Depression?", "Tell me about your relationship with Eleanor.", "How did you hide your polio from the public?"] },
  { name: "Billy the Kid", portraitSrc: "/figures/billy-the-kid.jpg", free: false, category: "wildwest", era: "c19", questions: ["How many men did you really kill?", "Tell me about the Lincoln County War.", "What was Pat Garrett like?"] },
  { name: "Jesse James", portraitSrc: "/figures/jesse-james.jpg", free: false, category: "wildwest", era: "c19", questions: ["Were you a Robin Hood or just an outlaw?", "Tell me about your gang's most daring robbery.", "How did you feel about being betrayed?"] },
  { name: "Doc Holliday", portraitSrc: "/figures/doc-holliday.jpg", free: false, category: "wildwest", era: "c19", questions: ["What really happened at the O.K. Corral?", "Tell me about your friendship with Wyatt Earp.", "How did tuberculosis shape your life?"] },
  { name: "Butch Cassidy", portraitSrc: "/figures/butch-cassidy.jpg", free: false, category: "wildwest", era: "c19", questions: ["What happened to you in Bolivia?", "Tell me about the Wild Bunch.", "Did you really die there or escape?"] },
  { name: "Belle Starr", portraitSrc: "/figures/belle-starr.jpg", free: false, category: "wildwest", era: "c19", questions: ["How did you become the Bandit Queen?", "Tell me about your outlaw husbands.", "Who do you think killed you?"] },
  { name: "Wyatt Earp", portraitSrc: "/figures/wyatt-earp.jpg", free: false, category: "wildwest", era: "c19", questions: ["What really happened at the O.K. Corral?", "Tell me about your vendetta ride.", "Were you a hero or a villain?"] },
  { name: "Bass Reeves", portraitSrc: "/figures/bass-reeves.jpg", free: false, category: "wildwest", era: "c19", questions: ["What was it like being a Black lawman in the West?", "How many outlaws did you bring in?", "Tell me about arresting your own son."] },
  { name: "Calamity Jane", portraitSrc: "/figures/calamity-jane.jpg", free: false, category: "wildwest", era: "c19", questions: ["What was your relationship with Wild Bill Hickok?", "Tell me about scouting for the Army.", "How did you get your nickname?"] },
  { name: "Annie Oakley", portraitSrc: "/figures/annie-oakley.jpg", free: false, category: "wildwest", era: "c19", questions: ["How did you become such an amazing shot?", "Tell me about Buffalo Bill's Wild West Show.", "What was your rivalry with Lillian Smith like?"] },
  { name: "Sitting Bull", portraitSrc: "/figures/sitting-bull.jpg", free: false, category: "wildwest", era: "c19", questions: ["What was the Battle of Little Bighorn like?", "Tell me about the Ghost Dance movement.", "How do you want your people to be remembered?"] },
];

export default function Home() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const [displayedChat, setDisplayedChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeFigure, setActiveFigure] = useState(null);
  const [showPaywall, setShowPaywall] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedEra, setSelectedEra] = useState("all");

  const chatEndRef = useRef(null);
  const typingIntervalRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [displayedChat, loading]);

  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (activeFigure) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [activeFigure]);

  const filteredFigures = FIGURES.filter((f) => {
    const categoryMatch = selectedCategory === "all" || f.category === selectedCategory;
    const eraMatch = selectedEra === "all" || f.era === selectedEra;
    return categoryMatch && eraMatch;
  });

  function openFigure(f) {
    if (!f.free) {
      setShowPaywall(true);
      return;
    }
    setActiveFigure(f);
    setChat([]);
    setDisplayedChat([{
      role: "assistant",
      text: `*settles into character*\n\nGreetings. I am ${f.name}. What would you like to know?`
    }]);
    setInput("");
    setError("");
    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
  }

  function closeModal() {
    setActiveFigure(null);
    setChat([]);
    setDisplayedChat([]);
    setInput("");
    setError("");
    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
  }

  function typeAssistantMessage(fullText) {
    const tokens = [];
    const lines = fullText.split("\n");
    lines.forEach((line, li) => {
      const words = line.split(/\s+/).filter(Boolean);
      words.forEach((w) => tokens.push({ type: "word", value: w }));
      if (li < lines.length - 1) tokens.push({ type: "newline" });
    });

    if (!tokens.length) {
      setDisplayedChat((prev) => [...prev, { role: "assistant", text: fullText }]);
      return;
    }

    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);

    setDisplayedChat((prev) => [...prev, { role: "assistant", text: "" }]);

    let tokenIndex = 0;
    typingIntervalRef.current = setInterval(() => {
      tokenIndex++;
      setDisplayedChat((prev) => {
        const updated = [...prev];
        const lastIndex = updated.length - 1;
        if (lastIndex < 0 || updated[lastIndex].role !== "assistant") return prev;

        let rebuilt = "";
        let lastWasWord = false;
        tokens.slice(0, tokenIndex).forEach((tok) => {
          if (tok.type === "newline") {
            rebuilt += "\n";
            lastWasWord = false;
          } else {
            if (lastWasWord) rebuilt += " ";
            rebuilt += tok.value;
            lastWasWord = true;
          }
        });

        updated[lastIndex] = { ...updated[lastIndex], text: rebuilt };
        return updated;
      });

      if (tokenIndex >= tokens.length) {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
      }
    }, 140);
  }

  function renderMessageText(text, isLast) {
    const paragraphs = text.split("\n").filter((p) => p.trim() !== "");
    return (
      <div>
        {paragraphs.map((para, pi) => {
          const trimmed = para.trim();
          const isAction = trimmed.startsWith("*") && trimmed.endsWith("*") && trimmed.length > 2;
          return (
            <p
              key={pi}
              style={{
                margin: 0,
                marginBottom: isAction ? 10 : 8,
                paddingBottom: isAction ? 10 : 0,
                borderBottom: isAction ? "1px solid rgba(255,255,255,0.12)" : "none",
                fontStyle: isAction ? "italic" : "normal",
                opacity: isAction ? 0.72 : 1,
                fontSize: isAction ? 13 : 15,
                lineHeight: 1.7,
              }}
            >
              {trimmed}
              {isLast && pi === paragraphs.length - 1 && (
                <span style={styles.cursor}>|</span>
              )}
            </p>
          );
        })}
      </div>
    );
  }

  async function sendMessage(message) {
    if (!message.trim() || loading || !activeFigure) return;

    setError("");
    setLoading(true);
    setInput("");

    setChat((prev) => [...prev, { role: "user", text: message }]);
    setDisplayedChat((prev) => [...prev, { role: "user", text: message }]);

    try {
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, figure: activeFigure.name }),
      });

      const data = await resp.json();

      if (!resp.ok) {
        const errorMsg = data?.error || "Something went wrong.";
        setError(errorMsg);
        setDisplayedChat((prev) => [...prev, { role: "assistant", text: errorMsg }]);
      } else {
        const replyText = data.reply || "(No reply)";
        setChat((prev) => [...prev, { role: "assistant", text: replyText }]);
        setTimeout(() => typeAssistantMessage(replyText), 400);
      }
    } catch (e) {
      const errorMsg = "Network error. Try again.";
      setError(errorMsg);
      setDisplayedChat((prev) => [...prev, { role: "assistant", text: errorMsg }]);
    } finally {
      setLoading(false);
    }
  }

  async function send() {
    sendMessage(input.trim());
  }

  function handleSuggestedQuestion(question) {
    sendMessage(question);
  }

  function onKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  const isVillain = activeFigure?.category === "villains";

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.h1}>History Robot</h1>
        <p style={styles.subtitle}>Choose a historical figure to begin chatting</p>

        {/* Category Filter */}
        <div style={styles.filterSection}>
          <div style={styles.filterRow}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  ...styles.filterBtn,
                  ...(selectedCategory === cat.id ? styles.filterBtnActive : {}),
                }}
              >
                {cat.icon && <span style={{ marginRight: 4 }}>{cat.icon}</span>}
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Era Filter */}
        <div style={styles.filterSection}>
          <div style={styles.filterRow}>
            {ERAS.map((era) => (
              <button
                key={era.id}
                type="button"
                onClick={() => setSelectedEra(era.id)}
                style={{
                  ...styles.filterBtn,
                  ...(selectedEra === era.id ? styles.filterBtnActive : {}),
                }}
              >
                {era.label}
              </button>
            ))}
          </div>
        </div>

        <div style={styles.grid}>
          {filteredFigures.map((f) => (
            <button
              type="button"
              key={f.name}
              onClick={() => f.free ? openFigure(f) : setShowPaywall(true)}
              style={styles.figureBtn}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.4)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,0,0,0.3)"; }}
            >
              <div style={styles.imgWrap}>
                <img src={f.portraitSrc} alt={f.name} style={styles.img} />
                {!f.free && <div style={styles.lockOverlay}>🔒</div>}
                {f.category === "villains" && <div style={styles.villainBadge}>⚔️</div>}
              </div>
              <div style={styles.figureName}>{f.name}</div>
            </button>
          ))}
          {filteredFigures.length === 0 && (
            <div style={styles.noResults}>No figures match the selected filters.</div>
          )}
        </div>
      </div>

      {/* CHAT MODAL */}
      {activeFigure && (
        <div style={styles.modalBackdrop} onClick={closeModal}>
          <div style={styles.modalBox} onClick={(e) => e.stopPropagation()}>

            <div style={{
              ...styles.modalHeader,
              ...(isVillain ? styles.villainHeader : {}),
            }}>
              <div style={styles.modalFigureInfo}>
                <img
                  src={activeFigure.portraitSrc}
                  alt={activeFigure.name}
                  style={{
                    ...styles.modalPortrait,
                    ...(isVillain ? styles.villainPortrait : {}),
                  }}
                />
                <div>
                  <div style={styles.modalFigureName}>
                    {isVillain && <span style={{ marginRight: 6 }}>⚔️</span>}
                    {activeFigure.name}
                  </div>
                  <div style={styles.modalFigureStatus}>● Online</div>
                </div>
              </div>
              <button style={styles.closeBtn} onClick={closeModal}>✕</button>
            </div>

            <div style={styles.chat}>
              {displayedChat.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    ...styles.bubble,
                    ...(msg.role === "user" ? styles.userBubble : styles.botBubble),
                    ...(msg.role === "assistant" && isVillain ? styles.villainBubble : {}),
                    animation: "fadeUp 0.35s ease-out",
                  }}
                >
                  <div style={styles.role}>
                    {msg.role === "user" ? "You" : activeFigure.name}
                  </div>
                  <div style={styles.text}>
                    {msg.role === "assistant"
                      ? renderMessageText(msg.text, i === displayedChat.length - 1)
                      : msg.text}
                  </div>
                </div>
              ))}

              {loading && (
                <div style={{
                  ...styles.bubble,
                  ...styles.botBubble,
                  ...(isVillain ? styles.villainBubble : {}),
                }}>
                  <div style={styles.role}>{activeFigure.name}</div>
                  <div style={{ display: "flex", gap: 6, alignItems: "center", padding: "4px 0" }}>
                    <span style={{ ...styles.dot, animationDelay: "0ms", ...(isVillain ? styles.villainDot : {}) }} />
                    <span style={{ ...styles.dot, animationDelay: "180ms", ...(isVillain ? styles.villainDot : {}) }} />
                    <span style={{ ...styles.dot, animationDelay: "360ms", ...(isVillain ? styles.villainDot : {}) }} />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Suggested Questions */}
            {displayedChat.length === 1 && activeFigure.questions && (
              <div style={styles.suggestedSection}>
                <div style={styles.suggestedLabel}>Suggested questions:</div>
                <div style={styles.suggestedButtons}>
                  {activeFigure.questions.map((q, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleSuggestedQuestion(q)}
                      style={{
                        ...styles.suggestedBtn,
                        ...(isVillain ? styles.villainSuggestedBtn : {}),
                      }}
                      disabled={loading}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {error && <div style={styles.error}>{error}</div>}

            <div style={styles.inputRow}>
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder={`Ask ${activeFigure.name} anything...`}
                style={styles.input}
                rows={2}
              />
              <div style={styles.inputButtons}>
                <button
                  type="button"
                  onClick={send}
                  style={{
                    ...styles.sendBtn,
                    ...(isVillain ? styles.villainSendBtn : {}),
                  }}
                  disabled={loading}
                >
                  {loading ? "..." : "Send"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setChat([]);
                    setDisplayedChat([{ role: "assistant", text: `*settles into character*\n\nGreetings. I am ${activeFigure.name}. What would you like to know?` }]);
                    setInput("");
                    setError("");
                  }}
                  style={styles.newChatBtn}
                >
                  New Chat
                </button>
              </div>
            </div>
            <p style={styles.hint}>Enter to send · Shift+Enter for new line</p>
          </div>
        </div>
      )}

      {/* PAYWALL MODAL */}
      {showPaywall && (
        <div style={styles.modalBackdrop} onClick={() => setShowPaywall(false)}>
          <div style={{ ...styles.modalBox, maxWidth: 440, padding: 40, textAlign: "center" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>🔒</div>
            <h2 style={{ margin: "0 0 12px", fontSize: 22 }}>Premium Figure</h2>
            <p style={{ opacity: 0.8, marginBottom: 28, lineHeight: 1.6, fontSize: 15 }}>
              This historical figure is part of the History Robot premium collection.
              Upgrade to unlock 140+ figures and have unlimited conversations with history.
            </p>
            <button style={styles.paywallPrimary} onClick={() => setShowPaywall(false)}>
              Upgrade to Premium
            </button>
            <button style={styles.paywallSecondary} onClick={() => setShowPaywall(false)}>
              Maybe Later
            </button>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink {
          0%, 80%, 100% { opacity: 0.3; }
          40% { opacity: 1; }
        }
        @keyframes pulse {
          0%, 60%, 100% { transform: scale(0.8); opacity: 0.4; }
          30% { transform: scale(1.3); opacity: 1; }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(30px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        body { margin: 0; }
        * { box-sizing: border-box; }
      `}</style>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: 16,
    background: "#0b0f19",
    color: "white",
    fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
  },
  card: {
    width: "100%",
    maxWidth: 1200,
    margin: "0 auto",
    background: "#121a2a",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 16,
    padding: 24,
  },
  h1: { margin: "0 0 4px", fontSize: 28 },
  subtitle: { margin: "0 0 20px", opacity: 0.6, fontSize: 15 },

  // Filter styles
  filterSection: {
    marginBottom: 12,
  },
  filterRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },
  filterBtn: {
    padding: "8px 14px",
    borderRadius: 20,
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(255,255,255,0.05)",
    color: "rgba(255,255,255,0.7)",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 500,
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
  },
  filterBtnActive: {
    background: "#4da6ff",
    borderColor: "#4da6ff",
    color: "white",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
    gap: 12,
    marginTop: 16,
  },
  figureBtn: {
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.1)",
    padding: 8,
    background: "#0e1526",
    cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    boxShadow: "0 4px 14px rgba(0,0,0,0.3)",
    textAlign: "center",
    color: "white",
  },
  imgWrap: {
    width: "100%",
    aspectRatio: "1 / 1",
    borderRadius: 8,
    overflow: "hidden",
    background: "#111827",
    marginBottom: 7,
    position: "relative",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "top",
    display: "block",
  },
  lockOverlay: {
    position: "absolute",
    top: 5, right: 5,
    fontSize: 12,
    background: "rgba(0,0,0,0.65)",
    borderRadius: 5,
    padding: "2px 4px",
  },
  villainBadge: {
    position: "absolute",
    top: 5, left: 5,
    fontSize: 12,
    background: "rgba(139, 0, 0, 0.85)",
    borderRadius: 5,
    padding: "2px 4px",
  },
  figureName: {
    fontSize: 11,
    lineHeight: 1.3,
    fontWeight: 500,
    color: "rgba(255,255,255,0.85)",
  },
  noResults: {
    gridColumn: "1 / -1",
    textAlign: "center",
    padding: 40,
    opacity: 0.5,
    fontSize: 15,
  },

  // Modal
  modalBackdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.78)",
    backdropFilter: "blur(5px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: 16,
  },
  modalBox: {
    width: "100%",
    maxWidth: 620,
    maxHeight: "90vh",
    background: "#121a2a",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 18,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    animation: "modalIn 0.3s ease",
  },
  modalHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 20px",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    flexShrink: 0,
    background: "#0e1526",
  },
  villainHeader: {
    background: "linear-gradient(135deg, #2d0a0a 0%, #1a0505 100%)",
    borderBottom: "1px solid rgba(139, 0, 0, 0.3)",
  },
  modalFigureInfo: {
    display: "flex",
    alignItems: "center",
    gap: 14,
  },
  modalPortrait: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    objectFit: "cover",
    objectPosition: "top",
    border: "2px solid #4da6ff",
  },
  villainPortrait: {
    border: "2px solid #8b0000",
  },
  modalFigureName: {
    fontSize: 17,
    fontWeight: 600,
    color: "white",
    marginBottom: 2,
  },
  modalFigureStatus: {
    fontSize: 12,
    color: "#4ade80",
  },
  closeBtn: {
    background: "rgba(255,255,255,0.08)",
    border: "none",
    color: "rgba(255,255,255,0.6)",
    width: 32,
    height: 32,
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: 14,
  },
  chat: {
    flex: 1,
    overflowY: "auto",
    padding: "14px 16px",
    minHeight: 200,
    maxHeight: "calc(90vh - 320px)",
  },
  bubble: {
    padding: "10px 14px",
    borderRadius: 12,
    marginBottom: 10,
    whiteSpace: "pre-wrap",
  },
  userBubble: {
    background: "rgba(255,255,255,0.08)",
    marginLeft: 48,
  },
  botBubble: {
    background: "rgba(0, 160, 255, 0.12)",
    marginRight: 48,
  },
  villainBubble: {
    background: "rgba(139, 0, 0, 0.2)",
  },
  role: {
    fontSize: 11,
    opacity: 0.65,
    marginBottom: 5,
    fontWeight: 600,
    letterSpacing: "0.5px",
    textTransform: "uppercase",
  },
  text: { fontSize: 15, lineHeight: 1.5 },
  cursor: {
    marginLeft: 2,
    animation: "blink 1s steps(2, start) infinite",
  },
  dot: {
    display: "inline-block",
    width: 7, height: 7,
    borderRadius: "50%",
    background: "#4da6ff",
    animation: "pulse 1.2s ease-in-out infinite",
  },
  villainDot: {
    background: "#8b0000",
  },

  // Suggested questions
  suggestedSection: {
    padding: "12px 16px",
    borderTop: "1px solid rgba(255,255,255,0.08)",
    flexShrink: 0,
  },
  suggestedLabel: {
    fontSize: 12,
    opacity: 0.5,
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  suggestedButtons: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  suggestedBtn: {
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid rgba(77, 166, 255, 0.3)",
    background: "rgba(77, 166, 255, 0.1)",
    color: "rgba(255,255,255,0.85)",
    cursor: "pointer",
    fontSize: 13,
    textAlign: "left",
    transition: "all 0.2s ease",
  },
  villainSuggestedBtn: {
    border: "1px solid rgba(139, 0, 0, 0.4)",
    background: "rgba(139, 0, 0, 0.15)",
  },

  error: {
    margin: "0 16px 8px",
    padding: 10,
    borderRadius: 10,
    background: "rgba(255,80,80,0.15)",
    border: "1px solid rgba(255,80,80,0.35)",
    fontSize: 14,
    flexShrink: 0,
  },
  inputRow: {
    display: "flex",
    gap: 8,
    padding: "12px 16px 4px",
    borderTop: "1px solid rgba(255,255,255,0.08)",
    flexShrink: 0,
    alignItems: "flex-end",
  },
  input: {
    flex: 1,
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.15)",
    background: "#0e1526",
    color: "white",
    resize: "none",
    fontSize: 15,
    fontFamily: "inherit",
    lineHeight: 1.5,
  },
  inputButtons: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  sendBtn: {
    padding: "9px 22px",
    borderRadius: 10,
    border: "none",
    background: "#4da6ff",
    color: "white",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 14,
    whiteSpace: "nowrap",
  },
  villainSendBtn: {
    background: "#8b0000",
  },
  newChatBtn: {
    padding: "8px 22px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(255,255,255,0.07)",
    color: "rgba(255,255,255,0.65)",
    cursor: "pointer",
    fontSize: 13,
    whiteSpace: "nowrap",
  },
  hint: {
    margin: "4px 16px 10px",
    opacity: 0.35,
    fontSize: 11,
    flexShrink: 0,
  },
  paywallPrimary: {
    display: "block",
    width: "100%",
    padding: "14px 0",
    borderRadius: 12,
    border: "none",
    background: "#4da6ff",
    color: "white",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 15,
    marginBottom: 10,
  },
  paywallSecondary: {
    display: "block",
    width: "100%",
    padding: "12px 0",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.15)",
    background: "transparent",
    color: "rgba(255,255,255,0.6)",
    cursor: "pointer",
    fontSize: 14,
  },
};
