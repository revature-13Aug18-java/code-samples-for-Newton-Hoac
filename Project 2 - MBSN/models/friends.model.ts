export class Friends {
    id: number;
    person: number;
    isFriendsWith: number;

    constructor(id: number, person: number, isFriendsWith: number){
        this.id = id;
        this.person = person;
        this.isFriendsWith = isFriendsWith;
    }
}
