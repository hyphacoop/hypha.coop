---
title: 'Introduction and July OKR Update'
author: Hypha
date: 2023-08-16
excerpt: 'Hello World from the Interchain! Hypha works on the Cosmos Hub Testnets Program. Here is a quick summary of the work we shipped in July.'
---

## Hello, July

Hello, world! We're a small team of engineers, researchers, program coordinators, and curious people working on [Cosmos Hub's Testnets Program](https://github.com/cosmos/testnets). This is our new blog where we'll be writing about our work and all things related to Cosmos that we find interesting.

In an effort to bring increased transparency (and hype) to Hypha’s work on the Testnets Program, we’ll be publishing an OKR Report blog post every month. Our full OKRs statement for Q3 2023 is available <a href="https://docs.google.com/document/d/14ryWCmbAHvGgzySfe1exhexaFUFwMZiWo5Pfctmlnvw/edit?usp=sharing">here</a>.

<img
  src="{{ '/assets/images/posts/cosmos/2023-08-15-testnet-wednesday.png' | relative_url }}"
  alt="Comic visualizing the Testnet Wednesday program: scheduling, technical preparation, communications strategy, and launch day."
/>

### O1: During the month of July, there were three Testnet Wednesday dates.

* July 5, 2023: We rehearsed the Stride launch, for the second time!
* July 12, 2023: We rehearsed the Duality launch!
* July 26, 2023: We upgraded theta-testnet-001 and provider to Gaia v11, and pion-1 to Neutron v1.0.4.

There was no testnet event on July 19, 2023 due to the Stride mainnet launch. Throughout the three events, we saw steady validator engagement: 49, 52, 47 validators, respectively.

We’re also working to achieve faster runtimes for testnet events. To count runtimes for upgrades, we start a timer when the proposal goes on-chain, and stop the timer when we see blocks again. For consumer chain additions, we start the timer when the consumer addition proposal goes on chain, and stop the timer when the relayer is up and we’ve verified interchain security with a validator set change operation. For consumer chain upgrades that don’t involve governance proposals, we count the elapsed time between the stop height and getting blocks again. For this month’s testnet events, the runtimes were as follows:

* July 5 Stride rehearsal 2: About 1 hour, 10 minutes from cc-addition proposal to interchain secured
* July 12 Duality rehearsal 2: 1 hour, 6 minutes from cc-addition proposal on-chain to interchain secured
* July 26 theta-testnet-001 upgrade: 7 minutes from proposal (with 5 minute voting period) until blocks
* July 26 provider upgrade: Under 10 minutes from proposal to blocks
* July 26 pion-1 upgrade: 5 minutes from halt height to blocks

We’re also in the process of getting the Replicated Security faucet integrated into Discord, to facilitate the fetching of tokens. We expect to see an increase in requests when that happens in August, but in the meantime, there were 72 faucet requests in July.

We’re also in the process of open-sourcing our preparation checklists and writing about what happened. You can read our recaps in this forum thread:  https://forum.cosmos.network/t/testnet-wednesday-reports/11021 

### O2: Testnet Working Group Updates

The Testnet Working Group had its inaugural meeting on June 22, and the operating charter is almost completed. In the short term, this group will help the core teams at Hypha and Informal to better understand the operational challenges faced by validators with different resource levels. It’s still early days, but we’re already learning more from each other about validators’ motivations for participating in the testnet, and for being part of the Cosmos Hub generally. Interested in learning more about the Testnet Working Group? Get in touch with lexa@hypha.coop!

### O3: Ongoing Gaia upgrade support

Gaia v11 is now live on mainnet (as of August 16), and testing for v12 is underway. As part of v11, we expanded our automation to cover edge cases related to the removal of the liquidity module. Looking towards v12, we’re working closely with the teams at Informal and Stride to perform exploratory testing around the Liquid Staking Module. We’re also continuing to make progress on our automated testing reporting tool, and we aim to have a demoable MVP by the next OKR report.