---
title: "RGB Color Space: Red, Green, and Blue"
categories:
  - Color Space
tags:
  - color space
  - RGB
  - introduction
author: John Hu
---

According to my son's definition, RGB is just Red, Green, and Blue. Yes, it is correct. But the RGB color space is a great invention at Computer world. It helps us to model a color. Although RGB cannot express all of colors, it still the most popular color space at Computer world.

There are two RGB color space, Adobe RGB and sRGB. The are similar to each other but not exactly the same. The sRGB goes better than Adobe RGB. So, this post focuses on sRGB instead of Adobe RGB. Please note that Adobe is also worth to discuss in spire of the popularity of sRGB.

## Expressivity

Chromaticity diagram is used while we discussing on color space. The sRGB chromaticity diagram is somehow the smallest one:

![chromaticity dialog](https://upload.wikimedia.org/wikipedia/commons/1/1e/CIE1931xy_gamut_comparison.svg)

## Combination of RGB

If we view RGB as three axes, we can have a color cube like this image:

![RGB Color Cube](https://upload.wikimedia.org/wikipedia/commons/8/83/RGB_Cube_Show_lowgamma_cutout_b.png)

A combination of RGB can be an index of a color.

In computer world, the value of RGB is from 0 to 255 levels. So, we can have 256 * 256 * 256 = 16,777,216 colors in our computer.

## How to Handle the Addition of Two Colors

How to add two colors into one is a common question. The simplest one is to add them directly. Like the output of color rgb(1, 2, 3) + rgb(4, 5, 6) is color(5, 7, 9). A simple RGB color select can be found here:

<iframe src="https://leather-guardian.hyperdev.space/" width="350" height="450"></iframe>


## RGB Game

The addition of two colors is the base of our first [color sense game](/game.html). This game is trying to test your RGB sense. It is to check if you can create target color through R, G, B three colors.

This game increases a level one by one. The level here means value range of a color. If level 1, it is from 0 to 2. The maximum level is 253 where the color is from 0 to 255.

[Try your best now...](/game.html)

