export type Game = {
    id: string,
    startDate: string,
    address: string,
    round: string,
    homeTeamId: string,
    homeTeamName: string,
    homeTeamLogo: string,
    homeTeamLevel: string,
    homeTeamLevelId: string,
    awayTeamId: string,
    awayTeamName: string,
    awayTeamLogo: string,
    awayTeamLevel: string,
    awayTeamLevelId: string,
    scoreHomeHalfTime: number,
    scoreAwayHalfTime: number,
    scoreHomeFullTime: number,
    scoreAwayFullTime: number,
    levelId: string,
    level: string
}

export type {DataRequest as GameCreateRequest } from './services/createGame';
export type {DataRequest as GameEditRequest } from './services/editGame';