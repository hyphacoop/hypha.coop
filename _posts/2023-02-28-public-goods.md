---
title: 'Cyber-visions of altruism'
author: Andi Argast
date: 2023-02-28
acknowledgement: 'Andi is the Strategy Lead at Hypha, and is a probationary member.'
excerpt: 'Exploring the entanglement of Web3 and public goods'
---

### {{ page.excerpt }}


<figure>

<img
  src="{{ 'assets/images/posts/2023-02-28-public-goods.jpg' | relative_url }}"
  alt="Network rack"
/>

<figcaption align = "left"><em>Image by kkgas via Stocksy</em></figcaption>
    
</figure>

*The concept of 'public goods' arises often in more altruistic conversations about Web3, but it's hard to pin down the term in this decentralized and free-floating space. Does it simply mean supporting open source development projects? Or is there a larger and more diverse 'public' out there in cyberspace awaiting their piece of funding for shared goods? In this short essay, I offer some definitions of public goods in the context of open source development projects before connecting this older discourse to the more recent Web3 + public good conversations. I also raise three challenges to this recent conceptualization of public goods by asking who or what is the 'public' in a decentralized ecosystem; consider the lessons Web 2.0 can offer about co-opting commons-related language; and suggest some of the (unintended) effects of a technocentric approach to public goods. I conclude by suggesting that participation in public goods projects is one place where co-operatives might consider becoming more active.*

