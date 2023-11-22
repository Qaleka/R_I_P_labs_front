import { useEffect, useState, FC } from 'react';
import { SmallCard, IRecipientProps } from '../components/RecipientCard';
import LoadAnimation from '../components/LoadAnimation';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';

type Response = {
    draft_notification: string;
    recipients: IRecipientProps[];
}

interface ISearchProps {
    recipients: IRecipientProps[]
    setFilteredRecipients: React.Dispatch<React.SetStateAction<IRecipientProps[]>>
}

const Search: FC<ISearchProps> = ({ recipients, setFilteredRecipients }) => {
    const [searchText, setSearchText] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value)
        if (event.target.value == '') {
            setFilteredRecipients(recipients)
        } else {
            setFilteredRecipients(
                recipients.filter(
                    (recipient) => recipient.fio.toLowerCase().includes(event.target.value.toLowerCase())
                )
            )
        }
    }
    return (
        <Navbar>
            <Form className="flex-grow-1 shadow shadow-sm">
                <Form.Control
                    type="text"
                    placeholder="Поиск"
                    className="form-control-sm"
                    data-bs-theme="dark"
                    value={searchText}
                    onChange={handleChange}
                />
            </Form>
        </Navbar>)
}

const AllRecipients = () => {
        const [loaded, setLoaded] = useState<boolean>(false)
        const [recipients, setRecipients] = useState<IRecipientProps[]>([]);
        const [filteredRecipients, setFilteredRecipients] = useState<IRecipientProps[]>([]);
        const [_, setDraftNotification] = useState('');
    
        useEffect(() => {
            fetch('/api/recipients')
                .then(response => {
                    if (!response.ok) {
                        throw new Error(response.statusText)
                    }
                    return response.json() as Promise<Response>
                })
                .then(data => {
                    console.log(data)
                    setDraftNotification(data.draft_notification)
                    setRecipients(data.recipients)
                    setFilteredRecipients(data.recipients)
                    setLoaded(true)
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        }, []);
    return (
        <>
            <Search {...{ recipients, setFilteredRecipients }} />
            <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 px-1'>
            {loaded ? (
                    filteredRecipients.map((recipient) => (
                    <div className='d-flex py-1 justify-content-center p-sm-1 p-md-2' key={recipient.uuid}>
                        <SmallCard {...recipient} />
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