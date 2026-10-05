export type Destination = { slug:string; name:string; region:string; tagline:string; image:string; description:string; tags:string[] };
export type Experience = { slug:string; title:string; city:string; category:string; price:number; rating:number; image:string; duration:string };
export type Provider = { slug:string; name:string; city:string; category:string; rating:number; reviews:number; image:string; description:string; priceLabel:string };
export type Reservation = { id:string; guest:string; service:string; date:string; status:'Nouvelle'|'Confirmée'|'À venir'|'Terminée'|'Annulée'; total:string };
export type Message = { id:string; name:string; preview:string; time:string; unread?:boolean };
