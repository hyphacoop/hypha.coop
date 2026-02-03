---
image: "/assets/images/social/dripline/2025-10-01-in-the-widening-gyre-or-thoughts-on-our-ai-epoch.webp"
title: In the widening gyre or thoughts on our AI epoch
author: Andi Argast
date: 2025-10-01
acknowledgement: 
excerpt: Text about artificial intelligence mostly written by a human

atUri: "at://did:plc:rxduhzsfgfpl2glle7vagcwl/site.standard.document/3mdw2sugedp23"
---

<figure class="pb4">
    <div class='flex items-center justify-center' style="width: 100%;">

        <img class="w-100" src="{{ 'assets/images/posts/2025-10-01-Stocksy_txpa2b3421acXB400_Medium_2601858.jpg' | relative_url }}" alt="A mannequin hand against a neutral background, cut off at the wrist and attached to a flat circular metal plate with bolts, giving it a mechanical, prosthetic-like appearance."/>
    </div>
      <figcaption>
            Image by <a href="https://www.stocksy.com/Frenchkellie/">French Anderson Ltd</a> via <a href="https://www.stocksy.com">Stocksy</a>
    
        </figcaption>
</figure>

### {{ page.excerpt }}

Despite the mounting noise, a precise definition of 'artificial intelligence,' a clear signal for what these words actually mean, remains elusive. More academic types prefer the specificity of terms such as machine learning and large language models[^1] when talking about the dominant models in use today, while writing aimed at general audiences often eschews definitions altogether, lumping in the above concepts alongside various processes of automation and workflow improvements. While a lack of clarity for terms that are supposedly technical (and therefore, seem like they *should* have some specificity) is nothing new, these "[floating signifiers](https://en.wikipedia.org/wiki/Floating_signifier)" are most evident in new and often highly capitalized technologies. This same definitional slight of hand is also evident when describing Web3 technologies[^2], a space where Hypha members have gained deep expertise and which, like AI, contains polarizing perspectives with trustlessness and technical autonomy on one side and ecological ruin and gross speculation on the other.

As a technology focused co-op, Hypha members' responses to "AI everything", as I like to call it, run the gamut from rapidly ideating a Hypha AI service offering, to using AI as a consistent and crucial coding partner, to tentative curiosity, to distaste for vibe coding and distrust in the dominant models. Unsurprisingly, this reflects the diverse group of people who constitute the Hypha body: we could never have one cohesive response to the juggernaut that is artificial intelligence (whatever you take that term to mean).

> Microelectronics mediates the translations of labour into robotics and word processing, sex into genetic engineering and reproductive technologies, and mind into artificial intelligence and decision procedures.
> <p class="tr"> — Donna 'Not-a-fan-of-AI' Haraway</p>

I started this piece by talking about definitions because the term 'artificial intelligence' or 'AI' is more than a catchall for a diversity of code and practices; as Kate Crawford says in the intro to her book *Atlas of AI*, "Each way of defining artificial intelligence is doing work, setting a frame for how it will be understood, measured, valued, and governed."[^3] I see similar parallels in talking about the affordances of technology in Web3; Chris Dixon's casino and the computer metaphor come to mind to express both facets of technical intricacy and the financial speculation inherent in blockchain technologies.[^4]

