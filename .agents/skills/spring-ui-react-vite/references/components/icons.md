# Icons

All icons are imported from `@ringcentral/spring-icon`. Do NOT use `lucide-react`, `react-icons`, or any other icon library.

## Naming Convention

Icons follow the pattern: `{Name}{Size}` where Size is `Md` (medium, 20px), `Sm` (small, 16px), or `Lg` (large, 24px).

Most icons are only available in `Md` size. Some have `Sm` or `Lg` variants for specific use cases.

```tsx
import { SearchMd, EditMd, TrashMd, PlusMd } from '@ringcentral/spring-icon';
```

## Usage with Components

### With Icon component (standalone)
```tsx
import { Icon } from '@ringcentral/spring-ui';
import { SearchMd } from '@ringcentral/spring-icon';

<Icon symbol={SearchMd} size="medium" />
```

Icon sizes: `xsmall`, `small`, `medium` (default), `large`, `xlarge`

### With Button
```tsx
import { Button } from '@ringcentral/spring-ui';
import { AddMd, ArrowRightMd } from '@ringcentral/spring-icon';

// ALWAYS pass the component reference (symbol), NOT a JSX element.
// Symbol references get wrapped in <Icon> internally, which applies
// proper sizing and fill:currentColor. JSX elements bypass the Icon
// wrapper and render as unsized black SVGs.
<Button startIcon={AddMd}>Add Item</Button>
<Button endIcon={ArrowRightMd}>Next</Button>

// BAD — renders oversized/black icon:
// <Button startIcon={<AddMd />}>Add Item</Button>
```

### With IconButton
```tsx
import { IconButton } from '@ringcentral/spring-ui';
import { EditMd } from '@ringcentral/spring-icon';

// ALWAYS use the symbol prop for proper icon rendering:
<IconButton symbol={EditMd} aria-label="Edit" />

// BAD — children bypass the Icon wrapper:
// <IconButton aria-label="Edit"><EditMd /></IconButton>
```

### With Tab
```tsx
import { Tab } from '@ringcentral/spring-ui';
import { HomeMd } from '@ringcentral/spring-icon';

<Tab label="Home" symbol={HomeMd} />
```

### With Avatar (fallback icon)
```tsx
import { Avatar } from '@ringcentral/spring-ui';
import { ProfileMd } from '@ringcentral/spring-icon';

<Avatar symbol={ProfileMd} alt="User" />
```

## Lucide → Spring Icon Mapping

