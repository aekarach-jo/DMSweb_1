export interface invoice {
    invoiceId: string
    invoiceNumber: string
    invoiceRoomRate: Number
    waterMeterOld: Number
    waterMeterNew: Number
    waterMeterUnit: Number
    powerMeterOld: Number
    powerMeterNew: Number
    powerMeterUnit: Number
    centerCervice: Number
    invoiceStatus: string
    invoiceTotal: Number
    creationDateTime: string
    status: string
    roomId: string
}