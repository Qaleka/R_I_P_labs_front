const timeout = 400;

const draft_notification = null
const recipients = {
  "4bea0842-bcb8-416e-9a63-d89a63e978ca": {
    "uuid": "4bea0842-bcb8-416e-9a63-d89a63e978ca",
    "fio": "Олег Орлов Никитович",
    "email": "OlegO@mail.ru",
    "age": 27,
    "image_url": "localhost:9000/images/men1.jpg",
    "adress": "Москва, ул. Измайловская, д.13, кв.54",

  },
  "18ab9f76-7648-49d2-857d-75ffddf13bea": {
    "uuid": "18ab9f76-7648-49d2-857d-75ffddf13bea",
    "fio": "Василий Гречко Валентинович",
    "email": "Grechko_101@mail.ru",
    "age": 31,
    "image_url": "localhost:9000/images/men1.jpg",
    "adress": "Москва, ул. Тверская, д.25, кв.145",
  },
  "b9778018-9c13-46fd-b785-4a803dc8be0b": {
    "uuid": "b9778018-9c13-46fd-b785-4a803dc8be0b	",
    "fio": "Александр Лейко Кириллович",
    "email": "Alek221@mail.ru",
    "age": 37,
    "image_url": "localhost:9000/images/men3.jpg",
    "adress": "Москва, ул. Изюмская, д.15, кв.89",
  },
  "9b8914a6-c599-450d-893d-b8ebb766dd07": {
    "uuid": "9b8914a6-c599-450d-893d-b8ebb766dd07	",
    "fio": "Кирилл Лейка Кириллович",
    "email": "KriLeik@mail.ru",
    "age": 30,
    "image_url": "localhost:9000/images/9b8914a6-c599-450d-893d-b8ebb766dd07.jpg",
    "adress": "Москва, ул. Бутовская, д.15, кв.79",
  }
}

const notifications = {
  "c4fdc129-ed48-48df-a262-6be92a3acb12": {
    "notification": {
      "uuid": "c4fdc129-ed48-48df-a262-6be92a3acb12",
      "status": "завершён",
      "creation_date": "2023-10-09 00:00:00",
      "formation_date": "2023-11-09 00:00:00",
      "completion_date": "2023-12-09 00:00:00",
      "moderator": "Модератор",
      "customer": "Пользователь",
      "notification_type": "Срочное сообщение"
    },
    "recipients": [
      {
        "uuid": "4bea0842-bcb8-416e-9a63-d89a63e978ca",
        "fio": "Олег Орлов Никитович",
        "email": "OlegO@mail.ru",
        "age": 27,
        "image_url": "localhost:9000/images/men1.jpg",
        "adress": "Москва, ул. Измайловская, д.13, кв.54",
      },
      {
        "uuid": "9b8914a6-c599-450d-893d-b8ebb766dd07	",
        "fio": "Кирилл Лейка Кириллович",
        "email": "KriLeik@mail.ru",
        "age": 30,
        "image_url": "localhost:9000/images/9b8914a6-c599-450d-893d-b8ebb766dd07.jpg",
        "adress": "Москва, ул. Бутовская, д.15, кв.79",
      }
    ]
  },
  "200b2366-36d5-49b2-9770-85c1628c20f0": {
    "notification": {
      "uuid": "200b2366-36d5-49b2-9770-85c1628c20f0",
      "status": "сформирован",
      "creation_date": "2023-10-30 00:00:00",
      "formation_date": "2023-10-30 00:00:00",
      "completion_date": null,
      "moderator": null,
      "customer": "Пользователь",
      "notification_type": ""
    },
    "recipients": [
      {
        "uuid": "18ab9f76-7648-49d2-857d-75ffddf13bea",
        "fio": "Василий Гречко Валентинович",
        "email": "Grechko_101@mail.ru",
        "age": 31,
        "image_url": "localhost:9000/images/men1.jpg",
        "adress": "Москва, ул. Тверская, д.25, кв.145",
      },
      {
        "uuid": "b9778018-9c13-46fd-b785-4a803dc8be0b	",
        "fio": "Александр Лейко Кириллович",
        "email": "Alek221@mail.ru",
        "age": 37,
        "image_url": "localhost:9000/images/men3.jpg",
        "adress": "Москва, ул. Изюмская, д.15, кв.89",
      },
      {
        "uuid": "4bea0842-bcb8-416e-9a63-d89a63e978ca",
        "fio": "Олег Орлов Никитович",
        "email": "OlegO@mail.ru",
        "age": 27,
        "image_url": "localhost:9000/images/men1.jpg",
        "adress": "Москва, ул. Измайловская, д.13, кв.54",
      }
    ]
  },
  "1565f159-b6a2-4108-bc29-456dd05a8ac4": {
    "notification": {
      "uuid": "1565f159-b6a2-4108-bc29-456dd05a8ac4",
      "status": "отклонён",
      "creation_date": "2023-09-15 00:00:00",
      "formation_date": "2023-09-15 00:00:00",
      "completion_date": "2023-09-16 00:00:00",
      "moderator": "Модератор",
      "customer": "Пользователь",
      "notification_type": "Уведомление о задолжности"
    },
    "recipients": [
      {
        "uuid": "365f46c8-b498-47b9-92d3-97319ff62711",
        "fio": "Андрей Отрис Даниллович",
        "email": "Andr1@mail.ru",
        "age": 32,
        "image_url": "localhost:9000/images/365f46c8-b498-47b9-92d3-97319ff62711.jpg",
        "adress": "	Москва, ул. Изюмская, д.15, кв.79",
      },
      {
        "uuid": "18ab9f76-7648-49d2-857d-75ffddf13bea",
        "fio": "Василий Гречко Валентинович",
        "email": "Grechko_101@mail.ru",
        "age": 31,
        "image_url": "localhost:9000/images/men1.jpg",
        "adress": "Москва, ул. Тверская, д.25, кв.145",
      }
    ]
  },
  "cf7bf391-a53c-4995-ab17-82acca3a6bd1": {
    "notification": {
      "uuid": "cf7bf391-a53c-4995-ab17-82acca3a6bd1",
      "status": "черновик",
      "creation_date": "2023-11-02 00:00:00",
      "formation_date": null,
      "completion_date": null,
      "moderator": null,
      "customer": "Пользователь",
      "transport": ""
    },
    "recipients": [
      {
        "uuid": "4bea0842-bcb8-416e-9a63-d89a63e978ca",
        "fio": "Олег Орлов Никитович",
        "email": "OlegO@mail.ru",
        "age": 27,
        "image_url": "localhost:9000/images/men1.jpg",
        "adress": "Москва, ул. Измайловская, д.13, кв.54",
      },
      {
        "uuid": "9b8914a6-c599-450d-893d-b8ebb766dd07	",
        "fio": "Кирилл Лейка Кириллович",
        "email": "KriLeik@mail.ru",
        "age": 30,
        "image_url": "localhost:9000/images/9b8914a6-c599-450d-893d-b8ebb766dd07.jpg",
        "adress": "Москва, ул. Бутовская, д.15, кв.79",
      }
    ]
  }
}

