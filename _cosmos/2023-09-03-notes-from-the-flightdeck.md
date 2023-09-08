---
title: 'Notes from the Flightdeck: Learnings from launching two consumer chains'
author: Hypha
date: 2023-09-08
excerpt: 'Hypha has launched two consumer chains in four months through the Cosmos Hub Testnets Program. Here is what we learned from the experience.'
---


Since March 2023, the [Hypha team](https://hypha.coop/) has worked closely with the teams building [Neutron](https://neutron.org/) and [Stride](https://www.stride.zone/) to successfully launch two new consumer chains using the [Replicated Security](https://forum.cosmos.network/t/preparing-for-replicated-security/8925) feature of Cosmos Hub. Together we’ve been through [seven launch rehearsals, three synchronized upgrades, one re-launch](https://github.com/cosmos/testnets/blob/master/replicated-security/SCHEDULE.md), and many hours of behind-the-scenes planning. Here’s a roundup of what we learned over the last few months, in the service of making future consumer chain launches as smooth as possible.

### Practice, practice, practice

We started with some baseline knowledge about Replicated Security thanks to our experience facilitating [Game of Chains](https://forum.cosmos.network/t/findings-from-game-of-chains-and-beyond/9720), but each rehearsal flushed out a new set of non-obvious social and technical areas for improvement, for both the consumer chain teams and for our team. Performing launches and upgrades for consumer chains as well as Cosmos Hub itself remains a partially automated, partially manual process. Even as we continue to improve the tools available within the interchain ecosystem, there will always be quirks and edge cases to discover, and practicing big events on testnet has been, by far, the safest and most effective way to learn together.

But simply doing the same thing over and over again isn’t sufficient for rapid improvement. As written in many popular science books, the key to improvement is deliberate practice. We spent at least one hour after each rehearsal to hold retrospectives and more casual conversations around what we could do better for next time.

### Synchronous activities should be thoughtfully timed

It took some iteration to figure out the best time of day and week to schedule coordinated launches and upgrades. After [the emergency Cosmos Hub upgrade](https://discord.com/channels/669268347736686612/798937713474142229/1104129376431374428) that immediately predated the Neutron mainnet launch, we listened to a lot of feedback from validators that performing coordinated activities on short notice, and on Mondays, was difficult to plan for. Fridays were also non-ideal because North America’s Friday midday was already Europe’s weekend. Validators needed time to ask their operational staff to be available if the event was scheduled out of regular business hours, and their security teams needed to be able to verify the safety of the new code they’re being asked to run.

Taking this feedback on board, we started working with consumer chain teams to schedule coordinated activities in the middle of the week, around 15:00 UTC, at which point most of North America and western Europe would be within normal working hours – this cadence eventually became [Testnet Wednesdays](https://forum.cosmos.network/t/introducing-testnet-wednesdays/10656). We recognize that this timing is less equitable to teams based in Asia and eastern Europe, and that’s an area that we hope to improve as Testnet Wednesdays matures as a program.

In addition to weekly scheduling improvements, we also improved the rhythm of launches that involve coordinating multiple chains during the same event. To launch Stride, a consumer chain addition proposal needed to pass on the provider chain, followed by a governance upgrade on the sovereign chain. The window between these two events was extremely short (around 5 minutes) during the first rehearsal, which caused chaos as some validators scrambled to have their binary and cross-chain validation state files in place. For the second rehearsal, we allowed a 20 minute interval, which allowed validators to more effectively follow the sovereign chain transition and build technical context for what to expect during the mainnet launch.


<img
  src="{{ '/assets/images/posts/cosmos/2023-09-08-launch-image.png' | relative_url }}"
  alt="Comic showing a dog and cat preparing to launch a consumer chain from the control panel of the flight control deck."
/>


### Good communication is well-timed, concisely written, and repeated

Communicating about complex, technical concepts in a clear way is one of the biggest challenges. It took us a while to figure out where to put information, when to post it, when to notify folks, who to notify, how to notify the right people, and what was the most critical information that people needed. For the final rehearsals for both Neutron and Stride, we wanted to increase validator participation, to give the respective mainnet launches the best chance at success. To achieve higher participation, we partnered with Abra, Alice, Daniela, and many other folks at the ICF, as well as Milan and Jehan at Informal, to leverage all the validator-oriented mailing lists, various Telegram groups, and channels across Slack, Discord, Signal, as well as social media. 

We built detailed communications plans that included not only the content of messages to go out, but also the exact timing for each message, and who was responsible for it. Hypha would support all communications related to consumer chain activities on the Replicated Security testnet, and as consumer chains approached “graduation”, we worked closely with other Hub contributors to make sure that all information was centralized and well-organized on GitHub and Discord.

Information and conversation sprawl continues to be a challenge that we want to work on in the coming months. We want to build stronger norms about where documentation for joining sovereign chains should live, and perhaps better ways to generally organize information for these types of documents. Additionally, sometimes issues that affect a consumer chain’s operation end up being discussed in the consumer chain’s Discord server rather than Cosmos Hub; in doing so, the Hub’s community misses out on the capacity to build operational knowledge. There are of course tradeoffs to navigate, a fine line between enough information and too much information for Hub validators.

### Key assignment continues to be a challenge

[Consumer key assignment](https://cosmos.github.io/interchain-security/features/key-assignment) was not a widely-understood feature when Neutron launched, and a large number of validators had not performed the key assignment transaction, which played a large role in delaying Neutron from coming online. We empathized with validators that were unable to reuse their provider key on their consumer nodes: at the same time, we also knew that key assignment was a workflow that needed to be improved and socialized well before Stride’s launch.

Stride’s launch was much less turbulent, specifically in terms of the key assignment issue. Likely due to repeated communication pushes and special emphasis during testnet rehearsals, 80% of validators had performed key assignments before spawn time. We learned that the existing key assignment instructions may not account for key management systems such as [Horcrux](https://github.com/strangelove-ventures/horcrux) and [TKMKS](https://github.com/iqlusioninc/tmkms) – those are gaps in the documentation we hope to address in coming weeks.

### Expect infrastructure-related surprises on launch day

One unanticipated challenge during the Neutron launch was the large amount of backed-up packets due to the delay between spawn time and block-producing time. The Neutron team had practiced the process of bringing up a relayer and clearing out the queue plenty of times during rehearsals, but the sheer volume of mainnet packets proved challenging to clear out,  which also delayed our ability to verify that Neutron was interchain secured.

When [Clemens from CryptoCrew](https://twitter.com/ccclaimens) offered to jump and help relay some packets, we learned that calling on experts within the community for help can be instrumental to a successful launch. It should be no surprise that Clemens was asked from the start to be part of the Stride launch’s war room.

### Prepare to roll with the punches

The biggest learning from all of these rehearsals and launches is that the systems we work with are extremely complex, and it’s just not possible to plan for every edge case, so the next best thing we can do is to get better at being adaptive and creative. When Neutron’s persistent chain (baryon-1) as well as a new rehearsal chain (neutron-rehearsal-1) stopped due to [a bug in the consumer key assignment logic](https://github.com/cosmos/interchain-security/pull/846), we scheduled an event to create a new persistent Neutron chain. That new chain (meson-1) encountered a widespread apphash issue, and we made the gametime decision to try again with a new chain (pion-1) which ended up being successful, and remains Neutron’s persistent chain today. 

In the moment, our teams weighed the cost of asking validators to be online for hours against the risk of proceeding to mainnet launch with so many unknowns. The right decision is not always obvious, but we’ve always tried to operate with generosity and empathy towards one another, because we’re all just humans trying to do our best to wrangle some extremely complex systems.

### Upcoming challenges

There are many, many areas where we still want to improve how we support consumer chain teams, as well as the Cosmos Hub testnets program overall. Here is a small sample of areas of improvements that have come up during retrospectives and internal conversations.

#### Persistent testnet chains are useful, but could become more useful


[Persistent chains for Neutron, Stride, and Duality](https://github.com/cosmos/testnets/tree/master/replicated-security) exist today for a variety of purposes: testing out upgrades, testing app integrations and smart contracts, and general soak testing. Because the volume and nature of transactions on testnets is so different from mainnet, their ability to be a harbinger of things to come on mainnet is currently limited. For example, if more validators had used key management systems on the testnet, we may have had more information regarding the limitations of the consumer key assignment issue at the time of Neutron’s launch. Additionally, many validators do not deploy their testnet nodes using exactly the same hardware and key management systems they use on mainnet. We could explore more creative ways to use persistent testnet chains in the future.


#### Slow chain startup times may become a future risk


New consumer chains, particularly sovereign chains that require high uptime, will need to grapple with the uncertain amount of time that it takes a consumer chain to start producing blocks. [In Neutron’s case, it took over a day from the intended launch time until blocks were produced](https://medium.com/the-interchain-foundation/a-recap-of-the-validators-emergency-upgrade-retro-46557d3c9b6c); in Stride’s case, it was several hours. Although things are trending in the right direction, it’s possible that some future consumer chains will not tolerate hours of downtime as well. There are a number of technical solutions that can be explored here, such as relaxing the 66.67% quorum requirement, or programmatically holding off on the sovereign-side upgrade until the liveness requirement is met on the provider chain.

--- 

If you participate in the [Cosmos Hub testnets](https://github.com/cosmos/testnets/blob/master/replicated-security/VALIDATOR_JOINING_GUIDE.md) (or don’t!) and have feedback about your experiences, we’d love to hear from you. You can always contact Lexa ([lexa@hypha.coop](mailto:lexa@hypha.coop), @lexaMichaelides on Discord, TG, and ~~Twitter~~ X) or Denise ([denise@hypha.coop](mailto:denise@hypha.coop)).
