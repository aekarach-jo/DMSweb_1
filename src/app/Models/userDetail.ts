export interface userDetail {
    userDetailId : string
    firstName : string
    lastName : string
    age : number
    birthday : string
    tel : string
    email : string
    address : string
    idCard : string
    userStatus : string
    deposit : number
    bookingDate : Date // ตอนจอง
    bookingDateOfStay : Date // เลือกเพื่อจอง
    dateIn : Date // ตอนเข้า คลิกที่จัดการผู้เช่า
    dateOut : Date // ตอนลบ
    creationDatetime : Date
    roomNumber : string
    status : string
}
