# winners-graphic-generator

A windows electron app that inserts character portraits, gamertags, & optional screenshots into a pre-created winners graphic template.

This app specifically creates a graphic for an unconventional but awesome tournament style that has both a beginners bracket & pros bracket. In the future, I'll maybe make a more traditional one. If you want me to do that sooner rather than later, just [shoot me an email](mailto:eclair.fulgens@proton.me).

(the template will be created by someone with art skillz, not some AI slop)

## Credits

I copied the assets (character portraits, fonts, button sprites) used in the [Melee Ghost Streamer](https://github.com/shmeeli/Melee-Ghost-Streamer), so the character portraits & button sprites probably came from both: [The Spriters Resource](https://www.spriters-resource.com/browse/?name=melee&sect=1) and the [Melee HD Asset Library](https://assets.melee.tv/). I'm not sure where the fonts are from tho :sweatsmile:

## Project To-do List

### Planning

- [x] Create an electron project template
- [x] Determine class & module structure
- [x] Get all the assets organized
- [ ] Winners graphic template mockup

### Pogamming

- [ ] Write all the modules
  - [ ] `Validation.mjs`
  - [ ] `FileMgr.mjs`
  - [ ] `SettingsMgr.mjs`
  - [ ] `ResourceMgr.mjs`
  - [ ] `WindowMgr.mjs`
  - [ ] `Screenshotter.mjs`
- [ ] HTML Content
  - [ ] Add content to the first HTML page (infoWindow)
  - [ ] Add content to the second HTML page (tweakWindow)
  - [ ] Add content to the third HTML page (graphicWindow)

### Style Idk

- [ ] Make it look good (10/10 most helpful item on this to-do list 1,000% good job eclair)

## Project Structure

`src/` = where all commonjs electron code goes

`lib/` = where all the modulejs code is

`dist/` = where the packaged electron app gets placed by `@electron/packager`

`res/` = where all the resources used by the BrowserWindow's web content goes

<br>

`res/html`, `res/css`, `res/js` = all the webdev stuff

`res/img` = image resources

`res/fonts` = font resources

## Compiling from source

Once you've downloaded the code, just run the command `npm run dist`, and the dist folder should populate with the packaged electron app.

I use the inno-setup wizard to make the windows installer which is pretty straightforward
