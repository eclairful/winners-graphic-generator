# winners-graphic-generator

A windows electron app that inserts character portraits, gamertags, & optional screenshots into a pre-created winners graphic template.

(the template will be created by someone with art skillz, not some AI slop)

## Project To-do List

### Initialization

- [x] Create an electron project template
- [ ] Determine class & module structure
- [ ] Get all the assets organized

### Functionality

- [ ] Add content to the first HTML page
- [ ] Create all the classes & modules
  - [ ] **TODO: see "Determine class & module structure"**
- [ ] Add content to the second HTML page

### Style

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
