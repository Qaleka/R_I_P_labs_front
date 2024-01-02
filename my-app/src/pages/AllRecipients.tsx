import { useEffect, useState } from 'react';
import { SmallRCard } from '../components/RecipientCard';
import LoadAnimation from '../components/LoadAnimation';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from 'react-router-dom';

import { getAllRecipients, axiosAPI } from '../api'
import { AppDispatch, RootState } from "../store";
import { setFio } from "../store/searchSlice"
import { clearHistory, addToHistory } from "../store/historySlice"
import { IRecipient } from '../models'

const AllRecipients = () => {
    const searchText = useSelector((state: RootState) => state.search.fio);
    const [recipients, setRecipients] = useState<IRecipient[]>([])
    const [draft, setDraft] = useState<string | null>(null)
    const role = useSelector((state: RootState) => state.user.role);
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation().pathname;

    const getRecipients = () =>
            getAllRecipients(searchText)
                .then(data => {
                    setRecipients(data.recipients)
                    setDraft(data.draft_notification)
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });

                const handleSearch = (event: React.FormEvent<any>) => {
                    event.preventDefault();
                    getRecipients();
                }
            
                useEffect(() => {
                    dispatch(clearHistory())
                    dispatch(addToHistory({ path: location, name: "Получатели" }))
                    getRecipients();
                }, [dispatch]);   
                
                const addToNotification = (id: string) => () => {
                    let accessToken = localStorage.getItem('access_token');
                    if (!accessToken) {
                        return
                    }
            
                    axiosAPI.post(`/recipients/${id}/add_to_notification`, null, { headers: { 'Authorization': `Bearer ${accessToken}`, } })
                        .then(() => {
                            getRecipients();
                        })
                        .catch((error) => {
                            console.error("Error fetching data:", error);
                        });
                }
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
                        onChange={(e) => dispatch(setFio(e.target.value))}
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
                        <SmallRCard  {...recipient}>
                                {role != 0 &&
                                    <Button
                                        variant='outline-primary'
                                        className='mt-0 rounded-bottom'
                                        onClick={addToNotification(recipient.uuid)}>
                                        Добавить в корзину
                                    </Button>
                                }
                            </SmallRCard>
                    </div>
                ))
                ) : (
                    <LoadAnimation />
                )}   
        </div>
        {!!role && <Link to={`/notifications/${draft}`}>
                <Button
                    style={{ position: 'fixed', bottom: '16px', right: '16px', zIndex: '1000' }}
                    className="btn btn-primary rounded-pill"
                    disabled={!draft}>
                    Корзина
                </Button>
            </Link>}
        </>
    )
}

export default AllRecipients