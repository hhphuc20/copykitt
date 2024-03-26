import React from "react";
import Form from "./form";
import Results from "./results";

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
    

    return (
        <>
            <h1>CopyKitt</h1>
            {displayedElement}
            
        </>
    );
};

export default CopyKitt;