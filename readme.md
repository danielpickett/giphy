# Overview

This project is for Code Louisville's Front End Web Development session (fall 2018).

This project is a clone of the Giphy website using Giphy's own API to enable search of gifs from their database. I did this project because we started using Slack at work and the Giphy integration for Slack is terrrible. Previously, we used Stride by Atlassian which had a pretty decent Giphy integration that showed a side panel with Giphy search and displayed a scrollable panel of results. Slack just shows one gif at a time and has a "shuffle" button to show the next gif if you don't like the first one. I tried using the Giphy website, but that didn't allow me to drag gifs from Chrome onto my desktop. Instead, dragging gifs from giphy.com just saved a url link. So I made this app to return actual gif files that can be dragged to the desktop and then onto Slack.

# Hosted Version

This app is hosted on Github pages [here](https://danielpickett.github.io/giphy/).

# Important Compatibility Note

This app works great in Chrome, but in Firefox and Edge there's an issue (I'm not even checking IE). I think it's related to my use of `window.stop()`. When the little plus sign (+) button is clicked for the lightbox, all the gifs stop animating. It appears that in Firefox and Edge, `window.stop()` not only stops the loading of queued gifs, it also stops the animation of fully loaded gifs, and it never restarts them.

# More to Come

I consider this project done and available for early review, but there is some more commentary I will try to give if I have the time before the deadline this Friday.