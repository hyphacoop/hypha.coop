---
title: 'August OKR update'
author: Hypha
date: 2023-09-15
excerpt: 'Upgraded faucets, growing working groups, and end-of-summer busyness'
---

August was an extremely busy month for Hypha. During the week of August 28 to September 1, we held our annual organization-wide retreat. We started working on strategic planning for next year’s roadmap with our friends at Informal and collecting feedback from partners and stakeholders. Many members of our team also took some much-needed vacation time to decompress. Even with the split focus, we made some headway on our Q3 OKR items this month. 

To read our full OKRs for Q3 2023 (start of July -> end of September): [Q3 2023 OKRs Hypha (sharable)](https://docs.google.com/document/d/14ryWCmbAHvGgzySfe1exhexaFUFwMZiWo5Pfctmlnvw/edit)

### O1: During the month of August, there was one Testnet Wednesday.

On August 23, 2023, we upgraded both the release testnet and the provider chain to v12. On the release testnet, 20 validators participated, and the upgrade took 6 minutes. On the Replicated Security testnet, 42 validators participated, and the upgrade took 5 minutes. See previous blog post for details on how we compute upgrade time.

On August 2, no events were scheduled. On August 9, no synchronous event was required, but we asked validators to migrate from v11-rc to the official v11 release binary. On August 16, the mainnet v11 upgrade took place. You can read our recaps in this forum thread:  <https://forum.cosmos.network/t/testnet-wednesday-reports/11021> 

The Replicated Security faucet has been set up in Discord, and the incantation to request faucet tokens has been modified to take an additional argument indicating the chain ID. This allowed us to reuse the existing faucet channel:

<img style="width: 600px; text-align: center;" 
  src="{{ '/assets/images/posts/cosmos/2023-09-15-faucet-screenshot.png' | relative_url }}"
  alt="Screenshot of Discord chat with updated commands, 'request theta-testnet-001 wallet-address' and 'request provider wallet-address'."
/>

In August, there were a total of 83 faucet requests for the Replicated Security testnet. This is up from 72 in the previous month. We are looking into ways to make the faucet requests channel more accessible to non-validators, so everyone can get those testnet tokens.

<img style="width: 600px;" src="https://lh4.googleusercontent.com/1PAuUD6eGRDuRF99CpEpQKA3nMncuwdiLQi6S_owLc0kCHqL-Ws_2qXkhZiZUKeCKs4R2fQjnVKNeDi7TEVr2r1UYX2VulUNlPrHiyeU6eDawpebRhWRjipSBbzm86d6rjhgkqDkjHfxvRMlq8pXe-o" 
alt="GIF of people dancing while dollar bills rain down"/>

### O2: We continued growing the Testnet Working Group.

We added Clemens from CryptoCrew to the Testnet Working Group! Interested in learning more about the Testnet Working Group? Get in touch with <lexa@hypha.coop>.

### O3: Gaia v12 is now live on all testnets, and the mainnet upgrade is scheduled for September 13. 

As part of v12 testing, we now have automated testing to cover liquid staking behavior - this test suite, along with exploratory testing, [uncovered a chain-stopping error in the liquid staking module](https://gist.github.com/dasanchez/1649c169095198bc24c518bedaab80f4#file-issue-md) which was [swiftly fixed in time for the v12 upgrade proposal](https://github.com/cosmos/cosmos-sdk/pull/17436). We’ve also begun testing the upgrade path to v13.

We continued working on our test results display monitor, lovingly named Mycoscope for Hypha’s love of all things mycological. [You can view the very first “test report card” for v12 upgrade testing here](http://mycoscope.polypore.xyz/report_card/7)! In September we’ll continue work on automation that will pull test results directly from GitHub Actions and populate these report cards by inferring related Actions workflow runs.
