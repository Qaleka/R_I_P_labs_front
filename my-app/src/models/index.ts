export interface IRecipient {
    uuid: string
    fio: string
    email: string
    age: number
    adress: string
    image_url: string
}

export interface INotification {
    uuid: string
    status: string
    creation_date: string
    formation_date: string | null
    completion_date: string | null
    moderator: string | null
    customer: string
    notification_type: string | null
    sending_status: string | null
}