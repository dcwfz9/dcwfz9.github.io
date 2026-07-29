---
title: "My SF Apartment Has a Thermal Lag Problem"
date: 2026-07-13
draft: true
description: "Ten days of indoor vs. outdoor temp and humidity data from one IKEA sensor, one automation, and an accidental RF weather experiment."
tags: ["home assistant", "data", "SF", "hardware"]
---

I needed rechargeable batteries. I added an IKEA TIMMERFLOTTE Zigbee temp/humidity sensor to the cart too. It was $12. I put it in the living room because it's the center of the apartment, between all the windows, and seemed like a representative spot. No real plan. That turned into a 10-day experiment.

Here's what the data showed.

---

## The Setup

One sensor. IKEA TIMMERFLOTTE, Zigbee, paired to Home Assistant via ZHA. Living room, roughly centered in the apartment. I pulled outdoor data from Pirate Weather via a template sensor in HA, using coordinates for my building.

No weather station. No second sensor. One room, matched against hyperlocal forecast data.

---

## What the Temperature Data Looks Like

{{< chart >}}
<!-- INSERT: 10-day indoor vs. outdoor temperature overlay chart -->
<!-- indoor: sensor.living_room_timmerflotte_temp_hmd_sensor_temperature -->
<!-- outdoor: sensor.outdoor_temperature -->
<!-- Format: dual-line, °F, 10-day window -->
{{< /chart >}}

The outdoor temperature swings 20-25°F between night and day. The indoor temperature barely moves: roughly 68-76°F across the entire period.

That sounds fine until you look at the timing. On hot afternoons, indoor lags outdoor by 2-3 hours. By the time the apartment starts cooling down, outdoor has already been below indoor for hours. The window I could have opened was open longer than I realized.

One anomaly: on July 13, indoor temp jumped about 1.5°F in 20 minutes starting at 7:59am, then stabilized. East-facing windows, curtains open since 6:45. Morning solar gain hitting the sensor directly. Worth noting: the sensor isn't in a shadow box, so direct sun moves it. On a chart, it looks like a data spike. It isn't.

---

## Humidity: SF's Actual Variable

{{< chart >}}
<!-- INSERT: 10-day indoor vs. outdoor humidity overlay chart -->
<!-- indoor: sensor.living_room_timmerflotte_temp_hmd_sensor_humidity -->
<!-- outdoor: sensor.outdoor_humidity -->
{{< /chart >}}

Outdoor humidity spikes to 85-90% on fog mornings, usually before 8am. Indoor humidity stays 45-60% through those same windows. The apartment doesn't breathe fast enough to import the fog.

This matters more than temperature for comfort. A dew point above 60°F starts feeling muggy. SF outdoor air crosses that line on fog mornings. Waiting until noon to open windows means you mostly miss the humidity spike and get the cooler air.

---

## The Ventilation Window Problem

The question I actually wanted to answer: when should I open the windows?

{{< chart >}}
<!-- INSERT: crossover chart — times when outdoor temp drops below indoor -->
<!-- highlight the 62°F floor (outdoor too cold to be useful) -->
<!-- mark the 5pm alert window vs. actual 2-3pm crossover -->
{{< /chart >}}

On warm days, outdoor temperature drops below indoor around 2-3pm. My alert fires at 5pm. So I'm missing 2 hours of free cooling every afternoon.

The 5pm time was conservative. The data says earlier is better, at least in July.

I added an automation: when outdoor temp drops below indoor AND outdoor is above 62°F, send a Telegram notification once per day. The 62°F floor filters out cold SF evenings where opening windows would just chill the apartment without moving the thermal needle usefully.

The alert is working. Whether I actually open the windows is a different problem.

---

## Ventilation Score

{{< chart >}}
<!-- INSERT: daily bar chart — hours where ventilation conditions were active -->
<!-- sensor.ventilation_hours_today, 10-day view -->
{{< /chart >}}

I added a HA template sensor that tracks daily hours where outdoor < indoor AND outdoor > 62°F. I'm calling it a ventilation score. It varies day to day based on how hot it gets and how fast outdoor cools.

The goal isn't to maximize it. It's to know whether I'm taking advantage of the window when it exists.

---

## One More Thing: RF as a Weather Sensor

While pulling the temperature data together, I ended up with a second weather proxy I wasn't expecting.

I have an HDHomeRun FLEX DUO on the network, a two-tuner OTA TV receiver. I scanned all broadcast channels and found that channel 28 (557 MHz, UHF) locks with ss=97/snq=100, the strongest signal in the band. I dedicated tuner 1 to that channel and set up a poller that logs signal strength every 5 minutes alongside NWS observations from KSFO.

The reason this works as a weather proxy: UHF radio waves attenuate in rain and heavy moisture. It's called rain fade. A consistent broadcast signal at a fixed frequency drops measurably when precipitation or dense fog is in the path between the transmitter and the antenna. The effect is small but real, and it's in the data.

{{< chart >}}
<!-- INSERT: HDHomeRun signal strength (ss/snq) vs. KSFO humidity and precip -->
<!-- logged to ~/Code/Dex/logs/hdhr_weather.csv -->
<!-- 10-day view, 5-min resolution -->
{{< /chart >}}

I'm logging this for the same 10-day window as the apartment data. The interesting comparison: does the RF signal drop correlate with the outdoor humidity spikes the apartment sensor sees in the morning? If it does, a TV antenna is a passive weather instrument.

---

## What's Next

A few things I want to try, in rough priority order:

1. **Dew point alerts**: alert when indoor dew point crosses 60°F (the muggy threshold). Temperature and humidity are both available, so this is a template sensor.

2. **Adaptive curtain timing**: use the indoor/outdoor crossover time to decide when to open curtains each morning. Open earlier on cool days to pre-cool before it heats up, later on warm days to block solar gain longer. Weekends only since I want a fixed schedule on weekdays.

3. **Fan automation**: I have two fans. The short one runs off a smart switch, so it can be automated now. The tall one uses an IR remote, which means I need an IR blaster first. The short fan goes on when ventilation conditions are active and I'm home.

4. **Signal vs. weather validation**: after 10 days of RF logging, check whether the HDHomeRun signal drops correlate with fog mornings and precipitation events. If the correlation is real, the OTA antenna on the roof is a passive rain gauge.

---

## The Data

All of this runs on Home Assistant. Sensor data is from the IKEA TIMMERFLOTTE (Zigbee) and Pirate Weather. The RF poller is a Python script using `hdhomerun_config` against the HDHomeRun's local API. NWS weather is pulled from `api.weather.gov/stations/KSFO/observations/latest`.

The charts above will be generated from 10 days of data starting July 13, 2026.
