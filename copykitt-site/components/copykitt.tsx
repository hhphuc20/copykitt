import React from "react";
import Form from "./form";
import Results from "./results";
import logo from "../public/copykittLogo.svg";
import Image from "next/image";

const CopyKitt: React.FC = () => {
    const CHAREACTER_LIMIT: number = 32;
    const ENDPOINT: string = "https://31gd3bca0i.execute-api.ap-southeast-1.amazonaws.com/prod/generate_snippet_keywords";
    const [prompt, setPrompt] = React.useState("");
    const [snippet, setSnippet] = React.useState("");
    const [keywords, setKeywords] = React.useState([]);
    const [hasResult, setHasResult] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const onSubmit = () => {
        console.log("Submitting: " + prompt);
        setIsLoading(true);
        fetch(`${ENDPOINT}?prompt=${prompt}`)
            .then((res) => res.json())
            .then(onResult);
    };

    const onResult = (data: any) => {
        setSnippet(data.Snippet);
        setKeywords(data.Keywords);
        setHasResult(true);
        setIsLoading(false);
    };

    const onReset = () => {
        setPrompt("");
        setHasResult(false);
        setIsLoading(false);
    };

    let displayedElement = null;

    if (hasResult) {
        displayedElement = 
            <Results 
                snippet={snippet} 
                keywords={keywords} 
                onBack={onReset} 
                prompt={prompt} 
            />
    } else {
        displayedElement = 
            <Form  
                prompt={prompt} 
                setPrompt={setPrompt} 
                onSubmit={onSubmit} 
                isLoading={isLoading} 
                characterLimit={CHAREACTER_LIMIT} 
            />
    }
    
    const gradientTextStyle =
    "text-white text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 font-light w-fit mx-auto";

    return (
        <div className="h-screen flex">
        <div className="max-w-md m-auto p-2">
            <div className="bg-slate-800 p-6 rounded-md text-white">
            <div className="text-center my-6">
                
                    <Image className="mx-auto" src={logo} width={55} height={55} alt={""} />
                
                <h1 className={gradientTextStyle + " text-3xl font-light pt-2"}>
                CopyKitt
                </h1>
                <div className={gradientTextStyle}>Your AI branding assistant</div>
            </div>

            {displayedElement}
            </div>
        </div>
        </div>
    );
};

export default CopyKitt;