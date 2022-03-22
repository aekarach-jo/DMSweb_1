export interface invoice {
    invoiceId: string
    invoiceNumber: string
    invoiceRoomRate: number
    waterMeterOld: number
    waterMeterNew: number
    waterMeterUnit: number
    waterPrice: number
    waterTotalPrice: number
    powerMeterOld: number
    powerMeterNew: number
    powerMeterUnit: number
    powerPrice: number
    powerTotalPrice: number
    centerService: number
    otherNote: string
    otherPrice: number
    invoiceStatus: string
    invoiceTotal: number
    creationDateTime: string
    status: string
    roomId: string
}