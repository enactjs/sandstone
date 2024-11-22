import {useEffect, useState} from 'react';
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';

const common = `
    You will be responsible for inferring which components the user is referring to and figuring out which APIs they want to use.
    You can infer what role each component plays by looking at its structure and API set.
    Look at the sentences the user says and tell them which component they should be applied to.
    Please give the answer in the format of component: component name. for example, if response is WizardPanels, component: WizardPanels.
    You need to uniquely tell us what component it is. If there is Button1 and Button2, tell me it is Button1.


    This is a rough description of each component.
    WizardPanel is a component that has multiple panels and allows you to move the panels to the left and right.
    Button is a component that allows various interactions when clicked.

    Below is the component composition.
    `;
const queryForWizardPanels = `
    WizardPanel is a component that has multiple panels and allows you to move the panels to the left and right.
    Please answer which API among the API list the following sentence is close to.
    Please give the answer in the format of API: api name. for example, if response is onTransition, API: onTransition
    API list : onPrevClick, onNextClick, onChange, onTransition
    `;
const queryForButton = `
    Button is a component that allows various interactions when clicked.
    Please answer which API among the API list the following sentence is close to.
    Please give the answer in the format of API: api name. for example, if response is onTransition, API: onTransition
    API list : onClick
    `;

const AiDictaphone = (props) => {
	const {
	  transcript,
	  listening,
	  resetTranscript,
	  browserSupportsSpeechRecognition
	} = useSpeechRecognition();
    const { children, ...rest } = props;
    console.log('props', props);

	if (!browserSupportsSpeechRecognition) {
	  return <span>Browser doesn't support speech recognition.</span>;
	}

	const debouncedText = useDebounce(transcript, 1000);

	return (
	  <>
		<p>Microphone: {listening ? 'on' : 'off'}</p>
		<button size="small" onClick={SpeechRecognition.startListening}>Start</button>
		<button size="small" onClick={SpeechRecognition.stopListening}>Stop</button>
		<button size="small" onClick={resetTranscript}>Reset</button>
		<p>{transcript}</p>
		<Search sentence={debouncedText} {...rest} />
        {children}
	  </>
	);
  };

  const Search = (props) => {
    const {configure, sentence} = props;
	//const [sentence, setSentence] = useState("");

    const [component, setComponent] = useState("");
	const [componentApi, setComponentApi] = useState("");

	/*
    const functionObject = {
		onNextClick: onNextClick,
		onPrevClick: onPrevClick,
		onChange: onChange,
		onTransition: onTransition
	};
    */
    const getConfigByKey = (config, key) => {
        if (config.hasOwnProperty(key)) {
            return config[key];
        };

        for (const k in config) {
            if (typeof config[k] === 'object' && config[k] !== null) {
                const result = getConfigByKey(config[k], key);
                if (result) {
                return result;
                }
            }
        }
        return null;
    };

	const getComponentApi = async (query) => {
		const response = await fetch('https://3000-myelyn-kim-myelyn.bee0.lge.com/ask-query', {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query: `${query}
						sentence : ${sentence}`
			})
		});
	
		/*const response = await ollama.chat({
			model: 'gemma2',
			messages: [{ role: 'user', content: `WizardPanel is a component that has multiple panels and allows you to move the panels to the left and right.
							Please answer which API among the API list the following sentence is close to.
							Please give the answer in the format of API: api name. for example, if response is onTransition, API: onTransition
							sentence : ${sentence}
							API list : onPrevClick, onNextClick, onChange, onTransition`}],
		});*/

		return response.json();
	};

    const getComponent = async () => {
        const response = await fetch('https://3000-myelyn-kim-myelyn.bee0.lge.com/ask-query', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: `${common}
                        sentence : ${sentence}
                        composition: ${JSON.stringify(configure)}
                        `
            })
        })

        return response.json();
    };

	const handleSubmit = async () => {
        const componentResponse = await getComponent();
        const value = componentResponse.reply.split('component: ')[1].split(' ')[0];
        setComponent(value);
	}

    const handleApi = async (query) => {
        const apiResponse = await getComponentApi(query);
        const value = apiResponse.reply.split('API: ')[1].split(' ')[0];
        setComponentApi(value);
		
        //fetchData().then(response => setAnswer(response.message.content))
    }
    useEffect(() => {
        if (component === '') return;

        const target = component.replace(new RegExp('[(0-9)]', 'gi'), '');

        let query = '';
        switch(target) {
            case 'WizardPanels':
                query = queryForWizardPanels;
                break;
            case 'Button':
                query = queryForButton;
                break;
        }

        handleApi(query);
    }, [component]);

	useEffect(() => {
		if (componentApi === '') return;
        console.log(getConfigByKey(configure, component));
        const api = getConfigByKey(configure, component).api[componentApi]?.function;

        if (api && typeof(api) === 'function') {
            if (component.includes('WizardPanels')) {
                // for POC
                const customEvent = new CustomEvent('customSpeech', { detail: componentApi });
                document.dispatchEvent(customEvent);
            }
            api();
            setComponent("");
            setComponentApi("");
        }
	}, [componentApi]);

	useEffect(() => {
		if (sentence === '') return;

		handleSubmit();
	}, [sentence]);

	return (
		<>
			{/*<div as="form" direction="column" width="100%">
				<label>sentence</label>
				<input name="sentence" onChange={(e) => setSentence(e.target.value)} />
			</div>
			<button type="submit" onClick={handleSubmit} style={{marginLeft: "auto"}}>
					Submit
			</button>
            */}
            <>
                {component && <div>Component: {component}</div>}
                {componentApi && <div>API: {componentApi}</div>}
            </>
	  </>);
  };

  const useDebounce = (value, delay) => {
	const [debouncedValue, setDebouncedValue] = useState(value);
	
	useEffect(() => {
	  const timer = setTimeout(() => {
		setDebouncedValue(value);
	  }, delay);
  
	  return () => {
		clearTimeout(timer);
	  };
	}, [value]);
  
	return debouncedValue;
  };

  export default AiDictaphone;
