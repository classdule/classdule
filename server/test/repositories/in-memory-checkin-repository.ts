import { isSameDay } from "date-fns";

import { Checkin } from "../../src/entities/checkin";
import { CheckinRepository } from "../../src/repositories/checkin-repository";

export class InMemoryCheckinRepository implements CheckinRepository {
  checkins: Checkin[] = [];
  async create(checkin: Checkin) {
    this.checkins.push(checkin);
  }
  async delete(checkinId: string) {
    this.checkins = this.checkins.filter((checkin) => checkin.id !== checkinId);
  }
  async verify(checkinId: string, verify: boolean) {
    const targetIndex = this.checkins.findIndex(
      (checkin) => checkin.id === checkinId
    );

    this.checkins[targetIndex].verified = verify;
  }
  async findByDate(date: Date, userId: string) {
    return this.checkins.filter(
      (checkin) =>
        isSameDay(checkin.createdAt, date) && checkin.userId === userId
    );
  }
  async findByUserId(userId: string) {
    return this.checkins.filter((checkin) => checkin.userId === userId);
  }

  async findById(checkinId: string) {
    const foundCheckin =
      this.checkins.find((checkin) => checkin.id === checkinId) ?? null;
    return foundCheckin;
  }
}
