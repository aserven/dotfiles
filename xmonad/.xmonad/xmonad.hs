import qualified Data.Map as M

import XMonad

import XMonad.Actions.CycleWS

import XMonad.Hooks.DynamicLog
import XMonad.Hooks.ManageDocks
import XMonad.Hooks.UrgencyHook
import XMonad.Hooks.EwmhDesktops

import XMonad.Util.Run(spawnPipe)
import XMonad.Util.EZConfig

import XMonad.Layout.Named
import XMonad.Layout.Gaps
import XMonad.Layout.Spacing
import XMonad.Layout.Tabbed
import XMonad.Layout.Accordion
import XMonad.Layout.NoBorders
import XMonad.Layout.Minimize
import XMonad.Layout.BinarySpacePartition
import XMonad.Layout.SubLayouts
import XMonad.Layout.Simplest

import System.IO


main = do
    xmproc <- spawnPipe myStatusBar
    xmonad $ ewmh
           $ docks
           $ withUrgencyHook NoUrgencyHook 
           $ defaultConfig 
                { manageHook = myManageHook
                , layoutHook = myLayoutHook
                , handleEventHook = myEventHook
	        , logHook = myLogHook xmproc
                , startupHook = myStartupHook
                -- , keys = myKeys
	        , modMask = myModKey
	        , terminal = myTerminal
                , workspaces = myWorkspaces
   	        , borderWidth = 1
	        -- , normalBorderColor = "#101313"
	        , focusedBorderColor = myFocusBorderColor
                } `additionalKeysP` addKeys


colorGreen = "#22aa22"
myFocusBorderColor = colorGreen

workspace1Term = "1: <fn=1>\xf120</fn>" 
workspace8Msgs = "8: <fn=1>\xf27a</fn>"
workspace9Mail = "9: <fn=1>\xf0e0</fn>"


myModKey = mod4Mask
myTerminal = "urxvt"
myStatusBar = "xmobar ~/.xmonad/xmobar.conf"
myWorkspaces = 
        [ workspace1Term ]
        ++ map show [2..7] ++ [
          workspace8Msgs
        , workspace9Mail
        ]

myManageHook = manageDocks <+> manageHook defaultConfig
-- myLayoutHook = (gaps [(U,22), (D,5), (L,5), (R,5)] $ spacing 5 $ emptyBSP) ||| noBorders Full -- layoutHook defaultConfig
myLayoutHook = named "<fn=1>\xf1e0</fn> BSP" 
                    ( avoidStruts 
                    $ smartSpacingWithEdge 5 
                    $ smartBorders 
                    -- $ (addTabs shrinkText def) 
                    -- $ subLayout [] Simplest
                    $ emptyBSP) ||| noBorders Full -- layoutHook defaultConfig
-- mylayoutHook = Full ||| (tabbed shrinkText def) ||| Accordion
-- myLayoutHook = minimize $ avoidStruts $ smartBorders (Full ||| Tall 1 (3/100) (1/2) ||| Mirror (Tall 1 (3/100) (1/2)) )
myEventHook = ewmhDesktopsEventHook
myStartupHook = ewmhDesktopsStartup
myLogHook xmproc = dynamicLogWithPP xmobarPP
        { ppOutput = hPutStrLn xmproc
        , ppTitle = xmobarColor "green" "" . shorten 50
        , ppCurrent = xmobarColor "green" "" . wrap "[" "]"
        , ppVisible = xmobarColor "lightgreen" "" . wrap "(" ")"
        , ppUrgent = xmobarColor "red" "black" 
        , ppSep = " :: "
        }

myKeys conf@(XConfig {XMonad.modMask = modm}) = M.fromList $ 
        [ ((modm, xK_p), spawn "rofi -show run")

    	, ((modm, xK_s), sendMessage Swap)
	, ((modm, xK_f), sendMessage Rotate)
	, ((modm, xK_y), sendMessage $ ExpandTowards L)
 	, ((modm, xK_u), sendMessage $ ExpandTowards D)
 	, ((modm, xK_i), sendMessage $ ExpandTowards U)
 	, ((modm, xK_o), sendMessage $ ExpandTowards R)

        , ((modm, xK_Tab), moveTo Next NonEmptyWS)
        , ((modm .|. shiftMask, xK_Tab), moveTo Prev NonEmptyWS)
        ]
 

addKeys = [ ("M-p", spawn "rofi -show run")

          , ("M-s", sendMessage Swap)
	  , ("M-f", sendMessage Rotate)
	  , ("M-y", sendMessage $ ExpandTowards L)
 	  , ("M-u", sendMessage $ ExpandTowards D)
 	  , ("M-i", sendMessage $ ExpandTowards U)
 	  , ("M-o", sendMessage $ ExpandTowards R)

          , ("M-<Tab>", moveTo Next NonEmptyWS)
          , ("M-S-<Tab>", moveTo Prev NonEmptyWS)
          
          , ("<XF86AudioLowerVolume>", spawn "amixer -q sset Master 2%-")
          , ("<XF86AudioRaiseVolume>", spawn "amixer -q sset Master 2%+")
          , ("<XF86AudioMute>", spawn "amixer -q sset Master toggle")

          , ("<XF86AudioStop>", spawn "mpc stop")
          , ("<XF86AudioPlay>", spawn "mpc toggle")
          , ("<XF86AudioNext>", spawn "mpc next")
          , ("<XF86AudioPrev>", spawn "mpc prev")
	  ]