| lucide-react | @ringcentral/spring-icon | Notes |
|---|---|---|
| `Plus` | `PlusMd` | |
| `X` | `Xmd` | Note: lowercase 'm' |
| `Check` | `CheckMd` | |
| `ChevronDown` | `CaretDownMd` | |
| `ChevronUp` | `CaretUpMd` | |
| `ChevronLeft` | `CaretLeftMd` | |
| `ChevronRight` | `CaretRightMd` | |
| `ArrowDown` | `ArrowDownMd` | |
| `ArrowUp` | `ArrowUpMd` | |
| `ArrowLeft` | `ArrowLeftMd` | |
| `ArrowRight` | `ArrowRightMd` | |
| `Search` | `SearchMd` | |
| `Edit` / `Pencil` | `EditMd` | |
| `Trash` / `Trash2` | `TrashMd` | Also `TrashFilledMd` |
| `Settings` / `Gear` | `SettingsMd` | Also `SettingsFilledMd` |
| `Home` | `HomeMd` | Also `HomeFilledMd` |
| `User` / `UserCircle` | `ProfileMd` | Also `ProfileFilledMd` |
| `Users` | `UsersMd` | Also `UsersFilledMd` |
| `Mail` / `Envelope` | `EmailMd` | |
| `Phone` | `CallMd` | Also `CallFilledMd` |
| `Calendar` | `CalendarMd` | Also `CalendarFilledMd` |
| `Clock` | `ClockMd` | |
| `Star` | `StarMd` | Also `StarFilledMd` |
| `Heart` | (no direct equivalent) | |
| `Eye` | `ShowMd` | |
| `EyeOff` | `HideMd` | |
| `Copy` | `CopyMd` | |
| `Download` | `DownloadMd` | Also `DownloadFilledMd` |
| `Upload` | `UploadMd` | Also `UploadFilledMd` |
| `Link` | `LinkMd` | |
| `ExternalLink` | `ExitMd` | |
| `Refresh` / `RotateCcw` | `RefreshMd` | |
| `Filter` | `FilterMd` | Also `FilterListMd` |
| `SortAsc` / `SortDesc` | `SortListMd` | |
| `Menu` / `Hamburger` | `MenuMd` | |
| `MoreHorizontal` | `OverflowMd` | |
| `MoreVertical` | `OverflowVerticalMd` | |
| `Info` | `InfoMd` | |
| `AlertTriangle` | `AlertMd` | Also `AlertFilledMd` |
| `AlertCircle` | `AlertMd` | |
| `CheckCircle` | `SuccessMd` | Also `SuccessFilledMd` |
| `XCircle` | `CircleXsm` | Small size |
| `Bell` | `NotificationsMd` | Also `NotificationsFilledMd` |
| `BellOff` | `NotificationsOffMd` | |
| `Lock` | `LockMd` | Also `LockFilledMd` |
| `Unlock` | `UnlockMd` | |
| `Image` | `ImageMd` | |
| `File` | `FileMd` | Also `FileFilledMd` |
| `Folder` | `FolderMd` | Also `FolderFilledMd` |
| `Save` | `SaveMd` | |
| `Send` | `SendMd` | Also `SendFilledMd` |
| `Share` | `ShareMd` | |
| `Pin` | `PinMd` | Also `PushPinMd` |
| `Bookmark` | `BookmarkMd` | |
| `Tag` | `TagMd` | |
| `Globe` | `GlobeMd` | Also `EarthMd` |
| `MapPin` | `MapPinMd` | |
| `Play` | `PlayMd` | |
| `Pause` | `HoldMd` | |
| `Stop` | `StopMd` | |
| `Video` | `VideoMd` | Also `VideoFilledMd` |
| `Mic` | `MicrophoneMd` | |
| `MicOff` | `MicrophoneOffMd` | |
| `Volume2` | `VolumeMd` | |
| `VolumeX` | `VolumeOffMd` | |
| `Maximize` | `FullScreenMd` | |
| `Minimize` | `MinimizeMd` | |
| `LogOut` | `ExitMd` | |
| `LogIn` | `EnterMd` | |
| `Zap` / `Lightning` | `BoltMd` | |
| `Code` | `CodeMd` | |
| `Terminal` | `CodeMd` | No separate terminal icon |
| `Database` | (no direct equivalent) | Use `ContainerMd` |
| `Cloud` | `CloudMd` | |
| `Rocket` | `RocketMd` | |
| `Gift` | `GiftMd` | Also `GiftFilledMd` |
| `ShoppingCart` | `ShoppingCartMd` | Also `ShoppingCartFilledMd` |
| `Briefcase` | `BriefcaseMd` | Also `BriefcaseFilledMd` |
| `GraduationCap` | `GraduationCapMd` | Also `GraduationCapFilledMd` |
| `Bold` | `BoldMd` | |
| `Italic` | `ItalicMd` | |
| `Underline` | `UnderlineMd` | |
| `Strikethrough` | `StrikethroughMd` | |
| `AlignLeft` | `LeftAlignMd` | |
| `AlignCenter` | `CenterAlignMd` | |
| `AlignRight` | `RightAlignMd` | |
| `List` | `ListMd` | |
| `ListOrdered` | `NumberedListMd` | |
| `Quote` | `QuoteMd` | |
| `Undo` | `UndoMd` | |
| `Grip` | `GrabberMd` | |
| `GripVertical` | `GrabberMd` | |
| `Puzzle` | `PuzzleMd` | Also `PuzzleFilledMd` |
| `Shield` | `ShieldMd` | |
| `Key` | `CredentialsMd` | |
| `Wrench` | `WrenchMd` | |
| `Bug` | `ReportIssueMd` | |
| `Sparkles` | `AiStarsMd` | Also `AiStarsFilledMd` |
| `Wand` / `MagicWand` | `MagicMd` | |
| `MessageSquare` / `MessageCircle` | `MessageMd` | Also `MessageFilledMd` |
| `AtSign` | `MentionMd` | |

