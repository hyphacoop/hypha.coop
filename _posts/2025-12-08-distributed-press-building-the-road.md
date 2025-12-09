---
image: "/assets/images/social/dripline/2025-12-08-distributed-press-building-the-road.webp"
title: "Distributed Press: ‘Building the Road as We Travel’*"
author: Hypha
date: 2025-12-08
acknowledgement: LLM text is from Gemini 3 Pro, with some light editing
excerpt: Reflections on building decentralized publishing infrastructure
---

<div class="interactive-story-container">
  <iframe 
    src="/interactive/distributed-press.html" 
    style="width: 100%; height: 90vh; border: none; border-radius: 1rem; margin-bottom: 3rem;"
    title="Interactive Distributed Press Story"
    scrolling="no">
  </iframe>
  <p style="text-align: center; color: #666; font-size: 0.9rem; margin-bottom: 3rem;">
    <em>↑ Explore the interactive version above, or read the full text below ↓</em>
  </p>
</div>

Distributed Press was born where code meets cooperatives. As Hypha's first internally incubated product, it was designed to solve a problem that is increasingly urgent: an unhealthy reliance on centralized publishing tools. But while the technology was ready, the industry wasn't. Between dwindling budgets and institutional inertia, the media world moves slowly.  While Hypha will continue to maintain the Distributed Press architecture, our grant funding from the Filecoin Foundation for the Decentralized Web (FFDW) has concluded, marking an opportunity to reflect on the project's rewards and challenges.

### Defining the Protagonist's Perspective

```
I'm now fully immersed in embodying the perspective of a Distributed Press team member. This includes grappling with the real-world challenges, such as funding, open-source model tensions, and the "Protocol Paradox." I've been refining my understanding of Distributed Press. It's not a protocol itself, but a system leveraging IPFS, Hypercore, and ActivityPub. I'm also now crafting a narrative voice: three years in and reflecting on the journey:

We just filed our Q3 progress report for the Filecoin Foundation for the Decentralized Web.

It's a strange document. Half of it is a progress update on Distributed Press, detailing our work on the Social Reader and the Social Inbox. The other half is, essentially, a justification for our existence. It's an invoice stapled to a manifesto
```

```
We are all-in on the idea of "protocols, not platforms." We're choking on the digital monopolies built by the last generation. We know the answer is to build systems that are open, decentralized, and owned by no one.

But it's one thing to believe in that. It's another thing to build a business on it.
```

When I sat down to create this post, I tried prompting an LLM for some thought-starters on how to frame the tensions inherent in a complicated multi-year open source software project. In the course of this discussion, the LLM fabricated something it calls "the integrators' curse; this challenge (which doesn't exist) supposed that the Distributed Press project was limited by its dependence on open source protocols, making the work to build (or integrate) a user-facing product on top of said protocols all the more challenging. It concluded, rather dramatically, that:

```
This document is the sound of a team being crushed by this reality
```

While the integrators' curse is bogus, it does touch on the tensions regarding the decentralization of the infrastructure, and the challenges of working with emergent technology. These issues are related, as we need to seed the network to make it viable; in this case, Hypha runs a server to make Distributed Press a *thing*. Creating additional server nodes - ideally located in numerous jurisdictions - was always a phase 2 goal. Relatedly, the team occasionally got bogged down in decentralization purity discussions of the sort that arise when discussing ATproto, for example. Overall though, we did well to bridge the usability gap inherent in emerging tech; the Get Started page makes it quite easy to publish your site with Distributed Press; not to mention that the Sutty CMS is literally a WYSIWYG editor for static websites. 


```
Which compromises are you willing to make?

Maybe you add a "default" server that your company controls, just to make onboarding easier. (Oops, you just centralized it).

Maybe you add a feature that users want but that breaks the federated model. 
(Oops, you just built a moat).

Maybe you build a slick, proprietary client for your open protocol, and it's so good no one uses any of the other ones. (Oops, you're the new platform).
```


Technical details aside, there is a more significant issue with the project: the all important product-market fit alluded to earlier. We built a B2B product (Distributed Press) for a market (publishers, journalists, media) but despite the downward slide toward media censorship in North America, the fit is not yet there. Media organizations know that the centralization of their distribution infrastructure is a looming cliff, but as of now - December 2025 - it's still a tomorrow problem. Is Distributed Press just ahead of its time? The reality is that when tomorrow finally comes, it's likely that technology will have evolved and someone will put forth a simpler/faster/better solution to evading government or more likely, Big Tech Billionaire control of media infrastructure. Technologists are often accused of offering solutions to problems that don't yet exist; in this case, the issue is real but it's just not pressing enough for media orgs with one eye on the bottom line. It'll be existential–just not yet. As if there were any doubt, Petr, the business development lead we hired in Summer 2024 noted in his final report: "Assumption that journalists or publishers care about their work being distributed to DWeb is false." 

