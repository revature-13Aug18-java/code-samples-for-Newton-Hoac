import { PrefKey } from './preference-key.model';
export class Preference {
    pId: PrefKey;
    genre: string;

    constructor(muser_id: number, pLevel:number, genre: string){
        this.pId = new PrefKey(muser_id, pLevel);
        this.genre = genre;
    }
}