But let's rewind: I first came to understand AI through my research as an information sciences graduate student in the mid-2010s, when we were still looking backward and sifting through the stop-starts of artificial neural networks research and the chill from the last [AI Winter](https://www.ibm.com/think/topics/history-of-artificial-intelligence\)) was still in the air. And then, like for many people, the idea of artificial intelligence faded from my mind until the release of Chat GPT-3 in 2020\. Other than a knee-jerk dislike for technodeterministic AI hype machines, I didn't really start contemplating AI until I listened to a [fascinating episode](https://www.themythicbody.com/podcast/you-want-to-be-sorcerer-age-mythic-powers-ai-episode/) of The Emerald podcast, which looks at the emergence of artificial intelligence through the lens of storytelling and mythology; a much more nuanced perspective than the usual hyperbole. Following this, I read James Bridle's [*Ways of Being*](https://www.jamesbridle.com/books/ways-of-being)*,* which deepened my curiosity. Encouraging a rethink of our perception of intelligence in all non-human entities, the book considers how our human-centered worldview (he borrows the term *umwelt*) has warped our ability to deeply comprehend what we even mean by intelligence.

> Technological processes like artificial intelligence won't build a better world by themselves, just as they tell us nothing useful about general intelligence. What they can do is lay bare the real workings of the moral and more-than-human landscape we find ourselves in, and to inspire us to create worlds together.
> <p class="tr"> — <i>Ways of Being</i>, James Bridle</p>

Bridle's framing sparked my interest in AI like nothing had before; the book issued a challenge to avoid reflexive reactions and to consider the differences between intelligence and automation, and how the two are hopelessly intertwined in this current AI epoch. While satisfying my questions about intelligence by participating in a local [reading series on AI](https://luma.com/mlcrsgfl), I also began researching tools to automate processes I find tedious and to experiment with prompt engineering in my research and writing. As a non-engineer with basic coding literacy, AI has been a useful supplier of context when I am out of my technical depth; for all my numerous reservations, I find it is decently good at explaining the technical milieu. 

In addition to experimenting with my own work habits, I've also been supporting Vincent and other members on the [RooLLM project](https://github.com/hyphacoop/RooLLM). This has been the springboard to research and explore the contours of ethical AI, local AI and cooperative AI. These three distinct concepts are pleasantly jumbled up in the [Roo project](https://gamma.app/docs/RooLLM-Your-Local-First-Self-Owned-AI-Assistant-rbmjm4fg491veoa?mode=doc%20), as we're thinking through what it means to build a tool that indexes on privacy and user autonomy, and interleaves automation with respect for workers. (Concepts that I don't believe must be in opposition, contentious as this may be in some circles.)

<figure class="pb4">
    <div class='flex items-center justify-center' style="width: 100%;">
        <img style="width: 50%; max-width: 450px;" src="{{ 'assets/images/posts/2025-10-01-roo-image.png' | relative_url }}" alt="Roo's trinity"/>
    </div>
    <figcaption>
        RooLLM gets its name from our NFT <a href="https://hypha.coop/people/#Roo">office pet, Roo</a> a.k.a. LifeForm 168, which later became a helpful bot in our internal Matrix chat. We have grafted an LLM brain onto this sociotechnical assemblage. Credit to Mauve Signweaver for the Roo image.
    </figcaption>
</figure>

Let's unpack the three concepts bound up in the RooLLM project. Firstly, what is meant by ethical AI? From the horse's mouth (that would be Anthropic's Claude):

> The ethical AI landscape typically centers around several foundational principles: fairness and non-discrimination, transparency and explainability, accountability, privacy protection, human autonomy, and safety. These principles translate into practical frameworks addressing algorithmic bias, where systems might unfairly disadvantage certain groups; explainable AI, which focuses on making AI decision-making processes interpretable; privacy-preserving techniques like differential privacy and federated learning; and robust testing for safety and reliability.

In practice, the frameworks suggested above translate into a range of initiatives such as [ethics washing](https://aiethicslab.rutgers.edu/glossary/ethics-washing/) by organizations such as OpenAI (e.g. setting aside [some funds](https://www.reuters.com/sustainability/boards-policy-regulation/openai-launches-50-million-fund-support-nonprofits-community-organizations-2025-07-18/) to [ameliorate harms](https://www.cnn.com/2025/09/11/tech/ftc-investigating-ai-companion-chatbots-kids-safety) from AI while pursuing aggressive expansion of their work, despite increasing evidence of harm to individuals), or halfway measures such as Meta's work releasing open weight models while keeping the valuable work deliberately opaque. This is classic redirection by organizations who are moving fast and breaking people and planet. 

On the other hand ethical AI also refers to big tent initiatives such as the FAIR data movement (see Hypha collaborator [221A's recent work](https://221a.ca/2025/06/221a-showcases-a-better-internet-is-possible-with-fair-data-at-web-summit-2025/%20) on this ), which covers AI-related data and other types of data, as well as algorithm-centred organizations that are concerned with data equity issues (e.g. The [Algorithmic Justice League](https://www.ajl.org/spotlight-documentary-coded-bias) or the [Just Algorithms Action Group](https://www.jaag.org.uk/)). Lastly, a related strand of ethical AI concerns the provision of technical solutions for the newly created problems AI presents us with (as an aside: I'm often struck by the illogical loop in which technology creates new solutions for problems caused by its previous innovations). There are many such initiatives; [Open Minded](https://openmined.org/attribution-based-control/), which champions attribution-base control is one of the better known, and these are numerous smaller open source projects like [Etica.ai](http://Etica.ai)'s [auditing suite](https://github.com/eticasai/eticas-audit%20) and the [Glaze family of projects](https://glaze.cs.uchicago.edu/aboutus.html) that prevent AI bots from scraping artists' work. Ethical AI is already a vast and somewhat amorphous term, but the above gives some flavour of what's currently circulating out there. In the context of our own AI work, we're incorporating privacy-preserving measures into Roo, as well as using open weight models. 

Local AI is much less nebulous and typically refers to AI models that we run either entirely on a computer or someone's device, in a closed environment. This type of configuration improves privacy (by not connecting to the big bad Internet), guards against surveillance, and if configured correctly, can reduce energy demand as well. Our RooLLM is actually 'on-premise,' running out of our data centre in downtown Toronto. Local AI can also address concerns about the concentration of AI compute; if compute is spread out across local devices, it reduces the reliance on large tech companies who wield the power (literally and figuratively). Much of Hypha's work in recent years has been exploring the affordances of decentralized computing and our work on Roo is a natural extension of these explorations. 

The last facet of the Roo project mentioned above is 'cooperative AI'. By this I mean, loosely, artificial intelligence tools and processes that are developed and run according to cooperative principles or in a cooperative manner. (I do not mean [Cooperative AI](https://www.cooperativeai.com/) as defined by cooperation between 'intelligent systems' or AI agents; while the principles backing this work seem sound at first glance, further research reveals links to effective altruism, a concept I am deeply uncomfortable with). This summer, Hypha was awarded some funds to pursue what Canadian cooperative AI might look like; see more [details here](https://handbook.hypha.coop/Hypha-Worker-Co-operative/press.html).

Look for a subsequent post on the contours of cooperative AI. From data cooperatives to connections to the nascent [Public AI](https://publicai.network/) movement, there is a lot to explore here. In the meantime, off we go again, wading into the fast flowing waters of technological change and speculative hype. See you on the other side.

[^1]: Crawford, Kate. The Atlas of AI: Power, Politics, and the Planetary Costs of Artificial Intelligence. New Haven: Yale University Press, 2021\.

[^2]:  Schneider, Nathan. "Decentralization: An Incomplete Ambition." Journal of Design and Science, no. 5 (2019): 265–85. https://doi.org/10.21428/7808da6b.5c486713.

[^3]:  Crawford, *The Atlas of AI*, p. 15

[^4]:  Dixon, Chris. *Read Write Own: Building the Next Era of the Internet*. New York: Random House, 2024\.
