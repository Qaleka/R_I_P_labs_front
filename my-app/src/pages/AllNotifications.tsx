// import { useEffect, useState, FC } from 'react';
import { useEffect, useState } from 'react';
import { SmallCard, INotificationProps } from '../components/NotificationCard';
import LoadAnimation from '../components/LoadAnimation';
// import Navbar from 'react-bootstrap/Navbar';
// import Form from 'react-bootstrap/Form';
type Response = {
    notifications: INotificationProps[];
}

// interface ISearchProps {
//     containers: IContairnerProps[]
//     setFilteredContainers: React.Dispatch<React.SetStateAction<IContairnerProps[]>>
// }

// const Search: FC<ISearchProps> = ({ containers, setFilteredContainers }) => {
//     const [searchText, setSearchText] = useState<string>('');

//     const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setSearchText(event.target.value)
//         if (event.target.value == '') {
//             setFilteredContainers(containers)
//         } else {
//             setFilteredContainers(
//                 containers.filter(
//                     (container) => container.marking.toLowerCase().includes(event.target.value.toLowerCase())
//                 )
//             )
//         }
//     }
//     return (
//         <Navbar>
//             <Form className="flex-grow-1 shadow shadow-sm">
//                 <Form.Control
//                     type="text"
//                     placeholder="Поиск"
//                     className="form-control-sm"
//                     data-bs-theme="dark"
//                     value={searchText}
//                     onChange={handleChange}
//                 />
//             </Form>
//         </Navbar>)
// }

function stringToDate(date: Date | null) {
    return date ? new Date(date) : null;
}

const AllNotifications = () => {
    const [loaded, setLoaded] = useState<boolean>(false)
    const [_, setNotifications] = useState<INotificationProps[]>([]);
    const [filteredNotifications, setFilteredNotifications] = useState<INotificationProps[]>([]);

    useEffect(() => {
        fetch('/api/notifications')
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                return response.json() as Promise<Response>
            })
            .then(data => {
                data.notifications.forEach((notification) => {
                    notification.creation_date = stringToDate(notification.creation_date);
                    notification.formation_date = stringToDate(notification.formation_date);
                    notification.completion_date = stringToDate(notification.completion_date);
                });
                console.log(data)
                setNotifications(data.notifications)
                setFilteredNotifications(data.notifications)
                console.log(filteredNotifications)
                setLoaded(true)
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <>
            {/* <Search {...{ recipients, setFilteredRecipients}} /> */}
            <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 px-1'>
                {loaded ? (
                    filteredNotifications.map((notification) => (
                        <div className='d-flex py-1 p-sm-2 p-md-2 justify-content-center' key={notification.uuid}>
                            <SmallCard  {...notification} />
                        </div>
                    ))
                ) : (
                    <LoadAnimation />
                )}
            </div>
        </>
    )
}



export { AllNotifications }