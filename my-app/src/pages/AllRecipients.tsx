import { useEffect } from 'react';
import { SmallRCard } from '../components/RecipientCard';
import LoadAnimation from '../components/LoadAnimation';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getAllRecipients } from '../api'
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, setRecipients } from "../store/recipientSlice"
import { setDraft } from '../store/notificationSlice';

const AllRecipients = () => {
    const searchText = useSelector((state: RootState) => state.recipient.searchText);
    const recipients = useSelector((state: RootState) => state.recipient.recipients);
    const _ = useSelector((state: RootState) => state.notification.draft);
    const dispatch = useDispatch<AppDispatch>();

    const getRecipients = () =>
            getAllRecipients(searchText)
                .then(data => {
                    dispatch(setRecipients(data?.recipients))
                    dispatch(setDraft(data?.draft_notification))
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });

                const handleSearch = (event: React.FormEvent<any>) => {
                    event.preventDefault();
                    getRecipients();
                }
            
                useEffect(() => {
                    getRecipients();
                }, [dispatch]);            
    return (
        <>
             <Navbar>
                <Form className="d-flex flex-row flex-grow-1 gap-2" onSubmit={handleSearch}>
                    <Form.Control
                        type="text"
                        placeholder="Поиск"
                        className="form-control-sm flex-grow-1 shadow"
                        data-bs-theme="primary"
                        value={searchText}
                        onChange={(e) => dispatch(setFilter(e.target.value))}
                    />
                    <Button
                        variant="primary"
                        size="sm"
                        type="submit"
                        className="shadow-lg">
                        Поиск
                    </Button>
                </Form>
            </Navbar>
            <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 px-1'>
            {recipients ? (
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

export default AllRecipients