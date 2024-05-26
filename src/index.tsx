import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { get_base_url } from "./utils/api";
import { ActionKeys, calculateRows, getInputSelection, rtlLanguages, updateText } from "./utils/helpers";
import { Componentprops } from "./utils/props";
import { caretPos, main, suggestionsDiv, suggestionsItem, pretextAreaStyle } from "./utils/styles";

function ReactTransliteration({ text = "", onChangeText, language = "hi", keys = [" ", "Enter", "Tab"], enabled = false, renderKey, textRef, placeholder = "", textAreaStyle = {}, suggestionDivStyle = {}, suggestionItemStyle = {}, activeItemStyle = {}, offsetX = 0, offsetY = 0, mainDivStyle = {}, attr }: Componentprops) {
    const [lastWord, setLastWord] = useState<string>("")
    const [selection, setSelection] = useState<number>(0)
    const [matchStart, setMatchStart] = useState<number>(-1)
    const [matchEnd, setMatchEnd] = useState<number>(-1)
    const [options, setOptions] = useState<Array<string>>([])
    const [paletVisible, setPaletVisible] = useState<boolean>(false)
    const [caretPosition, setCaretPosition] = useState<caretPos>({
        top: 0,
        left: 0
    })
    const timeRef = useRef<null | NodeJS.Timeout>(null)

    const KEY_UP = "ArrowUp";
    const KEY_DOWN = "ArrowDown";
    const KEY_ESCAPE = "Escape";

    useEffect(() => {

        if (textRef && textRef.current) {
            const rows = calculateRows(text.length)
            textRef.current.rows = rows
        }

    }, [textRef, text])


    useEffect(() => {
        if (options.length > 0) {
            handleSelection(0)
            setLastWord("")
        }
    }, [options])

    const getTransliteration = async () => {
        try {
            const res = await axios.get(get_base_url(language, lastWord))
            if (res.data[1][0][1]?.length > 0) {
                setOptions([...res.data[1][0][1], lastWord])
            } else {
                setOptions([lastWord])
            }
        } catch (error) {
            setOptions([lastWord])

        }

    }

    const handleSelection = (index: number) => {
        if (textRef && textRef.current) {
            const currentString = textRef.current.value;
            // create a new string with the currently typed word
            // replaced with the word in transliterated language
            const newValue =
                currentString.substring(0, matchStart) +
                options[index] +
                " " +
                currentString.substring(matchEnd + 1, currentString.length);
            if (newValue.includes("undefined")) {
                return
            }
            onChangeText(newValue)
            textRef.current.value = newValue
            textRef.current.selectionEnd = matchStart + options[index].length + 1
            if (timeRef.current) {
                clearTimeout(timeRef.current)
            }
            setSelection(0)
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (!enabled) {
            return
        }
        if (keys.includes(event.key)) {
            if (lastWord !== "") {
                if (paletVisible) {
                    event.preventDefault();
                    handleSelection(selection)
                    setPaletVisible(false)
                } else {
                    event.preventDefault();
                    getTransliteration()
                }
            }
        } else {
            if (textRef && textRef.current) {
                switch (event.key) {
                    case KEY_ESCAPE:
                        event.preventDefault();
                        break;
                    case KEY_UP:
                        event.preventDefault();
                        setSelection((options?.length + selection - 1) % options?.length);
                        break;
                    case KEY_DOWN:
                        event.preventDefault();
                        setSelection((selection + 1) % options?.length);
                        break;
                    case "Backspace":
                        if ((matchStart + options[selection]?.length) + 1 === textRef?.current?.selectionEnd) {
                            setPaletVisible(true)
                        } else {
                            setOptions([])
                            setPaletVisible(false)
                        }
                        break;
                    default:
                        break;
                }
            }
        }

    };

    const update = () => {
        if (textRef && textRef.current) {
            onChangeText(textRef?.current?.value)
        }
    }

    const handleMobileSelection = (event: any, customEvent: any) => {
        setPaletVisible(false)
        if (customEvent.inputType === "deleteContentBackward") {
            if ((matchStart + options[selection]?.length) === textRef?.current?.selectionEnd) {
                setPaletVisible(true)
            } else {
                setOptions([])
                setPaletVisible(false)
                if (event.currentTarget.value === "") {
                    setPaletVisible(false)
                }
            }
        }
        if (timeRef.current) {
            clearTimeout(timeRef.current)
        }

        timeRef.current = setTimeout(() => {
            update()
        }, 500)

    }

    return <div style={{ ...main, ...mainDivStyle }}>
        <div
            style={{ ...suggestionsDiv(caretPosition, offsetX, offsetY), display: paletVisible ? "block" : "none", ...suggestionDivStyle }}>
            {
                options.length > 0 &&
                options?.map((el, i) => <div
                    onClick={() => {
                        handleSelection(i)
                        setSelection(i)
                    }}
                    style={i !== selection ? { ...suggestionsItem, ...suggestionItemStyle } : { ...suggestionsItem, ...suggestionItemStyle, backgroundColor: "#9e3df2", color: "white", ...activeItemStyle }}
                >
                    {el}
                </div>
                )}
        </div>
        <textarea
            placeholder={placeholder}
            key={renderKey ? renderKey : ""}
            dir={rtlLanguages.includes(language) ? "rtl" : "ltr"}
            ref={textRef}
            onKeyDown={handleKeyDown}
            style={{ ...pretextAreaStyle, ...textAreaStyle }}
            defaultValue={text}
            onInput={(event) => {
                interface MyCustomEvent<T> extends CustomEvent {
                    data: T
                    inputType: T
                }
                const customEvent = event.nativeEvent as MyCustomEvent<any>
                updateText(textRef, setMatchStart, setMatchEnd, setCaretPosition, setLastWord)

                if (window.screen.width < window.screen.height) {
                    handleMobileSelection(event, customEvent)
                    return
                }

                if (customEvent.data !== null) {
                    setPaletVisible(false)
                }
                if (event.currentTarget.value === "") {
                    setPaletVisible(false)
                }
                if (timeRef.current) {
                    clearTimeout(timeRef.current)
                }

                timeRef.current = setTimeout(() => {
                    update()
                }, 500)
            }}  
            {...attr}
            >

        </textarea>
    </div>
}

export { ReactTransliteration, ActionKeys }
