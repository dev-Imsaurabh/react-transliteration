export type caretPos = {
    top: number,
    left: number
}


const main: React.CSSProperties = {
    width: "100%",
    height: "100%",
    position:"relative"
}

const pretextAreaStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    resize: "none",
    textAlign: "start",
    outline: "none"
}

const suggestionsDiv = (caretPosition: caretPos, offsetX: number, offsetY: number): React.CSSProperties => {
    return {
        backgroundClip: "padding-box",
        backgroundColor: "#fff",
        border: "1px solid rgba(0, 0, 0, 0.15)",
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.175)",
        display: "block",
        fontSize: "14px",
        listStyle: "none",
        borderRadius: "8px",
        padding: "1px",
        textAlign: "left",
        zIndex: 20000,
        left: `${caretPosition.left + offsetX}px`,
        top: `${caretPosition.top + offsetY}px`,
        position: "absolute",
        width: "auto",
    }
}
const suggestionsItem: React.CSSProperties = {
    width: "auto",
    height: "auto",
    borderRadius: "8px",
    padding: "2px 8px",
}

export { main, pretextAreaStyle, suggestionsDiv, suggestionsItem }