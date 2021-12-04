<img src="https://bogstandard.github.io/lapland-golf-club/assets/images/logo.svg" width="180" height="180" align="right">

# 🌲 Lapland Golf Course

The course that hosts the prestigious [Lapland Golf Club](https://bogstandard.github.io/lapland-golf-club/)!

This custom Jekyll theme gets pulled in via Github Pages & operates as an automated clubhouse for code golfing seasons. This was built with golfing Advent of Code as the focus but can be used for other seasons, other theme variants are coming soon.

## Establishing a Club

Fork or Clone the [Lapland Golf Club repository](https://github.com/bogstandard/lapland-golf-club), remove any directories you don't need, then edit `index.md`, `README.md` and **most importantly** `_config.yml` to your liking and to match your desired players. This config can be updated at any time, so don't stress it too much.

Then activate Github Pages for the repository with Jekyll toggled. Your edited `_config.yml` will provide the body copy & player information.

The [Lapland Golf Club repository](https://github.com/bogstandard/lapland-golf-club) will always be the most up-to-date instance of the Jekyll theme and so is your best source of reference if you're confused.

### What is a `.scorecard`?

A `.scorecard` is a special file that sits in the base directory of where a player is commiting their solutions for each hole of the season. The URL of this `scorecard` is provided to the club `_config.yml`, which then allows the players solutions to be scored.

The player must fill out their `.scorecard` when they've completed a solution, this part is not automated to avoid non-solutions being counted.

### How are scores counted?

Leading & trailing whitespace is trimmed from each line of a solution, the characters are counted. Lines beginnning with `#` or `//` are not counted. It's recommended players **do not** leave comments at the ends of lines as these will be counted.

#### The Club Scoreboard

Players are ranked on the following algorithm `(1/their_challenges_done)*their_average_score`. The lower the result, the closer to 1st place. This algorithm is used to prevent slower player ranking better by keeping their average low by way of not completing challenges.

### Extra Features

A **Light and Dark mode** is included with the club, these include snow and soft furnishings.

An optional **Advent calendar** of club specific images is avaliable, if you [provide the correct PNGs for the advent days](https://github.com/bogstandard/lapland-golf-club/tree/main/assets/images/advents) in your club repo this will appear to users.

## Contributing

Bug reports and pull requests are welcome. This project is intended to be a safe, welcoming space for collaboration, however contributors are not currently expected to adhere to a code of conduct. Just imagine you're in a very comfortable clubhouse and conduct yourself accordingly.

## Development

To set up your environment to develop this theme, run `bundle install`.

Your theme is setup just like a normal Jekyll site! To test your theme, run `bundle exec jekyll serve` and open your browser at `http://localhost:4000`. This starts a Jekyll server using your theme. Add pages, documents, data, etc. like normal to test your theme's contents. As you make modifications to your theme and to your content, your site will regenerate and you should see the changes in the browser after a refresh, just like normal.

We are also using Laravel Mix for the Javascript compiling, ensure you run `npx mix watch` at the same time as above.

## License

The theme is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

