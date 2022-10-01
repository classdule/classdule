import { Checkin } from "../entities/checkin";

export interface CheckinRepository {
    create: (checkin: Checkin) => Promise<Checkin>;
    delete: (checkinId: string) => Promise<Checkin | null>;
    verify: (checkinId: string, verify: boolean) => Promise<Checkin | null>;
    findByDate: (date: Date) => Promise<Checkin[]>;
    findByUserId: (userId: string) => Promise<Checkin[]>;
    findById: (checkinId: string) => Promise<Checkin | null>;
}