export type Game = {
    id: string,
    startDate: string,
    address: string,
    round: string,
    homeTeamName: string,
    homeTeamLogo: string,
    homeTeamLevel: string,
    awayTeamName: string,
    awayTeamLogo: string,
    awayTeamLevel: string,
    scoreHomeHalfTime: number,
    scoreAwayHalfTime: number,
    scoreHomeFullTime: number,
    scoreAwayFullTime: number
}

export type {DataRequest as GameCreateRequest } from './services/createGame';