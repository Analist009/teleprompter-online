import React, { useEffect } from 'react';
import { useHotkeys } from '../../../hooks/useHotkeys';

interface KeyboardControlsProps {
  onTogglePlay: () => void;
  onSpeedUp: () => void;
  onSpeedDown: () => void;
  onReset: () => void;
  onFontSizeUp: () => void;
  onFontSizeDown: () => void;
}

export default function KeyboardControls({
  onTogglePlay,
  onSpeedUp,
  onSpeedDown,
  onReset,
  onFontSizeUp,
  onFontSizeDown,
}: KeyboardControlsProps) {
  const hotkeys = useHotkeys();

  useEffect(() => {
    hotkeys.bind('space', onTogglePlay);
    hotkeys.bind('arrowup', onSpeedUp);
    hotkeys.bind('arrowdown', onSpeedDown);
    hotkeys.bind('r', onReset);
    hotkeys.bind('+', onFontSizeUp);
    hotkeys.bind('-', onFontSizeDown);

    return () => hotkeys.unbindAll();
  }, [hotkeys, onTogglePlay, onSpeedUp, onSpeedDown, onReset, onFontSizeUp, onFontSizeDown]);

  return null;
}