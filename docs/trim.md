# Javascript trim

With many keyboard layouts, a whitespace character may be entered through the use of a spacebar. Horizontal whitespace may also be entered on many keyboards through the use of the Tab ↹ key, although the length of the space may vary. Vertical whitespace is a bit more varied as to how it is encoded, but the most obvious in typing is the ↵ Enter result which creates a 'newline' code sequence in applications programs. Older keyboards might instead say Return, abbreviating the typewriter keyboard meaning 'Carriage-Return' which generated an electromechanical return to the left stop (CR code in ASCII-hex &0D;) and a line feed or move to the next line (LF code in ASCII-hex &0A;); in some applications these were independently used to draw text cell based displays on monitors or for printing on tractor-guided printers—which might also contain reverse motions/positioning code sequences allowing text-based output devices to achieve more sophisticated output. Many early computer games used such codes to draw a screen (e.g. Kingdom of Kroz), and word processing software would use this to produce printed effects such as bold, underline, and strikeout.

The term "whitespace" is based on the resulting appearance on ordinary paper. However they are coded inside an application, whitespace can be processed the same as any other character code and programs can do the proper action as defined for the context in which they occur.

[whitespace characters in the Unicode Character Database](https://en.wikipedia.org/wiki/Whitespace_character)

### 代码示例:

```
String.prototype.trim = function () {
  var str = this,
    whitespace = " \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000";
  for (var i = 0, len = str.length; i < len; i++) {
    if (whitespace.indexOf(str.charAt(i)) === -1) {
      str = str.substring(i);
      break;
    }
  }
  for (i = str.length - 1; i >= 0; i--) {
    if (whitespace.indexOf(str.charAt(i)) === -1) {
      str = str.substring(0, i + 1);
      break;
    }
  }
  return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
}

const newString = "        sadf       ".trim();
console.log(newString);
```