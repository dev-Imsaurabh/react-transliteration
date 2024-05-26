import { RefObject } from "react"

export interface Componentprops extends React.HTMLProps<HTMLTextAreaElement> {
    /**  pass the ref in text from parent component 
     * gives you more option to control over input component 
     * @type React.ReactNode
     */
    textRef: RefObject<HTMLTextAreaElement>,

    /**
     * pass the value of text-area in this which will later converted in default vlaue
     * @type string
     */
    text: string,

    /**
     * pass the transliteration language <eg:'hi'> in which you have to transliterate
     * @type string
     */
    language: string,

    /** 
     * pass the callback function which listen the current value
     * @type: Function
    */
    onChangeText: (text: string) => void

    /**
     * pass true | false to enable or disable transliteration suggestion 
     * @type boolean
     */
    enabled: boolean

    /**
     * Pass any state or value on which you want to rerender the component
     * @type any
     */
    renderKey?: any

    /**
     * pass the keys you want to be trigger the transliteration 
     * @type string[]
     */
    keys: string[]

    /**
     * placeholder for textarea
     * @type string
     */
    placeholder?: string

    /**
     * custom styles for your textarea
     * @type React.CSSProperties
     */
    mainDivStyle?: React.CSSProperties

    /**
     * custom styles for your textarea
     * @type React.CSSProperties
     */
    textAreaStyle?: React.CSSProperties

    /**
     * custom styles for suggestion div
     * @type React.CSSProperties
     */
    suggestionDivStyle?: React.CSSProperties

    /** 
     * custom styles for suggestion div
     * @type React.CSSProperties
     */
    suggestionItemStyle?: React.CSSProperties

    /** 
     * custom styles for suggestion div item [if active]
     * @type React.CSSProperties
     */
    activeItemStyle?: React.CSSProperties

    /**
     * manipulate the suggestion div offsetX [from left]
     */
    offsetX?: number

    /**
     * manipulate the suggestion div offsetY [from top]
     */
    offsetY?: number

    /**
       * custom attributes for text area
       */
    attr?: React.HTMLProps<HTMLTextAreaElement>
} 