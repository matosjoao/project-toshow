export type Player = {
    id: string,
    fullName: string,
    name: string,
    number: number,
    photo: string,
    birthday: string,
    position: string,
    positionId: string,
    level: string,
    levelId: string
}

export type PlayerPosition = {
    id: string,
    name: string
}

export type { DataRequest as PlayerCreateRequest } from './services/createPlayer';
export type { DataRequest as PlayerEditRequest } from './services/editPlayer';