---
image: "/assets/images/social/dripline/2024-06-24-timewave-interview-with-udit.webp"
title: Running the Interchain Security Lightning Experiment
author: Violet
date: 2024-07-24
acknowledgement: Violet is a probationary member at Hypha Worker Coop, and a test engineer on the Interchain practice area.
excerpt: Testing blockchain software at scale
atUri: "at://did:plc:rxduhzsfgfpl2glle7vagcwl/site.standard.document/3mdw2t4qta52b"
---


<!-- replace with relevant image -->
<figure class='flex flex-column pb6'>
  <img src="{{ '/assets/images/posts/2024-07-25-running-the-isle.webp' | relative_url }}" alt="group of kayakers going on an adventure on a lake nestled between forested mountains on a nice summer's day" class="w-100 w-50-l br2 pb2">     
  <figcaption>
    Photo by <a href='https://www.stocksy.com/RonComeau'>Ronnie Comeau</a> via Stocksy
  </figcaption>
</figure>

Testing blockchain software can be challenging. A new version of, say, Gaia (which powers the [Cosmos Hub](https://hub.cosmos.network/main)) will be installed in a large array of environments, and needs to work on all of them regardless of how esoteric users' operations become. Blockchains are thus often tested by starting a secondary network, a testnet, that runs the same software as the main blockchain but treats its tokens as funny money with no value. This allows testnet coordinators to run operations on a testnet with low risk.  

For a testnet to be useful, it should represent the environments of folks who'll run validators in the mainnet. The best way to do this is by inviting those validators into the testnet, and paying them mainnet tokens for their participation. This also means that the testing team can design exercises for the validators. If, for instance, the format of proposals has changed, we can ask all validators on the testnet to submit a dummy proposal and incentivize those who do.  

This post is an account of a testnet exercise Hypha ran in May 2024. We dubbed it the Interchain Security Lightning Experiment (ISLE), and it was a week-long event intended to exercise new partial set security (PSS) functionality before its introduction into the Cosmos Hub. Because the Cosmos Hub is intended as a common blockchain that other chains can connect to, this exercise required coordination not just with testnet participants, but with consumer chain development teams, too. Participants and stakeholders generally agreed that ISLE was quite successful. Hopefully this post can help illuminate why, and help you design similar exercises.  

## So what's PSS?

A blockchain works by having a set of servers, the validators, sign the blocks that make up the chain. The validators all check each other's work to prevent malicious blocks from being committed. This means that given a large and diverse set of validators, the chain can be sure that only bona fide transactions are being committed.  

The magic of the Cosmos Hub is that it's intended to help new chains find a validator set easily. It does this by allowing new chains, called "consumers" of the cosmos hub, to borrow its validators. In other words, validators on the main provider chain are, under certain circumstances, obligated to validate consumer chains.  

Adding a consumer chain requires it to pass a simple majority vote of the validators. It used to be that once a consumer chain was added, the top 95% (by stake) of validators in the hub chain were forced to validate on the consumer chain. This made it expensive to launch new chains and disincentivized validators for voting "yes" on new launches.  

The solution to this is dubbed "Partial Set Security," PSS, because it allows only a part of the Hub's validator set to sign consumer chains. This can happen in one of two ways: the chain can declare that the top N% of validators on the hub need to sign, or else it can say "anything goes," and allow each individual hub validator to opt in or out as they like (of course, if everyone opts out, the chain doesn’t run). It's these kinds of chain launches that ISLE was designed to exercise.  

## Running the testnet

Like regular testnet ops, ISLE was incentivized: participants were assigned points for completing tasks during the event and those points were then turned into ATOM payouts. We were able to recruit 45 of our testnet validators into active ISLE participants, corresponding to about 25% of the active validator set on mainnet. Excellent turnout!  

The exercises consisted of launching a number of chains with different configurations. This included configuring different sets of validators that needed to be running each chain. Validators had to actually provision and run infrastructure for the consumer chains to be paid out, and could lose points for downtime on consumer chains. Since one of the key configuration factors for a consumer chain is what percentage of the top validators need to be running it, we reassigned stake so that all validators would have a chance to wind up in, say, the top 80%.  

Over five days, we launched a total of six consumer chains on our testnet:
- On day 1, we warmed up with a top-80% chain
- On day 2, we launched a top-60% chain, and an opt-in chain
- On day 3, we launched an opt-in chain without anyone opting-in, simulating a failed chain launch
- On day 4, we previewed a new partner chain, Elys, which will land as a PSS consumer of mainnet in the near future.
- Finally, on day 5, we launched an opt-in chain and didn't opt in any of our validators; this made for an open-ended playground where participants could control a majority of the stake  

We found the forum feature in Discord very useful in structuring our communications. We started individual discussion threads for each chain so that validators had a clear starting point for any issues they ran into, and kept announcements to a separate channel that only we could post to. Had we tried to shove everything into a single #isle channel, the noise would have been unworkable.

## What did we learn?

### I: We can do ambitious things

Sometimes you don't know where your skills are as an organization or community until you put them to the test. The last big testnet exercise we ran was in 2022; it involved launching five consumer chains over the course of a month, and it was full of surprises for the testnet team, the dev team, and participants. That we were able to launch six chains in five days shows how far everyone has come. The community of validators we've nurtured in our regular testnet is immensely valuable and knowledgeable. As for ourselves, we've learned to run communications well, and are able to get information into validators' hands in ways they can use.  

### II: Validators love finding things to test

You might think that, with points on the line, validators might consider sticking to the safe scripts that we provide. But they, as much as anyone, understand the value of hitting corner cases. For instance: launching a consumer chain requires that validators tell the provider what key they'll be using to sign blocks in the new chain. Validators found all kinds of awkward times and ways to do this. ‘What if I say I'm gonna use the same key I use in the provider chain, wait for the chain to launch, and then recant?’ ‘What if I switch keys part way through launching the chain?’ Validators know that these scenarios may be encountered one day, when some regular chain op has failed and they're figuring out creative ways to recover. It's in their interest to make sure these paths work, and that they understand how precisely they work.  

### III: Just because it isn't being tested doesn't mean it has no bugs

A relayer is a piece of software that relays transaction packets from a provider chain to a consumer chain and back. Crucially, this includes a packet where the consumer chain tells the provider chain "validator X has tried to do something malicious to me! Please punish them accordingly."  

Relayers work the same way after PSS as they did before PSS, so imagine our surprise when we went to test a scenario with malicious validators, only to find that the evidence packets weren't being relayed! We certainly didn't expect the most serious bug we found to be in an unchanged component, but [Hermes 1.8.3](https://github.com/informalsystems/hermes/releases/tag/v1.8.3) now properly relays these packets.

### IV: There's always at least one surprise

In this case, the surprise involved previously onboarded consumer chains. Earlier, we mentioned that before PSS, chains had to be validated by 95% of the validator set. This, however, didn't prevent validators in the bottom 5% from choosing to validate those chains. When we upgraded to PSS, those old consumer chains were made top N chains with N=95%, and validators in the bottom 5% were kicked off their validator sets. This isn't a big deal, as they can always opt in manually afterwards to keep running the chain, but it's good that we found this before PSS hit mainnet!  

## Conclusion

An exercise like ISLE takes a lot of coordination and preparation to be successful. If you're starting your adventures with running a testnet, odds are things won't go as smoothly as they did for us, but that's the fun: building up a community of testnet validators and helping them develop the right mindset is its own reward. Given time, testnet exercises have less to do with ensuring the software works as described than they do with developing community know-how and making people feel like active participants in the direction of a blockchain. This kind of institutional robustness is, in turn, as important to the long-term longevity of a decentralized project as is the tech powering it.
