{-# LANGUAGE MultiParamTypeClasses, FlexibleInstances #-}

import qualified Codec.Binary.UTF8.String as UTF8
import Numeric

import qualified DBus as D
import qualified DBus.Client as D
import qualified Data.Map as M

import System.Exit
import System.IO

import XMonad

import XMonad.Actions.CopyWindow
import XMonad.Actions.CycleWS
import XMonad.Actions.DynamicProjects
import XMonad.Actions.DynamicWorkspaces
import XMonad.Actions.GroupNavigation
import XMonad.Actions.Navigation2D
import XMonad.Actions.WithAll

import XMonad.Core

import XMonad.Hooks.DynamicLog
import XMonad.Hooks.EwmhDesktops
import XMonad.Hooks.ManageDocks
import XMonad.Hooks.UrgencyHook

import XMonad.Layout.Accordion
import XMonad.Layout.BinarySpacePartition
import XMonad.Layout.BoringWindows
import XMonad.Layout.Decoration
import XMonad.Layout.Gaps
import XMonad.Layout.Minimize
import XMonad.Layout.Named
import XMonad.Layout.NoBorders
import XMonad.Layout.NoFrillsDecoration
import XMonad.Layout.Simplest
import XMonad.Layout.Spacing
import XMonad.Layout.SubLayouts
import XMonad.Layout.Tabbed
import XMonad.Layout.WindowNavigation hiding (Swap)

import XMonad.Prompt
import XMonad.Prompt.ConfirmPrompt

import qualified XMonad.StackSet as W

import XMonad.Util.EZConfig
import XMonad.Util.NamedActions
import XMonad.Util.Run (runInTerm, spawnPipe)
import XMonad.Util.Scratchpad
import XMonad.Util.Types

main = do
  dbus <- D.connectSession
  D.requestName
    dbus
    (D.busName_ "org.xmonad.Log")
    [D.nameAllowReplacement, D.nameReplaceExisting, D.nameDoNotQueue]
    -- xmproc <- spawnPipe myStatusBar
  xmonad $
    dynamicProjects projects $
    withUrgencyHook NoUrgencyHook $
    ewmh $
    docks $
    defaultConfig
    { manageHook = myManageHook
    , layoutHook = myLayoutHook
    , handleEventHook = myEventHook
    , logHook = dynamicLogWithPP (myLogHook dbus) >> historyHook -- myLogHook xmproc
    , startupHook = myStartupHook
            -- , keys = myKeys
    , modMask = myModKey
    , terminal = myTerminal
    , workspaces = myWorkspaces
    , borderWidth = borderSize
    , normalBorderColor = myNormalBorderColor
    , focusedBorderColor = myFocusBorderColor
    } `additionalKeysP`
    addKeys

base03 = "#002b36"

base02 = "#073642"

base01 = "#586e75"

base00 = "#657b83"

base0 = "#839496"

base1 = "#93a1a1"

base2 = "#eee8d5"

base3 = "#fdf6e3"

yellow = "#b58900"

orange = "#cb4b16"

red = "#dc322f"

magenta = "#d33682"

violet = "#6c71c4"

blue = "#268bd2"

cyan = "#2aa198"

green = "#859900"

colorGreen = "#259e83"

lightGray = "#aaaaaa"

-- sizes
gap = 7

topbarSize = 7

borderSize = 0

prompt = 20

status = 20

myNormalBorderColor = "#000000"

myFocusBorderColor = colorGreen

active = colorGreen

activeWarn = red

inactive = base02

focusColor = colorGreen

unfocusColor = base02

-- myFont = "xft:Monoid Nerd Font:style=Regular:pixelsize=9:antialias=true"
myFont = "xft:Hasklug Nerd Font Mono:style=Regular:pixelsize=14:antialias=true"

topBarTheme =
  def
  { fontName = myFont
  , inactiveBorderColor = base03
  , inactiveColor = base03
  , inactiveTextColor = base03
  , activeBorderColor = active
  , activeColor = active
  , activeTextColor = active
  , urgentBorderColor = red
  , urgentTextColor = yellow
  , decoHeight = topbarSize
  }

myPromptTheme =
  def
  { font = myFont
  , bgColor = base03
  , fgColor = active
  , fgHLight = base03
  , bgHLight = active
  , borderColor = base03
  , promptBorderWidth = 0
  , height = prompt
  , position = Top
  }

hotPromptTheme = myPromptTheme {bgColor = red, fgColor = base3, position = Top}

layoutNameBSP = "\xf1e0 BSP"

ws1Term = "1 \xf120"

ws2Term = "2 \xf120"

ws3Term = "3 \xf120"

ws4 = "4"

ws5 = "5"

ws6 = "6"

ws7 = "7"

ws8Msgs = "8 \xf27a"

ws9Mail = "9 \xf0e0"

ws10Browser = "10 \xf269"

myWorkspaces =
  [ws1Term, ws2Term, ws3Term, ws4, ws5, ws6, ws7, ws8Msgs, ws9Mail, ws10Browser]

myModKey = mod4Mask

myTerminal = "st"

-- myTerminal = "qterminal"
-- myTerminal = "urxvt"
myBrowser = "iceweasel"

myMail = "icedove"

myStatusBar = "xmobar ~/.xmonad/xmobar.conf"

rofiCommand = "rofi -matching fuzzy -modi run -show run"

rofiDisplay = "rofi -matching fuzzy -show-icons -show drun"

projects :: [Project]
projects =
  [ Project
    {projectName = ws1Term, projectDirectory = "~/", projectStartHook = Nothing}
  , Project
    { projectName = ws10Browser
    , projectDirectory = "~/"
    , projectStartHook = Just $ do spawn myBrowser
    }
  , Project
    { projectName = ws8Msgs
    , projectDirectory = "~/"
    , projectStartHook = Just $ do spawn "Telegram"
    }
  , Project
    { projectName = ws9Mail
    , projectDirectory = "~/"
    , projectStartHook = Just $ do spawn myMail
    }
  ]

myManageHook = manageDocks <+> manageScratchPad <+> manageHook defaultConfig

manageScratchPad :: ManageHook
manageScratchPad = scratchpadManageHook (W.RationalRect l t w h)
  where
    h = 0.1 -- terminal height 10%
    w = 1 -- terminal width 100%
    t = 1 - h -- distance from top edge 90%
    l = 1 - w -- distance from left edge 0%

myLayoutHook = gapsBSP ||| noBorderBSP ||| full
  where
    addTopBar = noFrillsDeco shrinkText topBarTheme
    full = noBorders Full -- layoutHook defaultConfig
    noBorderBSP = avoidStruts $ noBorders emptyBSP
    gapsBSP =
      named
        layoutNameBSP
                            -- windowNavigation $ subTabbed $ boringWindows $
                            -- subLayout [0,1] (Simplest ||| simpleTabbed) $
        (avoidStruts $
         addTopBar
                            -- $ smartSpacingWithEdge 5 
                            -- $ smartBorders 
          $
         spacing gap
                            -- $ noBorders 
          $
         emptyBSP)
        -- $ (addTabs shrinkText def) 
        -- $ subLayout [] Simplest
                            --

myEventHook = ewmhDesktopsEventHook

myStartupHook -- ewmhDesktopsStartup
 = do
  spawn "~/.config/polybar/launch.sh"

-- xmobar
myLogHook' xmproc =
  dynamicLogWithPP
    xmobarPP
    { ppOutput = hPutStrLn xmproc
    , ppTitle = xmobarColor "green" "" . shorten 50
    , ppCurrent = xmobarColor "green" "" . wrap "[" "]"
    , ppVisible = xmobarColor "lightgreen" "" . wrap "(" ")"
    , ppUrgent = xmobarColor "red" "black"
    , ppSep = " :: "
    }

myLogHook :: D.Client -> PP
myLogHook dbus =
  def
  { ppOutput = dbusOutput dbus
  , ppCurrent = background colorGreen
  , ppVisible = background base02
  , ppUrgent = background red
  , ppHidden = foreground lightGray
  , ppSep = " :: "
  , ppTitle = foreground colorGreen . shorten 50
  }
  where
    background color = wrap ("%{B" ++ color ++ "} ") " %{B-}"
    foreground color = wrap ("%{F" ++ color ++ "}") "%{F-}"

dbusOutput :: D.Client -> String -> IO ()
dbusOutput dbus str = do
  let signal =
        (D.signal objectPath interfaceName memberName)
        {D.signalBody = [D.toVariant $ UTF8.decodeString str]}
  D.emit dbus signal
  where
    objectPath = D.objectPath_ "/org/xmonad/Log"
    interfaceName = D.interfaceName_ "org.xmonad.Log"
    memberName = D.memberName_ "Update"

myKeys conf@(XConfig {XMonad.modMask = modm}) =
  M.fromList $
  [ ((modm, xK_p), spawn "rofi -show run -1")
  , ((modm, xK_s), sendMessage Swap)
  , ((modm, xK_f), sendMessage Rotate)
  , ((modm, xK_y), sendMessage $ ExpandTowards L)
  , ((modm, xK_u), sendMessage $ ExpandTowards D)
  , ((modm, xK_i), sendMessage $ ExpandTowards U)
  , ((modm, xK_o), sendMessage $ ExpandTowards R)
  , ((modm, xK_Tab), moveTo Next NonEmptyWS)
  , ((modm .|. shiftMask, xK_Tab), moveTo Prev NonEmptyWS)
  ]

addKeys =
  [ ("M-S-<Return>", newTerm)
  , ("M-p", spawn rofiCommand)
  , ("M-S-p", spawn rofiDisplay)
  , ("M-0", windows $ W.greedyView ws10Browser)
  , ("M-S-0", windows $ W.shift ws10Browser)
  , ("M-h", windowGo L False)
  , ("M-l", windowGo R False)
  , ("M-s", sendMessage Swap)
  , ("M-g", sendMessage Rotate)
    -- , ("M-b",   sendMessage Balance)
    -- , ("M-S-b", sendMessage Equalize)
  , ("M-a", sendMessage FocusParent)
  , ("M-z", sendMessage SelectNode)
  , ("M-S-z", sendMessage MoveNode)
  , ("M-y", sendMessage $ ExpandTowards L)
  , ("M-u", sendMessage $ ExpandTowards D)
  , ("M-i", sendMessage $ ExpandTowards U)
  , ("M-o", sendMessage $ ExpandTowards R)
  , ("M-S-y", sendMessage $ ShrinkFrom L)
  , ("M-S-u", sendMessage $ ShrinkFrom D)
  , ("M-S-i", sendMessage $ ShrinkFrom U)
  , ("M-S-o", sendMessage $ ShrinkFrom R)
     -- , ("M-C-h", sendMessage $ pullGroup L)
     -- , ("M-C-l", sendMessage $ pullGroup R)
     -- , ("M-C-k", sendMessage $ pullGroup U)
     -- , ("M-C-j", sendMessage $ pullGroup D)
     -- , ("M-S-m", withFocused (sendMessage . MergeAll))
     -- , ("M-S-n", withFocused (sendMessage . UnMerge))
     -- , ("M-.", onGroup W.focusUp')
     -- , ("M-,", onGroup W.focusDown')
     -- , ("M-A-j", focusDown)
     -- , ("M-A-k", focusUp)
  , ("M-S-M1-o", spawn "~/scripts/laptop_one_screen.zsh")
  , ("M-M1-p", spawn "rofi-pass")
  , ("M-M1-e", spawn "rofimoji")
  , ("M-M1-l", spawn "slock")
  , ("M-S-<Delete>", removeWorkspace)
  , ("M-S-<Insert>", addWorkspacePrompt def)
  , ("M-M1-r", renameWorkspace def)
  , ("M-<Tab>", moveTo Next NonEmptyWS)
  , ("M-S-<Tab>", moveTo Prev NonEmptyWS)
  , ("M-b", nextMatch History (return True))
  , ("<XF86AudioLowerVolume>", spawn "amixer -q sset Master 2%-")
  , ("<XF86AudioRaiseVolume>", spawn "amixer -q sset Master 2%+")
  , ("<XF86AudioMute>", spawn "amixer -q sset Master toggle")
  , ("<XF86AudioStop>", spawn "mpc stop")
  , ("<XF86AudioPlay>", spawn "mpc toggle")
  , ("<XF86AudioNext>", spawn "mpc next")
  , ("<XF86AudioPrev>", spawn "mpc prev")
    -- , ("<XF86Sleep>", spawn "systemctl suspend")
  , ("<XF86ScreenSaver>", spawn "dm-tool lock")
    -- , ("M--", scratchpadSpawnActionTerminal myTerminal)
  , ( "M-S-q"
    , confirmPrompt hotPromptTheme "Quit XMonad" $ io (exitWith ExitSuccess))
  , ("M-<Backspace>", kill1)
  , ("M-S-<Backspace>", confirmPrompt hotPromptTheme "kill all" $ killAll)
  ]

newTerm = withWindowSet launchTerminal

launchTerminal ws =
  case W.peek ws of
    Nothing -> runInTerm "" "$SHELL"
    Just xid -> terminalInCwd xid

terminalInCwd xid =
  let hex = showHex xid " "
      shInCwd =
        "'cd $(readlink /proc/$(ps --ppid $(xprop -id 0x" ++
        hex ++
        "_NET_WM_PID | cut -d\" \" -f3) -o pid= | tr -d \" \")/cwd) && $SHELL'"
  in runInTerm "" $ "sh -c " ++ shInCwd
