import { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import './NpcGenerator.css';

function NpcGenerator() {
    const [bystanderParams, setBystanderParams] = useState({
        quantity : 0,
        locationType : '',
        region : ''
    });

    const [bystanders, setBystanders] = useState([{
        name : 'none',
        age : 'none',
        trait : 'none',
        bystanderType : 'none',
        description : 'none'
    }]);

    const [isLoading, setIsLoading] = useState(false);

    //should be lookup values from a DB, but I don't feel like spinning one up for the hackathon
    const locationChoices = ['', 'a big city', 'the suburbs', 'a small town'];
    const regionChoices = [
        {name : 'New England', value: 'New England'},
        {name : 'Midwest', value : 'the American Midwest'},
        {name : 'West Coast', value : 'the West Coast of America'},
        {name : 'Mid-Atlantic', value : 'the Mid-Atlantic region of the United States'},
        {name : 'Southern', value : 'the American south'}
    ]

    //initialize OpenAi API
    const config = new Configuration({
        organization : import.meta.env.VITE_OPENAI_ORG_ID,
        apiKey : import.meta.env.VITE_OPENAI_KEY
    });
    const openAi = new OpenAIApi(config);

    const handleChange = (e : React.FormEvent<HTMLInputElement>) => {
        setBystanderParams({...bystanderParams, [e.currentTarget.name] : e.currentTarget.value});
    }

    const submitForm = async (e : React.FormEvent) => {
        e.preventDefault();
        const content : string = `You are The Keeper in a game of Monster of the Week.

        Design ${bystanderParams.quantity} Bystanders whose location is ${bystanderParams.locationType} in ${bystanderParams.region}. Provide their Name, Age, Trait, Bystander Type, and a brief one to three sentence description of each.
        
        Possible Bystander Types are: Busybody, Detective, Gossip, Helper, Innocent, Official, Skeptic, Victim, and Witness.

        The description for each bystander should illustrate their personality and include minor details to make them seem real. For example, one bystander's description could be "John Smith, the local carpenter, is friendly and outgoing. In his spare time he enjoys fishing." Occasionally tie in details related to their location. 

        Each bystander's name should be their first and last name.
        
        Provide the answer as an array of objects in JSON format.`

        setIsLoading(true);
        let response = await getOpenAiResponse(content);
        setBystanders(response);
        setIsLoading(false);
    }

    const getOpenAiResponse = async (content : string) => {
        try {
            const answer = await openAi.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [{"role": "user", "content": content}],
                temperature: 0.5,
            });
            const filteredAnswer = answer?.data?.choices[0]?.message?.content ? answer?.data?.choices[0]?.message?.content : '[]';
            return JSON.parse(filteredAnswer);
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <div className='wrapper'>
            {isLoading && <div className='spinner' />}
            <form className='bystander-form' onSubmit={submitForm}>
                <div className='question'>
                    <label htmlFor='quant'>Create </label>
                    <input className='quant' id='quant' type='number' name='quantity' min={1} max={9} onChange={(event) => {handleChange(event)}}></input>
                    <label htmlFor='quant'> bystanders</label>
                </div>
                <br />
                <div className='question'>
                    <label htmlFor='location-select'>who live in </label>
                    <select id='location-select' name='locationType'>
                        {locationChoices.map((loc) => <option value={loc}>{loc}</option>)}
                    </select>
                </div>
                <br />
                <div className='question'>
                    <label htmlFor='region-select'>in the</label>
                    <select id='region-select' name='region'>
                        <option value=''></option>
                        {regionChoices.map((region) => <option value={region.value}>{region.name}</option>)}
                    </select>
                    <label htmlFor='region-select'> region of the United States.</label>
                </div>
                <br />
                <button type='submit' className='submit-button'>Generate!</button>
            </form>
            {!isLoading &&
                <table className='bystander-table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Trait</th>
                            <th>Type</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bystanders.map((bystander : any) => 
                            <tr>
                                <td>{bystander?.name}</td>
                                <td>{bystander?.age}</td>
                                <td>{bystander?.trait}</td>
                                <td>{bystander?.bystanderType || bystander?.type}</td>
                                <td>{bystander?.description}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            }
        </div>
    )
}

export default NpcGenerator;