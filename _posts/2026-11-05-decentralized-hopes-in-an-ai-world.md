---
title: "Decentralized hopes in an AI world"
author: Andi
date: 2026-11-05
acknowledgement:
excerpt: "A retrospective on the Save DWeb Backend project"
---

<figure class="pb4">
<img src="{{ 'assets/images/posts/2026-11-05-decentralized-hopes-in-an-ai-world-stocksy.jpg' | relative_url }}" alt="A black-and-white halftone cutout of a hand holding up a small yellow paper file folder against a plain grey-green background." />
<figcaption>
    Photo
    by
    <a href="https://www.stocksy.com/CACTUS/showcase?page=1">
        CACTUS Creative Studio
    </a>
    via
    <a href="https://www.stocksy.com/">
        Stocksy
    </a>
</figcaption>
</figure>

> "... AI tools are supercharging surveillance and suppression of protestors, journalists, human rights defenders, and other communities at risk. We therefore echo calls for the adoption of human rights-centered binding legal standards and global governance mechanisms to regulate digital surveillance technologies and AI, addressing chilling effects." – [**Access Now**](https://www.accessnow.org/wp-content/uploads/2026/07/Oral-Statement-Global-Dialogue-on-AI-Governance.pdf)

> The objective of building a decentralized web is to protect human rights and empower people, especially those who experience systemic inequity and prejudice. – [**DWeb Principles**](https://getdweb.net/principles/)

In 2022, The Atlantic ran an article on decentralized technology titled "[The Battle for the Soul of the Web](https://archive.ph/Uds3i)," posing the question as to whether this flavour of tech (the DWeb 'movement' in particular) might be the answer to what ails the surveillance-prone, data extractive Internet. Fast forward four years, and mentions of decentralized tech or even its commercially hyped counterpart, Web 3, have been nearly submerged in the torrent of generative artificial intelligence noise.

DWeb Principles that put human agency, openness and interoperability first stand in sharp contrast to the astounding investments in anti-human AI technologies whose impacts range from mere thievery of artistic work to tracking, surveilling, and in the case of drones, killing people. Freedom House, a pro-democracy organization, [noted that in 2025](https://freedomhouse.org/report/freedom-net/2025/uncertain-future-global-internet), "global internet freedom declined for the 15th consecutive year," and that "half of the 18 countries with an internet freedom status of Free suffered score declines during the coverage period." Surveillance has increased across the board – especially in the US where the government, courtesy of ICE, has invested impressive sums into surveilling its own people (An [EFF report](https://www.eff.org/deeplinks/2026/01/ice-going-surveillance-shopping-spree) notes that ICE's 2025 budget was 10 times the size of the agency's total surveillance spending over the previous 13 years!). The current digital landscape provides the quintessential David and Goliath set-up of multibillion dollar extractive surveillance platforms, often powered by agentic AI, against the shoestring budgets of human rights defenders, journalists, and citizen archivists.

Against this backdrop, we thought it was time to revisit the collaboration between [OpenArchive](https://www.open-archive.org/) and Hypha Worker Co-operative, which explored the possibilities inherent in decentralized technology for OpenArchive's global community of citizen archivists. OpenArchive has "worked with frontline human rights communities worldwide to securely document and preserve evidence" since 2015 via their pioneering [***Save***](https://www.open-archive.org/save) mobile app. And given the threats to free and open democracies globally, citizen-led accountability – especially for police and military actions in contested areas – point to the ongoing need for tools like ***Save***. Hypha and OpenArchive's collaboration on a peer-to-peer storage option for the app is detailed in a [2025 white paper](https://www.open-archive.org/pdf/Mobile_DWeb_Archiving.pdf), but in the face of growing discontent with the tech status quo, we want to revisit the project and the role of decentralized tools in fighting authoritarianism, wherever it might occur.

## The DWeb Backend: what worked & what didn't

All participatory design approaches start with the user, and OpenArchive's [Human Rights Centered Design (HRCD)](https://www.humanrightscentered.design/) Approach prioritizes vulnerable users from the project's inception, incorporating threat modeling directly into technical decisions. This gave us a solid foundation for selecting which protocols to use, by excluding anything that compromised first principles. OpenArchive's domain expertise in activist workflows and Hypha's technical engineering capabilities also made a complementary pairing.

On the technical side, Veilid successfully provided onion-routed networking, obfuscating IP addresses and protecting user metadata from network eavesdroppers. The Backend also relies on Iroh's peer-to-peer data transfer capabilities, but to bridge [Iroh's blob storage](https://docs.iroh.computer/protocols/blobs) with Veilid's routing, Hypha needed to develop custom architecture to 'glue' the protocols together. We also developed a shared cross-platform Rust component that streamlined maintenance for both Android and iOS. There was also something rewarding about the novelty of the solution – mobile first, and peer-to-peer.

While breaking new ground in tech can feel like a win, there are also significant challenges tied to using novel protocols. Issues ranged from the mundane, unmaintained dependencies requiring unforeseen custom fixes, to the still unresolved Veilid-related tunnel collapses. Essentially, the DWeb Backend works reliably in 'single-player mode' but often fails silently when trying to connect with peers. Testing confirms that this issue stems from several protocol-level and architectural challenges; startup race conditions (wherein the different parts of the app work simultaneously but out of order), [distributed hash table](https://en.wikipedia.org/wiki/Distributed_hash_table) inconsistencies, and instability induced by larger file sizes or availability of peers across the network. We hypothesized a fix using DigitalOcean droplets as bootstrap nodes to bolster connectivity, but ran out of funding before we could fully explore this option.

Another factor to consider is the aforementioned technical glue between the protocols. To get the Backend working, the team implemented a heavily customized architecture, which involves maintaining a specialized fork of Iroh alongside a custom translation layer ([veilid-iroh-blobs](https://github.com/OpenArchive/veilid-iroh-blobs)). While this work has safeguards to prevent breaking changes during upgrades (relying on strict dependency chains and pinned versions) the bespoke nature of this work adds complexity to any future revision, especially if the original developers are no longer involved. Generally speaking, grant-funded technology projects often suffer from stop-start cadences, making 'solutions' harder to finalize.

## Looking ahead

So where does the project go from here? The best place to start is, of course, with the people using the tech. OpenArchive's connections with the Decentralized Archiving Community and frontline human rights defenders goes back over a decade, so surfacing the concerns from these groups should be the starting point of any additional work on what role decentralized tech might play in future ***Save*** features. Starting with user needs and then connecting those to the technical affordances ensures you're not building backwards. Considering how the threat model has evolved, from a technical POV, is also critical to designing more effective technology. As an example, is generative AI facial recognition now a much greater concern than before? How can activists remain secure and anonymous when participating in democratically enshrined protests? And given the proclivity for security forces to seize people's phones, should a quick deletion feature also be considered? Understanding the current state of affairs, especially how AI has altered censorship and surveillance technologies, and working alongside ***Save*** users will yield features that are both intuitive and necessary.

Once this research has been updated, we can reassess the existing DWeb Backend stack. Exploring other protocols – such as [Nym](https://nym.com/), [p2panda](https://github.com/p2panda/p2panda), or revisiting the latest version of Iroh, might work to replace or augment the Veilid nodes. It's also likely that user feedback will yield new evaluation criteria for ***Save***, steering the project in a different technical direction. The options in local-first, offline computing have changed since OpenArchive and Hypha originally embarked on our partnership.

While the DWeb Backend does need some technical fixes, as this [EFF article](https://arc.net/l/quote/ihurpbht) points out:

> To keep people connected during internet shutdowns and blackouts, communication networks must be operational before and after the disaster or shutdown.

In other words, people need to be using the tools regularly, not just when there is a crisis, and this work is decidedly in the social, not technical realm. Our hope is to find funders and supporters who understand that successful projects put people, not technology first. If you're an organization looking to invest in open-source, privacy-preserving infrastructure for frontline communities, then get in touch.

---

**Project Timeline & Key Milestones**

* **Apr 2024 – May 2024: Ecosystem Mapping & Protocol Evaluation**
  * Evaluated P2P protocols (IPFS, Pear, Peergos, I2P, Veilid, Iroh) against strict criteria: mobile compatibility, metadata privacy, IP anonymization, and encryption.
* **May 2024 – Jun 2024: Architecture Selection & Prototyping**
  * Selected a dual-protocol architecture (Veilid + Iroh) and built the initial backend codebase (`save-dweb-backend` in Rust).
* **Jun 2024 – Jul 2024: UX & Threat Model Refinement**
  * Conducted Human Rights Centered Design (HRCD) sessions with activist communities to identify UX gaps, privacy risks, and mobile workflow bottlenecks.
* **Jul 2024 – Aug 2024: Testing, QA & Network Stabilization**
  * Executed test plans, addressed protocol edge cases, and deployed custom private bootstrap nodes to resolve network route failures.
* **Sep 2024 – Dec 2024: Retrospective & Research Synthesis**
  * Documented technical learnings, drafted public retrospectives, and co-wrote community research papers.
* **Sep 17, 2025: Official White Paper Launch**
  * Published the complete white paper documenting the beta implementation of DWeb Storage in ***Save***: [*Privacy-First Archiving: Implementing Secure, Decentralized Storage to Protect Mobile Media*](https://www.open-archive.org/news/oa-hypha-white-paper), which details the human-rights-centered methodology and technical integration.
* **Oct 2025 – Oct 2026: Filecoin integration (later deprecated); stability fixes and maintenance.**
