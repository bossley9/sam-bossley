---
layout: layouts/thought
title: Computer Basics
desc: I hope to persuade not only developers but everyone to learn vim and its keybindings. Vim
date: 2020-12-07 14:11:00
tags:
  - tech
---

This is a strange topic for me to discuss considering I've studied computer science officially for nearly four years - but this only reinforces my point. Although I have a stronger computer science knowledge than my non-technical peers, I believe everyone should understand the basics of a computer. For the average person, it makes no sense for us to not understand the basics of the tools we use - and, quite frankly, we shouldn't have to attend lecture for four years to get a decent high-level overview of how our daily-use technology works.

My reason for writing this is so that everyone can develop a basic understanding of how computers function. I believe it is crucial that everyone has a relative understanding of the tools they use on a daily basis. In the American education system, every person is expected to understand the basics of human history and develop core skills such as math, science, and communications. Without such an understanding of daily skills and tools, it becomes impossible to function when these skills are required. Likewise, it is important to have basic computer skills in order to fully utilize our technology. As society grows more and more integrated with technology, it becomes even more essential that we can understand and troubleshoot our own technology.

[What people think programming is vs. how it actually is](https://www.youtube.com/watch?v=HluANRwPyNo)

This is intended to be an informative article for people to be able to reference to in the future. I will first go over computer hardware, then transition to software.

So what exactly is a computer?

Simply put, a computer is by all definitions a machine that perform complex computations. While we normally view desktop PCs and laptops as computers, there are many more computers, such as mobile phones, video game consoles, smart TVs, and even smart fridges.

| ![People make jokes that smart fridges are smart enough to make phone calls](/public/thoughts/computer-basics-fridge-1.jpg) | ![Smart fridges are the "pinnacle of technological advancement"](/public/thoughts/computer-basics-fridge-2.jpg) |
| --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |

It's important to denote the difference between hardware and sofrware. As implied by their names, hardware components are tangible physical computer parts, whereas software components are electrical data components which run using the hardware components. Hardware includes components such as graphics cards, cpus, keyboards, mice, and wifi cards. Software includes components such as bootloaders, kernels, drivers, and of course, applications ("apps" for millenials and zoomers).

Every computer (rather, the majority of computers) is comprised of the same hardware components that allow them to function. The most essential component of any computer is its motherboard. A _motherboard_ is a simple IO (input and output) computer chip board that dictates the core functionalities of a computer (turning on/off a computer, detecting devices such as keyboards, mice, controllers, usbs) and contains an internal clock which syncs with world clock time. This clock is usually powered by a separate CMOS battery, and can actually cause your computer to not start if the battery runs out (surprisingly, it is actually quite rare for a clock battery to completely drain - the only time I've replaced a clock battery was for a computer that was 13 years old).

![A CMOS battery in its designated slot](/public/thoughts/computer-basics-cmos.jpg)

The motherboard is considered the core of a computer because it connects all other physical computer components (hardware) together. When you plug in a usb, or plug in your phone charger, you are physically connecting a peripheral (I'll explain what this is later) to the motherboard.

![A standard desktop computer motherboard](/public/thoughts/computer-basics-motherboard.jpg)

Although the motherboard usually contains basic circuitry to start and configure your computer, you won't be able to see much other than a black screen without a CPU. A _CPU_ (Central Processing Unit) is a hardware component that can be considered the "brain" of the computer. It usually contains complex circuit architectures designed to be able to perform logical operations on data. The CPU starts your operating system, reads your data, opens your applications, and everything that requires computation. That means that the better your CPU is, the faster it can process data (e.g. the faster you computer will be at opening applications, running games, etc).

![An average CPU being placed in its slot](/public/thoughts/computer-basics-cpu.jpg)
_It's an absolute marvel that tiny chips like this act as the brains of all our devices - and they will only continue to grow in computational power._

Because a CPU manages the core functionings of the computer, it can overheat very easily. In fact, if left unprotected, CPUs can rise to temperatures so high that they can melt and destroy both the motherboard and the CPU connected. Fortunately, computer scientists have avoided this catastrophe by introducing cooling systems into all modern computer systems. While there are a large variety of cooling methods available, the two most commonly used in combination are heatsinks and fans.

_Heatsinks_ are large pieces of conductive metal that, as the name suggests, absorb heat from the CPU. A heatsink usually resides directly on top of the CPU alongside one or two fans. Tiny fans are used to blow heat away from the CPU and heatsink to maintain the computer's internal homeostasis. Computer manufacturers have gotten increasingly more skilled at hiding the location and sound of a computer's fans; however, most computers still require slits or grills which allow air to flow out of the computer. This is why it is not ideal to use a laptop on a malleable surface such as a blanket - the blanket can effectively cover all laptop air ports and cause the computer to overheat and melt.

![A standard CPU resting below a heatsink and fan](/public/thoughts/computer-basics-fan-desktop.jpg)
This is an average desktop computer CPU fan. The metal block below the fan is not the CPU - it's actually the heatsink! Below the heatsink is a tiny CPU.

![A standard laptop heatsink and fan](/public/thoughts/computer-basics-fan-laptop.jpg)
Of course, in smaller devices such as the laptop pictures above, heatsinks and fans need to be minimized to fit within the case. The copper metal lines pictured act as a heatsink to carry the heat from the CPU to the fan.

> I also want to brag about the Ryzen 9 CPU I currently have in my desktop. It is one of the best CPUs available today (if not the best) and I never have to wait more than a fraction of a second for any application to load.

I haven't yet answered an obvious question - how does a computer store the data it receives? How does a computer know what files I have on my computer (or what a file even is)? This is what we call memory. _Memory_ is a hardware component that saves current temporary data. This means things such as

1. What applications do you have open?
2. What files are you editing?
3. What browser tabs are you logged into?

Memory acts as a temporary storage for system data so that at any given moment, your computer remembers exactly what you were doing one second ago - otherwise, with only a processor and a motherboard, it will forget everything you just made it do. It's important to note that this memory is dynamic, meaning that it only remembers what you have been doing for the current session temporarily. If you were to turn off your computer and turn it back on, it wouldn't remember what was open and what you were doing before you turned it off. Additionally, if you don't have enough physical memory connected to you computer, it will begin to forget things, such as applications and data, and will not be able to update the screen. Ever had a time where your laptop or phone screen froze? This is probably because one of your applications began using too much memory and the computer temporarily ran out of memory.

Dynamic memory usually comes in the form of DRAM (commonly referred to as RAM). Most computers except mobile phones have 2-4 RAM chips.

![Two RAM chips for a desktop computer](/public/thoughts/computer-basics-ram.jpg)

It's important to understand the distinction that RAM is a _hardware component_ because it comes in the form of a _physical chip_ that is internally plugged into the motherboard. Non-technical people used to think that if your computer was slow, you could download more RAM onto your computer and your computer would run faster. Computer enthusiasts, being the nerds we are, decided it would be funny to feed into this idea and made websites to troll people who thought RAM could be downloaded. Some of these sites are still available even today - and look like legitimate sites, too. If you follow through with them, they will tell you that you've been trolled.

[Download more RAM](https://downloadram.net/)

> Saying that you can download RAM is the equivalent of saying you can download a new phone charger - physical hardware can't be downloaded.

This is exactly why people should understand the core components of a computer.

When a computer is turned on or rebooted, it usually has files, documents, and applications already stored in a file manager. Unlike RAM, this data is persistent, meaning it stays on the computer even after you turn it off. This is commonly referred to as _storage_, and usually comes in a variety of different forms in hardware.

The most prominent form of data storage today is called Hard Disk Drive (HDD) storage. Created in the late 1950's, this hardware component consists of a multitude of stacked metal disks (not the CD disks you may be familiar with, but much smaller and more compact) with an arm reader piece which reads and writes data to each disk. The disks spin at very high speeds while the computer is running, and the disks themselves can survive for as long as 20 years (and in tech, that's nearly a lifetime).

![A cross section of a standard HDD drive](/public/thoughts/computer-basics-hdd.jpg)

This mechanical component, however, was destined to be replaced - is it slow in terms of data reading and writing, and it requires a number of complex moving parts in order for it to function properly, causing high power consumption.

Fortunately, computer scientists have in recent years developed what is known as Solid State Drives (SSDs). You've probably heard of these because of how common they are in modern laptops, phones, and tablets. SSDs come in the form of SSD chips, SSD disks, SD cards, and even flash drives. Instead of using physical spinning disks that must be powered to read data, SSDs instead are comprised of a single computer chip with slight electrical charge. This electrical charge is what is used to store data on the chip. Given by their physical nature, SSDs are much faster than HDDs in data operations and require little to no power to operate. This is the difference between opening Chrome in 7 seconds versus opening chrome in less than a second - and you've probably noticed the difference with newer laptops and phones. However, there are some disadvantages (otherwise we would have stopped using HDDs by now). Due to their precise physical nature, it is more expensive to manufacture.

[A 1TB HDD on Amazon is 40 dollars](https://www.amazon.com/WD-Blue-1TB-Hard-Drive/dp/B0088PUEPK/ref=sr_1_3?dchild=1&keywords=hdd+1tb&qid=1607372288&sr=8-3)

[A 1TB SSD on Amazon is 100 dollars](https://www.amazon.com/Samsung-Inch-Internal-MZ-76E1T0B-AM/dp/B078DPCY3T/ref=sr_1_3?dchild=1&keywords=ssd+1tb&qid=1607372335&sr=8-3)

SSDs also have a limited lifetime. Eventually, the static charge maintaining the data on an SSD will disperse, and after many reads and writes to an SSD, it will become unreadable. However, most modern SSDs have a lifetime so high that it would be almost improbable for a computer to stop working because the SSD's lifetime expired.

I also want to mention a new type of SSDs called NVME SSDs. Most SSDs are unpluggable, meaning they can be mounted and unmounted easily, such as flash drives. These SSDs are called SATA SSDs. Newer SSDs, called NVME SSDs, are chips that mount directly onto the motherboard of a computer. Since they are so close to the CPU, they are able to perform insanely fast data operations at low cost. These SSDs are more common in smartphones and newer laptops (2015+).

TODO nvme vs sata ssd pic
![A visual comparison of a SATA SSD and an NVME SSD](/public/thoughts/computer-basics-nvme-vs-sata.jpg)
The SATA SSD (on the left) is larger and contained within a plastic casing, whereas the NVME SSD (on the right) is a physical plug-in chip.

Using all of the components I just mentioned, it is possible to make a fully functioning computer. However, I have not mentioned accessories that all computers have - peripherals. Peripherals are additional external components that make interfacing with a computer much simpler. This includes components such as monitors, keyboards, microphones, mice, and speakers. These component are by no means essential for a computer to function, but they allow end users to easily provide input to the computer and understand the output.

There's a seemingly common misconception that peripherals are required for a computer to function. The truth is that periphals are required for interfacing with a computer, but they do not affect the functionality of a computer. However, larger companies such as Apple and Amazon tend to make their products' computers and peripherals incresingly more integrated. For example, Apple's iMac is a computer with an integrated display. Similarly, all mobile phones have displays built-in.

Regardless of a computer's impressive hardware underneath, its capabilities are largely determined by how effectively the system utilizes Those hardware components. This system is known as software - the data which operates the computer.

The most basic component of any computer is its BIOS. A BIOS  (Basic Input Output System) is responsible for booting the computer - if fact, so essential that it comes built-in to virtually all motherboards. When you press the power button on a laptop, desktop, or phone, the motherboard's BIOS activates and starts the rest of the system.

The BIOS also performs some extremely important tasks before startup, such as recognizing other hardware components. The BIOS sees what devices are attached, what CPU you have, the types and number of USB ports you have, and other basic hardware information. Most motherboards additionally have BIOS settings that can be configured on boot. On most laptops and desktops you can access your BIOS settings by quickly pressing (spamming) the F2, F10, or F12 keys as soon as the power button is pressed. The BIOS configuration usually allows a user to adjust fan speeds, boot devices, CPU clocking, virtualization, and threading options.

_If you own a device that runs MacOS... It's virtually impossible to open your BIOS settings because Apple generally follows a black box principle with software - a common user doesn't need to see how the black box works, they can just use it. I have many issues with this because users aren't even given the choice to see inside the black box even if they wanted - but computer software autonomy is a topic that is better discussed in a separate article._

I can't talk about BIOS without talking about UEFI, BIOS' (supposed) successor. UEFI or EFI (Unified Extensible Firmware Interface) is intended to be a better version of BIOS in that it provides simpler options and more efficient hardware checks. Additionally, UEFI does not require any system self checks that a BIOS requires, making the computer slightly faster in between reboots.

[Windows 8 UEFI vs Windows 8 Legacy Startup Time](https://www.youtube.com/watch?v=eJFXKNN-oIk)

But why is UEFI not BIOS' successor? Why are computers still using BIOS?

I think [this Reddit thread](https://www.reddit.com/r/linux/comments/4o1nao/bios_vs_uefi/d48subj?utm_source=share&utm_medium=web2x&context=3) sums it up perfectly.

BIOS is severely outdated, but UEFI is not much of an improvement. In addition, Microsoft has dabbled with UEFI secure boot, making it mandatory in their operating systems. Both have their own respective flaws. I presently use UEFI on both of my systems - it is really up to the user to decided which they prefer most. In any case, most Windows and MacOS computers now use UEFI by default.

The BIOS chooses and starts the operating system. The _operating system_ (OS) is the the culmination of system programs, kernel, and libraries which make the computer function as a whole. You're probably most familiar with the MacOS operating system, or the Windows operating system.

It's extremely important to understand what an operating system is and is not. It is:

- system libraries
- system schedulers
- the kernel

However, it is not:

- the elegant interfaces a user interacts with
- the applications you use

A lot of people tell me they love the Windows OS because you can play all kinds of games on it. In fact, what they love is the Windows _drivers_, not the operating system. I've also heard people talk about how they love MacOS for its easy to navigate UI and integration with other devices, and again - what they like is the _window manager_ and _desktop environment_, not the operating system.

_"But Sam, it's essentially the same! And it's a tiny difference, so who cares?!"_

The distinction needs to be made evident because it's important to understand what exactly it is that you might be endorsing. For example, take the phrase "I love school". What does that mean? Does that mean I love learning? Do I love the education system in America? Do I love the friends I made in my class? My point is that people tend to endorse things with blanket statements for the wrong reasons.

And now let me demonstrate that the underlying operating system of a computer does not necessarily dictate the user interface of an operating system.

If I gave you a computer with a screen that looked like this, what operating system do you think it's running? MacOS, right?

![A computer screen with a desktop strikingly similar to MacOS...](/public/thoughts/computer-basics-macos-kde-clone.jpg)

This screenshot is actually from a [KDE Plasma Manjaro Linux operating system with a desktop environment made to mimic MacOS](https://www.reddit.com/r/unixporn/comments/abm4q5/plasma_yet_another_macos_clone/).

And what about this screen?

![A computer screen with a desktop largely dominated by terminal applications](/public/thoughts/computer-basics-macos-riced.jpg)

This is a [riced MacOS desktop using KWM Amethyst](https://www.reddit.com/r/unixporn/comments/7ygv1x/kwmaqua_macos_amethyst_iterm2_pywal/). I think it's evident enough that the user interfaces and applications of a computer are largely independent of the operating system. The operating system is _how the underlying system works_ and not _what the user experiences_.

The final component of a computer is its applications. An _application_ (app) is simply a process that performs some action, usually created by a third party. When most people think of applications they generally think of applications such as Google Chrome or Slack; however, applications can also include system utilities such as `cd` or `ls` (you may have never heard of these programs - take my word that these are system utilities). It's also important to note that the abbreviation "app" is usually attributed to mobile devices such as phone or tablet applications.

I could talk on and on about window managers, system libraries, and low level applications, or even why I think FreeBSD is the best operating system, but I will restrain myself from pouring extensive knowledge into this article because I wrote it to highlight only the computer basics.

The purpose of this article was to clarify some distinctions and help everyone have a better understanding of how their devices work. I hope you learned something!
