import { Checkin } from "../entities/checkin";

export interface CheckinRepository {
  create: (checkin: Checkin) => Promise<void>;
  delete: (checkinId: string) => Promise<void>;
  verify: (checkinId: string, verify: boolean) => Promise<void>;
  findByDate: (date: Date, userId: string) => Promise<Checkin[]>;
  findByUserId: (userId: string) => Promise<Checkin[]>;
  findById: (checkinId: string) => Promise<Checkin | null>;
}
