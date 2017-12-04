import XMonad
import XMonad.Hooks.DynamicLog
import XMonad.Hooks.ManageDocks
import XMonad.Util.Run(spawnPipe)
import XMonad.Util.EZConfig
import XMonad.Layout.Gaps
import XMonad.Layout.Spacing
import XMonad.Layout.Tabbed
import XMonad.Layout.Accordion
import XMonad.Layout.BinarySpacePartition
import System.IO



myLayout = gaps [(U,22), (D,5), (L,5), (R,5)] $ spacing 5 $ emptyBSP ||| Full -- layoutHook defaultConfig
-- myLayout2 = gaps [(U,10), (R,7)] $ Tall 1 (3/100) (1/2) ||| Full  -- leave gaps at the top and right
-- mylayoutHook = Full ||| (tabbed shrinkText def) ||| Accordion

main = do
    xmproc <- spawnPipe myStatusBar
    xmonad $ defaultConfig
    	{ manageHook = manageDocks <+> manageHook defaultConfig
	-- , layoutHook = avoidStruts $ layoutHook defaultConfig
	, layoutHook = myLayout
	, logHook = dynamicLogWithPP xmobarPP
			{ ppOutput = hPutStrLn xmproc
			, ppTitle = xmobarColor "green" "" . shorten 50
                        , ppCurrent = xmobarColor "green" "" . wrap "[" "]" 
			}
	, modMask = mod4Mask    -- Rebind Mod to the Super key
	, terminal = myTerminal
   	, borderWidth = 2
	-- , normalBorderColor = "#101313"
	, focusedBorderColor = "#22aa22"
	}
	`additionalKeysP`
	[ ("M-p", spawn "rofi -show run")
    	, ("M-s", sendMessage Swap)
	, ("M-f", sendMessage Rotate)
	, ("M-y", sendMessage $ ExpandTowards L)
 	, ("M-u", sendMessage $ ExpandTowards D)
 	, ("M-i", sendMessage $ ExpandTowards U)
 	, ("M-o", sendMessage $ ExpandTowards R)
	]

myTerminal = "urxvt"
myStatusBar = "xmobar ~/.xmonad/xmobar.conf"
