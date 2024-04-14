# Welcome to react-transliteration
Introducing react-transliteration, the ultimate solution for effortless and accurate transliteration across over 15+ Indian languages. Seamlessly integrated and intuitively designed, it's your go-to tool for transforming text from one script to another with ease. With intelligent suggestion system and customizable options, streamline your transliteration process and revolutionize your projects today by integrating this powerful tool from npm.

# Demo

  [Demo link:](https://react-transliterate.vercel.app/)

# Installation

    npm i react-transliteration

## Boilerplate

    import {ReactTransliteration, ActionKeys} from "react-transliteration"
    export default function TransliterationTool () {
    
	      const [text, setText] =  useState("")
		  const  textRef  =  useRef(null)
		  
	      return <div  className="App"  style={{ height:  "400px", padding: "18px" }}> 
                <ReactTransliteration 
                        text={text} 
                        onChangeText={(t) =>  setText(t)}
                        textRef={textRef}  keys={[ActionKeys.KEY_ENTER, ActionKeys.KEY_SPACE]}
                        enabled={true}
                        language='hi'
                        suggestionDivStyle={{ textAlign:  "center" }}
                        activeItemStyle={{ minWidth:  "70px", minHeight:  "40px", display:  "grid", placeItems:  "center", backgroundColor:  "green" }}
                        placeholder="Powered By React Transliteration..."
                        offsetY={28}
                        textAreaStyle={{ padding:  '8px' }}
                        />
                </div>
    }

## Visuals

![enter image description here](https://res.cloudinary.com/ducgyycpy/image/upload/v1713013463/Macbook-Air-localhost_5_pbf6sz.png)

## Props 

| props| explaination|
|--|--|
| **language** (string)* | set language code for transliteration eg: **hi**, **bn**, **bho** ..etc
| **renderKey** (any) | forces component to **re-render**
| **text** (string)* | contains value of the text-area 
| **onChangeText** (Callback Func)* | listen to any change in text-area
| **keys** (Array)* | pass the keys you want to be trigger the transliteration 
| **textRef** (RefObject)* | text-area node ref. helps you to control anything from outside of component in text-area
| **enabled** (boolean)* | enable or disable suggestion by default its **true**
| **mainDivStyle** (React.CSSProperties) | custom styles for main div
| **suggestionDivStyle** (React.CSSProperties) | custom styles for suggestion div
| **suggestionItemStyle** (React.CSSProperties) | custom styles for suggestion items
| **activeItemStyle** (React.CSSProperties) |custom styles for suggestion div item [if active]
| **textAreaStyle** (React.CSSProperties) | custom styles for your textarea
| **placeholder** (string) | placeholder for textarea
| **offsetX** (number) | manipulate the suggestion div offsetX [from left]
| **offsetY** (number) | manipulate the suggestion div offsetY [from top]

> Props with **(*)** are required for functioning of component.

## Supported Languages 

| ISO 639 code | Language             |
|--------------|----------------------|
|bn            |Bangla - বাংলা       |
|gu            |Gujarati - ગુજરાતી   |
|hi            |Hindi - हिंदी         |
|kn            |Kannada - ಕನ್ನಡ     |
|ml            |Malayalam - മലയാളം  |
|mr            |Marathi - मराठी       |
|ne            |Nepali - नेपाली 	    |
|or            |Oriya - ଓଡ଼ିଆ         |
|pa            |Panjabi - ਪੰਜਾਬੀ      |
|sa            |Sanskrit - संस्कृतम् 	 |
|si            |Sinhala - සිංහල     |
|ta            |Tamil - தமிழ்       |
|te            |Telugu - తెలుగు      |
|ur            |Urdu - اُردُو         |
|am            |Amharic - አማርኛ       |
|th            |Thai - ไทย              |
|ti            |Tigrinya - ትግርኛ        |

## 7. License
MIT © dev.imsaurabh


