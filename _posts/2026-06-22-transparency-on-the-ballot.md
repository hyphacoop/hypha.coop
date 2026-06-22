---
image: "/assets/images/social/dripline/2026-06-22-transparency-on-the-ballot.webp"
title: "Transparency on the ballot: building for MAPLE"
author: Hypha
date: 2026-06-22
acknowledgement:
excerpt: "What building ballot-question UX for MAPLE taught us about provenance and trust in civic tech"
---

The Massachusetts Platform for Legislative Engagement (aka MAPLE, at [mapletestimony.org](https://mapletestimony.org)), an initiative of Partners in Democracy – Education, is a free public platform for reading and submitting testimony to the Massachusetts state legislature. It's a little like a social network, but your feed consists of bills and voter testimony. MAPLE exists to encourage and simplify civic engagement, giving voters an easy way to submit testimony to legislators and follow bills as they make their way through hearings and votes.

<figure class="pb4">
    <img class="w-100" src="{{ 'assets/images/posts/2026-06-22-transparency-on-the-ballot-1.webp' | relative_url }}" alt="A piece of testimony in the MAPLE feed, posted by Theodora Skeadas, testifying in support of bills H1982 and S1038. The card shows the author's name, date, and the opening of their testimony, with Expand, More Details, and Report links beneath it."/>
</figure>

Starting in March, MAPLE engaged Hypha to implement a new feature for the upcoming 2026 electoral cycle. As our Canadian team was surprised to learn, referenda are a common feature of American state politics. Voters and organizations can file initiative petitions with the attorney general; if the petition garners enough signatures, it appears on the ballot and the legislature is formally requested to take action (pass or repeal legislation) based on electoral results. Hypha's work was to present ballot questions to voters, show them consolidated information about for/against committees, help them understand what their communities think, and enable them to participate in the conversation.

The Hypha team was very excited to work on this project. Our roots are in Toronto's civic tech world, and we're big believers in helping organizations navigate technical challenges to deliver procedural transparency for civic engagement.

Working on MAPLE helped us realize the importance of interoperability and standardization to clarify provenance and nurture trust. For instance: unlike bills, which are accessible in a structured, machine-readable, format through the legislature's API, there's no API to figure out which ballot questions have been filed, or how far they are from appearing on the ballot. That means that for ballot questions to appear in MAPLE, they need to be manually added to the project's public Github repository by a volunteer.

<figure class="pb4">
    <img class="w-100" src="{{ 'assets/images/posts/2026-06-22-transparency-on-the-ballot-2.webp' | relative_url }}" alt="A YAML file on GitHub, ballotQuestions/25-14.yml, describing a ballot question in structured fields: id, billId, title (&quot;To improve access to public records&quot;), electionYear 2026, type, ballotStatus (expectedOnBallot), supporting and opposing committees, a full summary, and a link to the bill's PDF."/>
</figure>

This isn't hard or particularly labourious—there are perhaps one or two dozen questions that make it to the ballot every other year—but it highlights something important about civic technology: for information to be visible by a civic application, it must first be machine-readable, and government bodies don't homologate data formats, or indeed offer all data under structured formats. This means that information must sometimes cross trust boundaries: voters on MAPLE look at ballot questions that were filled in by volunteers copy-pasting from the attorney general's site, rather than ballot questions sourced from government bodies without passing through human intermediaries. It's therefore critical that voters be able to identify the source of data they're seeing—in this case a public, auditable, Github repository—and that the data be presented in a consistent manner.

In this case, ballot questions should be presented in uniform language that minimizes the surface area for potential editorializing. Titles for ballot questions are long and not always uniform (e.g. "Initiative Petition for a Law to Improve Access to Public Records" vs "Initiative Petition for a Law *Relative to* Election Day Registration"), so we had to come up with a standard way to shorten titles without introducing judgement. We chose to drop everything before the word "To" and accept some ungrammatical titles as the cost for uniform, transparent, processing.

<figure class="pb4">
    <img class="w-100" src="{{ 'assets/images/posts/2026-06-22-transparency-on-the-ballot-3.webp' | relative_url }}" alt="A ballot-question card in MAPLE, marked &quot;Expected on ballot,&quot; with the shortened title &quot;To election day registration&quot; and a summary of the proposed law. Reaction counts for endorse, neutral, and oppose appear in the top-right corner."/>
</figure>

Similarly, UX choices should reflect the legislative process. Ballot questions pass through a few stages before being presented in an election. Before they can be on the ballot, for instance, they're brought forward to the legislature as bills. It's traditional to reject them and wait for a mandate from the referendum, but the distinction still must be made on MAPLE. We decided that voters wouldn't be able to submit their opinions about ballot questions until after this first legislative pass has concluded—only legislative testimony is allowed in the legislative phase. Once the question clears this phase and is expected on the ballot, voters aren't submitting "testimony" for it—it won't reach their legislators—but "Perspectives", i.e. opinions intended to influence fellow voters, rather than elected officials. Building these nuances into the application helps voters trust their engagement with the process, and cues them to frame their feedback in different ways at different stages.

<figure class="pb4">
    <img class="w-100" src="{{ 'assets/images/posts/2026-06-22-transparency-on-the-ballot-4.webp' | relative_url }}" alt="The &quot;Perspectives&quot; panel for a ballot question on MAPLE, showing 6 perspectives and a link to review testimony on the related bill. Tallies read ENDORSE 3, NEUTRAL 2, and OPPOSE 1."/>
</figure>

These are small choices, but they have a big impact on how users perceive the platform. At a time where mistrust of institutions is higher than ever, platforms like MAPLE need to show that their processes are transparent and open to interrogation. Restoring trust runs partly through technical problems, and as our world becomes increasingly agentic, it's vital that we have interoperable formats and APIs that simplify consumption and interrogation of derived assets. Trust, though, is also about organizational practices. MAPLE's [How we use AI page](https://www.mapletestimony.org/about/how-maple-uses-ai) stood out to us as a piece of communications more and more orgs will want to adopt: users will increasingly demand to know how data was transformed to get to them, and what the exact fate of their data will be.

Civic technology is an important battleground for digital trust. Restoring trust in institutions requires them to be transparent and accountable, which in turn requires the mechanisms by which we observe institutions to be transparent and accountable themselves. We're excited to continue working with MAPLE and other like-minded projects to bring transparency to the table for everyone.
