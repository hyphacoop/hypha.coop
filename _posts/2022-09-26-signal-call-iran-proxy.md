---
image: "/assets/images/social/dripline/2022-09-26-signal-call-iran-proxy.webp"
title: 'In solidarity with Iran: a response to Signal’s community call'
author: Hypha
date: 2022-09-26
excerpt: 'Hypha members weigh in on proxy battles and the importance of  local-first networks'
atUri: "at://did:plc:rxduhzsfgfpl2glle7vagcwl/site.standard.document/3mdw2tgonvm27"
---

<figure class="ml0">
<img src="/assets/images/posts/2022-09-26-signal-01.png" alt="This graph shows a large spike on the y-axis on September 14, which then lowers to a slightly higher baseline than previously"/>
<figcaption><em><a href="https://explorer.ooni.org/chart/mat?probe_cc=IR&test_name=signal&since=2022-06-25&until=2022-09-25&axis_x=measurement_start_day">Aggregated data collected by OONI</a> (Open Observatory of Network Interference) showing consistent interference with the Signal app in Iran.</em></figcaption>
</figure>

On September 13th 2022, Mahsa Amini was killed in police custody in Iran; since then, <a href="https://www.theguardian.com/global-development/2022/sep/26/iran-protests-mahsa-amini-at-least-450-arrested-in-northern-province">protests over her violent and unjust death</a> have spread across the country. Iranian authorities have responded by <a href="https://www.amnesty.org/en/latest/news/2022/09/iran-deadly-crackdown-on-protests-against-mahsa-aminis-death-in-custody-needs-urgent-global-action/">shooting and killing peaceful protestors</a> and by <a href="https://twitter.com/netblocks/status/1572651793355603972">cutting off Internet access</a>. Last week, Signal, an app well-known for its solid privacy features, put out a call to its community <a href="https://signal.org/blog/run-a-proxy/">asking for people to run proxies</a> to help people in Iran connect with the app and thus each other. 

Hypha members saw the call and spun up several proxies, alongside hundreds of others who rapidly responded over the weekend. Twitter was quickly swamped with Signal proxy announcements, either publicly posted or privately shared over Twitter DMs. We quickly realized that this would be the beginning of the proxy battle, where the Iranian government races to block the discovery and availability of proxies in their region, as new ones are spun up and their access information trickles into the hands of those who need it.

<figure class="ml0">
<img src="/assets/images/posts/2022-09-26-signal-02.png" alt="A command-line interface with text and green check marks or red crosses next to different proxy addresses"/>
<figcaption><em>A screencap showing publicly announced Signal proxies that are unavailable likely due to misconfigurations, using the code that Hypha members developed. </em></figcaption>
</figure>

Over time, many of these proxies will become unavailable, either because they’ll have their IP addresses blocked by the Iranian government or due to general lack of maintenance. While it may seem a good idea to post a centralized list with current status, this would only aid the censors in easily identifying which IP addresses to block. Therefore, we figured the best thing to do was to publish <a href="https://github.com/hyphacoop/signal-proxy-status/blob/main/README.md">the code to check a list of proxies for functionality</a>. Our hope is that these will be used by folks inside Iran so they can rapidly qualify private lists of Signal proxies that are functional inside the region, and then ration them out via trusted human networks.

In situations of protest and the resulting Internet censorship and shutdowns, it’s often challenging to understand and think through on-the-ground needs of the people affected. Simpler solutions are frequently embraced, which although important, obscure the need to build longer-term and more resilient network infrastructure. For example, people in Iran are not able to sign up for new accounts on Signal because the standard sign-up process includes receiving a verification code via SMS, which isn’t feasible for many right now. Therefore, simply stopping SMS messages, or blocking Twitter, become effective ways to control the prevalence of Signal usage.

<figure class="ml0 ">
<img src="/assets/images/posts/2022-09-26-signal-03.png" alt="This graph shows a large spike on the y-axis on September 14, which then lowers to a slightly higher baseline than previously"/>
<figcaption><em><a href="https://explorer.ooni.org/chart/mat?probe_cc=IR&test_name=whatsapp&since=2022-06-25&until=2022-09-25&axis_x=measurement_start_day">Aggregated data collected by OONI</a> showing an uptick in interference with WhatApps in Iran.</em></figcaption>
</figure>

If the Iranian government shuts down Internet traffic altogether, none of the Signal proxies will work as the Iranian network “splinters” from the global Internet. This requires self-healing network protocols that are local-first and capable of converging quickly on network splits. Network experiments like <a href="https://github.com/cjdelisle/cjdns/">cjdns</a> and <a href="https://yggdrasil-network.github.io/">Yggdrasil</a> have these properties, and applications like <a href="https://briarproject.org/how-it-works/">Briar Project</a> and <a href="https://scuttlebutt.nz/">SSB (Secure Scuttlebutt)</a>-based <a href="https://www.manyver.se">Manyverse</a> and <a href="https://www.planetary.social">Planetary</a> are likely to work better in <a href="https://en.wikipedia.org/wiki/Splinternet">splinternet</a> environments.

The proxy checking code is just a starting point, aiming to provide support as the situation in Iran unfolds. We welcome suggestions on how to extend this work to make it more useful in the region, and encourage organizations who are based in Iran <a href="mailto:hello@hypha.coop">to reach out</a> if they have suggestions for local agencies to work with to build private trustful networks.