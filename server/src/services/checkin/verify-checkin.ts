import { CheckinRepository } from "../../repositories/checkin-repository";

interface Request {
    checkinId: string;
    verify: boolean
}

export class VerifyCheckin {
    constructor(
        public checkinsRepository: CheckinRepository
    ){}

    async do({checkinId, verify}: Request){
        const queryResult = await this.checkinsRepository.verify(checkinId, verify)
        return queryResult
    }
}