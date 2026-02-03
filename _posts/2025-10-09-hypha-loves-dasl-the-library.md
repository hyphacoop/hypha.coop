---
image: "/assets/images/social/dripline/2025-10-09-hypha-loves-dasl-the-library.webp"
title: "Hypha ♥️ DASL: the library"
author: Cole
date: 2025-10-09
acknowledgement: 
excerpt: Stricter, Stronger, Simpler

atUri: "at://did:plc:rxduhzsfgfpl2glle7vagcwl/site.standard.document/3mdw2stfvau2z"
---

<figure class="pb4">
    <div class='flex items-center justify-center' style="width: 100%;">
        <img class="w-100" src="{{ 'assets/images/posts/2025-10-09-puzzle-illustration.webp' | relative_url }}" alt="Illustration showing a group of businesspeople collaborating to assemble puzzle pieces, symbolizing teamwork and problem-solving"/>
    </div>
    <figcaption>
        Illustration by <a href="https://www.stocksy.com/Iravgust">Iryna Auhustsinovich</a> via <a href="https://www.stocksy.com/illustration/5204170/group-of--businessman--trying-to-make-puzzle">Stocksy</a>
    </figcaption>
</figure>

### {{ page.excerpt }}

Hypha has [continued](https://hypha.coop/dripline/hypha-loves-dasl-the-testing-suite/) to work with the [DASL](https://dasl.ing/) team, this time to create a reference implementation in Go: the aptly named [go-dasl](https://github.com/hyphacoop/go-dasl) library.

A quick refresher: DASL (Data-Addressed Structures & Links) is a set of specifications for working with content-addressing. It's a distillation of ideas in the IPFS ecosystem, simplified to be easier to use and implement. For example DASL has their own [CID specification](https://dasl.ing/cid.html), but the number of codec options is much more limited. DASL irons out ambiguities to create a better developer and user experience.

Bluesky [uses](https://atproto.com/specs/data-model) these specs as part of their underlying protocol ([ATProto](https://atproto.com/)), and so at Hypha we were excited about creating a library that ATProto developers can use, potentially reaching millions of users. This continues our development in the ATProto space, as we recently worked with the exciting [Streamplace](https://stream.place/) project to add digital provenance to their video streams.

At this time our two-month development phase is over, and you can view the results [on GitHub](https://github.com/hyphacoop/go-dasl). You can also see how it performs on the [DASL Testing website](https://hyphacoop.github.io/dasl-testing/) (hint: all green!). This library is fully compliant with the DASL specs, and includes a novel CID implementation. The [DRISL](https://dasl.ing/drisl.html) implementation builds on top of an [existing CBOR library](https://github.com/fxamacker/cbor), but with our own modifications for strictness. This approach allowed us to maintain performance comparable to JSON or CBOR without needing to rewrite everything from scratch. In addition to the DASL Testing suite, we have our own set of tests, and then fuzz testing in both directions to catch more obscure bugs.

This library has a variety of advantages over others for users in the IPFS, DASL, and ATProto ecosystems. It's fully compliant, well documented, has a familiar interface (like encoding/json), and uses few dependencies. It is actively maintained, and will continue to be in the coming months. It also supports some configuration flags to change encoding and decoding behaviour.

Here's some sample usage, encoding data:

```go
package main

import (
    "fmt"
    "time"

    "github.com/hyphacoop/go-dasl/cid"
    "github.com/hyphacoop/go-dasl/drisl"
)

type Data struct {
    Name      string    `cbor:"name"`
    Count     int       `cbor:"count"`
    Timestamp time.Time `cbor:"timestamp"`
    ID        cid.Cid   `cbor:"id"`
    Ref       cid.Cid   `cbor:"ref"`
}

func main() {
    // Create a CID for some data
    id, _ := drisl.CidForValue(map[string]string{"hello": "world"})
    ref, _ := cid.NewCidFromString("bafkreifn5yxi7nkftsn46b6x26grda57ict7md2xuvfbsgkiahe2e7vnq4")

    data := Data{
        Name:      "example",
        Count:     42,
        Timestamp: time.Date(2023, 6, 15, 14, 30, 45, 0, time.UTC),
        ID:        id,
        Ref:       ref,
    }

    bytes, err := drisl.Marshal(data)
    if err != nil {
        panic(err)
    }

    fmt.Printf("%x\n", bytes)
}
```

Compared to a non-DASL CBOR library, benchmarks indicate encoding is just as fast, and decoding is 5-10% slower. This is to be expected given the stricter decoding requirements for DRISL. Absolute performance obviously depends on the hardware, but in our testing it was absolutely fast enough for production usage, enough to parse the Bluesky [firehose](https://docs.bsky.app/docs/advanced-guides/firehose) and then some. My personal laptop could parse ~47,000 events per second (on battery power), well above the Bluesky historical peak of [1,500](https://jazco.dev/2025/09/26/interning/).

In addition to CID (including blake3 BDASL support) and DRISL modules, the go-dasl library also supports the [RASL](https://dasl.ing/rasl.html) and [MASL](https://dasl.ing/masl.html) specifications. These are exciting designs that allow for simple content-addressed retrieval (over HTTP), including multi-file bundles like web apps. These modules are more experimental, but work today. The RASL spec in particular supports both retrieval and server hosting, so we hope to see some public RASL servers show up soon.

Although there may be breaking changes ahead (mostly due to DASL specs changing), [go-dasl](https://github.com/hyphacoop/go-dasl) is ready to use today. It's already been trialled in [go-didplc](https://github.com/did-method-plc/go-didplc/pull/17), so you might eventually see it pop up in some of your dependency trees! If you work in the ATProto or IPFS ecosystems, or want to build a new content-addressed system, give it a shot. Please feel free to file any issues you find on [GitHub](https://github.com/hyphacoop/go-dasl).

Thank you to DASLers for all their support on this project: Mosh, Bumblefudge, Robin Berjon, Volker Mische, Bryan Newbold, and of course to my fellow Hypha collaborator Violet.


  
