---
image: "/assets/images/social/dripline/2025-07-03-are-we-a-credit-card-yet.webp"
title: "Hypha ♥️ DASL: the test suite"
author: Cole
date: 2025-07-29
acknowledgement: 
excerpt: Writing 102 tests for science

---

<figure class="pb4">
    <div class='flex items-center justify-center' style="width: 100%;">

        <img class="w-100" src="{{ 'assets/images/posts/2025-07-29-concept-illustration-with-variety-hands-connect-dots-with-lines.png' | relative_url }}" alt="Four illustrated hands of varying skin tones hold and stretch lines linking nodes, forming a tangled network on a pink background."/>
    </div>
      <figcaption>
            Illustration by <a href="https://www.stocksy.com/Iravgust">Iryna Auhustsinovich</a> via <a href="https://www.stocksy.com/illustration/6878950/concept-illustration-with-variety-hands-connect-dots-with-lines?zs=1">Stocksy</a>
    
        </figcaption>
</figure>

### {{ page.excerpt }}

Recently, Hypha got the exciting opportunity to work on a “red team” project, where we improve software by poking holes in it, twisting it, and seeing what breaks. We had applied for and were accepted to an [IPFS Implementation Grant](https://ipfsgrants.io/utility-grants/), called DASL Testing. After some nice words were written about us on the [IPFS blog](https://blog.ipfs.tech/2025-05-grants/), it was time to get to work.

For those who are unfamiliar, [DASL](https://dasl.ing/) (Data-Addressed Structures & Links) is a set of specifications for working with content-addressing. It’s a distillation of ideas in the [IPFS](https://ipfs.tech/) ecosystem, simplified to be easier to use and implement. For example they have their own CID specification, but the number of codec options is much more limited. At Hypha we’re excited about this effort, because we have firsthand experience working with IPFS through our partner [Starling Lab](https://www.starlinglab.org/). There’s been several times when everything seemed to be going smoothly, until it turned out a cloud provider was hashing data differently from us and nothing would match. DASL irons out these ambiguities to create a better developer and user experience.

At the time, the DASL team was still in the process of developing their specification for “[dag-cbor](https://ipld.io/specs/codecs/dag-cbor/spec/)”, a deterministic representation of [CBOR](https://cbor.io/) (like JSON, but binary). The idea behind our grant was to develop a test suite for the many dag-cbor libraries to see how they performed. This would make the behaviour of existing libraries visible so buggy libraries could be improved, and so the DASL specification for CBOR could better represent what happens in practice.

Now that the grant is complete, you can see the final results on [the website](https://hyphacoop.github.io/dasl-testing/) and the source code on [GitHub](https://github.com/hyphacoop/dasl-testing). The test suite covers both CBOR and CIDs, and incorporates eight different specifications through 102 handwritten tests. Nine libraries across five programming languages are tested, with ongoing CI for new releases. A couple of these libraries are used by Bluesky or are aimed at its underlying design, the AT Protocol.


<figure class="pb4">
    <div class='flex items-center justify-center' style="width: 100%;">

        <img class="w-100" src="{{ 'assets/images/posts/2025-07-29-dasl-testing-summary.png' | relative_url }}" alt="screenshot of the DASL Testing dashboard, showing donut charts for basic and dag‑cbor suites across multiple libraries (go‑ipld‑prime, go‑ipld‑cbor, js‑dag‑cbor, python‑libipld, serde_ipld_dagcbor, libipld, java‑dag‑cbor). most donuts are green with small red segments, indicating a few failures. "/>
    </div>
      <figcaption>

            Quick overview graphs show test cases passing and failing for each library and group of tests
    
        </figcaption>
</figure>


The test suite provides an excellent quality indicator that makes the state of different libraries easy to see, and could help a developer decide which one they’d want to use.


<figure class="pb4">
    <div class='flex items-center justify-center' style="width: 100%;">

        <img class="w-100" src="{{ 'assets/images/posts/2025-07-29-dasl-testing-table-view.png' | relative_url }}" alt="screenshot of a pass‑fail matrix for dag‑cbor cases. rows include indefinite byte string, indefinite string, and bignum, with mostly green PASS cells. notable red FAIL cells appear for go‑ipld‑prime and go‑ipld‑cbor on indefinite strings and bytes, and for serde_ipld_dagcbor on certain bignum and map with int key tests."/>
    </div>
      <figcaption>

            A view of the individual test data and which libraries pass and fail
    
        </figcaption>
</figure>


Although DASL’s CBOR specification is still in progress (under the name [DRISL](https://dasl.ing/drisl.html)), this grant resulted in numerous bug fixes; something I’m quite proud of. After the test suite was written, I filed [bug reports](https://github.com/hyphacoop/dasl-testing/issues/3) against the relevant libraries, focusing on the most important “Tier 1” issues. This resulted in numerous bug fixes across three libraries. Maintainers that responded were eager to go beyond Tier 1 and fix all kinds of failing tests.

Three kinds of tests were written: roundtrip, invalid input (the decoder should raise an error), and invalid output (the encoder should raise an error). With enough libraries, some patterns in test failures emerged. In the “basic” section, several libraries struggled to implement the full CBOR integer range, since it extends beyond the standard 64-bit signed integer. Another common failure was to validate UTF-8 strings, an easy-to-miss part of the CBOR specification.

In the tests focused on dag-cbor, there were unfortunately many failures for the official Go and Rust libraries due to non-strict decoding. This is [allowed](https://ipld.io/specs/codecs/dag-cbor/spec/#decode-strictness) by the dag-cbor spec, but ideally a strict decoding option would be available. These test failures have helped identify what level of strictness libraries are adhering to, and therefore which ones would need to be rewritten to support a potentially stricter DASL specification.

This project will continue to support developers in the DASL and IPFS ecosystems. The CI will automatically update the website when new library versions are released, so it will continue to reflect the ecosystem. Developers who are writing new libraries can pull in the test data and use it, while maintainers who I’ve contacted but haven’t made yet made changes will still be able to see which tests pass and fail.

Thank you to IPFS and DASL team members for all their support on this project: Mosh, Bumblefudge, Robin, and Lidel.


  