## Brand / Social Icons

Spring includes brand icons for social and third-party integrations:

| Brand | Icon |
|---|---|
| Apple | `AppleMd` |
| Facebook | `FacebookMd`, `FacebookColoredMd` |
| Facebook Messenger | `FacebookMessengerMd`, `FacebookMessengerColoredMd` |
| Google | `GoogleColoredMd` |
| Google Calendar | `GoogleCalendarColoredMd` |
| Google Chrome | `GoogleChromeColoredMd` |
| Google Drive | `GoogleDriveColoredMd` |
| Google Play | `GooglePlayMd`, `GooglePlayColoredMd` |
| Gmail | `GmailColoredMd` |
| HubSpot | `HubspotColoredMd` |
| Instagram | `InstagramMd`, `InstagramColoredMd` |
| LinkedIn | `LinkedInMd`, `LinkedInColoredMd` |
| Microsoft | `MicrosoftColoredMd` |
| Microsoft Teams | `MicrosoftTeamsMd`, `MicrosoftTeamsColoredMd` |
| Microsoft Outlook | `MicrosoftOutlookColoredMd` |
| Salesforce | `SalesforceColoredMd` |
| Viber | `ViberMd`, `ViberColoredMd` |
| WhatsApp | `WhatsAppMd`, `WhatsAppColoredMd` |
| X (Twitter) | `XTwitterMd` |
| YouTube | `YoutubeMd`, `YoutubeColoredMd` |

## Status Icons (Small)

These are small (Sm) icons for status indicators:

| Icon | Purpose |
|---|---|
| `StatusBusySm` | User busy |
| `StatusDndSm` | Do not disturb |
| `StatusDndBusySm` | DND + busy |
| `StatusPresenceSm` | User presence |
| `StatusStopSm` | Stopped |
| `StatusWarningSm` | Warning state |
| `StatusOverflowSm` | Queue overflow |
| `CircleCheckFilledSm` | Confirmed/success (small) |
| `CircleXFilledSm` | Failed/error (small) |
| `CheckBoldSm` | Checkmark (small, bold) |
| `Xsm` | Close/dismiss (small) |

## Tips

- Prefer `Md` (medium) size for general use — this is the standard size
- Use `Filled` variants for active/selected states (e.g., `StarFilledMd` for favorited)
- `Colored` variants include brand colors — use for recognizable brand representations
- Do NOT apply `text-*` color classes to `Colored` brand icons — they have built-in colors
- For icon-only buttons, always wrap in `<IconButton>` with `aria-label` for accessibility

## Critical: Symbol References vs JSX Elements

Spring icon components are raw SVGs with only a `viewBox` — they have NO explicit width, height, or fill attributes. They rely entirely on the `<Icon>` wrapper component (from `@ringcentral/spring-ui`) to apply CSS classes for sizing and `fill: currentColor`.

- **Symbol reference** (`startIcon={AddMd}`): Button/IconButton internally wraps in `<Icon symbol={...} size={...}>` → correct sizing + color inheritance.
- **JSX element** (`startIcon={<AddMd />}`): Button clones the raw SVG element → no `<Icon>` wrapper → oversized, black icon.

**ALWAYS use symbol references** when passing icons to `Button` (`startIcon`, `endIcon`), `IconButton` (`symbol`), `Tab` (`symbol`), and `Avatar` (`symbol`).

When rendering an icon standalone outside of these components, always use the `<Icon>` wrapper:
```tsx
<Icon symbol={SearchMd} size="small" />
```
Never render a bare `<SearchMd />` in your JSX — it will be unsized and black.