The idea of public goods can be traced as far back as John Stuart Mill[^1], thus enjoying several centuries of confusion to arrive at its common definition. A public good is anything that is non-excludable (one cannot be prevented from using the thing) and non-rivalrous (using the thing does not impinge or diminish another's ability to use it). Typical examples of public goods are street lights, national defense,[^2] clean air, and education.[^3] Public goods are frequently conflated with common goods, but these differ in that the latter can sometimes be rivalrous; for instance, fishing or forests. People cannot be excluded from fishing but if Alice takes home a fish after a day at the lake, there is one less fish for Brenda to catch.
<br><br>

<table style="width: 100%;">
  <thead>
    <tr>
      <th>&nbsp;</th>
      <th style="text-align: left">Excludable</th>
      <th style="text-align: left">Non-excludable</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>Rivalrous</b></td>
      <td style="text-align: left">Private Goods (e.g. cars, domain names)</td>
      <td style="text-align: left">Commons (e.g. forests, online privacy)</td>
    </tr>
    <tr>
      <td><b>Non-rivalrous</b></td>
      <td style="text-align: left">Club Goods (e.g. cable, subscriptions like Netflix or Spotify)</td>
      <td style="text-align: left">Public Goods (e.g. air, open source code)</td>
    </tr>
  </tbody>
</table>  


{: style="text-align: center; font-size:1em;" }
*Credit: Nadia Egbahl, via [Jacky Zhao](https://jzhao.xyz/thoughts/Making-and-Maintenance-of-OSS/#commons-based-peer-production)* 

  
In the context of the Internet, public goods are often recast as digital public goods, which can be anything from software to datasets to web-based content.[^4] In Web3 circles, digital public goods typically refers to open source code, which Nadia Eghbal frames as the "digital infrastructure"[^5] underpinning many of the platforms and websites we use every day. This free, publicly available code is maintained by (often unpaid) communities of developers who work in distributed, loosely coordinated teams.[^6] (For more on the issue of open source code and remuneration, see this [post by Hypha collaborator Jacky Zhao](https://jzhao.xyz/posts/paid-open-source/).[^7])  

> "Distributed open source code is a miracle in human coordination. How does a group of people, not defined by race, religion, gender, or geography, come together to contribute time and money to a reimagined reality that only exists on the open internet? It is an emergent phenomenon that would have been unimaginable not so long ago." 
– [Alisha.eth](https://alisha.mirror.xyz/PxK8PtWDxon0uBH25-ACLSH1nHa89MFj--XAe_wkR6g)  

<br>
How did it come to pass that much of the Internet that we use today relies on free and open source software? In [her excellent report](https://www.fordfoundation.org/work/learning/research-reports/roads-and-bridges-the-unseen-labor-behind-our-digital-infrastructure/) on the state of open source software, Eghbal traces two foundational stories: the first concerns Richard Stallman, the now infamous MIT programmer, who launched the GNU operating systems in 1983 as a response to the rise of proprietary software—a sort of enclosure of the digital commons. This led to the creation of the free or libre software movement (free as in freedom; not free as in price). Eghbal notes that this was a movement "deeply rooted in social advocacy."[^8]  The second story concerns *open source software*. By the late 1990s, the increasing ubiquity of networked home computing led technologists to realize that there was a practical benefit to allowing a large number of programmers to work on and improve code.[^9] The open source movement and free software both favour permissive licensing versus proprietary code but they have sprung from very different roots; the former being grounded in a pragmatic drive to make software better and more widely available, and the latter seeing itself as a social movement.[^10]  

> For the free software movement, free software is an ethical imperative, essential respect for the users' freedom. By contrast, the philosophy of open source considers issues in terms of how to make software "better"—in a practical sense only. It says that nonfree software is an inferior solution to the practical problem at hand.
– [Richard Stallman](https://www.gnu.org/philosophy/open-source-misses-the-point.html)

<br>
Free/libre and open source software (FLOSS) remains central to much of our essential digital infrastructure, but the patchwork model for funding and supporting these projects can have unintended consequences (as can the contributions of coders who aren't security conscious). Eghbal uses the example of OpenSSL, an open source encryption tool that claimed, as of 2014, to be used by "two-thirds of all Web servers … enabling websites to securely pass credit card and other sensitive information over the Internet."[^11] Eghbal writes that this project was staffed by a small handful of people, none of whom made a decent living from working on the project. This precarious state of affairs came to light with the discovery of the Heartbleed bug in 2014, exposing a serious security flaw in OpenSSL and threatening much of the Internet's encrypted web traffic.[^12]

The Heartbleed bug was a bit like discovering that  parts of your house are held together by duct tape and a prayer, and it's clear that FLOSS needs to be recognized as a public good and better funded to avoid potentially catastrophic security breaches. Enter Web3, answering this call by using cryptocurrencies to fund development projects. In addition to providing much needed capital for code-based projects, the most idealized conceptualization of Web3 shares an ethos with FLOSS projects: namely, wresting control from big corps (be they banks or software giants), and transacting in a publicly auditable and reasonably transparent way. Crypto projects are also typically open source projects so funding their continued development is almost an existential requirement. 

Of the recent crypto-based funding platforms, [Gitcoin](https://gitcoin.co/) is likely the most well-known initiative, connecting holders of crypto with projects that need funding. Using [quadratic funding](https://wtfisqf.com/?), a mechanism developed by Vitalik Buterin, Zoë Hitzig, and  E. Glen Weyl, Gitcoin has raised $72.4 million dollars for over 3,000 projects.[^13] Quadratic funding is the "mathematically optimal way to fund public goods in a democratic community."[^14] Essentially, quadratic funding rewards projects that have wide-spread support from a (typically decentralized) community by giving these popular projects more matched dollars in a  funding round. By providing matched funding based on the number of *supporters*, rather than the dollars raised per project, quadratic funding reflects the intentions of the larger community, not a small but wealthy minority.[^15] However, the funds raised through Gitcoin are not all grants; some are tips and bounties given to people working on open source projects[^16] and Gitcoin also hosts sponsored hackathons.[^17]   


> "Today, core contributors to open source projects are still under-funded, despite entire industries being built with their software. With infrastructure provided by the likes of Gitcoin and Radicle, protocol treasuries are poised to dramatically expand the funding of open source code, both inside and outside of crypto." 
– [Other Internet](https://otherinter.net/research/positive-sum-worlds/) 

<br>
[Protocol Labs](https://protocol.ai/), another Web3 organization focussed on public goods, takes a research-driven approach by convening regular gatherings of engineers, developers and (naturally) researchers under the banner of [Funding the Commons](https://fundingthecommons.io/).[^18] Protocol Labs' conception of public goods is expansive, with talks from 2022 covering blockchain education, privacy, and peer review all under the aegis of public goods.[^19] As one example of this breadth, at the June 2022 gathering, an organization called Artizen presented their concept, which uses  "fluid quadratic funding" to support art, tech, science and design projects.[^20] They have raised over $2.1 million (presumably USD) to date.[^21] Another popular model in the Web3 space is [retroactive public goods](https://protocol.ai/blog/hypercert-new-primitive/), in which funds are distributed to altruistic or publicly-minded projects after they have been completed.  

The Web3 discourse around public goods is vibrant, expansive, and is genuinely funneling dollars into projects that seek to build digital infrastructure through open source coding projects. Gitcoin and Protocol Labs are also looking beyond the pipes and wires of the Internet; Gitcoin recently partnered with UNICEF to raise money for non-Web3 projects.[^22] And both organizations partnered on a DeSci (decentralized science) funding round in the fall of 2022 to support initiatives that ranged from open source animal tracking to building a headset aimed at preventing Alzheimers.[^23]  


> "It is our view that blockchain (and the suite of technologies that support the ledger) is the internet of money. If you think about how much the internet changed the world, and consider that blockchain does for money what the internet did for information, what impact will blockchain have on the world?" 
– [Kevin Owocki](https://go.gitcoin.co/blog/open-source-money-will-buidl-the-open-source-ecosystem)

<br>
Connecting projects to funding, offering new revenue streams for initiatives that focus on positive externalities,[^24] moving public goods funding into the 21st century: taken at face value, there is little to critique in how Web3 proponents have embraced the discussion of public goods. The conversations in these circles, primarily happening in Discord and at the conferences and platforms mentioned above, have extensive resources available to inform the public goods discussion. Gitcoin has a robust 'starter pack' on public goods including links to Elinor Ostrom[^25] and even has a (possibly defunct?) reading group focused on radical thinker Ivan Illich.[^26] Yet, there is something disquieting about techno-solutionism being applied to public goods funding. Technology as an enabler of net positive progress has yielded uneven results at best. Yes, the Internet has transformed how we produce and consume information. It has also brought about an epidemic of digital misinformation that rivals the current bodily COVID-19 epidemic.  Furthermore, the straightforward narrative of using decentralized currencies and protocols to organize and fund public goods is somewhat more complex in actuality. The Web3 discourse on public goods provides solutions that raise questions: in such a decentralized space, who is the community or public in the 'public goods'? Does this form of delivering public goods perpetrate worker precarity by supporting the gig economy? And do these innovations in funding models come at the expense of supporting traditional systems of providing public goods? 

In their insightful [Other Internet essay](https://otherinter.net/research/positive-sum-worlds/), Toby Shorin, Sam Hart, and Laura Lotti probe what the Web3 discourse means by 'public.' They note that the question of what constitutes a Web3 public and what their values might be is largely undetermined; writing that  "... in practice, little space has been made for different values to be discussed or enacted. Which is why, in the absence of ways to enact our shared values, we default to the lowest common denominator: profit."[^27] As a unifying force, profit likely leads to some community cohesion but there is no guarantee that profit-based decisions will be altruistic or beneficial for a broader public. Web3 is driven by financialization and incentivization, so while profit is a logical unifier, it does not a community (or a public) make. As [Jessy Kate Schingler](https://jessykate.medium.com/funding-public-goods-in-web3-for-the-uninitiated-27493693c25c) writes, Web3 has already internalized a logic wherein people need to have financial stake in a project to care about it; the traditional way of thinking would see the value of acting in the public good for its own sake.[^28]

The community question is also problematized by the lively ghosts of Web 2.0, with businesses such as Facebook, Twitter and Airbnb capitalizing on the the digital commons, and engaging in a technique James Muldoon in his book *[Platform Socialism](https://www.plutobooks.com/9780745346977/platform-socialism/)*, calls "community washing  - the corporate marketing strategy of framing the activities of the company in the language of community empowerment and fulfilling a social mission,"[^29] while allowing the negative externalities of their business go almost unchecked. Muldoon cites the example of Airbnb making decisions "for the community" not "with the community;" language most community organizers would have internalized: collaboration and partnership, not a benevolent handout.[^30]  It's not clear whether Gitcoin and similar projects risk slipping into community washing by extending themselves out from open source projects to a broader mission to revitalize the granting sector as a whole. But growing a community or public based on loose principles of 'doing good' without a thoughtful and engaged discussion on the benefits of what and for whom might ultimately dilute efforts to support open source coding projects by trying to do too many things with too little focus. In her thoughtful post, [Reimagining Public Goods Funding in Web3](https://alisha.mirror.xyz/PxK8PtWDxon0uBH25-ACLSH1nHa89MFj--XAe_wkR6g), Alisha.eth writes, "A decentralized metaverse requires a decentralized solution to the funding of public goods in web3. We can either come together as a community to work through these problems now or we can wait for a large technology corporation to do the work for us."[^31] Big Tech is always happy to step in and capitalize on communities and digital publics; let's hope that history proves to be instructive here.  

> "We believe finding work in Open Source Software will be as easy as it is for Uber drivers to find a ride today." 
– [Kevin Owocki](https://go.gitcoin.co/blog/open-source-money-will-buidl-the-open-source-ecosystem)
<br>

When the Web3 discourse around public goods confines itself to supporting the open source movement, this seems like a logical link: a tech solution for a tech problem. But this approach still raises a larger question about the type of employment offered and the systems it supports. Offering grants and bounties to support open source development is a way for developers to get paid for their work, and while this is assuredly positive, it also embraces a gig economy style of work.[^32] Increasing precarity in all kinds of work, including jobs in the tech sector, is likely to increase in the coming years as automation consumes jobs without creating new ones elsewhere, and nation states' resources are diverted from social safety nets to combating the disastrous effects of climate change.[^33] The erosion of access to supports such as pensions and healthcare, which especially in the United States are tied to employment, is problematic as grants-based, piecemeal work is normalized in many sectors. While it's true that there are an increasing number of options for gig workers – such [Opolis](https://opolis.co/) and the [Freelancers Union](https://www.freelancersunion.org/)[^34] –  it's also important to ask if these approaches legitimize precariousness of work or provide more options for people who want to be self-employed. Relatedly, ensuring equitable access to collective benefits such as Opolis may be challenging, given the lack of diversity within the tech sector, generally.

In addition to changing the labour market, when public goods are paid for by private funds, this might also signal a shift in the role of the state in providing those goods. Best case scenarios would be a public-private partnership, but a more likely outcome is the gradual slide toward gutting social support, education, and infrastructure: toll roads for those who can pay, and crumbling highways for those who cannot. Although the aims of Gitcoin and other funders are laudable, the libertarianism embedded in Web3 may undermine more socialist and state-driven initiatives to address public goods funding. 

Potential corrections to the vulnerabilities of the Web3-public goods discourse include reframing the concept of public goods to be more precise; for instance, Protocol Labs refers to the work done on open source projects as "network goods,"[^35] which seems clearer than applying public goods to a decentralized and de-localized space like Web3. Looking at other economic models to support the creation of network or digital public goods should also be explored. The worker co-operative offers one possible solution; ownership and capital can still accrue to individuals working on open source code, but co-operatives are also grounded in co-operative principles that emphasize relevant values such as democratic control, member economic participation, and concern for community. 

Engaging in the public goods dialogue also offers co-operatives an opportunity to connect more concretely to conversations happening about social well-being, the equal provision of public goods, and "commons activism."[^36] This is essential for co-ops if they wish to engage in "broader currents of social change"[^37] and help shift the public goods discourse from an economic problem to solve to an indicator of our general societal wellbeing. 

## References
[^1]: Reiss, Julian. 'Stanford Encyclopedia of Philosophy'. In The Stanford Encyclopedia of Philosophy, edited by Edward N. Zalta, Fall 2021. Metaphysics Research Lab, Stanford University, 2021. https://plato.stanford.edu/archives/fall2021/entries/public-goods/.

[^2]: Sabzalieva, Emma, and José Antonio Quinteiro. 'Public Goods, Common Goods and Global Common Goods: A Brief Explanation'. UNESCO-IESALC, April 2022. https://www.iesalc.unesco.org/en/2022/04/10/public-goods-common-goods-and-global-common-goods-a-brief-explanation/.

[^3]: ibid 1.

[^4]: 'Gitcoin - A 10-Minute Primer'. Accessed 24 January 2023. https://primer.gitcoindao.com/.

[^5]: Eghbal, Nadia. 'Roads and Bridges: The Unseen Labor Behind Our Digital Infrastructure'. Ford Foundation. Accessed 24 January 2023. https://www.fordfoundation.org/work/learning/research-reports/roads-and-bridges-the-unseen-labor-behind-our-digital-infrastructure/.

[^6]: ibid 5.

[^7]: Zhao, Jacky. 'A Case for Funding Open Source'. Jzhao.Xyz (blog), 27 February 2021. https://jzhao.xyz.

[^8]: ibid 5.

[^9]: ibid 5.

[^10]: ibid 5.

[^11]: ibid 5.

[^12]: ibid 5.

[^13]: $72.8m in  Results. '$72.8m in Results', 13 February 2023. https://gitcoin.co/results.

[^14]: QF.Gitcoin.co. 'WTF Is Quadratic Funding?', 24 February 2023. https://qf.gitcoin.co/.

[^15]: ibid 14.

[^16]: ibid 13.

[^17]: ibid 4.

[^18]: Kirsanow, Karola. 'Funding the Commons'. Protocol Labs Research (blog), 28 March 2022. https://research.protocol.ai/blog/2022/funding-the-commons/.

[^19]: Protocol Labs. 'Funding the Commons - YouTube', 2022. https://www.youtube.com/playlist?list=PLhuBigpl7lqtMdPkejuo3mHdLFX53ftXJ.

[^20]: Fluid Quadratic Finance: Cultivating Trust with a Flexible Public Goods Funding Model, 2022. https://www.youtube.com/watch?v=Yl0KH0bNInc.

[^21]: Pinnell, René. 'Artizen'. Our Mission (blog), 13 February 2023. https://help.artizen.fund/en/articles/6767446-our-mission.

[^22]: Team Gitcoin. 'Gitcoin <> UNICEF: A Powerful Quadratic Funding Collaboration Pilot'. Gitcoin, December 2022. https://go.gitcoin.co/blog/gitcoin-unicef-qf-collaboration-pilot.

[^23]: Kirsanow, Karola, and Sílvia Bessa. 'Protocol Labs Research'. Gitcoin Grants Round 15: Getting DeSci on the SamePage (blog), 16 September 2022. https://research.protocol.ai/blog/2022/gitcoin-grants-round-15-getting-desci-on-the-samepage/.

[^24]: Shorin, Toby, Sam Hart, and Laura Lotti. 'Other Internet'. Positive Sum Worlds: Remaking Public Goods (blog), 2 July 2021. https://otherinter.net/research/positive-sum-worlds/positive-sum-worlds.

[^25]: GitCoin - Notion. 'Public Goods Starter Pack', 13 February 2023. https://www.notion.so.

[^26]: Zhu, Henry. 'Illich Reading Club'. HackMD, 13 February 2023. https://hackmd.io/@hzoo/BJAic-DHq#Async-Discussion.

[^27]: ibid 24.

[^28]: Schingler, Jessy Kate. 'Funding Public Goods in Web3 for the Uninitiated'. Medium (blog), 25 May 2022. https://jessykate.medium.com/funding-public-goods-in-web3-for-the-uninitiated-27493693c25c.

[^29]: Muldoon, James. Platform Socialism: How to Reclaim Our Digital Future from Big Tech. London: Pluto Press, 2022.

[^30]: ibid 29.

[^31]: Alisha.eth (last). 'Reimagining Public Goods Funding in Web3'. Alisha.Mirror.Xyz (blog), 29 July 2021. https://alisha.mirror.xyz/PxK8PtWDxon0uBH25-ACLSH1nHa89MFj--XAe_wkR6g.

[^32]: It should also be noted that the open source community's relationship to funding is complex, with some developer communities rejecting external funding for a variety of reasons. Eghbal covers this in Roads and Bridges.

[^33]: Wright, Erik Olin. How to Be an Anticapitalist in the Twenty-First Century. London ; New York: Verso, 2019. Pg. 106

[^34]: Owocki, Kevin. 'Open Source Money Will BUIDL the Open Source Ecosystem'. GitCoin (blog), 30 April 2018. https://go.gitcoin.co/blog/open-source-money-will-buidl-the-open-source-ecosystem.

[^35]: Protocol Labs Research. 'Network Goods', 24 February 2023.

[^36]: Peuter, Greig de, and Nick Dyer-Witheford. 'Commons and Cooperatives'. Communication Studies Faculty Publications, 1 July 2010. https://scholars.wlu.ca/coms_faculty/15.

[^37]: ibid 36.
