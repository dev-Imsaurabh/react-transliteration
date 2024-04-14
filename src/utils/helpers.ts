import React, { RefObject } from 'react'
import getCaretCoordinates from "textarea-caret"
import { caretPos } from './styles'

const ActionKeys = {
    KEY_ENTER: "Enter",
    KEY_SPACE: " ",
    KEY_TAB: "Tab"
}
const rtlLanguages = ["ur", "ks", "sd"]

function getInputSelection(el: HTMLTextAreaElement) {
    const start = 0
    const end = 0

    if (!el) {
        return { start, end }
    }

    if (
        typeof el.selectionStart === "number" &&
        typeof el.selectionEnd === "number"
    ) {
        return { start: el.selectionStart, end: el.selectionEnd }
    }

    return { start, end }
}

// const handleSelection = (
//     index: number,
//     textRef: RefObject<HTMLTextAreaElement>,
//     matchStart: number,
//     matchEnd: number,
//     options: string[],
//     onChange: (text: string) => void,
//     timeRef: RefObject<NodeJS.Timeout>,
//     setSelection: React.Dispatch<React.SetStateAction<number>>) => {

//     if (textRef && textRef.current) {
//         const currentString = textRef.current.value
//         // create a new string with the currently typed word
//         // replaced with the word in transliterated language
//         const newValue =
//             currentString.substring(0, matchStart) +
//             options[index] +
//             " " +
//             currentString.substring(matchEnd + 1, currentString.length)
//         if (newValue.includes("undefined")) {
//             return
//         }
//         onChange(newValue)
//         textRef.current.value = newValue
//         if (timeRef.current) {
//             clearTimeout(timeRef.current)
//         }
//         setSelection(0)
//     }
// }

const calculateRows = (textLength: number) => {
    // Calculate approximate number of rows based on text length
    const approximateRows = Math.ceil(textLength / 40) // Adjust 40 according to your preference
    // Ensure there's at least one row
    return Math.max(1, approximateRows)
}

const updateText = (
    textRef: RefObject<HTMLTextAreaElement>,
    setMatchStart: React.Dispatch<React.SetStateAction<number>>,
    setMatchEnd: React.Dispatch<React.SetStateAction<number>>,
    setCaretPosition: React.Dispatch<React.SetStateAction<caretPos>>,
    setLastWord: React.Dispatch<React.SetStateAction<string>>) => {

    if (textRef && textRef.current) {
        const caret = getInputSelection(textRef.current).end

        const indexOfLastSpace =
            textRef.current.value.lastIndexOf(" ", caret - 1) < textRef.current.value.lastIndexOf("\n", caret - 1)
                ? textRef.current.value.lastIndexOf("\n", caret - 1)
                : textRef.current.value.lastIndexOf(" ", caret - 1)
        setMatchStart(indexOfLastSpace + 1)
        setMatchEnd(caret - 1)
        const caretPos = getCaretCoordinates(textRef.current, caret)
        const rect = textRef.current.getBoundingClientRect()

        const left = Math.min(
            caretPos.left,
            rect.width - 100 / 2,
        )

        // minimum of the caret position from the top of the input
        // and the height of the input
        const top = Math.min(caretPos.top + 10, rect.height)
        setCaretPosition((prev: caretPos) => ({ ...prev, top, left }))
        const currentWord = textRef.current.value.slice(indexOfLastSpace + 1, caret)
        // console.log(currentWord, "currentword")
        if (currentWord === "") {
            return
        }
        setLastWord(currentWord)


    }
}


export { ActionKeys, getInputSelection, calculateRows, updateText, rtlLanguages }