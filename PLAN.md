# OOP Planning Document

## Library Hierarchy

```
main.mjs:
{
    screenshot: Screenshotter.mjs;
    settings: SettingsMgr.mjs;
    windows: WindowMgr.mjs;
}
```

## Modules

Assume everything listed is exported unless explicitly marked as "internal";

### SettingsMgr.mjs

depends: FileMgr { default as File, FilePaths };

```
default class Settings {
    #path: string;

    constructor(fpath: string = FilePaths.settings) - assigns #path;

    #getJSObj(): object;
    #setJSObj(data: object);

    #addProperty(key: string) - defines an accessor property for the specified key;

    #get(key: string): any?;
    #set(key: string, value: any?);

    #readAndDefineProperties() - creates getters & setters for every key found in #getJSObj();

    static createSettingsFile(fpath: string, data: object): Settings - creates a file with the specified object as its contents;
}
```

### FileMgr.mjs

depends: `fs { readFileSync, writeFileSync, existsSync }`, `"const.json".filePaths`, `path.join`, `os.homedir`;

```
default class File {
    #fpath: string;

    get path: string = this.#fpath;
    get exists: bool = fs.existsSync(this.#fpath);

    get contents: string = this.read();
    get json: object = JSONDecode or whateever it's called(this.contents);

    constructor(filePath: string, createIfDoesntExist: bool = false);

    read(): string = fs.readFileSync(this.#fpath);
    write(): string = fs.readFileSync(this.#fpath);
}

FilePaths: FrozenObject = "const.json".filePaths;
FilePaths.defaultScreenshotsDir = path.join(os.homedir(), FilePaths.defaultScreenshotDirInsideHomeDir);
FilePaths = Object.freeze(FilePaths);
export FilePaths;

```

### Validation.mjs

depends: fs.existsSync

```
internal function isClass(valueToTest: any?): bool - tests whether valueToTest is a class;

internal function isA_Prim(value: any?, expectedType: a possible value received from typeof): bool;
internal function isA_Instance(value: any?, expectedClass: class): bool - returns value instanceof expectedClass;
internal function isA_Array(value: any?, expectedGenericType: DataType = dt.Any): bool - Array.isArray, but also if expectedGenericType is specified, it tests whether all members of the array are of that type;
internal function isA_Null(value: any?): bool - I sure do wonder what this does;

internal PrimitiveType: Enum<String> {
    ... all the values of typeof but as strings not symbols ...
}

DataType: Enum<Symbol> {
    ...all the possible values of typeof,
    Array,
    Null,
    Any
}
internal dt = DataType;


function isA(value: any?, expectedTypeOrClass: DataType | class, secondaryExpectedType: DataType = dt.Any): bool;
function throwIfNotA(value: any?, expectedTypeOrClass: DataType | class, secondaryExpectedType: DataType = dt.Any);

function validatePath(fpath: string): bool - if fs.existsSync returns false or throws an error, return false, otherwise return true;
function throwIfInvalidPath(fpath: string);

```

### Screenshotter.mjs

depends: `WindowMgr.default`, `SettingsMgr.default`

```
default async function screenshot(window: Window, parentDir: string = "./"): string - resolves with path to screenshot;
```

### ResourceMgr.mjs

depends: `FileMgr.default`

```
Enum<String> Character {
    Bowser,
    CaptainFalcon,
    DonkeyKong,
    DrMario,
    Falco,
    Fox,
    Ganondorf,
    IceClimbers,
    Jigglypuff,
    Kirby,
    Link,
    Luigi,
    Mario,
    Marth,
    Mewtwo,
    MrGameAndWatch,
    Ness,
    Peach,
    Pichu,
    Pikachu,
    Roy,
    Samus,
    Sheik,
    Yoshi,
    YoungLink,
    Zelda,
    Unknown
}

Character.Twink = Character.Link;
Character.Yink = Character.YoungLink;
Character.TheBestCharacterInMelee = Character.Mewtwo;
Character.CarriedByYourCharacter = Character.Fox;
Character.Freaky = Character.Yoshi;
Character.TwentySixTrickCheeseMaster = Character.Marth;
Character.BrowserWindow = Character.Bowser - listen i know this is only funny to me so fuck off;
Character.Random = Character.Unknown;

Character = Object.freeze(Character);
export Character;

class Player {
    gamertag: string = "Player";
    character: Character = Character.Unknown;
    image: File? = null;
    imagePos: [top: number, left: number] - css absolute positioning my worst enemy;
}

default class Tournament {
    static Pro = {
        Top3: Array<Player>(3) = [ Player("Player1"), Player("Player2"), Player("Player3") ];
        TheRest: Array<[place: int, gamertag: string]>(8) = [];
    }

    static Beginners = {
        Top3: Array<Player>(3) = [ Player("Player1"), Player("Player2"), Player("Player3") ];
        TheRest: Array<[place: int, gamertag: string]>(8) = [];
    }
}


```

### WindowMgr.mjs

I realize now that it's hard to plan this part without being familiar with electron. I'ma just call it a day & say the plan's done lmaooo

depends: `Screenshotter.default`, `ResourceMgr { Tournament, Character, Player }`, `Electron { BrowserWindowConstructorOptions, BrowserWindow as BowserWindow, Menu }` - listen, if I can't rename BrowserWindow as BowserWindow on a SSBM project, then freedom is dead in this country

```
default class Window {
    static infoWindow: Window;
    static tweakWindow: Window;
    static graphicWindow: Window;

    static {} - initializes the windows;

    get #isGraphicWindow(): bool - whether or not this === Window.graphicWindow;

    constructor(filePath: string, options: Electron.BrowserWindowConstructorOptions = {}) - filePath is path to HTML file to display;

    open() - displays el window;
    close() - hides el window;
    screenshot() - only works if this.#isGraphicWindow is true;

    getData(formSelector: string?): object - returns an object with the names & values of every input found within the element specified by formSelector (or just searches all elemeents if no formSelector specified);
    parseData(rawInputData: object): Tournament - populates static tournament contents & returns the reference to the tournament class.

    setImgPositionsForPlayers() - populates each tournament's players' imagePos field with the absolute positions found in tweakWindow;

    populateTweakWindow() - populates tweak window with data inputted on infoWindow;
    populateGraphicWindow() - sets all the properties in graphic window (doesnt screenshot yet);
}
```
