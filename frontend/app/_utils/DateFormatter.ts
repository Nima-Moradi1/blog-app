//? Formats date to a short local persian date

export default function toLocalDateShort(date:Date){
    return new Date(date).toLocaleDateString('fa-IR' , {}) ;
}