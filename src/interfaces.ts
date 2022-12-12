export interface IState {
  [key: string]: {
    [key: string]: boolean | string | null | any[any],
  }
}

export interface ITicket {
  carrier: 'string',
  price: number,
  segments: [
    {
      origin: string,
      destination: string,
      date: string,
      duration: number,
      stops: string[] | []
    }
  ]
}