function fromNetwork(request, timeout) {
  return new Promise((fulfill, reject) => {
    var timeoutId = setTimeout(() => { reject("Timeout") }, timeout);
    fetch(request).then((response) => {
      clearTimeout(timeoutId);
      if (response.status >= 500 || response.headers.get("Server") == "GitHub.com") {
        reject(`HTTP error: ${response.status} ${response.statusText}`);
      }
      fulfill(response);
    }).catch((error) => {
      reject(`Unknown error while sending request: ${error.message}`);
    });
  });
}


self.addEventListener('fetch', (event) => {
  const requestURL = new URL(event.request.url);

  if (requestURL.pathname.startsWith('/api/recipients')) {
    event.respondWith(
      fromNetwork(event.request, timeout)
        .catch((err) => {
          console.log(`${err}`);
          const recipientIdMatch = requestURL.pathname.match(/^\/api\/recipients\/([^/]+)$/);

          if (recipientIdMatch) {
            const recipientId = recipientIdMatch[1];
            if (recipients.hasOwnProperty(recipientId)) {
              return new Response(JSON.stringify(recipients[recipientId]), {
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
              });
            } else {
              return new Response(JSON.stringify({ error: 'Recipient not found' }), {
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
                status: 404, 
              });
            }
          } else {
            return new Response(JSON.stringify({ draft_notification, recipients: Object.values(recipients) }), {
              headers: { 'Content-Type': 'application/json; charset=utf-8' },
            });
          }
        })
    );
  } else if (requestURL.pathname.startsWith('/api/notifications')) {
    event.respondWith(
      fromNetwork(event.request, timeout)
      .catch((err) => {
        console.log(`${err}`);
          const notificationIdMatch = requestURL.pathname.match(/^\/api\/notifications\/([^/]+)$/);

          if (notificationIdMatch) {
            const notificationnId = notificationIdMatch[1];
            if (notifications.hasOwnProperty(notificationnId)) {
              return new Response(JSON.stringify(notifications[notificationnId]), {
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
              });
            } else {
              return new Response(JSON.stringify({ error: 'Notification not found' }), {
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
                status: 404,
              });
            }
        } else {
          return new Response(JSON.stringify({ notifications: Object.values(notifications).map((t) => t.notifications) }), {
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
          });
        }
      })
      );
    } else if (requestURL.pathname.startsWith('/images')) {
      event.respondWith(
        fromNetwork(event.request, timeout)
          .catch((err) => {
            console.log(`${err}`);
          return fetch('placeholder2.jpeg')
            .then((response) => {
              return new Response(response.body, {
                status: response.status,
                statusText: response.statusText,
                headers: new Headers(response.headers),
              });
            })
            .catch((_) => {
              return new Response('Failed to load image', {
                status: 500,
                headers: { 'Content-Type': 'text/plain' },
              });
            });
        })
    );

  } else {
    event.respondWith(fetch(event.request));
  }
});