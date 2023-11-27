import { useEffect, useState, FC } from 'react';
import { SmallRCard, IRecipientProps } from '../components/RecipientCard';
import LoadAnimation from '../components/LoadAnimation';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


type Response = {
    draft_notification: string;
    recipients: IRecipientProps[];
}

interface ISearchProps {
    setRecipients: React.Dispatch<React.SetStateAction<IRecipientProps[]>>
}

async function getRecipients(filter?: string): Promise<Response> {
    let api = '/api/recipients'
    if (filter !== undefined) {
        api += `?fio=${filter}`
    }
    return fetch(api)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json() as Promise<Response>
        })
}

const Search: FC<ISearchProps> = ({ setRecipients }) => {
    const [searchText, setSearchText] = useState<string>('');

    const handleSearch = (event: React.FormEvent<any>) => {
        event.preventDefault();
        console.log(searchText);
        getRecipients(searchText)
            .then(data => {
                console.log(data)
                setRecipients(data.recipients)
            })
    }
    return (
        <Navbar>
            <Form className="d-flex flex-row flex grow-1 gap-2" onSubmit={handleSearch}>
                <Form.Control
                    type="text"
                    placeholder="Поиск"
                    className="form-control-sm flex-grow-1 shadow shadow-sm"
                    data-bs-theme="primary"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                 <Button
                    variant="primary"
                    size="sm"
                    type="submit"
                    className="shadow">
                    Поиск
                </Button>
            </Form>
        </Navbar>)
}

const AllRecipients = () => {
        const [loaded, setLoaded] = useState<boolean>(false)
        const [recipients, setRecipients] = useState<IRecipientProps[]>([]);
        const [_, setDraftNotification] = useState('');
    
        useEffect(() => {
            getRecipients()
                .then(data => {
                    console.log(data)
                    setDraftNotification(data.draft_notification)
                    setRecipients(data.recipients)
                    setLoaded(true)
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        }, []);
    return (
        <>
            <Search  setRecipients={setRecipients} />
            <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 px-1'>
            {loaded ? (
                    recipients.map((recipient) => (
                    <div className='d-flex py-1 p-2 justify-content-center' key={recipient.uuid}>
                        <SmallRCard {...recipient} />
                    </div>
                ))
                ) : (
                    <LoadAnimation />
                )}   
        </div>
        </>
    )
}

export { AllRecipients }