![SWOT Analysis from 2025 Distributed Press Marketing Plan](/assets/images/posts/2025-12-08-distributed-press-swot.png)

But: just because the media isn't there yet doesn't mean they shouldn't be. According to the 2025 Reporters Without Borders (RSF) [World Press Freedom Index](https://rsf.org/en/world-press-freedom-index-2025-over-half-worlds-population-red-zones), "more than half of humanity lives in a country where the state of press freedom is considered 'very serious.'" And while the political situation in the US is truly unsettling, most of these people are living in countries outside of North America.


Without a clear product market fit, thus impacting potential sales, Distributed Press is reliant on grants to meet its goals. Grant funded technology, as with anything grant-funded, is tough. At Distributed Press, we were incredibly fortunate to work with the amazing FFDW team: they are supportive, thoughtful, and really get the work we're doing. Their reporting structures are efficient and not overly onerous; they were a solid partner throughout this long and constructive phase of the project. But grant writing is both an art and a science, and the Distributed Press team wasn't able to attract a new funder to the project. Over the past few years at Hypha, we've worked on numerous grant-funded technical projects. They have been wonderful, creative and exciting projects to work on, but once the funding ends, the projects also end. They live in the purgatory of Github or GitLab and some of them (depending on subject matter) join the ranks of the [Civic Tech Field Guide Graveyard](https://civictech.guide/graveyard/). Not to say that they can't or won't be revived with the right funder coming on board; we've also resuscitated a few tech projects in our time. At the end of the day, maintaining a steady stream of funding is hard without a dedicated fundraiser on the team, and Hypha doesn't have anyone currently wearing that hat. 

```
They are using a grant-based funding model (which demands short-term, reportable "progress") to build on protocol-based infrastructure (which requires slow, long-term, consensus-driven change). This is like trying to farm a redwood tree in a quarterly window box.
``` 


While Distributed Press may not be poised on the edge of commercial success, the project has been undoubtedly successful in other ways. To close out this reflection on the project, I want to highlight all of our achievements. 

