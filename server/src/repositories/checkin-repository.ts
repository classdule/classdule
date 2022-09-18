import { Checkin } from "../entities/checkin";

export interface CheckinRepository {
    create: (checkin: Checkin) => Promise<Checkin>;
    delete: (checkinId: string) => Promise<Checkin | null>;
    verify: (checkinId: string, verify: boolean) => Promise<Checkin | null>;
}