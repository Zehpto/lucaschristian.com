---
title: "ISTS 16 CTF - DNS Tunneling"
description: "A forensics CTF challenge analyzing DNS tunneling, Base64 encoding, and encrypted zip extraction using packet capture analysis."
pubDate: 2018-04-25
tags: ["CTF", "forensics", "DNS", "networking"]
---

At this year's ISTS 16, I had a great opportunity to create a forensics CTF challenge which I thoroughly enjoyed making. I will be analyzing the challenge, both the solution as well as conceptually.

For the challenge, we are provided a packet capture with roughly thirty-two thousand frames, and a hint: "Knock on the door and get the flag."

## Initial Analysis

After a brief opportunity to analyze the packets in Wireshark, we can see there is anomalous DNS traffic. When filtering on DNS traffic in Wireshark, the packet capture becomes much more manageable with only 178 interesting packets. From here we can notice a pattern. There are suspicious queries for odd subdomains of many well-known websites. After a quick glance at the subdomain field, we can correctly identify the strings to be encoded with Base64. This strongly suggests DNS tunneling between the client and the DNS server.

It is at this point where many participants encountered the first major hurdle of the challenge. Instead of instinctively concatenating the Base64 which decodes to nothing useful, we must first analyze the strings individually.

## Reversing Base64 Strings

When we look at the strings closely we notice some have the padding (equal signs) in the leading section of the string. In Base64, the padding is only found at the end of the string; it's never found at the beginning. It is at this point where we may be scratching our heads wondering whether these strings are related in some way. If we try to reverse the character order and then Base64 decode, we see common subdomains but nothing that hints at where the flag might be.

Since, in Base64, padding characters are not required to be in every Base64 string it is a safe assumption that there are other strings polluting the DNS traffic, maybe even attempting to hide something else.

## The Evil Bit Discovery

After some digging in the packets of the DNS requests that were not decoded to recognizable strings, we find that the corresponding DNS responses have the reserved/evil bit set. This might be the artifact we need to segregate the traffic.

If we try to concatenate only the Base64 strings that has the Evil bit set in the corresponding DNS Response we have the following string:

```
UEsDBBQACQAIAGdwJkyljltuNQAAACcAAAAIAAAAZmxhZy50eHSMWzPKcAkyzhfVW/PzZ00zfVz6BljWF4g9upGjFAI5MsU1kZvSR/EKB7plANevbsEmLyjxslBLBwiljltuNQAAACcAAABQSwECHwAUAAkACABncCZMpY5bbjUAAAAnAAAACAAkAAAAAAAAACAAAAAAAAAAZmxhZy50eHQKACAAAAAAAAEAGAB+FuEAIYfTAbKLGD+rhdMBsosYP6uF0wFQSwUGAAAAAAEAAQBaAAAAawAAAAAA
```

This time, when we attempt to decode the string we have some reassurance that this is what we are looking for. We see the file header "PK" indicating it is not only a file but the file type is a Zip and inside is the flag.

## The Password Challenge

Unfortunately, when trying to extract the flag we are prompted for a password. This is an encrypted Zip.

Up until this point, all the interesting information was found in DNS traffic; we can assume the key can also be found somewhere in these packets. We can guess that everything in the packet capture has a purposed and there is no wasted data.

We have already established that the encoded subdomain strings were not part of the Zip file but they were suspicious and probably add some value to the challenge besides obfuscating the Zip. If we consider the sequence of relevant and irrelevant subdomains we can get a binary sequence. This sequence represents all the set and unset Evil bits, when concatenated and decoded, it yields an ASCII string we can use as the password.

## Solution

We now can extract the text file and read the flag!

## Challenge Design Retrospective

I thoroughly enjoyed making the challenge this year, it was not particularly easy. One participant, however did successfully complete and retrieve the flag.

There were many red herrings inserted into the challenge to try distracting the participant from noticing the DNS traffic. Some of these pitfalls included ICMP tunneling, Hex encoded strings, and modified ARP queries.

My favorite part was Base64 encoding the Zip and breaking it into chunks that were divisible by the number of bits in the binary encoded password. This yielded one bit per DNS transaction. The binary bit was then set in the reserved bit field of the DNS responses. Simultaneously, the number of sections the encoded Zip is broken into is reflected by the number of DNS requests and subsequently stored in the subdomain section of the query.

This resulted in the even distribution of file segments across each of the requests where the corresponding Evil bit is set and unset where there is no file data in the corresponding request.

I have high hopes to make new challenges next year that tell a story spanning multiple challenges.
