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
  "	b9778018-9c13-46fd-b785-4a803dc8be0b": {
    "uuid": "b9778018-9c13-46fd-b785-4a803dc8be0b	",
    "fio": "Александр Лейко Кириллович",
    "email": "Alek221@mail.ru",
    "age": 37,
    "image_url": "localhost:9000/images/men3.jpg",
    "adress": "Москва, ул. Изюмская, д.15, кв.89",
  }
}

function fromNetwork(request, timeout) {
  return new Promise((fulfill, reject) => {
    var timeoutId = setTimeout(reject, timeout);
    fetch(request).then((response) => {
      clearTimeout(timeoutId);
      if (response.status < 500) {
        fulfill(response);
      } else {
        reject(new Error(`HTTP error: ${response.status} ${response.statusText}`));
      }
      fulfill(response);
    }, reject);
  });
}


self.addEventListener('fetch', (event) => {
  const requestURL = new URL(event.request.url);
  console.log("duvk")

  if (requestURL.pathname.startsWith('/api/recipients')) {
    event.respondWith(
      fromNetwork(event.request, timeout)
        .catch((err) => {
          console.log(`Error caught: ${err.message}`);
          const recipientIdMatch = requestURL.pathname.match(/^\/api\/recipients\/([^/]+)$/);

          if (recipientIdMatch) {
            const recipientId = recipientIdMatch[1];
            return new Response(JSON.stringify(recipients[recipientId]), {
              headers: { 'Content-Type': 'application/json; charset=utf-8' },
            });
          } else {
            return new Response(JSON.stringify({ draft_notification, recipients: Object.values(recipients) }), {
              headers: { 'Content-Type': 'application/json; charset=utf-8' },
            });
          }
        })
    );
  } else if (requestURL.pathname.startsWith('/images')) {
    event.respondWith(
      fromNetwork(event.request, timeout)
        .catch((_) => {
          console.log(`Failed to load image`);
          return fetch('/placeholder2.jpeg')
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