Firstly, the team delivered on the original vision of an easy to use, decentralized publishing tool. Over [100 sites](https://explore.distributed.press/) are using Distributed Press to share their content via IPFS and Hypercore. It's a point of pride that the awesome teams over at Fight for the Future and [DWeb.org](http://DWeb.org) Camp  are using our technology to make their websites more resilient. 

> "I really like the last slide call to action: 'Become a pioneer in the new era of content distribution. It may be the ultimate future of publishing.' - don't be afraid to use it often and everywhere. It may become your brand slogan eventually." - Petr


Although the social media component of the project shifted as the project matured, the Social Inbox and Social Reader are two very interesting features of the Distributed Press stack. Running against the current dominant social media trends, the Social Inbox and Reader embed user control, privacy and care into the world of micro-chat. 

The Social Reader is a privacy-first personal reader for subscribing to content published on federated social media; we're fond of saying it's for all the lurkers out there. Although it's powered by ActivityPub, you don't need a Mastodon account to use it. It's local-first, running off your own computer. It works offline. (It's what you'll all be using when the next solar flare takes out the power grid for a day or two.)

Conversely, the Social Inbox is a tool for connecting and conversation. By integrating websites with interactions on federated social media platforms like Mastodon. With the Social Inbox enabled, websites obtain their own account on the Fediverse, allowing it to automatically send out new posts to followers at the time of publication. When other users reply to posts, you can approve them to be published to the site as comments. The Social Inbox allows readers to directly engage with your posts where they already are, and gives publishers the ability to incorporate public dialogue into their websites. Remember the earlier points about the danger of centralized distribution? This tool is a direct response to that challenge, and this approach has been validated by other orgs such as Ghost and WordPress working to add similar ActivityPub-powered tools to their platforms.


```
In Working in Public, Nadia Asparouhova (formerly Eghbal) distills the reality of open-source software with her "roads and bridges" metaphor.

Open-source protocols are infrastructure. They are the digital equivalents of the pipes, roads, and bridges we all use every day. And just like physical infrastructure, everyone uses it, but almost no one wants to maintain it. For a long time, this was a problem for the protocol maintainers themselves. But we're facing a new, second-order version of this problem.

The protocols we build on — IPFS, Hypercore, ActivityPub — are the "roads and bridges." Our product, Distributed Press, is the "town" we're building at the nexus of these three great highways. Our "Social Reader" and "Social Inbox" are the bustling public squares and post offices for this town.
```


While all of the technical accomplishments are well and good, it's the teamwork and solidarity of the Distributed Press project that stands out as genuine success. For three years, the team spanned numerous timezones, two cooperatives with different working cultures, and a fair amount of team member turnover to deliver on a vision for decentralized publishing. Despite (or perhaps because) of these circumstances,  working on Distributed Press felt *good*. We always had a check-in at the beginning of our weekly team calls to take a beat and see how everyone was doing. The cadence of the Distributed Press project and its team were one and the same: genuine and filled with care for each other and for a vision of better technology. 

Gracias to fauno, Ania and the whole Sutty team. Thank you to our technical lead Mauve, Akhilesh, Jacky and to the original Distributed Press dreamers, Benedict, Udit and Mai.


```
So what does "success" even mean for a project like this? I'm pretty sure it's not a valuation. It's not an "exit."

Maybe success is just... usefulness. Maybe it's resilience.

The goal isn't to build a road so good that no one knows who built it. The goal is to build a town so good that it proves, once and for all, that you can have a thriving, vibrant, sustainable community living on open, public roads.

We're figuring this out in real-time. The old startup playbook doesn't apply. The old open-source playbook doesn't quite fit either. It's awkward, and it's contradictory, but it's also necessary. This is the real work.
```

\*[David Herrera](https://library.uniteddiversity.coop/Cooperatives/Mondragon/Mondragon-A_For-profit_Organization_that_Embodies_Catholic_Social_Thought.pdf)

\*\*This doesn't actually exist

*LLM text is from Gemini 3 Pro, with some light editing by me*

---

# Timeline of Distributed Press (2018-2025)

## 2018

**DWeb Camp** - The seeds are planted when Hypha collaborator Mai and Hypha founding member Benedict spend time together at DWeb Camp. Wendy Hanamura serves as a key connector. Mai, interested in the decentralized web ethos, recognizes a contradiction: writing about DWeb Camp while publishing on centralized platforms like Medium or Squarespace, both running on AWS.

## 2019

**The Distributed Press Idea is Born** - Benedict, Mai, and Udit begin developing the concept. Ben envisions a plugin to pin posts to decentralized web protocols. Mai, approaching from a writer's perspective, wants to use it to publish their own work. The philosophy emerges: if you want to build a tool, build a magazine as proof of concept.

Through conversations with artists and activists, the team attempts to form a community around the tool. The consensus: a magazine would be the best way to demonstrate the ideas in action.

**Grant for the Web** - The project receives a $50,000 Creative Catalyst grant from Grant for the Web (a collaboration between Mozilla, Creative Commons, and Coil) to explore web monetization. These funds enable the creation of COMPOST issues 1 & 2 and the bare bones of Distributed Press—not yet usable for most people, but functional for those comfortable with early-stage technology.

## 2020

**Building the Foundation** - The initial $50,000 from Grant for the Web (Coil, later Interledger) supports the team, comprised of Hypha members and two independent contractors, in creating the proof of concept: both the basic publishing technology and the magazine itself.

**COMPOST Issue 1: "Fertile Ground"** - The first issue launches with paid writers (approximately $700 USD each). COMPOST—short for "commons post"—publishes creative works reflecting on the web as a digital commons. The editorial notes: "This publication comes out of a year and a half of scheming, discussing, and organizing. It came out of our desire to create a piece of the web that embodied our dreams. We were tired of platforms making us bitter, angry, and afraid to connect online. We were also tired of being cynical."

**Call Series Begins** - The team initiates conversations exploring what's usable and promising in the decentralized web space.

## July 2022

**Major Funding Secured** - Agreement signed with Filecoin Foundation for the Decentralized Web (FFDW) for $447,313, with four key milestones:

**Milestone 1: No-Code DWeb Publishing**
- COMPOST to be published on DWeb through Sutty CMS as a toggle feature  
- Internal DNS management, eliminating Digital Ocean dependency  
- White-labeled COMPOST theme

**Milestone 2: Decentralized Social Messages**
- Web mentions integration into the DWeb

**Milestone 3: Versioned Content Discovery and Redundancy**
- Website version capture (similar to Wayback Machine)  
- Media type redundancy  
- Performance tuning

**Milestone 4: ID Standards and Content Verification**
- Enable reading and interaction across preferred platforms  
- UX reports to be produced by Sutty (user experience and DWeb emerge as recurring themes)

## August 2022

**Team Expansion** - Mauve joins the Hypha side of the project.

## September 2022

**Infrastructure Independence** - The team begins hosting their own server.

## Late 2022

**Backend Strengthened** - Jacky is hired as backend engineer to complement Mauve on the Hypha side.

## February 2023

**Milestone 1 Complete: No-Code DWeb Publishing** - Sutty integration enables "publish to DWeb" toggle, DNS management moves in-house, white-labeled COMPOST theme added.

**First Milestone Report** - The team delivers the first biannual report to FFDW, reflecting on the complexity of the collaboration:

> "Our project involves many moving parts – we are two worker cooperatives based in two countries with two different primary languages (English and Spanish) working on integrating three projects (Distributed Press, Sutty CMS, and COMPOST). On top of that, we are figuring out which channels and social media platforms to use to promote the various facets of the project. We have not yet come up with a decisive solution to this – and perhaps there is no clear cut path. But we realized that asking other project partners to inform our approach is necessary to be able to navigate this complexity well."

## May 2023

**COMPOST Issue 3** - Showcases Milestone 1 features with tutorials and workshop materials.

## July 2023

**Social Media Research Complete** - Analysis of how Distributed Press interacts with centralized and decentralized social networks.

## September 2023

**Milestone 2 Complete: Decentralized Social Messages** - Social Inbox API goes live based on ActivityPub protocol. Jekyll plugin created for static ActivityPub activities.

## November 2023

**COMPOST Gets Social** - ActivityPub moderation features added to COMPOST blog.

## March 2024

**Milestone 3 Substantially Complete** - ActivityPub moderation panel integrated into Sutty CMS. Social Reader launched for p2p content access. First UX workshop completed with grassroots communities. Ania hired as project manager.

## April 2024

**Milestone 4 Re-Evaluation** - Project pivots based on community feedback, shifting focus toward static site generator integration and micropayment systems for the Fediverse. UX workshop report completed.

Patterns of online communication and organization are changing, and Distributed Press has pivoted to meet this demand. Typically, people use websites as static repositories of information while social media allows for more fluid two-way conversation. In the coming milestone, the Distributed Press team is aiming to create a space that merges the easy connections of social media with the richer content of static websites. We believe the features highlighted in this milestone will create a more vibrant community ecosystem, while also retaining the safeguards of privacy protection that are required by many of our users…. While the past milestone focused on sending information outwards, Milestone 4 will improve the ability to receive and display interactions with the Fediverse. Citizen journalists using the Sutty CMS will be able to show comments and interactions on their websites, while Social Reader users will be able to see replies on posts. Mastodon users will be able to see most posts retroactively when they follow an account.  (Revised Milestone 4 document, as submitted to FFDW)

## Summer 2024

**Business Development Consultant** - As the project enters its final phase, we bring on Petr on contract to focus on sustainability and establishing new stakeholder partnerships.

## Fall-Winter 2024

Sutty reworks the onboarding flow, with a new Get Started page pointing potential users to easy ways to set their website up with Distributed Press.

## Spring 2025

**The Final Chapter** - FFDW generously provides a final injection of funds for the project, allowing the team to create an Explore page, an Index of all sites using Distributed Press [explore.distributed.press/](https://explore.distributed.press/). And Sutty launches a Resilience Challenge, offering funding to two social activist organizations ([Desarquivo](https://distributed.press/2025/03/04/distributed-press-resilience-challenge-restoring-desarquivo/) and [TLGB Bolivia](https://distributed.press/2025/03/04/colectivo-tlgb-bolivia-keeping-digital-spaces-alive/))  to help them recover their website and host their content on the distributed web. 

Distributed Press is an open source publishing tool for the World Wide Web and the Distributed Web. It automates publishing and hosting to decentralized protocols including ActivityPub, Hypercore, IPFS, and Bittorrent.

This innovative tool enhances any Content Management System (CMS) by integrating peer-to-peer (P2P) and decentralized protocols for efficient content distribution and archiving. We also offer a suite of tools (the Social Inbox and Social Reader) for interacting with the Fediverse via ActivityPub. (from final report to FFDW)
